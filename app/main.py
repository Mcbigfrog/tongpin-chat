from __future__ import annotations

import asyncio
import logging
import re
import uuid
from collections import deque
from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

BASE_DIR = Path(__file__).resolve().parent.parent
STATIC_DIR = BASE_DIR / "static"

MAX_NAME_LENGTH = 24
MAX_MESSAGE_LENGTH = 1000
MAX_HISTORY = 60

logger = logging.getLogger("chat")

app = FastAPI(title="实时聊天室", version="1.0.0")
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

_CONTROL_CHARS = re.compile(r"[\x00-\x1f\x7f]")


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


def clean_name(value: Any) -> str | None:
    if not isinstance(value, str):
        return None
    name = " ".join(value.split())
    name = _CONTROL_CHARS.sub("", name).strip()
    if not name:
        return None
    return name[:MAX_NAME_LENGTH]


@dataclass
class ClientConnection:
    id: str
    name: str
    websocket: WebSocket
    send_lock: asyncio.Lock = field(default_factory=asyncio.Lock)


class ConnectionManager:
    def __init__(self) -> None:
        self._clients: dict[str, ClientConnection] = {}
        self._history: deque[dict[str, Any]] = deque(maxlen=MAX_HISTORY)

    @property
    def history(self) -> list[dict[str, Any]]:
        return list(self._history)

    def users(self) -> list[str]:
        return sorted((client.name for client in self._clients.values()), key=str.casefold)

    def unique_name(self, desired: str) -> str:
        existing = {client.name.casefold() for client in self._clients.values()}
        if desired.casefold() not in existing:
            return desired
        suffix = 2
        while True:
            suffix_text = f" ({suffix})"
            candidate = f"{desired[: MAX_NAME_LENGTH - len(suffix_text)]}{suffix_text}"
            if candidate.casefold() not in existing:
                return candidate
            suffix += 1

    def add(self, websocket: WebSocket, name: str) -> ClientConnection:
        client = ClientConnection(id=uuid.uuid4().hex, name=name, websocket=websocket)
        self._clients[client.id] = client
        return client

    def remove(self, client_id: str) -> ClientConnection | None:
        return self._clients.pop(client_id, None)

    def get(self, client_id: str) -> ClientConnection | None:
        return self._clients.get(client_id)

    async def send_to(self, client_id: str, payload: dict[str, Any]) -> bool:
        client = self._clients.get(client_id)
        if client is None:
            return False
        try:
            async with client.send_lock:
                await client.websocket.send_json(payload)
            return True
        except Exception:
            return False

    async def broadcast(
        self,
        payload: dict[str, Any],
        exclude: str | None = None,
    ) -> None:
        targets = [client for client in self._clients.values() if client.id != exclude]
        if not targets:
            return

        async def deliver(client: ClientConnection) -> str | None:
            try:
                async with client.send_lock:
                    await client.websocket.send_json(payload)
                return None
            except Exception:
                return client.id

        removed = [client_id for client_id in await asyncio.gather(
            *(deliver(client) for client in targets)
        ) if client_id]
        for client_id in removed:
            self.remove(client_id)

    def remember(self, message: dict[str, Any]) -> None:
        self._history.append(message)


manager = ConnectionManager()


@app.get("/")
async def index() -> FileResponse:
    return FileResponse(STATIC_DIR / "index.html")


@app.get("/healthz")
async def healthcheck() -> dict[str, str]:
    return {"status": "ok"}


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket) -> None:
    await websocket.accept()
    client: ClientConnection | None = None

    try:
        try:
            join_payload = await asyncio.wait_for(websocket.receive_json(), timeout=15)
        except asyncio.TimeoutError:
            await websocket.close(code=1008, reason="Join timeout")
            return

        if not isinstance(join_payload, dict) or join_payload.get("type") != "join":
            await websocket.send_json(
                {
                    "type": "error",
                    "code": "join_required",
                    "message": "Please send a join message first.",
                }
            )
            await websocket.close(code=1008, reason="Join required")
            return

        name = clean_name(join_payload.get("name"))
        if name is None:
            await websocket.send_json(
                {
                    "type": "error",
                    "code": "name_required",
                    "message": "A nickname is required.",
                }
            )
            await websocket.close(code=1008, reason="Invalid name")
            return

        name = manager.unique_name(name)
        client = manager.add(websocket, name)

        await manager.send_to(
            client.id,
            {
                "type": "welcome",
                "clientId": client.id,
                "name": client.name,
                "users": manager.users(),
                "history": manager.history,
                "timestamp": utc_now(),
            },
        )
        await manager.broadcast({"type": "presence", "users": manager.users()})
        await manager.broadcast(
            {
                "type": "system",
                "event": "join",
                "name": client.name,
                "text": f"{client.name} 加入了聊天室",
                "timestamp": utc_now(),
            },
            exclude=client.id,
        )

        while True:
            try:
                payload = await websocket.receive_json()
            except ValueError:
                await manager.send_to(
                    client.id,
                    {
                        "type": "error",
                        "code": "invalid_payload",
                        "message": "That message wasn't formatted correctly.",
                    },
                )
                continue

            if not isinstance(payload, dict):
                continue

            message_type = payload.get("type")

            if message_type == "chat":
                text = payload.get("text")
                if not isinstance(text, str):
                    continue
                text = text.strip()
                if not text:
                    continue
                if len(text) > MAX_MESSAGE_LENGTH:
                    await manager.send_to(
                        client.id,
                        {
                            "type": "error",
                            "code": "message_too_long",
                            "message": f"Messages can be up to {MAX_MESSAGE_LENGTH} characters.",
                            "max": MAX_MESSAGE_LENGTH,
                        },
                    )
                    continue

                message = {
                    "type": "message",
                    "id": uuid.uuid4().hex,
                    "senderId": client.id,
                    "name": client.name,
                    "text": text,
                    "timestamp": utc_now(),
                }
                manager.remember(message)
                await manager.broadcast(message)

            elif message_type == "typing":
                await manager.broadcast(
                    {
                        "type": "typing",
                        "senderId": client.id,
                        "name": client.name,
                        "typing": bool(payload.get("typing")),
                    },
                    exclude=client.id,
                )

    except WebSocketDisconnect:
        pass
    except Exception:
        logger.exception("WebSocket connection failed")
    finally:
        if client is not None:
            manager.remove(client.id)
            await manager.broadcast(
                {
                    "type": "system",
                    "event": "leave",
                    "name": client.name,
                    "text": f"{client.name} 离开了聊天室",
                    "timestamp": utc_now(),
                }
            )
            await manager.broadcast({"type": "presence", "users": manager.users()})

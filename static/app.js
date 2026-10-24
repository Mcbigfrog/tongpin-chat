(() => {
  "use strict";

  const nameKey = "tongpin-chat-name";
  const languageKey = "tongpin-chat-language";
  const maxMessageLength = 1000;

  const translations = {
    zh: {
      "meta.title": "同频 · 实时聊天室",
      "meta.titleLobby": "大厅 · 同频",
      "meta.description": "基于 FastAPI 与 WebSocket 的实时公共聊天室",
      "brand.name": "同频",
      "brand.tagline": "实时聊天室",
      "lang.switchToEnglish": "切换到英文",
      "lang.switchToChinese": "切换到中文",
      "status.idle": "未连接",
      "status.connecting": "正在连接",
      "status.online": "已连接",
      "status.reconnecting": "正在重连",
      "status.reconnectingAttempt": "重连中 {attempt}",
      "status.failed": "连接失败",
      "action.leave": "离开",
      "presence.public": "公共频道",
      "presence.online": "人在线",
      "presence.waiting": "等待成员加入",
      "presence.self": "你",
      "sidebar.note": "无需注册，即刻开聊",
      "room.title": "大厅",
      "room.count": "{count} 人",
      "typing.one": "{name} 正在输入…",
      "typing.two": "{first}、{second} 正在输入…",
      "typing.many": "{name} 等 {others} 人正在输入…",
      "empty.disconnected.title": "连接后，消息会出现在这里",
      "empty.disconnected.detail": "和世界各地的人，分享此刻。",
      "empty.ready.title": "还没有消息",
      "empty.ready.detail": "来和大厅里的第一位朋友打个招呼吧。",
      "composer.placeholder": "说点什么…",
      "composer.hint": "Enter 发送 · Shift + Enter 换行",
      "message.self": "你",
      "join.title": "进入公共聊天室",
      "join.copy": "取一个昵称，开始和世界各地的人实时聊天。你的消息会即时送达所有在线成员。",
      "join.nameLabel": "你的昵称",
      "join.namePlaceholder": "例如：夜航星",
      "join.button": "加入聊天室",
      "join.busy": "正在连接…",
      "join.note": "公开频道 · 请勿分享敏感信息",
      "system.selfJoined": "你已进入公共频道",
      "system.restored": "连接已恢复",
      "system.join": "{name} 加入了聊天室",
      "system.leave": "{name} 离开了聊天室",
      "toast.reconnecting": "连接已断开，正在尝试重新连接。",
      "toast.offline": "网络连接已断开。",
      "toast.notConnected": "当前未连接，消息尚未发送。",
      "toast.sendFailed": "消息发送失败，请稍后重试。",
      "error.emptyName": "请输入一个昵称。",
      "error.connectFailed": "无法连接到服务器，请检查网络后重试。",
      "error.websocketUnavailable": "浏览器无法建立 WebSocket 连接。",
      "error.joinRequired": "请先发送加入消息。",
      "error.nameRequired": "昵称不能为空。",
      "error.invalidPayload": "消息格式不正确。",
      "error.messageTooLong": "消息不能超过 {max} 个字符。",
      "error.generic": "操作失败，请稍后重试。",
      "error.joinGeneric": "无法加入聊天室。",
      "aria.onlineUsers": "在线成员",
      "aria.messages": "聊天消息",
      "aria.messageInput": "消息内容",
      "aria.send": "发送消息"
    },
    en: {
      "meta.title": "Tongpin · Real-time Chat",
      "meta.titleLobby": "Lobby · Tongpin",
      "meta.description": "A real-time public chat room built with FastAPI and WebSocket",
      "brand.name": "Tongpin",
      "brand.tagline": "Real-time chat",
      "lang.switchToEnglish": "Switch to English",
      "lang.switchToChinese": "Switch to Chinese",
      "status.idle": "Offline",
      "status.connecting": "Connecting",
      "status.online": "Online",
      "status.reconnecting": "Reconnecting",
      "status.reconnectingAttempt": "Reconnecting · {attempt}",
      "status.failed": "Connection failed",
      "action.leave": "Leave",
      "presence.public": "Public channel",
      "presence.online": "online",
      "presence.waiting": "No one else is here yet",
      "presence.self": "You",
      "sidebar.note": "No sign-up. Just chat.",
      "room.title": "Lobby",
      "room.count": "{count} here",
      "typing.one": "{name} is typing…",
      "typing.two": "{first} and {second} are typing…",
      "typing.many": "{name} and {others} others are typing…",
      "empty.disconnected.title": "Messages will appear here",
      "empty.disconnected.detail": "Share a moment with people around the world.",
      "empty.ready.title": "No messages yet",
      "empty.ready.detail": "Say hello to the first person in the lobby.",
      "composer.placeholder": "Say something…",
      "composer.hint": "Enter to send · Shift + Enter for a new line",
      "message.self": "You",
      "join.title": "Join the public chat",
      "join.copy": "Pick a nickname and chat live with people around the world. Your messages appear instantly for everyone online.",
      "join.nameLabel": "Your nickname",
      "join.namePlaceholder": "e.g. Night Walker",
      "join.button": "Join the chat",
      "join.busy": "Connecting…",
      "join.note": "Public room · Keep personal details private",
      "system.selfJoined": "You joined the public channel",
      "system.restored": "Connection restored",
      "system.join": "{name} joined the chat",
      "system.leave": "{name} left the chat",
      "toast.reconnecting": "Connection lost. Trying to reconnect.",
      "toast.offline": "You are offline.",
      "toast.notConnected": "You're offline. Your message wasn't sent.",
      "toast.sendFailed": "Couldn't send your message. Please try again.",
      "error.emptyName": "Please enter a nickname.",
      "error.connectFailed": "Couldn't reach the server. Check your connection and try again.",
      "error.websocketUnavailable": "This browser couldn't open a WebSocket connection.",
      "error.joinRequired": "Please send a join message first.",
      "error.nameRequired": "A nickname is required.",
      "error.invalidPayload": "That message wasn't formatted correctly.",
      "error.messageTooLong": "Messages can be up to {max} characters.",
      "error.generic": "Something went wrong. Please try again.",
      "error.joinGeneric": "Couldn't join the chat.",
      "aria.onlineUsers": "Online members",
      "aria.messages": "Chat messages",
      "aria.messageInput": "Message",
      "aria.send": "Send message"
    }
  };

  const serverErrorKeys = {
    join_required: "error.joinRequired",
    name_required: "error.nameRequired",
    invalid_payload: "error.invalidPayload",
    message_too_long: "error.messageTooLong"
  };

  const elements = {
    joinScreen: document.querySelector("#join-screen"),
    joinForm: document.querySelector("#join-form"),
    joinButton: document.querySelector("#join-button"),
    joinButtonText: document.querySelector("#join-button-text"),
    joinError: document.querySelector("#join-error"),
    nameInput: document.querySelector("#name-input"),
    leaveButton: document.querySelector("#leave-button"),
    connectionStatus: document.querySelector("#connection-status"),
    statusText: document.querySelector("#status-text"),
    onlineCount: document.querySelector("#online-count"),
    roomCount: document.querySelector("#room-count"),
    userList: document.querySelector("#user-list"),
    typingIndicator: document.querySelector("#typing-indicator"),
    messageList: document.querySelector("#message-list"),
    composer: document.querySelector("#composer"),
    messageInput: document.querySelector("#message-input"),
    sendButton: document.querySelector("#send-button"),
    characterCount: document.querySelector("#character-count"),
    metaDescription: document.querySelector("#meta-description"),
    toast: document.querySelector("#toast"),
    messageTemplate: document.querySelector("#message-template"),
  };

  const state = {
    lang: detectLanguage(),
    socket: null,
    clientId: "",
    joinName: "",
    displayName: "",
    users: [],
    hasJoined: false,
    isReconnecting: false,
    manualClose: false,
    everJoined: false,
    reconnectAttempt: 0,
    reconnectTimer: null,
    toastTimer: null,
    typingStopTimer: null,
    typingSent: false,
    lastTypingSentAt: 0,
    typingUsers: new Map(),
    statusKind: "idle",
    statusKey: "status.idle",
    statusParams: {},
    joinBusy: false,
    joinErrorKey: "",
    joinErrorParams: {},
  };

  function readStorage(key) {
    try {
      return localStorage.getItem(key) || "";
    } catch {
      return "";
    }
  }

  function writeStorage(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
    }
  }

  function detectLanguage() {
    const saved = readStorage(languageKey);
    if (saved === "zh" || saved === "en") return saved;
    const browserLanguage = (navigator.language || "zh").toLowerCase();
    return browserLanguage.startsWith("zh") ? "zh" : "en";
  }

  function locale() {
    return state.lang === "zh" ? "zh-CN" : "en-US";
  }

  function t(key, params = {}) {
    const table = translations[state.lang] || translations.zh;
    const template = table[key] ?? translations.zh[key] ?? key;
    return template.replace(/\{(\w+)\}/g, (match, name) => {
      const value = params[name];
      return value === undefined || value === null ? match : String(value);
    });
  }

  function parseParams(element) {
    try {
      return JSON.parse(element.dataset.i18nParams || "{}");
    } catch {
      return {};
    }
  }

  function applyLanguage(lang, options = {}) {
    state.lang = lang === "en" ? "en" : "zh";
    if (options.persist !== false) {
      writeStorage(languageKey, state.lang);
    }

    document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
    elements.metaDescription.content = t("meta.description");

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      if (key) element.textContent = t(key, parseParams(element));
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      element.placeholder = t(element.dataset.i18nPlaceholder);
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
      element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
    });

    const targetLanguage = state.lang === "zh" ? "en" : "zh";
    const switchTitle = state.lang === "zh" ? t("lang.switchToEnglish") : t("lang.switchToChinese");
    document.querySelectorAll("[data-language-toggle]").forEach((button) => {
      const target = button.querySelector("[data-language-target]");
      if (target) target.textContent = targetLanguage === "zh" ? "中文" : "EN";
      button.setAttribute("aria-label", switchTitle);
      button.title = switchTitle;
    });

    renderUsers();
    renderTyping();
    updateStatusText();
    updateJoinButton();
    renderJoinError();
    updateDocumentTitle();
    refreshTimes();
  }

  function firstName(name) {
    return Array.from(name.trim())[0]?.toUpperCase() || "?";
  }

  function colorForName(name) {
    let hash = 0;
    for (const char of name) {
      hash = (hash * 31 + (char.codePointAt(0) || 0)) >>> 0;
    }
    const hue = hash % 360;
    return `linear-gradient(145deg, hsl(${hue} 78% 74%), hsl(${(hue + 32) % 360} 68% 58%))`;
  }

  function createAvatar(name, className) {
    const avatar = document.createElement("div");
    avatar.className = className;
    avatar.style.background = colorForName(name);
    avatar.textContent = firstName(name);
    avatar.setAttribute("aria-hidden", "true");
    return avatar;
  }

  function parseTimestamp(timestamp) {
    const date = new Date(timestamp);
    return Number.isNaN(date.getTime()) ? new Date() : date;
  }

  function formatTime(timestamp) {
    return parseTimestamp(timestamp).toLocaleTimeString(locale(), {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  function formatFullTime(timestamp) {
    return parseTimestamp(timestamp).toLocaleString(locale(), {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  }

  function updateDocumentTitle() {
    document.title = elements.joinScreen.hidden ? t("meta.titleLobby") : t("meta.title");
  }

  function setConnectionStatus(kind, key, params = {}) {
    state.statusKind = kind;
    state.statusKey = key;
    state.statusParams = params;
    updateStatusText();
  }

  function updateStatusText() {
    elements.connectionStatus.dataset.state = state.statusKind;
    elements.statusText.textContent = t(state.statusKey, state.statusParams);
  }

  function showToast(message) {
    if (!message) return;
    window.clearTimeout(state.toastTimer);
    elements.toast.textContent = message;
    elements.toast.classList.add("is-visible");
    state.toastTimer = window.setTimeout(() => {
      elements.toast.classList.remove("is-visible");
    }, 3200);
  }

  function updateJoinButton() {
    elements.joinButtonText.textContent = state.joinBusy ? t("join.busy") : t("join.button");
  }

  function setJoinBusy(busy) {
    state.joinBusy = busy;
    elements.joinButton.disabled = busy;
    elements.nameInput.disabled = busy;
    updateJoinButton();
  }

  function setJoinErrorKey(key = "", params = {}) {
    state.joinErrorKey = key;
    state.joinErrorParams = params;
    renderJoinError();
  }

  function renderJoinError() {
    elements.joinError.textContent = state.joinErrorKey
      ? t(state.joinErrorKey, state.joinErrorParams)
      : "";
  }

  function setComposerEnabled(enabled) {
    elements.messageInput.disabled = !enabled;
    elements.sendButton.disabled = !enabled;
    if (enabled) {
      elements.messageInput.focus();
    }
  }

  function canSend() {
    return Boolean(
      state.hasJoined &&
        state.socket &&
        state.socket.readyState === WebSocket.OPEN
    );
  }

  function renderUsers() {
    const count = state.users.length;
    elements.onlineCount.textContent = String(count);
    elements.roomCount.textContent = t("room.count", { count });
    elements.userList.replaceChildren();

    if (count === 0) {
      const empty = document.createElement("li");
      empty.className = "user-empty";
      empty.textContent = t("presence.waiting");
      elements.userList.append(empty);
      return;
    }

    const fragment = document.createDocumentFragment();
    for (const name of state.users) {
      const item = document.createElement("li");
      item.className = "user-item";
      if (name === state.displayName) {
        item.classList.add("is-self");
      }

      const avatar = createAvatar(name, "user-avatar");
      const label = document.createElement("span");
      label.className = "user-name";
      label.textContent = name;
      item.append(avatar, label);

      if (name === state.displayName) {
        const tag = document.createElement("span");
        tag.className = "self-tag";
        tag.textContent = t("presence.self");
        item.append(tag);
      }

      fragment.append(item);
    }
    elements.userList.append(fragment);
  }

  function createEmptyState(titleKey, detailKey) {
    const wrapper = document.createElement("div");
    wrapper.className = "empty-state";
    wrapper.id = "empty-state";

    const orbit = document.createElement("div");
    orbit.className = "empty-orbit";
    orbit.setAttribute("aria-hidden", "true");
    orbit.append(document.createElement("span"));

    const heading = document.createElement("p");
    heading.dataset.i18n = titleKey;
    heading.textContent = t(titleKey);

    const subline = document.createElement("span");
    subline.dataset.i18n = detailKey;
    subline.textContent = t(detailKey);

    wrapper.append(orbit, heading, subline);
    return wrapper;
  }

  function showEmptyState(titleKey, detailKey) {
    elements.messageList.replaceChildren(createEmptyState(titleKey, detailKey));
  }

  function isNearBottom() {
    const list = elements.messageList;
    return list.scrollHeight - list.scrollTop - list.clientHeight < 120;
  }

  function scrollToLatest(smooth = false) {
    const list = elements.messageList;
    list.style.scrollBehavior = smooth ? "smooth" : "auto";
    list.scrollTop = list.scrollHeight;
    window.setTimeout(() => {
      list.style.scrollBehavior = "";
    }, smooth ? 500 : 0);
  }

  function createMessageElement(message) {
    const isOwn = message.senderId === state.clientId;
    const article = elements.messageTemplate.content.firstElementChild.cloneNode(true);
    const avatar = article.querySelector(".avatar");
    const author = article.querySelector(".message-author");
    const time = article.querySelector("time");
    const bubble = article.querySelector(".message-bubble");

    if (isOwn) {
      article.classList.add("own");
      author.dataset.i18n = "message.self";
    }

    avatar.style.background = colorForName(message.name);
    avatar.querySelector("span").textContent = firstName(message.name);
    author.textContent = isOwn ? t("message.self") : message.name;
    time.dateTime = message.timestamp || "";
    time.textContent = formatTime(message.timestamp);
    time.title = formatFullTime(message.timestamp);
    bubble.textContent = message.text;

    return article;
  }

  function appendMessage(message, options = {}) {
    const stick = options.forceScroll ?? isNearBottom();
    const empty = elements.messageList.querySelector("#empty-state");
    if (empty) empty.remove();
    elements.messageList.append(createMessageElement(message));
    if (stick) scrollToLatest(Boolean(options.smooth));
  }

  function appendSystemMessage(options) {
    const key = options.key || "";
    const params = options.params || {};
    const text = key ? t(key, params) : options.text;
    if (!text) return;

    const stick = isNearBottom();
    const empty = elements.messageList.querySelector("#empty-state");
    if (empty) empty.remove();

    const system = document.createElement("div");
    system.className = "system-message";
    system.textContent = text;
    if (key) {
      system.dataset.i18n = key;
      system.dataset.i18nParams = JSON.stringify(params);
    }
    if (options.timestamp) {
      system.dataset.timestamp = options.timestamp;
      system.title = formatFullTime(options.timestamp);
    }

    elements.messageList.append(system);
    if (stick) scrollToLatest();
  }

  function renderHistory(history) {
    elements.messageList.replaceChildren();
    if (!Array.isArray(history) || history.length === 0) {
      showEmptyState("empty.ready.title", "empty.ready.detail");
      return;
    }

    const fragment = document.createDocumentFragment();
    for (const message of history) {
      if (message && message.type === "message") {
        fragment.append(createMessageElement(message));
      }
    }

    if (fragment.childNodes.length === 0) {
      showEmptyState("empty.ready.title", "empty.ready.detail");
      return;
    }

    elements.messageList.append(fragment);
    scrollToLatest();
  }

  function refreshTimes() {
    elements.messageList.querySelectorAll("time[datetime]").forEach((time) => {
      const timestamp = time.getAttribute("datetime");
      if (!timestamp) return;
      time.textContent = formatTime(timestamp);
      time.title = formatFullTime(timestamp);
    });
    elements.messageList.querySelectorAll("[data-timestamp]").forEach((message) => {
      message.title = formatFullTime(message.dataset.timestamp);
    });
  }

  function stopTypingEntry(clientId) {
    const entry = state.typingUsers.get(clientId);
    if (!entry) return;
    window.clearTimeout(entry.timer);
    state.typingUsers.delete(clientId);
  }

  function clearTypingUsers() {
    for (const entry of state.typingUsers.values()) {
      window.clearTimeout(entry.timer);
    }
    state.typingUsers.clear();
    renderTyping();
  }

  function renderTyping() {
    const names = [...new Set([...state.typingUsers.values()].map((entry) => entry.name))];
    if (names.length === 0) {
      elements.typingIndicator.textContent = "";
      return;
    }
    if (names.length === 1) {
      elements.typingIndicator.textContent = t("typing.one", { name: names[0] });
      return;
    }
    if (names.length === 2) {
      elements.typingIndicator.textContent = t("typing.two", {
        first: names[0],
        second: names[1],
      });
      return;
    }
    elements.typingIndicator.textContent = t("typing.many", {
      name: names[0],
      others: names.length - 1,
    });
  }

  function updateTypingEvent(data) {
    if (!data.senderId || data.senderId === state.clientId) return;
    stopTypingEntry(data.senderId);

    if (data.typing) {
      const timer = window.setTimeout(() => {
        state.typingUsers.delete(data.senderId);
        renderTyping();
      }, 4200);
      state.typingUsers.set(data.senderId, { name: data.name, timer });
    }
    renderTyping();
  }

  function updatePresence(users) {
    if (!Array.isArray(users)) return;
    state.users = users;
    for (const [clientId, entry] of state.typingUsers) {
      if (!users.includes(entry.name)) {
        window.clearTimeout(entry.timer);
        state.typingUsers.delete(clientId);
      }
    }
    renderTyping();
    renderUsers();
  }

  function resetTypingState() {
    window.clearTimeout(state.typingStopTimer);
    state.typingStopTimer = null;
    state.typingSent = false;
    state.lastTypingSentAt = 0;
  }

  function sendTyping(typing) {
    if (!canSend()) return;
    state.socket.send(JSON.stringify({ type: "typing", typing }));
  }

  function stopTyping() {
    window.clearTimeout(state.typingStopTimer);
    state.typingStopTimer = null;
    if (state.typingSent) {
      sendTyping(false);
    }
    state.typingSent = false;
  }

  function notifyTyping() {
    if (!canSend() || !elements.messageInput.value.trim()) return;
    const now = Date.now();
    if (!state.typingSent || now - state.lastTypingSentAt > 1500) {
      sendTyping(true);
      state.typingSent = true;
      state.lastTypingSentAt = now;
    }
    window.clearTimeout(state.typingStopTimer);
    state.typingStopTimer = window.setTimeout(stopTyping, 2000);
  }

  function handleWelcome(data) {
    state.hasJoined = true;
    state.isReconnecting = false;
    state.clientId = data.clientId || "";
    state.displayName = data.name || state.joinName;
    state.users = Array.isArray(data.users) ? data.users : [];
    state.reconnectAttempt = 0;
    state.manualClose = false;

    writeStorage(nameKey, state.displayName);

    elements.joinScreen.hidden = true;
    elements.leaveButton.hidden = false;
    setJoinBusy(false);
    setJoinErrorKey("");
    setConnectionStatus("online", "status.online");
    renderUsers();
    renderHistory(data.history);

    if (state.everJoined) {
      appendSystemMessage({
        key: "system.restored",
        timestamp: data.timestamp,
      });
    } else {
      appendSystemMessage({
        key: "system.selfJoined",
        timestamp: data.timestamp,
      });
      state.everJoined = true;
    }

    setComposerEnabled(true);
    updateDocumentTitle();
    updateCharacterCount();
  }

  function handleServerError(data) {
    const key = serverErrorKeys[data.code] || "error.generic";
    const params = { max: maxMessageLength };
    if (!state.hasJoined) {
      setJoinErrorKey(key, params);
    }
    showToast(t(key, params));
  }

  function handleEvent(data) {
    switch (data.type) {
      case "welcome":
        handleWelcome(data);
        break;
      case "presence":
        updatePresence(data.users);
        break;
      case "message":
        stopTypingEntry(data.senderId);
        appendMessage(data, { smooth: true });
        break;
      case "system": {
        const systemKey =
          data.event === "join"
            ? "system.join"
            : data.event === "leave"
              ? "system.leave"
              : "";
        appendSystemMessage({
          key: systemKey,
          params: { name: data.name || "" },
          text: data.text,
          timestamp: data.timestamp,
        });
        break;
      }
      case "typing":
        updateTypingEvent(data);
        break;
      case "error":
        handleServerError(data);
        break;
      default:
        break;
    }
  }

  function clearReconnectTimer() {
    window.clearTimeout(state.reconnectTimer);
    state.reconnectTimer = null;
  }

  function scheduleReconnect() {
    if (state.manualClose) return;
    clearReconnectTimer();
    state.reconnectAttempt += 1;
    const attempt = state.reconnectAttempt;
    const delay = Math.min(1000 * 2 ** (attempt - 1), 10000) + Math.floor(Math.random() * 250);
    setConnectionStatus("reconnecting", "status.reconnectingAttempt", { attempt });
    state.reconnectTimer = window.setTimeout(() => {
      state.reconnectTimer = null;
      if (state.manualClose) return;
      connect(state.joinName, { reconnect: true });
    }, delay);
  }

  function handleSocketClose(socket) {
    if (socket !== state.socket) return;
    const wasJoined = state.hasJoined;
    const wasReconnecting = state.isReconnecting;

    state.socket = null;
    state.hasJoined = false;
    state.isReconnecting = wasReconnecting;
    setComposerEnabled(false);
    stopTyping();
    resetTypingState();
    clearTypingUsers();

    if (state.manualClose) {
      return;
    }

    if (wasJoined || wasReconnecting) {
      if (wasJoined) {
        showToast(t("toast.reconnecting"));
      }
      setConnectionStatus("reconnecting", "status.reconnecting");
      scheduleReconnect();
      return;
    }

    setConnectionStatus("offline", "status.failed");
    setJoinBusy(false);
    if (!state.joinErrorKey) {
      setJoinErrorKey("error.connectFailed");
    }
  }

  function connect(name, options = {}) {
    const reconnecting = Boolean(options.reconnect);
    clearReconnectTimer();

    if (state.socket) {
      state.socket.onclose = null;
      state.socket.close();
      state.socket = null;
    }

    state.joinName = name;
    state.hasJoined = false;
    state.isReconnecting = reconnecting;
    state.manualClose = false;
    setJoinErrorKey("");

    if (reconnecting) {
      setConnectionStatus("reconnecting", "status.reconnecting");
    } else {
      setConnectionStatus("connecting", "status.connecting");
      setJoinBusy(true);
    }

    let socket;
    try {
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      socket = new WebSocket(`${protocol}//${window.location.host}/ws`);
    } catch {
      setJoinBusy(false);
      state.isReconnecting = false;
      setConnectionStatus("offline", "status.failed");
      if (reconnecting) {
        scheduleReconnect();
      } else {
        setJoinErrorKey("error.websocketUnavailable");
      }
      return;
    }

    state.socket = socket;
    let handshakeTimer = window.setTimeout(() => {
      if (state.socket === socket && !state.hasJoined) {
        try {
          socket.close(4000, "Handshake timeout");
        } catch {
        }
      }
    }, 15000);

    socket.addEventListener("open", () => {
      if (state.socket !== socket) return;
      socket.send(JSON.stringify({ type: "join", name }));
    });

    socket.addEventListener("message", (event) => {
      if (state.socket !== socket) return;
      let data;
      try {
        data = JSON.parse(event.data);
      } catch {
        return;
      }
      if (!data || typeof data.type !== "string") return;
      if (data.type === "welcome") {
        window.clearTimeout(handshakeTimer);
      }
      handleEvent(data);
    });

    socket.addEventListener("close", () => {
      window.clearTimeout(handshakeTimer);
      handleSocketClose(socket);
    });

    socket.addEventListener("error", () => {
      if (state.socket === socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    });
  }

  function leaveChat() {
    state.manualClose = true;
    clearReconnectTimer();
    resetTypingState();
    clearTypingUsers();

    if (state.socket) {
      state.socket.onclose = null;
      state.socket.close();
      state.socket = null;
    }

    state.hasJoined = false;
    state.isReconnecting = false;
    state.everJoined = false;
    state.reconnectAttempt = 0;
    state.clientId = "";
    state.displayName = "";
    state.users = [];

    setJoinBusy(false);
    setJoinErrorKey("");
    setComposerEnabled(false);
    setConnectionStatus("idle", "status.idle");
    elements.leaveButton.hidden = true;
    elements.joinScreen.hidden = false;
    elements.nameInput.value = state.joinName;
    renderUsers();
    showEmptyState("empty.disconnected.title", "empty.disconnected.detail");
    updateDocumentTitle();
    elements.nameInput.focus();
    elements.nameInput.select();
  }

  function updateCharacterCount() {
    elements.characterCount.textContent = `${elements.messageInput.value.length} / ${maxMessageLength}`;
  }

  function resizeComposer() {
    const input = elements.messageInput;
    input.style.height = "auto";
    input.style.height = `${Math.min(Math.max(input.scrollHeight, 40), 140)}px`;
  }

  function resetComposer() {
    elements.messageInput.value = "";
    updateCharacterCount();
    resizeComposer();
  }

  function sendChatMessage() {
    if (!canSend()) {
      showToast(t("toast.notConnected"));
      return;
    }

    const text = elements.messageInput.value.trim();
    if (!text) return;

    try {
      state.socket.send(JSON.stringify({ type: "chat", text }));
    } catch {
      showToast(t("toast.sendFailed"));
      return;
    }

    stopTyping();
    resetComposer();
    elements.messageInput.focus();
  }

  elements.joinForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (elements.joinButton.disabled) return;

    const name = elements.nameInput.value.trim().replace(/\s+/g, " ").slice(0, 24);
    if (!name) {
      setJoinErrorKey("error.emptyName");
      elements.nameInput.focus();
      return;
    }

    state.everJoined = false;
    state.joinName = name;
    connect(name);
  });

  elements.composer.addEventListener("submit", (event) => {
    event.preventDefault();
    sendChatMessage();
  });

  elements.messageInput.addEventListener("input", () => {
    updateCharacterCount();
    resizeComposer();
    notifyTyping();
  });

  elements.messageInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" || event.shiftKey) return;
    if (event.isComposing || event.keyCode === 229) return;
    event.preventDefault();
    sendChatMessage();
  });

  elements.messageInput.addEventListener("blur", stopTyping);
  elements.leaveButton.addEventListener("click", leaveChat);

  document.querySelectorAll("[data-language-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      applyLanguage(state.lang === "zh" ? "en" : "zh");
    });
  });

  window.addEventListener("online", () => {
    if (!state.hasJoined && state.isReconnecting && !state.reconnectTimer) {
      connect(state.joinName, { reconnect: true });
    }
  });

  window.addEventListener("offline", () => {
    if (state.hasJoined) {
      showToast(t("toast.offline"));
    }
  });

  elements.nameInput.value = readStorage(nameKey);
  applyLanguage(state.lang, { persist: false });
  setJoinBusy(false);
  showEmptyState("empty.disconnected.title", "empty.disconnected.detail");
  updateCharacterCount();
  resizeComposer();
  elements.nameInput.focus();
  elements.nameInput.select();
})();

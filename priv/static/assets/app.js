(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __objRest = (source, exclude) => {
    var target = {};
    for (var prop in source)
      if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
        target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(source)) {
        if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
          target[prop] = source[prop];
      }
    return target;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // vendor/topbar.js
  var require_topbar = __commonJS({
    "vendor/topbar.js"(exports, module) {
      (function(window2, document2) {
        "use strict";
        (function() {
          var lastTime = 0;
          var vendors = ["ms", "moz", "webkit", "o"];
          for (var x = 0; x < vendors.length && !window2.requestAnimationFrame; ++x) {
            window2.requestAnimationFrame = window2[vendors[x] + "RequestAnimationFrame"];
            window2.cancelAnimationFrame = window2[vendors[x] + "CancelAnimationFrame"] || window2[vendors[x] + "CancelRequestAnimationFrame"];
          }
          if (!window2.requestAnimationFrame)
            window2.requestAnimationFrame = function(callback, element) {
              var currTime = (/* @__PURE__ */ new Date()).getTime();
              var timeToCall = Math.max(0, 16 - (currTime - lastTime));
              var id = window2.setTimeout(function() {
                callback(currTime + timeToCall);
              }, timeToCall);
              lastTime = currTime + timeToCall;
              return id;
            };
          if (!window2.cancelAnimationFrame)
            window2.cancelAnimationFrame = function(id) {
              clearTimeout(id);
            };
        })();
        var canvas, currentProgress, showing, progressTimerId = null, fadeTimerId = null, delayTimerId = null, addEvent = function(elem, type, handler) {
          if (elem.addEventListener)
            elem.addEventListener(type, handler, false);
          else if (elem.attachEvent)
            elem.attachEvent("on" + type, handler);
          else
            elem["on" + type] = handler;
        }, options = {
          autoRun: true,
          barThickness: 3,
          barColors: {
            0: "rgba(26,  188, 156, .9)",
            ".25": "rgba(52,  152, 219, .9)",
            ".50": "rgba(241, 196, 15,  .9)",
            ".75": "rgba(230, 126, 34,  .9)",
            "1.0": "rgba(211, 84,  0,   .9)"
          },
          shadowBlur: 10,
          shadowColor: "rgba(0,   0,   0,   .6)",
          className: null
        }, repaint = function() {
          canvas.width = window2.innerWidth;
          canvas.height = options.barThickness * 5;
          var ctx = canvas.getContext("2d");
          ctx.shadowBlur = options.shadowBlur;
          ctx.shadowColor = options.shadowColor;
          var lineGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
          for (var stop in options.barColors)
            lineGradient.addColorStop(stop, options.barColors[stop]);
          ctx.lineWidth = options.barThickness;
          ctx.beginPath();
          ctx.moveTo(0, options.barThickness / 2);
          ctx.lineTo(
            Math.ceil(currentProgress * canvas.width),
            options.barThickness / 2
          );
          ctx.strokeStyle = lineGradient;
          ctx.stroke();
        }, createCanvas = function() {
          canvas = document2.createElement("canvas");
          var style = canvas.style;
          style.position = "fixed";
          style.top = style.left = style.right = style.margin = style.padding = 0;
          style.zIndex = 100001;
          style.display = "none";
          if (options.className)
            canvas.classList.add(options.className);
          document2.body.appendChild(canvas);
          addEvent(window2, "resize", repaint);
        }, topbar2 = {
          config: function(opts) {
            for (var key in opts)
              if (options.hasOwnProperty(key))
                options[key] = opts[key];
          },
          show: function(delay) {
            if (showing)
              return;
            if (delay) {
              if (delayTimerId)
                return;
              delayTimerId = setTimeout(() => topbar2.show(), delay);
            } else {
              showing = true;
              if (fadeTimerId !== null)
                window2.cancelAnimationFrame(fadeTimerId);
              if (!canvas)
                createCanvas();
              canvas.style.opacity = 1;
              canvas.style.display = "block";
              topbar2.progress(0);
              if (options.autoRun) {
                (function loop() {
                  progressTimerId = window2.requestAnimationFrame(loop);
                  topbar2.progress(
                    "+" + 0.05 * Math.pow(1 - Math.sqrt(currentProgress), 2)
                  );
                })();
              }
            }
          },
          progress: function(to) {
            if (typeof to === "undefined")
              return currentProgress;
            if (typeof to === "string") {
              to = (to.indexOf("+") >= 0 || to.indexOf("-") >= 0 ? currentProgress : 0) + parseFloat(to);
            }
            currentProgress = to > 1 ? 1 : to;
            repaint();
            return currentProgress;
          },
          hide: function() {
            clearTimeout(delayTimerId);
            delayTimerId = null;
            if (!showing)
              return;
            showing = false;
            if (progressTimerId != null) {
              window2.cancelAnimationFrame(progressTimerId);
              progressTimerId = null;
            }
            (function loop() {
              if (topbar2.progress("+.1") >= 1) {
                canvas.style.opacity -= 0.05;
                if (canvas.style.opacity <= 0.05) {
                  canvas.style.display = "none";
                  fadeTimerId = null;
                  return;
                }
              }
              fadeTimerId = window2.requestAnimationFrame(loop);
            })();
          }
        };
        if (typeof module === "object" && typeof module.exports === "object") {
          module.exports = topbar2;
        } else if (typeof define === "function" && define.amd) {
          define(function() {
            return topbar2;
          });
        } else {
          this.topbar = topbar2;
        }
      }).call(exports, window, document);
    }
  });

  // ../deps/phoenix/priv/static/phoenix.mjs
  var closure = (value) => {
    if (typeof value === "function") {
      return value;
    } else {
      let closure22 = function() {
        return value;
      };
      return closure22;
    }
  };
  var globalSelf = typeof self !== "undefined" ? self : null;
  var phxWindow = typeof window !== "undefined" ? window : null;
  var global = globalSelf || phxWindow || global;
  var DEFAULT_VSN = "2.0.0";
  var SOCKET_STATES = { connecting: 0, open: 1, closing: 2, closed: 3 };
  var DEFAULT_TIMEOUT = 1e4;
  var WS_CLOSE_NORMAL = 1e3;
  var CHANNEL_STATES = {
    closed: "closed",
    errored: "errored",
    joined: "joined",
    joining: "joining",
    leaving: "leaving"
  };
  var CHANNEL_EVENTS = {
    close: "phx_close",
    error: "phx_error",
    join: "phx_join",
    reply: "phx_reply",
    leave: "phx_leave"
  };
  var TRANSPORTS = {
    longpoll: "longpoll",
    websocket: "websocket"
  };
  var XHR_STATES = {
    complete: 4
  };
  var Push = class {
    constructor(channel, event, payload, timeout) {
      this.channel = channel;
      this.event = event;
      this.payload = payload || function() {
        return {};
      };
      this.receivedResp = null;
      this.timeout = timeout;
      this.timeoutTimer = null;
      this.recHooks = [];
      this.sent = false;
    }
    /**
     *
     * @param {number} timeout
     */
    resend(timeout) {
      this.timeout = timeout;
      this.reset();
      this.send();
    }
    /**
     *
     */
    send() {
      if (this.hasReceived("timeout")) {
        return;
      }
      this.startTimeout();
      this.sent = true;
      this.channel.socket.push({
        topic: this.channel.topic,
        event: this.event,
        payload: this.payload(),
        ref: this.ref,
        join_ref: this.channel.joinRef()
      });
    }
    /**
     *
     * @param {*} status
     * @param {*} callback
     */
    receive(status, callback) {
      if (this.hasReceived(status)) {
        callback(this.receivedResp.response);
      }
      this.recHooks.push({ status, callback });
      return this;
    }
    /**
     * @private
     */
    reset() {
      this.cancelRefEvent();
      this.ref = null;
      this.refEvent = null;
      this.receivedResp = null;
      this.sent = false;
    }
    /**
     * @private
     */
    matchReceive({ status, response, _ref }) {
      this.recHooks.filter((h) => h.status === status).forEach((h) => h.callback(response));
    }
    /**
     * @private
     */
    cancelRefEvent() {
      if (!this.refEvent) {
        return;
      }
      this.channel.off(this.refEvent);
    }
    /**
     * @private
     */
    cancelTimeout() {
      clearTimeout(this.timeoutTimer);
      this.timeoutTimer = null;
    }
    /**
     * @private
     */
    startTimeout() {
      if (this.timeoutTimer) {
        this.cancelTimeout();
      }
      this.ref = this.channel.socket.makeRef();
      this.refEvent = this.channel.replyEventName(this.ref);
      this.channel.on(this.refEvent, (payload) => {
        this.cancelRefEvent();
        this.cancelTimeout();
        this.receivedResp = payload;
        this.matchReceive(payload);
      });
      this.timeoutTimer = setTimeout(() => {
        this.trigger("timeout", {});
      }, this.timeout);
    }
    /**
     * @private
     */
    hasReceived(status) {
      return this.receivedResp && this.receivedResp.status === status;
    }
    /**
     * @private
     */
    trigger(status, response) {
      this.channel.trigger(this.refEvent, { status, response });
    }
  };
  var Timer = class {
    constructor(callback, timerCalc) {
      this.callback = callback;
      this.timerCalc = timerCalc;
      this.timer = null;
      this.tries = 0;
    }
    reset() {
      this.tries = 0;
      clearTimeout(this.timer);
    }
    /**
     * Cancels any previous scheduleTimeout and schedules callback
     */
    scheduleTimeout() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.tries = this.tries + 1;
        this.callback();
      }, this.timerCalc(this.tries + 1));
    }
  };
  var Channel = class {
    constructor(topic, params, socket2) {
      this.state = CHANNEL_STATES.closed;
      this.topic = topic;
      this.params = closure(params || {});
      this.socket = socket2;
      this.bindings = [];
      this.bindingRef = 0;
      this.timeout = this.socket.timeout;
      this.joinedOnce = false;
      this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout);
      this.pushBuffer = [];
      this.stateChangeRefs = [];
      this.rejoinTimer = new Timer(() => {
        if (this.socket.isConnected()) {
          this.rejoin();
        }
      }, this.socket.rejoinAfterMs);
      this.stateChangeRefs.push(this.socket.onError(() => this.rejoinTimer.reset()));
      this.stateChangeRefs.push(
        this.socket.onOpen(() => {
          this.rejoinTimer.reset();
          if (this.isErrored()) {
            this.rejoin();
          }
        })
      );
      this.joinPush.receive("ok", () => {
        this.state = CHANNEL_STATES.joined;
        this.rejoinTimer.reset();
        this.pushBuffer.forEach((pushEvent) => pushEvent.send());
        this.pushBuffer = [];
      });
      this.joinPush.receive("error", () => {
        this.state = CHANNEL_STATES.errored;
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.onClose(() => {
        this.rejoinTimer.reset();
        if (this.socket.hasLogger())
          this.socket.log("channel", `close ${this.topic} ${this.joinRef()}`);
        this.state = CHANNEL_STATES.closed;
        this.socket.remove(this);
      });
      this.onError((reason) => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `error ${this.topic}`, reason);
        if (this.isJoining()) {
          this.joinPush.reset();
        }
        this.state = CHANNEL_STATES.errored;
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.joinPush.receive("timeout", () => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `timeout ${this.topic} (${this.joinRef()})`, this.joinPush.timeout);
        let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), this.timeout);
        leavePush.send();
        this.state = CHANNEL_STATES.errored;
        this.joinPush.reset();
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.on(CHANNEL_EVENTS.reply, (payload, ref) => {
        this.trigger(this.replyEventName(ref), payload);
      });
    }
    /**
     * Join the channel
     * @param {integer} timeout
     * @returns {Push}
     */
    join(timeout = this.timeout) {
      if (this.joinedOnce) {
        throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");
      } else {
        this.timeout = timeout;
        this.joinedOnce = true;
        this.rejoin();
        return this.joinPush;
      }
    }
    /**
     * Hook into channel close
     * @param {Function} callback
     */
    onClose(callback) {
      this.on(CHANNEL_EVENTS.close, callback);
    }
    /**
     * Hook into channel errors
     * @param {Function} callback
     */
    onError(callback) {
      return this.on(CHANNEL_EVENTS.error, (reason) => callback(reason));
    }
    /**
     * Subscribes on channel events
     *
     * Subscription returns a ref counter, which can be used later to
     * unsubscribe the exact event listener
     *
     * @example
     * const ref1 = channel.on("event", do_stuff)
     * const ref2 = channel.on("event", do_other_stuff)
     * channel.off("event", ref1)
     * // Since unsubscription, do_stuff won't fire,
     * // while do_other_stuff will keep firing on the "event"
     *
     * @param {string} event
     * @param {Function} callback
     * @returns {integer} ref
     */
    on(event, callback) {
      let ref = this.bindingRef++;
      this.bindings.push({ event, ref, callback });
      return ref;
    }
    /**
     * Unsubscribes off of channel events
     *
     * Use the ref returned from a channel.on() to unsubscribe one
     * handler, or pass nothing for the ref to unsubscribe all
     * handlers for the given event.
     *
     * @example
     * // Unsubscribe the do_stuff handler
     * const ref1 = channel.on("event", do_stuff)
     * channel.off("event", ref1)
     *
     * // Unsubscribe all handlers from event
     * channel.off("event")
     *
     * @param {string} event
     * @param {integer} ref
     */
    off(event, ref) {
      this.bindings = this.bindings.filter((bind) => {
        return !(bind.event === event && (typeof ref === "undefined" || ref === bind.ref));
      });
    }
    /**
     * @private
     */
    canPush() {
      return this.socket.isConnected() && this.isJoined();
    }
    /**
     * Sends a message `event` to phoenix with the payload `payload`.
     * Phoenix receives this in the `handle_in(event, payload, socket)`
     * function. if phoenix replies or it times out (default 10000ms),
     * then optionally the reply can be received.
     *
     * @example
     * channel.push("event")
     *   .receive("ok", payload => console.log("phoenix replied:", payload))
     *   .receive("error", err => console.log("phoenix errored", err))
     *   .receive("timeout", () => console.log("timed out pushing"))
     * @param {string} event
     * @param {Object} payload
     * @param {number} [timeout]
     * @returns {Push}
     */
    push(event, payload, timeout = this.timeout) {
      payload = payload || {};
      if (!this.joinedOnce) {
        throw new Error(`tried to push '${event}' to '${this.topic}' before joining. Use channel.join() before pushing events`);
      }
      let pushEvent = new Push(this, event, function() {
        return payload;
      }, timeout);
      if (this.canPush()) {
        pushEvent.send();
      } else {
        pushEvent.startTimeout();
        this.pushBuffer.push(pushEvent);
      }
      return pushEvent;
    }
    /** Leaves the channel
     *
     * Unsubscribes from server events, and
     * instructs channel to terminate on server
     *
     * Triggers onClose() hooks
     *
     * To receive leave acknowledgements, use the `receive`
     * hook to bind to the server ack, ie:
     *
     * @example
     * channel.leave().receive("ok", () => alert("left!") )
     *
     * @param {integer} timeout
     * @returns {Push}
     */
    leave(timeout = this.timeout) {
      this.rejoinTimer.reset();
      this.joinPush.cancelTimeout();
      this.state = CHANNEL_STATES.leaving;
      let onClose = () => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `leave ${this.topic}`);
        this.trigger(CHANNEL_EVENTS.close, "leave");
      };
      let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), timeout);
      leavePush.receive("ok", () => onClose()).receive("timeout", () => onClose());
      leavePush.send();
      if (!this.canPush()) {
        leavePush.trigger("ok", {});
      }
      return leavePush;
    }
    /**
     * Overridable message hook
     *
     * Receives all events for specialized message handling
     * before dispatching to the channel callbacks.
     *
     * Must return the payload, modified or unmodified
     * @param {string} event
     * @param {Object} payload
     * @param {integer} ref
     * @returns {Object}
     */
    onMessage(_event, payload, _ref) {
      return payload;
    }
    /**
     * @private
     */
    isMember(topic, event, payload, joinRef) {
      if (this.topic !== topic) {
        return false;
      }
      if (joinRef && joinRef !== this.joinRef()) {
        if (this.socket.hasLogger())
          this.socket.log("channel", "dropping outdated message", { topic, event, payload, joinRef });
        return false;
      } else {
        return true;
      }
    }
    /**
     * @private
     */
    joinRef() {
      return this.joinPush.ref;
    }
    /**
     * @private
     */
    rejoin(timeout = this.timeout) {
      if (this.isLeaving()) {
        return;
      }
      this.socket.leaveOpenTopic(this.topic);
      this.state = CHANNEL_STATES.joining;
      this.joinPush.resend(timeout);
    }
    /**
     * @private
     */
    trigger(event, payload, ref, joinRef) {
      let handledPayload = this.onMessage(event, payload, ref, joinRef);
      if (payload && !handledPayload) {
        throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");
      }
      let eventBindings = this.bindings.filter((bind) => bind.event === event);
      for (let i = 0; i < eventBindings.length; i++) {
        let bind = eventBindings[i];
        bind.callback(handledPayload, ref, joinRef || this.joinRef());
      }
    }
    /**
     * @private
     */
    replyEventName(ref) {
      return `chan_reply_${ref}`;
    }
    /**
     * @private
     */
    isClosed() {
      return this.state === CHANNEL_STATES.closed;
    }
    /**
     * @private
     */
    isErrored() {
      return this.state === CHANNEL_STATES.errored;
    }
    /**
     * @private
     */
    isJoined() {
      return this.state === CHANNEL_STATES.joined;
    }
    /**
     * @private
     */
    isJoining() {
      return this.state === CHANNEL_STATES.joining;
    }
    /**
     * @private
     */
    isLeaving() {
      return this.state === CHANNEL_STATES.leaving;
    }
  };
  var Ajax = class {
    static request(method, endPoint, accept, body, timeout, ontimeout, callback) {
      if (global.XDomainRequest) {
        let req = new global.XDomainRequest();
        return this.xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback);
      } else {
        let req = new global.XMLHttpRequest();
        return this.xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback);
      }
    }
    static xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback) {
      req.timeout = timeout;
      req.open(method, endPoint);
      req.onload = () => {
        let response = this.parseJSON(req.responseText);
        callback && callback(response);
      };
      if (ontimeout) {
        req.ontimeout = ontimeout;
      }
      req.onprogress = () => {
      };
      req.send(body);
      return req;
    }
    static xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback) {
      req.open(method, endPoint, true);
      req.timeout = timeout;
      req.setRequestHeader("Content-Type", accept);
      req.onerror = () => callback && callback(null);
      req.onreadystatechange = () => {
        if (req.readyState === XHR_STATES.complete && callback) {
          let response = this.parseJSON(req.responseText);
          callback(response);
        }
      };
      if (ontimeout) {
        req.ontimeout = ontimeout;
      }
      req.send(body);
      return req;
    }
    static parseJSON(resp) {
      if (!resp || resp === "") {
        return null;
      }
      try {
        return JSON.parse(resp);
      } catch (e) {
        console && console.log("failed to parse JSON response", resp);
        return null;
      }
    }
    static serialize(obj, parentKey) {
      let queryStr = [];
      for (var key in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, key)) {
          continue;
        }
        let paramKey = parentKey ? `${parentKey}[${key}]` : key;
        let paramVal = obj[key];
        if (typeof paramVal === "object") {
          queryStr.push(this.serialize(paramVal, paramKey));
        } else {
          queryStr.push(encodeURIComponent(paramKey) + "=" + encodeURIComponent(paramVal));
        }
      }
      return queryStr.join("&");
    }
    static appendParams(url, params) {
      if (Object.keys(params).length === 0) {
        return url;
      }
      let prefix = url.match(/\?/) ? "&" : "?";
      return `${url}${prefix}${this.serialize(params)}`;
    }
  };
  var arrayBufferToBase64 = (buffer) => {
    let binary = "";
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };
  var LongPoll = class {
    constructor(endPoint) {
      this.endPoint = null;
      this.token = null;
      this.skipHeartbeat = true;
      this.reqs = /* @__PURE__ */ new Set();
      this.awaitingBatchAck = false;
      this.currentBatch = null;
      this.currentBatchTimer = null;
      this.batchBuffer = [];
      this.onopen = function() {
      };
      this.onerror = function() {
      };
      this.onmessage = function() {
      };
      this.onclose = function() {
      };
      this.pollEndpoint = this.normalizeEndpoint(endPoint);
      this.readyState = SOCKET_STATES.connecting;
      setTimeout(() => this.poll(), 0);
    }
    normalizeEndpoint(endPoint) {
      return endPoint.replace("ws://", "http://").replace("wss://", "https://").replace(new RegExp("(.*)/" + TRANSPORTS.websocket), "$1/" + TRANSPORTS.longpoll);
    }
    endpointURL() {
      return Ajax.appendParams(this.pollEndpoint, { token: this.token });
    }
    closeAndRetry(code, reason, wasClean) {
      this.close(code, reason, wasClean);
      this.readyState = SOCKET_STATES.connecting;
    }
    ontimeout() {
      this.onerror("timeout");
      this.closeAndRetry(1005, "timeout", false);
    }
    isActive() {
      return this.readyState === SOCKET_STATES.open || this.readyState === SOCKET_STATES.connecting;
    }
    poll() {
      this.ajax("GET", "application/json", null, () => this.ontimeout(), (resp) => {
        if (resp) {
          var { status, token, messages } = resp;
          this.token = token;
        } else {
          status = 0;
        }
        switch (status) {
          case 200:
            messages.forEach((msg) => {
              setTimeout(() => this.onmessage({ data: msg }), 0);
            });
            this.poll();
            break;
          case 204:
            this.poll();
            break;
          case 410:
            this.readyState = SOCKET_STATES.open;
            this.onopen({});
            this.poll();
            break;
          case 403:
            this.onerror(403);
            this.close(1008, "forbidden", false);
            break;
          case 0:
          case 500:
            this.onerror(500);
            this.closeAndRetry(1011, "internal server error", 500);
            break;
          default:
            throw new Error(`unhandled poll status ${status}`);
        }
      });
    }
    // we collect all pushes within the current event loop by
    // setTimeout 0, which optimizes back-to-back procedural
    // pushes against an empty buffer
    send(body) {
      if (typeof body !== "string") {
        body = arrayBufferToBase64(body);
      }
      if (this.currentBatch) {
        this.currentBatch.push(body);
      } else if (this.awaitingBatchAck) {
        this.batchBuffer.push(body);
      } else {
        this.currentBatch = [body];
        this.currentBatchTimer = setTimeout(() => {
          this.batchSend(this.currentBatch);
          this.currentBatch = null;
        }, 0);
      }
    }
    batchSend(messages) {
      this.awaitingBatchAck = true;
      this.ajax("POST", "application/x-ndjson", messages.join("\n"), () => this.onerror("timeout"), (resp) => {
        this.awaitingBatchAck = false;
        if (!resp || resp.status !== 200) {
          this.onerror(resp && resp.status);
          this.closeAndRetry(1011, "internal server error", false);
        } else if (this.batchBuffer.length > 0) {
          this.batchSend(this.batchBuffer);
          this.batchBuffer = [];
        }
      });
    }
    close(code, reason, wasClean) {
      for (let req of this.reqs) {
        req.abort();
      }
      this.readyState = SOCKET_STATES.closed;
      let opts = Object.assign({ code: 1e3, reason: void 0, wasClean: true }, { code, reason, wasClean });
      this.batchBuffer = [];
      clearTimeout(this.currentBatchTimer);
      this.currentBatchTimer = null;
      if (typeof CloseEvent !== "undefined") {
        this.onclose(new CloseEvent("close", opts));
      } else {
        this.onclose(opts);
      }
    }
    ajax(method, contentType, body, onCallerTimeout, callback) {
      let req;
      let ontimeout = () => {
        this.reqs.delete(req);
        onCallerTimeout();
      };
      req = Ajax.request(method, this.endpointURL(), contentType, body, this.timeout, ontimeout, (resp) => {
        this.reqs.delete(req);
        if (this.isActive()) {
          callback(resp);
        }
      });
      this.reqs.add(req);
    }
  };
  var serializer_default = {
    HEADER_LENGTH: 1,
    META_LENGTH: 4,
    KINDS: { push: 0, reply: 1, broadcast: 2 },
    encode(msg, callback) {
      if (msg.payload.constructor === ArrayBuffer) {
        return callback(this.binaryEncode(msg));
      } else {
        let payload = [msg.join_ref, msg.ref, msg.topic, msg.event, msg.payload];
        return callback(JSON.stringify(payload));
      }
    },
    decode(rawPayload, callback) {
      if (rawPayload.constructor === ArrayBuffer) {
        return callback(this.binaryDecode(rawPayload));
      } else {
        let [join_ref, ref, topic, event, payload] = JSON.parse(rawPayload);
        return callback({ join_ref, ref, topic, event, payload });
      }
    },
    // private
    binaryEncode(message) {
      let { join_ref, ref, event, topic, payload } = message;
      let metaLength = this.META_LENGTH + join_ref.length + ref.length + topic.length + event.length;
      let header = new ArrayBuffer(this.HEADER_LENGTH + metaLength);
      let view = new DataView(header);
      let offset = 0;
      view.setUint8(offset++, this.KINDS.push);
      view.setUint8(offset++, join_ref.length);
      view.setUint8(offset++, ref.length);
      view.setUint8(offset++, topic.length);
      view.setUint8(offset++, event.length);
      Array.from(join_ref, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(ref, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(topic, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(event, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      var combined = new Uint8Array(header.byteLength + payload.byteLength);
      combined.set(new Uint8Array(header), 0);
      combined.set(new Uint8Array(payload), header.byteLength);
      return combined.buffer;
    },
    binaryDecode(buffer) {
      let view = new DataView(buffer);
      let kind = view.getUint8(0);
      let decoder = new TextDecoder();
      switch (kind) {
        case this.KINDS.push:
          return this.decodePush(buffer, view, decoder);
        case this.KINDS.reply:
          return this.decodeReply(buffer, view, decoder);
        case this.KINDS.broadcast:
          return this.decodeBroadcast(buffer, view, decoder);
      }
    },
    decodePush(buffer, view, decoder) {
      let joinRefSize = view.getUint8(1);
      let topicSize = view.getUint8(2);
      let eventSize = view.getUint8(3);
      let offset = this.HEADER_LENGTH + this.META_LENGTH - 1;
      let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
      offset = offset + joinRefSize;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      return { join_ref: joinRef, ref: null, topic, event, payload: data };
    },
    decodeReply(buffer, view, decoder) {
      let joinRefSize = view.getUint8(1);
      let refSize = view.getUint8(2);
      let topicSize = view.getUint8(3);
      let eventSize = view.getUint8(4);
      let offset = this.HEADER_LENGTH + this.META_LENGTH;
      let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
      offset = offset + joinRefSize;
      let ref = decoder.decode(buffer.slice(offset, offset + refSize));
      offset = offset + refSize;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      let payload = { status: event, response: data };
      return { join_ref: joinRef, ref, topic, event: CHANNEL_EVENTS.reply, payload };
    },
    decodeBroadcast(buffer, view, decoder) {
      let topicSize = view.getUint8(1);
      let eventSize = view.getUint8(2);
      let offset = this.HEADER_LENGTH + 2;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      return { join_ref: null, ref: null, topic, event, payload: data };
    }
  };
  var Socket = class {
    constructor(endPoint, opts = {}) {
      this.stateChangeCallbacks = { open: [], close: [], error: [], message: [] };
      this.channels = [];
      this.sendBuffer = [];
      this.ref = 0;
      this.timeout = opts.timeout || DEFAULT_TIMEOUT;
      this.transport = opts.transport || global.WebSocket || LongPoll;
      this.longPollFallbackMs = opts.longPollFallbackMs;
      this.fallbackTimer = null;
      this.sessionStore = opts.sessionStorage || global.sessionStorage;
      this.establishedConnections = 0;
      this.defaultEncoder = serializer_default.encode.bind(serializer_default);
      this.defaultDecoder = serializer_default.decode.bind(serializer_default);
      this.closeWasClean = false;
      this.binaryType = opts.binaryType || "arraybuffer";
      this.connectClock = 1;
      if (this.transport !== LongPoll) {
        this.encode = opts.encode || this.defaultEncoder;
        this.decode = opts.decode || this.defaultDecoder;
      } else {
        this.encode = this.defaultEncoder;
        this.decode = this.defaultDecoder;
      }
      let awaitingConnectionOnPageShow = null;
      if (phxWindow && phxWindow.addEventListener) {
        phxWindow.addEventListener("pagehide", (_e) => {
          if (this.conn) {
            this.disconnect();
            awaitingConnectionOnPageShow = this.connectClock;
          }
        });
        phxWindow.addEventListener("pageshow", (_e) => {
          if (awaitingConnectionOnPageShow === this.connectClock) {
            awaitingConnectionOnPageShow = null;
            this.connect();
          }
        });
      }
      this.heartbeatIntervalMs = opts.heartbeatIntervalMs || 3e4;
      this.rejoinAfterMs = (tries) => {
        if (opts.rejoinAfterMs) {
          return opts.rejoinAfterMs(tries);
        } else {
          return [1e3, 2e3, 5e3][tries - 1] || 1e4;
        }
      };
      this.reconnectAfterMs = (tries) => {
        if (opts.reconnectAfterMs) {
          return opts.reconnectAfterMs(tries);
        } else {
          return [10, 50, 100, 150, 200, 250, 500, 1e3, 2e3][tries - 1] || 5e3;
        }
      };
      this.logger = opts.logger || null;
      if (!this.logger && opts.debug) {
        this.logger = (kind, msg, data) => {
          console.log(`${kind}: ${msg}`, data);
        };
      }
      this.longpollerTimeout = opts.longpollerTimeout || 2e4;
      this.params = closure(opts.params || {});
      this.endPoint = `${endPoint}/${TRANSPORTS.websocket}`;
      this.vsn = opts.vsn || DEFAULT_VSN;
      this.heartbeatTimeoutTimer = null;
      this.heartbeatTimer = null;
      this.pendingHeartbeatRef = null;
      this.reconnectTimer = new Timer(() => {
        this.teardown(() => this.connect());
      }, this.reconnectAfterMs);
    }
    /**
     * Returns the LongPoll transport reference
     */
    getLongPollTransport() {
      return LongPoll;
    }
    /**
     * Disconnects and replaces the active transport
     *
     * @param {Function} newTransport - The new transport class to instantiate
     *
     */
    replaceTransport(newTransport) {
      this.connectClock++;
      this.closeWasClean = true;
      clearTimeout(this.fallbackTimer);
      this.reconnectTimer.reset();
      if (this.conn) {
        this.conn.close();
        this.conn = null;
      }
      this.transport = newTransport;
    }
    /**
     * Returns the socket protocol
     *
     * @returns {string}
     */
    protocol() {
      return location.protocol.match(/^https/) ? "wss" : "ws";
    }
    /**
     * The fully qualified socket url
     *
     * @returns {string}
     */
    endPointURL() {
      let uri = Ajax.appendParams(
        Ajax.appendParams(this.endPoint, this.params()),
        { vsn: this.vsn }
      );
      if (uri.charAt(0) !== "/") {
        return uri;
      }
      if (uri.charAt(1) === "/") {
        return `${this.protocol()}:${uri}`;
      }
      return `${this.protocol()}://${location.host}${uri}`;
    }
    /**
     * Disconnects the socket
     *
     * See https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#Status_codes for valid status codes.
     *
     * @param {Function} callback - Optional callback which is called after socket is disconnected.
     * @param {integer} code - A status code for disconnection (Optional).
     * @param {string} reason - A textual description of the reason to disconnect. (Optional)
     */
    disconnect(callback, code, reason) {
      this.connectClock++;
      this.closeWasClean = true;
      clearTimeout(this.fallbackTimer);
      this.reconnectTimer.reset();
      this.teardown(callback, code, reason);
    }
    /**
     *
     * @param {Object} params - The params to send when connecting, for example `{user_id: userToken}`
     *
     * Passing params to connect is deprecated; pass them in the Socket constructor instead:
     * `new Socket("/socket", {params: {user_id: userToken}})`.
     */
    connect(params) {
      if (params) {
        console && console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor");
        this.params = closure(params);
      }
      if (this.conn) {
        return;
      }
      if (this.longPollFallbackMs && this.transport !== LongPoll) {
        this.connectWithFallback(LongPoll, this.longPollFallbackMs);
      } else {
        this.transportConnect();
      }
    }
    /**
     * Logs the message. Override `this.logger` for specialized logging. noops by default
     * @param {string} kind
     * @param {string} msg
     * @param {Object} data
     */
    log(kind, msg, data) {
      this.logger && this.logger(kind, msg, data);
    }
    /**
     * Returns true if a logger has been set on this socket.
     */
    hasLogger() {
      return this.logger !== null;
    }
    /**
     * Registers callbacks for connection open events
     *
     * @example socket.onOpen(function(){ console.info("the socket was opened") })
     *
     * @param {Function} callback
     */
    onOpen(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.open.push([ref, callback]);
      return ref;
    }
    /**
     * Registers callbacks for connection close events
     * @param {Function} callback
     */
    onClose(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.close.push([ref, callback]);
      return ref;
    }
    /**
     * Registers callbacks for connection error events
     *
     * @example socket.onError(function(error){ alert("An error occurred") })
     *
     * @param {Function} callback
     */
    onError(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.error.push([ref, callback]);
      return ref;
    }
    /**
     * Registers callbacks for connection message events
     * @param {Function} callback
     */
    onMessage(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.message.push([ref, callback]);
      return ref;
    }
    /**
     * Pings the server and invokes the callback with the RTT in milliseconds
     * @param {Function} callback
     *
     * Returns true if the ping was pushed or false if unable to be pushed.
     */
    ping(callback) {
      if (!this.isConnected()) {
        return false;
      }
      let ref = this.makeRef();
      let startTime = Date.now();
      this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref });
      let onMsgRef = this.onMessage((msg) => {
        if (msg.ref === ref) {
          this.off([onMsgRef]);
          callback(Date.now() - startTime);
        }
      });
      return true;
    }
    /**
     * @private
     */
    transportConnect() {
      this.connectClock++;
      this.closeWasClean = false;
      this.conn = new this.transport(this.endPointURL());
      this.conn.binaryType = this.binaryType;
      this.conn.timeout = this.longpollerTimeout;
      this.conn.onopen = () => this.onConnOpen();
      this.conn.onerror = (error) => this.onConnError(error);
      this.conn.onmessage = (event) => this.onConnMessage(event);
      this.conn.onclose = (event) => this.onConnClose(event);
    }
    getSession(key) {
      return this.sessionStore && this.sessionStore.getItem(key);
    }
    storeSession(key, val) {
      this.sessionStore && this.sessionStore.setItem(key, val);
    }
    connectWithFallback(fallbackTransport, fallbackThreshold = 2500) {
      clearTimeout(this.fallbackTimer);
      let established = false;
      let primaryTransport = true;
      let openRef, errorRef;
      let fallback = (reason) => {
        this.log("transport", `falling back to ${fallbackTransport.name}...`, reason);
        this.off([openRef, errorRef]);
        primaryTransport = false;
        this.storeSession("phx:longpoll", "true");
        this.replaceTransport(fallbackTransport);
        this.transportConnect();
      };
      if (this.getSession("phx:longpoll")) {
        return fallback("memorized");
      }
      this.fallbackTimer = setTimeout(fallback, fallbackThreshold);
      errorRef = this.onError((reason) => {
        this.log("transport", "error", reason);
        if (primaryTransport && !established) {
          clearTimeout(this.fallbackTimer);
          fallback(reason);
        }
      });
      this.onOpen(() => {
        established = true;
        if (!primaryTransport) {
          return console.log("transport", `established ${fallbackTransport.name} fallback`);
        }
        clearTimeout(this.fallbackTimer);
        this.fallbackTimer = setTimeout(fallback, fallbackThreshold);
        this.ping((rtt) => {
          this.log("transport", "connected to primary after", rtt);
          clearTimeout(this.fallbackTimer);
        });
      });
      this.transportConnect();
    }
    clearHeartbeats() {
      clearTimeout(this.heartbeatTimer);
      clearTimeout(this.heartbeatTimeoutTimer);
    }
    onConnOpen() {
      if (this.hasLogger())
        this.log("transport", `${this.transport.name} connected to ${this.endPointURL()}`);
      this.closeWasClean = false;
      this.establishedConnections++;
      this.flushSendBuffer();
      this.reconnectTimer.reset();
      this.resetHeartbeat();
      this.stateChangeCallbacks.open.forEach(([, callback]) => callback());
    }
    /**
     * @private
     */
    heartbeatTimeout() {
      if (this.pendingHeartbeatRef) {
        this.pendingHeartbeatRef = null;
        if (this.hasLogger()) {
          this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
        }
        this.triggerChanError();
        this.closeWasClean = false;
        this.teardown(() => this.reconnectTimer.scheduleTimeout(), WS_CLOSE_NORMAL, "heartbeat timeout");
      }
    }
    resetHeartbeat() {
      if (this.conn && this.conn.skipHeartbeat) {
        return;
      }
      this.pendingHeartbeatRef = null;
      this.clearHeartbeats();
      this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
    }
    teardown(callback, code, reason) {
      if (!this.conn) {
        return callback && callback();
      }
      this.waitForBufferDone(() => {
        if (this.conn) {
          if (code) {
            this.conn.close(code, reason || "");
          } else {
            this.conn.close();
          }
        }
        this.waitForSocketClosed(() => {
          if (this.conn) {
            this.conn.onopen = function() {
            };
            this.conn.onerror = function() {
            };
            this.conn.onmessage = function() {
            };
            this.conn.onclose = function() {
            };
            this.conn = null;
          }
          callback && callback();
        });
      });
    }
    waitForBufferDone(callback, tries = 1) {
      if (tries === 5 || !this.conn || !this.conn.bufferedAmount) {
        callback();
        return;
      }
      setTimeout(() => {
        this.waitForBufferDone(callback, tries + 1);
      }, 150 * tries);
    }
    waitForSocketClosed(callback, tries = 1) {
      if (tries === 5 || !this.conn || this.conn.readyState === SOCKET_STATES.closed) {
        callback();
        return;
      }
      setTimeout(() => {
        this.waitForSocketClosed(callback, tries + 1);
      }, 150 * tries);
    }
    onConnClose(event) {
      let closeCode = event && event.code;
      if (this.hasLogger())
        this.log("transport", "close", event);
      this.triggerChanError();
      this.clearHeartbeats();
      if (!this.closeWasClean && closeCode !== 1e3) {
        this.reconnectTimer.scheduleTimeout();
      }
      this.stateChangeCallbacks.close.forEach(([, callback]) => callback(event));
    }
    /**
     * @private
     */
    onConnError(error) {
      if (this.hasLogger())
        this.log("transport", error);
      let transportBefore = this.transport;
      let establishedBefore = this.establishedConnections;
      this.stateChangeCallbacks.error.forEach(([, callback]) => {
        callback(error, transportBefore, establishedBefore);
      });
      if (transportBefore === this.transport || establishedBefore > 0) {
        this.triggerChanError();
      }
    }
    /**
     * @private
     */
    triggerChanError() {
      this.channels.forEach((channel) => {
        if (!(channel.isErrored() || channel.isLeaving() || channel.isClosed())) {
          channel.trigger(CHANNEL_EVENTS.error);
        }
      });
    }
    /**
     * @returns {string}
     */
    connectionState() {
      switch (this.conn && this.conn.readyState) {
        case SOCKET_STATES.connecting:
          return "connecting";
        case SOCKET_STATES.open:
          return "open";
        case SOCKET_STATES.closing:
          return "closing";
        default:
          return "closed";
      }
    }
    /**
     * @returns {boolean}
     */
    isConnected() {
      return this.connectionState() === "open";
    }
    /**
     * @private
     *
     * @param {Channel}
     */
    remove(channel) {
      this.off(channel.stateChangeRefs);
      this.channels = this.channels.filter((c) => c.joinRef() !== channel.joinRef());
    }
    /**
     * Removes `onOpen`, `onClose`, `onError,` and `onMessage` registrations.
     *
     * @param {refs} - list of refs returned by calls to
     *                 `onOpen`, `onClose`, `onError,` and `onMessage`
     */
    off(refs) {
      for (let key in this.stateChangeCallbacks) {
        this.stateChangeCallbacks[key] = this.stateChangeCallbacks[key].filter(([ref]) => {
          return refs.indexOf(ref) === -1;
        });
      }
    }
    /**
     * Initiates a new channel for the given topic
     *
     * @param {string} topic
     * @param {Object} chanParams - Parameters for the channel
     * @returns {Channel}
     */
    channel(topic, chanParams = {}) {
      let chan = new Channel(topic, chanParams, this);
      this.channels.push(chan);
      return chan;
    }
    /**
     * @param {Object} data
     */
    push(data) {
      if (this.hasLogger()) {
        let { topic, event, payload, ref, join_ref } = data;
        this.log("push", `${topic} ${event} (${join_ref}, ${ref})`, payload);
      }
      if (this.isConnected()) {
        this.encode(data, (result) => this.conn.send(result));
      } else {
        this.sendBuffer.push(() => this.encode(data, (result) => this.conn.send(result)));
      }
    }
    /**
     * Return the next message ref, accounting for overflows
     * @returns {string}
     */
    makeRef() {
      let newRef = this.ref + 1;
      if (newRef === this.ref) {
        this.ref = 0;
      } else {
        this.ref = newRef;
      }
      return this.ref.toString();
    }
    sendHeartbeat() {
      if (this.pendingHeartbeatRef && !this.isConnected()) {
        return;
      }
      this.pendingHeartbeatRef = this.makeRef();
      this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: this.pendingHeartbeatRef });
      this.heartbeatTimeoutTimer = setTimeout(() => this.heartbeatTimeout(), this.heartbeatIntervalMs);
    }
    flushSendBuffer() {
      if (this.isConnected() && this.sendBuffer.length > 0) {
        this.sendBuffer.forEach((callback) => callback());
        this.sendBuffer = [];
      }
    }
    onConnMessage(rawMessage) {
      this.decode(rawMessage.data, (msg) => {
        let { topic, event, payload, ref, join_ref } = msg;
        if (ref && ref === this.pendingHeartbeatRef) {
          this.clearHeartbeats();
          this.pendingHeartbeatRef = null;
          this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
        }
        if (this.hasLogger())
          this.log("receive", `${payload.status || ""} ${topic} ${event} ${ref && "(" + ref + ")" || ""}`, payload);
        for (let i = 0; i < this.channels.length; i++) {
          const channel = this.channels[i];
          if (!channel.isMember(topic, event, payload, join_ref)) {
            continue;
          }
          channel.trigger(event, payload, ref, join_ref);
        }
        for (let i = 0; i < this.stateChangeCallbacks.message.length; i++) {
          let [, callback] = this.stateChangeCallbacks.message[i];
          callback(msg);
        }
      });
    }
    leaveOpenTopic(topic) {
      let dupChannel = this.channels.find((c) => c.topic === topic && (c.isJoined() || c.isJoining()));
      if (dupChannel) {
        if (this.hasLogger())
          this.log("transport", `leaving duplicate topic "${topic}"`);
        dupChannel.leave();
      }
    }
  };

  // js/user_socket.js
  var socket = new Socket("/socket", { params: { token: window.userToken } });
  socket.connect();
  var createSocket = (topicId) => {
    let channel = socket.channel(`comments:${topicId}`, {});
    channel.join().receive("ok", (resp) => {
      console.log(resp);
      renderComments(resp.comments);
    }).receive("error", (resp) => {
      console.log("Unable to join", resp);
    });
    document.getElementById("add-comment-btn").addEventListener("click", () => {
      const content = document.querySelector("textarea").value;
      channel.push("comment:add", { content });
    });
    channel.on(`comments:${topicId}:new`, renderComment);
  };
  var renderComment = (event) => {
    console.log({ event });
    document.querySelector(".comment-list").innerHTML += commentTemplate(
      event.comment
    );
  };
  var renderComments = (comments) => {
    const renderedComments = comments.map((comment) => {
      return commentTemplate(comment);
    });
    document.querySelector(".comment-list").innerHTML = renderedComments.join("");
  };
  var commentTemplate = (comment) => {
    let email = "Anonymous";
    if (comment.user) {
      email = comment.user.email;
    }
    return `<li class="flex justify-between gap-x-6 py-5 border-md border-sky-400">${comment.content}<div>${email}</div></li>`;
  };
  window.createSocket = createSocket;

  // ../deps/phoenix_html/priv/static/phoenix_html.js
  (function() {
    var PolyfillEvent = eventConstructor();
    function eventConstructor() {
      if (typeof window.CustomEvent === "function")
        return window.CustomEvent;
      function CustomEvent2(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: void 0 };
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
      }
      CustomEvent2.prototype = window.Event.prototype;
      return CustomEvent2;
    }
    function buildHiddenInput(name, value) {
      var input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      return input;
    }
    function handleClick(element, targetModifierKey) {
      var to = element.getAttribute("data-to"), method = buildHiddenInput("_method", element.getAttribute("data-method")), csrf = buildHiddenInput("_csrf_token", element.getAttribute("data-csrf")), form = document.createElement("form"), submit = document.createElement("input"), target = element.getAttribute("target");
      form.method = element.getAttribute("data-method") === "get" ? "get" : "post";
      form.action = to;
      form.style.display = "none";
      if (target)
        form.target = target;
      else if (targetModifierKey)
        form.target = "_blank";
      form.appendChild(csrf);
      form.appendChild(method);
      document.body.appendChild(form);
      submit.type = "submit";
      form.appendChild(submit);
      submit.click();
    }
    window.addEventListener("click", function(e) {
      var element = e.target;
      if (e.defaultPrevented)
        return;
      while (element && element.getAttribute) {
        var phoenixLinkEvent = new PolyfillEvent("phoenix.link.click", {
          "bubbles": true,
          "cancelable": true
        });
        if (!element.dispatchEvent(phoenixLinkEvent)) {
          e.preventDefault();
          e.stopImmediatePropagation();
          return false;
        }
        if (element.getAttribute("data-method")) {
          handleClick(element, e.metaKey || e.shiftKey);
          e.preventDefault();
          return false;
        } else {
          element = element.parentNode;
        }
      }
    }, false);
    window.addEventListener("phoenix.link.click", function(e) {
      var message = e.target.getAttribute("data-confirm");
      if (message && !window.confirm(message)) {
        e.preventDefault();
      }
    }, false);
  })();

  // ../deps/phoenix_live_view/priv/static/phoenix_live_view.esm.js
  var CONSECUTIVE_RELOADS = "consecutive-reloads";
  var MAX_RELOADS = 10;
  var RELOAD_JITTER_MIN = 5e3;
  var RELOAD_JITTER_MAX = 1e4;
  var FAILSAFE_JITTER = 3e4;
  var PHX_EVENT_CLASSES = [
    "phx-click-loading",
    "phx-change-loading",
    "phx-submit-loading",
    "phx-keydown-loading",
    "phx-keyup-loading",
    "phx-blur-loading",
    "phx-focus-loading",
    "phx-hook-loading"
  ];
  var PHX_COMPONENT = "data-phx-component";
  var PHX_LIVE_LINK = "data-phx-link";
  var PHX_TRACK_STATIC = "track-static";
  var PHX_LINK_STATE = "data-phx-link-state";
  var PHX_REF = "data-phx-ref";
  var PHX_REF_SRC = "data-phx-ref-src";
  var PHX_TRACK_UPLOADS = "track-uploads";
  var PHX_UPLOAD_REF = "data-phx-upload-ref";
  var PHX_PREFLIGHTED_REFS = "data-phx-preflighted-refs";
  var PHX_DONE_REFS = "data-phx-done-refs";
  var PHX_DROP_TARGET = "drop-target";
  var PHX_ACTIVE_ENTRY_REFS = "data-phx-active-refs";
  var PHX_LIVE_FILE_UPDATED = "phx:live-file:updated";
  var PHX_SKIP = "data-phx-skip";
  var PHX_MAGIC_ID = "data-phx-id";
  var PHX_PRUNE = "data-phx-prune";
  var PHX_PAGE_LOADING = "page-loading";
  var PHX_CONNECTED_CLASS = "phx-connected";
  var PHX_LOADING_CLASS = "phx-loading";
  var PHX_NO_FEEDBACK_CLASS = "phx-no-feedback";
  var PHX_ERROR_CLASS = "phx-error";
  var PHX_CLIENT_ERROR_CLASS = "phx-client-error";
  var PHX_SERVER_ERROR_CLASS = "phx-server-error";
  var PHX_PARENT_ID = "data-phx-parent-id";
  var PHX_MAIN = "data-phx-main";
  var PHX_ROOT_ID = "data-phx-root-id";
  var PHX_VIEWPORT_TOP = "viewport-top";
  var PHX_VIEWPORT_BOTTOM = "viewport-bottom";
  var PHX_TRIGGER_ACTION = "trigger-action";
  var PHX_FEEDBACK_FOR = "feedback-for";
  var PHX_FEEDBACK_GROUP = "feedback-group";
  var PHX_HAS_FOCUSED = "phx-has-focused";
  var FOCUSABLE_INPUTS = ["text", "textarea", "number", "email", "password", "search", "tel", "url", "date", "time", "datetime-local", "color", "range"];
  var CHECKABLE_INPUTS = ["checkbox", "radio"];
  var PHX_HAS_SUBMITTED = "phx-has-submitted";
  var PHX_SESSION = "data-phx-session";
  var PHX_VIEW_SELECTOR = `[${PHX_SESSION}]`;
  var PHX_STICKY = "data-phx-sticky";
  var PHX_STATIC = "data-phx-static";
  var PHX_READONLY = "data-phx-readonly";
  var PHX_DISABLED = "data-phx-disabled";
  var PHX_DISABLE_WITH = "disable-with";
  var PHX_DISABLE_WITH_RESTORE = "data-phx-disable-with-restore";
  var PHX_HOOK = "hook";
  var PHX_DEBOUNCE = "debounce";
  var PHX_THROTTLE = "throttle";
  var PHX_UPDATE = "update";
  var PHX_STREAM = "stream";
  var PHX_STREAM_REF = "data-phx-stream";
  var PHX_KEY = "key";
  var PHX_PRIVATE = "phxPrivate";
  var PHX_AUTO_RECOVER = "auto-recover";
  var PHX_LV_DEBUG = "phx:live-socket:debug";
  var PHX_LV_PROFILE = "phx:live-socket:profiling";
  var PHX_LV_LATENCY_SIM = "phx:live-socket:latency-sim";
  var PHX_PROGRESS = "progress";
  var PHX_MOUNTED = "mounted";
  var LOADER_TIMEOUT = 1;
  var BEFORE_UNLOAD_LOADER_TIMEOUT = 200;
  var BINDING_PREFIX = "phx-";
  var PUSH_TIMEOUT = 3e4;
  var DEBOUNCE_TRIGGER = "debounce-trigger";
  var THROTTLED = "throttled";
  var DEBOUNCE_PREV_KEY = "debounce-prev-key";
  var DEFAULTS = {
    debounce: 300,
    throttle: 300
  };
  var DYNAMICS = "d";
  var STATIC = "s";
  var ROOT = "r";
  var COMPONENTS = "c";
  var EVENTS = "e";
  var REPLY = "r";
  var TITLE = "t";
  var TEMPLATES = "p";
  var STREAM = "stream";
  var EntryUploader = class {
    constructor(entry, chunkSize, liveSocket2) {
      this.liveSocket = liveSocket2;
      this.entry = entry;
      this.offset = 0;
      this.chunkSize = chunkSize;
      this.chunkTimer = null;
      this.errored = false;
      this.uploadChannel = liveSocket2.channel(`lvu:${entry.ref}`, { token: entry.metadata() });
    }
    error(reason) {
      if (this.errored) {
        return;
      }
      this.uploadChannel.leave();
      this.errored = true;
      clearTimeout(this.chunkTimer);
      this.entry.error(reason);
    }
    upload() {
      this.uploadChannel.onError((reason) => this.error(reason));
      this.uploadChannel.join().receive("ok", (_data) => this.readNextChunk()).receive("error", (reason) => this.error(reason));
    }
    isDone() {
      return this.offset >= this.entry.file.size;
    }
    readNextChunk() {
      let reader = new window.FileReader();
      let blob = this.entry.file.slice(this.offset, this.chunkSize + this.offset);
      reader.onload = (e) => {
        if (e.target.error === null) {
          this.offset += e.target.result.byteLength;
          this.pushChunk(e.target.result);
        } else {
          return logError("Read error: " + e.target.error);
        }
      };
      reader.readAsArrayBuffer(blob);
    }
    pushChunk(chunk) {
      if (!this.uploadChannel.isJoined()) {
        return;
      }
      this.uploadChannel.push("chunk", chunk).receive("ok", () => {
        this.entry.progress(this.offset / this.entry.file.size * 100);
        if (!this.isDone()) {
          this.chunkTimer = setTimeout(() => this.readNextChunk(), this.liveSocket.getLatencySim() || 0);
        }
      }).receive("error", ({ reason }) => this.error(reason));
    }
  };
  var logError = (msg, obj) => console.error && console.error(msg, obj);
  var isCid = (cid) => {
    let type = typeof cid;
    return type === "number" || type === "string" && /^(0|[1-9]\d*)$/.test(cid);
  };
  function detectDuplicateIds() {
    let ids = /* @__PURE__ */ new Set();
    let elems = document.querySelectorAll("*[id]");
    for (let i = 0, len = elems.length; i < len; i++) {
      if (ids.has(elems[i].id)) {
        console.error(`Multiple IDs detected: ${elems[i].id}. Ensure unique element ids.`);
      } else {
        ids.add(elems[i].id);
      }
    }
  }
  var debug = (view, kind, msg, obj) => {
    if (view.liveSocket.isDebugEnabled()) {
      console.log(`${view.id} ${kind}: ${msg} - `, obj);
    }
  };
  var closure2 = (val) => typeof val === "function" ? val : function() {
    return val;
  };
  var clone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  };
  var closestPhxBinding = (el, binding, borderEl) => {
    do {
      if (el.matches(`[${binding}]`) && !el.disabled) {
        return el;
      }
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1 && !(borderEl && borderEl.isSameNode(el) || el.matches(PHX_VIEW_SELECTOR)));
    return null;
  };
  var isObject = (obj) => {
    return obj !== null && typeof obj === "object" && !(obj instanceof Array);
  };
  var isEqualObj = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);
  var isEmpty = (obj) => {
    for (let x in obj) {
      return false;
    }
    return true;
  };
  var maybe = (el, callback) => el && callback(el);
  var channelUploader = function(entries, onError, resp, liveSocket2) {
    entries.forEach((entry) => {
      let entryUploader = new EntryUploader(entry, resp.config.chunk_size, liveSocket2);
      entryUploader.upload();
    });
  };
  var Browser = {
    canPushState() {
      return typeof history.pushState !== "undefined";
    },
    dropLocal(localStorage, namespace, subkey) {
      return localStorage.removeItem(this.localKey(namespace, subkey));
    },
    updateLocal(localStorage, namespace, subkey, initial, func) {
      let current = this.getLocal(localStorage, namespace, subkey);
      let key = this.localKey(namespace, subkey);
      let newVal = current === null ? initial : func(current);
      localStorage.setItem(key, JSON.stringify(newVal));
      return newVal;
    },
    getLocal(localStorage, namespace, subkey) {
      return JSON.parse(localStorage.getItem(this.localKey(namespace, subkey)));
    },
    updateCurrentState(callback) {
      if (!this.canPushState()) {
        return;
      }
      history.replaceState(callback(history.state || {}), "", window.location.href);
    },
    pushState(kind, meta, to) {
      if (this.canPushState()) {
        if (to !== window.location.href) {
          if (meta.type == "redirect" && meta.scroll) {
            let currentState = history.state || {};
            currentState.scroll = meta.scroll;
            history.replaceState(currentState, "", window.location.href);
          }
          delete meta.scroll;
          history[kind + "State"](meta, "", to || null);
          let hashEl = this.getHashTargetEl(window.location.hash);
          if (hashEl) {
            hashEl.scrollIntoView();
          } else if (meta.type === "redirect") {
            window.scroll(0, 0);
          }
        }
      } else {
        this.redirect(to);
      }
    },
    setCookie(name, value) {
      document.cookie = `${name}=${value}`;
    },
    getCookie(name) {
      return document.cookie.replace(new RegExp(`(?:(?:^|.*;s*)${name}s*=s*([^;]*).*$)|^.*$`), "$1");
    },
    redirect(toURL, flash) {
      if (flash) {
        Browser.setCookie("__phoenix_flash__", flash + "; max-age=60000; path=/");
      }
      window.location = toURL;
    },
    localKey(namespace, subkey) {
      return `${namespace}-${subkey}`;
    },
    getHashTargetEl(maybeHash) {
      let hash = maybeHash.toString().substring(1);
      if (hash === "") {
        return;
      }
      return document.getElementById(hash) || document.querySelector(`a[name="${hash}"]`);
    }
  };
  var browser_default = Browser;
  var ARIA = {
    focusMain() {
      let target = document.querySelector("main h1, main, h1");
      if (target) {
        let origTabIndex = target.tabIndex;
        target.tabIndex = -1;
        target.focus();
        target.tabIndex = origTabIndex;
      }
    },
    anyOf(instance, classes) {
      return classes.find((name) => instance instanceof name);
    },
    isFocusable(el, interactiveOnly) {
      return el instanceof HTMLAnchorElement && el.rel !== "ignore" || el instanceof HTMLAreaElement && el.href !== void 0 || !el.disabled && this.anyOf(el, [HTMLInputElement, HTMLSelectElement, HTMLTextAreaElement, HTMLButtonElement]) || el instanceof HTMLIFrameElement || (el.tabIndex > 0 || !interactiveOnly && el.getAttribute("tabindex") !== null && el.getAttribute("aria-hidden") !== "true");
    },
    attemptFocus(el, interactiveOnly) {
      if (this.isFocusable(el, interactiveOnly)) {
        try {
          el.focus();
        } catch (e) {
        }
      }
      return !!document.activeElement && document.activeElement.isSameNode(el);
    },
    focusFirstInteractive(el) {
      let child = el.firstElementChild;
      while (child) {
        if (this.attemptFocus(child, true) || this.focusFirstInteractive(child, true)) {
          return true;
        }
        child = child.nextElementSibling;
      }
    },
    focusFirst(el) {
      let child = el.firstElementChild;
      while (child) {
        if (this.attemptFocus(child) || this.focusFirst(child)) {
          return true;
        }
        child = child.nextElementSibling;
      }
    },
    focusLast(el) {
      let child = el.lastElementChild;
      while (child) {
        if (this.attemptFocus(child) || this.focusLast(child)) {
          return true;
        }
        child = child.previousElementSibling;
      }
    }
  };
  var aria_default = ARIA;
  var focusStack = null;
  var default_transition_time = 200;
  var JS = {
    exec(eventType, phxEvent, view, sourceEl, defaults) {
      let [defaultKind, defaultArgs] = defaults || [null, { callback: defaults && defaults.callback }];
      let commands = phxEvent.charAt(0) === "[" ? JSON.parse(phxEvent) : [[defaultKind, defaultArgs]];
      commands.forEach(([kind, args]) => {
        if (kind === defaultKind && defaultArgs.data) {
          args.data = Object.assign(args.data || {}, defaultArgs.data);
          args.callback = args.callback || defaultArgs.callback;
        }
        this.filterToEls(sourceEl, args).forEach((el) => {
          this[`exec_${kind}`](eventType, phxEvent, view, sourceEl, el, args);
        });
      });
    },
    isVisible(el) {
      return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length > 0);
    },
    isInViewport(el) {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const windowWidth = window.innerWidth || document.documentElement.clientWidth;
      return rect.right > 0 && rect.bottom > 0 && rect.left < windowWidth && rect.top < windowHeight;
    },
    exec_exec(eventType, phxEvent, view, sourceEl, el, { attr, to }) {
      let nodes = to ? dom_default.all(document, to) : [sourceEl];
      nodes.forEach((node) => {
        let encodedJS = node.getAttribute(attr);
        if (!encodedJS) {
          throw new Error(`expected ${attr} to contain JS command on "${to}"`);
        }
        view.liveSocket.execJS(node, encodedJS, eventType);
      });
    },
    exec_dispatch(eventType, phxEvent, view, sourceEl, el, { to, event, detail, bubbles }) {
      detail = detail || {};
      detail.dispatcher = sourceEl;
      dom_default.dispatchEvent(el, event, { detail, bubbles });
    },
    exec_push(eventType, phxEvent, view, sourceEl, el, args) {
      let { event, data, target, page_loading, loading, value, dispatcher, callback } = args;
      let pushOpts = { loading, value, target, page_loading: !!page_loading };
      let targetSrc = eventType === "change" && dispatcher ? dispatcher : sourceEl;
      let phxTarget = target || targetSrc.getAttribute(view.binding("target")) || targetSrc;
      view.withinTargets(phxTarget, (targetView, targetCtx) => {
        if (!targetView.isConnected()) {
          return;
        }
        if (eventType === "change") {
          let { newCid, _target } = args;
          _target = _target || (dom_default.isFormInput(sourceEl) ? sourceEl.name : void 0);
          if (_target) {
            pushOpts._target = _target;
          }
          targetView.pushInput(sourceEl, targetCtx, newCid, event || phxEvent, pushOpts, callback);
        } else if (eventType === "submit") {
          let { submitter } = args;
          targetView.submitForm(sourceEl, targetCtx, event || phxEvent, submitter, pushOpts, callback);
        } else {
          targetView.pushEvent(eventType, sourceEl, targetCtx, event || phxEvent, data, pushOpts, callback);
        }
      });
    },
    exec_navigate(eventType, phxEvent, view, sourceEl, el, { href, replace }) {
      view.liveSocket.historyRedirect(href, replace ? "replace" : "push");
    },
    exec_patch(eventType, phxEvent, view, sourceEl, el, { href, replace }) {
      view.liveSocket.pushHistoryPatch(href, replace ? "replace" : "push", sourceEl);
    },
    exec_focus(eventType, phxEvent, view, sourceEl, el) {
      window.requestAnimationFrame(() => aria_default.attemptFocus(el));
    },
    exec_focus_first(eventType, phxEvent, view, sourceEl, el) {
      window.requestAnimationFrame(() => aria_default.focusFirstInteractive(el) || aria_default.focusFirst(el));
    },
    exec_push_focus(eventType, phxEvent, view, sourceEl, el) {
      window.requestAnimationFrame(() => focusStack = el || sourceEl);
    },
    exec_pop_focus(eventType, phxEvent, view, sourceEl, el) {
      window.requestAnimationFrame(() => {
        if (focusStack) {
          focusStack.focus();
        }
        focusStack = null;
      });
    },
    exec_add_class(eventType, phxEvent, view, sourceEl, el, { names, transition, time }) {
      this.addOrRemoveClasses(el, names, [], transition, time, view);
    },
    exec_remove_class(eventType, phxEvent, view, sourceEl, el, { names, transition, time }) {
      this.addOrRemoveClasses(el, [], names, transition, time, view);
    },
    exec_toggle_class(eventType, phxEvent, view, sourceEl, el, { to, names, transition, time }) {
      this.toggleClasses(el, names, transition, view);
    },
    exec_toggle_attr(eventType, phxEvent, view, sourceEl, el, { attr: [attr, val1, val2] }) {
      if (el.hasAttribute(attr)) {
        if (val2 !== void 0) {
          if (el.getAttribute(attr) === val1) {
            this.setOrRemoveAttrs(el, [[attr, val2]], []);
          } else {
            this.setOrRemoveAttrs(el, [[attr, val1]], []);
          }
        } else {
          this.setOrRemoveAttrs(el, [], [attr]);
        }
      } else {
        this.setOrRemoveAttrs(el, [[attr, val1]], []);
      }
    },
    exec_transition(eventType, phxEvent, view, sourceEl, el, { time, transition }) {
      this.addOrRemoveClasses(el, [], [], transition, time, view);
    },
    exec_toggle(eventType, phxEvent, view, sourceEl, el, { display, ins, outs, time }) {
      this.toggle(eventType, view, el, display, ins, outs, time);
    },
    exec_show(eventType, phxEvent, view, sourceEl, el, { display, transition, time }) {
      this.show(eventType, view, el, display, transition, time);
    },
    exec_hide(eventType, phxEvent, view, sourceEl, el, { display, transition, time }) {
      this.hide(eventType, view, el, display, transition, time);
    },
    exec_set_attr(eventType, phxEvent, view, sourceEl, el, { attr: [attr, val] }) {
      this.setOrRemoveAttrs(el, [[attr, val]], []);
    },
    exec_remove_attr(eventType, phxEvent, view, sourceEl, el, { attr }) {
      this.setOrRemoveAttrs(el, [], [attr]);
    },
    show(eventType, view, el, display, transition, time) {
      if (!this.isVisible(el)) {
        this.toggle(eventType, view, el, display, transition, null, time);
      }
    },
    hide(eventType, view, el, display, transition, time) {
      if (this.isVisible(el)) {
        this.toggle(eventType, view, el, display, null, transition, time);
      }
    },
    toggle(eventType, view, el, display, ins, outs, time) {
      time = time || default_transition_time;
      let [inClasses, inStartClasses, inEndClasses] = ins || [[], [], []];
      let [outClasses, outStartClasses, outEndClasses] = outs || [[], [], []];
      if (inClasses.length > 0 || outClasses.length > 0) {
        if (this.isVisible(el)) {
          let onStart = () => {
            this.addOrRemoveClasses(el, outStartClasses, inClasses.concat(inStartClasses).concat(inEndClasses));
            window.requestAnimationFrame(() => {
              this.addOrRemoveClasses(el, outClasses, []);
              window.requestAnimationFrame(() => this.addOrRemoveClasses(el, outEndClasses, outStartClasses));
            });
          };
          el.dispatchEvent(new Event("phx:hide-start"));
          view.transition(time, onStart, () => {
            this.addOrRemoveClasses(el, [], outClasses.concat(outEndClasses));
            dom_default.putSticky(el, "toggle", (currentEl) => currentEl.style.display = "none");
            el.dispatchEvent(new Event("phx:hide-end"));
          });
        } else {
          if (eventType === "remove") {
            return;
          }
          let onStart = () => {
            this.addOrRemoveClasses(el, inStartClasses, outClasses.concat(outStartClasses).concat(outEndClasses));
            let stickyDisplay = display || this.defaultDisplay(el);
            dom_default.putSticky(el, "toggle", (currentEl) => currentEl.style.display = stickyDisplay);
            window.requestAnimationFrame(() => {
              this.addOrRemoveClasses(el, inClasses, []);
              window.requestAnimationFrame(() => this.addOrRemoveClasses(el, inEndClasses, inStartClasses));
            });
          };
          el.dispatchEvent(new Event("phx:show-start"));
          view.transition(time, onStart, () => {
            this.addOrRemoveClasses(el, [], inClasses.concat(inEndClasses));
            el.dispatchEvent(new Event("phx:show-end"));
          });
        }
      } else {
        if (this.isVisible(el)) {
          window.requestAnimationFrame(() => {
            el.dispatchEvent(new Event("phx:hide-start"));
            dom_default.putSticky(el, "toggle", (currentEl) => currentEl.style.display = "none");
            el.dispatchEvent(new Event("phx:hide-end"));
          });
        } else {
          window.requestAnimationFrame(() => {
            el.dispatchEvent(new Event("phx:show-start"));
            let stickyDisplay = display || this.defaultDisplay(el);
            dom_default.putSticky(el, "toggle", (currentEl) => currentEl.style.display = stickyDisplay);
            el.dispatchEvent(new Event("phx:show-end"));
          });
        }
      }
    },
    toggleClasses(el, classes, transition, time, view) {
      window.requestAnimationFrame(() => {
        let [prevAdds, prevRemoves] = dom_default.getSticky(el, "classes", [[], []]);
        let newAdds = classes.filter((name) => prevAdds.indexOf(name) < 0 && !el.classList.contains(name));
        let newRemoves = classes.filter((name) => prevRemoves.indexOf(name) < 0 && el.classList.contains(name));
        this.addOrRemoveClasses(el, newAdds, newRemoves, transition, time, view);
      });
    },
    addOrRemoveClasses(el, adds, removes, transition, time, view) {
      time = time || default_transition_time;
      let [transitionRun, transitionStart, transitionEnd] = transition || [[], [], []];
      if (transitionRun.length > 0) {
        let onStart = () => {
          this.addOrRemoveClasses(el, transitionStart, [].concat(transitionRun).concat(transitionEnd));
          window.requestAnimationFrame(() => {
            this.addOrRemoveClasses(el, transitionRun, []);
            window.requestAnimationFrame(() => this.addOrRemoveClasses(el, transitionEnd, transitionStart));
          });
        };
        let onDone = () => this.addOrRemoveClasses(el, adds.concat(transitionEnd), removes.concat(transitionRun).concat(transitionStart));
        return view.transition(time, onStart, onDone);
      }
      window.requestAnimationFrame(() => {
        let [prevAdds, prevRemoves] = dom_default.getSticky(el, "classes", [[], []]);
        let keepAdds = adds.filter((name) => prevAdds.indexOf(name) < 0 && !el.classList.contains(name));
        let keepRemoves = removes.filter((name) => prevRemoves.indexOf(name) < 0 && el.classList.contains(name));
        let newAdds = prevAdds.filter((name) => removes.indexOf(name) < 0).concat(keepAdds);
        let newRemoves = prevRemoves.filter((name) => adds.indexOf(name) < 0).concat(keepRemoves);
        dom_default.putSticky(el, "classes", (currentEl) => {
          currentEl.classList.remove(...newRemoves);
          currentEl.classList.add(...newAdds);
          return [newAdds, newRemoves];
        });
      });
    },
    setOrRemoveAttrs(el, sets, removes) {
      let [prevSets, prevRemoves] = dom_default.getSticky(el, "attrs", [[], []]);
      let alteredAttrs = sets.map(([attr, _val]) => attr).concat(removes);
      let newSets = prevSets.filter(([attr, _val]) => !alteredAttrs.includes(attr)).concat(sets);
      let newRemoves = prevRemoves.filter((attr) => !alteredAttrs.includes(attr)).concat(removes);
      dom_default.putSticky(el, "attrs", (currentEl) => {
        newRemoves.forEach((attr) => currentEl.removeAttribute(attr));
        newSets.forEach(([attr, val]) => currentEl.setAttribute(attr, val));
        return [newSets, newRemoves];
      });
    },
    hasAllClasses(el, classes) {
      return classes.every((name) => el.classList.contains(name));
    },
    isToggledOut(el, outClasses) {
      return !this.isVisible(el) || this.hasAllClasses(el, outClasses);
    },
    filterToEls(sourceEl, { to }) {
      return to ? dom_default.all(document, to) : [sourceEl];
    },
    defaultDisplay(el) {
      return { tr: "table-row", td: "table-cell" }[el.tagName.toLowerCase()] || "block";
    }
  };
  var js_default = JS;
  var DOM = {
    byId(id) {
      return document.getElementById(id) || logError(`no id found for ${id}`);
    },
    removeClass(el, className) {
      el.classList.remove(className);
      if (el.classList.length === 0) {
        el.removeAttribute("class");
      }
    },
    all(node, query, callback) {
      if (!node) {
        return [];
      }
      let array = Array.from(node.querySelectorAll(query));
      return callback ? array.forEach(callback) : array;
    },
    childNodeLength(html) {
      let template = document.createElement("template");
      template.innerHTML = html;
      return template.content.childElementCount;
    },
    isUploadInput(el) {
      return el.type === "file" && el.getAttribute(PHX_UPLOAD_REF) !== null;
    },
    isAutoUpload(inputEl) {
      return inputEl.hasAttribute("data-phx-auto-upload");
    },
    findUploadInputs(node) {
      const formId = node.id;
      const inputsOutsideForm = this.all(document, `input[type="file"][${PHX_UPLOAD_REF}][form="${formId}"]`);
      return this.all(node, `input[type="file"][${PHX_UPLOAD_REF}]`).concat(inputsOutsideForm);
    },
    findComponentNodeList(node, cid) {
      return this.filterWithinSameLiveView(this.all(node, `[${PHX_COMPONENT}="${cid}"]`), node);
    },
    isPhxDestroyed(node) {
      return node.id && DOM.private(node, "destroyed") ? true : false;
    },
    wantsNewTab(e) {
      let wantsNewTab = e.ctrlKey || e.shiftKey || e.metaKey || e.button && e.button === 1;
      let isDownload = e.target instanceof HTMLAnchorElement && e.target.hasAttribute("download");
      let isTargetBlank = e.target.hasAttribute("target") && e.target.getAttribute("target").toLowerCase() === "_blank";
      return wantsNewTab || isTargetBlank || isDownload;
    },
    isUnloadableFormSubmit(e) {
      let isDialogSubmit = e.target && e.target.getAttribute("method") === "dialog" || e.submitter && e.submitter.getAttribute("formmethod") === "dialog";
      if (isDialogSubmit) {
        return false;
      } else {
        return !e.defaultPrevented && !this.wantsNewTab(e);
      }
    },
    isNewPageClick(e, currentLocation) {
      let href = e.target instanceof HTMLAnchorElement ? e.target.getAttribute("href") : null;
      let url;
      if (e.defaultPrevented || href === null || this.wantsNewTab(e)) {
        return false;
      }
      if (href.startsWith("mailto:") || href.startsWith("tel:")) {
        return false;
      }
      if (e.target.isContentEditable) {
        return false;
      }
      try {
        url = new URL(href);
      } catch (e2) {
        try {
          url = new URL(href, currentLocation);
        } catch (e3) {
          return true;
        }
      }
      if (url.host === currentLocation.host && url.protocol === currentLocation.protocol) {
        if (url.pathname === currentLocation.pathname && url.search === currentLocation.search) {
          return url.hash === "" && !url.href.endsWith("#");
        }
      }
      return url.protocol.startsWith("http");
    },
    markPhxChildDestroyed(el) {
      if (this.isPhxChild(el)) {
        el.setAttribute(PHX_SESSION, "");
      }
      this.putPrivate(el, "destroyed", true);
    },
    findPhxChildrenInFragment(html, parentId) {
      let template = document.createElement("template");
      template.innerHTML = html;
      return this.findPhxChildren(template.content, parentId);
    },
    isIgnored(el, phxUpdate) {
      return (el.getAttribute(phxUpdate) || el.getAttribute("data-phx-update")) === "ignore";
    },
    isPhxUpdate(el, phxUpdate, updateTypes) {
      return el.getAttribute && updateTypes.indexOf(el.getAttribute(phxUpdate)) >= 0;
    },
    findPhxSticky(el) {
      return this.all(el, `[${PHX_STICKY}]`);
    },
    findPhxChildren(el, parentId) {
      return this.all(el, `${PHX_VIEW_SELECTOR}[${PHX_PARENT_ID}="${parentId}"]`);
    },
    findParentCIDs(node, cids) {
      let initial = new Set(cids);
      let parentCids = cids.reduce((acc, cid) => {
        let selector = `[${PHX_COMPONENT}="${cid}"] [${PHX_COMPONENT}]`;
        this.filterWithinSameLiveView(this.all(node, selector), node).map((el) => parseInt(el.getAttribute(PHX_COMPONENT))).forEach((childCID) => acc.delete(childCID));
        return acc;
      }, initial);
      return parentCids.size === 0 ? new Set(cids) : parentCids;
    },
    filterWithinSameLiveView(nodes, parent) {
      if (parent.querySelector(PHX_VIEW_SELECTOR)) {
        return nodes.filter((el) => this.withinSameLiveView(el, parent));
      } else {
        return nodes;
      }
    },
    withinSameLiveView(node, parent) {
      while (node = node.parentNode) {
        if (node.isSameNode(parent)) {
          return true;
        }
        if (node.getAttribute(PHX_SESSION) !== null) {
          return false;
        }
      }
    },
    private(el, key) {
      return el[PHX_PRIVATE] && el[PHX_PRIVATE][key];
    },
    deletePrivate(el, key) {
      el[PHX_PRIVATE] && delete el[PHX_PRIVATE][key];
    },
    putPrivate(el, key, value) {
      if (!el[PHX_PRIVATE]) {
        el[PHX_PRIVATE] = {};
      }
      el[PHX_PRIVATE][key] = value;
    },
    updatePrivate(el, key, defaultVal, updateFunc) {
      let existing = this.private(el, key);
      if (existing === void 0) {
        this.putPrivate(el, key, updateFunc(defaultVal));
      } else {
        this.putPrivate(el, key, updateFunc(existing));
      }
    },
    copyPrivates(target, source) {
      if (source[PHX_PRIVATE]) {
        target[PHX_PRIVATE] = source[PHX_PRIVATE];
      }
    },
    putTitle(str) {
      let titleEl = document.querySelector("title");
      if (titleEl) {
        let { prefix, suffix } = titleEl.dataset;
        document.title = `${prefix || ""}${str}${suffix || ""}`;
      } else {
        document.title = str;
      }
    },
    debounce(el, event, phxDebounce, defaultDebounce, phxThrottle, defaultThrottle, asyncFilter, callback) {
      let debounce = el.getAttribute(phxDebounce);
      let throttle = el.getAttribute(phxThrottle);
      if (debounce === "") {
        debounce = defaultDebounce;
      }
      if (throttle === "") {
        throttle = defaultThrottle;
      }
      let value = debounce || throttle;
      switch (value) {
        case null:
          return callback();
        case "blur":
          if (this.once(el, "debounce-blur")) {
            el.addEventListener("blur", () => callback());
          }
          return;
        default:
          let timeout = parseInt(value);
          let trigger = (blur) => {
            if (blur) {
              if (throttle && this.private(el, THROTTLED)) {
                clearTimeout(this.private(el, THROTTLED));
                this.deletePrivate(el, THROTTLED);
              }
              return callback();
            }
            if (throttle)
              this.deletePrivate(el, THROTTLED);
            callback();
          };
          let currentCycle = this.incCycle(el, DEBOUNCE_TRIGGER, trigger);
          if (isNaN(timeout)) {
            return logError(`invalid throttle/debounce value: ${value}`);
          }
          if (throttle) {
            let newKeyDown = false;
            if (event.type === "keydown") {
              let prevKey = this.private(el, DEBOUNCE_PREV_KEY);
              this.putPrivate(el, DEBOUNCE_PREV_KEY, event.key);
              newKeyDown = prevKey !== event.key;
            }
            if (!newKeyDown && this.private(el, THROTTLED)) {
              return false;
            } else {
              callback();
              const t = setTimeout(() => {
                if (asyncFilter()) {
                  this.triggerCycle(el, DEBOUNCE_TRIGGER);
                }
              }, timeout);
              this.putPrivate(el, THROTTLED, t);
            }
          } else {
            setTimeout(() => {
              if (asyncFilter()) {
                this.triggerCycle(el, DEBOUNCE_TRIGGER, currentCycle);
              }
            }, timeout);
          }
          let form = el.form;
          if (form && this.once(form, "bind-debounce")) {
            form.addEventListener("submit", () => {
              Array.from(new FormData(form).entries(), ([name]) => {
                let input = form.querySelector(`[name="${name}"]`);
                this.incCycle(input, DEBOUNCE_TRIGGER);
                this.deletePrivate(input, THROTTLED);
              });
            });
          }
          if (this.once(el, "bind-debounce")) {
            el.addEventListener("blur", () => this.triggerCycle(el, DEBOUNCE_TRIGGER, null, [true]));
          }
      }
    },
    triggerCycle(el, key, currentCycle, params = []) {
      let [cycle, trigger] = this.private(el, key);
      if (!currentCycle) {
        currentCycle = cycle;
      }
      if (currentCycle === cycle) {
        this.incCycle(el, key);
        trigger(...params);
      }
    },
    once(el, key) {
      if (this.private(el, key) === true) {
        return false;
      }
      this.putPrivate(el, key, true);
      return true;
    },
    incCycle(el, key, trigger = function() {
    }) {
      let [currentCycle] = this.private(el, key) || [0, trigger];
      currentCycle++;
      this.putPrivate(el, key, [currentCycle, trigger]);
      return currentCycle;
    },
    maybeAddPrivateHooks(el, phxViewportTop, phxViewportBottom) {
      if (el.hasAttribute && (el.hasAttribute(phxViewportTop) || el.hasAttribute(phxViewportBottom))) {
        el.setAttribute("data-phx-hook", "Phoenix.InfiniteScroll");
      }
    },
    isFeedbackContainer(el, phxFeedbackFor) {
      return el.hasAttribute && el.hasAttribute(phxFeedbackFor);
    },
    maybeHideFeedback(container, feedbackContainers, phxFeedbackFor, phxFeedbackGroup) {
      const feedbackResults = {};
      feedbackContainers.forEach((el) => {
        if (!container.contains(el))
          return;
        const feedback = el.getAttribute(phxFeedbackFor);
        if (!feedback) {
          js_default.addOrRemoveClasses(el, [], [PHX_NO_FEEDBACK_CLASS]);
          return;
        }
        if (feedbackResults[feedback] === true) {
          this.hideFeedback(el);
          return;
        }
        feedbackResults[feedback] = this.shouldHideFeedback(container, feedback, phxFeedbackGroup);
        if (feedbackResults[feedback] === true) {
          this.hideFeedback(el);
        }
      });
    },
    hideFeedback(container) {
      js_default.addOrRemoveClasses(container, [PHX_NO_FEEDBACK_CLASS], []);
    },
    shouldHideFeedback(container, nameOrGroup, phxFeedbackGroup) {
      const query = `[name="${nameOrGroup}"],
                   [name="${nameOrGroup}[]"],
                   [${phxFeedbackGroup}="${nameOrGroup}"]`;
      let focused = false;
      DOM.all(container, query, (input) => {
        if (this.private(input, PHX_HAS_FOCUSED) || this.private(input, PHX_HAS_SUBMITTED)) {
          focused = true;
        }
      });
      return !focused;
    },
    feedbackSelector(input, phxFeedbackFor, phxFeedbackGroup) {
      let query = `[${phxFeedbackFor}="${input.name}"],
                 [${phxFeedbackFor}="${input.name.replace(/\[\]$/, "")}"]`;
      if (input.getAttribute(phxFeedbackGroup)) {
        query += `,[${phxFeedbackFor}="${input.getAttribute(phxFeedbackGroup)}"]`;
      }
      return query;
    },
    resetForm(form, phxFeedbackFor, phxFeedbackGroup) {
      Array.from(form.elements).forEach((input) => {
        let query = this.feedbackSelector(input, phxFeedbackFor, phxFeedbackGroup);
        this.deletePrivate(input, PHX_HAS_FOCUSED);
        this.deletePrivate(input, PHX_HAS_SUBMITTED);
        this.all(document, query, (feedbackEl) => {
          js_default.addOrRemoveClasses(feedbackEl, [PHX_NO_FEEDBACK_CLASS], []);
        });
      });
    },
    showError(inputEl, phxFeedbackFor, phxFeedbackGroup) {
      if (inputEl.name) {
        let query = this.feedbackSelector(inputEl, phxFeedbackFor, phxFeedbackGroup);
        this.all(document, query, (el) => {
          js_default.addOrRemoveClasses(el, [], [PHX_NO_FEEDBACK_CLASS]);
        });
      }
    },
    isPhxChild(node) {
      return node.getAttribute && node.getAttribute(PHX_PARENT_ID);
    },
    isPhxSticky(node) {
      return node.getAttribute && node.getAttribute(PHX_STICKY) !== null;
    },
    isChildOfAny(el, parents) {
      return !!parents.find((parent) => parent.contains(el));
    },
    firstPhxChild(el) {
      return this.isPhxChild(el) ? el : this.all(el, `[${PHX_PARENT_ID}]`)[0];
    },
    dispatchEvent(target, name, opts = {}) {
      let defaultBubble = true;
      let isUploadTarget = target.nodeName === "INPUT" && target.type === "file";
      if (isUploadTarget && name === "click") {
        defaultBubble = false;
      }
      let bubbles = opts.bubbles === void 0 ? defaultBubble : !!opts.bubbles;
      let eventOpts = { bubbles, cancelable: true, detail: opts.detail || {} };
      let event = name === "click" ? new MouseEvent("click", eventOpts) : new CustomEvent(name, eventOpts);
      target.dispatchEvent(event);
    },
    cloneNode(node, html) {
      if (typeof html === "undefined") {
        return node.cloneNode(true);
      } else {
        let cloned = node.cloneNode(false);
        cloned.innerHTML = html;
        return cloned;
      }
    },
    mergeAttrs(target, source, opts = {}) {
      let exclude = new Set(opts.exclude || []);
      let isIgnored = opts.isIgnored;
      let sourceAttrs = source.attributes;
      for (let i = sourceAttrs.length - 1; i >= 0; i--) {
        let name = sourceAttrs[i].name;
        if (!exclude.has(name)) {
          const sourceValue = source.getAttribute(name);
          if (target.getAttribute(name) !== sourceValue && (!isIgnored || isIgnored && name.startsWith("data-"))) {
            target.setAttribute(name, sourceValue);
          }
        } else {
          if (name === "value" && target.value === source.value) {
            target.setAttribute("value", source.getAttribute(name));
          }
        }
      }
      let targetAttrs = target.attributes;
      for (let i = targetAttrs.length - 1; i >= 0; i--) {
        let name = targetAttrs[i].name;
        if (isIgnored) {
          if (name.startsWith("data-") && !source.hasAttribute(name) && ![PHX_REF, PHX_REF_SRC].includes(name)) {
            target.removeAttribute(name);
          }
        } else {
          if (!source.hasAttribute(name)) {
            target.removeAttribute(name);
          }
        }
      }
    },
    mergeFocusedInput(target, source) {
      if (!(target instanceof HTMLSelectElement)) {
        DOM.mergeAttrs(target, source, { exclude: ["value"] });
      }
      if (source.readOnly) {
        target.setAttribute("readonly", true);
      } else {
        target.removeAttribute("readonly");
      }
    },
    hasSelectionRange(el) {
      return el.setSelectionRange && (el.type === "text" || el.type === "textarea");
    },
    restoreFocus(focused, selectionStart, selectionEnd) {
      if (focused instanceof HTMLSelectElement) {
        focused.focus();
      }
      if (!DOM.isTextualInput(focused)) {
        return;
      }
      let wasFocused = focused.matches(":focus");
      if (focused.readOnly) {
        focused.blur();
      }
      if (!wasFocused) {
        focused.focus();
      }
      if (this.hasSelectionRange(focused)) {
        focused.setSelectionRange(selectionStart, selectionEnd);
      }
    },
    isFormInput(el) {
      return /^(?:input|select|textarea)$/i.test(el.tagName) && el.type !== "button";
    },
    syncAttrsToProps(el) {
      if (el instanceof HTMLInputElement && CHECKABLE_INPUTS.indexOf(el.type.toLocaleLowerCase()) >= 0) {
        el.checked = el.getAttribute("checked") !== null;
      }
    },
    isTextualInput(el) {
      return FOCUSABLE_INPUTS.indexOf(el.type) >= 0;
    },
    isNowTriggerFormExternal(el, phxTriggerExternal) {
      return el.getAttribute && el.getAttribute(phxTriggerExternal) !== null;
    },
    syncPendingRef(fromEl, toEl, disableWith) {
      let ref = fromEl.getAttribute(PHX_REF);
      if (ref === null) {
        return true;
      }
      let refSrc = fromEl.getAttribute(PHX_REF_SRC);
      if (DOM.isFormInput(fromEl) || fromEl.getAttribute(disableWith) !== null) {
        if (DOM.isUploadInput(fromEl)) {
          DOM.mergeAttrs(fromEl, toEl, { isIgnored: true });
        }
        DOM.putPrivate(fromEl, PHX_REF, toEl);
        return false;
      } else {
        PHX_EVENT_CLASSES.forEach((className) => {
          fromEl.classList.contains(className) && toEl.classList.add(className);
        });
        toEl.setAttribute(PHX_REF, ref);
        toEl.setAttribute(PHX_REF_SRC, refSrc);
        return true;
      }
    },
    cleanChildNodes(container, phxUpdate) {
      if (DOM.isPhxUpdate(container, phxUpdate, ["append", "prepend"])) {
        let toRemove = [];
        container.childNodes.forEach((childNode) => {
          if (!childNode.id) {
            let isEmptyTextNode = childNode.nodeType === Node.TEXT_NODE && childNode.nodeValue.trim() === "";
            if (!isEmptyTextNode) {
              logError(`only HTML element tags with an id are allowed inside containers with phx-update.

removing illegal node: "${(childNode.outerHTML || childNode.nodeValue).trim()}"

`);
            }
            toRemove.push(childNode);
          }
        });
        toRemove.forEach((childNode) => childNode.remove());
      }
    },
    replaceRootContainer(container, tagName, attrs) {
      let retainedAttrs = /* @__PURE__ */ new Set(["id", PHX_SESSION, PHX_STATIC, PHX_MAIN, PHX_ROOT_ID]);
      if (container.tagName.toLowerCase() === tagName.toLowerCase()) {
        Array.from(container.attributes).filter((attr) => !retainedAttrs.has(attr.name.toLowerCase())).forEach((attr) => container.removeAttribute(attr.name));
        Object.keys(attrs).filter((name) => !retainedAttrs.has(name.toLowerCase())).forEach((attr) => container.setAttribute(attr, attrs[attr]));
        return container;
      } else {
        let newContainer = document.createElement(tagName);
        Object.keys(attrs).forEach((attr) => newContainer.setAttribute(attr, attrs[attr]));
        retainedAttrs.forEach((attr) => newContainer.setAttribute(attr, container.getAttribute(attr)));
        newContainer.innerHTML = container.innerHTML;
        container.replaceWith(newContainer);
        return newContainer;
      }
    },
    getSticky(el, name, defaultVal) {
      let op = (DOM.private(el, "sticky") || []).find(([existingName]) => name === existingName);
      if (op) {
        let [_name, _op, stashedResult] = op;
        return stashedResult;
      } else {
        return typeof defaultVal === "function" ? defaultVal() : defaultVal;
      }
    },
    deleteSticky(el, name) {
      this.updatePrivate(el, "sticky", [], (ops) => {
        return ops.filter(([existingName, _]) => existingName !== name);
      });
    },
    putSticky(el, name, op) {
      let stashedResult = op(el);
      this.updatePrivate(el, "sticky", [], (ops) => {
        let existingIndex = ops.findIndex(([existingName]) => name === existingName);
        if (existingIndex >= 0) {
          ops[existingIndex] = [name, op, stashedResult];
        } else {
          ops.push([name, op, stashedResult]);
        }
        return ops;
      });
    },
    applyStickyOperations(el) {
      let ops = DOM.private(el, "sticky");
      if (!ops) {
        return;
      }
      ops.forEach(([name, op, _stashed]) => this.putSticky(el, name, op));
    }
  };
  var dom_default = DOM;
  var UploadEntry = class {
    static isActive(fileEl, file) {
      let isNew = file._phxRef === void 0;
      let isPreflightInProgress = UploadEntry.isPreflightInProgress(file);
      let activeRefs = fileEl.getAttribute(PHX_ACTIVE_ENTRY_REFS).split(",");
      let isActive = activeRefs.indexOf(LiveUploader.genFileRef(file)) >= 0;
      return file.size > 0 && (isNew || isActive || !isPreflightInProgress);
    }
    static isPreflighted(fileEl, file) {
      let preflightedRefs = fileEl.getAttribute(PHX_PREFLIGHTED_REFS).split(",");
      let isPreflighted = preflightedRefs.indexOf(LiveUploader.genFileRef(file)) >= 0;
      return isPreflighted && this.isActive(fileEl, file);
    }
    static isPreflightInProgress(file) {
      return file._preflightInProgress === true;
    }
    static markPreflightInProgress(file) {
      file._preflightInProgress = true;
    }
    constructor(fileEl, file, view) {
      this.ref = LiveUploader.genFileRef(file);
      this.fileEl = fileEl;
      this.file = file;
      this.view = view;
      this.meta = null;
      this._isCancelled = false;
      this._isDone = false;
      this._progress = 0;
      this._lastProgressSent = -1;
      this._onDone = function() {
      };
      this._onElUpdated = this.onElUpdated.bind(this);
      this.fileEl.addEventListener(PHX_LIVE_FILE_UPDATED, this._onElUpdated);
    }
    metadata() {
      return this.meta;
    }
    progress(progress) {
      this._progress = Math.floor(progress);
      if (this._progress > this._lastProgressSent) {
        if (this._progress >= 100) {
          this._progress = 100;
          this._lastProgressSent = 100;
          this._isDone = true;
          this.view.pushFileProgress(this.fileEl, this.ref, 100, () => {
            LiveUploader.untrackFile(this.fileEl, this.file);
            this._onDone();
          });
        } else {
          this._lastProgressSent = this._progress;
          this.view.pushFileProgress(this.fileEl, this.ref, this._progress);
        }
      }
    }
    cancel() {
      this._isCancelled = true;
      this._isDone = true;
      this._onDone();
    }
    isDone() {
      return this._isDone;
    }
    error(reason = "failed") {
      this.fileEl.removeEventListener(PHX_LIVE_FILE_UPDATED, this._onElUpdated);
      this.view.pushFileProgress(this.fileEl, this.ref, { error: reason });
      if (!dom_default.isAutoUpload(this.fileEl)) {
        LiveUploader.clearFiles(this.fileEl);
      }
    }
    onDone(callback) {
      this._onDone = () => {
        this.fileEl.removeEventListener(PHX_LIVE_FILE_UPDATED, this._onElUpdated);
        callback();
      };
    }
    onElUpdated() {
      let activeRefs = this.fileEl.getAttribute(PHX_ACTIVE_ENTRY_REFS).split(",");
      if (activeRefs.indexOf(this.ref) === -1) {
        this.cancel();
      }
    }
    toPreflightPayload() {
      return {
        last_modified: this.file.lastModified,
        name: this.file.name,
        relative_path: this.file.webkitRelativePath,
        size: this.file.size,
        type: this.file.type,
        ref: this.ref,
        meta: typeof this.file.meta === "function" ? this.file.meta() : void 0
      };
    }
    uploader(uploaders) {
      if (this.meta.uploader) {
        let callback = uploaders[this.meta.uploader] || logError(`no uploader configured for ${this.meta.uploader}`);
        return { name: this.meta.uploader, callback };
      } else {
        return { name: "channel", callback: channelUploader };
      }
    }
    zipPostFlight(resp) {
      this.meta = resp.entries[this.ref];
      if (!this.meta) {
        logError(`no preflight upload response returned with ref ${this.ref}`, { input: this.fileEl, response: resp });
      }
    }
  };
  var liveUploaderFileRef = 0;
  var LiveUploader = class {
    static genFileRef(file) {
      let ref = file._phxRef;
      if (ref !== void 0) {
        return ref;
      } else {
        file._phxRef = (liveUploaderFileRef++).toString();
        return file._phxRef;
      }
    }
    static getEntryDataURL(inputEl, ref, callback) {
      let file = this.activeFiles(inputEl).find((file2) => this.genFileRef(file2) === ref);
      callback(URL.createObjectURL(file));
    }
    static hasUploadsInProgress(formEl) {
      let active = 0;
      dom_default.findUploadInputs(formEl).forEach((input) => {
        if (input.getAttribute(PHX_PREFLIGHTED_REFS) !== input.getAttribute(PHX_DONE_REFS)) {
          active++;
        }
      });
      return active > 0;
    }
    static serializeUploads(inputEl) {
      let files = this.activeFiles(inputEl);
      let fileData = {};
      files.forEach((file) => {
        let entry = { path: inputEl.name };
        let uploadRef = inputEl.getAttribute(PHX_UPLOAD_REF);
        fileData[uploadRef] = fileData[uploadRef] || [];
        entry.ref = this.genFileRef(file);
        entry.last_modified = file.lastModified;
        entry.name = file.name || entry.ref;
        entry.relative_path = file.webkitRelativePath;
        entry.type = file.type;
        entry.size = file.size;
        if (typeof file.meta === "function") {
          entry.meta = file.meta();
        }
        fileData[uploadRef].push(entry);
      });
      return fileData;
    }
    static clearFiles(inputEl) {
      inputEl.value = null;
      inputEl.removeAttribute(PHX_UPLOAD_REF);
      dom_default.putPrivate(inputEl, "files", []);
    }
    static untrackFile(inputEl, file) {
      dom_default.putPrivate(inputEl, "files", dom_default.private(inputEl, "files").filter((f) => !Object.is(f, file)));
    }
    static trackFiles(inputEl, files, dataTransfer) {
      if (inputEl.getAttribute("multiple") !== null) {
        let newFiles = files.filter((file) => !this.activeFiles(inputEl).find((f) => Object.is(f, file)));
        dom_default.putPrivate(inputEl, "files", this.activeFiles(inputEl).concat(newFiles));
        inputEl.value = null;
      } else {
        if (dataTransfer && dataTransfer.files.length > 0) {
          inputEl.files = dataTransfer.files;
        }
        dom_default.putPrivate(inputEl, "files", files);
      }
    }
    static activeFileInputs(formEl) {
      let fileInputs = dom_default.findUploadInputs(formEl);
      return Array.from(fileInputs).filter((el) => el.files && this.activeFiles(el).length > 0);
    }
    static activeFiles(input) {
      return (dom_default.private(input, "files") || []).filter((f) => UploadEntry.isActive(input, f));
    }
    static inputsAwaitingPreflight(formEl) {
      let fileInputs = dom_default.findUploadInputs(formEl);
      return Array.from(fileInputs).filter((input) => this.filesAwaitingPreflight(input).length > 0);
    }
    static filesAwaitingPreflight(input) {
      return this.activeFiles(input).filter((f) => !UploadEntry.isPreflighted(input, f) && !UploadEntry.isPreflightInProgress(f));
    }
    static markPreflightInProgress(entries) {
      entries.forEach((entry) => UploadEntry.markPreflightInProgress(entry.file));
    }
    constructor(inputEl, view, onComplete) {
      this.view = view;
      this.onComplete = onComplete;
      this._entries = Array.from(LiveUploader.filesAwaitingPreflight(inputEl) || []).map((file) => new UploadEntry(inputEl, file, view));
      LiveUploader.markPreflightInProgress(this._entries);
      this.numEntriesInProgress = this._entries.length;
    }
    entries() {
      return this._entries;
    }
    initAdapterUpload(resp, onError, liveSocket2) {
      this._entries = this._entries.map((entry) => {
        entry.zipPostFlight(resp);
        entry.onDone(() => {
          this.numEntriesInProgress--;
          if (this.numEntriesInProgress === 0) {
            this.onComplete();
          }
        });
        return entry;
      });
      let groupedEntries = this._entries.reduce((acc, entry) => {
        if (!entry.meta) {
          return acc;
        }
        let { name, callback } = entry.uploader(liveSocket2.uploaders);
        acc[name] = acc[name] || { callback, entries: [] };
        acc[name].entries.push(entry);
        return acc;
      }, {});
      for (let name in groupedEntries) {
        let { callback, entries } = groupedEntries[name];
        callback(entries, onError, resp, liveSocket2);
      }
    }
  };
  var Hooks = {
    LiveFileUpload: {
      activeRefs() {
        return this.el.getAttribute(PHX_ACTIVE_ENTRY_REFS);
      },
      preflightedRefs() {
        return this.el.getAttribute(PHX_PREFLIGHTED_REFS);
      },
      mounted() {
        this.preflightedWas = this.preflightedRefs();
      },
      updated() {
        let newPreflights = this.preflightedRefs();
        if (this.preflightedWas !== newPreflights) {
          this.preflightedWas = newPreflights;
          if (newPreflights === "") {
            this.__view.cancelSubmit(this.el.form);
          }
        }
        if (this.activeRefs() === "") {
          this.el.value = null;
        }
        this.el.dispatchEvent(new CustomEvent(PHX_LIVE_FILE_UPDATED));
      }
    },
    LiveImgPreview: {
      mounted() {
        this.ref = this.el.getAttribute("data-phx-entry-ref");
        this.inputEl = document.getElementById(this.el.getAttribute(PHX_UPLOAD_REF));
        LiveUploader.getEntryDataURL(this.inputEl, this.ref, (url) => {
          this.url = url;
          this.el.src = url;
        });
      },
      destroyed() {
        URL.revokeObjectURL(this.url);
      }
    },
    FocusWrap: {
      mounted() {
        this.focusStart = this.el.firstElementChild;
        this.focusEnd = this.el.lastElementChild;
        this.focusStart.addEventListener("focus", () => aria_default.focusLast(this.el));
        this.focusEnd.addEventListener("focus", () => aria_default.focusFirst(this.el));
        this.el.addEventListener("phx:show-end", () => this.el.focus());
        if (window.getComputedStyle(this.el).display !== "none") {
          aria_default.focusFirst(this.el);
        }
      }
    }
  };
  var findScrollContainer = (el) => {
    if (["scroll", "auto"].indexOf(getComputedStyle(el).overflowY) >= 0)
      return el;
    if (document.documentElement === el)
      return null;
    return findScrollContainer(el.parentElement);
  };
  var scrollTop = (scrollContainer) => {
    if (scrollContainer) {
      return scrollContainer.scrollTop;
    } else {
      return document.documentElement.scrollTop || document.body.scrollTop;
    }
  };
  var bottom = (scrollContainer) => {
    if (scrollContainer) {
      return scrollContainer.getBoundingClientRect().bottom;
    } else {
      return window.innerHeight || document.documentElement.clientHeight;
    }
  };
  var top = (scrollContainer) => {
    if (scrollContainer) {
      return scrollContainer.getBoundingClientRect().top;
    } else {
      return 0;
    }
  };
  var isAtViewportTop = (el, scrollContainer) => {
    let rect = el.getBoundingClientRect();
    return rect.top >= top(scrollContainer) && rect.left >= 0 && rect.top <= bottom(scrollContainer);
  };
  var isAtViewportBottom = (el, scrollContainer) => {
    let rect = el.getBoundingClientRect();
    return rect.right >= top(scrollContainer) && rect.left >= 0 && rect.bottom <= bottom(scrollContainer);
  };
  var isWithinViewport = (el, scrollContainer) => {
    let rect = el.getBoundingClientRect();
    return rect.top >= top(scrollContainer) && rect.left >= 0 && rect.top <= bottom(scrollContainer);
  };
  Hooks.InfiniteScroll = {
    mounted() {
      this.scrollContainer = findScrollContainer(this.el);
      let scrollBefore = scrollTop(this.scrollContainer);
      let topOverran = false;
      let throttleInterval = 500;
      let pendingOp = null;
      let onTopOverrun = this.throttle(throttleInterval, (topEvent, firstChild) => {
        pendingOp = () => true;
        this.liveSocket.execJSHookPush(this.el, topEvent, { id: firstChild.id, _overran: true }, () => {
          pendingOp = null;
        });
      });
      let onFirstChildAtTop = this.throttle(throttleInterval, (topEvent, firstChild) => {
        pendingOp = () => firstChild.scrollIntoView({ block: "start" });
        this.liveSocket.execJSHookPush(this.el, topEvent, { id: firstChild.id }, () => {
          pendingOp = null;
          window.requestAnimationFrame(() => {
            if (!isWithinViewport(firstChild, this.scrollContainer)) {
              firstChild.scrollIntoView({ block: "start" });
            }
          });
        });
      });
      let onLastChildAtBottom = this.throttle(throttleInterval, (bottomEvent, lastChild) => {
        pendingOp = () => lastChild.scrollIntoView({ block: "end" });
        this.liveSocket.execJSHookPush(this.el, bottomEvent, { id: lastChild.id }, () => {
          pendingOp = null;
          window.requestAnimationFrame(() => {
            if (!isWithinViewport(lastChild, this.scrollContainer)) {
              lastChild.scrollIntoView({ block: "end" });
            }
          });
        });
      });
      this.onScroll = (_e) => {
        let scrollNow = scrollTop(this.scrollContainer);
        if (pendingOp) {
          scrollBefore = scrollNow;
          return pendingOp();
        }
        let rect = this.el.getBoundingClientRect();
        let topEvent = this.el.getAttribute(this.liveSocket.binding("viewport-top"));
        let bottomEvent = this.el.getAttribute(this.liveSocket.binding("viewport-bottom"));
        let lastChild = this.el.lastElementChild;
        let firstChild = this.el.firstElementChild;
        let isScrollingUp = scrollNow < scrollBefore;
        let isScrollingDown = scrollNow > scrollBefore;
        if (isScrollingUp && topEvent && !topOverran && rect.top >= 0) {
          topOverran = true;
          onTopOverrun(topEvent, firstChild);
        } else if (isScrollingDown && topOverran && rect.top <= 0) {
          topOverran = false;
        }
        if (topEvent && isScrollingUp && isAtViewportTop(firstChild, this.scrollContainer)) {
          onFirstChildAtTop(topEvent, firstChild);
        } else if (bottomEvent && isScrollingDown && isAtViewportBottom(lastChild, this.scrollContainer)) {
          onLastChildAtBottom(bottomEvent, lastChild);
        }
        scrollBefore = scrollNow;
      };
      if (this.scrollContainer) {
        this.scrollContainer.addEventListener("scroll", this.onScroll);
      } else {
        window.addEventListener("scroll", this.onScroll);
      }
    },
    destroyed() {
      if (this.scrollContainer) {
        this.scrollContainer.removeEventListener("scroll", this.onScroll);
      } else {
        window.removeEventListener("scroll", this.onScroll);
      }
    },
    throttle(interval, callback) {
      let lastCallAt = 0;
      let timer;
      return (...args) => {
        let now = Date.now();
        let remainingTime = interval - (now - lastCallAt);
        if (remainingTime <= 0 || remainingTime > interval) {
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }
          lastCallAt = now;
          callback(...args);
        } else if (!timer) {
          timer = setTimeout(() => {
            lastCallAt = Date.now();
            timer = null;
            callback(...args);
          }, remainingTime);
        }
      };
    }
  };
  var hooks_default = Hooks;
  var DOMPostMorphRestorer = class {
    constructor(containerBefore, containerAfter, updateType) {
      let idsBefore = /* @__PURE__ */ new Set();
      let idsAfter = new Set([...containerAfter.children].map((child) => child.id));
      let elementsToModify = [];
      Array.from(containerBefore.children).forEach((child) => {
        if (child.id) {
          idsBefore.add(child.id);
          if (idsAfter.has(child.id)) {
            let previousElementId = child.previousElementSibling && child.previousElementSibling.id;
            elementsToModify.push({ elementId: child.id, previousElementId });
          }
        }
      });
      this.containerId = containerAfter.id;
      this.updateType = updateType;
      this.elementsToModify = elementsToModify;
      this.elementIdsToAdd = [...idsAfter].filter((id) => !idsBefore.has(id));
    }
    perform() {
      let container = dom_default.byId(this.containerId);
      this.elementsToModify.forEach((elementToModify) => {
        if (elementToModify.previousElementId) {
          maybe(document.getElementById(elementToModify.previousElementId), (previousElem) => {
            maybe(document.getElementById(elementToModify.elementId), (elem) => {
              let isInRightPlace = elem.previousElementSibling && elem.previousElementSibling.id == previousElem.id;
              if (!isInRightPlace) {
                previousElem.insertAdjacentElement("afterend", elem);
              }
            });
          });
        } else {
          maybe(document.getElementById(elementToModify.elementId), (elem) => {
            let isInRightPlace = elem.previousElementSibling == null;
            if (!isInRightPlace) {
              container.insertAdjacentElement("afterbegin", elem);
            }
          });
        }
      });
      if (this.updateType == "prepend") {
        this.elementIdsToAdd.reverse().forEach((elemId) => {
          maybe(document.getElementById(elemId), (elem) => container.insertAdjacentElement("afterbegin", elem));
        });
      }
    }
  };
  var DOCUMENT_FRAGMENT_NODE = 11;
  function morphAttrs(fromNode, toNode) {
    var toNodeAttrs = toNode.attributes;
    var attr;
    var attrName;
    var attrNamespaceURI;
    var attrValue;
    var fromValue;
    if (toNode.nodeType === DOCUMENT_FRAGMENT_NODE || fromNode.nodeType === DOCUMENT_FRAGMENT_NODE) {
      return;
    }
    for (var i = toNodeAttrs.length - 1; i >= 0; i--) {
      attr = toNodeAttrs[i];
      attrName = attr.name;
      attrNamespaceURI = attr.namespaceURI;
      attrValue = attr.value;
      if (attrNamespaceURI) {
        attrName = attr.localName || attrName;
        fromValue = fromNode.getAttributeNS(attrNamespaceURI, attrName);
        if (fromValue !== attrValue) {
          if (attr.prefix === "xmlns") {
            attrName = attr.name;
          }
          fromNode.setAttributeNS(attrNamespaceURI, attrName, attrValue);
        }
      } else {
        fromValue = fromNode.getAttribute(attrName);
        if (fromValue !== attrValue) {
          fromNode.setAttribute(attrName, attrValue);
        }
      }
    }
    var fromNodeAttrs = fromNode.attributes;
    for (var d = fromNodeAttrs.length - 1; d >= 0; d--) {
      attr = fromNodeAttrs[d];
      attrName = attr.name;
      attrNamespaceURI = attr.namespaceURI;
      if (attrNamespaceURI) {
        attrName = attr.localName || attrName;
        if (!toNode.hasAttributeNS(attrNamespaceURI, attrName)) {
          fromNode.removeAttributeNS(attrNamespaceURI, attrName);
        }
      } else {
        if (!toNode.hasAttribute(attrName)) {
          fromNode.removeAttribute(attrName);
        }
      }
    }
  }
  var range;
  var NS_XHTML = "http://www.w3.org/1999/xhtml";
  var doc = typeof document === "undefined" ? void 0 : document;
  var HAS_TEMPLATE_SUPPORT = !!doc && "content" in doc.createElement("template");
  var HAS_RANGE_SUPPORT = !!doc && doc.createRange && "createContextualFragment" in doc.createRange();
  function createFragmentFromTemplate(str) {
    var template = doc.createElement("template");
    template.innerHTML = str;
    return template.content.childNodes[0];
  }
  function createFragmentFromRange(str) {
    if (!range) {
      range = doc.createRange();
      range.selectNode(doc.body);
    }
    var fragment = range.createContextualFragment(str);
    return fragment.childNodes[0];
  }
  function createFragmentFromWrap(str) {
    var fragment = doc.createElement("body");
    fragment.innerHTML = str;
    return fragment.childNodes[0];
  }
  function toElement(str) {
    str = str.trim();
    if (HAS_TEMPLATE_SUPPORT) {
      return createFragmentFromTemplate(str);
    } else if (HAS_RANGE_SUPPORT) {
      return createFragmentFromRange(str);
    }
    return createFragmentFromWrap(str);
  }
  function compareNodeNames(fromEl, toEl) {
    var fromNodeName = fromEl.nodeName;
    var toNodeName = toEl.nodeName;
    var fromCodeStart, toCodeStart;
    if (fromNodeName === toNodeName) {
      return true;
    }
    fromCodeStart = fromNodeName.charCodeAt(0);
    toCodeStart = toNodeName.charCodeAt(0);
    if (fromCodeStart <= 90 && toCodeStart >= 97) {
      return fromNodeName === toNodeName.toUpperCase();
    } else if (toCodeStart <= 90 && fromCodeStart >= 97) {
      return toNodeName === fromNodeName.toUpperCase();
    } else {
      return false;
    }
  }
  function createElementNS(name, namespaceURI) {
    return !namespaceURI || namespaceURI === NS_XHTML ? doc.createElement(name) : doc.createElementNS(namespaceURI, name);
  }
  function moveChildren(fromEl, toEl) {
    var curChild = fromEl.firstChild;
    while (curChild) {
      var nextChild = curChild.nextSibling;
      toEl.appendChild(curChild);
      curChild = nextChild;
    }
    return toEl;
  }
  function syncBooleanAttrProp(fromEl, toEl, name) {
    if (fromEl[name] !== toEl[name]) {
      fromEl[name] = toEl[name];
      if (fromEl[name]) {
        fromEl.setAttribute(name, "");
      } else {
        fromEl.removeAttribute(name);
      }
    }
  }
  var specialElHandlers = {
    OPTION: function(fromEl, toEl) {
      var parentNode = fromEl.parentNode;
      if (parentNode) {
        var parentName = parentNode.nodeName.toUpperCase();
        if (parentName === "OPTGROUP") {
          parentNode = parentNode.parentNode;
          parentName = parentNode && parentNode.nodeName.toUpperCase();
        }
        if (parentName === "SELECT" && !parentNode.hasAttribute("multiple")) {
          if (fromEl.hasAttribute("selected") && !toEl.selected) {
            fromEl.setAttribute("selected", "selected");
            fromEl.removeAttribute("selected");
          }
          parentNode.selectedIndex = -1;
        }
      }
      syncBooleanAttrProp(fromEl, toEl, "selected");
    },
    INPUT: function(fromEl, toEl) {
      syncBooleanAttrProp(fromEl, toEl, "checked");
      syncBooleanAttrProp(fromEl, toEl, "disabled");
      if (fromEl.value !== toEl.value) {
        fromEl.value = toEl.value;
      }
      if (!toEl.hasAttribute("value")) {
        fromEl.removeAttribute("value");
      }
    },
    TEXTAREA: function(fromEl, toEl) {
      var newValue = toEl.value;
      if (fromEl.value !== newValue) {
        fromEl.value = newValue;
      }
      var firstChild = fromEl.firstChild;
      if (firstChild) {
        var oldValue = firstChild.nodeValue;
        if (oldValue == newValue || !newValue && oldValue == fromEl.placeholder) {
          return;
        }
        firstChild.nodeValue = newValue;
      }
    },
    SELECT: function(fromEl, toEl) {
      if (!toEl.hasAttribute("multiple")) {
        var selectedIndex = -1;
        var i = 0;
        var curChild = fromEl.firstChild;
        var optgroup;
        var nodeName;
        while (curChild) {
          nodeName = curChild.nodeName && curChild.nodeName.toUpperCase();
          if (nodeName === "OPTGROUP") {
            optgroup = curChild;
            curChild = optgroup.firstChild;
          } else {
            if (nodeName === "OPTION") {
              if (curChild.hasAttribute("selected")) {
                selectedIndex = i;
                break;
              }
              i++;
            }
            curChild = curChild.nextSibling;
            if (!curChild && optgroup) {
              curChild = optgroup.nextSibling;
              optgroup = null;
            }
          }
        }
        fromEl.selectedIndex = selectedIndex;
      }
    }
  };
  var ELEMENT_NODE = 1;
  var DOCUMENT_FRAGMENT_NODE$1 = 11;
  var TEXT_NODE = 3;
  var COMMENT_NODE = 8;
  function noop() {
  }
  function defaultGetNodeKey(node) {
    if (node) {
      return node.getAttribute && node.getAttribute("id") || node.id;
    }
  }
  function morphdomFactory(morphAttrs2) {
    return function morphdom2(fromNode, toNode, options) {
      if (!options) {
        options = {};
      }
      if (typeof toNode === "string") {
        if (fromNode.nodeName === "#document" || fromNode.nodeName === "HTML" || fromNode.nodeName === "BODY") {
          var toNodeHtml = toNode;
          toNode = doc.createElement("html");
          toNode.innerHTML = toNodeHtml;
        } else {
          toNode = toElement(toNode);
        }
      } else if (toNode.nodeType === DOCUMENT_FRAGMENT_NODE$1) {
        toNode = toNode.firstElementChild;
      }
      var getNodeKey = options.getNodeKey || defaultGetNodeKey;
      var onBeforeNodeAdded = options.onBeforeNodeAdded || noop;
      var onNodeAdded = options.onNodeAdded || noop;
      var onBeforeElUpdated = options.onBeforeElUpdated || noop;
      var onElUpdated = options.onElUpdated || noop;
      var onBeforeNodeDiscarded = options.onBeforeNodeDiscarded || noop;
      var onNodeDiscarded = options.onNodeDiscarded || noop;
      var onBeforeElChildrenUpdated = options.onBeforeElChildrenUpdated || noop;
      var skipFromChildren = options.skipFromChildren || noop;
      var addChild = options.addChild || function(parent, child) {
        return parent.appendChild(child);
      };
      var childrenOnly = options.childrenOnly === true;
      var fromNodesLookup = /* @__PURE__ */ Object.create(null);
      var keyedRemovalList = [];
      function addKeyedRemoval(key) {
        keyedRemovalList.push(key);
      }
      function walkDiscardedChildNodes(node, skipKeyedNodes) {
        if (node.nodeType === ELEMENT_NODE) {
          var curChild = node.firstChild;
          while (curChild) {
            var key = void 0;
            if (skipKeyedNodes && (key = getNodeKey(curChild))) {
              addKeyedRemoval(key);
            } else {
              onNodeDiscarded(curChild);
              if (curChild.firstChild) {
                walkDiscardedChildNodes(curChild, skipKeyedNodes);
              }
            }
            curChild = curChild.nextSibling;
          }
        }
      }
      function removeNode(node, parentNode, skipKeyedNodes) {
        if (onBeforeNodeDiscarded(node) === false) {
          return;
        }
        if (parentNode) {
          parentNode.removeChild(node);
        }
        onNodeDiscarded(node);
        walkDiscardedChildNodes(node, skipKeyedNodes);
      }
      function indexTree(node) {
        if (node.nodeType === ELEMENT_NODE || node.nodeType === DOCUMENT_FRAGMENT_NODE$1) {
          var curChild = node.firstChild;
          while (curChild) {
            var key = getNodeKey(curChild);
            if (key) {
              fromNodesLookup[key] = curChild;
            }
            indexTree(curChild);
            curChild = curChild.nextSibling;
          }
        }
      }
      indexTree(fromNode);
      function handleNodeAdded(el) {
        onNodeAdded(el);
        var curChild = el.firstChild;
        while (curChild) {
          var nextSibling = curChild.nextSibling;
          var key = getNodeKey(curChild);
          if (key) {
            var unmatchedFromEl = fromNodesLookup[key];
            if (unmatchedFromEl && compareNodeNames(curChild, unmatchedFromEl)) {
              curChild.parentNode.replaceChild(unmatchedFromEl, curChild);
              morphEl(unmatchedFromEl, curChild);
            } else {
              handleNodeAdded(curChild);
            }
          } else {
            handleNodeAdded(curChild);
          }
          curChild = nextSibling;
        }
      }
      function cleanupFromEl(fromEl, curFromNodeChild, curFromNodeKey) {
        while (curFromNodeChild) {
          var fromNextSibling = curFromNodeChild.nextSibling;
          if (curFromNodeKey = getNodeKey(curFromNodeChild)) {
            addKeyedRemoval(curFromNodeKey);
          } else {
            removeNode(curFromNodeChild, fromEl, true);
          }
          curFromNodeChild = fromNextSibling;
        }
      }
      function morphEl(fromEl, toEl, childrenOnly2) {
        var toElKey = getNodeKey(toEl);
        if (toElKey) {
          delete fromNodesLookup[toElKey];
        }
        if (!childrenOnly2) {
          if (onBeforeElUpdated(fromEl, toEl) === false) {
            return;
          }
          morphAttrs2(fromEl, toEl);
          onElUpdated(fromEl);
          if (onBeforeElChildrenUpdated(fromEl, toEl) === false) {
            return;
          }
        }
        if (fromEl.nodeName !== "TEXTAREA") {
          morphChildren(fromEl, toEl);
        } else {
          specialElHandlers.TEXTAREA(fromEl, toEl);
        }
      }
      function morphChildren(fromEl, toEl) {
        var skipFrom = skipFromChildren(fromEl, toEl);
        var curToNodeChild = toEl.firstChild;
        var curFromNodeChild = fromEl.firstChild;
        var curToNodeKey;
        var curFromNodeKey;
        var fromNextSibling;
        var toNextSibling;
        var matchingFromEl;
        outer:
          while (curToNodeChild) {
            toNextSibling = curToNodeChild.nextSibling;
            curToNodeKey = getNodeKey(curToNodeChild);
            while (!skipFrom && curFromNodeChild) {
              fromNextSibling = curFromNodeChild.nextSibling;
              if (curToNodeChild.isSameNode && curToNodeChild.isSameNode(curFromNodeChild)) {
                curToNodeChild = toNextSibling;
                curFromNodeChild = fromNextSibling;
                continue outer;
              }
              curFromNodeKey = getNodeKey(curFromNodeChild);
              var curFromNodeType = curFromNodeChild.nodeType;
              var isCompatible = void 0;
              if (curFromNodeType === curToNodeChild.nodeType) {
                if (curFromNodeType === ELEMENT_NODE) {
                  if (curToNodeKey) {
                    if (curToNodeKey !== curFromNodeKey) {
                      if (matchingFromEl = fromNodesLookup[curToNodeKey]) {
                        if (fromNextSibling === matchingFromEl) {
                          isCompatible = false;
                        } else {
                          fromEl.insertBefore(matchingFromEl, curFromNodeChild);
                          if (curFromNodeKey) {
                            addKeyedRemoval(curFromNodeKey);
                          } else {
                            removeNode(curFromNodeChild, fromEl, true);
                          }
                          curFromNodeChild = matchingFromEl;
                          curFromNodeKey = getNodeKey(curFromNodeChild);
                        }
                      } else {
                        isCompatible = false;
                      }
                    }
                  } else if (curFromNodeKey) {
                    isCompatible = false;
                  }
                  isCompatible = isCompatible !== false && compareNodeNames(curFromNodeChild, curToNodeChild);
                  if (isCompatible) {
                    morphEl(curFromNodeChild, curToNodeChild);
                  }
                } else if (curFromNodeType === TEXT_NODE || curFromNodeType == COMMENT_NODE) {
                  isCompatible = true;
                  if (curFromNodeChild.nodeValue !== curToNodeChild.nodeValue) {
                    curFromNodeChild.nodeValue = curToNodeChild.nodeValue;
                  }
                }
              }
              if (isCompatible) {
                curToNodeChild = toNextSibling;
                curFromNodeChild = fromNextSibling;
                continue outer;
              }
              if (curFromNodeKey) {
                addKeyedRemoval(curFromNodeKey);
              } else {
                removeNode(curFromNodeChild, fromEl, true);
              }
              curFromNodeChild = fromNextSibling;
            }
            if (curToNodeKey && (matchingFromEl = fromNodesLookup[curToNodeKey]) && compareNodeNames(matchingFromEl, curToNodeChild)) {
              if (!skipFrom) {
                addChild(fromEl, matchingFromEl);
              }
              morphEl(matchingFromEl, curToNodeChild);
            } else {
              var onBeforeNodeAddedResult = onBeforeNodeAdded(curToNodeChild);
              if (onBeforeNodeAddedResult !== false) {
                if (onBeforeNodeAddedResult) {
                  curToNodeChild = onBeforeNodeAddedResult;
                }
                if (curToNodeChild.actualize) {
                  curToNodeChild = curToNodeChild.actualize(fromEl.ownerDocument || doc);
                }
                addChild(fromEl, curToNodeChild);
                handleNodeAdded(curToNodeChild);
              }
            }
            curToNodeChild = toNextSibling;
            curFromNodeChild = fromNextSibling;
          }
        cleanupFromEl(fromEl, curFromNodeChild, curFromNodeKey);
        var specialElHandler = specialElHandlers[fromEl.nodeName];
        if (specialElHandler) {
          specialElHandler(fromEl, toEl);
        }
      }
      var morphedNode = fromNode;
      var morphedNodeType = morphedNode.nodeType;
      var toNodeType = toNode.nodeType;
      if (!childrenOnly) {
        if (morphedNodeType === ELEMENT_NODE) {
          if (toNodeType === ELEMENT_NODE) {
            if (!compareNodeNames(fromNode, toNode)) {
              onNodeDiscarded(fromNode);
              morphedNode = moveChildren(fromNode, createElementNS(toNode.nodeName, toNode.namespaceURI));
            }
          } else {
            morphedNode = toNode;
          }
        } else if (morphedNodeType === TEXT_NODE || morphedNodeType === COMMENT_NODE) {
          if (toNodeType === morphedNodeType) {
            if (morphedNode.nodeValue !== toNode.nodeValue) {
              morphedNode.nodeValue = toNode.nodeValue;
            }
            return morphedNode;
          } else {
            morphedNode = toNode;
          }
        }
      }
      if (morphedNode === toNode) {
        onNodeDiscarded(fromNode);
      } else {
        if (toNode.isSameNode && toNode.isSameNode(morphedNode)) {
          return;
        }
        morphEl(morphedNode, toNode, childrenOnly);
        if (keyedRemovalList) {
          for (var i = 0, len = keyedRemovalList.length; i < len; i++) {
            var elToRemove = fromNodesLookup[keyedRemovalList[i]];
            if (elToRemove) {
              removeNode(elToRemove, elToRemove.parentNode, false);
            }
          }
        }
      }
      if (!childrenOnly && morphedNode !== fromNode && fromNode.parentNode) {
        if (morphedNode.actualize) {
          morphedNode = morphedNode.actualize(fromNode.ownerDocument || doc);
        }
        fromNode.parentNode.replaceChild(morphedNode, fromNode);
      }
      return morphedNode;
    };
  }
  var morphdom = morphdomFactory(morphAttrs);
  var morphdom_esm_default = morphdom;
  var DOMPatch = class {
    static patchEl(fromEl, toEl, activeElement) {
      morphdom_esm_default(fromEl, toEl, {
        childrenOnly: false,
        onBeforeElUpdated: (fromEl2, toEl2) => {
          if (activeElement && activeElement.isSameNode(fromEl2) && dom_default.isFormInput(fromEl2)) {
            dom_default.mergeFocusedInput(fromEl2, toEl2);
            return false;
          }
        }
      });
    }
    constructor(view, container, id, html, streams, targetCID) {
      this.view = view;
      this.liveSocket = view.liveSocket;
      this.container = container;
      this.id = id;
      this.rootID = view.root.id;
      this.html = html;
      this.streams = streams;
      this.streamInserts = {};
      this.streamComponentRestore = {};
      this.targetCID = targetCID;
      this.cidPatch = isCid(this.targetCID);
      this.pendingRemoves = [];
      this.phxRemove = this.liveSocket.binding("remove");
      this.callbacks = {
        beforeadded: [],
        beforeupdated: [],
        beforephxChildAdded: [],
        afteradded: [],
        afterupdated: [],
        afterdiscarded: [],
        afterphxChildAdded: [],
        aftertransitionsDiscarded: []
      };
    }
    before(kind, callback) {
      this.callbacks[`before${kind}`].push(callback);
    }
    after(kind, callback) {
      this.callbacks[`after${kind}`].push(callback);
    }
    trackBefore(kind, ...args) {
      this.callbacks[`before${kind}`].forEach((callback) => callback(...args));
    }
    trackAfter(kind, ...args) {
      this.callbacks[`after${kind}`].forEach((callback) => callback(...args));
    }
    markPrunableContentForRemoval() {
      let phxUpdate = this.liveSocket.binding(PHX_UPDATE);
      dom_default.all(this.container, `[${phxUpdate}=append] > *, [${phxUpdate}=prepend] > *`, (el) => {
        el.setAttribute(PHX_PRUNE, "");
      });
    }
    perform(isJoinPatch) {
      let { view, liveSocket: liveSocket2, container, html } = this;
      let targetContainer = this.isCIDPatch() ? this.targetCIDContainer(html) : container;
      if (this.isCIDPatch() && !targetContainer) {
        return;
      }
      let focused = liveSocket2.getActiveElement();
      let { selectionStart, selectionEnd } = focused && dom_default.hasSelectionRange(focused) ? focused : {};
      let phxUpdate = liveSocket2.binding(PHX_UPDATE);
      let phxFeedbackFor = liveSocket2.binding(PHX_FEEDBACK_FOR);
      let phxFeedbackGroup = liveSocket2.binding(PHX_FEEDBACK_GROUP);
      let disableWith = liveSocket2.binding(PHX_DISABLE_WITH);
      let phxViewportTop = liveSocket2.binding(PHX_VIEWPORT_TOP);
      let phxViewportBottom = liveSocket2.binding(PHX_VIEWPORT_BOTTOM);
      let phxTriggerExternal = liveSocket2.binding(PHX_TRIGGER_ACTION);
      let added = [];
      let feedbackContainers = [];
      let updates = [];
      let appendPrependUpdates = [];
      let externalFormTriggered = null;
      this.trackBefore("added", container);
      this.trackBefore("updated", container, container);
      liveSocket2.time("morphdom", () => {
        this.streams.forEach(([ref, inserts, deleteIds, reset]) => {
          inserts.forEach(([key, streamAt, limit]) => {
            this.streamInserts[key] = { ref, streamAt, limit, reset };
          });
          if (reset !== void 0) {
            dom_default.all(container, `[${PHX_STREAM_REF}="${ref}"]`, (child) => {
              this.removeStreamChildElement(child);
            });
          }
          deleteIds.forEach((id) => {
            let child = container.querySelector(`[id="${id}"]`);
            if (child) {
              this.removeStreamChildElement(child);
            }
          });
        });
        if (isJoinPatch) {
          dom_default.all(this.container, `[${phxUpdate}=${PHX_STREAM}]`, (el) => {
            this.liveSocket.owner(el, (view2) => {
              if (view2 === this.view) {
                Array.from(el.children).forEach((child) => {
                  this.removeStreamChildElement(child);
                });
              }
            });
          });
        }
        morphdom_esm_default(targetContainer, html, {
          childrenOnly: targetContainer.getAttribute(PHX_COMPONENT) === null,
          getNodeKey: (node) => {
            if (dom_default.isPhxDestroyed(node)) {
              return null;
            }
            if (isJoinPatch) {
              return node.id;
            }
            return node.id || node.getAttribute && node.getAttribute(PHX_MAGIC_ID);
          },
          skipFromChildren: (from) => {
            return from.getAttribute(phxUpdate) === PHX_STREAM;
          },
          addChild: (parent, child) => {
            let { ref, streamAt } = this.getStreamInsert(child);
            if (ref === void 0) {
              return parent.appendChild(child);
            }
            this.setStreamRef(child, ref);
            child.querySelectorAll(`[${PHX_MAGIC_ID}][${PHX_SKIP}]`).forEach((el) => {
              const component = this.streamComponentRestore[el.getAttribute(PHX_MAGIC_ID)];
              if (component) {
                el.replaceWith(component);
              }
            });
            if (streamAt === 0) {
              parent.insertAdjacentElement("afterbegin", child);
            } else if (streamAt === -1) {
              parent.appendChild(child);
            } else if (streamAt > 0) {
              let sibling = Array.from(parent.children)[streamAt];
              parent.insertBefore(child, sibling);
            }
          },
          onBeforeNodeAdded: (el) => {
            dom_default.maybeAddPrivateHooks(el, phxViewportTop, phxViewportBottom);
            if (dom_default.isFeedbackContainer(el, phxFeedbackFor))
              feedbackContainers.push(el);
            this.trackBefore("added", el);
            return el;
          },
          onNodeAdded: (el) => {
            if (el.getAttribute) {
              this.maybeReOrderStream(el, true);
            }
            if (el instanceof HTMLImageElement && el.srcset) {
              el.srcset = el.srcset;
            } else if (el instanceof HTMLVideoElement && el.autoplay) {
              el.play();
            }
            if (dom_default.isNowTriggerFormExternal(el, phxTriggerExternal)) {
              externalFormTriggered = el;
            }
            if (dom_default.isPhxChild(el) && view.ownsElement(el) || dom_default.isPhxSticky(el) && view.ownsElement(el.parentNode)) {
              this.trackAfter("phxChildAdded", el);
            }
            added.push(el);
          },
          onNodeDiscarded: (el) => this.onNodeDiscarded(el),
          onBeforeNodeDiscarded: (el) => {
            if (el.getAttribute && el.getAttribute(PHX_PRUNE) !== null) {
              return true;
            }
            if (el.parentElement !== null && el.id && dom_default.isPhxUpdate(el.parentElement, phxUpdate, [PHX_STREAM, "append", "prepend"])) {
              return false;
            }
            if (this.maybePendingRemove(el)) {
              return false;
            }
            if (this.skipCIDSibling(el)) {
              return false;
            }
            return true;
          },
          onElUpdated: (el) => {
            if (dom_default.isNowTriggerFormExternal(el, phxTriggerExternal)) {
              externalFormTriggered = el;
            }
            updates.push(el);
            this.maybeReOrderStream(el, false);
          },
          onBeforeElUpdated: (fromEl, toEl) => {
            dom_default.maybeAddPrivateHooks(toEl, phxViewportTop, phxViewportBottom);
            if (dom_default.isFeedbackContainer(fromEl, phxFeedbackFor) || dom_default.isFeedbackContainer(toEl, phxFeedbackFor)) {
              feedbackContainers.push(fromEl);
              feedbackContainers.push(toEl);
            }
            dom_default.cleanChildNodes(toEl, phxUpdate);
            if (this.skipCIDSibling(toEl)) {
              this.maybeReOrderStream(fromEl);
              return false;
            }
            if (dom_default.isPhxSticky(fromEl)) {
              return false;
            }
            if (dom_default.isIgnored(fromEl, phxUpdate) || fromEl.form && fromEl.form.isSameNode(externalFormTriggered)) {
              this.trackBefore("updated", fromEl, toEl);
              dom_default.mergeAttrs(fromEl, toEl, { isIgnored: true });
              updates.push(fromEl);
              dom_default.applyStickyOperations(fromEl);
              return false;
            }
            if (fromEl.type === "number" && (fromEl.validity && fromEl.validity.badInput)) {
              return false;
            }
            if (!dom_default.syncPendingRef(fromEl, toEl, disableWith)) {
              if (dom_default.isUploadInput(fromEl)) {
                this.trackBefore("updated", fromEl, toEl);
                updates.push(fromEl);
              }
              dom_default.applyStickyOperations(fromEl);
              return false;
            }
            if (dom_default.isPhxChild(toEl)) {
              let prevSession = fromEl.getAttribute(PHX_SESSION);
              dom_default.mergeAttrs(fromEl, toEl, { exclude: [PHX_STATIC] });
              if (prevSession !== "") {
                fromEl.setAttribute(PHX_SESSION, prevSession);
              }
              fromEl.setAttribute(PHX_ROOT_ID, this.rootID);
              dom_default.applyStickyOperations(fromEl);
              return false;
            }
            dom_default.copyPrivates(toEl, fromEl);
            let isFocusedFormEl = focused && fromEl.isSameNode(focused) && dom_default.isFormInput(fromEl);
            let focusedSelectChanged = isFocusedFormEl && this.isChangedSelect(fromEl, toEl);
            if (isFocusedFormEl && fromEl.type !== "hidden" && !focusedSelectChanged) {
              this.trackBefore("updated", fromEl, toEl);
              dom_default.mergeFocusedInput(fromEl, toEl);
              dom_default.syncAttrsToProps(fromEl);
              updates.push(fromEl);
              dom_default.applyStickyOperations(fromEl);
              return false;
            } else {
              if (focusedSelectChanged) {
                fromEl.blur();
              }
              if (dom_default.isPhxUpdate(toEl, phxUpdate, ["append", "prepend"])) {
                appendPrependUpdates.push(new DOMPostMorphRestorer(fromEl, toEl, toEl.getAttribute(phxUpdate)));
              }
              dom_default.syncAttrsToProps(toEl);
              dom_default.applyStickyOperations(toEl);
              this.trackBefore("updated", fromEl, toEl);
              return true;
            }
          }
        });
      });
      if (liveSocket2.isDebugEnabled()) {
        detectDuplicateIds();
      }
      if (appendPrependUpdates.length > 0) {
        liveSocket2.time("post-morph append/prepend restoration", () => {
          appendPrependUpdates.forEach((update) => update.perform());
        });
      }
      dom_default.maybeHideFeedback(targetContainer, feedbackContainers, phxFeedbackFor, phxFeedbackGroup);
      liveSocket2.silenceEvents(() => dom_default.restoreFocus(focused, selectionStart, selectionEnd));
      dom_default.dispatchEvent(document, "phx:update");
      added.forEach((el) => this.trackAfter("added", el));
      updates.forEach((el) => this.trackAfter("updated", el));
      this.transitionPendingRemoves();
      if (externalFormTriggered) {
        liveSocket2.unload();
        Object.getPrototypeOf(externalFormTriggered).submit.call(externalFormTriggered);
      }
      return true;
    }
    onNodeDiscarded(el) {
      if (dom_default.isPhxChild(el) || dom_default.isPhxSticky(el)) {
        this.liveSocket.destroyViewByEl(el);
      }
      this.trackAfter("discarded", el);
    }
    maybePendingRemove(node) {
      if (node.getAttribute && node.getAttribute(this.phxRemove) !== null) {
        this.pendingRemoves.push(node);
        return true;
      } else {
        return false;
      }
    }
    removeStreamChildElement(child) {
      if (!this.maybePendingRemove(child)) {
        if (this.streamInserts[child.id]) {
          child.querySelectorAll(`[${PHX_MAGIC_ID}]`).forEach((el) => {
            this.streamComponentRestore[el.getAttribute(PHX_MAGIC_ID)] = el;
          });
        }
        child.remove();
        this.onNodeDiscarded(child);
      }
    }
    getStreamInsert(el) {
      let insert = el.id ? this.streamInserts[el.id] : {};
      return insert || {};
    }
    setStreamRef(el, ref) {
      dom_default.putSticky(el, PHX_STREAM_REF, (el2) => el2.setAttribute(PHX_STREAM_REF, ref));
    }
    maybeReOrderStream(el, isNew) {
      let { ref, streamAt, reset } = this.getStreamInsert(el);
      if (streamAt === void 0) {
        return;
      }
      this.setStreamRef(el, ref);
      if (!reset && !isNew) {
        return;
      }
      if (streamAt === 0) {
        el.parentElement.insertBefore(el, el.parentElement.firstElementChild);
      } else if (streamAt > 0) {
        let children = Array.from(el.parentElement.children);
        let oldIndex = children.indexOf(el);
        if (streamAt >= children.length - 1) {
          el.parentElement.appendChild(el);
        } else {
          let sibling = children[streamAt];
          if (oldIndex > streamAt) {
            el.parentElement.insertBefore(el, sibling);
          } else {
            el.parentElement.insertBefore(el, sibling.nextElementSibling);
          }
        }
      }
      this.maybeLimitStream(el);
    }
    maybeLimitStream(el) {
      let { limit } = this.getStreamInsert(el);
      let children = limit !== null && Array.from(el.parentElement.children);
      if (limit && limit < 0 && children.length > limit * -1) {
        children.slice(0, children.length + limit).forEach((child) => this.removeStreamChildElement(child));
      } else if (limit && limit >= 0 && children.length > limit) {
        children.slice(limit).forEach((child) => this.removeStreamChildElement(child));
      }
    }
    transitionPendingRemoves() {
      let { pendingRemoves, liveSocket: liveSocket2 } = this;
      if (pendingRemoves.length > 0) {
        liveSocket2.transitionRemoves(pendingRemoves);
        liveSocket2.requestDOMUpdate(() => {
          pendingRemoves.forEach((el) => {
            let child = dom_default.firstPhxChild(el);
            if (child) {
              liveSocket2.destroyViewByEl(child);
            }
            el.remove();
          });
          this.trackAfter("transitionsDiscarded", pendingRemoves);
        });
      }
    }
    isChangedSelect(fromEl, toEl) {
      if (!(fromEl instanceof HTMLSelectElement) || fromEl.multiple) {
        return false;
      }
      if (fromEl.options.length !== toEl.options.length) {
        return true;
      }
      let fromSelected = fromEl.selectedOptions[0];
      let toSelected = toEl.selectedOptions[0];
      if (fromSelected && fromSelected.hasAttribute("selected")) {
        toSelected.setAttribute("selected", fromSelected.getAttribute("selected"));
      }
      return !fromEl.isEqualNode(toEl);
    }
    isCIDPatch() {
      return this.cidPatch;
    }
    skipCIDSibling(el) {
      return el.nodeType === Node.ELEMENT_NODE && el.hasAttribute(PHX_SKIP);
    }
    targetCIDContainer(html) {
      if (!this.isCIDPatch()) {
        return;
      }
      let [first, ...rest] = dom_default.findComponentNodeList(this.container, this.targetCID);
      if (rest.length === 0 && dom_default.childNodeLength(html) === 1) {
        return first;
      } else {
        return first && first.parentNode;
      }
    }
    indexOf(parent, child) {
      return Array.from(parent.children).indexOf(child);
    }
  };
  var VOID_TAGS = /* @__PURE__ */ new Set([
    "area",
    "base",
    "br",
    "col",
    "command",
    "embed",
    "hr",
    "img",
    "input",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr"
  ]);
  var quoteChars = /* @__PURE__ */ new Set(["'", '"']);
  var modifyRoot = (html, attrs, clearInnerHTML) => {
    let i = 0;
    let insideComment = false;
    let beforeTag, afterTag, tag, tagNameEndsAt, id, newHTML;
    let lookahead = html.match(/^(\s*(?:<!--.*?-->\s*)*)<([^\s\/>]+)/);
    if (lookahead === null) {
      throw new Error(`malformed html ${html}`);
    }
    i = lookahead[0].length;
    beforeTag = lookahead[1];
    tag = lookahead[2];
    tagNameEndsAt = i;
    for (i; i < html.length; i++) {
      if (html.charAt(i) === ">") {
        break;
      }
      if (html.charAt(i) === "=") {
        let isId = html.slice(i - 3, i) === " id";
        i++;
        let char = html.charAt(i);
        if (quoteChars.has(char)) {
          let attrStartsAt = i;
          i++;
          for (i; i < html.length; i++) {
            if (html.charAt(i) === char) {
              break;
            }
          }
          if (isId) {
            id = html.slice(attrStartsAt + 1, i);
            break;
          }
        }
      }
    }
    let closeAt = html.length - 1;
    insideComment = false;
    while (closeAt >= beforeTag.length + tag.length) {
      let char = html.charAt(closeAt);
      if (insideComment) {
        if (char === "-" && html.slice(closeAt - 3, closeAt) === "<!-") {
          insideComment = false;
          closeAt -= 4;
        } else {
          closeAt -= 1;
        }
      } else if (char === ">" && html.slice(closeAt - 2, closeAt) === "--") {
        insideComment = true;
        closeAt -= 3;
      } else if (char === ">") {
        break;
      } else {
        closeAt -= 1;
      }
    }
    afterTag = html.slice(closeAt + 1, html.length);
    let attrsStr = Object.keys(attrs).map((attr) => attrs[attr] === true ? attr : `${attr}="${attrs[attr]}"`).join(" ");
    if (clearInnerHTML) {
      let idAttrStr = id ? ` id="${id}"` : "";
      if (VOID_TAGS.has(tag)) {
        newHTML = `<${tag}${idAttrStr}${attrsStr === "" ? "" : " "}${attrsStr}/>`;
      } else {
        newHTML = `<${tag}${idAttrStr}${attrsStr === "" ? "" : " "}${attrsStr}></${tag}>`;
      }
    } else {
      let rest = html.slice(tagNameEndsAt, closeAt + 1);
      newHTML = `<${tag}${attrsStr === "" ? "" : " "}${attrsStr}${rest}`;
    }
    return [newHTML, beforeTag, afterTag];
  };
  var Rendered = class {
    static extract(diff) {
      let { [REPLY]: reply, [EVENTS]: events, [TITLE]: title } = diff;
      delete diff[REPLY];
      delete diff[EVENTS];
      delete diff[TITLE];
      return { diff, title, reply: reply || null, events: events || [] };
    }
    constructor(viewId, rendered) {
      this.viewId = viewId;
      this.rendered = {};
      this.magicId = 0;
      this.mergeDiff(rendered);
    }
    parentViewId() {
      return this.viewId;
    }
    toString(onlyCids) {
      let [str, streams] = this.recursiveToString(this.rendered, this.rendered[COMPONENTS], onlyCids, true, {});
      return [str, streams];
    }
    recursiveToString(rendered, components = rendered[COMPONENTS], onlyCids, changeTracking, rootAttrs) {
      onlyCids = onlyCids ? new Set(onlyCids) : null;
      let output = { buffer: "", components, onlyCids, streams: /* @__PURE__ */ new Set() };
      this.toOutputBuffer(rendered, null, output, changeTracking, rootAttrs);
      return [output.buffer, output.streams];
    }
    componentCIDs(diff) {
      return Object.keys(diff[COMPONENTS] || {}).map((i) => parseInt(i));
    }
    isComponentOnlyDiff(diff) {
      if (!diff[COMPONENTS]) {
        return false;
      }
      return Object.keys(diff).length === 1;
    }
    getComponent(diff, cid) {
      return diff[COMPONENTS][cid];
    }
    resetRender(cid) {
      if (this.rendered[COMPONENTS][cid]) {
        this.rendered[COMPONENTS][cid].reset = true;
      }
    }
    mergeDiff(diff) {
      let newc = diff[COMPONENTS];
      let cache = {};
      delete diff[COMPONENTS];
      this.rendered = this.mutableMerge(this.rendered, diff);
      this.rendered[COMPONENTS] = this.rendered[COMPONENTS] || {};
      if (newc) {
        let oldc = this.rendered[COMPONENTS];
        for (let cid in newc) {
          newc[cid] = this.cachedFindComponent(cid, newc[cid], oldc, newc, cache);
        }
        for (let cid in newc) {
          oldc[cid] = newc[cid];
        }
        diff[COMPONENTS] = newc;
      }
    }
    cachedFindComponent(cid, cdiff, oldc, newc, cache) {
      if (cache[cid]) {
        return cache[cid];
      } else {
        let ndiff, stat, scid = cdiff[STATIC];
        if (isCid(scid)) {
          let tdiff;
          if (scid > 0) {
            tdiff = this.cachedFindComponent(scid, newc[scid], oldc, newc, cache);
          } else {
            tdiff = oldc[-scid];
          }
          stat = tdiff[STATIC];
          ndiff = this.cloneMerge(tdiff, cdiff, true);
          ndiff[STATIC] = stat;
        } else {
          ndiff = cdiff[STATIC] !== void 0 || oldc[cid] === void 0 ? cdiff : this.cloneMerge(oldc[cid], cdiff, false);
        }
        cache[cid] = ndiff;
        return ndiff;
      }
    }
    mutableMerge(target, source) {
      if (source[STATIC] !== void 0) {
        return source;
      } else {
        this.doMutableMerge(target, source);
        return target;
      }
    }
    doMutableMerge(target, source) {
      for (let key in source) {
        let val = source[key];
        let targetVal = target[key];
        let isObjVal = isObject(val);
        if (isObjVal && val[STATIC] === void 0 && isObject(targetVal)) {
          this.doMutableMerge(targetVal, val);
        } else {
          target[key] = val;
        }
      }
      if (target[ROOT]) {
        target.newRender = true;
      }
    }
    cloneMerge(target, source, pruneMagicId) {
      let merged = __spreadValues(__spreadValues({}, target), source);
      for (let key in merged) {
        let val = source[key];
        let targetVal = target[key];
        if (isObject(val) && val[STATIC] === void 0 && isObject(targetVal)) {
          merged[key] = this.cloneMerge(targetVal, val, pruneMagicId);
        }
      }
      if (pruneMagicId) {
        delete merged.magicId;
        delete merged.newRender;
      } else if (target[ROOT]) {
        merged.newRender = true;
      }
      return merged;
    }
    componentToString(cid) {
      let [str, streams] = this.recursiveCIDToString(this.rendered[COMPONENTS], cid, null);
      let [strippedHTML, _before, _after] = modifyRoot(str, {});
      return [strippedHTML, streams];
    }
    pruneCIDs(cids) {
      cids.forEach((cid) => delete this.rendered[COMPONENTS][cid]);
    }
    get() {
      return this.rendered;
    }
    isNewFingerprint(diff = {}) {
      return !!diff[STATIC];
    }
    templateStatic(part, templates) {
      if (typeof part === "number") {
        return templates[part];
      } else {
        return part;
      }
    }
    nextMagicID() {
      this.magicId++;
      return `${this.parentViewId()}-${this.magicId}`;
    }
    toOutputBuffer(rendered, templates, output, changeTracking, rootAttrs = {}) {
      if (rendered[DYNAMICS]) {
        return this.comprehensionToBuffer(rendered, templates, output);
      }
      let { [STATIC]: statics } = rendered;
      statics = this.templateStatic(statics, templates);
      let isRoot = rendered[ROOT];
      let prevBuffer = output.buffer;
      if (isRoot) {
        output.buffer = "";
      }
      if (changeTracking && isRoot && !rendered.magicId) {
        rendered.newRender = true;
        rendered.magicId = this.nextMagicID();
      }
      output.buffer += statics[0];
      for (let i = 1; i < statics.length; i++) {
        this.dynamicToBuffer(rendered[i - 1], templates, output, changeTracking);
        output.buffer += statics[i];
      }
      if (isRoot) {
        let skip = false;
        let attrs;
        if (changeTracking || rendered.magicId) {
          skip = changeTracking && !rendered.newRender;
          attrs = __spreadValues({ [PHX_MAGIC_ID]: rendered.magicId }, rootAttrs);
        } else {
          attrs = rootAttrs;
        }
        if (skip) {
          attrs[PHX_SKIP] = true;
        }
        let [newRoot, commentBefore, commentAfter] = modifyRoot(output.buffer, attrs, skip);
        rendered.newRender = false;
        output.buffer = prevBuffer + commentBefore + newRoot + commentAfter;
      }
    }
    comprehensionToBuffer(rendered, templates, output) {
      let { [DYNAMICS]: dynamics, [STATIC]: statics, [STREAM]: stream } = rendered;
      let [_ref, _inserts, deleteIds, reset] = stream || [null, {}, [], null];
      statics = this.templateStatic(statics, templates);
      let compTemplates = templates || rendered[TEMPLATES];
      for (let d = 0; d < dynamics.length; d++) {
        let dynamic = dynamics[d];
        output.buffer += statics[0];
        for (let i = 1; i < statics.length; i++) {
          let changeTracking = false;
          this.dynamicToBuffer(dynamic[i - 1], compTemplates, output, changeTracking);
          output.buffer += statics[i];
        }
      }
      if (stream !== void 0 && (rendered[DYNAMICS].length > 0 || deleteIds.length > 0 || reset)) {
        delete rendered[STREAM];
        rendered[DYNAMICS] = [];
        output.streams.add(stream);
      }
    }
    dynamicToBuffer(rendered, templates, output, changeTracking) {
      if (typeof rendered === "number") {
        let [str, streams] = this.recursiveCIDToString(output.components, rendered, output.onlyCids);
        output.buffer += str;
        output.streams = /* @__PURE__ */ new Set([...output.streams, ...streams]);
      } else if (isObject(rendered)) {
        this.toOutputBuffer(rendered, templates, output, changeTracking, {});
      } else {
        output.buffer += rendered;
      }
    }
    recursiveCIDToString(components, cid, onlyCids) {
      let component = components[cid] || logError(`no component for CID ${cid}`, components);
      let attrs = { [PHX_COMPONENT]: cid };
      let skip = onlyCids && !onlyCids.has(cid);
      component.newRender = !skip;
      component.magicId = `${this.parentViewId()}-c-${cid}`;
      let changeTracking = !component.reset;
      let [html, streams] = this.recursiveToString(component, components, onlyCids, changeTracking, attrs);
      delete component.reset;
      return [html, streams];
    }
  };
  var viewHookID = 1;
  var ViewHook = class {
    static makeID() {
      return viewHookID++;
    }
    static elementID(el) {
      return el.phxHookId;
    }
    constructor(view, el, callbacks) {
      this.__view = view;
      this.liveSocket = view.liveSocket;
      this.__callbacks = callbacks;
      this.__listeners = /* @__PURE__ */ new Set();
      this.__isDisconnected = false;
      this.el = el;
      this.el.phxHookId = this.constructor.makeID();
      for (let key in this.__callbacks) {
        this[key] = this.__callbacks[key];
      }
    }
    __mounted() {
      this.mounted && this.mounted();
    }
    __updated() {
      this.updated && this.updated();
    }
    __beforeUpdate() {
      this.beforeUpdate && this.beforeUpdate();
    }
    __destroyed() {
      this.destroyed && this.destroyed();
    }
    __reconnected() {
      if (this.__isDisconnected) {
        this.__isDisconnected = false;
        this.reconnected && this.reconnected();
      }
    }
    __disconnected() {
      this.__isDisconnected = true;
      this.disconnected && this.disconnected();
    }
    pushEvent(event, payload = {}, onReply = function() {
    }) {
      return this.__view.pushHookEvent(this.el, null, event, payload, onReply);
    }
    pushEventTo(phxTarget, event, payload = {}, onReply = function() {
    }) {
      return this.__view.withinTargets(phxTarget, (view, targetCtx) => {
        return view.pushHookEvent(this.el, targetCtx, event, payload, onReply);
      });
    }
    handleEvent(event, callback) {
      let callbackRef = (customEvent, bypass) => bypass ? event : callback(customEvent.detail);
      window.addEventListener(`phx:${event}`, callbackRef);
      this.__listeners.add(callbackRef);
      return callbackRef;
    }
    removeHandleEvent(callbackRef) {
      let event = callbackRef(null, true);
      window.removeEventListener(`phx:${event}`, callbackRef);
      this.__listeners.delete(callbackRef);
    }
    upload(name, files) {
      return this.__view.dispatchUploads(null, name, files);
    }
    uploadTo(phxTarget, name, files) {
      return this.__view.withinTargets(phxTarget, (view, targetCtx) => {
        view.dispatchUploads(targetCtx, name, files);
      });
    }
    __cleanup__() {
      this.__listeners.forEach((callbackRef) => this.removeHandleEvent(callbackRef));
    }
  };
  var serializeForm = (form, metadata, onlyNames = []) => {
    const _a = metadata, { submitter } = _a, meta = __objRest(_a, ["submitter"]);
    let injectedElement;
    if (submitter && submitter.name) {
      const input = document.createElement("input");
      input.type = "hidden";
      const formId = submitter.getAttribute("form");
      if (formId) {
        input.setAttribute("form", formId);
      }
      input.name = submitter.name;
      input.value = submitter.value;
      submitter.parentElement.insertBefore(input, submitter);
      injectedElement = input;
    }
    const formData = new FormData(form);
    const toRemove = [];
    formData.forEach((val, key, _index) => {
      if (val instanceof File) {
        toRemove.push(key);
      }
    });
    toRemove.forEach((key) => formData.delete(key));
    const params = new URLSearchParams();
    for (let [key, val] of formData.entries()) {
      if (onlyNames.length === 0 || onlyNames.indexOf(key) >= 0) {
        params.append(key, val);
      }
    }
    if (submitter && injectedElement) {
      submitter.parentElement.removeChild(injectedElement);
    }
    for (let metaKey in meta) {
      params.append(metaKey, meta[metaKey]);
    }
    return params.toString();
  };
  var View = class {
    constructor(el, liveSocket2, parentView, flash, liveReferer) {
      this.isDead = false;
      this.liveSocket = liveSocket2;
      this.flash = flash;
      this.parent = parentView;
      this.root = parentView ? parentView.root : this;
      this.el = el;
      this.id = this.el.id;
      this.ref = 0;
      this.childJoins = 0;
      this.loaderTimer = null;
      this.pendingDiffs = [];
      this.pruningCIDs = [];
      this.redirect = false;
      this.href = null;
      this.joinCount = this.parent ? this.parent.joinCount - 1 : 0;
      this.joinPending = true;
      this.destroyed = false;
      this.joinCallback = function(onDone) {
        onDone && onDone();
      };
      this.stopCallback = function() {
      };
      this.pendingJoinOps = this.parent ? null : [];
      this.viewHooks = {};
      this.uploaders = {};
      this.formSubmits = [];
      this.children = this.parent ? null : {};
      this.root.children[this.id] = {};
      this.channel = this.liveSocket.channel(`lv:${this.id}`, () => {
        let url = this.href && this.expandURL(this.href);
        return {
          redirect: this.redirect ? url : void 0,
          url: this.redirect ? void 0 : url || void 0,
          params: this.connectParams(liveReferer),
          session: this.getSession(),
          static: this.getStatic(),
          flash: this.flash
        };
      });
    }
    setHref(href) {
      this.href = href;
    }
    setRedirect(href) {
      this.redirect = true;
      this.href = href;
    }
    isMain() {
      return this.el.hasAttribute(PHX_MAIN);
    }
    connectParams(liveReferer) {
      let params = this.liveSocket.params(this.el);
      let manifest = dom_default.all(document, `[${this.binding(PHX_TRACK_STATIC)}]`).map((node) => node.src || node.href).filter((url) => typeof url === "string");
      if (manifest.length > 0) {
        params["_track_static"] = manifest;
      }
      params["_mounts"] = this.joinCount;
      params["_live_referer"] = liveReferer;
      return params;
    }
    isConnected() {
      return this.channel.canPush();
    }
    getSession() {
      return this.el.getAttribute(PHX_SESSION);
    }
    getStatic() {
      let val = this.el.getAttribute(PHX_STATIC);
      return val === "" ? null : val;
    }
    destroy(callback = function() {
    }) {
      this.destroyAllChildren();
      this.destroyed = true;
      delete this.root.children[this.id];
      if (this.parent) {
        delete this.root.children[this.parent.id][this.id];
      }
      clearTimeout(this.loaderTimer);
      let onFinished = () => {
        callback();
        for (let id in this.viewHooks) {
          this.destroyHook(this.viewHooks[id]);
        }
      };
      dom_default.markPhxChildDestroyed(this.el);
      this.log("destroyed", () => ["the child has been removed from the parent"]);
      this.channel.leave().receive("ok", onFinished).receive("error", onFinished).receive("timeout", onFinished);
    }
    setContainerClasses(...classes) {
      this.el.classList.remove(PHX_CONNECTED_CLASS, PHX_LOADING_CLASS, PHX_ERROR_CLASS, PHX_CLIENT_ERROR_CLASS, PHX_SERVER_ERROR_CLASS);
      this.el.classList.add(...classes);
    }
    showLoader(timeout) {
      clearTimeout(this.loaderTimer);
      if (timeout) {
        this.loaderTimer = setTimeout(() => this.showLoader(), timeout);
      } else {
        for (let id in this.viewHooks) {
          this.viewHooks[id].__disconnected();
        }
        this.setContainerClasses(PHX_LOADING_CLASS);
      }
    }
    execAll(binding) {
      dom_default.all(this.el, `[${binding}]`, (el) => this.liveSocket.execJS(el, el.getAttribute(binding)));
    }
    hideLoader() {
      clearTimeout(this.loaderTimer);
      this.setContainerClasses(PHX_CONNECTED_CLASS);
      this.execAll(this.binding("connected"));
    }
    triggerReconnected() {
      for (let id in this.viewHooks) {
        this.viewHooks[id].__reconnected();
      }
    }
    log(kind, msgCallback) {
      this.liveSocket.log(this, kind, msgCallback);
    }
    transition(time, onStart, onDone = function() {
    }) {
      this.liveSocket.transition(time, onStart, onDone);
    }
    withinTargets(phxTarget, callback) {
      if (phxTarget instanceof HTMLElement || phxTarget instanceof SVGElement) {
        return this.liveSocket.owner(phxTarget, (view) => callback(view, phxTarget));
      }
      if (isCid(phxTarget)) {
        let targets = dom_default.findComponentNodeList(this.el, phxTarget);
        if (targets.length === 0) {
          logError(`no component found matching phx-target of ${phxTarget}`);
        } else {
          callback(this, parseInt(phxTarget));
        }
      } else {
        let targets = Array.from(document.querySelectorAll(phxTarget));
        if (targets.length === 0) {
          logError(`nothing found matching the phx-target selector "${phxTarget}"`);
        }
        targets.forEach((target) => this.liveSocket.owner(target, (view) => callback(view, target)));
      }
    }
    applyDiff(type, rawDiff, callback) {
      this.log(type, () => ["", clone(rawDiff)]);
      let { diff, reply, events, title } = Rendered.extract(rawDiff);
      callback({ diff, reply, events });
      if (title) {
        window.requestAnimationFrame(() => dom_default.putTitle(title));
      }
    }
    onJoin(resp) {
      let { rendered, container } = resp;
      if (container) {
        let [tag, attrs] = container;
        this.el = dom_default.replaceRootContainer(this.el, tag, attrs);
      }
      this.childJoins = 0;
      this.joinPending = true;
      this.flash = null;
      browser_default.dropLocal(this.liveSocket.localStorage, window.location.pathname, CONSECUTIVE_RELOADS);
      this.applyDiff("mount", rendered, ({ diff, events }) => {
        this.rendered = new Rendered(this.id, diff);
        let [html, streams] = this.renderContainer(null, "join");
        this.dropPendingRefs();
        let forms = this.formsForRecovery(html);
        this.joinCount++;
        if (forms.length > 0) {
          forms.forEach(([form, newForm, newCid], i) => {
            this.pushFormRecovery(form, newCid, (resp2) => {
              if (i === forms.length - 1) {
                this.onJoinComplete(resp2, html, streams, events);
              }
            });
          });
        } else {
          this.onJoinComplete(resp, html, streams, events);
        }
      });
    }
    dropPendingRefs() {
      dom_default.all(document, `[${PHX_REF_SRC}="${this.id}"][${PHX_REF}]`, (el) => {
        el.removeAttribute(PHX_REF);
        el.removeAttribute(PHX_REF_SRC);
      });
    }
    onJoinComplete({ live_patch }, html, streams, events) {
      if (this.joinCount > 1 || this.parent && !this.parent.isJoinPending()) {
        return this.applyJoinPatch(live_patch, html, streams, events);
      }
      let newChildren = dom_default.findPhxChildrenInFragment(html, this.id).filter((toEl) => {
        let fromEl = toEl.id && this.el.querySelector(`[id="${toEl.id}"]`);
        let phxStatic = fromEl && fromEl.getAttribute(PHX_STATIC);
        if (phxStatic) {
          toEl.setAttribute(PHX_STATIC, phxStatic);
        }
        if (fromEl) {
          fromEl.setAttribute(PHX_ROOT_ID, this.root.id);
        }
        return this.joinChild(toEl);
      });
      if (newChildren.length === 0) {
        if (this.parent) {
          this.root.pendingJoinOps.push([this, () => this.applyJoinPatch(live_patch, html, streams, events)]);
          this.parent.ackJoin(this);
        } else {
          this.onAllChildJoinsComplete();
          this.applyJoinPatch(live_patch, html, streams, events);
        }
      } else {
        this.root.pendingJoinOps.push([this, () => this.applyJoinPatch(live_patch, html, streams, events)]);
      }
    }
    attachTrueDocEl() {
      this.el = dom_default.byId(this.id);
      this.el.setAttribute(PHX_ROOT_ID, this.root.id);
    }
    execNewMounted() {
      let phxViewportTop = this.binding(PHX_VIEWPORT_TOP);
      let phxViewportBottom = this.binding(PHX_VIEWPORT_BOTTOM);
      dom_default.all(this.el, `[${phxViewportTop}], [${phxViewportBottom}]`, (hookEl) => {
        dom_default.maybeAddPrivateHooks(hookEl, phxViewportTop, phxViewportBottom);
        this.maybeAddNewHook(hookEl);
      });
      dom_default.all(this.el, `[${this.binding(PHX_HOOK)}], [data-phx-${PHX_HOOK}]`, (hookEl) => {
        this.maybeAddNewHook(hookEl);
      });
      dom_default.all(this.el, `[${this.binding(PHX_MOUNTED)}]`, (el) => this.maybeMounted(el));
    }
    applyJoinPatch(live_patch, html, streams, events) {
      this.attachTrueDocEl();
      let patch = new DOMPatch(this, this.el, this.id, html, streams, null);
      patch.markPrunableContentForRemoval();
      this.performPatch(patch, false, true);
      this.joinNewChildren();
      this.execNewMounted();
      this.joinPending = false;
      this.liveSocket.dispatchEvents(events);
      this.applyPendingUpdates();
      if (live_patch) {
        let { kind, to } = live_patch;
        this.liveSocket.historyPatch(to, kind);
      }
      this.hideLoader();
      if (this.joinCount > 1) {
        this.triggerReconnected();
      }
      this.stopCallback();
    }
    triggerBeforeUpdateHook(fromEl, toEl) {
      this.liveSocket.triggerDOM("onBeforeElUpdated", [fromEl, toEl]);
      let hook = this.getHook(fromEl);
      let isIgnored = hook && dom_default.isIgnored(fromEl, this.binding(PHX_UPDATE));
      if (hook && !fromEl.isEqualNode(toEl) && !(isIgnored && isEqualObj(fromEl.dataset, toEl.dataset))) {
        hook.__beforeUpdate();
        return hook;
      }
    }
    maybeMounted(el) {
      let phxMounted = el.getAttribute(this.binding(PHX_MOUNTED));
      let hasBeenInvoked = phxMounted && dom_default.private(el, "mounted");
      if (phxMounted && !hasBeenInvoked) {
        this.liveSocket.execJS(el, phxMounted);
        dom_default.putPrivate(el, "mounted", true);
      }
    }
    maybeAddNewHook(el, force) {
      let newHook = this.addHook(el);
      if (newHook) {
        newHook.__mounted();
      }
    }
    performPatch(patch, pruneCids, isJoinPatch = false) {
      let removedEls = [];
      let phxChildrenAdded = false;
      let updatedHookIds = /* @__PURE__ */ new Set();
      patch.after("added", (el) => {
        this.liveSocket.triggerDOM("onNodeAdded", [el]);
        let phxViewportTop = this.binding(PHX_VIEWPORT_TOP);
        let phxViewportBottom = this.binding(PHX_VIEWPORT_BOTTOM);
        dom_default.maybeAddPrivateHooks(el, phxViewportTop, phxViewportBottom);
        this.maybeAddNewHook(el);
        if (el.getAttribute) {
          this.maybeMounted(el);
        }
      });
      patch.after("phxChildAdded", (el) => {
        if (dom_default.isPhxSticky(el)) {
          this.liveSocket.joinRootViews();
        } else {
          phxChildrenAdded = true;
        }
      });
      patch.before("updated", (fromEl, toEl) => {
        let hook = this.triggerBeforeUpdateHook(fromEl, toEl);
        if (hook) {
          updatedHookIds.add(fromEl.id);
        }
      });
      patch.after("updated", (el) => {
        if (updatedHookIds.has(el.id)) {
          this.getHook(el).__updated();
        }
      });
      patch.after("discarded", (el) => {
        if (el.nodeType === Node.ELEMENT_NODE) {
          removedEls.push(el);
        }
      });
      patch.after("transitionsDiscarded", (els) => this.afterElementsRemoved(els, pruneCids));
      patch.perform(isJoinPatch);
      this.afterElementsRemoved(removedEls, pruneCids);
      return phxChildrenAdded;
    }
    afterElementsRemoved(elements, pruneCids) {
      let destroyedCIDs = [];
      elements.forEach((parent) => {
        let components = dom_default.all(parent, `[${PHX_COMPONENT}]`);
        let hooks = dom_default.all(parent, `[${this.binding(PHX_HOOK)}]`);
        components.concat(parent).forEach((el) => {
          let cid = this.componentID(el);
          if (isCid(cid) && destroyedCIDs.indexOf(cid) === -1) {
            destroyedCIDs.push(cid);
          }
        });
        hooks.concat(parent).forEach((hookEl) => {
          let hook = this.getHook(hookEl);
          hook && this.destroyHook(hook);
        });
      });
      if (pruneCids) {
        this.maybePushComponentsDestroyed(destroyedCIDs);
      }
    }
    joinNewChildren() {
      dom_default.findPhxChildren(this.el, this.id).forEach((el) => this.joinChild(el));
    }
    getChildById(id) {
      return this.root.children[this.id][id];
    }
    getDescendentByEl(el) {
      if (el.id === this.id) {
        return this;
      } else {
        return this.children[el.getAttribute(PHX_PARENT_ID)][el.id];
      }
    }
    destroyDescendent(id) {
      for (let parentId in this.root.children) {
        for (let childId in this.root.children[parentId]) {
          if (childId === id) {
            return this.root.children[parentId][childId].destroy();
          }
        }
      }
    }
    joinChild(el) {
      let child = this.getChildById(el.id);
      if (!child) {
        let view = new View(el, this.liveSocket, this);
        this.root.children[this.id][view.id] = view;
        view.join();
        this.childJoins++;
        return true;
      }
    }
    isJoinPending() {
      return this.joinPending;
    }
    ackJoin(_child) {
      this.childJoins--;
      if (this.childJoins === 0) {
        if (this.parent) {
          this.parent.ackJoin(this);
        } else {
          this.onAllChildJoinsComplete();
        }
      }
    }
    onAllChildJoinsComplete() {
      this.joinCallback(() => {
        this.pendingJoinOps.forEach(([view, op]) => {
          if (!view.isDestroyed()) {
            op();
          }
        });
        this.pendingJoinOps = [];
      });
    }
    update(diff, events) {
      if (this.isJoinPending() || this.liveSocket.hasPendingLink() && this.root.isMain()) {
        return this.pendingDiffs.push({ diff, events });
      }
      this.rendered.mergeDiff(diff);
      let phxChildrenAdded = false;
      if (this.rendered.isComponentOnlyDiff(diff)) {
        this.liveSocket.time("component patch complete", () => {
          let parentCids = dom_default.findParentCIDs(this.el, this.rendered.componentCIDs(diff));
          parentCids.forEach((parentCID) => {
            if (this.componentPatch(this.rendered.getComponent(diff, parentCID), parentCID)) {
              phxChildrenAdded = true;
            }
          });
        });
      } else if (!isEmpty(diff)) {
        this.liveSocket.time("full patch complete", () => {
          let [html, streams] = this.renderContainer(diff, "update");
          let patch = new DOMPatch(this, this.el, this.id, html, streams, null);
          phxChildrenAdded = this.performPatch(patch, true);
        });
      }
      this.liveSocket.dispatchEvents(events);
      if (phxChildrenAdded) {
        this.joinNewChildren();
      }
    }
    renderContainer(diff, kind) {
      return this.liveSocket.time(`toString diff (${kind})`, () => {
        let tag = this.el.tagName;
        let cids = diff ? this.rendered.componentCIDs(diff).concat(this.pruningCIDs) : null;
        let [html, streams] = this.rendered.toString(cids);
        return [`<${tag}>${html}</${tag}>`, streams];
      });
    }
    componentPatch(diff, cid) {
      if (isEmpty(diff))
        return false;
      let [html, streams] = this.rendered.componentToString(cid);
      let patch = new DOMPatch(this, this.el, this.id, html, streams, cid);
      let childrenAdded = this.performPatch(patch, true);
      return childrenAdded;
    }
    getHook(el) {
      return this.viewHooks[ViewHook.elementID(el)];
    }
    addHook(el) {
      if (ViewHook.elementID(el) || !el.getAttribute) {
        return;
      }
      let hookName = el.getAttribute(`data-phx-${PHX_HOOK}`) || el.getAttribute(this.binding(PHX_HOOK));
      if (hookName && !this.ownsElement(el)) {
        return;
      }
      let callbacks = this.liveSocket.getHookCallbacks(hookName);
      if (callbacks) {
        if (!el.id) {
          logError(`no DOM ID for hook "${hookName}". Hooks require a unique ID on each element.`, el);
        }
        let hook = new ViewHook(this, el, callbacks);
        this.viewHooks[ViewHook.elementID(hook.el)] = hook;
        return hook;
      } else if (hookName !== null) {
        logError(`unknown hook found for "${hookName}"`, el);
      }
    }
    destroyHook(hook) {
      hook.__destroyed();
      hook.__cleanup__();
      delete this.viewHooks[ViewHook.elementID(hook.el)];
    }
    applyPendingUpdates() {
      this.pendingDiffs.forEach(({ diff, events }) => this.update(diff, events));
      this.pendingDiffs = [];
      this.eachChild((child) => child.applyPendingUpdates());
    }
    eachChild(callback) {
      let children = this.root.children[this.id] || {};
      for (let id in children) {
        callback(this.getChildById(id));
      }
    }
    onChannel(event, cb) {
      this.liveSocket.onChannel(this.channel, event, (resp) => {
        if (this.isJoinPending()) {
          this.root.pendingJoinOps.push([this, () => cb(resp)]);
        } else {
          this.liveSocket.requestDOMUpdate(() => cb(resp));
        }
      });
    }
    bindChannel() {
      this.liveSocket.onChannel(this.channel, "diff", (rawDiff) => {
        this.liveSocket.requestDOMUpdate(() => {
          this.applyDiff("update", rawDiff, ({ diff, events }) => this.update(diff, events));
        });
      });
      this.onChannel("redirect", ({ to, flash }) => this.onRedirect({ to, flash }));
      this.onChannel("live_patch", (redir) => this.onLivePatch(redir));
      this.onChannel("live_redirect", (redir) => this.onLiveRedirect(redir));
      this.channel.onError((reason) => this.onError(reason));
      this.channel.onClose((reason) => this.onClose(reason));
    }
    destroyAllChildren() {
      this.eachChild((child) => child.destroy());
    }
    onLiveRedirect(redir) {
      let { to, kind, flash } = redir;
      let url = this.expandURL(to);
      this.liveSocket.historyRedirect(url, kind, flash);
    }
    onLivePatch(redir) {
      let { to, kind } = redir;
      this.href = this.expandURL(to);
      this.liveSocket.historyPatch(to, kind);
    }
    expandURL(to) {
      return to.startsWith("/") ? `${window.location.protocol}//${window.location.host}${to}` : to;
    }
    onRedirect({ to, flash }) {
      this.liveSocket.redirect(to, flash);
    }
    isDestroyed() {
      return this.destroyed;
    }
    joinDead() {
      this.isDead = true;
    }
    join(callback) {
      this.showLoader(this.liveSocket.loaderTimeout);
      this.bindChannel();
      if (this.isMain()) {
        this.stopCallback = this.liveSocket.withPageLoading({ to: this.href, kind: "initial" });
      }
      this.joinCallback = (onDone) => {
        onDone = onDone || function() {
        };
        callback ? callback(this.joinCount, onDone) : onDone();
      };
      this.liveSocket.wrapPush(this, { timeout: false }, () => {
        return this.channel.join().receive("ok", (data) => {
          if (!this.isDestroyed()) {
            this.liveSocket.requestDOMUpdate(() => this.onJoin(data));
          }
        }).receive("error", (resp) => !this.isDestroyed() && this.onJoinError(resp)).receive("timeout", () => !this.isDestroyed() && this.onJoinError({ reason: "timeout" }));
      });
    }
    onJoinError(resp) {
      if (resp.reason === "reload") {
        this.log("error", () => [`failed mount with ${resp.status}. Falling back to page request`, resp]);
        if (this.isMain()) {
          this.onRedirect({ to: this.href });
        }
        return;
      } else if (resp.reason === "unauthorized" || resp.reason === "stale") {
        this.log("error", () => ["unauthorized live_redirect. Falling back to page request", resp]);
        if (this.isMain()) {
          this.onRedirect({ to: this.href });
        }
        return;
      }
      if (resp.redirect || resp.live_redirect) {
        this.joinPending = false;
        this.channel.leave();
      }
      if (resp.redirect) {
        return this.onRedirect(resp.redirect);
      }
      if (resp.live_redirect) {
        return this.onLiveRedirect(resp.live_redirect);
      }
      this.displayError([PHX_LOADING_CLASS, PHX_ERROR_CLASS, PHX_SERVER_ERROR_CLASS]);
      this.log("error", () => ["unable to join", resp]);
      if (this.liveSocket.isConnected()) {
        this.liveSocket.reloadWithJitter(this);
      }
    }
    onClose(reason) {
      if (this.isDestroyed()) {
        return;
      }
      if (this.liveSocket.hasPendingLink() && reason !== "leave") {
        return this.liveSocket.reloadWithJitter(this);
      }
      this.destroyAllChildren();
      this.liveSocket.dropActiveElement(this);
      if (document.activeElement) {
        document.activeElement.blur();
      }
      if (this.liveSocket.isUnloaded()) {
        this.showLoader(BEFORE_UNLOAD_LOADER_TIMEOUT);
      }
    }
    onError(reason) {
      this.onClose(reason);
      if (this.liveSocket.isConnected()) {
        this.log("error", () => ["view crashed", reason]);
      }
      if (!this.liveSocket.isUnloaded()) {
        if (this.liveSocket.isConnected()) {
          this.displayError([PHX_LOADING_CLASS, PHX_ERROR_CLASS, PHX_SERVER_ERROR_CLASS]);
        } else {
          this.displayError([PHX_LOADING_CLASS, PHX_ERROR_CLASS, PHX_CLIENT_ERROR_CLASS]);
        }
      }
    }
    displayError(classes) {
      if (this.isMain()) {
        dom_default.dispatchEvent(window, "phx:page-loading-start", { detail: { to: this.href, kind: "error" } });
      }
      this.showLoader();
      this.setContainerClasses(...classes);
      this.execAll(this.binding("disconnected"));
    }
    pushWithReply(refGenerator, event, payload, onReply = function() {
    }) {
      if (!this.isConnected()) {
        return;
      }
      let [ref, [el], opts] = refGenerator ? refGenerator() : [null, [], {}];
      let onLoadingDone = function() {
      };
      if (opts.page_loading || el && el.getAttribute(this.binding(PHX_PAGE_LOADING)) !== null) {
        onLoadingDone = this.liveSocket.withPageLoading({ kind: "element", target: el });
      }
      if (typeof payload.cid !== "number") {
        delete payload.cid;
      }
      return this.liveSocket.wrapPush(this, { timeout: true }, () => {
        return this.channel.push(event, payload, PUSH_TIMEOUT).receive("ok", (resp) => {
          let finish = (hookReply) => {
            if (resp.redirect) {
              this.onRedirect(resp.redirect);
            }
            if (resp.live_patch) {
              this.onLivePatch(resp.live_patch);
            }
            if (resp.live_redirect) {
              this.onLiveRedirect(resp.live_redirect);
            }
            onLoadingDone();
            onReply(resp, hookReply);
          };
          if (resp.diff) {
            this.liveSocket.requestDOMUpdate(() => {
              this.applyDiff("update", resp.diff, ({ diff, reply, events }) => {
                if (ref !== null) {
                  this.undoRefs(ref);
                }
                this.update(diff, events);
                finish(reply);
              });
            });
          } else {
            if (ref !== null) {
              this.undoRefs(ref);
            }
            finish(null);
          }
        });
      });
    }
    undoRefs(ref) {
      if (!this.isConnected()) {
        return;
      }
      dom_default.all(document, `[${PHX_REF_SRC}="${this.id}"][${PHX_REF}="${ref}"]`, (el) => {
        let disabledVal = el.getAttribute(PHX_DISABLED);
        let readOnlyVal = el.getAttribute(PHX_READONLY);
        el.removeAttribute(PHX_REF);
        el.removeAttribute(PHX_REF_SRC);
        if (readOnlyVal !== null) {
          el.readOnly = readOnlyVal === "true" ? true : false;
          el.removeAttribute(PHX_READONLY);
        }
        if (disabledVal !== null) {
          el.disabled = disabledVal === "true" ? true : false;
          el.removeAttribute(PHX_DISABLED);
        }
        PHX_EVENT_CLASSES.forEach((className) => dom_default.removeClass(el, className));
        let disableRestore = el.getAttribute(PHX_DISABLE_WITH_RESTORE);
        if (disableRestore !== null) {
          el.innerText = disableRestore;
          el.removeAttribute(PHX_DISABLE_WITH_RESTORE);
        }
        let toEl = dom_default.private(el, PHX_REF);
        if (toEl) {
          let hook = this.triggerBeforeUpdateHook(el, toEl);
          DOMPatch.patchEl(el, toEl, this.liveSocket.getActiveElement());
          if (hook) {
            hook.__updated();
          }
          dom_default.deletePrivate(el, PHX_REF);
        }
      });
    }
    putRef(elements, event, opts = {}) {
      let newRef = this.ref++;
      let disableWith = this.binding(PHX_DISABLE_WITH);
      if (opts.loading) {
        elements = elements.concat(dom_default.all(document, opts.loading));
      }
      elements.forEach((el) => {
        el.classList.add(`phx-${event}-loading`);
        el.setAttribute(PHX_REF, newRef);
        el.setAttribute(PHX_REF_SRC, this.el.id);
        let disableText = el.getAttribute(disableWith);
        if (disableText !== null) {
          if (!el.getAttribute(PHX_DISABLE_WITH_RESTORE)) {
            el.setAttribute(PHX_DISABLE_WITH_RESTORE, el.innerText);
          }
          if (disableText !== "") {
            el.innerText = disableText;
          }
          el.setAttribute(PHX_DISABLED, el.getAttribute(PHX_DISABLED) || el.disabled);
          el.setAttribute("disabled", "");
        }
      });
      return [newRef, elements, opts];
    }
    componentID(el) {
      let cid = el.getAttribute && el.getAttribute(PHX_COMPONENT);
      return cid ? parseInt(cid) : null;
    }
    targetComponentID(target, targetCtx, opts = {}) {
      if (isCid(targetCtx)) {
        return targetCtx;
      }
      let cidOrSelector = opts.target || target.getAttribute(this.binding("target"));
      if (isCid(cidOrSelector)) {
        return parseInt(cidOrSelector);
      } else if (targetCtx && (cidOrSelector !== null || opts.target)) {
        return this.closestComponentID(targetCtx);
      } else {
        return null;
      }
    }
    closestComponentID(targetCtx) {
      if (isCid(targetCtx)) {
        return targetCtx;
      } else if (targetCtx) {
        return maybe(targetCtx.closest(`[${PHX_COMPONENT}]`), (el) => this.ownsElement(el) && this.componentID(el));
      } else {
        return null;
      }
    }
    pushHookEvent(el, targetCtx, event, payload, onReply) {
      if (!this.isConnected()) {
        this.log("hook", () => ["unable to push hook event. LiveView not connected", event, payload]);
        return false;
      }
      let [ref, els, opts] = this.putRef([el], "hook");
      this.pushWithReply(() => [ref, els, opts], "event", {
        type: "hook",
        event,
        value: payload,
        cid: this.closestComponentID(targetCtx)
      }, (resp, reply) => onReply(reply, ref));
      return ref;
    }
    extractMeta(el, meta, value) {
      let prefix = this.binding("value-");
      for (let i = 0; i < el.attributes.length; i++) {
        if (!meta) {
          meta = {};
        }
        let name = el.attributes[i].name;
        if (name.startsWith(prefix)) {
          meta[name.replace(prefix, "")] = el.getAttribute(name);
        }
      }
      if (el.value !== void 0 && !(el instanceof HTMLFormElement)) {
        if (!meta) {
          meta = {};
        }
        meta.value = el.value;
        if (el.tagName === "INPUT" && CHECKABLE_INPUTS.indexOf(el.type) >= 0 && !el.checked) {
          delete meta.value;
        }
      }
      if (value) {
        if (!meta) {
          meta = {};
        }
        for (let key in value) {
          meta[key] = value[key];
        }
      }
      return meta;
    }
    pushEvent(type, el, targetCtx, phxEvent, meta, opts = {}, onReply) {
      this.pushWithReply(() => this.putRef([el], type, opts), "event", {
        type,
        event: phxEvent,
        value: this.extractMeta(el, meta, opts.value),
        cid: this.targetComponentID(el, targetCtx, opts)
      }, (resp, reply) => onReply && onReply(reply));
    }
    pushFileProgress(fileEl, entryRef, progress, onReply = function() {
    }) {
      this.liveSocket.withinOwners(fileEl.form, (view, targetCtx) => {
        view.pushWithReply(null, "progress", {
          event: fileEl.getAttribute(view.binding(PHX_PROGRESS)),
          ref: fileEl.getAttribute(PHX_UPLOAD_REF),
          entry_ref: entryRef,
          progress,
          cid: view.targetComponentID(fileEl.form, targetCtx)
        }, onReply);
      });
    }
    pushInput(inputEl, targetCtx, forceCid, phxEvent, opts, callback) {
      let uploads;
      let cid = isCid(forceCid) ? forceCid : this.targetComponentID(inputEl.form, targetCtx, opts);
      let refGenerator = () => this.putRef([inputEl, inputEl.form], "change", opts);
      let formData;
      let meta = this.extractMeta(inputEl.form);
      if (inputEl instanceof HTMLButtonElement) {
        meta.submitter = inputEl;
      }
      if (inputEl.getAttribute(this.binding("change"))) {
        formData = serializeForm(inputEl.form, __spreadValues({ _target: opts._target }, meta), [inputEl.name]);
      } else {
        formData = serializeForm(inputEl.form, __spreadValues({ _target: opts._target }, meta));
      }
      if (dom_default.isUploadInput(inputEl) && inputEl.files && inputEl.files.length > 0) {
        LiveUploader.trackFiles(inputEl, Array.from(inputEl.files));
      }
      uploads = LiveUploader.serializeUploads(inputEl);
      let event = {
        type: "form",
        event: phxEvent,
        value: formData,
        uploads,
        cid
      };
      this.pushWithReply(refGenerator, "event", event, (resp) => {
        dom_default.showError(inputEl, this.liveSocket.binding(PHX_FEEDBACK_FOR), this.liveSocket.binding(PHX_FEEDBACK_GROUP));
        if (dom_default.isUploadInput(inputEl) && dom_default.isAutoUpload(inputEl)) {
          if (LiveUploader.filesAwaitingPreflight(inputEl).length > 0) {
            let [ref, _els] = refGenerator();
            this.uploadFiles(inputEl.form, targetCtx, ref, cid, (_uploads) => {
              callback && callback(resp);
              this.triggerAwaitingSubmit(inputEl.form);
              this.undoRefs(ref);
            });
          }
        } else {
          callback && callback(resp);
        }
      });
    }
    triggerAwaitingSubmit(formEl) {
      let awaitingSubmit = this.getScheduledSubmit(formEl);
      if (awaitingSubmit) {
        let [_el, _ref, _opts, callback] = awaitingSubmit;
        this.cancelSubmit(formEl);
        callback();
      }
    }
    getScheduledSubmit(formEl) {
      return this.formSubmits.find(([el, _ref, _opts, _callback]) => el.isSameNode(formEl));
    }
    scheduleSubmit(formEl, ref, opts, callback) {
      if (this.getScheduledSubmit(formEl)) {
        return true;
      }
      this.formSubmits.push([formEl, ref, opts, callback]);
    }
    cancelSubmit(formEl) {
      this.formSubmits = this.formSubmits.filter(([el, ref, _callback]) => {
        if (el.isSameNode(formEl)) {
          this.undoRefs(ref);
          return false;
        } else {
          return true;
        }
      });
    }
    disableForm(formEl, opts = {}) {
      let filterIgnored = (el) => {
        let userIgnored = closestPhxBinding(el, `${this.binding(PHX_UPDATE)}=ignore`, el.form);
        return !(userIgnored || closestPhxBinding(el, "data-phx-update=ignore", el.form));
      };
      let filterDisables = (el) => {
        return el.hasAttribute(this.binding(PHX_DISABLE_WITH));
      };
      let filterButton = (el) => el.tagName == "BUTTON";
      let filterInput = (el) => ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName);
      let formElements = Array.from(formEl.elements);
      let disables = formElements.filter(filterDisables);
      let buttons = formElements.filter(filterButton).filter(filterIgnored);
      let inputs = formElements.filter(filterInput).filter(filterIgnored);
      buttons.forEach((button) => {
        button.setAttribute(PHX_DISABLED, button.disabled);
        button.disabled = true;
      });
      inputs.forEach((input) => {
        input.setAttribute(PHX_READONLY, input.readOnly);
        input.readOnly = true;
        if (input.files) {
          input.setAttribute(PHX_DISABLED, input.disabled);
          input.disabled = true;
        }
      });
      formEl.setAttribute(this.binding(PHX_PAGE_LOADING), "");
      return this.putRef([formEl].concat(disables).concat(buttons).concat(inputs), "submit", opts);
    }
    pushFormSubmit(formEl, targetCtx, phxEvent, submitter, opts, onReply) {
      let refGenerator = () => this.disableForm(formEl, opts);
      let cid = this.targetComponentID(formEl, targetCtx);
      if (LiveUploader.hasUploadsInProgress(formEl)) {
        let [ref, _els] = refGenerator();
        let push = () => this.pushFormSubmit(formEl, targetCtx, phxEvent, submitter, opts, onReply);
        return this.scheduleSubmit(formEl, ref, opts, push);
      } else if (LiveUploader.inputsAwaitingPreflight(formEl).length > 0) {
        let [ref, els] = refGenerator();
        let proxyRefGen = () => [ref, els, opts];
        this.uploadFiles(formEl, targetCtx, ref, cid, (_uploads) => {
          let meta = this.extractMeta(formEl);
          let formData = serializeForm(formEl, __spreadValues({ submitter }, meta));
          this.pushWithReply(proxyRefGen, "event", {
            type: "form",
            event: phxEvent,
            value: formData,
            cid
          }, onReply);
        });
      } else if (!(formEl.hasAttribute(PHX_REF) && formEl.classList.contains("phx-submit-loading"))) {
        let meta = this.extractMeta(formEl);
        let formData = serializeForm(formEl, __spreadValues({ submitter }, meta));
        this.pushWithReply(refGenerator, "event", {
          type: "form",
          event: phxEvent,
          value: formData,
          cid
        }, onReply);
      }
    }
    uploadFiles(formEl, targetCtx, ref, cid, onComplete) {
      let joinCountAtUpload = this.joinCount;
      let inputEls = LiveUploader.activeFileInputs(formEl);
      let numFileInputsInProgress = inputEls.length;
      inputEls.forEach((inputEl) => {
        let uploader = new LiveUploader(inputEl, this, () => {
          numFileInputsInProgress--;
          if (numFileInputsInProgress === 0) {
            onComplete();
          }
        });
        this.uploaders[inputEl] = uploader;
        let entries = uploader.entries().map((entry) => entry.toPreflightPayload());
        let payload = {
          ref: inputEl.getAttribute(PHX_UPLOAD_REF),
          entries,
          cid: this.targetComponentID(inputEl.form, targetCtx)
        };
        this.log("upload", () => ["sending preflight request", payload]);
        this.pushWithReply(null, "allow_upload", payload, (resp) => {
          this.log("upload", () => ["got preflight response", resp]);
          if (resp.error) {
            this.undoRefs(ref);
            let [entry_ref, reason] = resp.error;
            this.log("upload", () => [`error for entry ${entry_ref}`, reason]);
          } else {
            let onError = (callback) => {
              this.channel.onError(() => {
                if (this.joinCount === joinCountAtUpload) {
                  callback();
                }
              });
            };
            uploader.initAdapterUpload(resp, onError, this.liveSocket);
          }
        });
      });
    }
    dispatchUploads(targetCtx, name, filesOrBlobs) {
      let targetElement = this.targetCtxElement(targetCtx) || this.el;
      let inputs = dom_default.findUploadInputs(targetElement).filter((el) => el.name === name);
      if (inputs.length === 0) {
        logError(`no live file inputs found matching the name "${name}"`);
      } else if (inputs.length > 1) {
        logError(`duplicate live file inputs found matching the name "${name}"`);
      } else {
        dom_default.dispatchEvent(inputs[0], PHX_TRACK_UPLOADS, { detail: { files: filesOrBlobs } });
      }
    }
    targetCtxElement(targetCtx) {
      if (isCid(targetCtx)) {
        let [target] = dom_default.findComponentNodeList(this.el, targetCtx);
        return target;
      } else if (targetCtx) {
        return targetCtx;
      } else {
        return null;
      }
    }
    pushFormRecovery(form, newCid, callback) {
      this.liveSocket.withinOwners(form, (view, targetCtx) => {
        let phxChange = this.binding("change");
        let inputs = Array.from(form.elements).filter((el) => dom_default.isFormInput(el) && el.name && !el.hasAttribute(phxChange));
        if (inputs.length === 0) {
          return;
        }
        inputs.forEach((input2) => input2.hasAttribute(PHX_UPLOAD_REF) && LiveUploader.clearFiles(input2));
        let input = inputs.find((el) => el.type !== "hidden") || inputs[0];
        let phxEvent = form.getAttribute(this.binding(PHX_AUTO_RECOVER)) || form.getAttribute(this.binding("change"));
        js_default.exec("change", phxEvent, view, input, ["push", { _target: input.name, newCid, callback }]);
      });
    }
    pushLinkPatch(href, targetEl, callback) {
      let linkRef = this.liveSocket.setPendingLink(href);
      let refGen = targetEl ? () => this.putRef([targetEl], "click") : null;
      let fallback = () => this.liveSocket.redirect(window.location.href);
      let url = href.startsWith("/") ? `${location.protocol}//${location.host}${href}` : href;
      let push = this.pushWithReply(refGen, "live_patch", { url }, (resp) => {
        this.liveSocket.requestDOMUpdate(() => {
          if (resp.link_redirect) {
            this.liveSocket.replaceMain(href, null, callback, linkRef);
          } else {
            if (this.liveSocket.commitPendingLink(linkRef)) {
              this.href = href;
            }
            this.applyPendingUpdates();
            callback && callback(linkRef);
          }
        });
      });
      if (push) {
        push.receive("timeout", fallback);
      } else {
        fallback();
      }
    }
    formsForRecovery(html) {
      if (this.joinCount === 0) {
        return [];
      }
      let phxChange = this.binding("change");
      let template = document.createElement("template");
      template.innerHTML = html;
      return dom_default.all(this.el, `form[${phxChange}]`).filter((form) => form.id && this.ownsElement(form)).filter((form) => form.elements.length > 0).filter((form) => form.getAttribute(this.binding(PHX_AUTO_RECOVER)) !== "ignore").map((form) => {
        const phxChangeValue = CSS.escape(form.getAttribute(phxChange));
        let newForm = template.content.querySelector(`form[id="${form.id}"][${phxChange}="${phxChangeValue}"]`);
        if (newForm) {
          return [form, newForm, this.targetComponentID(newForm)];
        } else {
          return [form, form, this.targetComponentID(form)];
        }
      }).filter(([form, newForm, newCid]) => newForm);
    }
    maybePushComponentsDestroyed(destroyedCIDs) {
      let willDestroyCIDs = destroyedCIDs.concat(this.pruningCIDs).filter((cid) => {
        return dom_default.findComponentNodeList(this.el, cid).length === 0;
      });
      this.pruningCIDs = willDestroyCIDs.concat([]);
      if (willDestroyCIDs.length > 0) {
        willDestroyCIDs.forEach((cid) => this.rendered.resetRender(cid));
        this.pushWithReply(null, "cids_will_destroy", { cids: willDestroyCIDs }, () => {
          let completelyDestroyCIDs = willDestroyCIDs.filter((cid) => {
            return dom_default.findComponentNodeList(this.el, cid).length === 0;
          });
          if (completelyDestroyCIDs.length > 0) {
            this.pushWithReply(null, "cids_destroyed", { cids: completelyDestroyCIDs }, (resp) => {
              this.pruningCIDs = this.pruningCIDs.filter((cid) => resp.cids.indexOf(cid) === -1);
              this.rendered.pruneCIDs(resp.cids);
            });
          }
        });
      }
    }
    ownsElement(el) {
      let parentViewEl = el.closest(PHX_VIEW_SELECTOR);
      return el.getAttribute(PHX_PARENT_ID) === this.id || parentViewEl && parentViewEl.id === this.id || !parentViewEl && this.isDead;
    }
    submitForm(form, targetCtx, phxEvent, submitter, opts = {}) {
      dom_default.putPrivate(form, PHX_HAS_SUBMITTED, true);
      const phxFeedbackFor = this.liveSocket.binding(PHX_FEEDBACK_FOR);
      const phxFeedbackGroup = this.liveSocket.binding(PHX_FEEDBACK_GROUP);
      const inputs = Array.from(form.elements);
      inputs.forEach((input) => dom_default.putPrivate(input, PHX_HAS_SUBMITTED, true));
      this.liveSocket.blurActiveElement(this);
      this.pushFormSubmit(form, targetCtx, phxEvent, submitter, opts, () => {
        inputs.forEach((input) => dom_default.showError(input, phxFeedbackFor, phxFeedbackGroup));
        this.liveSocket.restorePreviouslyActiveFocus();
      });
    }
    binding(kind) {
      return this.liveSocket.binding(kind);
    }
  };
  var LiveSocket = class {
    constructor(url, phxSocket, opts = {}) {
      this.unloaded = false;
      if (!phxSocket || phxSocket.constructor.name === "Object") {
        throw new Error(`
      a phoenix Socket must be provided as the second argument to the LiveSocket constructor. For example:

          import {Socket} from "phoenix"
          import {LiveSocket} from "phoenix_live_view"
          let liveSocket = new LiveSocket("/live", Socket, {...})
      `);
      }
      this.socket = new phxSocket(url, opts);
      this.bindingPrefix = opts.bindingPrefix || BINDING_PREFIX;
      this.opts = opts;
      this.params = closure2(opts.params || {});
      this.viewLogger = opts.viewLogger;
      this.metadataCallbacks = opts.metadata || {};
      this.defaults = Object.assign(clone(DEFAULTS), opts.defaults || {});
      this.activeElement = null;
      this.prevActive = null;
      this.silenced = false;
      this.main = null;
      this.outgoingMainEl = null;
      this.clickStartedAtTarget = null;
      this.linkRef = 1;
      this.roots = {};
      this.href = window.location.href;
      this.pendingLink = null;
      this.currentLocation = clone(window.location);
      this.hooks = opts.hooks || {};
      this.uploaders = opts.uploaders || {};
      this.loaderTimeout = opts.loaderTimeout || LOADER_TIMEOUT;
      this.reloadWithJitterTimer = null;
      this.maxReloads = opts.maxReloads || MAX_RELOADS;
      this.reloadJitterMin = opts.reloadJitterMin || RELOAD_JITTER_MIN;
      this.reloadJitterMax = opts.reloadJitterMax || RELOAD_JITTER_MAX;
      this.failsafeJitter = opts.failsafeJitter || FAILSAFE_JITTER;
      this.localStorage = opts.localStorage || window.localStorage;
      this.sessionStorage = opts.sessionStorage || window.sessionStorage;
      this.boundTopLevelEvents = false;
      this.domCallbacks = Object.assign({ onNodeAdded: closure2(), onBeforeElUpdated: closure2() }, opts.dom || {});
      this.transitions = new TransitionSet();
      window.addEventListener("pagehide", (_e) => {
        this.unloaded = true;
      });
      this.socket.onOpen(() => {
        if (this.isUnloaded()) {
          window.location.reload();
        }
      });
    }
    isProfileEnabled() {
      return this.sessionStorage.getItem(PHX_LV_PROFILE) === "true";
    }
    isDebugEnabled() {
      return this.sessionStorage.getItem(PHX_LV_DEBUG) === "true";
    }
    isDebugDisabled() {
      return this.sessionStorage.getItem(PHX_LV_DEBUG) === "false";
    }
    enableDebug() {
      this.sessionStorage.setItem(PHX_LV_DEBUG, "true");
    }
    enableProfiling() {
      this.sessionStorage.setItem(PHX_LV_PROFILE, "true");
    }
    disableDebug() {
      this.sessionStorage.setItem(PHX_LV_DEBUG, "false");
    }
    disableProfiling() {
      this.sessionStorage.removeItem(PHX_LV_PROFILE);
    }
    enableLatencySim(upperBoundMs) {
      this.enableDebug();
      console.log("latency simulator enabled for the duration of this browser session. Call disableLatencySim() to disable");
      this.sessionStorage.setItem(PHX_LV_LATENCY_SIM, upperBoundMs);
    }
    disableLatencySim() {
      this.sessionStorage.removeItem(PHX_LV_LATENCY_SIM);
    }
    getLatencySim() {
      let str = this.sessionStorage.getItem(PHX_LV_LATENCY_SIM);
      return str ? parseInt(str) : null;
    }
    getSocket() {
      return this.socket;
    }
    connect() {
      if (window.location.hostname === "localhost" && !this.isDebugDisabled()) {
        this.enableDebug();
      }
      let doConnect = () => {
        if (this.joinRootViews()) {
          this.bindTopLevelEvents();
          this.socket.connect();
        } else if (this.main) {
          this.socket.connect();
        } else {
          this.bindTopLevelEvents({ dead: true });
        }
        this.joinDeadView();
      };
      if (["complete", "loaded", "interactive"].indexOf(document.readyState) >= 0) {
        doConnect();
      } else {
        document.addEventListener("DOMContentLoaded", () => doConnect());
      }
    }
    disconnect(callback) {
      clearTimeout(this.reloadWithJitterTimer);
      this.socket.disconnect(callback);
    }
    replaceTransport(transport) {
      clearTimeout(this.reloadWithJitterTimer);
      this.socket.replaceTransport(transport);
      this.connect();
    }
    execJS(el, encodedJS, eventType = null) {
      this.owner(el, (view) => js_default.exec(eventType, encodedJS, view, el));
    }
    execJSHookPush(el, phxEvent, data, callback) {
      this.withinOwners(el, (view) => {
        js_default.exec("hook", phxEvent, view, el, ["push", { data, callback }]);
      });
    }
    unload() {
      if (this.unloaded) {
        return;
      }
      if (this.main && this.isConnected()) {
        this.log(this.main, "socket", () => ["disconnect for page nav"]);
      }
      this.unloaded = true;
      this.destroyAllViews();
      this.disconnect();
    }
    triggerDOM(kind, args) {
      this.domCallbacks[kind](...args);
    }
    time(name, func) {
      if (!this.isProfileEnabled() || !console.time) {
        return func();
      }
      console.time(name);
      let result = func();
      console.timeEnd(name);
      return result;
    }
    log(view, kind, msgCallback) {
      if (this.viewLogger) {
        let [msg, obj] = msgCallback();
        this.viewLogger(view, kind, msg, obj);
      } else if (this.isDebugEnabled()) {
        let [msg, obj] = msgCallback();
        debug(view, kind, msg, obj);
      }
    }
    requestDOMUpdate(callback) {
      this.transitions.after(callback);
    }
    transition(time, onStart, onDone = function() {
    }) {
      this.transitions.addTransition(time, onStart, onDone);
    }
    onChannel(channel, event, cb) {
      channel.on(event, (data) => {
        let latency = this.getLatencySim();
        if (!latency) {
          cb(data);
        } else {
          setTimeout(() => cb(data), latency);
        }
      });
    }
    wrapPush(view, opts, push) {
      let latency = this.getLatencySim();
      let oldJoinCount = view.joinCount;
      if (!latency) {
        if (this.isConnected() && opts.timeout) {
          return push().receive("timeout", () => {
            if (view.joinCount === oldJoinCount && !view.isDestroyed()) {
              this.reloadWithJitter(view, () => {
                this.log(view, "timeout", () => ["received timeout while communicating with server. Falling back to hard refresh for recovery"]);
              });
            }
          });
        } else {
          return push();
        }
      }
      let fakePush = {
        receives: [],
        receive(kind, cb) {
          this.receives.push([kind, cb]);
        }
      };
      setTimeout(() => {
        if (view.isDestroyed()) {
          return;
        }
        fakePush.receives.reduce((acc, [kind, cb]) => acc.receive(kind, cb), push());
      }, latency);
      return fakePush;
    }
    reloadWithJitter(view, log) {
      clearTimeout(this.reloadWithJitterTimer);
      this.disconnect();
      let minMs = this.reloadJitterMin;
      let maxMs = this.reloadJitterMax;
      let afterMs = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
      let tries = browser_default.updateLocal(this.localStorage, window.location.pathname, CONSECUTIVE_RELOADS, 0, (count) => count + 1);
      if (tries > this.maxReloads) {
        afterMs = this.failsafeJitter;
      }
      this.reloadWithJitterTimer = setTimeout(() => {
        if (view.isDestroyed() || view.isConnected()) {
          return;
        }
        view.destroy();
        log ? log() : this.log(view, "join", () => [`encountered ${tries} consecutive reloads`]);
        if (tries > this.maxReloads) {
          this.log(view, "join", () => [`exceeded ${this.maxReloads} consecutive reloads. Entering failsafe mode`]);
        }
        if (this.hasPendingLink()) {
          window.location = this.pendingLink;
        } else {
          window.location.reload();
        }
      }, afterMs);
    }
    getHookCallbacks(name) {
      return name && name.startsWith("Phoenix.") ? hooks_default[name.split(".")[1]] : this.hooks[name];
    }
    isUnloaded() {
      return this.unloaded;
    }
    isConnected() {
      return this.socket.isConnected();
    }
    getBindingPrefix() {
      return this.bindingPrefix;
    }
    binding(kind) {
      return `${this.getBindingPrefix()}${kind}`;
    }
    channel(topic, params) {
      return this.socket.channel(topic, params);
    }
    joinDeadView() {
      let body = document.body;
      if (body && !this.isPhxView(body) && !this.isPhxView(document.firstElementChild)) {
        let view = this.newRootView(body);
        view.setHref(this.getHref());
        view.joinDead();
        if (!this.main) {
          this.main = view;
        }
        window.requestAnimationFrame(() => view.execNewMounted());
      }
    }
    joinRootViews() {
      let rootsFound = false;
      dom_default.all(document, `${PHX_VIEW_SELECTOR}:not([${PHX_PARENT_ID}])`, (rootEl) => {
        if (!this.getRootById(rootEl.id)) {
          let view = this.newRootView(rootEl);
          view.setHref(this.getHref());
          view.join();
          if (rootEl.hasAttribute(PHX_MAIN)) {
            this.main = view;
          }
        }
        rootsFound = true;
      });
      return rootsFound;
    }
    redirect(to, flash) {
      this.unload();
      browser_default.redirect(to, flash);
    }
    replaceMain(href, flash, callback = null, linkRef = this.setPendingLink(href)) {
      let liveReferer = this.currentLocation.href;
      this.outgoingMainEl = this.outgoingMainEl || this.main.el;
      let newMainEl = dom_default.cloneNode(this.outgoingMainEl, "");
      this.main.showLoader(this.loaderTimeout);
      this.main.destroy();
      this.main = this.newRootView(newMainEl, flash, liveReferer);
      this.main.setRedirect(href);
      this.transitionRemoves(null, true);
      this.main.join((joinCount, onDone) => {
        if (joinCount === 1 && this.commitPendingLink(linkRef)) {
          this.requestDOMUpdate(() => {
            dom_default.findPhxSticky(document).forEach((el) => newMainEl.appendChild(el));
            this.outgoingMainEl.replaceWith(newMainEl);
            this.outgoingMainEl = null;
            callback && callback(linkRef);
            onDone();
          });
        }
      });
    }
    transitionRemoves(elements, skipSticky) {
      let removeAttr = this.binding("remove");
      elements = elements || dom_default.all(document, `[${removeAttr}]`);
      if (skipSticky) {
        const stickies = dom_default.findPhxSticky(document) || [];
        elements = elements.filter((el) => !dom_default.isChildOfAny(el, stickies));
      }
      elements.forEach((el) => {
        this.execJS(el, el.getAttribute(removeAttr), "remove");
      });
    }
    isPhxView(el) {
      return el.getAttribute && el.getAttribute(PHX_SESSION) !== null;
    }
    newRootView(el, flash, liveReferer) {
      let view = new View(el, this, null, flash, liveReferer);
      this.roots[view.id] = view;
      return view;
    }
    owner(childEl, callback) {
      let view = maybe(childEl.closest(PHX_VIEW_SELECTOR), (el) => this.getViewByEl(el)) || this.main;
      if (view) {
        callback(view);
      }
    }
    withinOwners(childEl, callback) {
      this.owner(childEl, (view) => callback(view, childEl));
    }
    getViewByEl(el) {
      let rootId = el.getAttribute(PHX_ROOT_ID);
      return maybe(this.getRootById(rootId), (root) => root.getDescendentByEl(el));
    }
    getRootById(id) {
      return this.roots[id];
    }
    destroyAllViews() {
      for (let id in this.roots) {
        this.roots[id].destroy();
        delete this.roots[id];
      }
      this.main = null;
    }
    destroyViewByEl(el) {
      let root = this.getRootById(el.getAttribute(PHX_ROOT_ID));
      if (root && root.id === el.id) {
        root.destroy();
        delete this.roots[root.id];
      } else if (root) {
        root.destroyDescendent(el.id);
      }
    }
    setActiveElement(target) {
      if (this.activeElement === target) {
        return;
      }
      this.activeElement = target;
      let cancel = () => {
        if (target === this.activeElement) {
          this.activeElement = null;
        }
        target.removeEventListener("mouseup", this);
        target.removeEventListener("touchend", this);
      };
      target.addEventListener("mouseup", cancel);
      target.addEventListener("touchend", cancel);
    }
    getActiveElement() {
      if (document.activeElement === document.body) {
        return this.activeElement || document.activeElement;
      } else {
        return document.activeElement || document.body;
      }
    }
    dropActiveElement(view) {
      if (this.prevActive && view.ownsElement(this.prevActive)) {
        this.prevActive = null;
      }
    }
    restorePreviouslyActiveFocus() {
      if (this.prevActive && this.prevActive !== document.body) {
        this.prevActive.focus();
      }
    }
    blurActiveElement() {
      this.prevActive = this.getActiveElement();
      if (this.prevActive !== document.body) {
        this.prevActive.blur();
      }
    }
    bindTopLevelEvents({ dead } = {}) {
      if (this.boundTopLevelEvents) {
        return;
      }
      this.boundTopLevelEvents = true;
      this.socket.onClose((event) => {
        if (event && event.code === 1e3 && this.main) {
          return this.reloadWithJitter(this.main);
        }
      });
      document.body.addEventListener("click", function() {
      });
      window.addEventListener("pageshow", (e) => {
        if (e.persisted) {
          this.getSocket().disconnect();
          this.withPageLoading({ to: window.location.href, kind: "redirect" });
          window.location.reload();
        }
      }, true);
      if (!dead) {
        this.bindNav();
      }
      this.bindClicks();
      if (!dead) {
        this.bindForms();
      }
      this.bind({ keyup: "keyup", keydown: "keydown" }, (e, type, view, targetEl, phxEvent, phxTarget) => {
        let matchKey = targetEl.getAttribute(this.binding(PHX_KEY));
        let pressedKey = e.key && e.key.toLowerCase();
        if (matchKey && matchKey.toLowerCase() !== pressedKey) {
          return;
        }
        let data = __spreadValues({ key: e.key }, this.eventMeta(type, e, targetEl));
        js_default.exec(type, phxEvent, view, targetEl, ["push", { data }]);
      });
      this.bind({ blur: "focusout", focus: "focusin" }, (e, type, view, targetEl, phxEvent, phxTarget) => {
        if (!phxTarget) {
          let data = __spreadValues({ key: e.key }, this.eventMeta(type, e, targetEl));
          js_default.exec(type, phxEvent, view, targetEl, ["push", { data }]);
        }
      });
      this.bind({ blur: "blur", focus: "focus" }, (e, type, view, targetEl, phxEvent, phxTarget) => {
        if (phxTarget === "window") {
          let data = this.eventMeta(type, e, targetEl);
          js_default.exec(type, phxEvent, view, targetEl, ["push", { data }]);
        }
      });
      window.addEventListener("dragover", (e) => e.preventDefault());
      window.addEventListener("drop", (e) => {
        e.preventDefault();
        let dropTargetId = maybe(closestPhxBinding(e.target, this.binding(PHX_DROP_TARGET)), (trueTarget) => {
          return trueTarget.getAttribute(this.binding(PHX_DROP_TARGET));
        });
        let dropTarget = dropTargetId && document.getElementById(dropTargetId);
        let files = Array.from(e.dataTransfer.files || []);
        if (!dropTarget || dropTarget.disabled || files.length === 0 || !(dropTarget.files instanceof FileList)) {
          return;
        }
        LiveUploader.trackFiles(dropTarget, files, e.dataTransfer);
        dropTarget.dispatchEvent(new Event("input", { bubbles: true }));
      });
      this.on(PHX_TRACK_UPLOADS, (e) => {
        let uploadTarget = e.target;
        if (!dom_default.isUploadInput(uploadTarget)) {
          return;
        }
        let files = Array.from(e.detail.files || []).filter((f) => f instanceof File || f instanceof Blob);
        LiveUploader.trackFiles(uploadTarget, files);
        uploadTarget.dispatchEvent(new Event("input", { bubbles: true }));
      });
    }
    eventMeta(eventName, e, targetEl) {
      let callback = this.metadataCallbacks[eventName];
      return callback ? callback(e, targetEl) : {};
    }
    setPendingLink(href) {
      this.linkRef++;
      this.pendingLink = href;
      return this.linkRef;
    }
    commitPendingLink(linkRef) {
      if (this.linkRef !== linkRef) {
        return false;
      } else {
        this.href = this.pendingLink;
        this.pendingLink = null;
        return true;
      }
    }
    getHref() {
      return this.href;
    }
    hasPendingLink() {
      return !!this.pendingLink;
    }
    bind(events, callback) {
      for (let event in events) {
        let browserEventName = events[event];
        this.on(browserEventName, (e) => {
          let binding = this.binding(event);
          let windowBinding = this.binding(`window-${event}`);
          let targetPhxEvent = e.target.getAttribute && e.target.getAttribute(binding);
          if (targetPhxEvent) {
            this.debounce(e.target, e, browserEventName, () => {
              this.withinOwners(e.target, (view) => {
                callback(e, event, view, e.target, targetPhxEvent, null);
              });
            });
          } else {
            dom_default.all(document, `[${windowBinding}]`, (el) => {
              let phxEvent = el.getAttribute(windowBinding);
              this.debounce(el, e, browserEventName, () => {
                this.withinOwners(el, (view) => {
                  callback(e, event, view, el, phxEvent, "window");
                });
              });
            });
          }
        });
      }
    }
    bindClicks() {
      window.addEventListener("mousedown", (e) => this.clickStartedAtTarget = e.target);
      this.bindClick("click", "click", false);
      this.bindClick("mousedown", "capture-click", true);
    }
    bindClick(eventName, bindingName, capture) {
      let click = this.binding(bindingName);
      window.addEventListener(eventName, (e) => {
        let target = null;
        if (capture) {
          target = e.target.matches(`[${click}]`) ? e.target : e.target.querySelector(`[${click}]`);
        } else {
          if (e.detail === 0)
            this.clickStartedAtTarget = e.target;
          let clickStartedAtTarget = this.clickStartedAtTarget || e.target;
          target = closestPhxBinding(clickStartedAtTarget, click);
          this.dispatchClickAway(e, clickStartedAtTarget);
          this.clickStartedAtTarget = null;
        }
        let phxEvent = target && target.getAttribute(click);
        if (!phxEvent) {
          if (!capture && dom_default.isNewPageClick(e, window.location)) {
            this.unload();
          }
          return;
        }
        if (target.getAttribute("href") === "#") {
          e.preventDefault();
        }
        if (target.hasAttribute(PHX_REF)) {
          return;
        }
        this.debounce(target, e, "click", () => {
          this.withinOwners(target, (view) => {
            js_default.exec("click", phxEvent, view, target, ["push", { data: this.eventMeta("click", e, target) }]);
          });
        });
      }, capture);
    }
    dispatchClickAway(e, clickStartedAt) {
      let phxClickAway = this.binding("click-away");
      dom_default.all(document, `[${phxClickAway}]`, (el) => {
        if (!(el.isSameNode(clickStartedAt) || el.contains(clickStartedAt))) {
          this.withinOwners(el, (view) => {
            let phxEvent = el.getAttribute(phxClickAway);
            if (js_default.isVisible(el) && js_default.isInViewport(el)) {
              js_default.exec("click", phxEvent, view, el, ["push", { data: this.eventMeta("click", e, e.target) }]);
            }
          });
        }
      });
    }
    bindNav() {
      if (!browser_default.canPushState()) {
        return;
      }
      if (history.scrollRestoration) {
        history.scrollRestoration = "manual";
      }
      let scrollTimer = null;
      window.addEventListener("scroll", (_e) => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          browser_default.updateCurrentState((state) => Object.assign(state, { scroll: window.scrollY }));
        }, 100);
      });
      window.addEventListener("popstate", (event) => {
        if (!this.registerNewLocation(window.location)) {
          return;
        }
        let { type, id, root, scroll } = event.state || {};
        let href = window.location.href;
        dom_default.dispatchEvent(window, "phx:navigate", { detail: { href, patch: type === "patch", pop: true } });
        this.requestDOMUpdate(() => {
          if (this.main.isConnected() && (type === "patch" && id === this.main.id)) {
            this.main.pushLinkPatch(href, null, () => {
              this.maybeScroll(scroll);
            });
          } else {
            this.replaceMain(href, null, () => {
              if (root) {
                this.replaceRootHistory();
              }
              this.maybeScroll(scroll);
            });
          }
        });
      }, false);
      window.addEventListener("click", (e) => {
        let target = closestPhxBinding(e.target, PHX_LIVE_LINK);
        let type = target && target.getAttribute(PHX_LIVE_LINK);
        if (!type || !this.isConnected() || !this.main || dom_default.wantsNewTab(e)) {
          return;
        }
        let href = target.href instanceof SVGAnimatedString ? target.href.baseVal : target.href;
        let linkState = target.getAttribute(PHX_LINK_STATE);
        e.preventDefault();
        e.stopImmediatePropagation();
        if (this.pendingLink === href) {
          return;
        }
        this.requestDOMUpdate(() => {
          if (type === "patch") {
            this.pushHistoryPatch(href, linkState, target);
          } else if (type === "redirect") {
            this.historyRedirect(href, linkState);
          } else {
            throw new Error(`expected ${PHX_LIVE_LINK} to be "patch" or "redirect", got: ${type}`);
          }
          let phxClick = target.getAttribute(this.binding("click"));
          if (phxClick) {
            this.requestDOMUpdate(() => this.execJS(target, phxClick, "click"));
          }
        });
      }, false);
    }
    maybeScroll(scroll) {
      if (typeof scroll === "number") {
        requestAnimationFrame(() => {
          window.scrollTo(0, scroll);
        });
      }
    }
    dispatchEvent(event, payload = {}) {
      dom_default.dispatchEvent(window, `phx:${event}`, { detail: payload });
    }
    dispatchEvents(events) {
      events.forEach(([event, payload]) => this.dispatchEvent(event, payload));
    }
    withPageLoading(info, callback) {
      dom_default.dispatchEvent(window, "phx:page-loading-start", { detail: info });
      let done = () => dom_default.dispatchEvent(window, "phx:page-loading-stop", { detail: info });
      return callback ? callback(done) : done;
    }
    pushHistoryPatch(href, linkState, targetEl) {
      if (!this.isConnected() || !this.main.isMain()) {
        return browser_default.redirect(href);
      }
      this.withPageLoading({ to: href, kind: "patch" }, (done) => {
        this.main.pushLinkPatch(href, targetEl, (linkRef) => {
          this.historyPatch(href, linkState, linkRef);
          done();
        });
      });
    }
    historyPatch(href, linkState, linkRef = this.setPendingLink(href)) {
      if (!this.commitPendingLink(linkRef)) {
        return;
      }
      browser_default.pushState(linkState, { type: "patch", id: this.main.id }, href);
      dom_default.dispatchEvent(window, "phx:navigate", { detail: { patch: true, href, pop: false } });
      this.registerNewLocation(window.location);
    }
    historyRedirect(href, linkState, flash) {
      if (!this.isConnected() || !this.main.isMain()) {
        return browser_default.redirect(href, flash);
      }
      if (/^\/$|^\/[^\/]+.*$/.test(href)) {
        let { protocol, host } = window.location;
        href = `${protocol}//${host}${href}`;
      }
      let scroll = window.scrollY;
      this.withPageLoading({ to: href, kind: "redirect" }, (done) => {
        this.replaceMain(href, flash, (linkRef) => {
          if (linkRef === this.linkRef) {
            browser_default.pushState(linkState, { type: "redirect", id: this.main.id, scroll }, href);
            dom_default.dispatchEvent(window, "phx:navigate", { detail: { href, patch: false, pop: false } });
            this.registerNewLocation(window.location);
          }
          done();
        });
      });
    }
    replaceRootHistory() {
      browser_default.pushState("replace", { root: true, type: "patch", id: this.main.id });
    }
    registerNewLocation(newLocation) {
      let { pathname, search } = this.currentLocation;
      if (pathname + search === newLocation.pathname + newLocation.search) {
        return false;
      } else {
        this.currentLocation = clone(newLocation);
        return true;
      }
    }
    bindForms() {
      let iterations = 0;
      let externalFormSubmitted = false;
      this.on("submit", (e) => {
        let phxSubmit = e.target.getAttribute(this.binding("submit"));
        let phxChange = e.target.getAttribute(this.binding("change"));
        if (!externalFormSubmitted && phxChange && !phxSubmit) {
          externalFormSubmitted = true;
          e.preventDefault();
          this.withinOwners(e.target, (view) => {
            view.disableForm(e.target);
            window.requestAnimationFrame(() => {
              if (dom_default.isUnloadableFormSubmit(e)) {
                this.unload();
              }
              e.target.submit();
            });
          });
        }
      }, true);
      this.on("submit", (e) => {
        let phxEvent = e.target.getAttribute(this.binding("submit"));
        if (!phxEvent) {
          if (dom_default.isUnloadableFormSubmit(e)) {
            this.unload();
          }
          return;
        }
        e.preventDefault();
        e.target.disabled = true;
        this.withinOwners(e.target, (view) => {
          js_default.exec("submit", phxEvent, view, e.target, ["push", { submitter: e.submitter }]);
        });
      }, false);
      for (let type of ["change", "input"]) {
        this.on(type, (e) => {
          let phxChange = this.binding("change");
          let input = e.target;
          let inputEvent = input.getAttribute(phxChange);
          let formEvent = input.form && input.form.getAttribute(phxChange);
          let phxEvent = inputEvent || formEvent;
          if (!phxEvent) {
            return;
          }
          if (input.type === "number" && input.validity && input.validity.badInput) {
            return;
          }
          let dispatcher = inputEvent ? input : input.form;
          let currentIterations = iterations;
          iterations++;
          let { at, type: lastType } = dom_default.private(input, "prev-iteration") || {};
          if (at === currentIterations - 1 && type === "change" && lastType === "input") {
            return;
          }
          dom_default.putPrivate(input, "prev-iteration", { at: currentIterations, type });
          this.debounce(input, e, type, () => {
            this.withinOwners(dispatcher, (view) => {
              dom_default.putPrivate(input, PHX_HAS_FOCUSED, true);
              if (!dom_default.isTextualInput(input)) {
                this.setActiveElement(input);
              }
              js_default.exec("change", phxEvent, view, input, ["push", { _target: e.target.name, dispatcher }]);
            });
          });
        }, false);
      }
      this.on("reset", (e) => {
        let form = e.target;
        dom_default.resetForm(form, this.binding(PHX_FEEDBACK_FOR), this.binding(PHX_FEEDBACK_GROUP));
        let input = Array.from(form.elements).find((el) => el.type === "reset");
        if (input) {
          window.requestAnimationFrame(() => {
            input.dispatchEvent(new Event("input", { bubbles: true, cancelable: false }));
          });
        }
      });
    }
    debounce(el, event, eventType, callback) {
      if (eventType === "blur" || eventType === "focusout") {
        return callback();
      }
      let phxDebounce = this.binding(PHX_DEBOUNCE);
      let phxThrottle = this.binding(PHX_THROTTLE);
      let defaultDebounce = this.defaults.debounce.toString();
      let defaultThrottle = this.defaults.throttle.toString();
      this.withinOwners(el, (view) => {
        let asyncFilter = () => !view.isDestroyed() && document.body.contains(el);
        dom_default.debounce(el, event, phxDebounce, defaultDebounce, phxThrottle, defaultThrottle, asyncFilter, () => {
          callback();
        });
      });
    }
    silenceEvents(callback) {
      this.silenced = true;
      callback();
      this.silenced = false;
    }
    on(event, callback) {
      window.addEventListener(event, (e) => {
        if (!this.silenced) {
          callback(e);
        }
      });
    }
  };
  var TransitionSet = class {
    constructor() {
      this.transitions = /* @__PURE__ */ new Set();
      this.pendingOps = [];
    }
    reset() {
      this.transitions.forEach((timer) => {
        clearTimeout(timer);
        this.transitions.delete(timer);
      });
      this.flushPendingOps();
    }
    after(callback) {
      if (this.size() === 0) {
        callback();
      } else {
        this.pushPendingOp(callback);
      }
    }
    addTransition(time, onStart, onDone) {
      onStart();
      let timer = setTimeout(() => {
        this.transitions.delete(timer);
        onDone();
        this.flushPendingOps();
      }, time);
      this.transitions.add(timer);
    }
    pushPendingOp(op) {
      this.pendingOps.push(op);
    }
    size() {
      return this.transitions.size;
    }
    flushPendingOps() {
      if (this.size() > 0) {
        return;
      }
      let op = this.pendingOps.shift();
      if (op) {
        op();
        this.flushPendingOps();
      }
    }
  };

  // js/app.js
  var import_topbar = __toESM(require_topbar());
  var csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");
  var liveSocket = new LiveSocket("/live", Socket, {
    longPollFallbackMs: 2500,
    params: { _csrf_token: csrfToken }
  });
  import_topbar.default.config({ barColors: { 0: "#29d" }, shadowColor: "rgba(0, 0, 0, .3)" });
  window.addEventListener("phx:page-loading-start", (_info) => import_topbar.default.show(300));
  window.addEventListener("phx:page-loading-stop", (_info) => import_topbar.default.hide());
  liveSocket.connect();
  window.liveSocket = liveSocket;
})();
/**
 * @license MIT
 * topbar 2.0.0, 2023-02-04
 * https://buunguyen.github.io/topbar
 * Copyright (c) 2021 Buu Nguyen
 */
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vYXNzZXRzL3ZlbmRvci90b3BiYXIuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4L2Fzc2V0cy9qcy9waG9lbml4L3V0aWxzLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC9jb25zdGFudHMuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4L2Fzc2V0cy9qcy9waG9lbml4L3B1c2guanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4L2Fzc2V0cy9qcy9waG9lbml4L3RpbWVyLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC9jaGFubmVsLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC9hamF4LmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC9sb25ncG9sbC5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvcHJlc2VuY2UuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4L2Fzc2V0cy9qcy9waG9lbml4L3NlcmlhbGl6ZXIuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4L2Fzc2V0cy9qcy9waG9lbml4L3NvY2tldC5qcyIsICIuLi8uLi8uLi9hc3NldHMvanMvdXNlcl9zb2NrZXQuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2h0bWwvcHJpdi9zdGF0aWMvcGhvZW5peF9odG1sLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2NvbnN0YW50cy5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXhfbGl2ZV92aWV3L2Fzc2V0cy9qcy9waG9lbml4X2xpdmVfdmlldy9lbnRyeV91cGxvYWRlci5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXhfbGl2ZV92aWV3L2Fzc2V0cy9qcy9waG9lbml4X2xpdmVfdmlldy91dGlscy5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXhfbGl2ZV92aWV3L2Fzc2V0cy9qcy9waG9lbml4X2xpdmVfdmlldy9icm93c2VyLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2FyaWEuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvanMuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvZG9tLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L3VwbG9hZF9lbnRyeS5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXhfbGl2ZV92aWV3L2Fzc2V0cy9qcy9waG9lbml4X2xpdmVfdmlldy9saXZlX3VwbG9hZGVyLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2hvb2tzLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2RvbV9wb3N0X21vcnBoX3Jlc3RvcmVyLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL25vZGVfbW9kdWxlcy9tb3JwaGRvbS9kaXN0L21vcnBoZG9tLWVzbS5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXhfbGl2ZV92aWV3L2Fzc2V0cy9qcy9waG9lbml4X2xpdmVfdmlldy9kb21fcGF0Y2guanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvcmVuZGVyZWQuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvdmlld19ob29rLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L3ZpZXcuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvbGl2ZV9zb2NrZXQuanMiLCAiLi4vLi4vLi4vYXNzZXRzL2pzL2FwcC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqXG4gKiBAbGljZW5zZSBNSVRcbiAqIHRvcGJhciAyLjAuMCwgMjAyMy0wMi0wNFxuICogaHR0cHM6Ly9idXVuZ3V5ZW4uZ2l0aHViLmlvL3RvcGJhclxuICogQ29weXJpZ2h0IChjKSAyMDIxIEJ1dSBOZ3V5ZW5cbiAqL1xuKGZ1bmN0aW9uICh3aW5kb3csIGRvY3VtZW50KSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIC8vIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL3BhdWxpcmlzaC8xNTc5NjcxXG4gIChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGxhc3RUaW1lID0gMDtcbiAgICB2YXIgdmVuZG9ycyA9IFtcIm1zXCIsIFwibW96XCIsIFwid2Via2l0XCIsIFwib1wiXTtcbiAgICBmb3IgKHZhciB4ID0gMDsgeCA8IHZlbmRvcnMubGVuZ3RoICYmICF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lOyArK3gpIHtcbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPVxuICAgICAgICB3aW5kb3dbdmVuZG9yc1t4XSArIFwiUmVxdWVzdEFuaW1hdGlvbkZyYW1lXCJdO1xuICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID1cbiAgICAgICAgd2luZG93W3ZlbmRvcnNbeF0gKyBcIkNhbmNlbEFuaW1hdGlvbkZyYW1lXCJdIHx8XG4gICAgICAgIHdpbmRvd1t2ZW5kb3JzW3hdICsgXCJDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcIl07XG4gICAgfVxuICAgIGlmICghd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSlcbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbiAoY2FsbGJhY2ssIGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGN1cnJUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHZhciB0aW1lVG9DYWxsID0gTWF0aC5tYXgoMCwgMTYgLSAoY3VyclRpbWUgLSBsYXN0VGltZSkpO1xuICAgICAgICB2YXIgaWQgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY2FsbGJhY2soY3VyclRpbWUgKyB0aW1lVG9DYWxsKTtcbiAgICAgICAgfSwgdGltZVRvQ2FsbCk7XG4gICAgICAgIGxhc3RUaW1lID0gY3VyclRpbWUgKyB0aW1lVG9DYWxsO1xuICAgICAgICByZXR1cm4gaWQ7XG4gICAgICB9O1xuICAgIGlmICghd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKVxuICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChpZCk7XG4gICAgICB9O1xuICB9KSgpO1xuXG4gIHZhciBjYW52YXMsXG4gICAgY3VycmVudFByb2dyZXNzLFxuICAgIHNob3dpbmcsXG4gICAgcHJvZ3Jlc3NUaW1lcklkID0gbnVsbCxcbiAgICBmYWRlVGltZXJJZCA9IG51bGwsXG4gICAgZGVsYXlUaW1lcklkID0gbnVsbCxcbiAgICBhZGRFdmVudCA9IGZ1bmN0aW9uIChlbGVtLCB0eXBlLCBoYW5kbGVyKSB7XG4gICAgICBpZiAoZWxlbS5hZGRFdmVudExpc3RlbmVyKSBlbGVtLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciwgZmFsc2UpO1xuICAgICAgZWxzZSBpZiAoZWxlbS5hdHRhY2hFdmVudCkgZWxlbS5hdHRhY2hFdmVudChcIm9uXCIgKyB0eXBlLCBoYW5kbGVyKTtcbiAgICAgIGVsc2UgZWxlbVtcIm9uXCIgKyB0eXBlXSA9IGhhbmRsZXI7XG4gICAgfSxcbiAgICBvcHRpb25zID0ge1xuICAgICAgYXV0b1J1bjogdHJ1ZSxcbiAgICAgIGJhclRoaWNrbmVzczogMyxcbiAgICAgIGJhckNvbG9yczoge1xuICAgICAgICAwOiBcInJnYmEoMjYsICAxODgsIDE1NiwgLjkpXCIsXG4gICAgICAgIFwiLjI1XCI6IFwicmdiYSg1MiwgIDE1MiwgMjE5LCAuOSlcIixcbiAgICAgICAgXCIuNTBcIjogXCJyZ2JhKDI0MSwgMTk2LCAxNSwgIC45KVwiLFxuICAgICAgICBcIi43NVwiOiBcInJnYmEoMjMwLCAxMjYsIDM0LCAgLjkpXCIsXG4gICAgICAgIFwiMS4wXCI6IFwicmdiYSgyMTEsIDg0LCAgMCwgICAuOSlcIixcbiAgICAgIH0sXG4gICAgICBzaGFkb3dCbHVyOiAxMCxcbiAgICAgIHNoYWRvd0NvbG9yOiBcInJnYmEoMCwgICAwLCAgIDAsICAgLjYpXCIsXG4gICAgICBjbGFzc05hbWU6IG51bGwsXG4gICAgfSxcbiAgICByZXBhaW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICBjYW52YXMuaGVpZ2h0ID0gb3B0aW9ucy5iYXJUaGlja25lc3MgKiA1OyAvLyBuZWVkIHNwYWNlIGZvciBzaGFkb3dcblxuICAgICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICBjdHguc2hhZG93Qmx1ciA9IG9wdGlvbnMuc2hhZG93Qmx1cjtcbiAgICAgIGN0eC5zaGFkb3dDb2xvciA9IG9wdGlvbnMuc2hhZG93Q29sb3I7XG5cbiAgICAgIHZhciBsaW5lR3JhZGllbnQgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgMCwgY2FudmFzLndpZHRoLCAwKTtcbiAgICAgIGZvciAodmFyIHN0b3AgaW4gb3B0aW9ucy5iYXJDb2xvcnMpXG4gICAgICAgIGxpbmVHcmFkaWVudC5hZGRDb2xvclN0b3Aoc3RvcCwgb3B0aW9ucy5iYXJDb2xvcnNbc3RvcF0pO1xuICAgICAgY3R4LmxpbmVXaWR0aCA9IG9wdGlvbnMuYmFyVGhpY2tuZXNzO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbygwLCBvcHRpb25zLmJhclRoaWNrbmVzcyAvIDIpO1xuICAgICAgY3R4LmxpbmVUbyhcbiAgICAgICAgTWF0aC5jZWlsKGN1cnJlbnRQcm9ncmVzcyAqIGNhbnZhcy53aWR0aCksXG4gICAgICAgIG9wdGlvbnMuYmFyVGhpY2tuZXNzIC8gMlxuICAgICAgKTtcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9IGxpbmVHcmFkaWVudDtcbiAgICAgIGN0eC5zdHJva2UoKTtcbiAgICB9LFxuICAgIGNyZWF0ZUNhbnZhcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICB2YXIgc3R5bGUgPSBjYW52YXMuc3R5bGU7XG4gICAgICBzdHlsZS5wb3NpdGlvbiA9IFwiZml4ZWRcIjtcbiAgICAgIHN0eWxlLnRvcCA9IHN0eWxlLmxlZnQgPSBzdHlsZS5yaWdodCA9IHN0eWxlLm1hcmdpbiA9IHN0eWxlLnBhZGRpbmcgPSAwO1xuICAgICAgc3R5bGUuekluZGV4ID0gMTAwMDAxO1xuICAgICAgc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgaWYgKG9wdGlvbnMuY2xhc3NOYW1lKSBjYW52YXMuY2xhc3NMaXN0LmFkZChvcHRpb25zLmNsYXNzTmFtZSk7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XG4gICAgICBhZGRFdmVudCh3aW5kb3csIFwicmVzaXplXCIsIHJlcGFpbnQpO1xuICAgIH0sXG4gICAgdG9wYmFyID0ge1xuICAgICAgY29uZmlnOiBmdW5jdGlvbiAob3B0cykge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb3B0cylcbiAgICAgICAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShrZXkpKSBvcHRpb25zW2tleV0gPSBvcHRzW2tleV07XG4gICAgICB9LFxuICAgICAgc2hvdzogZnVuY3Rpb24gKGRlbGF5KSB7XG4gICAgICAgIGlmIChzaG93aW5nKSByZXR1cm47XG4gICAgICAgIGlmIChkZWxheSkge1xuICAgICAgICAgIGlmIChkZWxheVRpbWVySWQpIHJldHVybjtcbiAgICAgICAgICBkZWxheVRpbWVySWQgPSBzZXRUaW1lb3V0KCgpID0+IHRvcGJhci5zaG93KCksIGRlbGF5KTtcbiAgICAgICAgfSBlbHNlICB7XG4gICAgICAgICAgc2hvd2luZyA9IHRydWU7XG4gICAgICAgICAgaWYgKGZhZGVUaW1lcklkICE9PSBudWxsKSB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoZmFkZVRpbWVySWQpO1xuICAgICAgICAgIGlmICghY2FudmFzKSBjcmVhdGVDYW52YXMoKTtcbiAgICAgICAgICBjYW52YXMuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICAgICAgY2FudmFzLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgdG9wYmFyLnByb2dyZXNzKDApO1xuICAgICAgICAgIGlmIChvcHRpb25zLmF1dG9SdW4pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbiBsb29wKCkge1xuICAgICAgICAgICAgICBwcm9ncmVzc1RpbWVySWQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuICAgICAgICAgICAgICB0b3BiYXIucHJvZ3Jlc3MoXG4gICAgICAgICAgICAgICAgXCIrXCIgKyAwLjA1ICogTWF0aC5wb3coMSAtIE1hdGguc3FydChjdXJyZW50UHJvZ3Jlc3MpLCAyKVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBwcm9ncmVzczogZnVuY3Rpb24gKHRvKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdG8gPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBjdXJyZW50UHJvZ3Jlc3M7XG4gICAgICAgIGlmICh0eXBlb2YgdG8gPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICB0byA9XG4gICAgICAgICAgICAodG8uaW5kZXhPZihcIitcIikgPj0gMCB8fCB0by5pbmRleE9mKFwiLVwiKSA+PSAwXG4gICAgICAgICAgICAgID8gY3VycmVudFByb2dyZXNzXG4gICAgICAgICAgICAgIDogMCkgKyBwYXJzZUZsb2F0KHRvKTtcbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50UHJvZ3Jlc3MgPSB0byA+IDEgPyAxIDogdG87XG4gICAgICAgIHJlcGFpbnQoKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm9ncmVzcztcbiAgICAgIH0sXG4gICAgICBoaWRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChkZWxheVRpbWVySWQpO1xuICAgICAgICBkZWxheVRpbWVySWQgPSBudWxsO1xuICAgICAgICBpZiAoIXNob3dpbmcpIHJldHVybjtcbiAgICAgICAgc2hvd2luZyA9IGZhbHNlO1xuICAgICAgICBpZiAocHJvZ3Jlc3NUaW1lcklkICE9IG51bGwpIHtcbiAgICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUocHJvZ3Jlc3NUaW1lcklkKTtcbiAgICAgICAgICBwcm9ncmVzc1RpbWVySWQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIChmdW5jdGlvbiBsb29wKCkge1xuICAgICAgICAgIGlmICh0b3BiYXIucHJvZ3Jlc3MoXCIrLjFcIikgPj0gMSkge1xuICAgICAgICAgICAgY2FudmFzLnN0eWxlLm9wYWNpdHkgLT0gMC4wNTtcbiAgICAgICAgICAgIGlmIChjYW52YXMuc3R5bGUub3BhY2l0eSA8PSAwLjA1KSB7XG4gICAgICAgICAgICAgIGNhbnZhcy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICAgIGZhZGVUaW1lcklkID0gbnVsbDtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBmYWRlVGltZXJJZCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG4gICAgICAgIH0pKCk7XG4gICAgICB9LFxuICAgIH07XG5cbiAgaWYgKHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSB0b3BiYXI7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRvcGJhcjtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnRvcGJhciA9IHRvcGJhcjtcbiAgfVxufS5jYWxsKHRoaXMsIHdpbmRvdywgZG9jdW1lbnQpKTtcbiIsICIvLyB3cmFwcyB2YWx1ZSBpbiBjbG9zdXJlIG9yIHJldHVybnMgY2xvc3VyZVxuZXhwb3J0IGxldCBjbG9zdXJlID0gKHZhbHVlKSA9PiB7XG4gIGlmKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKXtcbiAgICByZXR1cm4gdmFsdWVcbiAgfSBlbHNlIHtcbiAgICBsZXQgY2xvc3VyZSA9IGZ1bmN0aW9uICgpeyByZXR1cm4gdmFsdWUgfVxuICAgIHJldHVybiBjbG9zdXJlXG4gIH1cbn1cbiIsICJleHBvcnQgY29uc3QgZ2xvYmFsU2VsZiA9IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IG51bGxcbmV4cG9ydCBjb25zdCBwaHhXaW5kb3cgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogbnVsbFxuZXhwb3J0IGNvbnN0IGdsb2JhbCA9IGdsb2JhbFNlbGYgfHwgcGh4V2luZG93IHx8IGdsb2JhbFxuZXhwb3J0IGNvbnN0IERFRkFVTFRfVlNOID0gXCIyLjAuMFwiXG5leHBvcnQgY29uc3QgU09DS0VUX1NUQVRFUyA9IHtjb25uZWN0aW5nOiAwLCBvcGVuOiAxLCBjbG9zaW5nOiAyLCBjbG9zZWQ6IDN9XG5leHBvcnQgY29uc3QgREVGQVVMVF9USU1FT1VUID0gMTAwMDBcbmV4cG9ydCBjb25zdCBXU19DTE9TRV9OT1JNQUwgPSAxMDAwXG5leHBvcnQgY29uc3QgQ0hBTk5FTF9TVEFURVMgPSB7XG4gIGNsb3NlZDogXCJjbG9zZWRcIixcbiAgZXJyb3JlZDogXCJlcnJvcmVkXCIsXG4gIGpvaW5lZDogXCJqb2luZWRcIixcbiAgam9pbmluZzogXCJqb2luaW5nXCIsXG4gIGxlYXZpbmc6IFwibGVhdmluZ1wiLFxufVxuZXhwb3J0IGNvbnN0IENIQU5ORUxfRVZFTlRTID0ge1xuICBjbG9zZTogXCJwaHhfY2xvc2VcIixcbiAgZXJyb3I6IFwicGh4X2Vycm9yXCIsXG4gIGpvaW46IFwicGh4X2pvaW5cIixcbiAgcmVwbHk6IFwicGh4X3JlcGx5XCIsXG4gIGxlYXZlOiBcInBoeF9sZWF2ZVwiXG59XG5cbmV4cG9ydCBjb25zdCBUUkFOU1BPUlRTID0ge1xuICBsb25ncG9sbDogXCJsb25ncG9sbFwiLFxuICB3ZWJzb2NrZXQ6IFwid2Vic29ja2V0XCJcbn1cbmV4cG9ydCBjb25zdCBYSFJfU1RBVEVTID0ge1xuICBjb21wbGV0ZTogNFxufVxuIiwgIi8qKlxuICogSW5pdGlhbGl6ZXMgdGhlIFB1c2hcbiAqIEBwYXJhbSB7Q2hhbm5lbH0gY2hhbm5lbCAtIFRoZSBDaGFubmVsXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnQgLSBUaGUgZXZlbnQsIGZvciBleGFtcGxlIGBcInBoeF9qb2luXCJgXG4gKiBAcGFyYW0ge09iamVjdH0gcGF5bG9hZCAtIFRoZSBwYXlsb2FkLCBmb3IgZXhhbXBsZSBge3VzZXJfaWQ6IDEyM31gXG4gKiBAcGFyYW0ge251bWJlcn0gdGltZW91dCAtIFRoZSBwdXNoIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB1c2gge1xuICBjb25zdHJ1Y3RvcihjaGFubmVsLCBldmVudCwgcGF5bG9hZCwgdGltZW91dCl7XG4gICAgdGhpcy5jaGFubmVsID0gY2hhbm5lbFxuICAgIHRoaXMuZXZlbnQgPSBldmVudFxuICAgIHRoaXMucGF5bG9hZCA9IHBheWxvYWQgfHwgZnVuY3Rpb24gKCl7IHJldHVybiB7fSB9XG4gICAgdGhpcy5yZWNlaXZlZFJlc3AgPSBudWxsXG4gICAgdGhpcy50aW1lb3V0ID0gdGltZW91dFxuICAgIHRoaXMudGltZW91dFRpbWVyID0gbnVsbFxuICAgIHRoaXMucmVjSG9va3MgPSBbXVxuICAgIHRoaXMuc2VudCA9IGZhbHNlXG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVvdXRcbiAgICovXG4gIHJlc2VuZCh0aW1lb3V0KXtcbiAgICB0aGlzLnRpbWVvdXQgPSB0aW1lb3V0XG4gICAgdGhpcy5yZXNldCgpXG4gICAgdGhpcy5zZW5kKClcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgc2VuZCgpe1xuICAgIGlmKHRoaXMuaGFzUmVjZWl2ZWQoXCJ0aW1lb3V0XCIpKXsgcmV0dXJuIH1cbiAgICB0aGlzLnN0YXJ0VGltZW91dCgpXG4gICAgdGhpcy5zZW50ID0gdHJ1ZVxuICAgIHRoaXMuY2hhbm5lbC5zb2NrZXQucHVzaCh7XG4gICAgICB0b3BpYzogdGhpcy5jaGFubmVsLnRvcGljLFxuICAgICAgZXZlbnQ6IHRoaXMuZXZlbnQsXG4gICAgICBwYXlsb2FkOiB0aGlzLnBheWxvYWQoKSxcbiAgICAgIHJlZjogdGhpcy5yZWYsXG4gICAgICBqb2luX3JlZjogdGhpcy5jaGFubmVsLmpvaW5SZWYoKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHsqfSBzdGF0dXNcbiAgICogQHBhcmFtIHsqfSBjYWxsYmFja1xuICAgKi9cbiAgcmVjZWl2ZShzdGF0dXMsIGNhbGxiYWNrKXtcbiAgICBpZih0aGlzLmhhc1JlY2VpdmVkKHN0YXR1cykpe1xuICAgICAgY2FsbGJhY2sodGhpcy5yZWNlaXZlZFJlc3AucmVzcG9uc2UpXG4gICAgfVxuXG4gICAgdGhpcy5yZWNIb29rcy5wdXNoKHtzdGF0dXMsIGNhbGxiYWNrfSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICByZXNldCgpe1xuICAgIHRoaXMuY2FuY2VsUmVmRXZlbnQoKVxuICAgIHRoaXMucmVmID0gbnVsbFxuICAgIHRoaXMucmVmRXZlbnQgPSBudWxsXG4gICAgdGhpcy5yZWNlaXZlZFJlc3AgPSBudWxsXG4gICAgdGhpcy5zZW50ID0gZmFsc2VcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgbWF0Y2hSZWNlaXZlKHtzdGF0dXMsIHJlc3BvbnNlLCBfcmVmfSl7XG4gICAgdGhpcy5yZWNIb29rcy5maWx0ZXIoaCA9PiBoLnN0YXR1cyA9PT0gc3RhdHVzKVxuICAgICAgLmZvckVhY2goaCA9PiBoLmNhbGxiYWNrKHJlc3BvbnNlKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY2FuY2VsUmVmRXZlbnQoKXtcbiAgICBpZighdGhpcy5yZWZFdmVudCl7IHJldHVybiB9XG4gICAgdGhpcy5jaGFubmVsLm9mZih0aGlzLnJlZkV2ZW50KVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBjYW5jZWxUaW1lb3V0KCl7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dFRpbWVyKVxuICAgIHRoaXMudGltZW91dFRpbWVyID0gbnVsbFxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBzdGFydFRpbWVvdXQoKXtcbiAgICBpZih0aGlzLnRpbWVvdXRUaW1lcil7IHRoaXMuY2FuY2VsVGltZW91dCgpIH1cbiAgICB0aGlzLnJlZiA9IHRoaXMuY2hhbm5lbC5zb2NrZXQubWFrZVJlZigpXG4gICAgdGhpcy5yZWZFdmVudCA9IHRoaXMuY2hhbm5lbC5yZXBseUV2ZW50TmFtZSh0aGlzLnJlZilcblxuICAgIHRoaXMuY2hhbm5lbC5vbih0aGlzLnJlZkV2ZW50LCBwYXlsb2FkID0+IHtcbiAgICAgIHRoaXMuY2FuY2VsUmVmRXZlbnQoKVxuICAgICAgdGhpcy5jYW5jZWxUaW1lb3V0KClcbiAgICAgIHRoaXMucmVjZWl2ZWRSZXNwID0gcGF5bG9hZFxuICAgICAgdGhpcy5tYXRjaFJlY2VpdmUocGF5bG9hZClcbiAgICB9KVxuXG4gICAgdGhpcy50aW1lb3V0VGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMudHJpZ2dlcihcInRpbWVvdXRcIiwge30pXG4gICAgfSwgdGhpcy50aW1lb3V0KVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBoYXNSZWNlaXZlZChzdGF0dXMpe1xuICAgIHJldHVybiB0aGlzLnJlY2VpdmVkUmVzcCAmJiB0aGlzLnJlY2VpdmVkUmVzcC5zdGF0dXMgPT09IHN0YXR1c1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0cmlnZ2VyKHN0YXR1cywgcmVzcG9uc2Upe1xuICAgIHRoaXMuY2hhbm5lbC50cmlnZ2VyKHRoaXMucmVmRXZlbnQsIHtzdGF0dXMsIHJlc3BvbnNlfSlcbiAgfVxufVxuIiwgIi8qKlxuICpcbiAqIENyZWF0ZXMgYSB0aW1lciB0aGF0IGFjY2VwdHMgYSBgdGltZXJDYWxjYCBmdW5jdGlvbiB0byBwZXJmb3JtXG4gKiBjYWxjdWxhdGVkIHRpbWVvdXQgcmV0cmllcywgc3VjaCBhcyBleHBvbmVudGlhbCBiYWNrb2ZmLlxuICpcbiAqIEBleGFtcGxlXG4gKiBsZXQgcmVjb25uZWN0VGltZXIgPSBuZXcgVGltZXIoKCkgPT4gdGhpcy5jb25uZWN0KCksIGZ1bmN0aW9uKHRyaWVzKXtcbiAqICAgcmV0dXJuIFsxMDAwLCA1MDAwLCAxMDAwMF1bdHJpZXMgLSAxXSB8fCAxMDAwMFxuICogfSlcbiAqIHJlY29ubmVjdFRpbWVyLnNjaGVkdWxlVGltZW91dCgpIC8vIGZpcmVzIGFmdGVyIDEwMDBcbiAqIHJlY29ubmVjdFRpbWVyLnNjaGVkdWxlVGltZW91dCgpIC8vIGZpcmVzIGFmdGVyIDUwMDBcbiAqIHJlY29ubmVjdFRpbWVyLnJlc2V0KClcbiAqIHJlY29ubmVjdFRpbWVyLnNjaGVkdWxlVGltZW91dCgpIC8vIGZpcmVzIGFmdGVyIDEwMDBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHBhcmFtIHtGdW5jdGlvbn0gdGltZXJDYWxjXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbWVyIHtcbiAgY29uc3RydWN0b3IoY2FsbGJhY2ssIHRpbWVyQ2FsYyl7XG4gICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrXG4gICAgdGhpcy50aW1lckNhbGMgPSB0aW1lckNhbGNcbiAgICB0aGlzLnRpbWVyID0gbnVsbFxuICAgIHRoaXMudHJpZXMgPSAwXG4gIH1cblxuICByZXNldCgpe1xuICAgIHRoaXMudHJpZXMgPSAwXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpXG4gIH1cblxuICAvKipcbiAgICogQ2FuY2VscyBhbnkgcHJldmlvdXMgc2NoZWR1bGVUaW1lb3V0IGFuZCBzY2hlZHVsZXMgY2FsbGJhY2tcbiAgICovXG4gIHNjaGVkdWxlVGltZW91dCgpe1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKVxuXG4gICAgdGhpcy50aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy50cmllcyA9IHRoaXMudHJpZXMgKyAxXG4gICAgICB0aGlzLmNhbGxiYWNrKClcbiAgICB9LCB0aGlzLnRpbWVyQ2FsYyh0aGlzLnRyaWVzICsgMSkpXG4gIH1cbn1cbiIsICJpbXBvcnQge2Nsb3N1cmV9IGZyb20gXCIuL3V0aWxzXCJcbmltcG9ydCB7XG4gIENIQU5ORUxfRVZFTlRTLFxuICBDSEFOTkVMX1NUQVRFUyxcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuaW1wb3J0IFB1c2ggZnJvbSBcIi4vcHVzaFwiXG5pbXBvcnQgVGltZXIgZnJvbSBcIi4vdGltZXJcIlxuXG4vKipcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdG9waWNcbiAqIEBwYXJhbSB7KE9iamVjdHxmdW5jdGlvbil9IHBhcmFtc1xuICogQHBhcmFtIHtTb2NrZXR9IHNvY2tldFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGFubmVsIHtcbiAgY29uc3RydWN0b3IodG9waWMsIHBhcmFtcywgc29ja2V0KXtcbiAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMuY2xvc2VkXG4gICAgdGhpcy50b3BpYyA9IHRvcGljXG4gICAgdGhpcy5wYXJhbXMgPSBjbG9zdXJlKHBhcmFtcyB8fCB7fSlcbiAgICB0aGlzLnNvY2tldCA9IHNvY2tldFxuICAgIHRoaXMuYmluZGluZ3MgPSBbXVxuICAgIHRoaXMuYmluZGluZ1JlZiA9IDBcbiAgICB0aGlzLnRpbWVvdXQgPSB0aGlzLnNvY2tldC50aW1lb3V0XG4gICAgdGhpcy5qb2luZWRPbmNlID0gZmFsc2VcbiAgICB0aGlzLmpvaW5QdXNoID0gbmV3IFB1c2godGhpcywgQ0hBTk5FTF9FVkVOVFMuam9pbiwgdGhpcy5wYXJhbXMsIHRoaXMudGltZW91dClcbiAgICB0aGlzLnB1c2hCdWZmZXIgPSBbXVxuICAgIHRoaXMuc3RhdGVDaGFuZ2VSZWZzID0gW11cblxuICAgIHRoaXMucmVqb2luVGltZXIgPSBuZXcgVGltZXIoKCkgPT4ge1xuICAgICAgaWYodGhpcy5zb2NrZXQuaXNDb25uZWN0ZWQoKSl7IHRoaXMucmVqb2luKCkgfVxuICAgIH0sIHRoaXMuc29ja2V0LnJlam9pbkFmdGVyTXMpXG4gICAgdGhpcy5zdGF0ZUNoYW5nZVJlZnMucHVzaCh0aGlzLnNvY2tldC5vbkVycm9yKCgpID0+IHRoaXMucmVqb2luVGltZXIucmVzZXQoKSkpXG4gICAgdGhpcy5zdGF0ZUNoYW5nZVJlZnMucHVzaCh0aGlzLnNvY2tldC5vbk9wZW4oKCkgPT4ge1xuICAgICAgdGhpcy5yZWpvaW5UaW1lci5yZXNldCgpXG4gICAgICBpZih0aGlzLmlzRXJyb3JlZCgpKXsgdGhpcy5yZWpvaW4oKSB9XG4gICAgfSlcbiAgICApXG4gICAgdGhpcy5qb2luUHVzaC5yZWNlaXZlKFwib2tcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5zdGF0ZSA9IENIQU5ORUxfU1RBVEVTLmpvaW5lZFxuICAgICAgdGhpcy5yZWpvaW5UaW1lci5yZXNldCgpXG4gICAgICB0aGlzLnB1c2hCdWZmZXIuZm9yRWFjaChwdXNoRXZlbnQgPT4gcHVzaEV2ZW50LnNlbmQoKSlcbiAgICAgIHRoaXMucHVzaEJ1ZmZlciA9IFtdXG4gICAgfSlcbiAgICB0aGlzLmpvaW5QdXNoLnJlY2VpdmUoXCJlcnJvclwiLCAoKSA9PiB7XG4gICAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMuZXJyb3JlZFxuICAgICAgaWYodGhpcy5zb2NrZXQuaXNDb25uZWN0ZWQoKSl7IHRoaXMucmVqb2luVGltZXIuc2NoZWR1bGVUaW1lb3V0KCkgfVxuICAgIH0pXG4gICAgdGhpcy5vbkNsb3NlKCgpID0+IHtcbiAgICAgIHRoaXMucmVqb2luVGltZXIucmVzZXQoKVxuICAgICAgaWYodGhpcy5zb2NrZXQuaGFzTG9nZ2VyKCkpIHRoaXMuc29ja2V0LmxvZyhcImNoYW5uZWxcIiwgYGNsb3NlICR7dGhpcy50b3BpY30gJHt0aGlzLmpvaW5SZWYoKX1gKVxuICAgICAgdGhpcy5zdGF0ZSA9IENIQU5ORUxfU1RBVEVTLmNsb3NlZFxuICAgICAgdGhpcy5zb2NrZXQucmVtb3ZlKHRoaXMpXG4gICAgfSlcbiAgICB0aGlzLm9uRXJyb3IocmVhc29uID0+IHtcbiAgICAgIGlmKHRoaXMuc29ja2V0Lmhhc0xvZ2dlcigpKSB0aGlzLnNvY2tldC5sb2coXCJjaGFubmVsXCIsIGBlcnJvciAke3RoaXMudG9waWN9YCwgcmVhc29uKVxuICAgICAgaWYodGhpcy5pc0pvaW5pbmcoKSl7IHRoaXMuam9pblB1c2gucmVzZXQoKSB9XG4gICAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMuZXJyb3JlZFxuICAgICAgaWYodGhpcy5zb2NrZXQuaXNDb25uZWN0ZWQoKSl7IHRoaXMucmVqb2luVGltZXIuc2NoZWR1bGVUaW1lb3V0KCkgfVxuICAgIH0pXG4gICAgdGhpcy5qb2luUHVzaC5yZWNlaXZlKFwidGltZW91dFwiLCAoKSA9PiB7XG4gICAgICBpZih0aGlzLnNvY2tldC5oYXNMb2dnZXIoKSkgdGhpcy5zb2NrZXQubG9nKFwiY2hhbm5lbFwiLCBgdGltZW91dCAke3RoaXMudG9waWN9ICgke3RoaXMuam9pblJlZigpfSlgLCB0aGlzLmpvaW5QdXNoLnRpbWVvdXQpXG4gICAgICBsZXQgbGVhdmVQdXNoID0gbmV3IFB1c2godGhpcywgQ0hBTk5FTF9FVkVOVFMubGVhdmUsIGNsb3N1cmUoe30pLCB0aGlzLnRpbWVvdXQpXG4gICAgICBsZWF2ZVB1c2guc2VuZCgpXG4gICAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMuZXJyb3JlZFxuICAgICAgdGhpcy5qb2luUHVzaC5yZXNldCgpXG4gICAgICBpZih0aGlzLnNvY2tldC5pc0Nvbm5lY3RlZCgpKXsgdGhpcy5yZWpvaW5UaW1lci5zY2hlZHVsZVRpbWVvdXQoKSB9XG4gICAgfSlcbiAgICB0aGlzLm9uKENIQU5ORUxfRVZFTlRTLnJlcGx5LCAocGF5bG9hZCwgcmVmKSA9PiB7XG4gICAgICB0aGlzLnRyaWdnZXIodGhpcy5yZXBseUV2ZW50TmFtZShyZWYpLCBwYXlsb2FkKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogSm9pbiB0aGUgY2hhbm5lbFxuICAgKiBAcGFyYW0ge2ludGVnZXJ9IHRpbWVvdXRcbiAgICogQHJldHVybnMge1B1c2h9XG4gICAqL1xuICBqb2luKHRpbWVvdXQgPSB0aGlzLnRpbWVvdXQpe1xuICAgIGlmKHRoaXMuam9pbmVkT25jZSl7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cmllZCB0byBqb2luIG11bHRpcGxlIHRpbWVzLiAnam9pbicgY2FuIG9ubHkgYmUgY2FsbGVkIGEgc2luZ2xlIHRpbWUgcGVyIGNoYW5uZWwgaW5zdGFuY2VcIilcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50aW1lb3V0ID0gdGltZW91dFxuICAgICAgdGhpcy5qb2luZWRPbmNlID0gdHJ1ZVxuICAgICAgdGhpcy5yZWpvaW4oKVxuICAgICAgcmV0dXJuIHRoaXMuam9pblB1c2hcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSG9vayBpbnRvIGNoYW5uZWwgY2xvc2VcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICovXG4gIG9uQ2xvc2UoY2FsbGJhY2spe1xuICAgIHRoaXMub24oQ0hBTk5FTF9FVkVOVFMuY2xvc2UsIGNhbGxiYWNrKVxuICB9XG5cbiAgLyoqXG4gICAqIEhvb2sgaW50byBjaGFubmVsIGVycm9yc1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKi9cbiAgb25FcnJvcihjYWxsYmFjayl7XG4gICAgcmV0dXJuIHRoaXMub24oQ0hBTk5FTF9FVkVOVFMuZXJyb3IsIHJlYXNvbiA9PiBjYWxsYmFjayhyZWFzb24pKVxuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmliZXMgb24gY2hhbm5lbCBldmVudHNcbiAgICpcbiAgICogU3Vic2NyaXB0aW9uIHJldHVybnMgYSByZWYgY291bnRlciwgd2hpY2ggY2FuIGJlIHVzZWQgbGF0ZXIgdG9cbiAgICogdW5zdWJzY3JpYmUgdGhlIGV4YWN0IGV2ZW50IGxpc3RlbmVyXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGNvbnN0IHJlZjEgPSBjaGFubmVsLm9uKFwiZXZlbnRcIiwgZG9fc3R1ZmYpXG4gICAqIGNvbnN0IHJlZjIgPSBjaGFubmVsLm9uKFwiZXZlbnRcIiwgZG9fb3RoZXJfc3R1ZmYpXG4gICAqIGNoYW5uZWwub2ZmKFwiZXZlbnRcIiwgcmVmMSlcbiAgICogLy8gU2luY2UgdW5zdWJzY3JpcHRpb24sIGRvX3N0dWZmIHdvbid0IGZpcmUsXG4gICAqIC8vIHdoaWxlIGRvX290aGVyX3N0dWZmIHdpbGwga2VlcCBmaXJpbmcgb24gdGhlIFwiZXZlbnRcIlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICogQHJldHVybnMge2ludGVnZXJ9IHJlZlxuICAgKi9cbiAgb24oZXZlbnQsIGNhbGxiYWNrKXtcbiAgICBsZXQgcmVmID0gdGhpcy5iaW5kaW5nUmVmKytcbiAgICB0aGlzLmJpbmRpbmdzLnB1c2goe2V2ZW50LCByZWYsIGNhbGxiYWNrfSlcbiAgICByZXR1cm4gcmVmXG4gIH1cblxuICAvKipcbiAgICogVW5zdWJzY3JpYmVzIG9mZiBvZiBjaGFubmVsIGV2ZW50c1xuICAgKlxuICAgKiBVc2UgdGhlIHJlZiByZXR1cm5lZCBmcm9tIGEgY2hhbm5lbC5vbigpIHRvIHVuc3Vic2NyaWJlIG9uZVxuICAgKiBoYW5kbGVyLCBvciBwYXNzIG5vdGhpbmcgZm9yIHRoZSByZWYgdG8gdW5zdWJzY3JpYmUgYWxsXG4gICAqIGhhbmRsZXJzIGZvciB0aGUgZ2l2ZW4gZXZlbnQuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIC8vIFVuc3Vic2NyaWJlIHRoZSBkb19zdHVmZiBoYW5kbGVyXG4gICAqIGNvbnN0IHJlZjEgPSBjaGFubmVsLm9uKFwiZXZlbnRcIiwgZG9fc3R1ZmYpXG4gICAqIGNoYW5uZWwub2ZmKFwiZXZlbnRcIiwgcmVmMSlcbiAgICpcbiAgICogLy8gVW5zdWJzY3JpYmUgYWxsIGhhbmRsZXJzIGZyb20gZXZlbnRcbiAgICogY2hhbm5lbC5vZmYoXCJldmVudFwiKVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRcbiAgICogQHBhcmFtIHtpbnRlZ2VyfSByZWZcbiAgICovXG4gIG9mZihldmVudCwgcmVmKXtcbiAgICB0aGlzLmJpbmRpbmdzID0gdGhpcy5iaW5kaW5ncy5maWx0ZXIoKGJpbmQpID0+IHtcbiAgICAgIHJldHVybiAhKGJpbmQuZXZlbnQgPT09IGV2ZW50ICYmICh0eXBlb2YgcmVmID09PSBcInVuZGVmaW5lZFwiIHx8IHJlZiA9PT0gYmluZC5yZWYpKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGNhblB1c2goKXsgcmV0dXJuIHRoaXMuc29ja2V0LmlzQ29ubmVjdGVkKCkgJiYgdGhpcy5pc0pvaW5lZCgpIH1cblxuICAvKipcbiAgICogU2VuZHMgYSBtZXNzYWdlIGBldmVudGAgdG8gcGhvZW5peCB3aXRoIHRoZSBwYXlsb2FkIGBwYXlsb2FkYC5cbiAgICogUGhvZW5peCByZWNlaXZlcyB0aGlzIGluIHRoZSBgaGFuZGxlX2luKGV2ZW50LCBwYXlsb2FkLCBzb2NrZXQpYFxuICAgKiBmdW5jdGlvbi4gaWYgcGhvZW5peCByZXBsaWVzIG9yIGl0IHRpbWVzIG91dCAoZGVmYXVsdCAxMDAwMG1zKSxcbiAgICogdGhlbiBvcHRpb25hbGx5IHRoZSByZXBseSBjYW4gYmUgcmVjZWl2ZWQuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGNoYW5uZWwucHVzaChcImV2ZW50XCIpXG4gICAqICAgLnJlY2VpdmUoXCJva1wiLCBwYXlsb2FkID0+IGNvbnNvbGUubG9nKFwicGhvZW5peCByZXBsaWVkOlwiLCBwYXlsb2FkKSlcbiAgICogICAucmVjZWl2ZShcImVycm9yXCIsIGVyciA9PiBjb25zb2xlLmxvZyhcInBob2VuaXggZXJyb3JlZFwiLCBlcnIpKVxuICAgKiAgIC5yZWNlaXZlKFwidGltZW91dFwiLCAoKSA9PiBjb25zb2xlLmxvZyhcInRpbWVkIG91dCBwdXNoaW5nXCIpKVxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRcbiAgICogQHBhcmFtIHtPYmplY3R9IHBheWxvYWRcbiAgICogQHBhcmFtIHtudW1iZXJ9IFt0aW1lb3V0XVxuICAgKiBAcmV0dXJucyB7UHVzaH1cbiAgICovXG4gIHB1c2goZXZlbnQsIHBheWxvYWQsIHRpbWVvdXQgPSB0aGlzLnRpbWVvdXQpe1xuICAgIHBheWxvYWQgPSBwYXlsb2FkIHx8IHt9XG4gICAgaWYoIXRoaXMuam9pbmVkT25jZSl7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHRyaWVkIHRvIHB1c2ggJyR7ZXZlbnR9JyB0byAnJHt0aGlzLnRvcGljfScgYmVmb3JlIGpvaW5pbmcuIFVzZSBjaGFubmVsLmpvaW4oKSBiZWZvcmUgcHVzaGluZyBldmVudHNgKVxuICAgIH1cbiAgICBsZXQgcHVzaEV2ZW50ID0gbmV3IFB1c2godGhpcywgZXZlbnQsIGZ1bmN0aW9uICgpeyByZXR1cm4gcGF5bG9hZCB9LCB0aW1lb3V0KVxuICAgIGlmKHRoaXMuY2FuUHVzaCgpKXtcbiAgICAgIHB1c2hFdmVudC5zZW5kKClcbiAgICB9IGVsc2Uge1xuICAgICAgcHVzaEV2ZW50LnN0YXJ0VGltZW91dCgpXG4gICAgICB0aGlzLnB1c2hCdWZmZXIucHVzaChwdXNoRXZlbnQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHB1c2hFdmVudFxuICB9XG5cbiAgLyoqIExlYXZlcyB0aGUgY2hhbm5lbFxuICAgKlxuICAgKiBVbnN1YnNjcmliZXMgZnJvbSBzZXJ2ZXIgZXZlbnRzLCBhbmRcbiAgICogaW5zdHJ1Y3RzIGNoYW5uZWwgdG8gdGVybWluYXRlIG9uIHNlcnZlclxuICAgKlxuICAgKiBUcmlnZ2VycyBvbkNsb3NlKCkgaG9va3NcbiAgICpcbiAgICogVG8gcmVjZWl2ZSBsZWF2ZSBhY2tub3dsZWRnZW1lbnRzLCB1c2UgdGhlIGByZWNlaXZlYFxuICAgKiBob29rIHRvIGJpbmQgdG8gdGhlIHNlcnZlciBhY2ssIGllOlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBjaGFubmVsLmxlYXZlKCkucmVjZWl2ZShcIm9rXCIsICgpID0+IGFsZXJ0KFwibGVmdCFcIikgKVxuICAgKlxuICAgKiBAcGFyYW0ge2ludGVnZXJ9IHRpbWVvdXRcbiAgICogQHJldHVybnMge1B1c2h9XG4gICAqL1xuICBsZWF2ZSh0aW1lb3V0ID0gdGhpcy50aW1lb3V0KXtcbiAgICB0aGlzLnJlam9pblRpbWVyLnJlc2V0KClcbiAgICB0aGlzLmpvaW5QdXNoLmNhbmNlbFRpbWVvdXQoKVxuXG4gICAgdGhpcy5zdGF0ZSA9IENIQU5ORUxfU1RBVEVTLmxlYXZpbmdcbiAgICBsZXQgb25DbG9zZSA9ICgpID0+IHtcbiAgICAgIGlmKHRoaXMuc29ja2V0Lmhhc0xvZ2dlcigpKSB0aGlzLnNvY2tldC5sb2coXCJjaGFubmVsXCIsIGBsZWF2ZSAke3RoaXMudG9waWN9YClcbiAgICAgIHRoaXMudHJpZ2dlcihDSEFOTkVMX0VWRU5UUy5jbG9zZSwgXCJsZWF2ZVwiKVxuICAgIH1cbiAgICBsZXQgbGVhdmVQdXNoID0gbmV3IFB1c2godGhpcywgQ0hBTk5FTF9FVkVOVFMubGVhdmUsIGNsb3N1cmUoe30pLCB0aW1lb3V0KVxuICAgIGxlYXZlUHVzaC5yZWNlaXZlKFwib2tcIiwgKCkgPT4gb25DbG9zZSgpKVxuICAgICAgLnJlY2VpdmUoXCJ0aW1lb3V0XCIsICgpID0+IG9uQ2xvc2UoKSlcbiAgICBsZWF2ZVB1c2guc2VuZCgpXG4gICAgaWYoIXRoaXMuY2FuUHVzaCgpKXsgbGVhdmVQdXNoLnRyaWdnZXIoXCJva1wiLCB7fSkgfVxuXG4gICAgcmV0dXJuIGxlYXZlUHVzaFxuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJyaWRhYmxlIG1lc3NhZ2UgaG9va1xuICAgKlxuICAgKiBSZWNlaXZlcyBhbGwgZXZlbnRzIGZvciBzcGVjaWFsaXplZCBtZXNzYWdlIGhhbmRsaW5nXG4gICAqIGJlZm9yZSBkaXNwYXRjaGluZyB0byB0aGUgY2hhbm5lbCBjYWxsYmFja3MuXG4gICAqXG4gICAqIE11c3QgcmV0dXJuIHRoZSBwYXlsb2FkLCBtb2RpZmllZCBvciB1bm1vZGlmaWVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gcGF5bG9hZFxuICAgKiBAcGFyYW0ge2ludGVnZXJ9IHJlZlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgKi9cbiAgb25NZXNzYWdlKF9ldmVudCwgcGF5bG9hZCwgX3JlZil7IHJldHVybiBwYXlsb2FkIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGlzTWVtYmVyKHRvcGljLCBldmVudCwgcGF5bG9hZCwgam9pblJlZil7XG4gICAgaWYodGhpcy50b3BpYyAhPT0gdG9waWMpeyByZXR1cm4gZmFsc2UgfVxuXG4gICAgaWYoam9pblJlZiAmJiBqb2luUmVmICE9PSB0aGlzLmpvaW5SZWYoKSl7XG4gICAgICBpZih0aGlzLnNvY2tldC5oYXNMb2dnZXIoKSkgdGhpcy5zb2NrZXQubG9nKFwiY2hhbm5lbFwiLCBcImRyb3BwaW5nIG91dGRhdGVkIG1lc3NhZ2VcIiwge3RvcGljLCBldmVudCwgcGF5bG9hZCwgam9pblJlZn0pXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGpvaW5SZWYoKXsgcmV0dXJuIHRoaXMuam9pblB1c2gucmVmIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHJlam9pbih0aW1lb3V0ID0gdGhpcy50aW1lb3V0KXtcbiAgICBpZih0aGlzLmlzTGVhdmluZygpKXsgcmV0dXJuIH1cbiAgICB0aGlzLnNvY2tldC5sZWF2ZU9wZW5Ub3BpYyh0aGlzLnRvcGljKVxuICAgIHRoaXMuc3RhdGUgPSBDSEFOTkVMX1NUQVRFUy5qb2luaW5nXG4gICAgdGhpcy5qb2luUHVzaC5yZXNlbmQodGltZW91dClcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdHJpZ2dlcihldmVudCwgcGF5bG9hZCwgcmVmLCBqb2luUmVmKXtcbiAgICBsZXQgaGFuZGxlZFBheWxvYWQgPSB0aGlzLm9uTWVzc2FnZShldmVudCwgcGF5bG9hZCwgcmVmLCBqb2luUmVmKVxuICAgIGlmKHBheWxvYWQgJiYgIWhhbmRsZWRQYXlsb2FkKXsgdGhyb3cgbmV3IEVycm9yKFwiY2hhbm5lbCBvbk1lc3NhZ2UgY2FsbGJhY2tzIG11c3QgcmV0dXJuIHRoZSBwYXlsb2FkLCBtb2RpZmllZCBvciB1bm1vZGlmaWVkXCIpIH1cblxuICAgIGxldCBldmVudEJpbmRpbmdzID0gdGhpcy5iaW5kaW5ncy5maWx0ZXIoYmluZCA9PiBiaW5kLmV2ZW50ID09PSBldmVudClcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBldmVudEJpbmRpbmdzLmxlbmd0aDsgaSsrKXtcbiAgICAgIGxldCBiaW5kID0gZXZlbnRCaW5kaW5nc1tpXVxuICAgICAgYmluZC5jYWxsYmFjayhoYW5kbGVkUGF5bG9hZCwgcmVmLCBqb2luUmVmIHx8IHRoaXMuam9pblJlZigpKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcmVwbHlFdmVudE5hbWUocmVmKXsgcmV0dXJuIGBjaGFuX3JlcGx5XyR7cmVmfWAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaXNDbG9zZWQoKXsgcmV0dXJuIHRoaXMuc3RhdGUgPT09IENIQU5ORUxfU1RBVEVTLmNsb3NlZCB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpc0Vycm9yZWQoKXsgcmV0dXJuIHRoaXMuc3RhdGUgPT09IENIQU5ORUxfU1RBVEVTLmVycm9yZWQgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaXNKb2luZWQoKXsgcmV0dXJuIHRoaXMuc3RhdGUgPT09IENIQU5ORUxfU1RBVEVTLmpvaW5lZCB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpc0pvaW5pbmcoKXsgcmV0dXJuIHRoaXMuc3RhdGUgPT09IENIQU5ORUxfU1RBVEVTLmpvaW5pbmcgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaXNMZWF2aW5nKCl7IHJldHVybiB0aGlzLnN0YXRlID09PSBDSEFOTkVMX1NUQVRFUy5sZWF2aW5nIH1cbn1cbiIsICJpbXBvcnQge1xuICBnbG9iYWwsXG4gIFhIUl9TVEFURVNcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWpheCB7XG5cbiAgc3RhdGljIHJlcXVlc3QobWV0aG9kLCBlbmRQb2ludCwgYWNjZXB0LCBib2R5LCB0aW1lb3V0LCBvbnRpbWVvdXQsIGNhbGxiYWNrKXtcbiAgICBpZihnbG9iYWwuWERvbWFpblJlcXVlc3Qpe1xuICAgICAgbGV0IHJlcSA9IG5ldyBnbG9iYWwuWERvbWFpblJlcXVlc3QoKSAvLyBJRTgsIElFOVxuICAgICAgcmV0dXJuIHRoaXMueGRvbWFpblJlcXVlc3QocmVxLCBtZXRob2QsIGVuZFBvaW50LCBib2R5LCB0aW1lb3V0LCBvbnRpbWVvdXQsIGNhbGxiYWNrKVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgcmVxID0gbmV3IGdsb2JhbC5YTUxIdHRwUmVxdWVzdCgpIC8vIElFNyssIEZpcmVmb3gsIENocm9tZSwgT3BlcmEsIFNhZmFyaVxuICAgICAgcmV0dXJuIHRoaXMueGhyUmVxdWVzdChyZXEsIG1ldGhvZCwgZW5kUG9pbnQsIGFjY2VwdCwgYm9keSwgdGltZW91dCwgb250aW1lb3V0LCBjYWxsYmFjaylcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgeGRvbWFpblJlcXVlc3QocmVxLCBtZXRob2QsIGVuZFBvaW50LCBib2R5LCB0aW1lb3V0LCBvbnRpbWVvdXQsIGNhbGxiYWNrKXtcbiAgICByZXEudGltZW91dCA9IHRpbWVvdXRcbiAgICByZXEub3BlbihtZXRob2QsIGVuZFBvaW50KVxuICAgIHJlcS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICBsZXQgcmVzcG9uc2UgPSB0aGlzLnBhcnNlSlNPTihyZXEucmVzcG9uc2VUZXh0KVxuICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2socmVzcG9uc2UpXG4gICAgfVxuICAgIGlmKG9udGltZW91dCl7IHJlcS5vbnRpbWVvdXQgPSBvbnRpbWVvdXQgfVxuXG4gICAgLy8gV29yayBhcm91bmQgYnVnIGluIElFOSB0aGF0IHJlcXVpcmVzIGFuIGF0dGFjaGVkIG9ucHJvZ3Jlc3MgaGFuZGxlclxuICAgIHJlcS5vbnByb2dyZXNzID0gKCkgPT4geyB9XG5cbiAgICByZXEuc2VuZChib2R5KVxuICAgIHJldHVybiByZXFcbiAgfVxuXG4gIHN0YXRpYyB4aHJSZXF1ZXN0KHJlcSwgbWV0aG9kLCBlbmRQb2ludCwgYWNjZXB0LCBib2R5LCB0aW1lb3V0LCBvbnRpbWVvdXQsIGNhbGxiYWNrKXtcbiAgICByZXEub3BlbihtZXRob2QsIGVuZFBvaW50LCB0cnVlKVxuICAgIHJlcS50aW1lb3V0ID0gdGltZW91dFxuICAgIHJlcS5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIGFjY2VwdClcbiAgICByZXEub25lcnJvciA9ICgpID0+IGNhbGxiYWNrICYmIGNhbGxiYWNrKG51bGwpXG4gICAgcmVxLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcbiAgICAgIGlmKHJlcS5yZWFkeVN0YXRlID09PSBYSFJfU1RBVEVTLmNvbXBsZXRlICYmIGNhbGxiYWNrKXtcbiAgICAgICAgbGV0IHJlc3BvbnNlID0gdGhpcy5wYXJzZUpTT04ocmVxLnJlc3BvbnNlVGV4dClcbiAgICAgICAgY2FsbGJhY2socmVzcG9uc2UpXG4gICAgICB9XG4gICAgfVxuICAgIGlmKG9udGltZW91dCl7IHJlcS5vbnRpbWVvdXQgPSBvbnRpbWVvdXQgfVxuXG4gICAgcmVxLnNlbmQoYm9keSlcbiAgICByZXR1cm4gcmVxXG4gIH1cblxuICBzdGF0aWMgcGFyc2VKU09OKHJlc3Ape1xuICAgIGlmKCFyZXNwIHx8IHJlc3AgPT09IFwiXCIpeyByZXR1cm4gbnVsbCB9XG5cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVzcClcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgIGNvbnNvbGUgJiYgY29uc29sZS5sb2coXCJmYWlsZWQgdG8gcGFyc2UgSlNPTiByZXNwb25zZVwiLCByZXNwKVxuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgc2VyaWFsaXplKG9iaiwgcGFyZW50S2V5KXtcbiAgICBsZXQgcXVlcnlTdHIgPSBbXVxuICAgIGZvcih2YXIga2V5IGluIG9iail7XG4gICAgICBpZighT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSl7IGNvbnRpbnVlIH1cbiAgICAgIGxldCBwYXJhbUtleSA9IHBhcmVudEtleSA/IGAke3BhcmVudEtleX1bJHtrZXl9XWAgOiBrZXlcbiAgICAgIGxldCBwYXJhbVZhbCA9IG9ialtrZXldXG4gICAgICBpZih0eXBlb2YgcGFyYW1WYWwgPT09IFwib2JqZWN0XCIpe1xuICAgICAgICBxdWVyeVN0ci5wdXNoKHRoaXMuc2VyaWFsaXplKHBhcmFtVmFsLCBwYXJhbUtleSkpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBxdWVyeVN0ci5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChwYXJhbUtleSkgKyBcIj1cIiArIGVuY29kZVVSSUNvbXBvbmVudChwYXJhbVZhbCkpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBxdWVyeVN0ci5qb2luKFwiJlwiKVxuICB9XG5cbiAgc3RhdGljIGFwcGVuZFBhcmFtcyh1cmwsIHBhcmFtcyl7XG4gICAgaWYoT2JqZWN0LmtleXMocGFyYW1zKS5sZW5ndGggPT09IDApeyByZXR1cm4gdXJsIH1cblxuICAgIGxldCBwcmVmaXggPSB1cmwubWF0Y2goL1xcPy8pID8gXCImXCIgOiBcIj9cIlxuICAgIHJldHVybiBgJHt1cmx9JHtwcmVmaXh9JHt0aGlzLnNlcmlhbGl6ZShwYXJhbXMpfWBcbiAgfVxufVxuIiwgImltcG9ydCB7XG4gIFNPQ0tFVF9TVEFURVMsXG4gIFRSQU5TUE9SVFNcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuaW1wb3J0IEFqYXggZnJvbSBcIi4vYWpheFwiXG5cbmxldCBhcnJheUJ1ZmZlclRvQmFzZTY0ID0gKGJ1ZmZlcikgPT4ge1xuICBsZXQgYmluYXJ5ID0gXCJcIlxuICBsZXQgYnl0ZXMgPSBuZXcgVWludDhBcnJheShidWZmZXIpXG4gIGxldCBsZW4gPSBieXRlcy5ieXRlTGVuZ3RoXG4gIGZvcihsZXQgaSA9IDA7IGkgPCBsZW47IGkrKyl7IGJpbmFyeSArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGVzW2ldKSB9XG4gIHJldHVybiBidG9hKGJpbmFyeSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9uZ1BvbGwge1xuXG4gIGNvbnN0cnVjdG9yKGVuZFBvaW50KXtcbiAgICB0aGlzLmVuZFBvaW50ID0gbnVsbFxuICAgIHRoaXMudG9rZW4gPSBudWxsXG4gICAgdGhpcy5za2lwSGVhcnRiZWF0ID0gdHJ1ZVxuICAgIHRoaXMucmVxcyA9IG5ldyBTZXQoKVxuICAgIHRoaXMuYXdhaXRpbmdCYXRjaEFjayA9IGZhbHNlXG4gICAgdGhpcy5jdXJyZW50QmF0Y2ggPSBudWxsXG4gICAgdGhpcy5jdXJyZW50QmF0Y2hUaW1lciA9IG51bGxcbiAgICB0aGlzLmJhdGNoQnVmZmVyID0gW11cbiAgICB0aGlzLm9ub3BlbiA9IGZ1bmN0aW9uICgpeyB9IC8vIG5vb3BcbiAgICB0aGlzLm9uZXJyb3IgPSBmdW5jdGlvbiAoKXsgfSAvLyBub29wXG4gICAgdGhpcy5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoKXsgfSAvLyBub29wXG4gICAgdGhpcy5vbmNsb3NlID0gZnVuY3Rpb24gKCl7IH0gLy8gbm9vcFxuICAgIHRoaXMucG9sbEVuZHBvaW50ID0gdGhpcy5ub3JtYWxpemVFbmRwb2ludChlbmRQb2ludClcbiAgICB0aGlzLnJlYWR5U3RhdGUgPSBTT0NLRVRfU1RBVEVTLmNvbm5lY3RpbmdcbiAgICAvLyB3ZSBtdXN0IHdhaXQgZm9yIHRoZSBjYWxsZXIgdG8gZmluaXNoIHNldHRpbmcgdXAgb3VyIGNhbGxiYWNrcyBhbmQgdGltZW91dCBwcm9wZXJ0aWVzXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnBvbGwoKSwgMClcbiAgfVxuXG4gIG5vcm1hbGl6ZUVuZHBvaW50KGVuZFBvaW50KXtcbiAgICByZXR1cm4gKGVuZFBvaW50XG4gICAgICAucmVwbGFjZShcIndzOi8vXCIsIFwiaHR0cDovL1wiKVxuICAgICAgLnJlcGxhY2UoXCJ3c3M6Ly9cIiwgXCJodHRwczovL1wiKVxuICAgICAgLnJlcGxhY2UobmV3IFJlZ0V4cChcIiguKilcXC9cIiArIFRSQU5TUE9SVFMud2Vic29ja2V0KSwgXCIkMS9cIiArIFRSQU5TUE9SVFMubG9uZ3BvbGwpKVxuICB9XG5cbiAgZW5kcG9pbnRVUkwoKXtcbiAgICByZXR1cm4gQWpheC5hcHBlbmRQYXJhbXModGhpcy5wb2xsRW5kcG9pbnQsIHt0b2tlbjogdGhpcy50b2tlbn0pXG4gIH1cblxuICBjbG9zZUFuZFJldHJ5KGNvZGUsIHJlYXNvbiwgd2FzQ2xlYW4pe1xuICAgIHRoaXMuY2xvc2UoY29kZSwgcmVhc29uLCB3YXNDbGVhbilcbiAgICB0aGlzLnJlYWR5U3RhdGUgPSBTT0NLRVRfU1RBVEVTLmNvbm5lY3RpbmdcbiAgfVxuXG4gIG9udGltZW91dCgpe1xuICAgIHRoaXMub25lcnJvcihcInRpbWVvdXRcIilcbiAgICB0aGlzLmNsb3NlQW5kUmV0cnkoMTAwNSwgXCJ0aW1lb3V0XCIsIGZhbHNlKVxuICB9XG5cbiAgaXNBY3RpdmUoKXsgcmV0dXJuIHRoaXMucmVhZHlTdGF0ZSA9PT0gU09DS0VUX1NUQVRFUy5vcGVuIHx8IHRoaXMucmVhZHlTdGF0ZSA9PT0gU09DS0VUX1NUQVRFUy5jb25uZWN0aW5nIH1cblxuICBwb2xsKCl7XG4gICAgdGhpcy5hamF4KFwiR0VUXCIsIFwiYXBwbGljYXRpb24vanNvblwiLCBudWxsLCAoKSA9PiB0aGlzLm9udGltZW91dCgpLCByZXNwID0+IHtcbiAgICAgIGlmKHJlc3Ape1xuICAgICAgICB2YXIge3N0YXR1cywgdG9rZW4sIG1lc3NhZ2VzfSA9IHJlc3BcbiAgICAgICAgdGhpcy50b2tlbiA9IHRva2VuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGF0dXMgPSAwXG4gICAgICB9XG5cbiAgICAgIHN3aXRjaChzdGF0dXMpe1xuICAgICAgICBjYXNlIDIwMDpcbiAgICAgICAgICBtZXNzYWdlcy5mb3JFYWNoKG1zZyA9PiB7XG4gICAgICAgICAgICAvLyBUYXNrcyBhcmUgd2hhdCB0aGluZ3MgbGlrZSBldmVudCBoYW5kbGVycywgc2V0VGltZW91dCBjYWxsYmFja3MsXG4gICAgICAgICAgICAvLyBwcm9taXNlIHJlc29sdmVzIGFuZCBtb3JlIGFyZSBydW4gd2l0aGluLlxuICAgICAgICAgICAgLy8gSW4gbW9kZXJuIGJyb3dzZXJzLCB0aGVyZSBhcmUgdHdvIGRpZmZlcmVudCBraW5kcyBvZiB0YXNrcyxcbiAgICAgICAgICAgIC8vIG1pY3JvdGFza3MgYW5kIG1hY3JvdGFza3MuXG4gICAgICAgICAgICAvLyBNaWNyb3Rhc2tzIGFyZSBtYWlubHkgdXNlZCBmb3IgUHJvbWlzZXMsIHdoaWxlIG1hY3JvdGFza3MgYXJlXG4gICAgICAgICAgICAvLyB1c2VkIGZvciBldmVyeXRoaW5nIGVsc2UuXG4gICAgICAgICAgICAvLyBNaWNyb3Rhc2tzIGFsd2F5cyBoYXZlIHByaW9yaXR5IG92ZXIgbWFjcm90YXNrcy4gSWYgdGhlIEpTIGVuZ2luZVxuICAgICAgICAgICAgLy8gaXMgbG9va2luZyBmb3IgYSB0YXNrIHRvIHJ1biwgaXQgd2lsbCBhbHdheXMgdHJ5IHRvIGVtcHR5IHRoZVxuICAgICAgICAgICAgLy8gbWljcm90YXNrIHF1ZXVlIGJlZm9yZSBhdHRlbXB0aW5nIHRvIHJ1biBhbnl0aGluZyBmcm9tIHRoZVxuICAgICAgICAgICAgLy8gbWFjcm90YXNrIHF1ZXVlLlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIEZvciB0aGUgV2ViU29ja2V0IHRyYW5zcG9ydCwgbWVzc2FnZXMgYWx3YXlzIGFycml2ZSBpbiB0aGVpciBvd25cbiAgICAgICAgICAgIC8vIGV2ZW50LiBUaGlzIG1lYW5zIHRoYXQgaWYgYW55IHByb21pc2VzIGFyZSByZXNvbHZlZCBmcm9tIHdpdGhpbixcbiAgICAgICAgICAgIC8vIHRoZWlyIGNhbGxiYWNrcyB3aWxsIGFsd2F5cyBmaW5pc2ggZXhlY3V0aW9uIGJ5IHRoZSB0aW1lIHRoZVxuICAgICAgICAgICAgLy8gbmV4dCBtZXNzYWdlIGV2ZW50IGhhbmRsZXIgaXMgcnVuLlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIEluIG9yZGVyIHRvIGVtdWxhdGUgdGhpcyBiZWhhdmlvdXIsIHdlIG5lZWQgdG8gbWFrZSBzdXJlIGVhY2hcbiAgICAgICAgICAgIC8vIG9ubWVzc2FnZSBoYW5kbGVyIGlzIHJ1biB3aXRoaW4gaXRzIG93biBtYWNyb3Rhc2suXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMub25tZXNzYWdlKHtkYXRhOiBtc2d9KSwgMClcbiAgICAgICAgICB9KVxuICAgICAgICAgIHRoaXMucG9sbCgpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAyMDQ6XG4gICAgICAgICAgdGhpcy5wb2xsKClcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDQxMDpcbiAgICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBTT0NLRVRfU1RBVEVTLm9wZW5cbiAgICAgICAgICB0aGlzLm9ub3Blbih7fSlcbiAgICAgICAgICB0aGlzLnBvbGwoKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgNDAzOlxuICAgICAgICAgIHRoaXMub25lcnJvcig0MDMpXG4gICAgICAgICAgdGhpcy5jbG9zZSgxMDA4LCBcImZvcmJpZGRlblwiLCBmYWxzZSlcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgIGNhc2UgNTAwOlxuICAgICAgICAgIHRoaXMub25lcnJvcig1MDApXG4gICAgICAgICAgdGhpcy5jbG9zZUFuZFJldHJ5KDEwMTEsIFwiaW50ZXJuYWwgc2VydmVyIGVycm9yXCIsIDUwMClcbiAgICAgICAgICBicmVha1xuICAgICAgICBkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoYHVuaGFuZGxlZCBwb2xsIHN0YXR1cyAke3N0YXR1c31gKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvLyB3ZSBjb2xsZWN0IGFsbCBwdXNoZXMgd2l0aGluIHRoZSBjdXJyZW50IGV2ZW50IGxvb3AgYnlcbiAgLy8gc2V0VGltZW91dCAwLCB3aGljaCBvcHRpbWl6ZXMgYmFjay10by1iYWNrIHByb2NlZHVyYWxcbiAgLy8gcHVzaGVzIGFnYWluc3QgYW4gZW1wdHkgYnVmZmVyXG5cbiAgc2VuZChib2R5KXtcbiAgICBpZih0eXBlb2YoYm9keSkgIT09IFwic3RyaW5nXCIpeyBib2R5ID0gYXJyYXlCdWZmZXJUb0Jhc2U2NChib2R5KSB9XG4gICAgaWYodGhpcy5jdXJyZW50QmF0Y2gpe1xuICAgICAgdGhpcy5jdXJyZW50QmF0Y2gucHVzaChib2R5KVxuICAgIH0gZWxzZSBpZih0aGlzLmF3YWl0aW5nQmF0Y2hBY2spe1xuICAgICAgdGhpcy5iYXRjaEJ1ZmZlci5wdXNoKGJvZHkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3VycmVudEJhdGNoID0gW2JvZHldXG4gICAgICB0aGlzLmN1cnJlbnRCYXRjaFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuYmF0Y2hTZW5kKHRoaXMuY3VycmVudEJhdGNoKVxuICAgICAgICB0aGlzLmN1cnJlbnRCYXRjaCA9IG51bGxcbiAgICAgIH0sIDApXG4gICAgfVxuICB9XG5cbiAgYmF0Y2hTZW5kKG1lc3NhZ2VzKXtcbiAgICB0aGlzLmF3YWl0aW5nQmF0Y2hBY2sgPSB0cnVlXG4gICAgdGhpcy5hamF4KFwiUE9TVFwiLCBcImFwcGxpY2F0aW9uL3gtbmRqc29uXCIsIG1lc3NhZ2VzLmpvaW4oXCJcXG5cIiksICgpID0+IHRoaXMub25lcnJvcihcInRpbWVvdXRcIiksIHJlc3AgPT4ge1xuICAgICAgdGhpcy5hd2FpdGluZ0JhdGNoQWNrID0gZmFsc2VcbiAgICAgIGlmKCFyZXNwIHx8IHJlc3Auc3RhdHVzICE9PSAyMDApe1xuICAgICAgICB0aGlzLm9uZXJyb3IocmVzcCAmJiByZXNwLnN0YXR1cylcbiAgICAgICAgdGhpcy5jbG9zZUFuZFJldHJ5KDEwMTEsIFwiaW50ZXJuYWwgc2VydmVyIGVycm9yXCIsIGZhbHNlKVxuICAgICAgfSBlbHNlIGlmKHRoaXMuYmF0Y2hCdWZmZXIubGVuZ3RoID4gMCl7XG4gICAgICAgIHRoaXMuYmF0Y2hTZW5kKHRoaXMuYmF0Y2hCdWZmZXIpXG4gICAgICAgIHRoaXMuYmF0Y2hCdWZmZXIgPSBbXVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBjbG9zZShjb2RlLCByZWFzb24sIHdhc0NsZWFuKXtcbiAgICBmb3IobGV0IHJlcSBvZiB0aGlzLnJlcXMpeyByZXEuYWJvcnQoKSB9XG4gICAgdGhpcy5yZWFkeVN0YXRlID0gU09DS0VUX1NUQVRFUy5jbG9zZWRcbiAgICBsZXQgb3B0cyA9IE9iamVjdC5hc3NpZ24oe2NvZGU6IDEwMDAsIHJlYXNvbjogdW5kZWZpbmVkLCB3YXNDbGVhbjogdHJ1ZX0sIHtjb2RlLCByZWFzb24sIHdhc0NsZWFufSlcbiAgICB0aGlzLmJhdGNoQnVmZmVyID0gW11cbiAgICBjbGVhclRpbWVvdXQodGhpcy5jdXJyZW50QmF0Y2hUaW1lcilcbiAgICB0aGlzLmN1cnJlbnRCYXRjaFRpbWVyID0gbnVsbFxuICAgIGlmKHR5cGVvZihDbG9zZUV2ZW50KSAhPT0gXCJ1bmRlZmluZWRcIil7XG4gICAgICB0aGlzLm9uY2xvc2UobmV3IENsb3NlRXZlbnQoXCJjbG9zZVwiLCBvcHRzKSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vbmNsb3NlKG9wdHMpXG4gICAgfVxuICB9XG5cbiAgYWpheChtZXRob2QsIGNvbnRlbnRUeXBlLCBib2R5LCBvbkNhbGxlclRpbWVvdXQsIGNhbGxiYWNrKXtcbiAgICBsZXQgcmVxXG4gICAgbGV0IG9udGltZW91dCA9ICgpID0+IHtcbiAgICAgIHRoaXMucmVxcy5kZWxldGUocmVxKVxuICAgICAgb25DYWxsZXJUaW1lb3V0KClcbiAgICB9XG4gICAgcmVxID0gQWpheC5yZXF1ZXN0KG1ldGhvZCwgdGhpcy5lbmRwb2ludFVSTCgpLCBjb250ZW50VHlwZSwgYm9keSwgdGhpcy50aW1lb3V0LCBvbnRpbWVvdXQsIHJlc3AgPT4ge1xuICAgICAgdGhpcy5yZXFzLmRlbGV0ZShyZXEpXG4gICAgICBpZih0aGlzLmlzQWN0aXZlKCkpeyBjYWxsYmFjayhyZXNwKSB9XG4gICAgfSlcbiAgICB0aGlzLnJlcXMuYWRkKHJlcSlcbiAgfVxufVxuIiwgIi8qKlxuICogSW5pdGlhbGl6ZXMgdGhlIFByZXNlbmNlXG4gKiBAcGFyYW0ge0NoYW5uZWx9IGNoYW5uZWwgLSBUaGUgQ2hhbm5lbFxuICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSBUaGUgb3B0aW9ucyxcbiAqICAgICAgICBmb3IgZXhhbXBsZSBge2V2ZW50czoge3N0YXRlOiBcInN0YXRlXCIsIGRpZmY6IFwiZGlmZlwifX1gXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByZXNlbmNlIHtcblxuICBjb25zdHJ1Y3RvcihjaGFubmVsLCBvcHRzID0ge30pe1xuICAgIGxldCBldmVudHMgPSBvcHRzLmV2ZW50cyB8fCB7c3RhdGU6IFwicHJlc2VuY2Vfc3RhdGVcIiwgZGlmZjogXCJwcmVzZW5jZV9kaWZmXCJ9XG4gICAgdGhpcy5zdGF0ZSA9IHt9XG4gICAgdGhpcy5wZW5kaW5nRGlmZnMgPSBbXVxuICAgIHRoaXMuY2hhbm5lbCA9IGNoYW5uZWxcbiAgICB0aGlzLmpvaW5SZWYgPSBudWxsXG4gICAgdGhpcy5jYWxsZXIgPSB7XG4gICAgICBvbkpvaW46IGZ1bmN0aW9uICgpeyB9LFxuICAgICAgb25MZWF2ZTogZnVuY3Rpb24gKCl7IH0sXG4gICAgICBvblN5bmM6IGZ1bmN0aW9uICgpeyB9XG4gICAgfVxuXG4gICAgdGhpcy5jaGFubmVsLm9uKGV2ZW50cy5zdGF0ZSwgbmV3U3RhdGUgPT4ge1xuICAgICAgbGV0IHtvbkpvaW4sIG9uTGVhdmUsIG9uU3luY30gPSB0aGlzLmNhbGxlclxuXG4gICAgICB0aGlzLmpvaW5SZWYgPSB0aGlzLmNoYW5uZWwuam9pblJlZigpXG4gICAgICB0aGlzLnN0YXRlID0gUHJlc2VuY2Uuc3luY1N0YXRlKHRoaXMuc3RhdGUsIG5ld1N0YXRlLCBvbkpvaW4sIG9uTGVhdmUpXG5cbiAgICAgIHRoaXMucGVuZGluZ0RpZmZzLmZvckVhY2goZGlmZiA9PiB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBQcmVzZW5jZS5zeW5jRGlmZih0aGlzLnN0YXRlLCBkaWZmLCBvbkpvaW4sIG9uTGVhdmUpXG4gICAgICB9KVxuICAgICAgdGhpcy5wZW5kaW5nRGlmZnMgPSBbXVxuICAgICAgb25TeW5jKClcbiAgICB9KVxuXG4gICAgdGhpcy5jaGFubmVsLm9uKGV2ZW50cy5kaWZmLCBkaWZmID0+IHtcbiAgICAgIGxldCB7b25Kb2luLCBvbkxlYXZlLCBvblN5bmN9ID0gdGhpcy5jYWxsZXJcblxuICAgICAgaWYodGhpcy5pblBlbmRpbmdTeW5jU3RhdGUoKSl7XG4gICAgICAgIHRoaXMucGVuZGluZ0RpZmZzLnB1c2goZGlmZilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBQcmVzZW5jZS5zeW5jRGlmZih0aGlzLnN0YXRlLCBkaWZmLCBvbkpvaW4sIG9uTGVhdmUpXG4gICAgICAgIG9uU3luYygpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIG9uSm9pbihjYWxsYmFjayl7IHRoaXMuY2FsbGVyLm9uSm9pbiA9IGNhbGxiYWNrIH1cblxuICBvbkxlYXZlKGNhbGxiYWNrKXsgdGhpcy5jYWxsZXIub25MZWF2ZSA9IGNhbGxiYWNrIH1cblxuICBvblN5bmMoY2FsbGJhY2speyB0aGlzLmNhbGxlci5vblN5bmMgPSBjYWxsYmFjayB9XG5cbiAgbGlzdChieSl7IHJldHVybiBQcmVzZW5jZS5saXN0KHRoaXMuc3RhdGUsIGJ5KSB9XG5cbiAgaW5QZW5kaW5nU3luY1N0YXRlKCl7XG4gICAgcmV0dXJuICF0aGlzLmpvaW5SZWYgfHwgKHRoaXMuam9pblJlZiAhPT0gdGhpcy5jaGFubmVsLmpvaW5SZWYoKSlcbiAgfVxuXG4gIC8vIGxvd2VyLWxldmVsIHB1YmxpYyBzdGF0aWMgQVBJXG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gc3luYyB0aGUgbGlzdCBvZiBwcmVzZW5jZXMgb24gdGhlIHNlcnZlclxuICAgKiB3aXRoIHRoZSBjbGllbnQncyBzdGF0ZS4gQW4gb3B0aW9uYWwgYG9uSm9pbmAgYW5kIGBvbkxlYXZlYCBjYWxsYmFjayBjYW5cbiAgICogYmUgcHJvdmlkZWQgdG8gcmVhY3QgdG8gY2hhbmdlcyBpbiB0aGUgY2xpZW50J3MgbG9jYWwgcHJlc2VuY2VzIGFjcm9zc1xuICAgKiBkaXNjb25uZWN0cyBhbmQgcmVjb25uZWN0cyB3aXRoIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcmVzZW5jZX1cbiAgICovXG4gIHN0YXRpYyBzeW5jU3RhdGUoY3VycmVudFN0YXRlLCBuZXdTdGF0ZSwgb25Kb2luLCBvbkxlYXZlKXtcbiAgICBsZXQgc3RhdGUgPSB0aGlzLmNsb25lKGN1cnJlbnRTdGF0ZSlcbiAgICBsZXQgam9pbnMgPSB7fVxuICAgIGxldCBsZWF2ZXMgPSB7fVxuXG4gICAgdGhpcy5tYXAoc3RhdGUsIChrZXksIHByZXNlbmNlKSA9PiB7XG4gICAgICBpZighbmV3U3RhdGVba2V5XSl7XG4gICAgICAgIGxlYXZlc1trZXldID0gcHJlc2VuY2VcbiAgICAgIH1cbiAgICB9KVxuICAgIHRoaXMubWFwKG5ld1N0YXRlLCAoa2V5LCBuZXdQcmVzZW5jZSkgPT4ge1xuICAgICAgbGV0IGN1cnJlbnRQcmVzZW5jZSA9IHN0YXRlW2tleV1cbiAgICAgIGlmKGN1cnJlbnRQcmVzZW5jZSl7XG4gICAgICAgIGxldCBuZXdSZWZzID0gbmV3UHJlc2VuY2UubWV0YXMubWFwKG0gPT4gbS5waHhfcmVmKVxuICAgICAgICBsZXQgY3VyUmVmcyA9IGN1cnJlbnRQcmVzZW5jZS5tZXRhcy5tYXAobSA9PiBtLnBoeF9yZWYpXG4gICAgICAgIGxldCBqb2luZWRNZXRhcyA9IG5ld1ByZXNlbmNlLm1ldGFzLmZpbHRlcihtID0+IGN1clJlZnMuaW5kZXhPZihtLnBoeF9yZWYpIDwgMClcbiAgICAgICAgbGV0IGxlZnRNZXRhcyA9IGN1cnJlbnRQcmVzZW5jZS5tZXRhcy5maWx0ZXIobSA9PiBuZXdSZWZzLmluZGV4T2YobS5waHhfcmVmKSA8IDApXG4gICAgICAgIGlmKGpvaW5lZE1ldGFzLmxlbmd0aCA+IDApe1xuICAgICAgICAgIGpvaW5zW2tleV0gPSBuZXdQcmVzZW5jZVxuICAgICAgICAgIGpvaW5zW2tleV0ubWV0YXMgPSBqb2luZWRNZXRhc1xuICAgICAgICB9XG4gICAgICAgIGlmKGxlZnRNZXRhcy5sZW5ndGggPiAwKXtcbiAgICAgICAgICBsZWF2ZXNba2V5XSA9IHRoaXMuY2xvbmUoY3VycmVudFByZXNlbmNlKVxuICAgICAgICAgIGxlYXZlc1trZXldLm1ldGFzID0gbGVmdE1ldGFzXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGpvaW5zW2tleV0gPSBuZXdQcmVzZW5jZVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHRoaXMuc3luY0RpZmYoc3RhdGUsIHtqb2luczogam9pbnMsIGxlYXZlczogbGVhdmVzfSwgb25Kb2luLCBvbkxlYXZlKVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIFVzZWQgdG8gc3luYyBhIGRpZmYgb2YgcHJlc2VuY2Ugam9pbiBhbmQgbGVhdmVcbiAgICogZXZlbnRzIGZyb20gdGhlIHNlcnZlciwgYXMgdGhleSBoYXBwZW4uIExpa2UgYHN5bmNTdGF0ZWAsIGBzeW5jRGlmZmBcbiAgICogYWNjZXB0cyBvcHRpb25hbCBgb25Kb2luYCBhbmQgYG9uTGVhdmVgIGNhbGxiYWNrcyB0byByZWFjdCB0byBhIHVzZXJcbiAgICogam9pbmluZyBvciBsZWF2aW5nIGZyb20gYSBkZXZpY2UuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcmVzZW5jZX1cbiAgICovXG4gIHN0YXRpYyBzeW5jRGlmZihzdGF0ZSwgZGlmZiwgb25Kb2luLCBvbkxlYXZlKXtcbiAgICBsZXQge2pvaW5zLCBsZWF2ZXN9ID0gdGhpcy5jbG9uZShkaWZmKVxuICAgIGlmKCFvbkpvaW4peyBvbkpvaW4gPSBmdW5jdGlvbiAoKXsgfSB9XG4gICAgaWYoIW9uTGVhdmUpeyBvbkxlYXZlID0gZnVuY3Rpb24gKCl7IH0gfVxuXG4gICAgdGhpcy5tYXAoam9pbnMsIChrZXksIG5ld1ByZXNlbmNlKSA9PiB7XG4gICAgICBsZXQgY3VycmVudFByZXNlbmNlID0gc3RhdGVba2V5XVxuICAgICAgc3RhdGVba2V5XSA9IHRoaXMuY2xvbmUobmV3UHJlc2VuY2UpXG4gICAgICBpZihjdXJyZW50UHJlc2VuY2Upe1xuICAgICAgICBsZXQgam9pbmVkUmVmcyA9IHN0YXRlW2tleV0ubWV0YXMubWFwKG0gPT4gbS5waHhfcmVmKVxuICAgICAgICBsZXQgY3VyTWV0YXMgPSBjdXJyZW50UHJlc2VuY2UubWV0YXMuZmlsdGVyKG0gPT4gam9pbmVkUmVmcy5pbmRleE9mKG0ucGh4X3JlZikgPCAwKVxuICAgICAgICBzdGF0ZVtrZXldLm1ldGFzLnVuc2hpZnQoLi4uY3VyTWV0YXMpXG4gICAgICB9XG4gICAgICBvbkpvaW4oa2V5LCBjdXJyZW50UHJlc2VuY2UsIG5ld1ByZXNlbmNlKVxuICAgIH0pXG4gICAgdGhpcy5tYXAobGVhdmVzLCAoa2V5LCBsZWZ0UHJlc2VuY2UpID0+IHtcbiAgICAgIGxldCBjdXJyZW50UHJlc2VuY2UgPSBzdGF0ZVtrZXldXG4gICAgICBpZighY3VycmVudFByZXNlbmNlKXsgcmV0dXJuIH1cbiAgICAgIGxldCByZWZzVG9SZW1vdmUgPSBsZWZ0UHJlc2VuY2UubWV0YXMubWFwKG0gPT4gbS5waHhfcmVmKVxuICAgICAgY3VycmVudFByZXNlbmNlLm1ldGFzID0gY3VycmVudFByZXNlbmNlLm1ldGFzLmZpbHRlcihwID0+IHtcbiAgICAgICAgcmV0dXJuIHJlZnNUb1JlbW92ZS5pbmRleE9mKHAucGh4X3JlZikgPCAwXG4gICAgICB9KVxuICAgICAgb25MZWF2ZShrZXksIGN1cnJlbnRQcmVzZW5jZSwgbGVmdFByZXNlbmNlKVxuICAgICAgaWYoY3VycmVudFByZXNlbmNlLm1ldGFzLmxlbmd0aCA9PT0gMCl7XG4gICAgICAgIGRlbGV0ZSBzdGF0ZVtrZXldXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gc3RhdGVcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcmVzZW5jZXMsIHdpdGggc2VsZWN0ZWQgbWV0YWRhdGEuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcmVzZW5jZXNcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2hvb3NlclxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJlc2VuY2V9XG4gICAqL1xuICBzdGF0aWMgbGlzdChwcmVzZW5jZXMsIGNob29zZXIpe1xuICAgIGlmKCFjaG9vc2VyKXsgY2hvb3NlciA9IGZ1bmN0aW9uIChrZXksIHByZXMpeyByZXR1cm4gcHJlcyB9IH1cblxuICAgIHJldHVybiB0aGlzLm1hcChwcmVzZW5jZXMsIChrZXksIHByZXNlbmNlKSA9PiB7XG4gICAgICByZXR1cm4gY2hvb3NlcihrZXksIHByZXNlbmNlKVxuICAgIH0pXG4gIH1cblxuICAvLyBwcml2YXRlXG5cbiAgc3RhdGljIG1hcChvYmosIGZ1bmMpe1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopLm1hcChrZXkgPT4gZnVuYyhrZXksIG9ialtrZXldKSlcbiAgfVxuXG4gIHN0YXRpYyBjbG9uZShvYmopeyByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKSB9XG59XG4iLCAiLyogVGhlIGRlZmF1bHQgc2VyaWFsaXplciBmb3IgZW5jb2RpbmcgYW5kIGRlY29kaW5nIG1lc3NhZ2VzICovXG5pbXBvcnQge1xuICBDSEFOTkVMX0VWRU5UU1xufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIEhFQURFUl9MRU5HVEg6IDEsXG4gIE1FVEFfTEVOR1RIOiA0LFxuICBLSU5EUzoge3B1c2g6IDAsIHJlcGx5OiAxLCBicm9hZGNhc3Q6IDJ9LFxuXG4gIGVuY29kZShtc2csIGNhbGxiYWNrKXtcbiAgICBpZihtc2cucGF5bG9hZC5jb25zdHJ1Y3RvciA9PT0gQXJyYXlCdWZmZXIpe1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKHRoaXMuYmluYXJ5RW5jb2RlKG1zZykpXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBwYXlsb2FkID0gW21zZy5qb2luX3JlZiwgbXNnLnJlZiwgbXNnLnRvcGljLCBtc2cuZXZlbnQsIG1zZy5wYXlsb2FkXVxuICAgICAgcmV0dXJuIGNhbGxiYWNrKEpTT04uc3RyaW5naWZ5KHBheWxvYWQpKVxuICAgIH1cbiAgfSxcblxuICBkZWNvZGUocmF3UGF5bG9hZCwgY2FsbGJhY2spe1xuICAgIGlmKHJhd1BheWxvYWQuY29uc3RydWN0b3IgPT09IEFycmF5QnVmZmVyKXtcbiAgICAgIHJldHVybiBjYWxsYmFjayh0aGlzLmJpbmFyeURlY29kZShyYXdQYXlsb2FkKSlcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IFtqb2luX3JlZiwgcmVmLCB0b3BpYywgZXZlbnQsIHBheWxvYWRdID0gSlNPTi5wYXJzZShyYXdQYXlsb2FkKVxuICAgICAgcmV0dXJuIGNhbGxiYWNrKHtqb2luX3JlZiwgcmVmLCB0b3BpYywgZXZlbnQsIHBheWxvYWR9KVxuICAgIH1cbiAgfSxcblxuICAvLyBwcml2YXRlXG5cbiAgYmluYXJ5RW5jb2RlKG1lc3NhZ2Upe1xuICAgIGxldCB7am9pbl9yZWYsIHJlZiwgZXZlbnQsIHRvcGljLCBwYXlsb2FkfSA9IG1lc3NhZ2VcbiAgICBsZXQgbWV0YUxlbmd0aCA9IHRoaXMuTUVUQV9MRU5HVEggKyBqb2luX3JlZi5sZW5ndGggKyByZWYubGVuZ3RoICsgdG9waWMubGVuZ3RoICsgZXZlbnQubGVuZ3RoXG4gICAgbGV0IGhlYWRlciA9IG5ldyBBcnJheUJ1ZmZlcih0aGlzLkhFQURFUl9MRU5HVEggKyBtZXRhTGVuZ3RoKVxuICAgIGxldCB2aWV3ID0gbmV3IERhdGFWaWV3KGhlYWRlcilcbiAgICBsZXQgb2Zmc2V0ID0gMFxuXG4gICAgdmlldy5zZXRVaW50OChvZmZzZXQrKywgdGhpcy5LSU5EUy5wdXNoKSAvLyBraW5kXG4gICAgdmlldy5zZXRVaW50OChvZmZzZXQrKywgam9pbl9yZWYubGVuZ3RoKVxuICAgIHZpZXcuc2V0VWludDgob2Zmc2V0KyssIHJlZi5sZW5ndGgpXG4gICAgdmlldy5zZXRVaW50OChvZmZzZXQrKywgdG9waWMubGVuZ3RoKVxuICAgIHZpZXcuc2V0VWludDgob2Zmc2V0KyssIGV2ZW50Lmxlbmd0aClcbiAgICBBcnJheS5mcm9tKGpvaW5fcmVmLCBjaGFyID0+IHZpZXcuc2V0VWludDgob2Zmc2V0KyssIGNoYXIuY2hhckNvZGVBdCgwKSkpXG4gICAgQXJyYXkuZnJvbShyZWYsIGNoYXIgPT4gdmlldy5zZXRVaW50OChvZmZzZXQrKywgY2hhci5jaGFyQ29kZUF0KDApKSlcbiAgICBBcnJheS5mcm9tKHRvcGljLCBjaGFyID0+IHZpZXcuc2V0VWludDgob2Zmc2V0KyssIGNoYXIuY2hhckNvZGVBdCgwKSkpXG4gICAgQXJyYXkuZnJvbShldmVudCwgY2hhciA9PiB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCBjaGFyLmNoYXJDb2RlQXQoMCkpKVxuXG4gICAgdmFyIGNvbWJpbmVkID0gbmV3IFVpbnQ4QXJyYXkoaGVhZGVyLmJ5dGVMZW5ndGggKyBwYXlsb2FkLmJ5dGVMZW5ndGgpXG4gICAgY29tYmluZWQuc2V0KG5ldyBVaW50OEFycmF5KGhlYWRlciksIDApXG4gICAgY29tYmluZWQuc2V0KG5ldyBVaW50OEFycmF5KHBheWxvYWQpLCBoZWFkZXIuYnl0ZUxlbmd0aClcblxuICAgIHJldHVybiBjb21iaW5lZC5idWZmZXJcbiAgfSxcblxuICBiaW5hcnlEZWNvZGUoYnVmZmVyKXtcbiAgICBsZXQgdmlldyA9IG5ldyBEYXRhVmlldyhidWZmZXIpXG4gICAgbGV0IGtpbmQgPSB2aWV3LmdldFVpbnQ4KDApXG4gICAgbGV0IGRlY29kZXIgPSBuZXcgVGV4dERlY29kZXIoKVxuICAgIHN3aXRjaChraW5kKXtcbiAgICAgIGNhc2UgdGhpcy5LSU5EUy5wdXNoOiByZXR1cm4gdGhpcy5kZWNvZGVQdXNoKGJ1ZmZlciwgdmlldywgZGVjb2RlcilcbiAgICAgIGNhc2UgdGhpcy5LSU5EUy5yZXBseTogcmV0dXJuIHRoaXMuZGVjb2RlUmVwbHkoYnVmZmVyLCB2aWV3LCBkZWNvZGVyKVxuICAgICAgY2FzZSB0aGlzLktJTkRTLmJyb2FkY2FzdDogcmV0dXJuIHRoaXMuZGVjb2RlQnJvYWRjYXN0KGJ1ZmZlciwgdmlldywgZGVjb2RlcilcbiAgICB9XG4gIH0sXG5cbiAgZGVjb2RlUHVzaChidWZmZXIsIHZpZXcsIGRlY29kZXIpe1xuICAgIGxldCBqb2luUmVmU2l6ZSA9IHZpZXcuZ2V0VWludDgoMSlcbiAgICBsZXQgdG9waWNTaXplID0gdmlldy5nZXRVaW50OCgyKVxuICAgIGxldCBldmVudFNpemUgPSB2aWV3LmdldFVpbnQ4KDMpXG4gICAgbGV0IG9mZnNldCA9IHRoaXMuSEVBREVSX0xFTkdUSCArIHRoaXMuTUVUQV9MRU5HVEggLSAxIC8vIHB1c2hlcyBoYXZlIG5vIHJlZlxuICAgIGxldCBqb2luUmVmID0gZGVjb2Rlci5kZWNvZGUoYnVmZmVyLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgam9pblJlZlNpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIGpvaW5SZWZTaXplXG4gICAgbGV0IHRvcGljID0gZGVjb2Rlci5kZWNvZGUoYnVmZmVyLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgdG9waWNTaXplKSlcbiAgICBvZmZzZXQgPSBvZmZzZXQgKyB0b3BpY1NpemVcbiAgICBsZXQgZXZlbnQgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBldmVudFNpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIGV2ZW50U2l6ZVxuICAgIGxldCBkYXRhID0gYnVmZmVyLnNsaWNlKG9mZnNldCwgYnVmZmVyLmJ5dGVMZW5ndGgpXG4gICAgcmV0dXJuIHtqb2luX3JlZjogam9pblJlZiwgcmVmOiBudWxsLCB0b3BpYzogdG9waWMsIGV2ZW50OiBldmVudCwgcGF5bG9hZDogZGF0YX1cbiAgfSxcblxuICBkZWNvZGVSZXBseShidWZmZXIsIHZpZXcsIGRlY29kZXIpe1xuICAgIGxldCBqb2luUmVmU2l6ZSA9IHZpZXcuZ2V0VWludDgoMSlcbiAgICBsZXQgcmVmU2l6ZSA9IHZpZXcuZ2V0VWludDgoMilcbiAgICBsZXQgdG9waWNTaXplID0gdmlldy5nZXRVaW50OCgzKVxuICAgIGxldCBldmVudFNpemUgPSB2aWV3LmdldFVpbnQ4KDQpXG4gICAgbGV0IG9mZnNldCA9IHRoaXMuSEVBREVSX0xFTkdUSCArIHRoaXMuTUVUQV9MRU5HVEhcbiAgICBsZXQgam9pblJlZiA9IGRlY29kZXIuZGVjb2RlKGJ1ZmZlci5zbGljZShvZmZzZXQsIG9mZnNldCArIGpvaW5SZWZTaXplKSlcbiAgICBvZmZzZXQgPSBvZmZzZXQgKyBqb2luUmVmU2l6ZVxuICAgIGxldCByZWYgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyByZWZTaXplKSlcbiAgICBvZmZzZXQgPSBvZmZzZXQgKyByZWZTaXplXG4gICAgbGV0IHRvcGljID0gZGVjb2Rlci5kZWNvZGUoYnVmZmVyLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgdG9waWNTaXplKSlcbiAgICBvZmZzZXQgPSBvZmZzZXQgKyB0b3BpY1NpemVcbiAgICBsZXQgZXZlbnQgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBldmVudFNpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIGV2ZW50U2l6ZVxuICAgIGxldCBkYXRhID0gYnVmZmVyLnNsaWNlKG9mZnNldCwgYnVmZmVyLmJ5dGVMZW5ndGgpXG4gICAgbGV0IHBheWxvYWQgPSB7c3RhdHVzOiBldmVudCwgcmVzcG9uc2U6IGRhdGF9XG4gICAgcmV0dXJuIHtqb2luX3JlZjogam9pblJlZiwgcmVmOiByZWYsIHRvcGljOiB0b3BpYywgZXZlbnQ6IENIQU5ORUxfRVZFTlRTLnJlcGx5LCBwYXlsb2FkOiBwYXlsb2FkfVxuICB9LFxuXG4gIGRlY29kZUJyb2FkY2FzdChidWZmZXIsIHZpZXcsIGRlY29kZXIpe1xuICAgIGxldCB0b3BpY1NpemUgPSB2aWV3LmdldFVpbnQ4KDEpXG4gICAgbGV0IGV2ZW50U2l6ZSA9IHZpZXcuZ2V0VWludDgoMilcbiAgICBsZXQgb2Zmc2V0ID0gdGhpcy5IRUFERVJfTEVOR1RIICsgMlxuICAgIGxldCB0b3BpYyA9IGRlY29kZXIuZGVjb2RlKGJ1ZmZlci5zbGljZShvZmZzZXQsIG9mZnNldCArIHRvcGljU2l6ZSkpXG4gICAgb2Zmc2V0ID0gb2Zmc2V0ICsgdG9waWNTaXplXG4gICAgbGV0IGV2ZW50ID0gZGVjb2Rlci5kZWNvZGUoYnVmZmVyLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgZXZlbnRTaXplKSlcbiAgICBvZmZzZXQgPSBvZmZzZXQgKyBldmVudFNpemVcbiAgICBsZXQgZGF0YSA9IGJ1ZmZlci5zbGljZShvZmZzZXQsIGJ1ZmZlci5ieXRlTGVuZ3RoKVxuXG4gICAgcmV0dXJuIHtqb2luX3JlZjogbnVsbCwgcmVmOiBudWxsLCB0b3BpYzogdG9waWMsIGV2ZW50OiBldmVudCwgcGF5bG9hZDogZGF0YX1cbiAgfVxufVxuIiwgImltcG9ydCB7XG4gIGdsb2JhbCxcbiAgcGh4V2luZG93LFxuICBDSEFOTkVMX0VWRU5UUyxcbiAgREVGQVVMVF9USU1FT1VULFxuICBERUZBVUxUX1ZTTixcbiAgU09DS0VUX1NUQVRFUyxcbiAgVFJBTlNQT1JUUyxcbiAgV1NfQ0xPU0VfTk9STUFMXG59IGZyb20gXCIuL2NvbnN0YW50c1wiXG5cbmltcG9ydCB7XG4gIGNsb3N1cmVcbn0gZnJvbSBcIi4vdXRpbHNcIlxuXG5pbXBvcnQgQWpheCBmcm9tIFwiLi9hamF4XCJcbmltcG9ydCBDaGFubmVsIGZyb20gXCIuL2NoYW5uZWxcIlxuaW1wb3J0IExvbmdQb2xsIGZyb20gXCIuL2xvbmdwb2xsXCJcbmltcG9ydCBTZXJpYWxpemVyIGZyb20gXCIuL3NlcmlhbGl6ZXJcIlxuaW1wb3J0IFRpbWVyIGZyb20gXCIuL3RpbWVyXCJcblxuLyoqIEluaXRpYWxpemVzIHRoZSBTb2NrZXQgKlxuICpcbiAqIEZvciBJRTggc3VwcG9ydCB1c2UgYW4gRVM1LXNoaW0gKGh0dHBzOi8vZ2l0aHViLmNvbS9lcy1zaGltcy9lczUtc2hpbSlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZW5kUG9pbnQgLSBUaGUgc3RyaW5nIFdlYlNvY2tldCBlbmRwb2ludCwgaWUsIGBcIndzOi8vZXhhbXBsZS5jb20vc29ja2V0XCJgLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBcIndzczovL2V4YW1wbGUuY29tXCJgXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYFwiL3NvY2tldFwiYCAoaW5oZXJpdGVkIGhvc3QgJiBwcm90b2NvbClcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0c10gLSBPcHRpb25hbCBjb25maWd1cmF0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0cy50cmFuc3BvcnRdIC0gVGhlIFdlYnNvY2tldCBUcmFuc3BvcnQsIGZvciBleGFtcGxlIFdlYlNvY2tldCBvciBQaG9lbml4LkxvbmdQb2xsLlxuICpcbiAqIERlZmF1bHRzIHRvIFdlYlNvY2tldCB3aXRoIGF1dG9tYXRpYyBMb25nUG9sbCBmYWxsYmFjayBpZiBXZWJTb2NrZXQgaXMgbm90IGRlZmluZWQuXG4gKiBUbyBmYWxsYmFjayB0byBMb25nUG9sbCB3aGVuIFdlYlNvY2tldCBhdHRlbXB0cyBmYWlsLCB1c2UgYGxvbmdQb2xsRmFsbGJhY2tNczogMjUwMGAuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdHMubG9uZ1BvbGxGYWxsYmFja01zXSAtIFRoZSBtaWxsaXNlY29uZCB0aW1lIHRvIGF0dGVtcHQgdGhlIHByaW1hcnkgdHJhbnNwb3J0XG4gKiBiZWZvcmUgZmFsbGluZyBiYWNrIHRvIHRoZSBMb25nUG9sbCB0cmFuc3BvcnQuIERpc2FibGVkIGJ5IGRlZmF1bHQuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdHMuZGVidWddIC0gV2hlbiB0cnVlLCBlbmFibGVzIGRlYnVnIGxvZ2dpbmcuIERlZmF1bHQgZmFsc2UuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdHMuZW5jb2RlXSAtIFRoZSBmdW5jdGlvbiB0byBlbmNvZGUgb3V0Z29pbmcgbWVzc2FnZXMuXG4gKlxuICogRGVmYXVsdHMgdG8gSlNPTiBlbmNvZGVyLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRzLmRlY29kZV0gLSBUaGUgZnVuY3Rpb24gdG8gZGVjb2RlIGluY29taW5nIG1lc3NhZ2VzLlxuICpcbiAqIERlZmF1bHRzIHRvIEpTT046XG4gKlxuICogYGBgamF2YXNjcmlwdFxuICogKHBheWxvYWQsIGNhbGxiYWNrKSA9PiBjYWxsYmFjayhKU09OLnBhcnNlKHBheWxvYWQpKVxuICogYGBgXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRzLnRpbWVvdXRdIC0gVGhlIGRlZmF1bHQgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gdHJpZ2dlciBwdXNoIHRpbWVvdXRzLlxuICpcbiAqIERlZmF1bHRzIGBERUZBVUxUX1RJTUVPVVRgXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdHMuaGVhcnRiZWF0SW50ZXJ2YWxNc10gLSBUaGUgbWlsbGlzZWMgaW50ZXJ2YWwgdG8gc2VuZCBhIGhlYXJ0YmVhdCBtZXNzYWdlXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdHMucmVjb25uZWN0QWZ0ZXJNc10gLSBUaGUgb3B0aW9uYWwgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBtaWxsaXNlY1xuICogc29ja2V0IHJlY29ubmVjdCBpbnRlcnZhbC5cbiAqXG4gKiBEZWZhdWx0cyB0byBzdGVwcGVkIGJhY2tvZmYgb2Y6XG4gKlxuICogYGBgamF2YXNjcmlwdFxuICogZnVuY3Rpb24odHJpZXMpe1xuICogICByZXR1cm4gWzEwLCA1MCwgMTAwLCAxNTAsIDIwMCwgMjUwLCA1MDAsIDEwMDAsIDIwMDBdW3RyaWVzIC0gMV0gfHwgNTAwMFxuICogfVxuICogYGBgYFxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0cy5yZWpvaW5BZnRlck1zXSAtIFRoZSBvcHRpb25hbCBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIG1pbGxpc2VjXG4gKiByZWpvaW4gaW50ZXJ2YWwgZm9yIGluZGl2aWR1YWwgY2hhbm5lbHMuXG4gKlxuICogYGBgamF2YXNjcmlwdFxuICogZnVuY3Rpb24odHJpZXMpe1xuICogICByZXR1cm4gWzEwMDAsIDIwMDAsIDUwMDBdW3RyaWVzIC0gMV0gfHwgMTAwMDBcbiAqIH1cbiAqIGBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0cy5sb2dnZXJdIC0gVGhlIG9wdGlvbmFsIGZ1bmN0aW9uIGZvciBzcGVjaWFsaXplZCBsb2dnaW5nLCBpZTpcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBmdW5jdGlvbihraW5kLCBtc2csIGRhdGEpIHtcbiAqICAgY29uc29sZS5sb2coYCR7a2luZH06ICR7bXNnfWAsIGRhdGEpXG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdHMubG9uZ3BvbGxlclRpbWVvdXRdIC0gVGhlIG1heGltdW0gdGltZW91dCBvZiBhIGxvbmcgcG9sbCBBSkFYIHJlcXVlc3QuXG4gKlxuICogRGVmYXVsdHMgdG8gMjBzIChkb3VibGUgdGhlIHNlcnZlciBsb25nIHBvbGwgdGltZXIpLlxuICpcbiAqIEBwYXJhbSB7KE9iamVjdHxmdW5jdGlvbil9IFtvcHRzLnBhcmFtc10gLSBUaGUgb3B0aW9uYWwgcGFyYW1zIHRvIHBhc3Mgd2hlbiBjb25uZWN0aW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW29wdHMuYmluYXJ5VHlwZV0gLSBUaGUgYmluYXJ5IHR5cGUgdG8gdXNlIGZvciBiaW5hcnkgV2ViU29ja2V0IGZyYW1lcy5cbiAqXG4gKiBEZWZhdWx0cyB0byBcImFycmF5YnVmZmVyXCJcbiAqXG4gKiBAcGFyYW0ge3Zzbn0gW29wdHMudnNuXSAtIFRoZSBzZXJpYWxpemVyJ3MgcHJvdG9jb2wgdmVyc2lvbiB0byBzZW5kIG9uIGNvbm5lY3QuXG4gKlxuICogRGVmYXVsdHMgdG8gREVGQVVMVF9WU04uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRzLnNlc3Npb25TdG9yYWdlXSAtIEFuIG9wdGlvbmFsIFN0b3JhZ2UgY29tcGF0aWJsZSBvYmplY3RcbiAqIFBob2VuaXggdXNlcyBzZXNzaW9uU3RvcmFnZSBmb3IgbG9uZ3BvbGwgZmFsbGJhY2sgaGlzdG9yeS4gT3ZlcnJpZGluZyB0aGUgc3RvcmUgaXNcbiAqIHVzZWZ1bCB3aGVuIFBob2VuaXggd29uJ3QgaGF2ZSBhY2Nlc3MgdG8gYHNlc3Npb25TdG9yYWdlYC4gRm9yIGV4YW1wbGUsIFRoaXMgY291bGRcbiAqIGhhcHBlbiBpZiBhIHNpdGUgbG9hZHMgYSBjcm9zcy1kb21haW4gY2hhbm5lbCBpbiBhbiBpZnJhbWUuIEV4YW1wbGUgdXNhZ2U6XG4gKlxuICogICAgIGNsYXNzIEluTWVtb3J5U3RvcmFnZSB7XG4gKiAgICAgICBjb25zdHJ1Y3RvcigpIHsgdGhpcy5zdG9yYWdlID0ge30gfVxuICogICAgICAgZ2V0SXRlbShrZXlOYW1lKSB7IHJldHVybiB0aGlzLnN0b3JhZ2Vba2V5TmFtZV0gfHwgbnVsbCB9XG4gKiAgICAgICByZW1vdmVJdGVtKGtleU5hbWUpIHsgZGVsZXRlIHRoaXMuc3RvcmFnZVtrZXlOYW1lXSB9XG4gKiAgICAgICBzZXRJdGVtKGtleU5hbWUsIGtleVZhbHVlKSB7IHRoaXMuc3RvcmFnZVtrZXlOYW1lXSA9IGtleVZhbHVlIH1cbiAqICAgICB9XG4gKlxuKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNvY2tldCB7XG4gIGNvbnN0cnVjdG9yKGVuZFBvaW50LCBvcHRzID0ge30pe1xuICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MgPSB7b3BlbjogW10sIGNsb3NlOiBbXSwgZXJyb3I6IFtdLCBtZXNzYWdlOiBbXX1cbiAgICB0aGlzLmNoYW5uZWxzID0gW11cbiAgICB0aGlzLnNlbmRCdWZmZXIgPSBbXVxuICAgIHRoaXMucmVmID0gMFxuICAgIHRoaXMudGltZW91dCA9IG9wdHMudGltZW91dCB8fCBERUZBVUxUX1RJTUVPVVRcbiAgICB0aGlzLnRyYW5zcG9ydCA9IG9wdHMudHJhbnNwb3J0IHx8IGdsb2JhbC5XZWJTb2NrZXQgfHwgTG9uZ1BvbGxcbiAgICB0aGlzLmxvbmdQb2xsRmFsbGJhY2tNcyA9IG9wdHMubG9uZ1BvbGxGYWxsYmFja01zXG4gICAgdGhpcy5mYWxsYmFja1RpbWVyID0gbnVsbFxuICAgIHRoaXMuc2Vzc2lvblN0b3JlID0gb3B0cy5zZXNzaW9uU3RvcmFnZSB8fCBnbG9iYWwuc2Vzc2lvblN0b3JhZ2VcbiAgICB0aGlzLmVzdGFibGlzaGVkQ29ubmVjdGlvbnMgPSAwXG4gICAgdGhpcy5kZWZhdWx0RW5jb2RlciA9IFNlcmlhbGl6ZXIuZW5jb2RlLmJpbmQoU2VyaWFsaXplcilcbiAgICB0aGlzLmRlZmF1bHREZWNvZGVyID0gU2VyaWFsaXplci5kZWNvZGUuYmluZChTZXJpYWxpemVyKVxuICAgIHRoaXMuY2xvc2VXYXNDbGVhbiA9IGZhbHNlXG4gICAgdGhpcy5iaW5hcnlUeXBlID0gb3B0cy5iaW5hcnlUeXBlIHx8IFwiYXJyYXlidWZmZXJcIlxuICAgIHRoaXMuY29ubmVjdENsb2NrID0gMVxuICAgIGlmKHRoaXMudHJhbnNwb3J0ICE9PSBMb25nUG9sbCl7XG4gICAgICB0aGlzLmVuY29kZSA9IG9wdHMuZW5jb2RlIHx8IHRoaXMuZGVmYXVsdEVuY29kZXJcbiAgICAgIHRoaXMuZGVjb2RlID0gb3B0cy5kZWNvZGUgfHwgdGhpcy5kZWZhdWx0RGVjb2RlclxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVuY29kZSA9IHRoaXMuZGVmYXVsdEVuY29kZXJcbiAgICAgIHRoaXMuZGVjb2RlID0gdGhpcy5kZWZhdWx0RGVjb2RlclxuICAgIH1cbiAgICBsZXQgYXdhaXRpbmdDb25uZWN0aW9uT25QYWdlU2hvdyA9IG51bGxcbiAgICBpZihwaHhXaW5kb3cgJiYgcGh4V2luZG93LmFkZEV2ZW50TGlzdGVuZXIpe1xuICAgICAgcGh4V2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlaGlkZVwiLCBfZSA9PiB7XG4gICAgICAgIGlmKHRoaXMuY29ubil7XG4gICAgICAgICAgdGhpcy5kaXNjb25uZWN0KClcbiAgICAgICAgICBhd2FpdGluZ0Nvbm5lY3Rpb25PblBhZ2VTaG93ID0gdGhpcy5jb25uZWN0Q2xvY2tcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHBoeFdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwgX2UgPT4ge1xuICAgICAgICBpZihhd2FpdGluZ0Nvbm5lY3Rpb25PblBhZ2VTaG93ID09PSB0aGlzLmNvbm5lY3RDbG9jayl7XG4gICAgICAgICAgYXdhaXRpbmdDb25uZWN0aW9uT25QYWdlU2hvdyA9IG51bGxcbiAgICAgICAgICB0aGlzLmNvbm5lY3QoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICB0aGlzLmhlYXJ0YmVhdEludGVydmFsTXMgPSBvcHRzLmhlYXJ0YmVhdEludGVydmFsTXMgfHwgMzAwMDBcbiAgICB0aGlzLnJlam9pbkFmdGVyTXMgPSAodHJpZXMpID0+IHtcbiAgICAgIGlmKG9wdHMucmVqb2luQWZ0ZXJNcyl7XG4gICAgICAgIHJldHVybiBvcHRzLnJlam9pbkFmdGVyTXModHJpZXMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gWzEwMDAsIDIwMDAsIDUwMDBdW3RyaWVzIC0gMV0gfHwgMTAwMDBcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5yZWNvbm5lY3RBZnRlck1zID0gKHRyaWVzKSA9PiB7XG4gICAgICBpZihvcHRzLnJlY29ubmVjdEFmdGVyTXMpe1xuICAgICAgICByZXR1cm4gb3B0cy5yZWNvbm5lY3RBZnRlck1zKHRyaWVzKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFsxMCwgNTAsIDEwMCwgMTUwLCAyMDAsIDI1MCwgNTAwLCAxMDAwLCAyMDAwXVt0cmllcyAtIDFdIHx8IDUwMDBcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5sb2dnZXIgPSBvcHRzLmxvZ2dlciB8fCBudWxsXG4gICAgaWYoIXRoaXMubG9nZ2VyICYmIG9wdHMuZGVidWcpe1xuICAgICAgdGhpcy5sb2dnZXIgPSAoa2luZCwgbXNnLCBkYXRhKSA9PiB7IGNvbnNvbGUubG9nKGAke2tpbmR9OiAke21zZ31gLCBkYXRhKSB9XG4gICAgfVxuICAgIHRoaXMubG9uZ3BvbGxlclRpbWVvdXQgPSBvcHRzLmxvbmdwb2xsZXJUaW1lb3V0IHx8IDIwMDAwXG4gICAgdGhpcy5wYXJhbXMgPSBjbG9zdXJlKG9wdHMucGFyYW1zIHx8IHt9KVxuICAgIHRoaXMuZW5kUG9pbnQgPSBgJHtlbmRQb2ludH0vJHtUUkFOU1BPUlRTLndlYnNvY2tldH1gXG4gICAgdGhpcy52c24gPSBvcHRzLnZzbiB8fCBERUZBVUxUX1ZTTlxuICAgIHRoaXMuaGVhcnRiZWF0VGltZW91dFRpbWVyID0gbnVsbFxuICAgIHRoaXMuaGVhcnRiZWF0VGltZXIgPSBudWxsXG4gICAgdGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmID0gbnVsbFxuICAgIHRoaXMucmVjb25uZWN0VGltZXIgPSBuZXcgVGltZXIoKCkgPT4ge1xuICAgICAgdGhpcy50ZWFyZG93bigoKSA9PiB0aGlzLmNvbm5lY3QoKSlcbiAgICB9LCB0aGlzLnJlY29ubmVjdEFmdGVyTXMpXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgTG9uZ1BvbGwgdHJhbnNwb3J0IHJlZmVyZW5jZVxuICAgKi9cbiAgZ2V0TG9uZ1BvbGxUcmFuc3BvcnQoKXsgcmV0dXJuIExvbmdQb2xsIH1cblxuICAvKipcbiAgICogRGlzY29ubmVjdHMgYW5kIHJlcGxhY2VzIHRoZSBhY3RpdmUgdHJhbnNwb3J0XG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG5ld1RyYW5zcG9ydCAtIFRoZSBuZXcgdHJhbnNwb3J0IGNsYXNzIHRvIGluc3RhbnRpYXRlXG4gICAqXG4gICAqL1xuICByZXBsYWNlVHJhbnNwb3J0KG5ld1RyYW5zcG9ydCl7XG4gICAgdGhpcy5jb25uZWN0Q2xvY2srK1xuICAgIHRoaXMuY2xvc2VXYXNDbGVhbiA9IHRydWVcbiAgICBjbGVhclRpbWVvdXQodGhpcy5mYWxsYmFja1RpbWVyKVxuICAgIHRoaXMucmVjb25uZWN0VGltZXIucmVzZXQoKVxuICAgIGlmKHRoaXMuY29ubil7XG4gICAgICB0aGlzLmNvbm4uY2xvc2UoKVxuICAgICAgdGhpcy5jb25uID0gbnVsbFxuICAgIH1cbiAgICB0aGlzLnRyYW5zcG9ydCA9IG5ld1RyYW5zcG9ydFxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHNvY2tldCBwcm90b2NvbFxuICAgKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgcHJvdG9jb2woKXsgcmV0dXJuIGxvY2F0aW9uLnByb3RvY29sLm1hdGNoKC9eaHR0cHMvKSA/IFwid3NzXCIgOiBcIndzXCIgfVxuXG4gIC8qKlxuICAgKiBUaGUgZnVsbHkgcXVhbGlmaWVkIHNvY2tldCB1cmxcbiAgICpcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIGVuZFBvaW50VVJMKCl7XG4gICAgbGV0IHVyaSA9IEFqYXguYXBwZW5kUGFyYW1zKFxuICAgICAgQWpheC5hcHBlbmRQYXJhbXModGhpcy5lbmRQb2ludCwgdGhpcy5wYXJhbXMoKSksIHt2c246IHRoaXMudnNufSlcbiAgICBpZih1cmkuY2hhckF0KDApICE9PSBcIi9cIil7IHJldHVybiB1cmkgfVxuICAgIGlmKHVyaS5jaGFyQXQoMSkgPT09IFwiL1wiKXsgcmV0dXJuIGAke3RoaXMucHJvdG9jb2woKX06JHt1cml9YCB9XG5cbiAgICByZXR1cm4gYCR7dGhpcy5wcm90b2NvbCgpfTovLyR7bG9jYXRpb24uaG9zdH0ke3VyaX1gXG4gIH1cblxuICAvKipcbiAgICogRGlzY29ubmVjdHMgdGhlIHNvY2tldFxuICAgKlxuICAgKiBTZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0Nsb3NlRXZlbnQjU3RhdHVzX2NvZGVzIGZvciB2YWxpZCBzdGF0dXMgY29kZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gT3B0aW9uYWwgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIGFmdGVyIHNvY2tldCBpcyBkaXNjb25uZWN0ZWQuXG4gICAqIEBwYXJhbSB7aW50ZWdlcn0gY29kZSAtIEEgc3RhdHVzIGNvZGUgZm9yIGRpc2Nvbm5lY3Rpb24gKE9wdGlvbmFsKS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlYXNvbiAtIEEgdGV4dHVhbCBkZXNjcmlwdGlvbiBvZiB0aGUgcmVhc29uIHRvIGRpc2Nvbm5lY3QuIChPcHRpb25hbClcbiAgICovXG4gIGRpc2Nvbm5lY3QoY2FsbGJhY2ssIGNvZGUsIHJlYXNvbil7XG4gICAgdGhpcy5jb25uZWN0Q2xvY2srK1xuICAgIHRoaXMuY2xvc2VXYXNDbGVhbiA9IHRydWVcbiAgICBjbGVhclRpbWVvdXQodGhpcy5mYWxsYmFja1RpbWVyKVxuICAgIHRoaXMucmVjb25uZWN0VGltZXIucmVzZXQoKVxuICAgIHRoaXMudGVhcmRvd24oY2FsbGJhY2ssIGNvZGUsIHJlYXNvbilcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIC0gVGhlIHBhcmFtcyB0byBzZW5kIHdoZW4gY29ubmVjdGluZywgZm9yIGV4YW1wbGUgYHt1c2VyX2lkOiB1c2VyVG9rZW59YFxuICAgKlxuICAgKiBQYXNzaW5nIHBhcmFtcyB0byBjb25uZWN0IGlzIGRlcHJlY2F0ZWQ7IHBhc3MgdGhlbSBpbiB0aGUgU29ja2V0IGNvbnN0cnVjdG9yIGluc3RlYWQ6XG4gICAqIGBuZXcgU29ja2V0KFwiL3NvY2tldFwiLCB7cGFyYW1zOiB7dXNlcl9pZDogdXNlclRva2VufX0pYC5cbiAgICovXG4gIGNvbm5lY3QocGFyYW1zKXtcbiAgICBpZihwYXJhbXMpe1xuICAgICAgY29uc29sZSAmJiBjb25zb2xlLmxvZyhcInBhc3NpbmcgcGFyYW1zIHRvIGNvbm5lY3QgaXMgZGVwcmVjYXRlZC4gSW5zdGVhZCBwYXNzIDpwYXJhbXMgdG8gdGhlIFNvY2tldCBjb25zdHJ1Y3RvclwiKVxuICAgICAgdGhpcy5wYXJhbXMgPSBjbG9zdXJlKHBhcmFtcylcbiAgICB9XG4gICAgaWYodGhpcy5jb25uKXsgcmV0dXJuIH1cbiAgICBpZih0aGlzLmxvbmdQb2xsRmFsbGJhY2tNcyAmJiB0aGlzLnRyYW5zcG9ydCAhPT0gTG9uZ1BvbGwpe1xuICAgICAgdGhpcy5jb25uZWN0V2l0aEZhbGxiYWNrKExvbmdQb2xsLCB0aGlzLmxvbmdQb2xsRmFsbGJhY2tNcylcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50cmFuc3BvcnRDb25uZWN0KClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTG9ncyB0aGUgbWVzc2FnZS4gT3ZlcnJpZGUgYHRoaXMubG9nZ2VyYCBmb3Igc3BlY2lhbGl6ZWQgbG9nZ2luZy4gbm9vcHMgYnkgZGVmYXVsdFxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2luZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gbXNnXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAqL1xuICBsb2coa2luZCwgbXNnLCBkYXRhKXsgdGhpcy5sb2dnZXIgJiYgdGhpcy5sb2dnZXIoa2luZCwgbXNnLCBkYXRhKSB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiBhIGxvZ2dlciBoYXMgYmVlbiBzZXQgb24gdGhpcyBzb2NrZXQuXG4gICAqL1xuICBoYXNMb2dnZXIoKXsgcmV0dXJuIHRoaXMubG9nZ2VyICE9PSBudWxsIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGNhbGxiYWNrcyBmb3IgY29ubmVjdGlvbiBvcGVuIGV2ZW50c1xuICAgKlxuICAgKiBAZXhhbXBsZSBzb2NrZXQub25PcGVuKGZ1bmN0aW9uKCl7IGNvbnNvbGUuaW5mbyhcInRoZSBzb2NrZXQgd2FzIG9wZW5lZFwiKSB9KVxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKi9cbiAgb25PcGVuKGNhbGxiYWNrKXtcbiAgICBsZXQgcmVmID0gdGhpcy5tYWtlUmVmKClcbiAgICB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzLm9wZW4ucHVzaChbcmVmLCBjYWxsYmFja10pXG4gICAgcmV0dXJuIHJlZlxuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBjYWxsYmFja3MgZm9yIGNvbm5lY3Rpb24gY2xvc2UgZXZlbnRzXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAqL1xuICBvbkNsb3NlKGNhbGxiYWNrKXtcbiAgICBsZXQgcmVmID0gdGhpcy5tYWtlUmVmKClcbiAgICB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzLmNsb3NlLnB1c2goW3JlZiwgY2FsbGJhY2tdKVxuICAgIHJldHVybiByZWZcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgY2FsbGJhY2tzIGZvciBjb25uZWN0aW9uIGVycm9yIGV2ZW50c1xuICAgKlxuICAgKiBAZXhhbXBsZSBzb2NrZXQub25FcnJvcihmdW5jdGlvbihlcnJvcil7IGFsZXJ0KFwiQW4gZXJyb3Igb2NjdXJyZWRcIikgfSlcbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICovXG4gIG9uRXJyb3IoY2FsbGJhY2spe1xuICAgIGxldCByZWYgPSB0aGlzLm1ha2VSZWYoKVxuICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MuZXJyb3IucHVzaChbcmVmLCBjYWxsYmFja10pXG4gICAgcmV0dXJuIHJlZlxuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBjYWxsYmFja3MgZm9yIGNvbm5lY3Rpb24gbWVzc2FnZSBldmVudHNcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICovXG4gIG9uTWVzc2FnZShjYWxsYmFjayl7XG4gICAgbGV0IHJlZiA9IHRoaXMubWFrZVJlZigpXG4gICAgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcy5tZXNzYWdlLnB1c2goW3JlZiwgY2FsbGJhY2tdKVxuICAgIHJldHVybiByZWZcbiAgfVxuXG4gIC8qKlxuICAgKiBQaW5ncyB0aGUgc2VydmVyIGFuZCBpbnZva2VzIHRoZSBjYWxsYmFjayB3aXRoIHRoZSBSVFQgaW4gbWlsbGlzZWNvbmRzXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgcGluZyB3YXMgcHVzaGVkIG9yIGZhbHNlIGlmIHVuYWJsZSB0byBiZSBwdXNoZWQuXG4gICAqL1xuICBwaW5nKGNhbGxiYWNrKXtcbiAgICBpZighdGhpcy5pc0Nvbm5lY3RlZCgpKXsgcmV0dXJuIGZhbHNlIH1cbiAgICBsZXQgcmVmID0gdGhpcy5tYWtlUmVmKClcbiAgICBsZXQgc3RhcnRUaW1lID0gRGF0ZS5ub3coKVxuICAgIHRoaXMucHVzaCh7dG9waWM6IFwicGhvZW5peFwiLCBldmVudDogXCJoZWFydGJlYXRcIiwgcGF5bG9hZDoge30sIHJlZjogcmVmfSlcbiAgICBsZXQgb25Nc2dSZWYgPSB0aGlzLm9uTWVzc2FnZShtc2cgPT4ge1xuICAgICAgaWYobXNnLnJlZiA9PT0gcmVmKXtcbiAgICAgICAgdGhpcy5vZmYoW29uTXNnUmVmXSlcbiAgICAgICAgY2FsbGJhY2soRGF0ZS5ub3coKSAtIHN0YXJ0VGltZSlcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG5cbiAgdHJhbnNwb3J0Q29ubmVjdCgpe1xuICAgIHRoaXMuY29ubmVjdENsb2NrKytcbiAgICB0aGlzLmNsb3NlV2FzQ2xlYW4gPSBmYWxzZVxuICAgIHRoaXMuY29ubiA9IG5ldyB0aGlzLnRyYW5zcG9ydCh0aGlzLmVuZFBvaW50VVJMKCkpXG4gICAgdGhpcy5jb25uLmJpbmFyeVR5cGUgPSB0aGlzLmJpbmFyeVR5cGVcbiAgICB0aGlzLmNvbm4udGltZW91dCA9IHRoaXMubG9uZ3BvbGxlclRpbWVvdXRcbiAgICB0aGlzLmNvbm4ub25vcGVuID0gKCkgPT4gdGhpcy5vbkNvbm5PcGVuKClcbiAgICB0aGlzLmNvbm4ub25lcnJvciA9IGVycm9yID0+IHRoaXMub25Db25uRXJyb3IoZXJyb3IpXG4gICAgdGhpcy5jb25uLm9ubWVzc2FnZSA9IGV2ZW50ID0+IHRoaXMub25Db25uTWVzc2FnZShldmVudClcbiAgICB0aGlzLmNvbm4ub25jbG9zZSA9IGV2ZW50ID0+IHRoaXMub25Db25uQ2xvc2UoZXZlbnQpXG4gIH1cblxuICBnZXRTZXNzaW9uKGtleSl7IHJldHVybiB0aGlzLnNlc3Npb25TdG9yZSAmJiB0aGlzLnNlc3Npb25TdG9yZS5nZXRJdGVtKGtleSkgfVxuXG4gIHN0b3JlU2Vzc2lvbihrZXksIHZhbCl7IHRoaXMuc2Vzc2lvblN0b3JlICYmIHRoaXMuc2Vzc2lvblN0b3JlLnNldEl0ZW0oa2V5LCB2YWwpIH1cblxuICBjb25uZWN0V2l0aEZhbGxiYWNrKGZhbGxiYWNrVHJhbnNwb3J0LCBmYWxsYmFja1RocmVzaG9sZCA9IDI1MDApe1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmZhbGxiYWNrVGltZXIpXG4gICAgbGV0IGVzdGFibGlzaGVkID0gZmFsc2VcbiAgICBsZXQgcHJpbWFyeVRyYW5zcG9ydCA9IHRydWVcbiAgICBsZXQgb3BlblJlZiwgZXJyb3JSZWZcbiAgICBsZXQgZmFsbGJhY2sgPSAocmVhc29uKSA9PiB7XG4gICAgICB0aGlzLmxvZyhcInRyYW5zcG9ydFwiLCBgZmFsbGluZyBiYWNrIHRvICR7ZmFsbGJhY2tUcmFuc3BvcnQubmFtZX0uLi5gLCByZWFzb24pXG4gICAgICB0aGlzLm9mZihbb3BlblJlZiwgZXJyb3JSZWZdKVxuICAgICAgcHJpbWFyeVRyYW5zcG9ydCA9IGZhbHNlXG4gICAgICB0aGlzLnN0b3JlU2Vzc2lvbihcInBoeDpsb25ncG9sbFwiLCBcInRydWVcIilcbiAgICAgIHRoaXMucmVwbGFjZVRyYW5zcG9ydChmYWxsYmFja1RyYW5zcG9ydClcbiAgICAgIHRoaXMudHJhbnNwb3J0Q29ubmVjdCgpXG4gICAgfVxuICAgIGlmKHRoaXMuZ2V0U2Vzc2lvbihcInBoeDpsb25ncG9sbFwiKSl7IHJldHVybiBmYWxsYmFjayhcIm1lbW9yaXplZFwiKSB9XG5cbiAgICB0aGlzLmZhbGxiYWNrVGltZXIgPSBzZXRUaW1lb3V0KGZhbGxiYWNrLCBmYWxsYmFja1RocmVzaG9sZClcblxuICAgIGVycm9yUmVmID0gdGhpcy5vbkVycm9yKHJlYXNvbiA9PiB7XG4gICAgICB0aGlzLmxvZyhcInRyYW5zcG9ydFwiLCBcImVycm9yXCIsIHJlYXNvbilcbiAgICAgIGlmKHByaW1hcnlUcmFuc3BvcnQgJiYgIWVzdGFibGlzaGVkKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmZhbGxiYWNrVGltZXIpXG4gICAgICAgIGZhbGxiYWNrKHJlYXNvbilcbiAgICAgIH1cbiAgICB9KVxuICAgIHRoaXMub25PcGVuKCgpID0+IHtcbiAgICAgIGVzdGFibGlzaGVkID0gdHJ1ZVxuICAgICAgaWYoIXByaW1hcnlUcmFuc3BvcnQpe1xuICAgICAgICByZXR1cm4gY29uc29sZS5sb2coXCJ0cmFuc3BvcnRcIiwgYGVzdGFibGlzaGVkICR7ZmFsbGJhY2tUcmFuc3BvcnQubmFtZX0gZmFsbGJhY2tgKVxuICAgICAgfVxuICAgICAgLy8gaWYgd2UndmUgZXN0YWJsaXNoZWQgcHJpbWFyeSwgZ2l2ZSB0aGUgZmFsbGJhY2sgYSBuZXcgcGVyaW9kIHRvIGF0dGVtcHQgcGluZ1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZmFsbGJhY2tUaW1lcilcbiAgICAgIHRoaXMuZmFsbGJhY2tUaW1lciA9IHNldFRpbWVvdXQoZmFsbGJhY2ssIGZhbGxiYWNrVGhyZXNob2xkKVxuICAgICAgdGhpcy5waW5nKHJ0dCA9PiB7XG4gICAgICAgIHRoaXMubG9nKFwidHJhbnNwb3J0XCIsIFwiY29ubmVjdGVkIHRvIHByaW1hcnkgYWZ0ZXJcIiwgcnR0KVxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5mYWxsYmFja1RpbWVyKVxuICAgICAgfSlcbiAgICB9KVxuICAgIHRoaXMudHJhbnNwb3J0Q29ubmVjdCgpXG4gIH1cblxuICBjbGVhckhlYXJ0YmVhdHMoKXtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5oZWFydGJlYXRUaW1lcilcbiAgICBjbGVhclRpbWVvdXQodGhpcy5oZWFydGJlYXRUaW1lb3V0VGltZXIpXG4gIH1cblxuICBvbkNvbm5PcGVuKCl7XG4gICAgaWYodGhpcy5oYXNMb2dnZXIoKSkgdGhpcy5sb2coXCJ0cmFuc3BvcnRcIiwgYCR7dGhpcy50cmFuc3BvcnQubmFtZX0gY29ubmVjdGVkIHRvICR7dGhpcy5lbmRQb2ludFVSTCgpfWApXG4gICAgdGhpcy5jbG9zZVdhc0NsZWFuID0gZmFsc2VcbiAgICB0aGlzLmVzdGFibGlzaGVkQ29ubmVjdGlvbnMrK1xuICAgIHRoaXMuZmx1c2hTZW5kQnVmZmVyKClcbiAgICB0aGlzLnJlY29ubmVjdFRpbWVyLnJlc2V0KClcbiAgICB0aGlzLnJlc2V0SGVhcnRiZWF0KClcbiAgICB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzLm9wZW4uZm9yRWFjaCgoWywgY2FsbGJhY2tdKSA9PiBjYWxsYmFjaygpKVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuXG4gIGhlYXJ0YmVhdFRpbWVvdXQoKXtcbiAgICBpZih0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWYpe1xuICAgICAgdGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmID0gbnVsbFxuICAgICAgaWYodGhpcy5oYXNMb2dnZXIoKSl7IHRoaXMubG9nKFwidHJhbnNwb3J0XCIsIFwiaGVhcnRiZWF0IHRpbWVvdXQuIEF0dGVtcHRpbmcgdG8gcmUtZXN0YWJsaXNoIGNvbm5lY3Rpb25cIikgfVxuICAgICAgdGhpcy50cmlnZ2VyQ2hhbkVycm9yKClcbiAgICAgIHRoaXMuY2xvc2VXYXNDbGVhbiA9IGZhbHNlXG4gICAgICB0aGlzLnRlYXJkb3duKCgpID0+IHRoaXMucmVjb25uZWN0VGltZXIuc2NoZWR1bGVUaW1lb3V0KCksIFdTX0NMT1NFX05PUk1BTCwgXCJoZWFydGJlYXQgdGltZW91dFwiKVxuICAgIH1cbiAgfVxuXG4gIHJlc2V0SGVhcnRiZWF0KCl7XG4gICAgaWYodGhpcy5jb25uICYmIHRoaXMuY29ubi5za2lwSGVhcnRiZWF0KXsgcmV0dXJuIH1cbiAgICB0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWYgPSBudWxsXG4gICAgdGhpcy5jbGVhckhlYXJ0YmVhdHMoKVxuICAgIHRoaXMuaGVhcnRiZWF0VGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2VuZEhlYXJ0YmVhdCgpLCB0aGlzLmhlYXJ0YmVhdEludGVydmFsTXMpXG4gIH1cblxuICB0ZWFyZG93bihjYWxsYmFjaywgY29kZSwgcmVhc29uKXtcbiAgICBpZighdGhpcy5jb25uKXtcbiAgICAgIHJldHVybiBjYWxsYmFjayAmJiBjYWxsYmFjaygpXG4gICAgfVxuXG4gICAgdGhpcy53YWl0Rm9yQnVmZmVyRG9uZSgoKSA9PiB7XG4gICAgICBpZih0aGlzLmNvbm4pe1xuICAgICAgICBpZihjb2RlKXsgdGhpcy5jb25uLmNsb3NlKGNvZGUsIHJlYXNvbiB8fCBcIlwiKSB9IGVsc2UgeyB0aGlzLmNvbm4uY2xvc2UoKSB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMud2FpdEZvclNvY2tldENsb3NlZCgoKSA9PiB7XG4gICAgICAgIGlmKHRoaXMuY29ubil7XG4gICAgICAgICAgdGhpcy5jb25uLm9ub3BlbiA9IGZ1bmN0aW9uICgpeyB9IC8vIG5vb3BcbiAgICAgICAgICB0aGlzLmNvbm4ub25lcnJvciA9IGZ1bmN0aW9uICgpeyB9IC8vIG5vb3BcbiAgICAgICAgICB0aGlzLmNvbm4ub25tZXNzYWdlID0gZnVuY3Rpb24gKCl7IH0gLy8gbm9vcFxuICAgICAgICAgIHRoaXMuY29ubi5vbmNsb3NlID0gZnVuY3Rpb24gKCl7IH0gLy8gbm9vcFxuICAgICAgICAgIHRoaXMuY29ubiA9IG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKClcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHdhaXRGb3JCdWZmZXJEb25lKGNhbGxiYWNrLCB0cmllcyA9IDEpe1xuICAgIGlmKHRyaWVzID09PSA1IHx8ICF0aGlzLmNvbm4gfHwgIXRoaXMuY29ubi5idWZmZXJlZEFtb3VudCl7XG4gICAgICBjYWxsYmFjaygpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMud2FpdEZvckJ1ZmZlckRvbmUoY2FsbGJhY2ssIHRyaWVzICsgMSlcbiAgICB9LCAxNTAgKiB0cmllcylcbiAgfVxuXG4gIHdhaXRGb3JTb2NrZXRDbG9zZWQoY2FsbGJhY2ssIHRyaWVzID0gMSl7XG4gICAgaWYodHJpZXMgPT09IDUgfHwgIXRoaXMuY29ubiB8fCB0aGlzLmNvbm4ucmVhZHlTdGF0ZSA9PT0gU09DS0VUX1NUQVRFUy5jbG9zZWQpe1xuICAgICAgY2FsbGJhY2soKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLndhaXRGb3JTb2NrZXRDbG9zZWQoY2FsbGJhY2ssIHRyaWVzICsgMSlcbiAgICB9LCAxNTAgKiB0cmllcylcbiAgfVxuXG4gIG9uQ29ubkNsb3NlKGV2ZW50KXtcbiAgICBsZXQgY2xvc2VDb2RlID0gZXZlbnQgJiYgZXZlbnQuY29kZVxuICAgIGlmKHRoaXMuaGFzTG9nZ2VyKCkpIHRoaXMubG9nKFwidHJhbnNwb3J0XCIsIFwiY2xvc2VcIiwgZXZlbnQpXG4gICAgdGhpcy50cmlnZ2VyQ2hhbkVycm9yKClcbiAgICB0aGlzLmNsZWFySGVhcnRiZWF0cygpXG4gICAgaWYoIXRoaXMuY2xvc2VXYXNDbGVhbiAmJiBjbG9zZUNvZGUgIT09IDEwMDApe1xuICAgICAgdGhpcy5yZWNvbm5lY3RUaW1lci5zY2hlZHVsZVRpbWVvdXQoKVxuICAgIH1cbiAgICB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzLmNsb3NlLmZvckVhY2goKFssIGNhbGxiYWNrXSkgPT4gY2FsbGJhY2soZXZlbnQpKVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBvbkNvbm5FcnJvcihlcnJvcil7XG4gICAgaWYodGhpcy5oYXNMb2dnZXIoKSkgdGhpcy5sb2coXCJ0cmFuc3BvcnRcIiwgZXJyb3IpXG4gICAgbGV0IHRyYW5zcG9ydEJlZm9yZSA9IHRoaXMudHJhbnNwb3J0XG4gICAgbGV0IGVzdGFibGlzaGVkQmVmb3JlID0gdGhpcy5lc3RhYmxpc2hlZENvbm5lY3Rpb25zXG4gICAgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcy5lcnJvci5mb3JFYWNoKChbLCBjYWxsYmFja10pID0+IHtcbiAgICAgIGNhbGxiYWNrKGVycm9yLCB0cmFuc3BvcnRCZWZvcmUsIGVzdGFibGlzaGVkQmVmb3JlKVxuICAgIH0pXG4gICAgaWYodHJhbnNwb3J0QmVmb3JlID09PSB0aGlzLnRyYW5zcG9ydCB8fCBlc3RhYmxpc2hlZEJlZm9yZSA+IDApe1xuICAgICAgdGhpcy50cmlnZ2VyQ2hhbkVycm9yKClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRyaWdnZXJDaGFuRXJyb3IoKXtcbiAgICB0aGlzLmNoYW5uZWxzLmZvckVhY2goY2hhbm5lbCA9PiB7XG4gICAgICBpZighKGNoYW5uZWwuaXNFcnJvcmVkKCkgfHwgY2hhbm5lbC5pc0xlYXZpbmcoKSB8fCBjaGFubmVsLmlzQ2xvc2VkKCkpKXtcbiAgICAgICAgY2hhbm5lbC50cmlnZ2VyKENIQU5ORUxfRVZFTlRTLmVycm9yKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIGNvbm5lY3Rpb25TdGF0ZSgpe1xuICAgIHN3aXRjaCh0aGlzLmNvbm4gJiYgdGhpcy5jb25uLnJlYWR5U3RhdGUpe1xuICAgICAgY2FzZSBTT0NLRVRfU1RBVEVTLmNvbm5lY3Rpbmc6IHJldHVybiBcImNvbm5lY3RpbmdcIlxuICAgICAgY2FzZSBTT0NLRVRfU1RBVEVTLm9wZW46IHJldHVybiBcIm9wZW5cIlxuICAgICAgY2FzZSBTT0NLRVRfU1RBVEVTLmNsb3Npbmc6IHJldHVybiBcImNsb3NpbmdcIlxuICAgICAgZGVmYXVsdDogcmV0dXJuIFwiY2xvc2VkXCJcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBpc0Nvbm5lY3RlZCgpeyByZXR1cm4gdGhpcy5jb25uZWN0aW9uU3RhdGUoKSA9PT0gXCJvcGVuXCIgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKlxuICAgKiBAcGFyYW0ge0NoYW5uZWx9XG4gICAqL1xuICByZW1vdmUoY2hhbm5lbCl7XG4gICAgdGhpcy5vZmYoY2hhbm5lbC5zdGF0ZUNoYW5nZVJlZnMpXG4gICAgdGhpcy5jaGFubmVscyA9IHRoaXMuY2hhbm5lbHMuZmlsdGVyKGMgPT4gYy5qb2luUmVmKCkgIT09IGNoYW5uZWwuam9pblJlZigpKVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYG9uT3BlbmAsIGBvbkNsb3NlYCwgYG9uRXJyb3IsYCBhbmQgYG9uTWVzc2FnZWAgcmVnaXN0cmF0aW9ucy5cbiAgICpcbiAgICogQHBhcmFtIHtyZWZzfSAtIGxpc3Qgb2YgcmVmcyByZXR1cm5lZCBieSBjYWxscyB0b1xuICAgKiAgICAgICAgICAgICAgICAgYG9uT3BlbmAsIGBvbkNsb3NlYCwgYG9uRXJyb3IsYCBhbmQgYG9uTWVzc2FnZWBcbiAgICovXG4gIG9mZihyZWZzKXtcbiAgICBmb3IobGV0IGtleSBpbiB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzKXtcbiAgICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3Nba2V5XSA9IHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3Nba2V5XS5maWx0ZXIoKFtyZWZdKSA9PiB7XG4gICAgICAgIHJldHVybiByZWZzLmluZGV4T2YocmVmKSA9PT0gLTFcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYXRlcyBhIG5ldyBjaGFubmVsIGZvciB0aGUgZ2l2ZW4gdG9waWNcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRvcGljXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjaGFuUGFyYW1zIC0gUGFyYW1ldGVycyBmb3IgdGhlIGNoYW5uZWxcbiAgICogQHJldHVybnMge0NoYW5uZWx9XG4gICAqL1xuICBjaGFubmVsKHRvcGljLCBjaGFuUGFyYW1zID0ge30pe1xuICAgIGxldCBjaGFuID0gbmV3IENoYW5uZWwodG9waWMsIGNoYW5QYXJhbXMsIHRoaXMpXG4gICAgdGhpcy5jaGFubmVscy5wdXNoKGNoYW4pXG4gICAgcmV0dXJuIGNoYW5cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgKi9cbiAgcHVzaChkYXRhKXtcbiAgICBpZih0aGlzLmhhc0xvZ2dlcigpKXtcbiAgICAgIGxldCB7dG9waWMsIGV2ZW50LCBwYXlsb2FkLCByZWYsIGpvaW5fcmVmfSA9IGRhdGFcbiAgICAgIHRoaXMubG9nKFwicHVzaFwiLCBgJHt0b3BpY30gJHtldmVudH0gKCR7am9pbl9yZWZ9LCAke3JlZn0pYCwgcGF5bG9hZClcbiAgICB9XG5cbiAgICBpZih0aGlzLmlzQ29ubmVjdGVkKCkpe1xuICAgICAgdGhpcy5lbmNvZGUoZGF0YSwgcmVzdWx0ID0+IHRoaXMuY29ubi5zZW5kKHJlc3VsdCkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VuZEJ1ZmZlci5wdXNoKCgpID0+IHRoaXMuZW5jb2RlKGRhdGEsIHJlc3VsdCA9PiB0aGlzLmNvbm4uc2VuZChyZXN1bHQpKSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBuZXh0IG1lc3NhZ2UgcmVmLCBhY2NvdW50aW5nIGZvciBvdmVyZmxvd3NcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIG1ha2VSZWYoKXtcbiAgICBsZXQgbmV3UmVmID0gdGhpcy5yZWYgKyAxXG4gICAgaWYobmV3UmVmID09PSB0aGlzLnJlZil7IHRoaXMucmVmID0gMCB9IGVsc2UgeyB0aGlzLnJlZiA9IG5ld1JlZiB9XG5cbiAgICByZXR1cm4gdGhpcy5yZWYudG9TdHJpbmcoKVxuICB9XG5cbiAgc2VuZEhlYXJ0YmVhdCgpe1xuICAgIGlmKHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZiAmJiAhdGhpcy5pc0Nvbm5lY3RlZCgpKXsgcmV0dXJuIH1cbiAgICB0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWYgPSB0aGlzLm1ha2VSZWYoKVxuICAgIHRoaXMucHVzaCh7dG9waWM6IFwicGhvZW5peFwiLCBldmVudDogXCJoZWFydGJlYXRcIiwgcGF5bG9hZDoge30sIHJlZjogdGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmfSlcbiAgICB0aGlzLmhlYXJ0YmVhdFRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5oZWFydGJlYXRUaW1lb3V0KCksIHRoaXMuaGVhcnRiZWF0SW50ZXJ2YWxNcylcbiAgfVxuXG4gIGZsdXNoU2VuZEJ1ZmZlcigpe1xuICAgIGlmKHRoaXMuaXNDb25uZWN0ZWQoKSAmJiB0aGlzLnNlbmRCdWZmZXIubGVuZ3RoID4gMCl7XG4gICAgICB0aGlzLnNlbmRCdWZmZXIuZm9yRWFjaChjYWxsYmFjayA9PiBjYWxsYmFjaygpKVxuICAgICAgdGhpcy5zZW5kQnVmZmVyID0gW11cbiAgICB9XG4gIH1cblxuICBvbkNvbm5NZXNzYWdlKHJhd01lc3NhZ2Upe1xuICAgIHRoaXMuZGVjb2RlKHJhd01lc3NhZ2UuZGF0YSwgbXNnID0+IHtcbiAgICAgIGxldCB7dG9waWMsIGV2ZW50LCBwYXlsb2FkLCByZWYsIGpvaW5fcmVmfSA9IG1zZ1xuICAgICAgaWYocmVmICYmIHJlZiA9PT0gdGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmKXtcbiAgICAgICAgdGhpcy5jbGVhckhlYXJ0YmVhdHMoKVxuICAgICAgICB0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWYgPSBudWxsXG4gICAgICAgIHRoaXMuaGVhcnRiZWF0VGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2VuZEhlYXJ0YmVhdCgpLCB0aGlzLmhlYXJ0YmVhdEludGVydmFsTXMpXG4gICAgICB9XG5cbiAgICAgIGlmKHRoaXMuaGFzTG9nZ2VyKCkpIHRoaXMubG9nKFwicmVjZWl2ZVwiLCBgJHtwYXlsb2FkLnN0YXR1cyB8fCBcIlwifSAke3RvcGljfSAke2V2ZW50fSAke3JlZiAmJiBcIihcIiArIHJlZiArIFwiKVwiIHx8IFwiXCJ9YCwgcGF5bG9hZClcblxuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hhbm5lbHMubGVuZ3RoOyBpKyspe1xuICAgICAgICBjb25zdCBjaGFubmVsID0gdGhpcy5jaGFubmVsc1tpXVxuICAgICAgICBpZighY2hhbm5lbC5pc01lbWJlcih0b3BpYywgZXZlbnQsIHBheWxvYWQsIGpvaW5fcmVmKSl7IGNvbnRpbnVlIH1cbiAgICAgICAgY2hhbm5lbC50cmlnZ2VyKGV2ZW50LCBwYXlsb2FkLCByZWYsIGpvaW5fcmVmKVxuICAgICAgfVxuXG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcy5tZXNzYWdlLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgbGV0IFssIGNhbGxiYWNrXSA9IHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MubWVzc2FnZVtpXVxuICAgICAgICBjYWxsYmFjayhtc2cpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGxlYXZlT3BlblRvcGljKHRvcGljKXtcbiAgICBsZXQgZHVwQ2hhbm5lbCA9IHRoaXMuY2hhbm5lbHMuZmluZChjID0+IGMudG9waWMgPT09IHRvcGljICYmIChjLmlzSm9pbmVkKCkgfHwgYy5pc0pvaW5pbmcoKSkpXG4gICAgaWYoZHVwQ2hhbm5lbCl7XG4gICAgICBpZih0aGlzLmhhc0xvZ2dlcigpKSB0aGlzLmxvZyhcInRyYW5zcG9ydFwiLCBgbGVhdmluZyBkdXBsaWNhdGUgdG9waWMgXCIke3RvcGljfVwiYClcbiAgICAgIGR1cENoYW5uZWwubGVhdmUoKVxuICAgIH1cbiAgfVxufVxuIiwgIi8vIE5PVEU6IFRoZSBjb250ZW50cyBvZiB0aGlzIGZpbGUgd2lsbCBvbmx5IGJlIGV4ZWN1dGVkIGlmXG4vLyB5b3UgdW5jb21tZW50IGl0cyBlbnRyeSBpbiBcImFzc2V0cy9qcy9hcHAuanNcIi5cblxuLy8gQnJpbmcgaW4gUGhvZW5peCBjaGFubmVscyBjbGllbnQgbGlicmFyeTpcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gXCJwaG9lbml4XCI7XG5cbi8vIEFuZCBjb25uZWN0IHRvIHRoZSBwYXRoIGluIFwibGliL2Rpc2N1c3Nfd2ViL2VuZHBvaW50LmV4XCIuIFdlIHBhc3MgdGhlXG4vLyB0b2tlbiBmb3IgYXV0aGVudGljYXRpb24uIFJlYWQgYmVsb3cgaG93IGl0IHNob3VsZCBiZSB1c2VkLlxubGV0IHNvY2tldCA9IG5ldyBTb2NrZXQoXCIvc29ja2V0XCIsIHsgcGFyYW1zOiB7IHRva2VuOiB3aW5kb3cudXNlclRva2VuIH0gfSk7XG5cbi8vIFdoZW4geW91IGNvbm5lY3QsIHlvdSdsbCBvZnRlbiBuZWVkIHRvIGF1dGhlbnRpY2F0ZSB0aGUgY2xpZW50LlxuLy8gRm9yIGV4YW1wbGUsIGltYWdpbmUgeW91IGhhdmUgYW4gYXV0aGVudGljYXRpb24gcGx1ZywgYE15QXV0aGAsXG4vLyB3aGljaCBhdXRoZW50aWNhdGVzIHRoZSBzZXNzaW9uIGFuZCBhc3NpZ25zIGEgYDpjdXJyZW50X3VzZXJgLlxuLy8gSWYgdGhlIGN1cnJlbnQgdXNlciBleGlzdHMgeW91IGNhbiBhc3NpZ24gdGhlIHVzZXIncyB0b2tlbiBpblxuLy8gdGhlIGNvbm5lY3Rpb24gZm9yIHVzZSBpbiB0aGUgbGF5b3V0LlxuLy9cbi8vIEluIHlvdXIgXCJsaWIvZGlzY3Vzc193ZWIvcm91dGVyLmV4XCI6XG4vL1xuLy8gICAgIHBpcGVsaW5lIDpicm93c2VyIGRvXG4vLyAgICAgICAuLi5cbi8vICAgICAgIHBsdWcgTXlBdXRoXG4vLyAgICAgICBwbHVnIDpwdXRfdXNlcl90b2tlblxuLy8gICAgIGVuZFxuLy9cbi8vICAgICBkZWZwIHB1dF91c2VyX3Rva2VuKGNvbm4sIF8pIGRvXG4vLyAgICAgICBpZiBjdXJyZW50X3VzZXIgPSBjb25uLmFzc2lnbnNbOmN1cnJlbnRfdXNlcl0gZG9cbi8vICAgICAgICAgdG9rZW4gPSBQaG9lbml4LlRva2VuLnNpZ24oY29ubiwgXCJ1c2VyIHNvY2tldFwiLCBjdXJyZW50X3VzZXIuaWQpXG4vLyAgICAgICAgIGFzc2lnbihjb25uLCA6dXNlcl90b2tlbiwgdG9rZW4pXG4vLyAgICAgICBlbHNlXG4vLyAgICAgICAgIGNvbm5cbi8vICAgICAgIGVuZFxuLy8gICAgIGVuZFxuLy9cbi8vIE5vdyB5b3UgbmVlZCB0byBwYXNzIHRoaXMgdG9rZW4gdG8gSmF2YVNjcmlwdC4gWW91IGNhbiBkbyBzb1xuLy8gaW5zaWRlIGEgc2NyaXB0IHRhZyBpbiBcImxpYi9kaXNjdXNzX3dlYi90ZW1wbGF0ZXMvbGF5b3V0L2FwcC5odG1sLmhlZXhcIjpcbi8vXG4vLyAgICAgPHNjcmlwdD53aW5kb3cudXNlclRva2VuID0gXCI8JT0gYXNzaWduc1s6dXNlcl90b2tlbl0gJT5cIjs8L3NjcmlwdD5cbi8vXG4vLyBZb3Ugd2lsbCBuZWVkIHRvIHZlcmlmeSB0aGUgdXNlciB0b2tlbiBpbiB0aGUgXCJjb25uZWN0LzNcIiBmdW5jdGlvblxuLy8gaW4gXCJsaWIvZGlzY3Vzc193ZWIvY2hhbm5lbHMvdXNlcl9zb2NrZXQuZXhcIjpcbi8vXG4vLyAgICAgZGVmIGNvbm5lY3QoJXtcInRva2VuXCIgPT4gdG9rZW59LCBzb2NrZXQsIF9jb25uZWN0X2luZm8pIGRvXG4vLyAgICAgICAjIG1heF9hZ2U6IDEyMDk2MDAgaXMgZXF1aXZhbGVudCB0byB0d28gd2Vla3MgaW4gc2Vjb25kc1xuLy8gICAgICAgY2FzZSBQaG9lbml4LlRva2VuLnZlcmlmeShzb2NrZXQsIFwidXNlciBzb2NrZXRcIiwgdG9rZW4sIG1heF9hZ2U6IDFfMjA5XzYwMCkgZG9cbi8vICAgICAgICAgezpvaywgdXNlcl9pZH0gLT5cbi8vICAgICAgICAgICB7Om9rLCBhc3NpZ24oc29ja2V0LCA6dXNlciwgdXNlcl9pZCl9XG4vL1xuLy8gICAgICAgICB7OmVycm9yLCByZWFzb259IC0+XG4vLyAgICAgICAgICAgOmVycm9yXG4vLyAgICAgICBlbmRcbi8vICAgICBlbmRcbi8vXG4vLyBGaW5hbGx5LCBjb25uZWN0IHRvIHRoZSBzb2NrZXQ6XG5zb2NrZXQuY29ubmVjdCgpO1xuXG4vLyBOb3cgdGhhdCB5b3UgYXJlIGNvbm5lY3RlZCwgeW91IGNhbiBqb2luIGNoYW5uZWxzIHdpdGggYSB0b3BpYy5cbi8vIExldCdzIGFzc3VtZSB5b3UgaGF2ZSBhIGNoYW5uZWwgd2l0aCBhIHRvcGljIG5hbWVkIGByb29tYCBhbmQgdGhlXG4vLyBzdWJ0b3BpYyBpcyBpdHMgaWQgLSBpbiB0aGlzIGNhc2UgNDI6XG5cbmNvbnN0IGNyZWF0ZVNvY2tldCA9ICh0b3BpY0lkKSA9PiB7XG4gIGxldCBjaGFubmVsID0gc29ja2V0LmNoYW5uZWwoYGNvbW1lbnRzOiR7dG9waWNJZH1gLCB7fSk7XG4gIGNoYW5uZWxcbiAgICAuam9pbigpXG4gICAgLnJlY2VpdmUoXCJva1wiLCAocmVzcCkgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzcCk7XG4gICAgICByZW5kZXJDb21tZW50cyhyZXNwLmNvbW1lbnRzKTtcbiAgICB9KVxuICAgIC5yZWNlaXZlKFwiZXJyb3JcIiwgKHJlc3ApID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiVW5hYmxlIHRvIGpvaW5cIiwgcmVzcCk7XG4gICAgfSk7XG5cbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtY29tbWVudC1idG5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInRleHRhcmVhXCIpLnZhbHVlO1xuXG4gICAgY2hhbm5lbC5wdXNoKFwiY29tbWVudDphZGRcIiwgeyBjb250ZW50OiBjb250ZW50IH0pO1xuICB9KTtcblxuICBjaGFubmVsLm9uKGBjb21tZW50czoke3RvcGljSWR9Om5ld2AsIHJlbmRlckNvbW1lbnQpO1xufTtcblxuY29uc3QgcmVuZGVyQ29tbWVudCA9IChldmVudCkgPT4ge1xuICBjb25zb2xlLmxvZyh7IGV2ZW50IH0pO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbW1lbnQtbGlzdFwiKS5pbm5lckhUTUwgKz0gY29tbWVudFRlbXBsYXRlKFxuICAgIGV2ZW50LmNvbW1lbnRcbiAgKTtcbn07XG5cbmNvbnN0IHJlbmRlckNvbW1lbnRzID0gKGNvbW1lbnRzKSA9PiB7XG4gIGNvbnN0IHJlbmRlcmVkQ29tbWVudHMgPSBjb21tZW50cy5tYXAoKGNvbW1lbnQpID0+IHtcbiAgICByZXR1cm4gY29tbWVudFRlbXBsYXRlKGNvbW1lbnQpO1xuICB9KTtcblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbW1lbnQtbGlzdFwiKS5pbm5lckhUTUwgPSByZW5kZXJlZENvbW1lbnRzLmpvaW4oXCJcIik7XG59O1xuXG5jb25zdCBjb21tZW50VGVtcGxhdGUgPSAoY29tbWVudCkgPT4ge1xuICBsZXQgZW1haWwgPSBcIkFub255bW91c1wiO1xuICBpZiAoY29tbWVudC51c2VyKSB7XG4gICAgZW1haWwgPSBjb21tZW50LnVzZXIuZW1haWw7XG4gIH1cbiAgcmV0dXJuIGA8bGkgY2xhc3M9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBnYXAteC02IHB5LTUgYm9yZGVyLW1kIGJvcmRlci1za3ktNDAwXCI+JHtjb21tZW50LmNvbnRlbnR9PGRpdj4ke2VtYWlsfTwvZGl2PjwvbGk+YDtcbn07XG5cbndpbmRvdy5jcmVhdGVTb2NrZXQgPSBjcmVhdGVTb2NrZXQ7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbigpIHtcbiAgdmFyIFBvbHlmaWxsRXZlbnQgPSBldmVudENvbnN0cnVjdG9yKCk7XG5cbiAgZnVuY3Rpb24gZXZlbnRDb25zdHJ1Y3RvcigpIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdy5DdXN0b21FdmVudCA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gd2luZG93LkN1c3RvbUV2ZW50O1xuICAgIC8vIElFPD05IFN1cHBvcnRcbiAgICBmdW5jdGlvbiBDdXN0b21FdmVudChldmVudCwgcGFyYW1zKSB7XG4gICAgICBwYXJhbXMgPSBwYXJhbXMgfHwge2J1YmJsZXM6IGZhbHNlLCBjYW5jZWxhYmxlOiBmYWxzZSwgZGV0YWlsOiB1bmRlZmluZWR9O1xuICAgICAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgICAgZXZ0LmluaXRDdXN0b21FdmVudChldmVudCwgcGFyYW1zLmJ1YmJsZXMsIHBhcmFtcy5jYW5jZWxhYmxlLCBwYXJhbXMuZGV0YWlsKTtcbiAgICAgIHJldHVybiBldnQ7XG4gICAgfVxuICAgIEN1c3RvbUV2ZW50LnByb3RvdHlwZSA9IHdpbmRvdy5FdmVudC5wcm90b3R5cGU7XG4gICAgcmV0dXJuIEN1c3RvbUV2ZW50O1xuICB9XG5cbiAgZnVuY3Rpb24gYnVpbGRIaWRkZW5JbnB1dChuYW1lLCB2YWx1ZSkge1xuICAgIHZhciBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBpbnB1dC50eXBlID0gXCJoaWRkZW5cIjtcbiAgICBpbnB1dC5uYW1lID0gbmFtZTtcbiAgICBpbnB1dC52YWx1ZSA9IHZhbHVlO1xuICAgIHJldHVybiBpbnB1dDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUNsaWNrKGVsZW1lbnQsIHRhcmdldE1vZGlmaWVyS2V5KSB7XG4gICAgdmFyIHRvID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRvXCIpLFxuICAgICAgICBtZXRob2QgPSBidWlsZEhpZGRlbklucHV0KFwiX21ldGhvZFwiLCBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtbWV0aG9kXCIpKSxcbiAgICAgICAgY3NyZiA9IGJ1aWxkSGlkZGVuSW5wdXQoXCJfY3NyZl90b2tlblwiLCBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtY3NyZlwiKSksXG4gICAgICAgIGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKSxcbiAgICAgICAgc3VibWl0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpLFxuICAgICAgICB0YXJnZXQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcInRhcmdldFwiKTtcblxuICAgIGZvcm0ubWV0aG9kID0gKGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1tZXRob2RcIikgPT09IFwiZ2V0XCIpID8gXCJnZXRcIiA6IFwicG9zdFwiO1xuICAgIGZvcm0uYWN0aW9uID0gdG87XG4gICAgZm9ybS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cbiAgICBpZiAodGFyZ2V0KSBmb3JtLnRhcmdldCA9IHRhcmdldDtcbiAgICBlbHNlIGlmICh0YXJnZXRNb2RpZmllcktleSkgZm9ybS50YXJnZXQgPSBcIl9ibGFua1wiO1xuXG4gICAgZm9ybS5hcHBlbmRDaGlsZChjc3JmKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKG1ldGhvZCk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmb3JtKTtcblxuICAgIC8vIEluc2VydCBhIGJ1dHRvbiBhbmQgY2xpY2sgaXQgaW5zdGVhZCBvZiB1c2luZyBgZm9ybS5zdWJtaXRgXG4gICAgLy8gYmVjYXVzZSB0aGUgYHN1Ym1pdGAgZnVuY3Rpb24gZG9lcyBub3QgZW1pdCBhIGBzdWJtaXRgIGV2ZW50LlxuICAgIHN1Ym1pdC50eXBlID0gXCJzdWJtaXRcIjtcbiAgICBmb3JtLmFwcGVuZENoaWxkKHN1Ym1pdCk7XG4gICAgc3VibWl0LmNsaWNrKCk7XG4gIH1cblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICB2YXIgZWxlbWVudCA9IGUudGFyZ2V0O1xuICAgIGlmIChlLmRlZmF1bHRQcmV2ZW50ZWQpIHJldHVybjtcblxuICAgIHdoaWxlIChlbGVtZW50ICYmIGVsZW1lbnQuZ2V0QXR0cmlidXRlKSB7XG4gICAgICB2YXIgcGhvZW5peExpbmtFdmVudCA9IG5ldyBQb2x5ZmlsbEV2ZW50KCdwaG9lbml4LmxpbmsuY2xpY2snLCB7XG4gICAgICAgIFwiYnViYmxlc1wiOiB0cnVlLCBcImNhbmNlbGFibGVcIjogdHJ1ZVxuICAgICAgfSk7XG5cbiAgICAgIGlmICghZWxlbWVudC5kaXNwYXRjaEV2ZW50KHBob2VuaXhMaW5rRXZlbnQpKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLW1ldGhvZFwiKSkge1xuICAgICAgICBoYW5kbGVDbGljayhlbGVtZW50LCBlLm1ldGFLZXkgfHwgZS5zaGlmdEtleSk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIGZhbHNlKTtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncGhvZW5peC5saW5rLmNsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgbWVzc2FnZSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtY29uZmlybVwiKTtcbiAgICBpZihtZXNzYWdlICYmICF3aW5kb3cuY29uZmlybShtZXNzYWdlKSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfSwgZmFsc2UpO1xufSkoKTtcbiIsICJleHBvcnQgY29uc3QgQ09OU0VDVVRJVkVfUkVMT0FEUyA9IFwiY29uc2VjdXRpdmUtcmVsb2Fkc1wiXG5leHBvcnQgY29uc3QgTUFYX1JFTE9BRFMgPSAxMFxuZXhwb3J0IGNvbnN0IFJFTE9BRF9KSVRURVJfTUlOID0gNTAwMFxuZXhwb3J0IGNvbnN0IFJFTE9BRF9KSVRURVJfTUFYID0gMTAwMDBcbmV4cG9ydCBjb25zdCBGQUlMU0FGRV9KSVRURVIgPSAzMDAwMFxuZXhwb3J0IGNvbnN0IFBIWF9FVkVOVF9DTEFTU0VTID0gW1xuICBcInBoeC1jbGljay1sb2FkaW5nXCIsIFwicGh4LWNoYW5nZS1sb2FkaW5nXCIsIFwicGh4LXN1Ym1pdC1sb2FkaW5nXCIsXG4gIFwicGh4LWtleWRvd24tbG9hZGluZ1wiLCBcInBoeC1rZXl1cC1sb2FkaW5nXCIsIFwicGh4LWJsdXItbG9hZGluZ1wiLCBcInBoeC1mb2N1cy1sb2FkaW5nXCIsXG4gIFwicGh4LWhvb2stbG9hZGluZ1wiXG5dXG5leHBvcnQgY29uc3QgUEhYX0NPTVBPTkVOVCA9IFwiZGF0YS1waHgtY29tcG9uZW50XCJcbmV4cG9ydCBjb25zdCBQSFhfTElWRV9MSU5LID0gXCJkYXRhLXBoeC1saW5rXCJcbmV4cG9ydCBjb25zdCBQSFhfVFJBQ0tfU1RBVElDID0gXCJ0cmFjay1zdGF0aWNcIlxuZXhwb3J0IGNvbnN0IFBIWF9MSU5LX1NUQVRFID0gXCJkYXRhLXBoeC1saW5rLXN0YXRlXCJcbmV4cG9ydCBjb25zdCBQSFhfUkVGID0gXCJkYXRhLXBoeC1yZWZcIlxuZXhwb3J0IGNvbnN0IFBIWF9SRUZfU1JDID0gXCJkYXRhLXBoeC1yZWYtc3JjXCJcbmV4cG9ydCBjb25zdCBQSFhfVFJBQ0tfVVBMT0FEUyA9IFwidHJhY2stdXBsb2Fkc1wiXG5leHBvcnQgY29uc3QgUEhYX1VQTE9BRF9SRUYgPSBcImRhdGEtcGh4LXVwbG9hZC1yZWZcIlxuZXhwb3J0IGNvbnN0IFBIWF9QUkVGTElHSFRFRF9SRUZTID0gXCJkYXRhLXBoeC1wcmVmbGlnaHRlZC1yZWZzXCJcbmV4cG9ydCBjb25zdCBQSFhfRE9ORV9SRUZTID0gXCJkYXRhLXBoeC1kb25lLXJlZnNcIlxuZXhwb3J0IGNvbnN0IFBIWF9EUk9QX1RBUkdFVCA9IFwiZHJvcC10YXJnZXRcIlxuZXhwb3J0IGNvbnN0IFBIWF9BQ1RJVkVfRU5UUllfUkVGUyA9IFwiZGF0YS1waHgtYWN0aXZlLXJlZnNcIlxuZXhwb3J0IGNvbnN0IFBIWF9MSVZFX0ZJTEVfVVBEQVRFRCA9IFwicGh4OmxpdmUtZmlsZTp1cGRhdGVkXCJcbmV4cG9ydCBjb25zdCBQSFhfU0tJUCA9IFwiZGF0YS1waHgtc2tpcFwiXG5leHBvcnQgY29uc3QgUEhYX01BR0lDX0lEID0gXCJkYXRhLXBoeC1pZFwiXG5leHBvcnQgY29uc3QgUEhYX1BSVU5FID0gXCJkYXRhLXBoeC1wcnVuZVwiXG5leHBvcnQgY29uc3QgUEhYX1BBR0VfTE9BRElORyA9IFwicGFnZS1sb2FkaW5nXCJcbmV4cG9ydCBjb25zdCBQSFhfQ09OTkVDVEVEX0NMQVNTID0gXCJwaHgtY29ubmVjdGVkXCJcbmV4cG9ydCBjb25zdCBQSFhfTE9BRElOR19DTEFTUyA9IFwicGh4LWxvYWRpbmdcIlxuZXhwb3J0IGNvbnN0IFBIWF9OT19GRUVEQkFDS19DTEFTUyA9IFwicGh4LW5vLWZlZWRiYWNrXCJcbmV4cG9ydCBjb25zdCBQSFhfRVJST1JfQ0xBU1MgPSBcInBoeC1lcnJvclwiXG5leHBvcnQgY29uc3QgUEhYX0NMSUVOVF9FUlJPUl9DTEFTUyA9IFwicGh4LWNsaWVudC1lcnJvclwiXG5leHBvcnQgY29uc3QgUEhYX1NFUlZFUl9FUlJPUl9DTEFTUyA9IFwicGh4LXNlcnZlci1lcnJvclwiXG5leHBvcnQgY29uc3QgUEhYX1BBUkVOVF9JRCA9IFwiZGF0YS1waHgtcGFyZW50LWlkXCJcbmV4cG9ydCBjb25zdCBQSFhfTUFJTiA9IFwiZGF0YS1waHgtbWFpblwiXG5leHBvcnQgY29uc3QgUEhYX1JPT1RfSUQgPSBcImRhdGEtcGh4LXJvb3QtaWRcIlxuZXhwb3J0IGNvbnN0IFBIWF9WSUVXUE9SVF9UT1AgPSBcInZpZXdwb3J0LXRvcFwiXG5leHBvcnQgY29uc3QgUEhYX1ZJRVdQT1JUX0JPVFRPTSA9IFwidmlld3BvcnQtYm90dG9tXCJcbmV4cG9ydCBjb25zdCBQSFhfVFJJR0dFUl9BQ1RJT04gPSBcInRyaWdnZXItYWN0aW9uXCJcbmV4cG9ydCBjb25zdCBQSFhfRkVFREJBQ0tfRk9SID0gXCJmZWVkYmFjay1mb3JcIlxuZXhwb3J0IGNvbnN0IFBIWF9GRUVEQkFDS19HUk9VUCA9IFwiZmVlZGJhY2stZ3JvdXBcIlxuZXhwb3J0IGNvbnN0IFBIWF9IQVNfRk9DVVNFRCA9IFwicGh4LWhhcy1mb2N1c2VkXCJcbmV4cG9ydCBjb25zdCBGT0NVU0FCTEVfSU5QVVRTID0gW1widGV4dFwiLCBcInRleHRhcmVhXCIsIFwibnVtYmVyXCIsIFwiZW1haWxcIiwgXCJwYXNzd29yZFwiLCBcInNlYXJjaFwiLCBcInRlbFwiLCBcInVybFwiLCBcImRhdGVcIiwgXCJ0aW1lXCIsIFwiZGF0ZXRpbWUtbG9jYWxcIiwgXCJjb2xvclwiLCBcInJhbmdlXCJdXG5leHBvcnQgY29uc3QgQ0hFQ0tBQkxFX0lOUFVUUyA9IFtcImNoZWNrYm94XCIsIFwicmFkaW9cIl1cbmV4cG9ydCBjb25zdCBQSFhfSEFTX1NVQk1JVFRFRCA9IFwicGh4LWhhcy1zdWJtaXR0ZWRcIlxuZXhwb3J0IGNvbnN0IFBIWF9TRVNTSU9OID0gXCJkYXRhLXBoeC1zZXNzaW9uXCJcbmV4cG9ydCBjb25zdCBQSFhfVklFV19TRUxFQ1RPUiA9IGBbJHtQSFhfU0VTU0lPTn1dYFxuZXhwb3J0IGNvbnN0IFBIWF9TVElDS1kgPSBcImRhdGEtcGh4LXN0aWNreVwiXG5leHBvcnQgY29uc3QgUEhYX1NUQVRJQyA9IFwiZGF0YS1waHgtc3RhdGljXCJcbmV4cG9ydCBjb25zdCBQSFhfUkVBRE9OTFkgPSBcImRhdGEtcGh4LXJlYWRvbmx5XCJcbmV4cG9ydCBjb25zdCBQSFhfRElTQUJMRUQgPSBcImRhdGEtcGh4LWRpc2FibGVkXCJcbmV4cG9ydCBjb25zdCBQSFhfRElTQUJMRV9XSVRIID0gXCJkaXNhYmxlLXdpdGhcIlxuZXhwb3J0IGNvbnN0IFBIWF9ESVNBQkxFX1dJVEhfUkVTVE9SRSA9IFwiZGF0YS1waHgtZGlzYWJsZS13aXRoLXJlc3RvcmVcIlxuZXhwb3J0IGNvbnN0IFBIWF9IT09LID0gXCJob29rXCJcbmV4cG9ydCBjb25zdCBQSFhfREVCT1VOQ0UgPSBcImRlYm91bmNlXCJcbmV4cG9ydCBjb25zdCBQSFhfVEhST1RUTEUgPSBcInRocm90dGxlXCJcbmV4cG9ydCBjb25zdCBQSFhfVVBEQVRFID0gXCJ1cGRhdGVcIlxuZXhwb3J0IGNvbnN0IFBIWF9TVFJFQU0gPSBcInN0cmVhbVwiXG5leHBvcnQgY29uc3QgUEhYX1NUUkVBTV9SRUYgPSBcImRhdGEtcGh4LXN0cmVhbVwiXG5leHBvcnQgY29uc3QgUEhYX0tFWSA9IFwia2V5XCJcbmV4cG9ydCBjb25zdCBQSFhfUFJJVkFURSA9IFwicGh4UHJpdmF0ZVwiXG5leHBvcnQgY29uc3QgUEhYX0FVVE9fUkVDT1ZFUiA9IFwiYXV0by1yZWNvdmVyXCJcbmV4cG9ydCBjb25zdCBQSFhfTFZfREVCVUcgPSBcInBoeDpsaXZlLXNvY2tldDpkZWJ1Z1wiXG5leHBvcnQgY29uc3QgUEhYX0xWX1BST0ZJTEUgPSBcInBoeDpsaXZlLXNvY2tldDpwcm9maWxpbmdcIlxuZXhwb3J0IGNvbnN0IFBIWF9MVl9MQVRFTkNZX1NJTSA9IFwicGh4OmxpdmUtc29ja2V0OmxhdGVuY3ktc2ltXCJcbmV4cG9ydCBjb25zdCBQSFhfUFJPR1JFU1MgPSBcInByb2dyZXNzXCJcbmV4cG9ydCBjb25zdCBQSFhfTU9VTlRFRCA9IFwibW91bnRlZFwiXG5leHBvcnQgY29uc3QgTE9BREVSX1RJTUVPVVQgPSAxXG5leHBvcnQgY29uc3QgQkVGT1JFX1VOTE9BRF9MT0FERVJfVElNRU9VVCA9IDIwMFxuZXhwb3J0IGNvbnN0IEJJTkRJTkdfUFJFRklYID0gXCJwaHgtXCJcbmV4cG9ydCBjb25zdCBQVVNIX1RJTUVPVVQgPSAzMDAwMFxuZXhwb3J0IGNvbnN0IExJTktfSEVBREVSID0gXCJ4LXJlcXVlc3RlZC13aXRoXCJcbmV4cG9ydCBjb25zdCBSRVNQT05TRV9VUkxfSEVBREVSID0gXCJ4LXJlc3BvbnNlLXVybFwiXG5leHBvcnQgY29uc3QgREVCT1VOQ0VfVFJJR0dFUiA9IFwiZGVib3VuY2UtdHJpZ2dlclwiXG5leHBvcnQgY29uc3QgVEhST1RUTEVEID0gXCJ0aHJvdHRsZWRcIlxuZXhwb3J0IGNvbnN0IERFQk9VTkNFX1BSRVZfS0VZID0gXCJkZWJvdW5jZS1wcmV2LWtleVwiXG5leHBvcnQgY29uc3QgREVGQVVMVFMgPSB7XG4gIGRlYm91bmNlOiAzMDAsXG4gIHRocm90dGxlOiAzMDBcbn1cblxuLy8gUmVuZGVyZWRcbmV4cG9ydCBjb25zdCBEWU5BTUlDUyA9IFwiZFwiXG5leHBvcnQgY29uc3QgU1RBVElDID0gXCJzXCJcbmV4cG9ydCBjb25zdCBST09UID0gXCJyXCJcbmV4cG9ydCBjb25zdCBDT01QT05FTlRTID0gXCJjXCJcbmV4cG9ydCBjb25zdCBFVkVOVFMgPSBcImVcIlxuZXhwb3J0IGNvbnN0IFJFUExZID0gXCJyXCJcbmV4cG9ydCBjb25zdCBUSVRMRSA9IFwidFwiXG5leHBvcnQgY29uc3QgVEVNUExBVEVTID0gXCJwXCJcbmV4cG9ydCBjb25zdCBTVFJFQU0gPSBcInN0cmVhbVwiIiwgImltcG9ydCB7XG4gIGxvZ0Vycm9yXG59IGZyb20gXCIuL3V0aWxzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50cnlVcGxvYWRlciB7XG4gIGNvbnN0cnVjdG9yKGVudHJ5LCBjaHVua1NpemUsIGxpdmVTb2NrZXQpe1xuICAgIHRoaXMubGl2ZVNvY2tldCA9IGxpdmVTb2NrZXRcbiAgICB0aGlzLmVudHJ5ID0gZW50cnlcbiAgICB0aGlzLm9mZnNldCA9IDBcbiAgICB0aGlzLmNodW5rU2l6ZSA9IGNodW5rU2l6ZVxuICAgIHRoaXMuY2h1bmtUaW1lciA9IG51bGxcbiAgICB0aGlzLmVycm9yZWQgPSBmYWxzZVxuICAgIHRoaXMudXBsb2FkQ2hhbm5lbCA9IGxpdmVTb2NrZXQuY2hhbm5lbChgbHZ1OiR7ZW50cnkucmVmfWAsIHt0b2tlbjogZW50cnkubWV0YWRhdGEoKX0pXG4gIH1cblxuICBlcnJvcihyZWFzb24pe1xuICAgIGlmKHRoaXMuZXJyb3JlZCl7IHJldHVybiB9XG4gICAgdGhpcy51cGxvYWRDaGFubmVsLmxlYXZlKClcbiAgICB0aGlzLmVycm9yZWQgPSB0cnVlXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuY2h1bmtUaW1lcilcbiAgICB0aGlzLmVudHJ5LmVycm9yKHJlYXNvbilcbiAgfVxuXG4gIHVwbG9hZCgpe1xuICAgIHRoaXMudXBsb2FkQ2hhbm5lbC5vbkVycm9yKHJlYXNvbiA9PiB0aGlzLmVycm9yKHJlYXNvbikpXG4gICAgdGhpcy51cGxvYWRDaGFubmVsLmpvaW4oKVxuICAgICAgLnJlY2VpdmUoXCJva1wiLCBfZGF0YSA9PiB0aGlzLnJlYWROZXh0Q2h1bmsoKSlcbiAgICAgIC5yZWNlaXZlKFwiZXJyb3JcIiwgcmVhc29uID0+IHRoaXMuZXJyb3IocmVhc29uKSlcbiAgfVxuXG4gIGlzRG9uZSgpeyByZXR1cm4gdGhpcy5vZmZzZXQgPj0gdGhpcy5lbnRyeS5maWxlLnNpemUgfVxuXG4gIHJlYWROZXh0Q2h1bmsoKXtcbiAgICBsZXQgcmVhZGVyID0gbmV3IHdpbmRvdy5GaWxlUmVhZGVyKClcbiAgICBsZXQgYmxvYiA9IHRoaXMuZW50cnkuZmlsZS5zbGljZSh0aGlzLm9mZnNldCwgdGhpcy5jaHVua1NpemUgKyB0aGlzLm9mZnNldClcbiAgICByZWFkZXIub25sb2FkID0gKGUpID0+IHtcbiAgICAgIGlmKGUudGFyZ2V0LmVycm9yID09PSBudWxsKXtcbiAgICAgICAgdGhpcy5vZmZzZXQgKz0gZS50YXJnZXQucmVzdWx0LmJ5dGVMZW5ndGhcbiAgICAgICAgdGhpcy5wdXNoQ2h1bmsoZS50YXJnZXQucmVzdWx0KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGxvZ0Vycm9yKFwiUmVhZCBlcnJvcjogXCIgKyBlLnRhcmdldC5lcnJvcilcbiAgICAgIH1cbiAgICB9XG4gICAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGJsb2IpXG4gIH1cblxuICBwdXNoQ2h1bmsoY2h1bmspe1xuICAgIGlmKCF0aGlzLnVwbG9hZENoYW5uZWwuaXNKb2luZWQoKSl7IHJldHVybiB9XG4gICAgdGhpcy51cGxvYWRDaGFubmVsLnB1c2goXCJjaHVua1wiLCBjaHVuaylcbiAgICAgIC5yZWNlaXZlKFwib2tcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLmVudHJ5LnByb2dyZXNzKCh0aGlzLm9mZnNldCAvIHRoaXMuZW50cnkuZmlsZS5zaXplKSAqIDEwMClcbiAgICAgICAgaWYoIXRoaXMuaXNEb25lKCkpe1xuICAgICAgICAgIHRoaXMuY2h1bmtUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5yZWFkTmV4dENodW5rKCksIHRoaXMubGl2ZVNvY2tldC5nZXRMYXRlbmN5U2ltKCkgfHwgMClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5yZWNlaXZlKFwiZXJyb3JcIiwgKHtyZWFzb259KSA9PiB0aGlzLmVycm9yKHJlYXNvbikpXG4gIH1cbn1cbiIsICJpbXBvcnQge1xuICBQSFhfVklFV19TRUxFQ1RPUlxufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQgRW50cnlVcGxvYWRlciBmcm9tIFwiLi9lbnRyeV91cGxvYWRlclwiXG5cbmV4cG9ydCBsZXQgbG9nRXJyb3IgPSAobXNnLCBvYmopID0+IGNvbnNvbGUuZXJyb3IgJiYgY29uc29sZS5lcnJvcihtc2csIG9iailcblxuZXhwb3J0IGxldCBpc0NpZCA9IChjaWQpID0+IHtcbiAgbGV0IHR5cGUgPSB0eXBlb2YoY2lkKVxuICByZXR1cm4gdHlwZSA9PT0gXCJudW1iZXJcIiB8fCAodHlwZSA9PT0gXCJzdHJpbmdcIiAmJiAvXigwfFsxLTldXFxkKikkLy50ZXN0KGNpZCkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXRlY3REdXBsaWNhdGVJZHMoKXtcbiAgbGV0IGlkcyA9IG5ldyBTZXQoKVxuICBsZXQgZWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiKltpZF1cIilcbiAgZm9yKGxldCBpID0gMCwgbGVuID0gZWxlbXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspe1xuICAgIGlmKGlkcy5oYXMoZWxlbXNbaV0uaWQpKXtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYE11bHRpcGxlIElEcyBkZXRlY3RlZDogJHtlbGVtc1tpXS5pZH0uIEVuc3VyZSB1bmlxdWUgZWxlbWVudCBpZHMuYClcbiAgICB9IGVsc2Uge1xuICAgICAgaWRzLmFkZChlbGVtc1tpXS5pZClcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGxldCBkZWJ1ZyA9ICh2aWV3LCBraW5kLCBtc2csIG9iaikgPT4ge1xuICBpZih2aWV3LmxpdmVTb2NrZXQuaXNEZWJ1Z0VuYWJsZWQoKSl7XG4gICAgY29uc29sZS5sb2coYCR7dmlldy5pZH0gJHtraW5kfTogJHttc2d9IC0gYCwgb2JqKVxuICB9XG59XG5cbi8vIHdyYXBzIHZhbHVlIGluIGNsb3N1cmUgb3IgcmV0dXJucyBjbG9zdXJlXG5leHBvcnQgbGV0IGNsb3N1cmUgPSAodmFsKSA9PiB0eXBlb2YgdmFsID09PSBcImZ1bmN0aW9uXCIgPyB2YWwgOiBmdW5jdGlvbiAoKXsgcmV0dXJuIHZhbCB9XG5cbmV4cG9ydCBsZXQgY2xvbmUgPSAob2JqKSA9PiB7IHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpIH1cblxuZXhwb3J0IGxldCBjbG9zZXN0UGh4QmluZGluZyA9IChlbCwgYmluZGluZywgYm9yZGVyRWwpID0+IHtcbiAgZG8ge1xuICAgIGlmKGVsLm1hdGNoZXMoYFske2JpbmRpbmd9XWApICYmICFlbC5kaXNhYmxlZCl7IHJldHVybiBlbCB9XG4gICAgZWwgPSBlbC5wYXJlbnRFbGVtZW50IHx8IGVsLnBhcmVudE5vZGVcbiAgfSB3aGlsZShlbCAhPT0gbnVsbCAmJiBlbC5ub2RlVHlwZSA9PT0gMSAmJiAhKChib3JkZXJFbCAmJiBib3JkZXJFbC5pc1NhbWVOb2RlKGVsKSkgfHwgZWwubWF0Y2hlcyhQSFhfVklFV19TRUxFQ1RPUikpKVxuICByZXR1cm4gbnVsbFxufVxuXG5leHBvcnQgbGV0IGlzT2JqZWN0ID0gKG9iaikgPT4ge1xuICByZXR1cm4gb2JqICE9PSBudWxsICYmIHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIgJiYgIShvYmogaW5zdGFuY2VvZiBBcnJheSlcbn1cblxuZXhwb3J0IGxldCBpc0VxdWFsT2JqID0gKG9iajEsIG9iajIpID0+IEpTT04uc3RyaW5naWZ5KG9iajEpID09PSBKU09OLnN0cmluZ2lmeShvYmoyKVxuXG5leHBvcnQgbGV0IGlzRW1wdHkgPSAob2JqKSA9PiB7XG4gIGZvcihsZXQgeCBpbiBvYmopeyByZXR1cm4gZmFsc2UgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5leHBvcnQgbGV0IG1heWJlID0gKGVsLCBjYWxsYmFjaykgPT4gZWwgJiYgY2FsbGJhY2soZWwpXG5cbmV4cG9ydCBsZXQgY2hhbm5lbFVwbG9hZGVyID0gZnVuY3Rpb24gKGVudHJpZXMsIG9uRXJyb3IsIHJlc3AsIGxpdmVTb2NrZXQpe1xuICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgIGxldCBlbnRyeVVwbG9hZGVyID0gbmV3IEVudHJ5VXBsb2FkZXIoZW50cnksIHJlc3AuY29uZmlnLmNodW5rX3NpemUsIGxpdmVTb2NrZXQpXG4gICAgZW50cnlVcGxvYWRlci51cGxvYWQoKVxuICB9KVxufVxuIiwgImxldCBCcm93c2VyID0ge1xuICBjYW5QdXNoU3RhdGUoKXsgcmV0dXJuICh0eXBlb2YgKGhpc3RvcnkucHVzaFN0YXRlKSAhPT0gXCJ1bmRlZmluZWRcIikgfSxcblxuICBkcm9wTG9jYWwobG9jYWxTdG9yYWdlLCBuYW1lc3BhY2UsIHN1YmtleSl7XG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMubG9jYWxLZXkobmFtZXNwYWNlLCBzdWJrZXkpKVxuICB9LFxuXG4gIHVwZGF0ZUxvY2FsKGxvY2FsU3RvcmFnZSwgbmFtZXNwYWNlLCBzdWJrZXksIGluaXRpYWwsIGZ1bmMpe1xuICAgIGxldCBjdXJyZW50ID0gdGhpcy5nZXRMb2NhbChsb2NhbFN0b3JhZ2UsIG5hbWVzcGFjZSwgc3Via2V5KVxuICAgIGxldCBrZXkgPSB0aGlzLmxvY2FsS2V5KG5hbWVzcGFjZSwgc3Via2V5KVxuICAgIGxldCBuZXdWYWwgPSBjdXJyZW50ID09PSBudWxsID8gaW5pdGlhbCA6IGZ1bmMoY3VycmVudClcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KG5ld1ZhbCkpXG4gICAgcmV0dXJuIG5ld1ZhbFxuICB9LFxuXG4gIGdldExvY2FsKGxvY2FsU3RvcmFnZSwgbmFtZXNwYWNlLCBzdWJrZXkpe1xuICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMubG9jYWxLZXkobmFtZXNwYWNlLCBzdWJrZXkpKSlcbiAgfSxcblxuICB1cGRhdGVDdXJyZW50U3RhdGUoY2FsbGJhY2spe1xuICAgIGlmKCF0aGlzLmNhblB1c2hTdGF0ZSgpKXsgcmV0dXJuIH1cbiAgICBoaXN0b3J5LnJlcGxhY2VTdGF0ZShjYWxsYmFjayhoaXN0b3J5LnN0YXRlIHx8IHt9KSwgXCJcIiwgd2luZG93LmxvY2F0aW9uLmhyZWYpXG4gIH0sXG5cbiAgcHVzaFN0YXRlKGtpbmQsIG1ldGEsIHRvKXtcbiAgICBpZih0aGlzLmNhblB1c2hTdGF0ZSgpKXtcbiAgICAgIGlmKHRvICE9PSB3aW5kb3cubG9jYXRpb24uaHJlZil7XG4gICAgICAgIGlmKG1ldGEudHlwZSA9PSBcInJlZGlyZWN0XCIgJiYgbWV0YS5zY3JvbGwpe1xuICAgICAgICAgIC8vIElmIHdlJ3JlIHJlZGlyZWN0aW5nIHN0b3JlIHRoZSBjdXJyZW50IHNjcm9sbFkgZm9yIHRoZSBjdXJyZW50IGhpc3Rvcnkgc3RhdGUuXG4gICAgICAgICAgbGV0IGN1cnJlbnRTdGF0ZSA9IGhpc3Rvcnkuc3RhdGUgfHwge31cbiAgICAgICAgICBjdXJyZW50U3RhdGUuc2Nyb2xsID0gbWV0YS5zY3JvbGxcbiAgICAgICAgICBoaXN0b3J5LnJlcGxhY2VTdGF0ZShjdXJyZW50U3RhdGUsIFwiXCIsIHdpbmRvdy5sb2NhdGlvbi5ocmVmKVxuICAgICAgICB9XG5cbiAgICAgICAgZGVsZXRlIG1ldGEuc2Nyb2xsIC8vIE9ubHkgc3RvcmUgdGhlIHNjcm9sbCBpbiB0aGUgcmVkaXJlY3QgY2FzZS5cbiAgICAgICAgaGlzdG9yeVtraW5kICsgXCJTdGF0ZVwiXShtZXRhLCBcIlwiLCB0byB8fCBudWxsKSAvLyBJRSB3aWxsIGNvZXJjZSB1bmRlZmluZWQgdG8gc3RyaW5nXG4gICAgICAgIGxldCBoYXNoRWwgPSB0aGlzLmdldEhhc2hUYXJnZXRFbCh3aW5kb3cubG9jYXRpb24uaGFzaClcblxuICAgICAgICBpZihoYXNoRWwpe1xuICAgICAgICAgIGhhc2hFbC5zY3JvbGxJbnRvVmlldygpXG4gICAgICAgIH0gZWxzZSBpZihtZXRhLnR5cGUgPT09IFwicmVkaXJlY3RcIil7XG4gICAgICAgICAgd2luZG93LnNjcm9sbCgwLCAwKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVkaXJlY3QodG8pXG4gICAgfVxuICB9LFxuXG4gIHNldENvb2tpZShuYW1lLCB2YWx1ZSl7XG4gICAgZG9jdW1lbnQuY29va2llID0gYCR7bmFtZX09JHt2YWx1ZX1gXG4gIH0sXG5cbiAgZ2V0Q29va2llKG5hbWUpe1xuICAgIHJldHVybiBkb2N1bWVudC5jb29raWUucmVwbGFjZShuZXcgUmVnRXhwKGAoPzooPzpefC4qO1xccyopJHtuYW1lfVxccypcXD1cXHMqKFteO10qKS4qJCl8Xi4qJGApLCBcIiQxXCIpXG4gIH0sXG5cbiAgcmVkaXJlY3QodG9VUkwsIGZsYXNoKXtcbiAgICBpZihmbGFzaCl7IEJyb3dzZXIuc2V0Q29va2llKFwiX19waG9lbml4X2ZsYXNoX19cIiwgZmxhc2ggKyBcIjsgbWF4LWFnZT02MDAwMDsgcGF0aD0vXCIpIH1cbiAgICB3aW5kb3cubG9jYXRpb24gPSB0b1VSTFxuICB9LFxuXG4gIGxvY2FsS2V5KG5hbWVzcGFjZSwgc3Via2V5KXsgcmV0dXJuIGAke25hbWVzcGFjZX0tJHtzdWJrZXl9YCB9LFxuXG4gIGdldEhhc2hUYXJnZXRFbChtYXliZUhhc2gpe1xuICAgIGxldCBoYXNoID0gbWF5YmVIYXNoLnRvU3RyaW5nKCkuc3Vic3RyaW5nKDEpXG4gICAgaWYoaGFzaCA9PT0gXCJcIil7IHJldHVybiB9XG4gICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGhhc2gpIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGFbbmFtZT1cIiR7aGFzaH1cIl1gKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJyb3dzZXJcbiIsICJsZXQgQVJJQSA9IHtcbiAgZm9jdXNNYWluKCl7XG4gICAgbGV0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluIGgxLCBtYWluLCBoMVwiKVxuICAgIGlmKHRhcmdldCl7XG4gICAgICBsZXQgb3JpZ1RhYkluZGV4ID0gdGFyZ2V0LnRhYkluZGV4XG4gICAgICB0YXJnZXQudGFiSW5kZXggPSAtMVxuICAgICAgdGFyZ2V0LmZvY3VzKClcbiAgICAgIHRhcmdldC50YWJJbmRleCA9IG9yaWdUYWJJbmRleFxuICAgIH1cbiAgfSxcblxuICBhbnlPZihpbnN0YW5jZSwgY2xhc3Nlcyl7IHJldHVybiBjbGFzc2VzLmZpbmQobmFtZSA9PiBpbnN0YW5jZSBpbnN0YW5jZW9mIG5hbWUpIH0sXG5cbiAgaXNGb2N1c2FibGUoZWwsIGludGVyYWN0aXZlT25seSl7XG4gICAgcmV0dXJuKFxuICAgICAgKGVsIGluc3RhbmNlb2YgSFRNTEFuY2hvckVsZW1lbnQgJiYgZWwucmVsICE9PSBcImlnbm9yZVwiKSB8fFxuICAgICAgKGVsIGluc3RhbmNlb2YgSFRNTEFyZWFFbGVtZW50ICYmIGVsLmhyZWYgIT09IHVuZGVmaW5lZCkgfHxcbiAgICAgICghZWwuZGlzYWJsZWQgJiYgKHRoaXMuYW55T2YoZWwsIFtIVE1MSW5wdXRFbGVtZW50LCBIVE1MU2VsZWN0RWxlbWVudCwgSFRNTFRleHRBcmVhRWxlbWVudCwgSFRNTEJ1dHRvbkVsZW1lbnRdKSkpIHx8XG4gICAgICAoZWwgaW5zdGFuY2VvZiBIVE1MSUZyYW1lRWxlbWVudCkgfHxcbiAgICAgIChlbC50YWJJbmRleCA+IDAgfHwgKCFpbnRlcmFjdGl2ZU9ubHkgJiYgZWwuZ2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIikgIT09IG51bGwgJiYgZWwuZ2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIikgIT09IFwidHJ1ZVwiKSlcbiAgICApXG4gIH0sXG5cbiAgYXR0ZW1wdEZvY3VzKGVsLCBpbnRlcmFjdGl2ZU9ubHkpe1xuICAgIGlmKHRoaXMuaXNGb2N1c2FibGUoZWwsIGludGVyYWN0aXZlT25seSkpeyB0cnl7IGVsLmZvY3VzKCkgfSBjYXRjaChlKXt9IH1cbiAgICByZXR1cm4gISFkb2N1bWVudC5hY3RpdmVFbGVtZW50ICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuaXNTYW1lTm9kZShlbClcbiAgfSxcblxuICBmb2N1c0ZpcnN0SW50ZXJhY3RpdmUoZWwpe1xuICAgIGxldCBjaGlsZCA9IGVsLmZpcnN0RWxlbWVudENoaWxkXG4gICAgd2hpbGUoY2hpbGQpe1xuICAgICAgaWYodGhpcy5hdHRlbXB0Rm9jdXMoY2hpbGQsIHRydWUpIHx8IHRoaXMuZm9jdXNGaXJzdEludGVyYWN0aXZlKGNoaWxkLCB0cnVlKSl7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgICBjaGlsZCA9IGNoaWxkLm5leHRFbGVtZW50U2libGluZ1xuICAgIH1cbiAgfSxcblxuICBmb2N1c0ZpcnN0KGVsKXtcbiAgICBsZXQgY2hpbGQgPSBlbC5maXJzdEVsZW1lbnRDaGlsZFxuICAgIHdoaWxlKGNoaWxkKXtcbiAgICAgIGlmKHRoaXMuYXR0ZW1wdEZvY3VzKGNoaWxkKSB8fCB0aGlzLmZvY3VzRmlyc3QoY2hpbGQpKXtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICAgIGNoaWxkID0gY2hpbGQubmV4dEVsZW1lbnRTaWJsaW5nXG4gICAgfVxuICB9LFxuXG4gIGZvY3VzTGFzdChlbCl7XG4gICAgbGV0IGNoaWxkID0gZWwubGFzdEVsZW1lbnRDaGlsZFxuICAgIHdoaWxlKGNoaWxkKXtcbiAgICAgIGlmKHRoaXMuYXR0ZW1wdEZvY3VzKGNoaWxkKSB8fCB0aGlzLmZvY3VzTGFzdChjaGlsZCkpe1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgICAgY2hpbGQgPSBjaGlsZC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nXG4gICAgfVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBBUklBIiwgImltcG9ydCBET00gZnJvbSBcIi4vZG9tXCJcbmltcG9ydCBBUklBIGZyb20gXCIuL2FyaWFcIlxuXG5sZXQgZm9jdXNTdGFjayA9IG51bGxcbmxldCBkZWZhdWx0X3RyYW5zaXRpb25fdGltZSA9IDIwMFxuXG5sZXQgSlMgPSB7XG4gIGV4ZWMoZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGRlZmF1bHRzKXtcbiAgICBsZXQgW2RlZmF1bHRLaW5kLCBkZWZhdWx0QXJnc10gPSBkZWZhdWx0cyB8fCBbbnVsbCwge2NhbGxiYWNrOiBkZWZhdWx0cyAmJiBkZWZhdWx0cy5jYWxsYmFja31dXG4gICAgbGV0IGNvbW1hbmRzID0gcGh4RXZlbnQuY2hhckF0KDApID09PSBcIltcIiA/XG4gICAgICBKU09OLnBhcnNlKHBoeEV2ZW50KSA6IFtbZGVmYXVsdEtpbmQsIGRlZmF1bHRBcmdzXV1cblxuICAgIGNvbW1hbmRzLmZvckVhY2goKFtraW5kLCBhcmdzXSkgPT4ge1xuICAgICAgaWYoa2luZCA9PT0gZGVmYXVsdEtpbmQgJiYgZGVmYXVsdEFyZ3MuZGF0YSl7XG4gICAgICAgIGFyZ3MuZGF0YSA9IE9iamVjdC5hc3NpZ24oYXJncy5kYXRhIHx8IHt9LCBkZWZhdWx0QXJncy5kYXRhKVxuICAgICAgICBhcmdzLmNhbGxiYWNrID0gYXJncy5jYWxsYmFjayB8fCBkZWZhdWx0QXJncy5jYWxsYmFja1xuICAgICAgfVxuICAgICAgdGhpcy5maWx0ZXJUb0Vscyhzb3VyY2VFbCwgYXJncykuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgIHRoaXNbYGV4ZWNfJHtraW5kfWBdKGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCwgYXJncylcbiAgICAgIH0pXG4gICAgfSlcbiAgfSxcblxuICBpc1Zpc2libGUoZWwpe1xuICAgIHJldHVybiAhIShlbC5vZmZzZXRXaWR0aCB8fCBlbC5vZmZzZXRIZWlnaHQgfHwgZWwuZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGggPiAwKVxuICB9LFxuXG4gIC8vIHJldHVybnMgdHJ1ZSBpZiBhbnkgcGFydCBvZiB0aGUgZWxlbWVudCBpcyBpbnNpZGUgdGhlIHZpZXdwb3J0XG4gIGlzSW5WaWV3cG9ydChlbCl7XG4gICAgY29uc3QgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgY29uc3Qgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHRcbiAgICBjb25zdCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aFxuXG4gICAgcmV0dXJuIChcbiAgICAgIHJlY3QucmlnaHQgPiAwICYmXG4gICAgICByZWN0LmJvdHRvbSA+IDAgJiZcbiAgICAgIHJlY3QubGVmdCA8IHdpbmRvd1dpZHRoICYmXG4gICAgICByZWN0LnRvcCA8IHdpbmRvd0hlaWdodFxuICAgIClcbiAgfSxcblxuICAvLyBwcml2YXRlXG5cbiAgLy8gY29tbWFuZHNcblxuICBleGVjX2V4ZWMoZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsLCB7YXR0ciwgdG99KXtcbiAgICBsZXQgbm9kZXMgPSB0byA/IERPTS5hbGwoZG9jdW1lbnQsIHRvKSA6IFtzb3VyY2VFbF1cbiAgICBub2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgbGV0IGVuY29kZWRKUyA9IG5vZGUuZ2V0QXR0cmlidXRlKGF0dHIpXG4gICAgICBpZighZW5jb2RlZEpTKXsgdGhyb3cgbmV3IEVycm9yKGBleHBlY3RlZCAke2F0dHJ9IHRvIGNvbnRhaW4gSlMgY29tbWFuZCBvbiBcIiR7dG99XCJgKSB9XG4gICAgICB2aWV3LmxpdmVTb2NrZXQuZXhlY0pTKG5vZGUsIGVuY29kZWRKUywgZXZlbnRUeXBlKVxuICAgIH0pXG4gIH0sXG5cbiAgZXhlY19kaXNwYXRjaChldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZWwsIHt0bywgZXZlbnQsIGRldGFpbCwgYnViYmxlc30pe1xuICAgIGRldGFpbCA9IGRldGFpbCB8fCB7fVxuICAgIGRldGFpbC5kaXNwYXRjaGVyID0gc291cmNlRWxcbiAgICBET00uZGlzcGF0Y2hFdmVudChlbCwgZXZlbnQsIHtkZXRhaWwsIGJ1YmJsZXN9KVxuICB9LFxuXG4gIGV4ZWNfcHVzaChldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZWwsIGFyZ3Mpe1xuICAgIGxldCB7ZXZlbnQsIGRhdGEsIHRhcmdldCwgcGFnZV9sb2FkaW5nLCBsb2FkaW5nLCB2YWx1ZSwgZGlzcGF0Y2hlciwgY2FsbGJhY2t9ID0gYXJnc1xuICAgIGxldCBwdXNoT3B0cyA9IHtsb2FkaW5nLCB2YWx1ZSwgdGFyZ2V0LCBwYWdlX2xvYWRpbmc6ICEhcGFnZV9sb2FkaW5nfVxuICAgIGxldCB0YXJnZXRTcmMgPSBldmVudFR5cGUgPT09IFwiY2hhbmdlXCIgJiYgZGlzcGF0Y2hlciA/IGRpc3BhdGNoZXIgOiBzb3VyY2VFbFxuICAgIGxldCBwaHhUYXJnZXQgPSB0YXJnZXQgfHwgdGFyZ2V0U3JjLmdldEF0dHJpYnV0ZSh2aWV3LmJpbmRpbmcoXCJ0YXJnZXRcIikpIHx8IHRhcmdldFNyY1xuICAgIHZpZXcud2l0aGluVGFyZ2V0cyhwaHhUYXJnZXQsICh0YXJnZXRWaWV3LCB0YXJnZXRDdHgpID0+IHtcbiAgICAgIGlmKCF0YXJnZXRWaWV3LmlzQ29ubmVjdGVkKCkpeyByZXR1cm4gfVxuICAgICAgaWYoZXZlbnRUeXBlID09PSBcImNoYW5nZVwiKXtcbiAgICAgICAgbGV0IHtuZXdDaWQsIF90YXJnZXR9ID0gYXJnc1xuICAgICAgICBfdGFyZ2V0ID0gX3RhcmdldCB8fCAoRE9NLmlzRm9ybUlucHV0KHNvdXJjZUVsKSA/IHNvdXJjZUVsLm5hbWUgOiB1bmRlZmluZWQpXG4gICAgICAgIGlmKF90YXJnZXQpeyBwdXNoT3B0cy5fdGFyZ2V0ID0gX3RhcmdldCB9XG4gICAgICAgIHRhcmdldFZpZXcucHVzaElucHV0KHNvdXJjZUVsLCB0YXJnZXRDdHgsIG5ld0NpZCwgZXZlbnQgfHwgcGh4RXZlbnQsIHB1c2hPcHRzLCBjYWxsYmFjaylcbiAgICAgIH0gZWxzZSBpZihldmVudFR5cGUgPT09IFwic3VibWl0XCIpe1xuICAgICAgICBsZXQge3N1Ym1pdHRlcn0gPSBhcmdzXG4gICAgICAgIHRhcmdldFZpZXcuc3VibWl0Rm9ybShzb3VyY2VFbCwgdGFyZ2V0Q3R4LCBldmVudCB8fCBwaHhFdmVudCwgc3VibWl0dGVyLCBwdXNoT3B0cywgY2FsbGJhY2spXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXRWaWV3LnB1c2hFdmVudChldmVudFR5cGUsIHNvdXJjZUVsLCB0YXJnZXRDdHgsIGV2ZW50IHx8IHBoeEV2ZW50LCBkYXRhLCBwdXNoT3B0cywgY2FsbGJhY2spXG4gICAgICB9XG4gICAgfSlcbiAgfSxcblxuICBleGVjX25hdmlnYXRlKGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCwge2hyZWYsIHJlcGxhY2V9KXtcbiAgICB2aWV3LmxpdmVTb2NrZXQuaGlzdG9yeVJlZGlyZWN0KGhyZWYsIHJlcGxhY2UgPyBcInJlcGxhY2VcIiA6IFwicHVzaFwiKVxuICB9LFxuXG4gIGV4ZWNfcGF0Y2goZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsLCB7aHJlZiwgcmVwbGFjZX0pe1xuICAgIHZpZXcubGl2ZVNvY2tldC5wdXNoSGlzdG9yeVBhdGNoKGhyZWYsIHJlcGxhY2UgPyBcInJlcGxhY2VcIiA6IFwicHVzaFwiLCBzb3VyY2VFbClcbiAgfSxcblxuICBleGVjX2ZvY3VzKGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCl7XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBBUklBLmF0dGVtcHRGb2N1cyhlbCkpXG4gIH0sXG5cbiAgZXhlY19mb2N1c19maXJzdChldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZWwpe1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gQVJJQS5mb2N1c0ZpcnN0SW50ZXJhY3RpdmUoZWwpIHx8IEFSSUEuZm9jdXNGaXJzdChlbCkpXG4gIH0sXG5cbiAgZXhlY19wdXNoX2ZvY3VzKGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCl7XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBmb2N1c1N0YWNrID0gZWwgfHwgc291cmNlRWwpXG4gIH0sXG5cbiAgZXhlY19wb3BfZm9jdXMoZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsKXtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIGlmKGZvY3VzU3RhY2speyBmb2N1c1N0YWNrLmZvY3VzKCkgfVxuICAgICAgZm9jdXNTdGFjayA9IG51bGxcbiAgICB9KVxuICB9LFxuXG4gIGV4ZWNfYWRkX2NsYXNzKGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCwge25hbWVzLCB0cmFuc2l0aW9uLCB0aW1lfSl7XG4gICAgdGhpcy5hZGRPclJlbW92ZUNsYXNzZXMoZWwsIG5hbWVzLCBbXSwgdHJhbnNpdGlvbiwgdGltZSwgdmlldylcbiAgfSxcblxuICBleGVjX3JlbW92ZV9jbGFzcyhldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZWwsIHtuYW1lcywgdHJhbnNpdGlvbiwgdGltZX0pe1xuICAgIHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBbXSwgbmFtZXMsIHRyYW5zaXRpb24sIHRpbWUsIHZpZXcpXG4gIH0sXG5cbiAgZXhlY190b2dnbGVfY2xhc3MoZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsLCB7dG8sIG5hbWVzLCB0cmFuc2l0aW9uLCB0aW1lfSl7XG4gICAgdGhpcy50b2dnbGVDbGFzc2VzKGVsLCBuYW1lcywgdHJhbnNpdGlvbiwgdmlldylcbiAgfSxcblxuICBleGVjX3RvZ2dsZV9hdHRyKGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCwge2F0dHI6IFthdHRyLCB2YWwxLCB2YWwyXX0pe1xuICAgIGlmKGVsLmhhc0F0dHJpYnV0ZShhdHRyKSl7XG4gICAgICBpZih2YWwyICE9PSB1bmRlZmluZWQpe1xuICAgICAgICAvLyB0b2dnbGUgYmV0d2VlbiB2YWwxIGFuZCB2YWwyXG4gICAgICAgIGlmKGVsLmdldEF0dHJpYnV0ZShhdHRyKSA9PT0gdmFsMSl7XG4gICAgICAgICAgdGhpcy5zZXRPclJlbW92ZUF0dHJzKGVsLCBbW2F0dHIsIHZhbDJdXSwgW10pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXRPclJlbW92ZUF0dHJzKGVsLCBbW2F0dHIsIHZhbDFdXSwgW10pXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHJlbW92ZSBhdHRyXG4gICAgICAgIHRoaXMuc2V0T3JSZW1vdmVBdHRycyhlbCwgW10sIFthdHRyXSlcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRPclJlbW92ZUF0dHJzKGVsLCBbW2F0dHIsIHZhbDFdXSwgW10pXG4gICAgfVxuICB9LFxuXG4gIGV4ZWNfdHJhbnNpdGlvbihldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZWwsIHt0aW1lLCB0cmFuc2l0aW9ufSl7XG4gICAgdGhpcy5hZGRPclJlbW92ZUNsYXNzZXMoZWwsIFtdLCBbXSwgdHJhbnNpdGlvbiwgdGltZSwgdmlldylcbiAgfSxcblxuICBleGVjX3RvZ2dsZShldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZWwsIHtkaXNwbGF5LCBpbnMsIG91dHMsIHRpbWV9KXtcbiAgICB0aGlzLnRvZ2dsZShldmVudFR5cGUsIHZpZXcsIGVsLCBkaXNwbGF5LCBpbnMsIG91dHMsIHRpbWUpXG4gIH0sXG5cbiAgZXhlY19zaG93KGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCwge2Rpc3BsYXksIHRyYW5zaXRpb24sIHRpbWV9KXtcbiAgICB0aGlzLnNob3coZXZlbnRUeXBlLCB2aWV3LCBlbCwgZGlzcGxheSwgdHJhbnNpdGlvbiwgdGltZSlcbiAgfSxcblxuICBleGVjX2hpZGUoZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsLCB7ZGlzcGxheSwgdHJhbnNpdGlvbiwgdGltZX0pe1xuICAgIHRoaXMuaGlkZShldmVudFR5cGUsIHZpZXcsIGVsLCBkaXNwbGF5LCB0cmFuc2l0aW9uLCB0aW1lKVxuICB9LFxuXG4gIGV4ZWNfc2V0X2F0dHIoZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsLCB7YXR0cjogW2F0dHIsIHZhbF19KXtcbiAgICB0aGlzLnNldE9yUmVtb3ZlQXR0cnMoZWwsIFtbYXR0ciwgdmFsXV0sIFtdKVxuICB9LFxuXG4gIGV4ZWNfcmVtb3ZlX2F0dHIoZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsLCB7YXR0cn0pe1xuICAgIHRoaXMuc2V0T3JSZW1vdmVBdHRycyhlbCwgW10sIFthdHRyXSlcbiAgfSxcblxuICAvLyB1dGlscyBmb3IgY29tbWFuZHNcblxuICBzaG93KGV2ZW50VHlwZSwgdmlldywgZWwsIGRpc3BsYXksIHRyYW5zaXRpb24sIHRpbWUpe1xuICAgIGlmKCF0aGlzLmlzVmlzaWJsZShlbCkpe1xuICAgICAgdGhpcy50b2dnbGUoZXZlbnRUeXBlLCB2aWV3LCBlbCwgZGlzcGxheSwgdHJhbnNpdGlvbiwgbnVsbCwgdGltZSlcbiAgICB9XG4gIH0sXG5cbiAgaGlkZShldmVudFR5cGUsIHZpZXcsIGVsLCBkaXNwbGF5LCB0cmFuc2l0aW9uLCB0aW1lKXtcbiAgICBpZih0aGlzLmlzVmlzaWJsZShlbCkpe1xuICAgICAgdGhpcy50b2dnbGUoZXZlbnRUeXBlLCB2aWV3LCBlbCwgZGlzcGxheSwgbnVsbCwgdHJhbnNpdGlvbiwgdGltZSlcbiAgICB9XG4gIH0sXG5cbiAgdG9nZ2xlKGV2ZW50VHlwZSwgdmlldywgZWwsIGRpc3BsYXksIGlucywgb3V0cywgdGltZSl7XG4gICAgdGltZSA9IHRpbWUgfHwgZGVmYXVsdF90cmFuc2l0aW9uX3RpbWVcbiAgICBsZXQgW2luQ2xhc3NlcywgaW5TdGFydENsYXNzZXMsIGluRW5kQ2xhc3Nlc10gPSBpbnMgfHwgW1tdLCBbXSwgW11dXG4gICAgbGV0IFtvdXRDbGFzc2VzLCBvdXRTdGFydENsYXNzZXMsIG91dEVuZENsYXNzZXNdID0gb3V0cyB8fCBbW10sIFtdLCBbXV1cbiAgICBpZihpbkNsYXNzZXMubGVuZ3RoID4gMCB8fCBvdXRDbGFzc2VzLmxlbmd0aCA+IDApe1xuICAgICAgaWYodGhpcy5pc1Zpc2libGUoZWwpKXtcbiAgICAgICAgbGV0IG9uU3RhcnQgPSAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5hZGRPclJlbW92ZUNsYXNzZXMoZWwsIG91dFN0YXJ0Q2xhc3NlcywgaW5DbGFzc2VzLmNvbmNhdChpblN0YXJ0Q2xhc3NlcykuY29uY2F0KGluRW5kQ2xhc3NlcykpXG4gICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFkZE9yUmVtb3ZlQ2xhc3NlcyhlbCwgb3V0Q2xhc3NlcywgW10pXG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBvdXRFbmRDbGFzc2VzLCBvdXRTdGFydENsYXNzZXMpKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgZWwuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJwaHg6aGlkZS1zdGFydFwiKSlcbiAgICAgICAgdmlldy50cmFuc2l0aW9uKHRpbWUsIG9uU3RhcnQsICgpID0+IHtcbiAgICAgICAgICB0aGlzLmFkZE9yUmVtb3ZlQ2xhc3NlcyhlbCwgW10sIG91dENsYXNzZXMuY29uY2F0KG91dEVuZENsYXNzZXMpKVxuICAgICAgICAgIERPTS5wdXRTdGlja3koZWwsIFwidG9nZ2xlXCIsIGN1cnJlbnRFbCA9PiBjdXJyZW50RWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiKVxuICAgICAgICAgIGVsLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwicGh4OmhpZGUtZW5kXCIpKVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYoZXZlbnRUeXBlID09PSBcInJlbW92ZVwiKXsgcmV0dXJuIH1cbiAgICAgICAgbGV0IG9uU3RhcnQgPSAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5hZGRPclJlbW92ZUNsYXNzZXMoZWwsIGluU3RhcnRDbGFzc2VzLCBvdXRDbGFzc2VzLmNvbmNhdChvdXRTdGFydENsYXNzZXMpLmNvbmNhdChvdXRFbmRDbGFzc2VzKSlcbiAgICAgICAgICBsZXQgc3RpY2t5RGlzcGxheSA9IGRpc3BsYXkgfHwgdGhpcy5kZWZhdWx0RGlzcGxheShlbClcbiAgICAgICAgICBET00ucHV0U3RpY2t5KGVsLCBcInRvZ2dsZVwiLCBjdXJyZW50RWwgPT4gY3VycmVudEVsLnN0eWxlLmRpc3BsYXkgPSBzdGlja3lEaXNwbGF5KVxuICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hZGRPclJlbW92ZUNsYXNzZXMoZWwsIGluQ2xhc3NlcywgW10pXG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBpbkVuZENsYXNzZXMsIGluU3RhcnRDbGFzc2VzKSlcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGVsLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwicGh4OnNob3ctc3RhcnRcIikpXG4gICAgICAgIHZpZXcudHJhbnNpdGlvbih0aW1lLCBvblN0YXJ0LCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5hZGRPclJlbW92ZUNsYXNzZXMoZWwsIFtdLCBpbkNsYXNzZXMuY29uY2F0KGluRW5kQ2xhc3NlcykpXG4gICAgICAgICAgZWwuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJwaHg6c2hvdy1lbmRcIikpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmKHRoaXMuaXNWaXNpYmxlKGVsKSl7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgIGVsLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwicGh4OmhpZGUtc3RhcnRcIikpXG4gICAgICAgICAgRE9NLnB1dFN0aWNreShlbCwgXCJ0b2dnbGVcIiwgY3VycmVudEVsID0+IGN1cnJlbnRFbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCIpXG4gICAgICAgICAgZWwuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJwaHg6aGlkZS1lbmRcIikpXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICBlbC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcInBoeDpzaG93LXN0YXJ0XCIpKVxuICAgICAgICAgIGxldCBzdGlja3lEaXNwbGF5ID0gZGlzcGxheSB8fCB0aGlzLmRlZmF1bHREaXNwbGF5KGVsKVxuICAgICAgICAgIERPTS5wdXRTdGlja3koZWwsIFwidG9nZ2xlXCIsIGN1cnJlbnRFbCA9PiBjdXJyZW50RWwuc3R5bGUuZGlzcGxheSA9IHN0aWNreURpc3BsYXkpXG4gICAgICAgICAgZWwuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJwaHg6c2hvdy1lbmRcIikpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHRvZ2dsZUNsYXNzZXMoZWwsIGNsYXNzZXMsIHRyYW5zaXRpb24sIHRpbWUsIHZpZXcpe1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgbGV0IFtwcmV2QWRkcywgcHJldlJlbW92ZXNdID0gRE9NLmdldFN0aWNreShlbCwgXCJjbGFzc2VzXCIsIFtbXSwgW11dKVxuICAgICAgbGV0IG5ld0FkZHMgPSBjbGFzc2VzLmZpbHRlcihuYW1lID0+IHByZXZBZGRzLmluZGV4T2YobmFtZSkgPCAwICYmICFlbC5jbGFzc0xpc3QuY29udGFpbnMobmFtZSkpXG4gICAgICBsZXQgbmV3UmVtb3ZlcyA9IGNsYXNzZXMuZmlsdGVyKG5hbWUgPT4gcHJldlJlbW92ZXMuaW5kZXhPZihuYW1lKSA8IDAgJiYgZWwuY2xhc3NMaXN0LmNvbnRhaW5zKG5hbWUpKVxuICAgICAgdGhpcy5hZGRPclJlbW92ZUNsYXNzZXMoZWwsIG5ld0FkZHMsIG5ld1JlbW92ZXMsIHRyYW5zaXRpb24sIHRpbWUsIHZpZXcpXG4gICAgfSlcbiAgfSxcblxuICBhZGRPclJlbW92ZUNsYXNzZXMoZWwsIGFkZHMsIHJlbW92ZXMsIHRyYW5zaXRpb24sIHRpbWUsIHZpZXcpe1xuICAgIHRpbWUgPSB0aW1lIHx8IGRlZmF1bHRfdHJhbnNpdGlvbl90aW1lXG4gICAgbGV0IFt0cmFuc2l0aW9uUnVuLCB0cmFuc2l0aW9uU3RhcnQsIHRyYW5zaXRpb25FbmRdID0gdHJhbnNpdGlvbiB8fCBbW10sIFtdLCBbXV1cbiAgICBpZih0cmFuc2l0aW9uUnVuLmxlbmd0aCA+IDApe1xuICAgICAgbGV0IG9uU3RhcnQgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCB0cmFuc2l0aW9uU3RhcnQsIFtdLmNvbmNhdCh0cmFuc2l0aW9uUnVuKS5jb25jYXQodHJhbnNpdGlvbkVuZCkpXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCB0cmFuc2l0aW9uUnVuLCBbXSlcbiAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCB0cmFuc2l0aW9uRW5kLCB0cmFuc2l0aW9uU3RhcnQpKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgbGV0IG9uRG9uZSA9ICgpID0+IHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBhZGRzLmNvbmNhdCh0cmFuc2l0aW9uRW5kKSwgcmVtb3Zlcy5jb25jYXQodHJhbnNpdGlvblJ1bikuY29uY2F0KHRyYW5zaXRpb25TdGFydCkpXG4gICAgICByZXR1cm4gdmlldy50cmFuc2l0aW9uKHRpbWUsIG9uU3RhcnQsIG9uRG9uZSlcbiAgICB9XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIGxldCBbcHJldkFkZHMsIHByZXZSZW1vdmVzXSA9IERPTS5nZXRTdGlja3koZWwsIFwiY2xhc3Nlc1wiLCBbW10sIFtdXSlcbiAgICAgIGxldCBrZWVwQWRkcyA9IGFkZHMuZmlsdGVyKG5hbWUgPT4gcHJldkFkZHMuaW5kZXhPZihuYW1lKSA8IDAgJiYgIWVsLmNsYXNzTGlzdC5jb250YWlucyhuYW1lKSlcbiAgICAgIGxldCBrZWVwUmVtb3ZlcyA9IHJlbW92ZXMuZmlsdGVyKG5hbWUgPT4gcHJldlJlbW92ZXMuaW5kZXhPZihuYW1lKSA8IDAgJiYgZWwuY2xhc3NMaXN0LmNvbnRhaW5zKG5hbWUpKVxuICAgICAgbGV0IG5ld0FkZHMgPSBwcmV2QWRkcy5maWx0ZXIobmFtZSA9PiByZW1vdmVzLmluZGV4T2YobmFtZSkgPCAwKS5jb25jYXQoa2VlcEFkZHMpXG4gICAgICBsZXQgbmV3UmVtb3ZlcyA9IHByZXZSZW1vdmVzLmZpbHRlcihuYW1lID0+IGFkZHMuaW5kZXhPZihuYW1lKSA8IDApLmNvbmNhdChrZWVwUmVtb3ZlcylcblxuICAgICAgRE9NLnB1dFN0aWNreShlbCwgXCJjbGFzc2VzXCIsIGN1cnJlbnRFbCA9PiB7XG4gICAgICAgIGN1cnJlbnRFbC5jbGFzc0xpc3QucmVtb3ZlKC4uLm5ld1JlbW92ZXMpXG4gICAgICAgIGN1cnJlbnRFbC5jbGFzc0xpc3QuYWRkKC4uLm5ld0FkZHMpXG4gICAgICAgIHJldHVybiBbbmV3QWRkcywgbmV3UmVtb3Zlc11cbiAgICAgIH0pXG4gICAgfSlcbiAgfSxcblxuICBzZXRPclJlbW92ZUF0dHJzKGVsLCBzZXRzLCByZW1vdmVzKXtcbiAgICBsZXQgW3ByZXZTZXRzLCBwcmV2UmVtb3Zlc10gPSBET00uZ2V0U3RpY2t5KGVsLCBcImF0dHJzXCIsIFtbXSwgW11dKVxuXG4gICAgbGV0IGFsdGVyZWRBdHRycyA9IHNldHMubWFwKChbYXR0ciwgX3ZhbF0pID0+IGF0dHIpLmNvbmNhdChyZW1vdmVzKVxuICAgIGxldCBuZXdTZXRzID0gcHJldlNldHMuZmlsdGVyKChbYXR0ciwgX3ZhbF0pID0+ICFhbHRlcmVkQXR0cnMuaW5jbHVkZXMoYXR0cikpLmNvbmNhdChzZXRzKVxuICAgIGxldCBuZXdSZW1vdmVzID0gcHJldlJlbW92ZXMuZmlsdGVyKChhdHRyKSA9PiAhYWx0ZXJlZEF0dHJzLmluY2x1ZGVzKGF0dHIpKS5jb25jYXQocmVtb3ZlcylcblxuICAgIERPTS5wdXRTdGlja3koZWwsIFwiYXR0cnNcIiwgY3VycmVudEVsID0+IHtcbiAgICAgIG5ld1JlbW92ZXMuZm9yRWFjaChhdHRyID0+IGN1cnJlbnRFbC5yZW1vdmVBdHRyaWJ1dGUoYXR0cikpXG4gICAgICBuZXdTZXRzLmZvckVhY2goKFthdHRyLCB2YWxdKSA9PiBjdXJyZW50RWwuc2V0QXR0cmlidXRlKGF0dHIsIHZhbCkpXG4gICAgICByZXR1cm4gW25ld1NldHMsIG5ld1JlbW92ZXNdXG4gICAgfSlcbiAgfSxcblxuICBoYXNBbGxDbGFzc2VzKGVsLCBjbGFzc2VzKXsgcmV0dXJuIGNsYXNzZXMuZXZlcnkobmFtZSA9PiBlbC5jbGFzc0xpc3QuY29udGFpbnMobmFtZSkpIH0sXG5cbiAgaXNUb2dnbGVkT3V0KGVsLCBvdXRDbGFzc2VzKXtcbiAgICByZXR1cm4gIXRoaXMuaXNWaXNpYmxlKGVsKSB8fCB0aGlzLmhhc0FsbENsYXNzZXMoZWwsIG91dENsYXNzZXMpXG4gIH0sXG5cbiAgZmlsdGVyVG9FbHMoc291cmNlRWwsIHt0b30pe1xuICAgIHJldHVybiB0byA/IERPTS5hbGwoZG9jdW1lbnQsIHRvKSA6IFtzb3VyY2VFbF1cbiAgfSxcblxuICBkZWZhdWx0RGlzcGxheShlbCl7XG4gICAgcmV0dXJuIHt0cjogXCJ0YWJsZS1yb3dcIiwgdGQ6IFwidGFibGUtY2VsbFwifVtlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCldIHx8IFwiYmxvY2tcIlxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEpTIiwgImltcG9ydCB7XG4gIENIRUNLQUJMRV9JTlBVVFMsXG4gIERFQk9VTkNFX1BSRVZfS0VZLFxuICBERUJPVU5DRV9UUklHR0VSLFxuICBGT0NVU0FCTEVfSU5QVVRTLFxuICBQSFhfQ09NUE9ORU5ULFxuICBQSFhfRVZFTlRfQ0xBU1NFUyxcbiAgUEhYX0hBU19GT0NVU0VELFxuICBQSFhfSEFTX1NVQk1JVFRFRCxcbiAgUEhYX01BSU4sXG4gIFBIWF9OT19GRUVEQkFDS19DTEFTUyxcbiAgUEhYX1BBUkVOVF9JRCxcbiAgUEhYX1BSSVZBVEUsXG4gIFBIWF9SRUYsXG4gIFBIWF9SRUZfU1JDLFxuICBQSFhfUk9PVF9JRCxcbiAgUEhYX1NFU1NJT04sXG4gIFBIWF9TVEFUSUMsXG4gIFBIWF9VUExPQURfUkVGLFxuICBQSFhfVklFV19TRUxFQ1RPUixcbiAgUEhYX1NUSUNLWSxcbiAgVEhST1RUTEVEXG59IGZyb20gXCIuL2NvbnN0YW50c1wiXG5cbmltcG9ydCBKUyBmcm9tIFwiLi9qc1wiXG5cbmltcG9ydCB7XG4gIGxvZ0Vycm9yXG59IGZyb20gXCIuL3V0aWxzXCJcblxubGV0IERPTSA9IHtcbiAgYnlJZChpZCl7IHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkgfHwgbG9nRXJyb3IoYG5vIGlkIGZvdW5kIGZvciAke2lkfWApIH0sXG5cbiAgcmVtb3ZlQ2xhc3MoZWwsIGNsYXNzTmFtZSl7XG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpXG4gICAgaWYoZWwuY2xhc3NMaXN0Lmxlbmd0aCA9PT0gMCl7IGVsLnJlbW92ZUF0dHJpYnV0ZShcImNsYXNzXCIpIH1cbiAgfSxcblxuICBhbGwobm9kZSwgcXVlcnksIGNhbGxiYWNrKXtcbiAgICBpZighbm9kZSl7IHJldHVybiBbXSB9XG4gICAgbGV0IGFycmF5ID0gQXJyYXkuZnJvbShub2RlLnF1ZXJ5U2VsZWN0b3JBbGwocXVlcnkpKVxuICAgIHJldHVybiBjYWxsYmFjayA/IGFycmF5LmZvckVhY2goY2FsbGJhY2spIDogYXJyYXlcbiAgfSxcblxuICBjaGlsZE5vZGVMZW5ndGgoaHRtbCl7XG4gICAgbGV0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpXG4gICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gaHRtbFxuICAgIHJldHVybiB0ZW1wbGF0ZS5jb250ZW50LmNoaWxkRWxlbWVudENvdW50XG4gIH0sXG5cbiAgaXNVcGxvYWRJbnB1dChlbCl7IHJldHVybiBlbC50eXBlID09PSBcImZpbGVcIiAmJiBlbC5nZXRBdHRyaWJ1dGUoUEhYX1VQTE9BRF9SRUYpICE9PSBudWxsIH0sXG5cbiAgaXNBdXRvVXBsb2FkKGlucHV0RWwpeyByZXR1cm4gaW5wdXRFbC5oYXNBdHRyaWJ1dGUoXCJkYXRhLXBoeC1hdXRvLXVwbG9hZFwiKSB9LFxuXG4gIGZpbmRVcGxvYWRJbnB1dHMobm9kZSl7XG4gICAgY29uc3QgZm9ybUlkID0gbm9kZS5pZFxuICAgIGNvbnN0IGlucHV0c091dHNpZGVGb3JtID0gdGhpcy5hbGwoZG9jdW1lbnQsIGBpbnB1dFt0eXBlPVwiZmlsZVwiXVske1BIWF9VUExPQURfUkVGfV1bZm9ybT1cIiR7Zm9ybUlkfVwiXWApXG4gICAgcmV0dXJuIHRoaXMuYWxsKG5vZGUsIGBpbnB1dFt0eXBlPVwiZmlsZVwiXVske1BIWF9VUExPQURfUkVGfV1gKS5jb25jYXQoaW5wdXRzT3V0c2lkZUZvcm0pXG4gIH0sXG5cbiAgZmluZENvbXBvbmVudE5vZGVMaXN0KG5vZGUsIGNpZCl7XG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyV2l0aGluU2FtZUxpdmVWaWV3KHRoaXMuYWxsKG5vZGUsIGBbJHtQSFhfQ09NUE9ORU5UfT1cIiR7Y2lkfVwiXWApLCBub2RlKVxuICB9LFxuXG4gIGlzUGh4RGVzdHJveWVkKG5vZGUpe1xuICAgIHJldHVybiBub2RlLmlkICYmIERPTS5wcml2YXRlKG5vZGUsIFwiZGVzdHJveWVkXCIpID8gdHJ1ZSA6IGZhbHNlXG4gIH0sXG5cbiAgd2FudHNOZXdUYWIoZSl7XG4gICAgbGV0IHdhbnRzTmV3VGFiID0gZS5jdHJsS2V5IHx8IGUuc2hpZnRLZXkgfHwgZS5tZXRhS2V5IHx8IChlLmJ1dHRvbiAmJiBlLmJ1dHRvbiA9PT0gMSlcbiAgICBsZXQgaXNEb3dubG9hZCA9IChlLnRhcmdldCBpbnN0YW5jZW9mIEhUTUxBbmNob3JFbGVtZW50ICYmIGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZShcImRvd25sb2FkXCIpKVxuICAgIGxldCBpc1RhcmdldEJsYW5rID0gZS50YXJnZXQuaGFzQXR0cmlidXRlKFwidGFyZ2V0XCIpICYmIGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcInRhcmdldFwiKS50b0xvd2VyQ2FzZSgpID09PSBcIl9ibGFua1wiXG4gICAgcmV0dXJuIHdhbnRzTmV3VGFiIHx8IGlzVGFyZ2V0QmxhbmsgfHwgaXNEb3dubG9hZFxuICB9LFxuXG4gIGlzVW5sb2FkYWJsZUZvcm1TdWJtaXQoZSl7XG4gICAgLy8gSWdub3JlIGZvcm0gc3VibWlzc2lvbnMgaW50ZW5kZWQgdG8gY2xvc2UgYSBuYXRpdmUgPGRpYWxvZz4gZWxlbWVudFxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0hUTUwvRWxlbWVudC9kaWFsb2cjdXNhZ2Vfbm90ZXNcbiAgICBsZXQgaXNEaWFsb2dTdWJtaXQgPSAoZS50YXJnZXQgJiYgZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwibWV0aG9kXCIpID09PSBcImRpYWxvZ1wiKSB8fFxuICAgICAgKGUuc3VibWl0dGVyICYmIGUuc3VibWl0dGVyLmdldEF0dHJpYnV0ZShcImZvcm1tZXRob2RcIikgPT09IFwiZGlhbG9nXCIpXG5cbiAgICBpZihpc0RpYWxvZ1N1Ym1pdCl7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICFlLmRlZmF1bHRQcmV2ZW50ZWQgJiYgIXRoaXMud2FudHNOZXdUYWIoZSlcbiAgICB9XG4gIH0sXG5cbiAgaXNOZXdQYWdlQ2xpY2soZSwgY3VycmVudExvY2F0aW9uKXtcbiAgICBsZXQgaHJlZiA9IGUudGFyZ2V0IGluc3RhbmNlb2YgSFRNTEFuY2hvckVsZW1lbnQgPyBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpIDogbnVsbFxuICAgIGxldCB1cmxcblxuICAgIGlmKGUuZGVmYXVsdFByZXZlbnRlZCB8fCBocmVmID09PSBudWxsIHx8IHRoaXMud2FudHNOZXdUYWIoZSkpeyByZXR1cm4gZmFsc2UgfVxuICAgIGlmKGhyZWYuc3RhcnRzV2l0aChcIm1haWx0bzpcIikgfHwgaHJlZi5zdGFydHNXaXRoKFwidGVsOlwiKSl7IHJldHVybiBmYWxzZSB9XG4gICAgaWYoZS50YXJnZXQuaXNDb250ZW50RWRpdGFibGUpeyByZXR1cm4gZmFsc2UgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHVybCA9IG5ldyBVUkwoaHJlZilcbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHVybCA9IG5ldyBVUkwoaHJlZiwgY3VycmVudExvY2F0aW9uKVxuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIC8vIGJhZCBVUkwsIGZhbGxiYWNrIHRvIGxldCBicm93c2VyIHRyeSBpdCBhcyBleHRlcm5hbFxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmKHVybC5ob3N0ID09PSBjdXJyZW50TG9jYXRpb24uaG9zdCAmJiB1cmwucHJvdG9jb2wgPT09IGN1cnJlbnRMb2NhdGlvbi5wcm90b2NvbCl7XG4gICAgICBpZih1cmwucGF0aG5hbWUgPT09IGN1cnJlbnRMb2NhdGlvbi5wYXRobmFtZSAmJiB1cmwuc2VhcmNoID09PSBjdXJyZW50TG9jYXRpb24uc2VhcmNoKXtcbiAgICAgICAgcmV0dXJuIHVybC5oYXNoID09PSBcIlwiICYmICF1cmwuaHJlZi5lbmRzV2l0aChcIiNcIilcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVybC5wcm90b2NvbC5zdGFydHNXaXRoKFwiaHR0cFwiKVxuICB9LFxuXG4gIG1hcmtQaHhDaGlsZERlc3Ryb3llZChlbCl7XG4gICAgaWYodGhpcy5pc1BoeENoaWxkKGVsKSl7IGVsLnNldEF0dHJpYnV0ZShQSFhfU0VTU0lPTiwgXCJcIikgfVxuICAgIHRoaXMucHV0UHJpdmF0ZShlbCwgXCJkZXN0cm95ZWRcIiwgdHJ1ZSlcbiAgfSxcblxuICBmaW5kUGh4Q2hpbGRyZW5JbkZyYWdtZW50KGh0bWwsIHBhcmVudElkKXtcbiAgICBsZXQgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIilcbiAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSBodG1sXG4gICAgcmV0dXJuIHRoaXMuZmluZFBoeENoaWxkcmVuKHRlbXBsYXRlLmNvbnRlbnQsIHBhcmVudElkKVxuICB9LFxuXG4gIGlzSWdub3JlZChlbCwgcGh4VXBkYXRlKXtcbiAgICByZXR1cm4gKGVsLmdldEF0dHJpYnV0ZShwaHhVcGRhdGUpIHx8IGVsLmdldEF0dHJpYnV0ZShcImRhdGEtcGh4LXVwZGF0ZVwiKSkgPT09IFwiaWdub3JlXCJcbiAgfSxcblxuICBpc1BoeFVwZGF0ZShlbCwgcGh4VXBkYXRlLCB1cGRhdGVUeXBlcyl7XG4gICAgcmV0dXJuIGVsLmdldEF0dHJpYnV0ZSAmJiB1cGRhdGVUeXBlcy5pbmRleE9mKGVsLmdldEF0dHJpYnV0ZShwaHhVcGRhdGUpKSA+PSAwXG4gIH0sXG5cbiAgZmluZFBoeFN0aWNreShlbCl7IHJldHVybiB0aGlzLmFsbChlbCwgYFske1BIWF9TVElDS1l9XWApIH0sXG5cbiAgZmluZFBoeENoaWxkcmVuKGVsLCBwYXJlbnRJZCl7XG4gICAgcmV0dXJuIHRoaXMuYWxsKGVsLCBgJHtQSFhfVklFV19TRUxFQ1RPUn1bJHtQSFhfUEFSRU5UX0lEfT1cIiR7cGFyZW50SWR9XCJdYClcbiAgfSxcblxuICBmaW5kUGFyZW50Q0lEcyhub2RlLCBjaWRzKXtcbiAgICBsZXQgaW5pdGlhbCA9IG5ldyBTZXQoY2lkcylcbiAgICBsZXQgcGFyZW50Q2lkcyA9XG4gICAgICBjaWRzLnJlZHVjZSgoYWNjLCBjaWQpID0+IHtcbiAgICAgICAgbGV0IHNlbGVjdG9yID0gYFske1BIWF9DT01QT05FTlR9PVwiJHtjaWR9XCJdIFske1BIWF9DT01QT05FTlR9XWBcblxuICAgICAgICB0aGlzLmZpbHRlcldpdGhpblNhbWVMaXZlVmlldyh0aGlzLmFsbChub2RlLCBzZWxlY3RvciksIG5vZGUpXG4gICAgICAgICAgLm1hcChlbCA9PiBwYXJzZUludChlbC5nZXRBdHRyaWJ1dGUoUEhYX0NPTVBPTkVOVCkpKVxuICAgICAgICAgIC5mb3JFYWNoKGNoaWxkQ0lEID0+IGFjYy5kZWxldGUoY2hpbGRDSUQpKVxuXG4gICAgICAgIHJldHVybiBhY2NcbiAgICAgIH0sIGluaXRpYWwpXG5cbiAgICByZXR1cm4gcGFyZW50Q2lkcy5zaXplID09PSAwID8gbmV3IFNldChjaWRzKSA6IHBhcmVudENpZHNcbiAgfSxcblxuICBmaWx0ZXJXaXRoaW5TYW1lTGl2ZVZpZXcobm9kZXMsIHBhcmVudCl7XG4gICAgaWYocGFyZW50LnF1ZXJ5U2VsZWN0b3IoUEhYX1ZJRVdfU0VMRUNUT1IpKXtcbiAgICAgIHJldHVybiBub2Rlcy5maWx0ZXIoZWwgPT4gdGhpcy53aXRoaW5TYW1lTGl2ZVZpZXcoZWwsIHBhcmVudCkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBub2Rlc1xuICAgIH1cbiAgfSxcblxuICB3aXRoaW5TYW1lTGl2ZVZpZXcobm9kZSwgcGFyZW50KXtcbiAgICB3aGlsZShub2RlID0gbm9kZS5wYXJlbnROb2RlKXtcbiAgICAgIGlmKG5vZGUuaXNTYW1lTm9kZShwYXJlbnQpKXsgcmV0dXJuIHRydWUgfVxuICAgICAgaWYobm9kZS5nZXRBdHRyaWJ1dGUoUEhYX1NFU1NJT04pICE9PSBudWxsKXsgcmV0dXJuIGZhbHNlIH1cbiAgICB9XG4gIH0sXG5cbiAgcHJpdmF0ZShlbCwga2V5KXsgcmV0dXJuIGVsW1BIWF9QUklWQVRFXSAmJiBlbFtQSFhfUFJJVkFURV1ba2V5XSB9LFxuXG4gIGRlbGV0ZVByaXZhdGUoZWwsIGtleSl7IGVsW1BIWF9QUklWQVRFXSAmJiBkZWxldGUgKGVsW1BIWF9QUklWQVRFXVtrZXldKSB9LFxuXG4gIHB1dFByaXZhdGUoZWwsIGtleSwgdmFsdWUpe1xuICAgIGlmKCFlbFtQSFhfUFJJVkFURV0peyBlbFtQSFhfUFJJVkFURV0gPSB7fSB9XG4gICAgZWxbUEhYX1BSSVZBVEVdW2tleV0gPSB2YWx1ZVxuICB9LFxuXG4gIHVwZGF0ZVByaXZhdGUoZWwsIGtleSwgZGVmYXVsdFZhbCwgdXBkYXRlRnVuYyl7XG4gICAgbGV0IGV4aXN0aW5nID0gdGhpcy5wcml2YXRlKGVsLCBrZXkpXG4gICAgaWYoZXhpc3RpbmcgPT09IHVuZGVmaW5lZCl7XG4gICAgICB0aGlzLnB1dFByaXZhdGUoZWwsIGtleSwgdXBkYXRlRnVuYyhkZWZhdWx0VmFsKSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wdXRQcml2YXRlKGVsLCBrZXksIHVwZGF0ZUZ1bmMoZXhpc3RpbmcpKVxuICAgIH1cbiAgfSxcblxuICBjb3B5UHJpdmF0ZXModGFyZ2V0LCBzb3VyY2Upe1xuICAgIGlmKHNvdXJjZVtQSFhfUFJJVkFURV0pe1xuICAgICAgdGFyZ2V0W1BIWF9QUklWQVRFXSA9IHNvdXJjZVtQSFhfUFJJVkFURV1cbiAgICB9XG4gIH0sXG5cbiAgcHV0VGl0bGUoc3RyKXtcbiAgICBsZXQgdGl0bGVFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ0aXRsZVwiKVxuICAgIGlmKHRpdGxlRWwpe1xuICAgICAgbGV0IHtwcmVmaXgsIHN1ZmZpeH0gPSB0aXRsZUVsLmRhdGFzZXRcbiAgICAgIGRvY3VtZW50LnRpdGxlID0gYCR7cHJlZml4IHx8IFwiXCJ9JHtzdHJ9JHtzdWZmaXggfHwgXCJcIn1gXG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50LnRpdGxlID0gc3RyXG4gICAgfVxuICB9LFxuXG4gIGRlYm91bmNlKGVsLCBldmVudCwgcGh4RGVib3VuY2UsIGRlZmF1bHREZWJvdW5jZSwgcGh4VGhyb3R0bGUsIGRlZmF1bHRUaHJvdHRsZSwgYXN5bmNGaWx0ZXIsIGNhbGxiYWNrKXtcbiAgICBsZXQgZGVib3VuY2UgPSBlbC5nZXRBdHRyaWJ1dGUocGh4RGVib3VuY2UpXG4gICAgbGV0IHRocm90dGxlID0gZWwuZ2V0QXR0cmlidXRlKHBoeFRocm90dGxlKVxuXG4gICAgaWYoZGVib3VuY2UgPT09IFwiXCIpeyBkZWJvdW5jZSA9IGRlZmF1bHREZWJvdW5jZSB9XG4gICAgaWYodGhyb3R0bGUgPT09IFwiXCIpeyB0aHJvdHRsZSA9IGRlZmF1bHRUaHJvdHRsZSB9XG4gICAgbGV0IHZhbHVlID0gZGVib3VuY2UgfHwgdGhyb3R0bGVcbiAgICBzd2l0Y2godmFsdWUpe1xuICAgICAgY2FzZSBudWxsOiByZXR1cm4gY2FsbGJhY2soKVxuXG4gICAgICBjYXNlIFwiYmx1clwiOlxuICAgICAgICBpZih0aGlzLm9uY2UoZWwsIFwiZGVib3VuY2UtYmx1clwiKSl7XG4gICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgKCkgPT4gY2FsbGJhY2soKSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm5cblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbGV0IHRpbWVvdXQgPSBwYXJzZUludCh2YWx1ZSlcbiAgICAgICAgbGV0IHRyaWdnZXIgPSAoYmx1cikgPT4ge1xuICAgICAgICAgIGlmKGJsdXIpe1xuICAgICAgICAgICAgLy8gaWYgdGhlIGlucHV0IGlzIGJsdXJyZWQsIHdlIG5lZWQgdG8gY2FuY2VsIHRoZSBuZXh0IHRocm90dGxlIHRpbWVvdXRcbiAgICAgICAgICAgIC8vIHRoZXJlZm9yZSB3ZSBzdG9yZSB0aGUgdGltZXIgaWQgaW4gdGhlIFRIUk9UVExFRCBwcml2YXRlIGF0dHJpYnV0ZVxuICAgICAgICAgICAgaWYodGhyb3R0bGUgJiYgdGhpcy5wcml2YXRlKGVsLCBUSFJPVFRMRUQpKXtcbiAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMucHJpdmF0ZShlbCwgVEhST1RUTEVEKSlcbiAgICAgICAgICAgICAgdGhpcy5kZWxldGVQcml2YXRlKGVsLCBUSFJPVFRMRUQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBvbiBkZWJvdW5jZSB3ZSBqdXN0IHRyaWdnZXIgdGhlIGNhbGxiYWNrXG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soKVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBubyBibHVyLCByZW1vdmUgdGhlIHRocm90dGxlIGF0dHJpYnV0ZSBpZiB3ZSBhcmUgaW4gdGhyb3R0bGUgbW9kZVxuICAgICAgICAgIGlmKHRocm90dGxlKSB0aGlzLmRlbGV0ZVByaXZhdGUoZWwsIFRIUk9UVExFRClcbiAgICAgICAgICAvLyBhbHdheXMgY2FsbCB0aGUgY2FsbGJhY2sgdG8gZW5zdXJlIHRoYXQgdGhlIGxhdGVzdCBldmVudCBpcyBwcm9jZXNzZWQsXG4gICAgICAgICAgLy8gZXZlbiB3aGVuIHRocm90dGxlIGlzIGFjdGl2ZVxuICAgICAgICAgIGNhbGxiYWNrKClcbiAgICAgICAgfVxuICAgICAgICBsZXQgY3VycmVudEN5Y2xlID0gdGhpcy5pbmNDeWNsZShlbCwgREVCT1VOQ0VfVFJJR0dFUiwgdHJpZ2dlcilcbiAgICAgICAgaWYoaXNOYU4odGltZW91dCkpeyByZXR1cm4gbG9nRXJyb3IoYGludmFsaWQgdGhyb3R0bGUvZGVib3VuY2UgdmFsdWU6ICR7dmFsdWV9YCkgfVxuICAgICAgICBpZih0aHJvdHRsZSl7XG4gICAgICAgICAgbGV0IG5ld0tleURvd24gPSBmYWxzZVxuICAgICAgICAgIGlmKGV2ZW50LnR5cGUgPT09IFwia2V5ZG93blwiKXtcbiAgICAgICAgICAgIGxldCBwcmV2S2V5ID0gdGhpcy5wcml2YXRlKGVsLCBERUJPVU5DRV9QUkVWX0tFWSlcbiAgICAgICAgICAgIHRoaXMucHV0UHJpdmF0ZShlbCwgREVCT1VOQ0VfUFJFVl9LRVksIGV2ZW50LmtleSlcbiAgICAgICAgICAgIG5ld0tleURvd24gPSBwcmV2S2V5ICE9PSBldmVudC5rZXlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZighbmV3S2V5RG93biAmJiB0aGlzLnByaXZhdGUoZWwsIFRIUk9UVExFRCkpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKClcbiAgICAgICAgICAgIC8vIHN0b3JlIHRoZSB0aHJvdHRsZSB0aW1lciBpZCBpbiB0aGUgVEhST1RUTEVEIHByaXZhdGUgYXR0cmlidXRlLFxuICAgICAgICAgICAgLy8gc28gdGhhdCB3ZSBjYW4gY2FuY2VsIGl0IGlmIHRoZSBpbnB1dCBpcyBibHVycmVkXG4gICAgICAgICAgICAvLyBvdGhlcndpc2UsIHdoZW4gbmV3IGV2ZW50cyBoYXBwZW4gYWZ0ZXIgYmx1ciwgYnV0IGJlZm9yZSB0aGUgb2xkXG4gICAgICAgICAgICAvLyB0aW1lb3V0IGlzIHRyaWdnZXJlZCwgd2Ugd291bGQgYWN0dWFsbHkgdHJpZ2dlciB0aGUgY2FsbGJhY2sgbXVsdGlwbGUgdGltZXNcbiAgICAgICAgICAgIGNvbnN0IHQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgaWYoYXN5bmNGaWx0ZXIoKSl7IHRoaXMudHJpZ2dlckN5Y2xlKGVsLCBERUJPVU5DRV9UUklHR0VSKSB9XG4gICAgICAgICAgICB9LCB0aW1lb3V0KVxuICAgICAgICAgICAgdGhpcy5wdXRQcml2YXRlKGVsLCBUSFJPVFRMRUQsIHQpXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYoYXN5bmNGaWx0ZXIoKSl7IHRoaXMudHJpZ2dlckN5Y2xlKGVsLCBERUJPVU5DRV9UUklHR0VSLCBjdXJyZW50Q3ljbGUpIH1cbiAgICAgICAgICB9LCB0aW1lb3V0KVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGZvcm0gPSBlbC5mb3JtXG4gICAgICAgIGlmKGZvcm0gJiYgdGhpcy5vbmNlKGZvcm0sIFwiYmluZC1kZWJvdW5jZVwiKSl7XG4gICAgICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsICgpID0+IHtcbiAgICAgICAgICAgIEFycmF5LmZyb20oKG5ldyBGb3JtRGF0YShmb3JtKSkuZW50cmllcygpLCAoW25hbWVdKSA9PiB7XG4gICAgICAgICAgICAgIGxldCBpbnB1dCA9IGZvcm0ucXVlcnlTZWxlY3RvcihgW25hbWU9XCIke25hbWV9XCJdYClcbiAgICAgICAgICAgICAgdGhpcy5pbmNDeWNsZShpbnB1dCwgREVCT1VOQ0VfVFJJR0dFUilcbiAgICAgICAgICAgICAgdGhpcy5kZWxldGVQcml2YXRlKGlucHV0LCBUSFJPVFRMRUQpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5vbmNlKGVsLCBcImJpbmQtZGVib3VuY2VcIikpe1xuICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsICgpID0+IHRoaXMudHJpZ2dlckN5Y2xlKGVsLCBERUJPVU5DRV9UUklHR0VSLCBudWxsLCBbdHJ1ZV0pKVxuICAgICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHRyaWdnZXJDeWNsZShlbCwga2V5LCBjdXJyZW50Q3ljbGUsIHBhcmFtcz1bXSl7XG4gICAgbGV0IFtjeWNsZSwgdHJpZ2dlcl0gPSB0aGlzLnByaXZhdGUoZWwsIGtleSlcbiAgICBpZighY3VycmVudEN5Y2xlKXsgY3VycmVudEN5Y2xlID0gY3ljbGUgfVxuICAgIGlmKGN1cnJlbnRDeWNsZSA9PT0gY3ljbGUpe1xuICAgICAgdGhpcy5pbmNDeWNsZShlbCwga2V5KVxuICAgICAgdHJpZ2dlciguLi5wYXJhbXMpXG4gICAgfVxuICB9LFxuXG4gIG9uY2UoZWwsIGtleSl7XG4gICAgaWYodGhpcy5wcml2YXRlKGVsLCBrZXkpID09PSB0cnVlKXsgcmV0dXJuIGZhbHNlIH1cbiAgICB0aGlzLnB1dFByaXZhdGUoZWwsIGtleSwgdHJ1ZSlcbiAgICByZXR1cm4gdHJ1ZVxuICB9LFxuXG4gIGluY0N5Y2xlKGVsLCBrZXksIHRyaWdnZXIgPSBmdW5jdGlvbiAoKXsgfSl7XG4gICAgbGV0IFtjdXJyZW50Q3ljbGVdID0gdGhpcy5wcml2YXRlKGVsLCBrZXkpIHx8IFswLCB0cmlnZ2VyXVxuICAgIGN1cnJlbnRDeWNsZSsrXG4gICAgdGhpcy5wdXRQcml2YXRlKGVsLCBrZXksIFtjdXJyZW50Q3ljbGUsIHRyaWdnZXJdKVxuICAgIHJldHVybiBjdXJyZW50Q3ljbGVcbiAgfSxcblxuICBtYXliZUFkZFByaXZhdGVIb29rcyhlbCwgcGh4Vmlld3BvcnRUb3AsIHBoeFZpZXdwb3J0Qm90dG9tKXtcbiAgICBpZihlbC5oYXNBdHRyaWJ1dGUgJiYgKGVsLmhhc0F0dHJpYnV0ZShwaHhWaWV3cG9ydFRvcCkgfHwgZWwuaGFzQXR0cmlidXRlKHBoeFZpZXdwb3J0Qm90dG9tKSkpe1xuICAgICAgZWwuc2V0QXR0cmlidXRlKFwiZGF0YS1waHgtaG9va1wiLCBcIlBob2VuaXguSW5maW5pdGVTY3JvbGxcIilcbiAgICB9XG4gIH0sXG5cbiAgaXNGZWVkYmFja0NvbnRhaW5lcihlbCwgcGh4RmVlZGJhY2tGb3Ipe1xuICAgIHJldHVybiBlbC5oYXNBdHRyaWJ1dGUgJiYgZWwuaGFzQXR0cmlidXRlKHBoeEZlZWRiYWNrRm9yKVxuICB9LFxuXG4gIG1heWJlSGlkZUZlZWRiYWNrKGNvbnRhaW5lciwgZmVlZGJhY2tDb250YWluZXJzLCBwaHhGZWVkYmFja0ZvciwgcGh4RmVlZGJhY2tHcm91cCl7XG4gICAgLy8gYmVjYXVzZSB3ZSBjYW4gaGF2ZSBtdWx0aXBsZSBjb250YWluZXJzIHdpdGggdGhlIHNhbWUgcGh4RmVlZGJhY2tGb3IgdmFsdWVcbiAgICAvLyB3ZSBwZXJmb3JtIHRoZSBjaGVjayBvbmx5IG9uY2UgYW5kIHN0b3JlIHRoZSByZXN1bHQ7XG4gICAgLy8gd2Ugb2Z0ZW4gaGF2ZSBtdWx0aXBsZSBjb250YWluZXJzLCBiZWNhdXNlIHdlIHB1c2ggYm90aCBmcm9tRWwgYW5kIHRvRWwgaW4gZG9tcGF0Y2hcbiAgICAvLyB3aGVuIGEgY29udGFpbmVyIGlzIHVwZGF0ZWRcbiAgICBjb25zdCBmZWVkYmFja1Jlc3VsdHMgPSB7fVxuICAgIGZlZWRiYWNrQ29udGFpbmVycy5mb3JFYWNoKGVsID0+IHtcbiAgICAgIC8vIHNraXAgZWxlbWVudHMgdGhhdCBhcmUgbm90IGluIHRoZSBET01cbiAgICAgIGlmKCFjb250YWluZXIuY29udGFpbnMoZWwpKSByZXR1cm5cbiAgICAgIGNvbnN0IGZlZWRiYWNrID0gZWwuZ2V0QXR0cmlidXRlKHBoeEZlZWRiYWNrRm9yKVxuICAgICAgaWYoIWZlZWRiYWNrKXtcbiAgICAgICAgLy8gdGhlIGNvbnRhaW5lciBwcmV2aW91c2x5IGhhZCBwaHgtZmVlZGJhY2stZm9yLCBidXQgbm93IGl0IGRvZXNuJ3RcbiAgICAgICAgLy8gcmVtb3ZlIHRoZSBjbGFzcyBmcm9tIHRoZSBjb250YWluZXIgKGlmIGl0IGV4aXN0cylcbiAgICAgICAgSlMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBbXSwgW1BIWF9OT19GRUVEQkFDS19DTEFTU10pXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgaWYoZmVlZGJhY2tSZXN1bHRzW2ZlZWRiYWNrXSA9PT0gdHJ1ZSl7XG4gICAgICAgIHRoaXMuaGlkZUZlZWRiYWNrKGVsKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGZlZWRiYWNrUmVzdWx0c1tmZWVkYmFja10gPSB0aGlzLnNob3VsZEhpZGVGZWVkYmFjayhjb250YWluZXIsIGZlZWRiYWNrLCBwaHhGZWVkYmFja0dyb3VwKVxuICAgICAgaWYoZmVlZGJhY2tSZXN1bHRzW2ZlZWRiYWNrXSA9PT0gdHJ1ZSl7XG4gICAgICAgIHRoaXMuaGlkZUZlZWRiYWNrKGVsKVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG5cbiAgaGlkZUZlZWRiYWNrKGNvbnRhaW5lcil7XG4gICAgSlMuYWRkT3JSZW1vdmVDbGFzc2VzKGNvbnRhaW5lciwgW1BIWF9OT19GRUVEQkFDS19DTEFTU10sIFtdKVxuICB9LFxuXG4gIHNob3VsZEhpZGVGZWVkYmFjayhjb250YWluZXIsIG5hbWVPckdyb3VwLCBwaHhGZWVkYmFja0dyb3VwKXtcbiAgICBjb25zdCBxdWVyeSA9IGBbbmFtZT1cIiR7bmFtZU9yR3JvdXB9XCJdLFxuICAgICAgICAgICAgICAgICAgIFtuYW1lPVwiJHtuYW1lT3JHcm91cH1bXVwiXSxcbiAgICAgICAgICAgICAgICAgICBbJHtwaHhGZWVkYmFja0dyb3VwfT1cIiR7bmFtZU9yR3JvdXB9XCJdYFxuICAgIGxldCBmb2N1c2VkID0gZmFsc2VcbiAgICBET00uYWxsKGNvbnRhaW5lciwgcXVlcnksIChpbnB1dCkgPT4ge1xuICAgICAgaWYodGhpcy5wcml2YXRlKGlucHV0LCBQSFhfSEFTX0ZPQ1VTRUQpIHx8IHRoaXMucHJpdmF0ZShpbnB1dCwgUEhYX0hBU19TVUJNSVRURUQpKXtcbiAgICAgICAgZm9jdXNlZCA9IHRydWVcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiAhZm9jdXNlZFxuICB9LFxuXG4gIGZlZWRiYWNrU2VsZWN0b3IoaW5wdXQsIHBoeEZlZWRiYWNrRm9yLCBwaHhGZWVkYmFja0dyb3VwKXtcbiAgICBsZXQgcXVlcnkgPSBgWyR7cGh4RmVlZGJhY2tGb3J9PVwiJHtpbnB1dC5uYW1lfVwiXSxcbiAgICAgICAgICAgICAgICAgWyR7cGh4RmVlZGJhY2tGb3J9PVwiJHtpbnB1dC5uYW1lLnJlcGxhY2UoL1xcW1xcXSQvLCBcIlwiKX1cIl1gXG4gICAgaWYoaW5wdXQuZ2V0QXR0cmlidXRlKHBoeEZlZWRiYWNrR3JvdXApKXtcbiAgICAgIHF1ZXJ5ICs9IGAsWyR7cGh4RmVlZGJhY2tGb3J9PVwiJHtpbnB1dC5nZXRBdHRyaWJ1dGUocGh4RmVlZGJhY2tHcm91cCl9XCJdYFxuICAgIH1cbiAgICByZXR1cm4gcXVlcnlcbiAgfSxcblxuICByZXNldEZvcm0oZm9ybSwgcGh4RmVlZGJhY2tGb3IsIHBoeEZlZWRiYWNrR3JvdXApe1xuICAgIEFycmF5LmZyb20oZm9ybS5lbGVtZW50cykuZm9yRWFjaChpbnB1dCA9PiB7XG4gICAgICBsZXQgcXVlcnkgPSB0aGlzLmZlZWRiYWNrU2VsZWN0b3IoaW5wdXQsIHBoeEZlZWRiYWNrRm9yLCBwaHhGZWVkYmFja0dyb3VwKVxuICAgICAgdGhpcy5kZWxldGVQcml2YXRlKGlucHV0LCBQSFhfSEFTX0ZPQ1VTRUQpXG4gICAgICB0aGlzLmRlbGV0ZVByaXZhdGUoaW5wdXQsIFBIWF9IQVNfU1VCTUlUVEVEKVxuICAgICAgdGhpcy5hbGwoZG9jdW1lbnQsIHF1ZXJ5LCBmZWVkYmFja0VsID0+IHtcbiAgICAgICAgSlMuYWRkT3JSZW1vdmVDbGFzc2VzKGZlZWRiYWNrRWwsIFtQSFhfTk9fRkVFREJBQ0tfQ0xBU1NdLCBbXSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfSxcblxuICBzaG93RXJyb3IoaW5wdXRFbCwgcGh4RmVlZGJhY2tGb3IsIHBoeEZlZWRiYWNrR3JvdXApe1xuICAgIGlmKGlucHV0RWwubmFtZSl7XG4gICAgICBsZXQgcXVlcnkgPSB0aGlzLmZlZWRiYWNrU2VsZWN0b3IoaW5wdXRFbCwgcGh4RmVlZGJhY2tGb3IsIHBoeEZlZWRiYWNrR3JvdXApXG4gICAgICB0aGlzLmFsbChkb2N1bWVudCwgcXVlcnksIChlbCkgPT4ge1xuICAgICAgICBKUy5hZGRPclJlbW92ZUNsYXNzZXMoZWwsIFtdLCBbUEhYX05PX0ZFRURCQUNLX0NMQVNTXSlcbiAgICAgIH0pXG4gICAgfVxuICB9LFxuXG4gIGlzUGh4Q2hpbGQobm9kZSl7XG4gICAgcmV0dXJuIG5vZGUuZ2V0QXR0cmlidXRlICYmIG5vZGUuZ2V0QXR0cmlidXRlKFBIWF9QQVJFTlRfSUQpXG4gIH0sXG5cbiAgaXNQaHhTdGlja3kobm9kZSl7XG4gICAgcmV0dXJuIG5vZGUuZ2V0QXR0cmlidXRlICYmIG5vZGUuZ2V0QXR0cmlidXRlKFBIWF9TVElDS1kpICE9PSBudWxsXG4gIH0sXG5cbiAgaXNDaGlsZE9mQW55KGVsLCBwYXJlbnRzKXtcbiAgICByZXR1cm4gISFwYXJlbnRzLmZpbmQocGFyZW50ID0+IHBhcmVudC5jb250YWlucyhlbCkpXG4gIH0sXG5cbiAgZmlyc3RQaHhDaGlsZChlbCl7XG4gICAgcmV0dXJuIHRoaXMuaXNQaHhDaGlsZChlbCkgPyBlbCA6IHRoaXMuYWxsKGVsLCBgWyR7UEhYX1BBUkVOVF9JRH1dYClbMF1cbiAgfSxcblxuICBkaXNwYXRjaEV2ZW50KHRhcmdldCwgbmFtZSwgb3B0cyA9IHt9KXtcbiAgICBsZXQgZGVmYXVsdEJ1YmJsZSA9IHRydWVcbiAgICBsZXQgaXNVcGxvYWRUYXJnZXQgPSB0YXJnZXQubm9kZU5hbWUgPT09IFwiSU5QVVRcIiAmJiB0YXJnZXQudHlwZSA9PT0gXCJmaWxlXCJcbiAgICBpZihpc1VwbG9hZFRhcmdldCAmJiBuYW1lID09PSBcImNsaWNrXCIpe1xuICAgICAgZGVmYXVsdEJ1YmJsZSA9IGZhbHNlXG4gICAgfVxuICAgIGxldCBidWJibGVzID0gb3B0cy5idWJibGVzID09PSB1bmRlZmluZWQgPyBkZWZhdWx0QnViYmxlIDogISFvcHRzLmJ1YmJsZXNcbiAgICBsZXQgZXZlbnRPcHRzID0ge2J1YmJsZXM6IGJ1YmJsZXMsIGNhbmNlbGFibGU6IHRydWUsIGRldGFpbDogb3B0cy5kZXRhaWwgfHwge319XG4gICAgbGV0IGV2ZW50ID0gbmFtZSA9PT0gXCJjbGlja1wiID8gbmV3IE1vdXNlRXZlbnQoXCJjbGlja1wiLCBldmVudE9wdHMpIDogbmV3IEN1c3RvbUV2ZW50KG5hbWUsIGV2ZW50T3B0cylcbiAgICB0YXJnZXQuZGlzcGF0Y2hFdmVudChldmVudClcbiAgfSxcblxuICBjbG9uZU5vZGUobm9kZSwgaHRtbCl7XG4gICAgaWYodHlwZW9mIChodG1sKSA9PT0gXCJ1bmRlZmluZWRcIil7XG4gICAgICByZXR1cm4gbm9kZS5jbG9uZU5vZGUodHJ1ZSlcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGNsb25lZCA9IG5vZGUuY2xvbmVOb2RlKGZhbHNlKVxuICAgICAgY2xvbmVkLmlubmVySFRNTCA9IGh0bWxcbiAgICAgIHJldHVybiBjbG9uZWRcbiAgICB9XG4gIH0sXG5cbiAgLy8gbWVyZ2UgYXR0cmlidXRlcyBmcm9tIHNvdXJjZSB0byB0YXJnZXRcbiAgLy8gaWYgYW4gZWxlbWVudCBpcyBpZ25vcmVkLCB3ZSBvbmx5IG1lcmdlIGRhdGEgYXR0cmlidXRlc1xuICAvLyBpbmNsdWRpbmcgcmVtb3ZpbmcgZGF0YSBhdHRyaWJ1dGVzIHRoYXQgYXJlIG5vIGxvbmdlciBpbiB0aGUgc291cmNlXG4gIG1lcmdlQXR0cnModGFyZ2V0LCBzb3VyY2UsIG9wdHMgPSB7fSl7XG4gICAgbGV0IGV4Y2x1ZGUgPSBuZXcgU2V0KG9wdHMuZXhjbHVkZSB8fCBbXSlcbiAgICBsZXQgaXNJZ25vcmVkID0gb3B0cy5pc0lnbm9yZWRcbiAgICBsZXQgc291cmNlQXR0cnMgPSBzb3VyY2UuYXR0cmlidXRlc1xuICAgIGZvcihsZXQgaSA9IHNvdXJjZUF0dHJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKXtcbiAgICAgIGxldCBuYW1lID0gc291cmNlQXR0cnNbaV0ubmFtZVxuICAgICAgaWYoIWV4Y2x1ZGUuaGFzKG5hbWUpKXtcbiAgICAgICAgY29uc3Qgc291cmNlVmFsdWUgPSBzb3VyY2UuZ2V0QXR0cmlidXRlKG5hbWUpXG4gICAgICAgIGlmKHRhcmdldC5nZXRBdHRyaWJ1dGUobmFtZSkgIT09IHNvdXJjZVZhbHVlICYmICghaXNJZ25vcmVkIHx8IChpc0lnbm9yZWQgJiYgbmFtZS5zdGFydHNXaXRoKFwiZGF0YS1cIikpKSl7XG4gICAgICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZShuYW1lLCBzb3VyY2VWYWx1ZSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gV2UgZXhjbHVkZSB0aGUgdmFsdWUgZnJvbSBiZWluZyBtZXJnZWQgb24gZm9jdXNlZCBpbnB1dHMsIGJlY2F1c2UgdGhlXG4gICAgICAgIC8vIHVzZXIncyBpbnB1dCBzaG91bGQgYWx3YXlzIHdpbi5cbiAgICAgICAgLy8gV2UgY2FuIHN0aWxsIGFzc2lnbiBpdCBhcyBsb25nIGFzIHRoZSB2YWx1ZSBwcm9wZXJ0eSBpcyB0aGUgc2FtZSwgdGhvdWdoLlxuICAgICAgICAvLyBUaGlzIHByZXZlbnRzIGEgc2l0dWF0aW9uIHdoZXJlIHRoZSB1cGRhdGVkIGhvb2sgaXMgbm90IGJlaW5nIHRyaWdnZXJlZFxuICAgICAgICAvLyB3aGVuIGFuIGlucHV0IGlzIGJhY2sgaW4gaXRzIFwib3JpZ2luYWwgc3RhdGVcIiwgYmVjYXVzZSB0aGUgYXR0cmlidXRlXG4gICAgICAgIC8vIHdhcyBuZXZlciBjaGFuZ2VkLCBzZWU6XG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9waG9lbml4ZnJhbWV3b3JrL3Bob2VuaXhfbGl2ZV92aWV3L2lzc3Vlcy8yMTYzXG4gICAgICAgIGlmKG5hbWUgPT09IFwidmFsdWVcIiAmJiB0YXJnZXQudmFsdWUgPT09IHNvdXJjZS52YWx1ZSl7XG4gICAgICAgICAgLy8gYWN0dWFsbHkgc2V0IHRoZSB2YWx1ZSBhdHRyaWJ1dGUgdG8gc3luYyBpdCB3aXRoIHRoZSB2YWx1ZSBwcm9wZXJ0eVxuICAgICAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBzb3VyY2UuZ2V0QXR0cmlidXRlKG5hbWUpKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHRhcmdldEF0dHJzID0gdGFyZ2V0LmF0dHJpYnV0ZXNcbiAgICBmb3IobGV0IGkgPSB0YXJnZXRBdHRycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSl7XG4gICAgICBsZXQgbmFtZSA9IHRhcmdldEF0dHJzW2ldLm5hbWVcbiAgICAgIGlmKGlzSWdub3JlZCl7XG4gICAgICAgIGlmKG5hbWUuc3RhcnRzV2l0aChcImRhdGEtXCIpICYmICFzb3VyY2UuaGFzQXR0cmlidXRlKG5hbWUpICYmICFbUEhYX1JFRiwgUEhYX1JFRl9TUkNdLmluY2x1ZGVzKG5hbWUpKXsgdGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZShuYW1lKSB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZighc291cmNlLmhhc0F0dHJpYnV0ZShuYW1lKSl7IHRhcmdldC5yZW1vdmVBdHRyaWJ1dGUobmFtZSkgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBtZXJnZUZvY3VzZWRJbnB1dCh0YXJnZXQsIHNvdXJjZSl7XG4gICAgLy8gc2tpcCBzZWxlY3RzIGJlY2F1c2UgRkYgd2lsbCByZXNldCBoaWdobGlnaHRlZCBpbmRleCBmb3IgYW55IHNldEF0dHJpYnV0ZVxuICAgIGlmKCEodGFyZ2V0IGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQpKXsgRE9NLm1lcmdlQXR0cnModGFyZ2V0LCBzb3VyY2UsIHtleGNsdWRlOiBbXCJ2YWx1ZVwiXX0pIH1cblxuICAgIGlmKHNvdXJjZS5yZWFkT25seSl7XG4gICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKFwicmVhZG9ubHlcIiwgdHJ1ZSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZShcInJlYWRvbmx5XCIpXG4gICAgfVxuICB9LFxuXG4gIGhhc1NlbGVjdGlvblJhbmdlKGVsKXtcbiAgICByZXR1cm4gZWwuc2V0U2VsZWN0aW9uUmFuZ2UgJiYgKGVsLnR5cGUgPT09IFwidGV4dFwiIHx8IGVsLnR5cGUgPT09IFwidGV4dGFyZWFcIilcbiAgfSxcblxuICByZXN0b3JlRm9jdXMoZm9jdXNlZCwgc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCl7XG4gICAgaWYoZm9jdXNlZCBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50KXsgZm9jdXNlZC5mb2N1cygpIH1cbiAgICBpZighRE9NLmlzVGV4dHVhbElucHV0KGZvY3VzZWQpKXsgcmV0dXJuIH1cblxuICAgIGxldCB3YXNGb2N1c2VkID0gZm9jdXNlZC5tYXRjaGVzKFwiOmZvY3VzXCIpXG4gICAgaWYoZm9jdXNlZC5yZWFkT25seSl7IGZvY3VzZWQuYmx1cigpIH1cbiAgICBpZighd2FzRm9jdXNlZCl7IGZvY3VzZWQuZm9jdXMoKSB9XG4gICAgaWYodGhpcy5oYXNTZWxlY3Rpb25SYW5nZShmb2N1c2VkKSl7XG4gICAgICBmb2N1c2VkLnNldFNlbGVjdGlvblJhbmdlKHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQpXG4gICAgfVxuICB9LFxuXG4gIGlzRm9ybUlucHV0KGVsKXsgcmV0dXJuIC9eKD86aW5wdXR8c2VsZWN0fHRleHRhcmVhKSQvaS50ZXN0KGVsLnRhZ05hbWUpICYmIGVsLnR5cGUgIT09IFwiYnV0dG9uXCIgfSxcblxuICBzeW5jQXR0cnNUb1Byb3BzKGVsKXtcbiAgICBpZihlbCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiYgQ0hFQ0tBQkxFX0lOUFVUUy5pbmRleE9mKGVsLnR5cGUudG9Mb2NhbGVMb3dlckNhc2UoKSkgPj0gMCl7XG4gICAgICBlbC5jaGVja2VkID0gZWwuZ2V0QXR0cmlidXRlKFwiY2hlY2tlZFwiKSAhPT0gbnVsbFxuICAgIH1cbiAgfSxcblxuICBpc1RleHR1YWxJbnB1dChlbCl7IHJldHVybiBGT0NVU0FCTEVfSU5QVVRTLmluZGV4T2YoZWwudHlwZSkgPj0gMCB9LFxuXG4gIGlzTm93VHJpZ2dlckZvcm1FeHRlcm5hbChlbCwgcGh4VHJpZ2dlckV4dGVybmFsKXtcbiAgICByZXR1cm4gZWwuZ2V0QXR0cmlidXRlICYmIGVsLmdldEF0dHJpYnV0ZShwaHhUcmlnZ2VyRXh0ZXJuYWwpICE9PSBudWxsXG4gIH0sXG5cbiAgc3luY1BlbmRpbmdSZWYoZnJvbUVsLCB0b0VsLCBkaXNhYmxlV2l0aCl7XG4gICAgbGV0IHJlZiA9IGZyb21FbC5nZXRBdHRyaWJ1dGUoUEhYX1JFRilcbiAgICBpZihyZWYgPT09IG51bGwpeyByZXR1cm4gdHJ1ZSB9XG4gICAgbGV0IHJlZlNyYyA9IGZyb21FbC5nZXRBdHRyaWJ1dGUoUEhYX1JFRl9TUkMpXG5cbiAgICBpZihET00uaXNGb3JtSW5wdXQoZnJvbUVsKSB8fCBmcm9tRWwuZ2V0QXR0cmlidXRlKGRpc2FibGVXaXRoKSAhPT0gbnVsbCl7XG4gICAgICBpZihET00uaXNVcGxvYWRJbnB1dChmcm9tRWwpKXsgRE9NLm1lcmdlQXR0cnMoZnJvbUVsLCB0b0VsLCB7aXNJZ25vcmVkOiB0cnVlfSkgfVxuICAgICAgRE9NLnB1dFByaXZhdGUoZnJvbUVsLCBQSFhfUkVGLCB0b0VsKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSBlbHNlIHtcbiAgICAgIFBIWF9FVkVOVF9DTEFTU0VTLmZvckVhY2goY2xhc3NOYW1lID0+IHtcbiAgICAgICAgZnJvbUVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpICYmIHRvRWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpXG4gICAgICB9KVxuICAgICAgdG9FbC5zZXRBdHRyaWJ1dGUoUEhYX1JFRiwgcmVmKVxuICAgICAgdG9FbC5zZXRBdHRyaWJ1dGUoUEhYX1JFRl9TUkMsIHJlZlNyYylcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9LFxuXG4gIGNsZWFuQ2hpbGROb2Rlcyhjb250YWluZXIsIHBoeFVwZGF0ZSl7XG4gICAgaWYoRE9NLmlzUGh4VXBkYXRlKGNvbnRhaW5lciwgcGh4VXBkYXRlLCBbXCJhcHBlbmRcIiwgXCJwcmVwZW5kXCJdKSl7XG4gICAgICBsZXQgdG9SZW1vdmUgPSBbXVxuICAgICAgY29udGFpbmVyLmNoaWxkTm9kZXMuZm9yRWFjaChjaGlsZE5vZGUgPT4ge1xuICAgICAgICBpZighY2hpbGROb2RlLmlkKXtcbiAgICAgICAgICAvLyBTa2lwIHdhcm5pbmcgaWYgaXQncyBhbiBlbXB0eSB0ZXh0IG5vZGUgKGUuZy4gYSBuZXctbGluZSlcbiAgICAgICAgICBsZXQgaXNFbXB0eVRleHROb2RlID0gY2hpbGROb2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSAmJiBjaGlsZE5vZGUubm9kZVZhbHVlLnRyaW0oKSA9PT0gXCJcIlxuICAgICAgICAgIGlmKCFpc0VtcHR5VGV4dE5vZGUpe1xuICAgICAgICAgICAgbG9nRXJyb3IoXCJvbmx5IEhUTUwgZWxlbWVudCB0YWdzIHdpdGggYW4gaWQgYXJlIGFsbG93ZWQgaW5zaWRlIGNvbnRhaW5lcnMgd2l0aCBwaHgtdXBkYXRlLlxcblxcblwiICtcbiAgICAgICAgICAgICAgYHJlbW92aW5nIGlsbGVnYWwgbm9kZTogXCIkeyhjaGlsZE5vZGUub3V0ZXJIVE1MIHx8IGNoaWxkTm9kZS5ub2RlVmFsdWUpLnRyaW0oKX1cIlxcblxcbmApXG4gICAgICAgICAgfVxuICAgICAgICAgIHRvUmVtb3ZlLnB1c2goY2hpbGROb2RlKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdG9SZW1vdmUuZm9yRWFjaChjaGlsZE5vZGUgPT4gY2hpbGROb2RlLnJlbW92ZSgpKVxuICAgIH1cbiAgfSxcblxuICByZXBsYWNlUm9vdENvbnRhaW5lcihjb250YWluZXIsIHRhZ05hbWUsIGF0dHJzKXtcbiAgICBsZXQgcmV0YWluZWRBdHRycyA9IG5ldyBTZXQoW1wiaWRcIiwgUEhYX1NFU1NJT04sIFBIWF9TVEFUSUMsIFBIWF9NQUlOLCBQSFhfUk9PVF9JRF0pXG4gICAgaWYoY29udGFpbmVyLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gdGFnTmFtZS50b0xvd2VyQ2FzZSgpKXtcbiAgICAgIEFycmF5LmZyb20oY29udGFpbmVyLmF0dHJpYnV0ZXMpXG4gICAgICAgIC5maWx0ZXIoYXR0ciA9PiAhcmV0YWluZWRBdHRycy5oYXMoYXR0ci5uYW1lLnRvTG93ZXJDYXNlKCkpKVxuICAgICAgICAuZm9yRWFjaChhdHRyID0+IGNvbnRhaW5lci5yZW1vdmVBdHRyaWJ1dGUoYXR0ci5uYW1lKSlcblxuICAgICAgT2JqZWN0LmtleXMoYXR0cnMpXG4gICAgICAgIC5maWx0ZXIobmFtZSA9PiAhcmV0YWluZWRBdHRycy5oYXMobmFtZS50b0xvd2VyQ2FzZSgpKSlcbiAgICAgICAgLmZvckVhY2goYXR0ciA9PiBjb250YWluZXIuc2V0QXR0cmlidXRlKGF0dHIsIGF0dHJzW2F0dHJdKSlcblxuICAgICAgcmV0dXJuIGNvbnRhaW5lclxuXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBuZXdDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpXG4gICAgICBPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChhdHRyID0+IG5ld0NvbnRhaW5lci5zZXRBdHRyaWJ1dGUoYXR0ciwgYXR0cnNbYXR0cl0pKVxuICAgICAgcmV0YWluZWRBdHRycy5mb3JFYWNoKGF0dHIgPT4gbmV3Q29udGFpbmVyLnNldEF0dHJpYnV0ZShhdHRyLCBjb250YWluZXIuZ2V0QXR0cmlidXRlKGF0dHIpKSlcbiAgICAgIG5ld0NvbnRhaW5lci5pbm5lckhUTUwgPSBjb250YWluZXIuaW5uZXJIVE1MXG4gICAgICBjb250YWluZXIucmVwbGFjZVdpdGgobmV3Q29udGFpbmVyKVxuICAgICAgcmV0dXJuIG5ld0NvbnRhaW5lclxuICAgIH1cbiAgfSxcblxuICBnZXRTdGlja3koZWwsIG5hbWUsIGRlZmF1bHRWYWwpe1xuICAgIGxldCBvcCA9IChET00ucHJpdmF0ZShlbCwgXCJzdGlja3lcIikgfHwgW10pLmZpbmQoKFtleGlzdGluZ05hbWUsIF0pID0+IG5hbWUgPT09IGV4aXN0aW5nTmFtZSlcbiAgICBpZihvcCl7XG4gICAgICBsZXQgW19uYW1lLCBfb3AsIHN0YXNoZWRSZXN1bHRdID0gb3BcbiAgICAgIHJldHVybiBzdGFzaGVkUmVzdWx0XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0eXBlb2YoZGVmYXVsdFZhbCkgPT09IFwiZnVuY3Rpb25cIiA/IGRlZmF1bHRWYWwoKSA6IGRlZmF1bHRWYWxcbiAgICB9XG4gIH0sXG5cbiAgZGVsZXRlU3RpY2t5KGVsLCBuYW1lKXtcbiAgICB0aGlzLnVwZGF0ZVByaXZhdGUoZWwsIFwic3RpY2t5XCIsIFtdLCBvcHMgPT4ge1xuICAgICAgcmV0dXJuIG9wcy5maWx0ZXIoKFtleGlzdGluZ05hbWUsIF9dKSA9PiBleGlzdGluZ05hbWUgIT09IG5hbWUpXG4gICAgfSlcbiAgfSxcblxuICBwdXRTdGlja3koZWwsIG5hbWUsIG9wKXtcbiAgICBsZXQgc3Rhc2hlZFJlc3VsdCA9IG9wKGVsKVxuICAgIHRoaXMudXBkYXRlUHJpdmF0ZShlbCwgXCJzdGlja3lcIiwgW10sIG9wcyA9PiB7XG4gICAgICBsZXQgZXhpc3RpbmdJbmRleCA9IG9wcy5maW5kSW5kZXgoKFtleGlzdGluZ05hbWUsIF0pID0+IG5hbWUgPT09IGV4aXN0aW5nTmFtZSlcbiAgICAgIGlmKGV4aXN0aW5nSW5kZXggPj0gMCl7XG4gICAgICAgIG9wc1tleGlzdGluZ0luZGV4XSA9IFtuYW1lLCBvcCwgc3Rhc2hlZFJlc3VsdF1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9wcy5wdXNoKFtuYW1lLCBvcCwgc3Rhc2hlZFJlc3VsdF0pXG4gICAgICB9XG4gICAgICByZXR1cm4gb3BzXG4gICAgfSlcbiAgfSxcblxuICBhcHBseVN0aWNreU9wZXJhdGlvbnMoZWwpe1xuICAgIGxldCBvcHMgPSBET00ucHJpdmF0ZShlbCwgXCJzdGlja3lcIilcbiAgICBpZighb3BzKXsgcmV0dXJuIH1cblxuICAgIG9wcy5mb3JFYWNoKChbbmFtZSwgb3AsIF9zdGFzaGVkXSkgPT4gdGhpcy5wdXRTdGlja3koZWwsIG5hbWUsIG9wKSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBET01cbiIsICJpbXBvcnQge1xuICBQSFhfQUNUSVZFX0VOVFJZX1JFRlMsXG4gIFBIWF9MSVZFX0ZJTEVfVVBEQVRFRCxcbiAgUEhYX1BSRUZMSUdIVEVEX1JFRlNcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuaW1wb3J0IHtcbiAgY2hhbm5lbFVwbG9hZGVyLFxuICBsb2dFcnJvclxufSBmcm9tIFwiLi91dGlsc1wiXG5cbmltcG9ydCBMaXZlVXBsb2FkZXIgZnJvbSBcIi4vbGl2ZV91cGxvYWRlclwiXG5pbXBvcnQgRE9NIGZyb20gXCIuL2RvbVwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVwbG9hZEVudHJ5IHtcbiAgc3RhdGljIGlzQWN0aXZlKGZpbGVFbCwgZmlsZSl7XG4gICAgbGV0IGlzTmV3ID0gZmlsZS5fcGh4UmVmID09PSB1bmRlZmluZWRcbiAgICBsZXQgaXNQcmVmbGlnaHRJblByb2dyZXNzID0gVXBsb2FkRW50cnkuaXNQcmVmbGlnaHRJblByb2dyZXNzKGZpbGUpXG4gICAgbGV0IGFjdGl2ZVJlZnMgPSBmaWxlRWwuZ2V0QXR0cmlidXRlKFBIWF9BQ1RJVkVfRU5UUllfUkVGUykuc3BsaXQoXCIsXCIpXG4gICAgbGV0IGlzQWN0aXZlID0gYWN0aXZlUmVmcy5pbmRleE9mKExpdmVVcGxvYWRlci5nZW5GaWxlUmVmKGZpbGUpKSA+PSAwXG4gICAgcmV0dXJuIGZpbGUuc2l6ZSA+IDAgJiYgKGlzTmV3IHx8IGlzQWN0aXZlIHx8ICFpc1ByZWZsaWdodEluUHJvZ3Jlc3MpXG4gIH1cblxuICBzdGF0aWMgaXNQcmVmbGlnaHRlZChmaWxlRWwsIGZpbGUpe1xuICAgIGxldCBwcmVmbGlnaHRlZFJlZnMgPSBmaWxlRWwuZ2V0QXR0cmlidXRlKFBIWF9QUkVGTElHSFRFRF9SRUZTKS5zcGxpdChcIixcIilcbiAgICBsZXQgaXNQcmVmbGlnaHRlZCA9IHByZWZsaWdodGVkUmVmcy5pbmRleE9mKExpdmVVcGxvYWRlci5nZW5GaWxlUmVmKGZpbGUpKSA+PSAwXG4gICAgcmV0dXJuIGlzUHJlZmxpZ2h0ZWQgJiYgdGhpcy5pc0FjdGl2ZShmaWxlRWwsIGZpbGUpXG4gIH1cblxuICBzdGF0aWMgaXNQcmVmbGlnaHRJblByb2dyZXNzKGZpbGUpe1xuICAgIHJldHVybiBmaWxlLl9wcmVmbGlnaHRJblByb2dyZXNzID09PSB0cnVlXG4gIH1cblxuICBzdGF0aWMgbWFya1ByZWZsaWdodEluUHJvZ3Jlc3MoZmlsZSl7XG4gICAgZmlsZS5fcHJlZmxpZ2h0SW5Qcm9ncmVzcyA9IHRydWVcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGZpbGVFbCwgZmlsZSwgdmlldyl7XG4gICAgdGhpcy5yZWYgPSBMaXZlVXBsb2FkZXIuZ2VuRmlsZVJlZihmaWxlKVxuICAgIHRoaXMuZmlsZUVsID0gZmlsZUVsXG4gICAgdGhpcy5maWxlID0gZmlsZVxuICAgIHRoaXMudmlldyA9IHZpZXdcbiAgICB0aGlzLm1ldGEgPSBudWxsXG4gICAgdGhpcy5faXNDYW5jZWxsZWQgPSBmYWxzZVxuICAgIHRoaXMuX2lzRG9uZSA9IGZhbHNlXG4gICAgdGhpcy5fcHJvZ3Jlc3MgPSAwXG4gICAgdGhpcy5fbGFzdFByb2dyZXNzU2VudCA9IC0xXG4gICAgdGhpcy5fb25Eb25lID0gZnVuY3Rpb24gKCl7IH1cbiAgICB0aGlzLl9vbkVsVXBkYXRlZCA9IHRoaXMub25FbFVwZGF0ZWQuYmluZCh0aGlzKVxuICAgIHRoaXMuZmlsZUVsLmFkZEV2ZW50TGlzdGVuZXIoUEhYX0xJVkVfRklMRV9VUERBVEVELCB0aGlzLl9vbkVsVXBkYXRlZClcbiAgfVxuXG4gIG1ldGFkYXRhKCl7IHJldHVybiB0aGlzLm1ldGEgfVxuXG4gIHByb2dyZXNzKHByb2dyZXNzKXtcbiAgICB0aGlzLl9wcm9ncmVzcyA9IE1hdGguZmxvb3IocHJvZ3Jlc3MpXG4gICAgaWYodGhpcy5fcHJvZ3Jlc3MgPiB0aGlzLl9sYXN0UHJvZ3Jlc3NTZW50KXtcbiAgICAgIGlmKHRoaXMuX3Byb2dyZXNzID49IDEwMCl7XG4gICAgICAgIHRoaXMuX3Byb2dyZXNzID0gMTAwXG4gICAgICAgIHRoaXMuX2xhc3RQcm9ncmVzc1NlbnQgPSAxMDBcbiAgICAgICAgdGhpcy5faXNEb25lID0gdHJ1ZVxuICAgICAgICB0aGlzLnZpZXcucHVzaEZpbGVQcm9ncmVzcyh0aGlzLmZpbGVFbCwgdGhpcy5yZWYsIDEwMCwgKCkgPT4ge1xuICAgICAgICAgIExpdmVVcGxvYWRlci51bnRyYWNrRmlsZSh0aGlzLmZpbGVFbCwgdGhpcy5maWxlKVxuICAgICAgICAgIHRoaXMuX29uRG9uZSgpXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9sYXN0UHJvZ3Jlc3NTZW50ID0gdGhpcy5fcHJvZ3Jlc3NcbiAgICAgICAgdGhpcy52aWV3LnB1c2hGaWxlUHJvZ3Jlc3ModGhpcy5maWxlRWwsIHRoaXMucmVmLCB0aGlzLl9wcm9ncmVzcylcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjYW5jZWwoKXtcbiAgICB0aGlzLl9pc0NhbmNlbGxlZCA9IHRydWVcbiAgICB0aGlzLl9pc0RvbmUgPSB0cnVlXG4gICAgdGhpcy5fb25Eb25lKClcbiAgfVxuXG4gIGlzRG9uZSgpeyByZXR1cm4gdGhpcy5faXNEb25lIH1cblxuICBlcnJvcihyZWFzb24gPSBcImZhaWxlZFwiKXtcbiAgICB0aGlzLmZpbGVFbC5yZW1vdmVFdmVudExpc3RlbmVyKFBIWF9MSVZFX0ZJTEVfVVBEQVRFRCwgdGhpcy5fb25FbFVwZGF0ZWQpXG4gICAgdGhpcy52aWV3LnB1c2hGaWxlUHJvZ3Jlc3ModGhpcy5maWxlRWwsIHRoaXMucmVmLCB7ZXJyb3I6IHJlYXNvbn0pXG4gICAgaWYoIURPTS5pc0F1dG9VcGxvYWQodGhpcy5maWxlRWwpKXsgTGl2ZVVwbG9hZGVyLmNsZWFyRmlsZXModGhpcy5maWxlRWwpIH1cbiAgfVxuXG4gIC8vcHJpdmF0ZVxuXG4gIG9uRG9uZShjYWxsYmFjayl7XG4gICAgdGhpcy5fb25Eb25lID0gKCkgPT4ge1xuICAgICAgdGhpcy5maWxlRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihQSFhfTElWRV9GSUxFX1VQREFURUQsIHRoaXMuX29uRWxVcGRhdGVkKVxuICAgICAgY2FsbGJhY2soKVxuICAgIH1cbiAgfVxuXG4gIG9uRWxVcGRhdGVkKCl7XG4gICAgbGV0IGFjdGl2ZVJlZnMgPSB0aGlzLmZpbGVFbC5nZXRBdHRyaWJ1dGUoUEhYX0FDVElWRV9FTlRSWV9SRUZTKS5zcGxpdChcIixcIilcbiAgICBpZihhY3RpdmVSZWZzLmluZGV4T2YodGhpcy5yZWYpID09PSAtMSl7IHRoaXMuY2FuY2VsKCkgfVxuICB9XG5cbiAgdG9QcmVmbGlnaHRQYXlsb2FkKCl7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxhc3RfbW9kaWZpZWQ6IHRoaXMuZmlsZS5sYXN0TW9kaWZpZWQsXG4gICAgICBuYW1lOiB0aGlzLmZpbGUubmFtZSxcbiAgICAgIHJlbGF0aXZlX3BhdGg6IHRoaXMuZmlsZS53ZWJraXRSZWxhdGl2ZVBhdGgsXG4gICAgICBzaXplOiB0aGlzLmZpbGUuc2l6ZSxcbiAgICAgIHR5cGU6IHRoaXMuZmlsZS50eXBlLFxuICAgICAgcmVmOiB0aGlzLnJlZixcbiAgICAgIG1ldGE6IHR5cGVvZih0aGlzLmZpbGUubWV0YSkgPT09IFwiZnVuY3Rpb25cIiA/IHRoaXMuZmlsZS5tZXRhKCkgOiB1bmRlZmluZWRcbiAgICB9XG4gIH1cblxuICB1cGxvYWRlcih1cGxvYWRlcnMpe1xuICAgIGlmKHRoaXMubWV0YS51cGxvYWRlcil7XG4gICAgICBsZXQgY2FsbGJhY2sgPSB1cGxvYWRlcnNbdGhpcy5tZXRhLnVwbG9hZGVyXSB8fCBsb2dFcnJvcihgbm8gdXBsb2FkZXIgY29uZmlndXJlZCBmb3IgJHt0aGlzLm1ldGEudXBsb2FkZXJ9YClcbiAgICAgIHJldHVybiB7bmFtZTogdGhpcy5tZXRhLnVwbG9hZGVyLCBjYWxsYmFjazogY2FsbGJhY2t9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7bmFtZTogXCJjaGFubmVsXCIsIGNhbGxiYWNrOiBjaGFubmVsVXBsb2FkZXJ9XG4gICAgfVxuICB9XG5cbiAgemlwUG9zdEZsaWdodChyZXNwKXtcbiAgICB0aGlzLm1ldGEgPSByZXNwLmVudHJpZXNbdGhpcy5yZWZdXG4gICAgaWYoIXRoaXMubWV0YSl7IGxvZ0Vycm9yKGBubyBwcmVmbGlnaHQgdXBsb2FkIHJlc3BvbnNlIHJldHVybmVkIHdpdGggcmVmICR7dGhpcy5yZWZ9YCwge2lucHV0OiB0aGlzLmZpbGVFbCwgcmVzcG9uc2U6IHJlc3B9KSB9XG4gIH1cbn1cbiIsICJpbXBvcnQge1xuICBQSFhfRE9ORV9SRUZTLFxuICBQSFhfUFJFRkxJR0hURURfUkVGUyxcbiAgUEhYX1VQTE9BRF9SRUZcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuaW1wb3J0IHtcbn0gZnJvbSBcIi4vdXRpbHNcIlxuXG5pbXBvcnQgRE9NIGZyb20gXCIuL2RvbVwiXG5pbXBvcnQgVXBsb2FkRW50cnkgZnJvbSBcIi4vdXBsb2FkX2VudHJ5XCJcblxubGV0IGxpdmVVcGxvYWRlckZpbGVSZWYgPSAwXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpdmVVcGxvYWRlciB7XG4gIHN0YXRpYyBnZW5GaWxlUmVmKGZpbGUpe1xuICAgIGxldCByZWYgPSBmaWxlLl9waHhSZWZcbiAgICBpZihyZWYgIT09IHVuZGVmaW5lZCl7XG4gICAgICByZXR1cm4gcmVmXG4gICAgfSBlbHNlIHtcbiAgICAgIGZpbGUuX3BoeFJlZiA9IChsaXZlVXBsb2FkZXJGaWxlUmVmKyspLnRvU3RyaW5nKClcbiAgICAgIHJldHVybiBmaWxlLl9waHhSZWZcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0RW50cnlEYXRhVVJMKGlucHV0RWwsIHJlZiwgY2FsbGJhY2spe1xuICAgIGxldCBmaWxlID0gdGhpcy5hY3RpdmVGaWxlcyhpbnB1dEVsKS5maW5kKGZpbGUgPT4gdGhpcy5nZW5GaWxlUmVmKGZpbGUpID09PSByZWYpXG4gICAgY2FsbGJhY2soVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlKSlcbiAgfVxuXG4gIHN0YXRpYyBoYXNVcGxvYWRzSW5Qcm9ncmVzcyhmb3JtRWwpe1xuICAgIGxldCBhY3RpdmUgPSAwXG4gICAgRE9NLmZpbmRVcGxvYWRJbnB1dHMoZm9ybUVsKS5mb3JFYWNoKGlucHV0ID0+IHtcbiAgICAgIGlmKGlucHV0LmdldEF0dHJpYnV0ZShQSFhfUFJFRkxJR0hURURfUkVGUykgIT09IGlucHV0LmdldEF0dHJpYnV0ZShQSFhfRE9ORV9SRUZTKSl7XG4gICAgICAgIGFjdGl2ZSsrXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gYWN0aXZlID4gMFxuICB9XG5cbiAgc3RhdGljIHNlcmlhbGl6ZVVwbG9hZHMoaW5wdXRFbCl7XG4gICAgbGV0IGZpbGVzID0gdGhpcy5hY3RpdmVGaWxlcyhpbnB1dEVsKVxuICAgIGxldCBmaWxlRGF0YSA9IHt9XG4gICAgZmlsZXMuZm9yRWFjaChmaWxlID0+IHtcbiAgICAgIGxldCBlbnRyeSA9IHtwYXRoOiBpbnB1dEVsLm5hbWV9XG4gICAgICBsZXQgdXBsb2FkUmVmID0gaW5wdXRFbC5nZXRBdHRyaWJ1dGUoUEhYX1VQTE9BRF9SRUYpXG4gICAgICBmaWxlRGF0YVt1cGxvYWRSZWZdID0gZmlsZURhdGFbdXBsb2FkUmVmXSB8fCBbXVxuICAgICAgZW50cnkucmVmID0gdGhpcy5nZW5GaWxlUmVmKGZpbGUpXG4gICAgICBlbnRyeS5sYXN0X21vZGlmaWVkID0gZmlsZS5sYXN0TW9kaWZpZWRcbiAgICAgIGVudHJ5Lm5hbWUgPSBmaWxlLm5hbWUgfHwgZW50cnkucmVmXG4gICAgICBlbnRyeS5yZWxhdGl2ZV9wYXRoID0gZmlsZS53ZWJraXRSZWxhdGl2ZVBhdGhcbiAgICAgIGVudHJ5LnR5cGUgPSBmaWxlLnR5cGVcbiAgICAgIGVudHJ5LnNpemUgPSBmaWxlLnNpemVcbiAgICAgIGlmKHR5cGVvZihmaWxlLm1ldGEpID09PSBcImZ1bmN0aW9uXCIpeyBlbnRyeS5tZXRhID0gZmlsZS5tZXRhKCkgfVxuICAgICAgZmlsZURhdGFbdXBsb2FkUmVmXS5wdXNoKGVudHJ5KVxuICAgIH0pXG4gICAgcmV0dXJuIGZpbGVEYXRhXG4gIH1cblxuICBzdGF0aWMgY2xlYXJGaWxlcyhpbnB1dEVsKXtcbiAgICBpbnB1dEVsLnZhbHVlID0gbnVsbFxuICAgIGlucHV0RWwucmVtb3ZlQXR0cmlidXRlKFBIWF9VUExPQURfUkVGKVxuICAgIERPTS5wdXRQcml2YXRlKGlucHV0RWwsIFwiZmlsZXNcIiwgW10pXG4gIH1cblxuICBzdGF0aWMgdW50cmFja0ZpbGUoaW5wdXRFbCwgZmlsZSl7XG4gICAgRE9NLnB1dFByaXZhdGUoaW5wdXRFbCwgXCJmaWxlc1wiLCBET00ucHJpdmF0ZShpbnB1dEVsLCBcImZpbGVzXCIpLmZpbHRlcihmID0+ICFPYmplY3QuaXMoZiwgZmlsZSkpKVxuICB9XG5cbiAgc3RhdGljIHRyYWNrRmlsZXMoaW5wdXRFbCwgZmlsZXMsIGRhdGFUcmFuc2Zlcil7XG4gICAgaWYoaW5wdXRFbC5nZXRBdHRyaWJ1dGUoXCJtdWx0aXBsZVwiKSAhPT0gbnVsbCl7XG4gICAgICBsZXQgbmV3RmlsZXMgPSBmaWxlcy5maWx0ZXIoZmlsZSA9PiAhdGhpcy5hY3RpdmVGaWxlcyhpbnB1dEVsKS5maW5kKGYgPT4gT2JqZWN0LmlzKGYsIGZpbGUpKSlcbiAgICAgIERPTS5wdXRQcml2YXRlKGlucHV0RWwsIFwiZmlsZXNcIiwgdGhpcy5hY3RpdmVGaWxlcyhpbnB1dEVsKS5jb25jYXQobmV3RmlsZXMpKVxuICAgICAgaW5wdXRFbC52YWx1ZSA9IG51bGxcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmVzZXQgaW5wdXRFbCBmaWxlcyB0byBhbGlnbiBvdXRwdXQgd2l0aCBwcm9ncmFtbWF0aWMgY2hhbmdlcyAoaS5lLiBkcmFnIGFuZCBkcm9wKVxuICAgICAgaWYoZGF0YVRyYW5zZmVyICYmIGRhdGFUcmFuc2Zlci5maWxlcy5sZW5ndGggPiAwKXsgaW5wdXRFbC5maWxlcyA9IGRhdGFUcmFuc2Zlci5maWxlcyB9XG4gICAgICBET00ucHV0UHJpdmF0ZShpbnB1dEVsLCBcImZpbGVzXCIsIGZpbGVzKVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBhY3RpdmVGaWxlSW5wdXRzKGZvcm1FbCl7XG4gICAgbGV0IGZpbGVJbnB1dHMgPSBET00uZmluZFVwbG9hZElucHV0cyhmb3JtRWwpXG4gICAgcmV0dXJuIEFycmF5LmZyb20oZmlsZUlucHV0cykuZmlsdGVyKGVsID0+IGVsLmZpbGVzICYmIHRoaXMuYWN0aXZlRmlsZXMoZWwpLmxlbmd0aCA+IDApXG4gIH1cblxuICBzdGF0aWMgYWN0aXZlRmlsZXMoaW5wdXQpe1xuICAgIHJldHVybiAoRE9NLnByaXZhdGUoaW5wdXQsIFwiZmlsZXNcIikgfHwgW10pLmZpbHRlcihmID0+IFVwbG9hZEVudHJ5LmlzQWN0aXZlKGlucHV0LCBmKSlcbiAgfVxuXG4gIHN0YXRpYyBpbnB1dHNBd2FpdGluZ1ByZWZsaWdodChmb3JtRWwpe1xuICAgIGxldCBmaWxlSW5wdXRzID0gRE9NLmZpbmRVcGxvYWRJbnB1dHMoZm9ybUVsKVxuICAgIHJldHVybiBBcnJheS5mcm9tKGZpbGVJbnB1dHMpLmZpbHRlcihpbnB1dCA9PiB0aGlzLmZpbGVzQXdhaXRpbmdQcmVmbGlnaHQoaW5wdXQpLmxlbmd0aCA+IDApXG4gIH1cblxuICBzdGF0aWMgZmlsZXNBd2FpdGluZ1ByZWZsaWdodChpbnB1dCl7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlRmlsZXMoaW5wdXQpLmZpbHRlcihmID0+ICFVcGxvYWRFbnRyeS5pc1ByZWZsaWdodGVkKGlucHV0LCBmKSAmJiAhVXBsb2FkRW50cnkuaXNQcmVmbGlnaHRJblByb2dyZXNzKGYpKVxuICB9XG5cbiAgc3RhdGljIG1hcmtQcmVmbGlnaHRJblByb2dyZXNzKGVudHJpZXMpe1xuICAgIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiBVcGxvYWRFbnRyeS5tYXJrUHJlZmxpZ2h0SW5Qcm9ncmVzcyhlbnRyeS5maWxlKSlcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGlucHV0RWwsIHZpZXcsIG9uQ29tcGxldGUpe1xuICAgIHRoaXMudmlldyA9IHZpZXdcbiAgICB0aGlzLm9uQ29tcGxldGUgPSBvbkNvbXBsZXRlXG4gICAgdGhpcy5fZW50cmllcyA9XG4gICAgICBBcnJheS5mcm9tKExpdmVVcGxvYWRlci5maWxlc0F3YWl0aW5nUHJlZmxpZ2h0KGlucHV0RWwpIHx8IFtdKVxuICAgICAgICAubWFwKGZpbGUgPT4gbmV3IFVwbG9hZEVudHJ5KGlucHV0RWwsIGZpbGUsIHZpZXcpKVxuXG4gICAgLy8gcHJldmVudCBzZW5kaW5nIGR1cGxpY2F0ZSBwcmVmbGlnaHQgcmVxdWVzdHMgXG4gICAgTGl2ZVVwbG9hZGVyLm1hcmtQcmVmbGlnaHRJblByb2dyZXNzKHRoaXMuX2VudHJpZXMpXG5cbiAgICB0aGlzLm51bUVudHJpZXNJblByb2dyZXNzID0gdGhpcy5fZW50cmllcy5sZW5ndGhcbiAgfVxuXG4gIGVudHJpZXMoKXsgcmV0dXJuIHRoaXMuX2VudHJpZXMgfVxuXG4gIGluaXRBZGFwdGVyVXBsb2FkKHJlc3AsIG9uRXJyb3IsIGxpdmVTb2NrZXQpe1xuICAgIHRoaXMuX2VudHJpZXMgPVxuICAgICAgdGhpcy5fZW50cmllcy5tYXAoZW50cnkgPT4ge1xuICAgICAgICBlbnRyeS56aXBQb3N0RmxpZ2h0KHJlc3ApXG4gICAgICAgIGVudHJ5Lm9uRG9uZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5udW1FbnRyaWVzSW5Qcm9ncmVzcy0tXG4gICAgICAgICAgaWYodGhpcy5udW1FbnRyaWVzSW5Qcm9ncmVzcyA9PT0gMCl7IHRoaXMub25Db21wbGV0ZSgpIH1cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIGVudHJ5XG4gICAgICB9KVxuXG4gICAgbGV0IGdyb3VwZWRFbnRyaWVzID0gdGhpcy5fZW50cmllcy5yZWR1Y2UoKGFjYywgZW50cnkpID0+IHtcbiAgICAgIGlmKCFlbnRyeS5tZXRhKXsgcmV0dXJuIGFjYyB9XG4gICAgICBsZXQge25hbWUsIGNhbGxiYWNrfSA9IGVudHJ5LnVwbG9hZGVyKGxpdmVTb2NrZXQudXBsb2FkZXJzKVxuICAgICAgYWNjW25hbWVdID0gYWNjW25hbWVdIHx8IHtjYWxsYmFjazogY2FsbGJhY2ssIGVudHJpZXM6IFtdfVxuICAgICAgYWNjW25hbWVdLmVudHJpZXMucHVzaChlbnRyeSlcbiAgICAgIHJldHVybiBhY2NcbiAgICB9LCB7fSlcblxuICAgIGZvcihsZXQgbmFtZSBpbiBncm91cGVkRW50cmllcyl7XG4gICAgICBsZXQge2NhbGxiYWNrLCBlbnRyaWVzfSA9IGdyb3VwZWRFbnRyaWVzW25hbWVdXG4gICAgICBjYWxsYmFjayhlbnRyaWVzLCBvbkVycm9yLCByZXNwLCBsaXZlU29ja2V0KVxuICAgIH1cbiAgfVxufVxuIiwgImltcG9ydCB7XG4gIFBIWF9BQ1RJVkVfRU5UUllfUkVGUyxcbiAgUEhYX0xJVkVfRklMRV9VUERBVEVELFxuICBQSFhfUFJFRkxJR0hURURfUkVGUyxcbiAgUEhYX1VQTE9BRF9SRUZcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuaW1wb3J0IExpdmVVcGxvYWRlciBmcm9tIFwiLi9saXZlX3VwbG9hZGVyXCJcbmltcG9ydCBBUklBIGZyb20gXCIuL2FyaWFcIlxuXG5sZXQgSG9va3MgPSB7XG4gIExpdmVGaWxlVXBsb2FkOiB7XG4gICAgYWN0aXZlUmVmcygpeyByZXR1cm4gdGhpcy5lbC5nZXRBdHRyaWJ1dGUoUEhYX0FDVElWRV9FTlRSWV9SRUZTKSB9LFxuXG4gICAgcHJlZmxpZ2h0ZWRSZWZzKCl7IHJldHVybiB0aGlzLmVsLmdldEF0dHJpYnV0ZShQSFhfUFJFRkxJR0hURURfUkVGUykgfSxcblxuICAgIG1vdW50ZWQoKXsgdGhpcy5wcmVmbGlnaHRlZFdhcyA9IHRoaXMucHJlZmxpZ2h0ZWRSZWZzKCkgfSxcblxuICAgIHVwZGF0ZWQoKXtcbiAgICAgIGxldCBuZXdQcmVmbGlnaHRzID0gdGhpcy5wcmVmbGlnaHRlZFJlZnMoKVxuICAgICAgaWYodGhpcy5wcmVmbGlnaHRlZFdhcyAhPT0gbmV3UHJlZmxpZ2h0cyl7XG4gICAgICAgIHRoaXMucHJlZmxpZ2h0ZWRXYXMgPSBuZXdQcmVmbGlnaHRzXG4gICAgICAgIGlmKG5ld1ByZWZsaWdodHMgPT09IFwiXCIpe1xuICAgICAgICAgIHRoaXMuX192aWV3LmNhbmNlbFN1Ym1pdCh0aGlzLmVsLmZvcm0pXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYodGhpcy5hY3RpdmVSZWZzKCkgPT09IFwiXCIpeyB0aGlzLmVsLnZhbHVlID0gbnVsbCB9XG4gICAgICB0aGlzLmVsLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFBIWF9MSVZFX0ZJTEVfVVBEQVRFRCkpXG4gICAgfVxuICB9LFxuXG4gIExpdmVJbWdQcmV2aWV3OiB7XG4gICAgbW91bnRlZCgpe1xuICAgICAgdGhpcy5yZWYgPSB0aGlzLmVsLmdldEF0dHJpYnV0ZShcImRhdGEtcGh4LWVudHJ5LXJlZlwiKVxuICAgICAgdGhpcy5pbnB1dEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5lbC5nZXRBdHRyaWJ1dGUoUEhYX1VQTE9BRF9SRUYpKVxuICAgICAgTGl2ZVVwbG9hZGVyLmdldEVudHJ5RGF0YVVSTCh0aGlzLmlucHV0RWwsIHRoaXMucmVmLCB1cmwgPT4ge1xuICAgICAgICB0aGlzLnVybCA9IHVybFxuICAgICAgICB0aGlzLmVsLnNyYyA9IHVybFxuICAgICAgfSlcbiAgICB9LFxuICAgIGRlc3Ryb3llZCgpe1xuICAgICAgVVJMLnJldm9rZU9iamVjdFVSTCh0aGlzLnVybClcbiAgICB9XG4gIH0sXG4gIEZvY3VzV3JhcDoge1xuICAgIG1vdW50ZWQoKXtcbiAgICAgIHRoaXMuZm9jdXNTdGFydCA9IHRoaXMuZWwuZmlyc3RFbGVtZW50Q2hpbGRcbiAgICAgIHRoaXMuZm9jdXNFbmQgPSB0aGlzLmVsLmxhc3RFbGVtZW50Q2hpbGRcbiAgICAgIHRoaXMuZm9jdXNTdGFydC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgKCkgPT4gQVJJQS5mb2N1c0xhc3QodGhpcy5lbCkpXG4gICAgICB0aGlzLmZvY3VzRW5kLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCAoKSA9PiBBUklBLmZvY3VzRmlyc3QodGhpcy5lbCkpXG4gICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoXCJwaHg6c2hvdy1lbmRcIiwgKCkgPT4gdGhpcy5lbC5mb2N1cygpKVxuICAgICAgaWYod2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5lbCkuZGlzcGxheSAhPT0gXCJub25lXCIpe1xuICAgICAgICBBUklBLmZvY3VzRmlyc3QodGhpcy5lbClcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxubGV0IGZpbmRTY3JvbGxDb250YWluZXIgPSAoZWwpID0+IHtcbiAgaWYoW1wic2Nyb2xsXCIsIFwiYXV0b1wiXS5pbmRleE9mKGdldENvbXB1dGVkU3R5bGUoZWwpLm92ZXJmbG93WSkgPj0gMCkgcmV0dXJuIGVsXG4gIGlmKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCA9PT0gZWwpIHJldHVybiBudWxsXG4gIHJldHVybiBmaW5kU2Nyb2xsQ29udGFpbmVyKGVsLnBhcmVudEVsZW1lbnQpXG59XG5cbmxldCBzY3JvbGxUb3AgPSAoc2Nyb2xsQ29udGFpbmVyKSA9PiB7XG4gIGlmKHNjcm9sbENvbnRhaW5lcil7XG4gICAgcmV0dXJuIHNjcm9sbENvbnRhaW5lci5zY3JvbGxUb3BcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcFxuICB9XG59XG5cbmxldCBib3R0b20gPSAoc2Nyb2xsQ29udGFpbmVyKSA9PiB7XG4gIGlmKHNjcm9sbENvbnRhaW5lcil7XG4gICAgcmV0dXJuIHNjcm9sbENvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b21cbiAgfSBlbHNlIHtcbiAgICAvLyB3aGVuIHdlIGhhdmUgbm8gY29udGFpbmVyLCB0aGUgd2hvbGUgcGFnZSBzY3JvbGxzLFxuICAgIC8vIHRoZXJlZm9yZSB0aGUgYm90dG9tIGNvb3JkaW5hdGUgaXMgdGhlIHZpZXdwb3J0IGhlaWdodFxuICAgIHJldHVybiB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodFxuICB9XG59XG5cbmxldCB0b3AgPSAoc2Nyb2xsQ29udGFpbmVyKSA9PiB7XG4gIGlmKHNjcm9sbENvbnRhaW5lcil7XG4gICAgcmV0dXJuIHNjcm9sbENvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3BcbiAgfSBlbHNlIHtcbiAgICAvLyB3aGVuIHdlIGhhdmUgbm8gY29udGFpbmVyIHRoZSB3aG9sZSBwYWdlIHNjcm9sbHMsXG4gICAgLy8gdGhlcmVmb3JlIHRoZSB0b3AgY29vcmRpbmF0ZSBpcyAwXG4gICAgcmV0dXJuIDBcbiAgfVxufVxuXG5sZXQgaXNBdFZpZXdwb3J0VG9wID0gKGVsLCBzY3JvbGxDb250YWluZXIpID0+IHtcbiAgbGV0IHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICByZXR1cm4gcmVjdC50b3AgPj0gdG9wKHNjcm9sbENvbnRhaW5lcikgJiYgcmVjdC5sZWZ0ID49IDAgJiYgcmVjdC50b3AgPD0gYm90dG9tKHNjcm9sbENvbnRhaW5lcilcbn1cblxubGV0IGlzQXRWaWV3cG9ydEJvdHRvbSA9IChlbCwgc2Nyb2xsQ29udGFpbmVyKSA9PiB7XG4gIGxldCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgcmV0dXJuIHJlY3QucmlnaHQgPj0gdG9wKHNjcm9sbENvbnRhaW5lcikgJiYgcmVjdC5sZWZ0ID49IDAgJiYgcmVjdC5ib3R0b20gPD0gYm90dG9tKHNjcm9sbENvbnRhaW5lcilcbn1cblxubGV0IGlzV2l0aGluVmlld3BvcnQgPSAoZWwsIHNjcm9sbENvbnRhaW5lcikgPT4ge1xuICBsZXQgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gIHJldHVybiByZWN0LnRvcCA+PSB0b3Aoc2Nyb2xsQ29udGFpbmVyKSAmJiByZWN0LmxlZnQgPj0gMCAmJiByZWN0LnRvcCA8PSBib3R0b20oc2Nyb2xsQ29udGFpbmVyKVxufVxuXG5Ib29rcy5JbmZpbml0ZVNjcm9sbCA9IHtcbiAgbW91bnRlZCgpe1xuICAgIHRoaXMuc2Nyb2xsQ29udGFpbmVyID0gZmluZFNjcm9sbENvbnRhaW5lcih0aGlzLmVsKVxuICAgIGxldCBzY3JvbGxCZWZvcmUgPSBzY3JvbGxUb3AodGhpcy5zY3JvbGxDb250YWluZXIpXG4gICAgbGV0IHRvcE92ZXJyYW4gPSBmYWxzZVxuICAgIGxldCB0aHJvdHRsZUludGVydmFsID0gNTAwXG4gICAgbGV0IHBlbmRpbmdPcCA9IG51bGxcblxuICAgIGxldCBvblRvcE92ZXJydW4gPSB0aGlzLnRocm90dGxlKHRocm90dGxlSW50ZXJ2YWwsICh0b3BFdmVudCwgZmlyc3RDaGlsZCkgPT4ge1xuICAgICAgcGVuZGluZ09wID0gKCkgPT4gdHJ1ZVxuICAgICAgdGhpcy5saXZlU29ja2V0LmV4ZWNKU0hvb2tQdXNoKHRoaXMuZWwsIHRvcEV2ZW50LCB7aWQ6IGZpcnN0Q2hpbGQuaWQsIF9vdmVycmFuOiB0cnVlfSwgKCkgPT4ge1xuICAgICAgICBwZW5kaW5nT3AgPSBudWxsXG4gICAgICB9KVxuICAgIH0pXG5cbiAgICBsZXQgb25GaXJzdENoaWxkQXRUb3AgPSB0aGlzLnRocm90dGxlKHRocm90dGxlSW50ZXJ2YWwsICh0b3BFdmVudCwgZmlyc3RDaGlsZCkgPT4ge1xuICAgICAgcGVuZGluZ09wID0gKCkgPT4gZmlyc3RDaGlsZC5zY3JvbGxJbnRvVmlldyh7YmxvY2s6IFwic3RhcnRcIn0pXG4gICAgICB0aGlzLmxpdmVTb2NrZXQuZXhlY0pTSG9va1B1c2godGhpcy5lbCwgdG9wRXZlbnQsIHtpZDogZmlyc3RDaGlsZC5pZH0sICgpID0+IHtcbiAgICAgICAgcGVuZGluZ09wID0gbnVsbFxuICAgICAgICAvLyBtYWtlIHN1cmUgdGhhdCB0aGUgRE9NIGlzIHBhdGNoZWQgYnkgd2FpdGluZyBmb3IgdGhlIG5leHQgdGlja1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICBpZighaXNXaXRoaW5WaWV3cG9ydChmaXJzdENoaWxkLCB0aGlzLnNjcm9sbENvbnRhaW5lcikpe1xuICAgICAgICAgICAgZmlyc3RDaGlsZC5zY3JvbGxJbnRvVmlldyh7YmxvY2s6IFwic3RhcnRcIn0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgbGV0IG9uTGFzdENoaWxkQXRCb3R0b20gPSB0aGlzLnRocm90dGxlKHRocm90dGxlSW50ZXJ2YWwsIChib3R0b21FdmVudCwgbGFzdENoaWxkKSA9PiB7XG4gICAgICBwZW5kaW5nT3AgPSAoKSA9PiBsYXN0Q2hpbGQuc2Nyb2xsSW50b1ZpZXcoe2Jsb2NrOiBcImVuZFwifSlcbiAgICAgIHRoaXMubGl2ZVNvY2tldC5leGVjSlNIb29rUHVzaCh0aGlzLmVsLCBib3R0b21FdmVudCwge2lkOiBsYXN0Q2hpbGQuaWR9LCAoKSA9PiB7XG4gICAgICAgIHBlbmRpbmdPcCA9IG51bGxcbiAgICAgICAgLy8gbWFrZSBzdXJlIHRoYXQgdGhlIERPTSBpcyBwYXRjaGVkIGJ5IHdhaXRpbmcgZm9yIHRoZSBuZXh0IHRpY2tcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgaWYoIWlzV2l0aGluVmlld3BvcnQobGFzdENoaWxkLCB0aGlzLnNjcm9sbENvbnRhaW5lcikpe1xuICAgICAgICAgICAgbGFzdENoaWxkLnNjcm9sbEludG9WaWV3KHtibG9jazogXCJlbmRcIn0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgdGhpcy5vblNjcm9sbCA9IChfZSkgPT4ge1xuICAgICAgbGV0IHNjcm9sbE5vdyA9IHNjcm9sbFRvcCh0aGlzLnNjcm9sbENvbnRhaW5lcilcblxuICAgICAgaWYocGVuZGluZ09wKXtcbiAgICAgICAgc2Nyb2xsQmVmb3JlID0gc2Nyb2xsTm93XG4gICAgICAgIHJldHVybiBwZW5kaW5nT3AoKVxuICAgICAgfVxuICAgICAgbGV0IHJlY3QgPSB0aGlzLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICBsZXQgdG9wRXZlbnQgPSB0aGlzLmVsLmdldEF0dHJpYnV0ZSh0aGlzLmxpdmVTb2NrZXQuYmluZGluZyhcInZpZXdwb3J0LXRvcFwiKSlcbiAgICAgIGxldCBib3R0b21FdmVudCA9IHRoaXMuZWwuZ2V0QXR0cmlidXRlKHRoaXMubGl2ZVNvY2tldC5iaW5kaW5nKFwidmlld3BvcnQtYm90dG9tXCIpKVxuICAgICAgbGV0IGxhc3RDaGlsZCA9IHRoaXMuZWwubGFzdEVsZW1lbnRDaGlsZFxuICAgICAgbGV0IGZpcnN0Q2hpbGQgPSB0aGlzLmVsLmZpcnN0RWxlbWVudENoaWxkXG4gICAgICBsZXQgaXNTY3JvbGxpbmdVcCA9IHNjcm9sbE5vdyA8IHNjcm9sbEJlZm9yZVxuICAgICAgbGV0IGlzU2Nyb2xsaW5nRG93biA9IHNjcm9sbE5vdyA+IHNjcm9sbEJlZm9yZVxuXG4gICAgICAvLyBlbCBvdmVycmFuIHdoaWxlIHNjcm9sbGluZyB1cFxuICAgICAgaWYoaXNTY3JvbGxpbmdVcCAmJiB0b3BFdmVudCAmJiAhdG9wT3ZlcnJhbiAmJiByZWN0LnRvcCA+PSAwKXtcbiAgICAgICAgdG9wT3ZlcnJhbiA9IHRydWVcbiAgICAgICAgb25Ub3BPdmVycnVuKHRvcEV2ZW50LCBmaXJzdENoaWxkKVxuICAgICAgfSBlbHNlIGlmKGlzU2Nyb2xsaW5nRG93biAmJiB0b3BPdmVycmFuICYmIHJlY3QudG9wIDw9IDApe1xuICAgICAgICB0b3BPdmVycmFuID0gZmFsc2VcbiAgICAgIH1cblxuICAgICAgaWYodG9wRXZlbnQgJiYgaXNTY3JvbGxpbmdVcCAmJiBpc0F0Vmlld3BvcnRUb3AoZmlyc3RDaGlsZCwgdGhpcy5zY3JvbGxDb250YWluZXIpKXtcbiAgICAgICAgb25GaXJzdENoaWxkQXRUb3AodG9wRXZlbnQsIGZpcnN0Q2hpbGQpXG4gICAgICB9IGVsc2UgaWYoYm90dG9tRXZlbnQgJiYgaXNTY3JvbGxpbmdEb3duICYmIGlzQXRWaWV3cG9ydEJvdHRvbShsYXN0Q2hpbGQsIHRoaXMuc2Nyb2xsQ29udGFpbmVyKSl7XG4gICAgICAgIG9uTGFzdENoaWxkQXRCb3R0b20oYm90dG9tRXZlbnQsIGxhc3RDaGlsZClcbiAgICAgIH1cbiAgICAgIHNjcm9sbEJlZm9yZSA9IHNjcm9sbE5vd1xuICAgIH1cblxuICAgIGlmKHRoaXMuc2Nyb2xsQ29udGFpbmVyKXtcbiAgICAgIHRoaXMuc2Nyb2xsQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhpcy5vblNjcm9sbClcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhpcy5vblNjcm9sbClcbiAgICB9XG4gIH0sXG4gIFxuICBkZXN0cm95ZWQoKXtcbiAgICBpZih0aGlzLnNjcm9sbENvbnRhaW5lcil7XG4gICAgICB0aGlzLnNjcm9sbENvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMub25TY3JvbGwpXG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMub25TY3JvbGwpXG4gICAgfVxuICB9LFxuXG4gIHRocm90dGxlKGludGVydmFsLCBjYWxsYmFjayl7XG4gICAgbGV0IGxhc3RDYWxsQXQgPSAwXG4gICAgbGV0IHRpbWVyXG5cbiAgICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcbiAgICAgIGxldCBub3cgPSBEYXRlLm5vdygpXG4gICAgICBsZXQgcmVtYWluaW5nVGltZSA9IGludGVydmFsIC0gKG5vdyAtIGxhc3RDYWxsQXQpXG5cbiAgICAgIGlmKHJlbWFpbmluZ1RpbWUgPD0gMCB8fCByZW1haW5pbmdUaW1lID4gaW50ZXJ2YWwpe1xuICAgICAgICBpZih0aW1lcikge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgICAgICB0aW1lciA9IG51bGxcbiAgICAgICAgfVxuICAgICAgICBsYXN0Q2FsbEF0ID0gbm93XG4gICAgICAgIGNhbGxiYWNrKC4uLmFyZ3MpXG4gICAgICB9IGVsc2UgaWYoIXRpbWVyKXtcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBsYXN0Q2FsbEF0ID0gRGF0ZS5ub3coKVxuICAgICAgICAgIHRpbWVyID0gbnVsbFxuICAgICAgICAgIGNhbGxiYWNrKC4uLmFyZ3MpXG4gICAgICAgIH0sIHJlbWFpbmluZ1RpbWUpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBIb29rc1xuIiwgImltcG9ydCB7XG4gIG1heWJlXG59IGZyb20gXCIuL3V0aWxzXCJcblxuaW1wb3J0IERPTSBmcm9tIFwiLi9kb21cIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBET01Qb3N0TW9ycGhSZXN0b3JlciB7XG4gIGNvbnN0cnVjdG9yKGNvbnRhaW5lckJlZm9yZSwgY29udGFpbmVyQWZ0ZXIsIHVwZGF0ZVR5cGUpe1xuICAgIGxldCBpZHNCZWZvcmUgPSBuZXcgU2V0KClcbiAgICBsZXQgaWRzQWZ0ZXIgPSBuZXcgU2V0KFsuLi5jb250YWluZXJBZnRlci5jaGlsZHJlbl0ubWFwKGNoaWxkID0+IGNoaWxkLmlkKSlcblxuICAgIGxldCBlbGVtZW50c1RvTW9kaWZ5ID0gW11cblxuICAgIEFycmF5LmZyb20oY29udGFpbmVyQmVmb3JlLmNoaWxkcmVuKS5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgIGlmKGNoaWxkLmlkKXsgLy8gYWxsIG9mIG91ciBjaGlsZHJlbiBzaG91bGQgYmUgZWxlbWVudHMgd2l0aCBpZHNcbiAgICAgICAgaWRzQmVmb3JlLmFkZChjaGlsZC5pZClcbiAgICAgICAgaWYoaWRzQWZ0ZXIuaGFzKGNoaWxkLmlkKSl7XG4gICAgICAgICAgbGV0IHByZXZpb3VzRWxlbWVudElkID0gY2hpbGQucHJldmlvdXNFbGVtZW50U2libGluZyAmJiBjaGlsZC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmlkXG4gICAgICAgICAgZWxlbWVudHNUb01vZGlmeS5wdXNoKHtlbGVtZW50SWQ6IGNoaWxkLmlkLCBwcmV2aW91c0VsZW1lbnRJZDogcHJldmlvdXNFbGVtZW50SWR9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcblxuICAgIHRoaXMuY29udGFpbmVySWQgPSBjb250YWluZXJBZnRlci5pZFxuICAgIHRoaXMudXBkYXRlVHlwZSA9IHVwZGF0ZVR5cGVcbiAgICB0aGlzLmVsZW1lbnRzVG9Nb2RpZnkgPSBlbGVtZW50c1RvTW9kaWZ5XG4gICAgdGhpcy5lbGVtZW50SWRzVG9BZGQgPSBbLi4uaWRzQWZ0ZXJdLmZpbHRlcihpZCA9PiAhaWRzQmVmb3JlLmhhcyhpZCkpXG4gIH1cblxuICAvLyBXZSBkbyB0aGUgZm9sbG93aW5nIHRvIG9wdGltaXplIGFwcGVuZC9wcmVwZW5kIG9wZXJhdGlvbnM6XG4gIC8vICAgMSkgVHJhY2sgaWRzIG9mIG1vZGlmaWVkIGVsZW1lbnRzICYgb2YgbmV3IGVsZW1lbnRzXG4gIC8vICAgMikgQWxsIHRoZSBtb2RpZmllZCBlbGVtZW50cyBhcmUgcHV0IGJhY2sgaW4gdGhlIGNvcnJlY3QgcG9zaXRpb24gaW4gdGhlIERPTSB0cmVlXG4gIC8vICAgICAgYnkgc3RvcmluZyB0aGUgaWQgb2YgdGhlaXIgcHJldmlvdXMgc2libGluZ1xuICAvLyAgIDMpIE5ldyBlbGVtZW50cyBhcmUgZ29pbmcgdG8gYmUgcHV0IGluIHRoZSByaWdodCBwbGFjZSBieSBtb3JwaGRvbSBkdXJpbmcgYXBwZW5kLlxuICAvLyAgICAgIEZvciBwcmVwZW5kLCB3ZSBtb3ZlIHRoZW0gdG8gdGhlIGZpcnN0IHBvc2l0aW9uIGluIHRoZSBjb250YWluZXJcbiAgcGVyZm9ybSgpe1xuICAgIGxldCBjb250YWluZXIgPSBET00uYnlJZCh0aGlzLmNvbnRhaW5lcklkKVxuICAgIHRoaXMuZWxlbWVudHNUb01vZGlmeS5mb3JFYWNoKGVsZW1lbnRUb01vZGlmeSA9PiB7XG4gICAgICBpZihlbGVtZW50VG9Nb2RpZnkucHJldmlvdXNFbGVtZW50SWQpe1xuICAgICAgICBtYXliZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50VG9Nb2RpZnkucHJldmlvdXNFbGVtZW50SWQpLCBwcmV2aW91c0VsZW0gPT4ge1xuICAgICAgICAgIG1heWJlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRUb01vZGlmeS5lbGVtZW50SWQpLCBlbGVtID0+IHtcbiAgICAgICAgICAgIGxldCBpc0luUmlnaHRQbGFjZSA9IGVsZW0ucHJldmlvdXNFbGVtZW50U2libGluZyAmJiBlbGVtLnByZXZpb3VzRWxlbWVudFNpYmxpbmcuaWQgPT0gcHJldmlvdXNFbGVtLmlkXG4gICAgICAgICAgICBpZighaXNJblJpZ2h0UGxhY2Upe1xuICAgICAgICAgICAgICBwcmV2aW91c0VsZW0uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYWZ0ZXJlbmRcIiwgZWxlbSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVGhpcyBpcyB0aGUgZmlyc3QgZWxlbWVudCBpbiB0aGUgY29udGFpbmVyXG4gICAgICAgIG1heWJlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRUb01vZGlmeS5lbGVtZW50SWQpLCBlbGVtID0+IHtcbiAgICAgICAgICBsZXQgaXNJblJpZ2h0UGxhY2UgPSBlbGVtLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgPT0gbnVsbFxuICAgICAgICAgIGlmKCFpc0luUmlnaHRQbGFjZSl7XG4gICAgICAgICAgICBjb250YWluZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYWZ0ZXJiZWdpblwiLCBlbGVtKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgaWYodGhpcy51cGRhdGVUeXBlID09IFwicHJlcGVuZFwiKXtcbiAgICAgIHRoaXMuZWxlbWVudElkc1RvQWRkLnJldmVyc2UoKS5mb3JFYWNoKGVsZW1JZCA9PiB7XG4gICAgICAgIG1heWJlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1JZCksIGVsZW0gPT4gY29udGFpbmVyLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyYmVnaW5cIiwgZWxlbSkpXG4gICAgICB9KVxuICAgIH1cbiAgfVxufVxuIiwgInZhciBET0NVTUVOVF9GUkFHTUVOVF9OT0RFID0gMTE7XG5cbmZ1bmN0aW9uIG1vcnBoQXR0cnMoZnJvbU5vZGUsIHRvTm9kZSkge1xuICAgIHZhciB0b05vZGVBdHRycyA9IHRvTm9kZS5hdHRyaWJ1dGVzO1xuICAgIHZhciBhdHRyO1xuICAgIHZhciBhdHRyTmFtZTtcbiAgICB2YXIgYXR0ck5hbWVzcGFjZVVSSTtcbiAgICB2YXIgYXR0clZhbHVlO1xuICAgIHZhciBmcm9tVmFsdWU7XG5cbiAgICAvLyBkb2N1bWVudC1mcmFnbWVudHMgZG9udCBoYXZlIGF0dHJpYnV0ZXMgc28gbGV0cyBub3QgZG8gYW55dGhpbmdcbiAgICBpZiAodG9Ob2RlLm5vZGVUeXBlID09PSBET0NVTUVOVF9GUkFHTUVOVF9OT0RFIHx8IGZyb21Ob2RlLm5vZGVUeXBlID09PSBET0NVTUVOVF9GUkFHTUVOVF9OT0RFKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIGF0dHJpYnV0ZXMgb24gb3JpZ2luYWwgRE9NIGVsZW1lbnRcbiAgICBmb3IgKHZhciBpID0gdG9Ob2RlQXR0cnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgYXR0ciA9IHRvTm9kZUF0dHJzW2ldO1xuICAgICAgICBhdHRyTmFtZSA9IGF0dHIubmFtZTtcbiAgICAgICAgYXR0ck5hbWVzcGFjZVVSSSA9IGF0dHIubmFtZXNwYWNlVVJJO1xuICAgICAgICBhdHRyVmFsdWUgPSBhdHRyLnZhbHVlO1xuXG4gICAgICAgIGlmIChhdHRyTmFtZXNwYWNlVVJJKSB7XG4gICAgICAgICAgICBhdHRyTmFtZSA9IGF0dHIubG9jYWxOYW1lIHx8IGF0dHJOYW1lO1xuICAgICAgICAgICAgZnJvbVZhbHVlID0gZnJvbU5vZGUuZ2V0QXR0cmlidXRlTlMoYXR0ck5hbWVzcGFjZVVSSSwgYXR0ck5hbWUpO1xuXG4gICAgICAgICAgICBpZiAoZnJvbVZhbHVlICE9PSBhdHRyVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXR0ci5wcmVmaXggPT09ICd4bWxucycpe1xuICAgICAgICAgICAgICAgICAgICBhdHRyTmFtZSA9IGF0dHIubmFtZTsgLy8gSXQncyBub3QgYWxsb3dlZCB0byBzZXQgYW4gYXR0cmlidXRlIHdpdGggdGhlIFhNTE5TIG5hbWVzcGFjZSB3aXRob3V0IHNwZWNpZnlpbmcgdGhlIGB4bWxuc2AgcHJlZml4XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZyb21Ob2RlLnNldEF0dHJpYnV0ZU5TKGF0dHJOYW1lc3BhY2VVUkksIGF0dHJOYW1lLCBhdHRyVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZnJvbVZhbHVlID0gZnJvbU5vZGUuZ2V0QXR0cmlidXRlKGF0dHJOYW1lKTtcblxuICAgICAgICAgICAgaWYgKGZyb21WYWx1ZSAhPT0gYXR0clZhbHVlKSB7XG4gICAgICAgICAgICAgICAgZnJvbU5vZGUuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIGFueSBleHRyYSBhdHRyaWJ1dGVzIGZvdW5kIG9uIHRoZSBvcmlnaW5hbCBET00gZWxlbWVudCB0aGF0XG4gICAgLy8gd2VyZW4ndCBmb3VuZCBvbiB0aGUgdGFyZ2V0IGVsZW1lbnQuXG4gICAgdmFyIGZyb21Ob2RlQXR0cnMgPSBmcm9tTm9kZS5hdHRyaWJ1dGVzO1xuXG4gICAgZm9yICh2YXIgZCA9IGZyb21Ob2RlQXR0cnMubGVuZ3RoIC0gMTsgZCA+PSAwOyBkLS0pIHtcbiAgICAgICAgYXR0ciA9IGZyb21Ob2RlQXR0cnNbZF07XG4gICAgICAgIGF0dHJOYW1lID0gYXR0ci5uYW1lO1xuICAgICAgICBhdHRyTmFtZXNwYWNlVVJJID0gYXR0ci5uYW1lc3BhY2VVUkk7XG5cbiAgICAgICAgaWYgKGF0dHJOYW1lc3BhY2VVUkkpIHtcbiAgICAgICAgICAgIGF0dHJOYW1lID0gYXR0ci5sb2NhbE5hbWUgfHwgYXR0ck5hbWU7XG5cbiAgICAgICAgICAgIGlmICghdG9Ob2RlLmhhc0F0dHJpYnV0ZU5TKGF0dHJOYW1lc3BhY2VVUkksIGF0dHJOYW1lKSkge1xuICAgICAgICAgICAgICAgIGZyb21Ob2RlLnJlbW92ZUF0dHJpYnV0ZU5TKGF0dHJOYW1lc3BhY2VVUkksIGF0dHJOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghdG9Ob2RlLmhhc0F0dHJpYnV0ZShhdHRyTmFtZSkpIHtcbiAgICAgICAgICAgICAgICBmcm9tTm9kZS5yZW1vdmVBdHRyaWJ1dGUoYXR0ck5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG52YXIgcmFuZ2U7IC8vIENyZWF0ZSBhIHJhbmdlIG9iamVjdCBmb3IgZWZmaWNlbnRseSByZW5kZXJpbmcgc3RyaW5ncyB0byBlbGVtZW50cy5cbnZhciBOU19YSFRNTCA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sJztcblxudmFyIGRvYyA9IHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBkb2N1bWVudDtcbnZhciBIQVNfVEVNUExBVEVfU1VQUE9SVCA9ICEhZG9jICYmICdjb250ZW50JyBpbiBkb2MuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbnZhciBIQVNfUkFOR0VfU1VQUE9SVCA9ICEhZG9jICYmIGRvYy5jcmVhdGVSYW5nZSAmJiAnY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50JyBpbiBkb2MuY3JlYXRlUmFuZ2UoKTtcblxuZnVuY3Rpb24gY3JlYXRlRnJhZ21lbnRGcm9tVGVtcGxhdGUoc3RyKSB7XG4gICAgdmFyIHRlbXBsYXRlID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG4gICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gc3RyO1xuICAgIHJldHVybiB0ZW1wbGF0ZS5jb250ZW50LmNoaWxkTm9kZXNbMF07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZyYWdtZW50RnJvbVJhbmdlKHN0cikge1xuICAgIGlmICghcmFuZ2UpIHtcbiAgICAgICAgcmFuZ2UgPSBkb2MuY3JlYXRlUmFuZ2UoKTtcbiAgICAgICAgcmFuZ2Uuc2VsZWN0Tm9kZShkb2MuYm9keSk7XG4gICAgfVxuXG4gICAgdmFyIGZyYWdtZW50ID0gcmFuZ2UuY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50KHN0cik7XG4gICAgcmV0dXJuIGZyYWdtZW50LmNoaWxkTm9kZXNbMF07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZyYWdtZW50RnJvbVdyYXAoc3RyKSB7XG4gICAgdmFyIGZyYWdtZW50ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2JvZHknKTtcbiAgICBmcmFnbWVudC5pbm5lckhUTUwgPSBzdHI7XG4gICAgcmV0dXJuIGZyYWdtZW50LmNoaWxkTm9kZXNbMF07XG59XG5cbi8qKlxuICogVGhpcyBpcyBhYm91dCB0aGUgc2FtZVxuICogdmFyIGh0bWwgPSBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKHN0ciwgJ3RleHQvaHRtbCcpO1xuICogcmV0dXJuIGh0bWwuYm9keS5maXJzdENoaWxkO1xuICpcbiAqIEBtZXRob2QgdG9FbGVtZW50XG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKi9cbmZ1bmN0aW9uIHRvRWxlbWVudChzdHIpIHtcbiAgICBzdHIgPSBzdHIudHJpbSgpO1xuICAgIGlmIChIQVNfVEVNUExBVEVfU1VQUE9SVCkge1xuICAgICAgLy8gYXZvaWQgcmVzdHJpY3Rpb25zIG9uIGNvbnRlbnQgZm9yIHRoaW5ncyBsaWtlIGA8dHI+PHRoPkhpPC90aD48L3RyPmAgd2hpY2hcbiAgICAgIC8vIGNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudCBkb2Vzbid0IHN1cHBvcnRcbiAgICAgIC8vIDx0ZW1wbGF0ZT4gc3VwcG9ydCBub3QgYXZhaWxhYmxlIGluIElFXG4gICAgICByZXR1cm4gY3JlYXRlRnJhZ21lbnRGcm9tVGVtcGxhdGUoc3RyKTtcbiAgICB9IGVsc2UgaWYgKEhBU19SQU5HRV9TVVBQT1JUKSB7XG4gICAgICByZXR1cm4gY3JlYXRlRnJhZ21lbnRGcm9tUmFuZ2Uoc3RyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY3JlYXRlRnJhZ21lbnRGcm9tV3JhcChzdHIpO1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0d28gbm9kZSdzIG5hbWVzIGFyZSB0aGUgc2FtZS5cbiAqXG4gKiBOT1RFOiBXZSBkb24ndCBib3RoZXIgY2hlY2tpbmcgYG5hbWVzcGFjZVVSSWAgYmVjYXVzZSB5b3Ugd2lsbCBuZXZlciBmaW5kIHR3byBIVE1MIGVsZW1lbnRzIHdpdGggdGhlIHNhbWVcbiAqICAgICAgIG5vZGVOYW1lIGFuZCBkaWZmZXJlbnQgbmFtZXNwYWNlIFVSSXMuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBhXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGIgVGhlIHRhcmdldCBlbGVtZW50XG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBjb21wYXJlTm9kZU5hbWVzKGZyb21FbCwgdG9FbCkge1xuICAgIHZhciBmcm9tTm9kZU5hbWUgPSBmcm9tRWwubm9kZU5hbWU7XG4gICAgdmFyIHRvTm9kZU5hbWUgPSB0b0VsLm5vZGVOYW1lO1xuICAgIHZhciBmcm9tQ29kZVN0YXJ0LCB0b0NvZGVTdGFydDtcblxuICAgIGlmIChmcm9tTm9kZU5hbWUgPT09IHRvTm9kZU5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZnJvbUNvZGVTdGFydCA9IGZyb21Ob2RlTmFtZS5jaGFyQ29kZUF0KDApO1xuICAgIHRvQ29kZVN0YXJ0ID0gdG9Ob2RlTmFtZS5jaGFyQ29kZUF0KDApO1xuXG4gICAgLy8gSWYgdGhlIHRhcmdldCBlbGVtZW50IGlzIGEgdmlydHVhbCBET00gbm9kZSBvciBTVkcgbm9kZSB0aGVuIHdlIG1heVxuICAgIC8vIG5lZWQgdG8gbm9ybWFsaXplIHRoZSB0YWcgbmFtZSBiZWZvcmUgY29tcGFyaW5nLiBOb3JtYWwgSFRNTCBlbGVtZW50cyB0aGF0IGFyZVxuICAgIC8vIGluIHRoZSBcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIlxuICAgIC8vIGFyZSBjb252ZXJ0ZWQgdG8gdXBwZXIgY2FzZVxuICAgIGlmIChmcm9tQ29kZVN0YXJ0IDw9IDkwICYmIHRvQ29kZVN0YXJ0ID49IDk3KSB7IC8vIGZyb20gaXMgdXBwZXIgYW5kIHRvIGlzIGxvd2VyXG4gICAgICAgIHJldHVybiBmcm9tTm9kZU5hbWUgPT09IHRvTm9kZU5hbWUudG9VcHBlckNhc2UoKTtcbiAgICB9IGVsc2UgaWYgKHRvQ29kZVN0YXJ0IDw9IDkwICYmIGZyb21Db2RlU3RhcnQgPj0gOTcpIHsgLy8gdG8gaXMgdXBwZXIgYW5kIGZyb20gaXMgbG93ZXJcbiAgICAgICAgcmV0dXJuIHRvTm9kZU5hbWUgPT09IGZyb21Ob2RlTmFtZS50b1VwcGVyQ2FzZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbi8qKlxuICogQ3JlYXRlIGFuIGVsZW1lbnQsIG9wdGlvbmFsbHkgd2l0aCBhIGtub3duIG5hbWVzcGFjZSBVUkkuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgdGhlIGVsZW1lbnQgbmFtZSwgZS5nLiAnZGl2JyBvciAnc3ZnJ1xuICogQHBhcmFtIHtzdHJpbmd9IFtuYW1lc3BhY2VVUkldIHRoZSBlbGVtZW50J3MgbmFtZXNwYWNlIFVSSSwgaS5lLiB0aGUgdmFsdWUgb2ZcbiAqIGl0cyBgeG1sbnNgIGF0dHJpYnV0ZSBvciBpdHMgaW5mZXJyZWQgbmFtZXNwYWNlLlxuICpcbiAqIEByZXR1cm4ge0VsZW1lbnR9XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnROUyhuYW1lLCBuYW1lc3BhY2VVUkkpIHtcbiAgICByZXR1cm4gIW5hbWVzcGFjZVVSSSB8fCBuYW1lc3BhY2VVUkkgPT09IE5TX1hIVE1MID9cbiAgICAgICAgZG9jLmNyZWF0ZUVsZW1lbnQobmFtZSkgOlxuICAgICAgICBkb2MuY3JlYXRlRWxlbWVudE5TKG5hbWVzcGFjZVVSSSwgbmFtZSk7XG59XG5cbi8qKlxuICogQ29waWVzIHRoZSBjaGlsZHJlbiBvZiBvbmUgRE9NIGVsZW1lbnQgdG8gYW5vdGhlciBET00gZWxlbWVudFxuICovXG5mdW5jdGlvbiBtb3ZlQ2hpbGRyZW4oZnJvbUVsLCB0b0VsKSB7XG4gICAgdmFyIGN1ckNoaWxkID0gZnJvbUVsLmZpcnN0Q2hpbGQ7XG4gICAgd2hpbGUgKGN1ckNoaWxkKSB7XG4gICAgICAgIHZhciBuZXh0Q2hpbGQgPSBjdXJDaGlsZC5uZXh0U2libGluZztcbiAgICAgICAgdG9FbC5hcHBlbmRDaGlsZChjdXJDaGlsZCk7XG4gICAgICAgIGN1ckNoaWxkID0gbmV4dENoaWxkO1xuICAgIH1cbiAgICByZXR1cm4gdG9FbDtcbn1cblxuZnVuY3Rpb24gc3luY0Jvb2xlYW5BdHRyUHJvcChmcm9tRWwsIHRvRWwsIG5hbWUpIHtcbiAgICBpZiAoZnJvbUVsW25hbWVdICE9PSB0b0VsW25hbWVdKSB7XG4gICAgICAgIGZyb21FbFtuYW1lXSA9IHRvRWxbbmFtZV07XG4gICAgICAgIGlmIChmcm9tRWxbbmFtZV0pIHtcbiAgICAgICAgICAgIGZyb21FbC5zZXRBdHRyaWJ1dGUobmFtZSwgJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZnJvbUVsLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxudmFyIHNwZWNpYWxFbEhhbmRsZXJzID0ge1xuICAgIE9QVElPTjogZnVuY3Rpb24oZnJvbUVsLCB0b0VsKSB7XG4gICAgICAgIHZhciBwYXJlbnROb2RlID0gZnJvbUVsLnBhcmVudE5vZGU7XG4gICAgICAgIGlmIChwYXJlbnROb2RlKSB7XG4gICAgICAgICAgICB2YXIgcGFyZW50TmFtZSA9IHBhcmVudE5vZGUubm9kZU5hbWUudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIGlmIChwYXJlbnROYW1lID09PSAnT1BUR1JPVVAnKSB7XG4gICAgICAgICAgICAgICAgcGFyZW50Tm9kZSA9IHBhcmVudE5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgICAgICAgICBwYXJlbnROYW1lID0gcGFyZW50Tm9kZSAmJiBwYXJlbnROb2RlLm5vZGVOYW1lLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGFyZW50TmFtZSA9PT0gJ1NFTEVDVCcgJiYgIXBhcmVudE5vZGUuaGFzQXR0cmlidXRlKCdtdWx0aXBsZScpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZyb21FbC5oYXNBdHRyaWJ1dGUoJ3NlbGVjdGVkJykgJiYgIXRvRWwuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gV29ya2Fyb3VuZCBmb3IgTVMgRWRnZSBidWcgd2hlcmUgdGhlICdzZWxlY3RlZCcgYXR0cmlidXRlIGNhbiBvbmx5IGJlXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZWQgaWYgc2V0IHRvIGEgbm9uLWVtcHR5IHZhbHVlOlxuICAgICAgICAgICAgICAgICAgICAvLyBodHRwczovL2RldmVsb3Blci5taWNyb3NvZnQuY29tL2VuLXVzL21pY3Jvc29mdC1lZGdlL3BsYXRmb3JtL2lzc3Vlcy8xMjA4NzY3OS9cbiAgICAgICAgICAgICAgICAgICAgZnJvbUVsLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCAnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgZnJvbUVsLnJlbW92ZUF0dHJpYnV0ZSgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gV2UgaGF2ZSB0byByZXNldCBzZWxlY3QgZWxlbWVudCdzIHNlbGVjdGVkSW5kZXggdG8gLTEsIG90aGVyd2lzZSBzZXR0aW5nXG4gICAgICAgICAgICAgICAgLy8gZnJvbUVsLnNlbGVjdGVkIHVzaW5nIHRoZSBzeW5jQm9vbGVhbkF0dHJQcm9wIGJlbG93IGhhcyBubyBlZmZlY3QuXG4gICAgICAgICAgICAgICAgLy8gVGhlIGNvcnJlY3Qgc2VsZWN0ZWRJbmRleCB3aWxsIGJlIHNldCBpbiB0aGUgU0VMRUNUIHNwZWNpYWwgaGFuZGxlciBiZWxvdy5cbiAgICAgICAgICAgICAgICBwYXJlbnROb2RlLnNlbGVjdGVkSW5kZXggPSAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzeW5jQm9vbGVhbkF0dHJQcm9wKGZyb21FbCwgdG9FbCwgJ3NlbGVjdGVkJyk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBUaGUgXCJ2YWx1ZVwiIGF0dHJpYnV0ZSBpcyBzcGVjaWFsIGZvciB0aGUgPGlucHV0PiBlbGVtZW50IHNpbmNlIGl0IHNldHNcbiAgICAgKiB0aGUgaW5pdGlhbCB2YWx1ZS4gQ2hhbmdpbmcgdGhlIFwidmFsdWVcIiBhdHRyaWJ1dGUgd2l0aG91dCBjaGFuZ2luZyB0aGVcbiAgICAgKiBcInZhbHVlXCIgcHJvcGVydHkgd2lsbCBoYXZlIG5vIGVmZmVjdCBzaW5jZSBpdCBpcyBvbmx5IHVzZWQgdG8gdGhlIHNldCB0aGVcbiAgICAgKiBpbml0aWFsIHZhbHVlLiAgU2ltaWxhciBmb3IgdGhlIFwiY2hlY2tlZFwiIGF0dHJpYnV0ZSwgYW5kIFwiZGlzYWJsZWRcIi5cbiAgICAgKi9cbiAgICBJTlBVVDogZnVuY3Rpb24oZnJvbUVsLCB0b0VsKSB7XG4gICAgICAgIHN5bmNCb29sZWFuQXR0clByb3AoZnJvbUVsLCB0b0VsLCAnY2hlY2tlZCcpO1xuICAgICAgICBzeW5jQm9vbGVhbkF0dHJQcm9wKGZyb21FbCwgdG9FbCwgJ2Rpc2FibGVkJyk7XG5cbiAgICAgICAgaWYgKGZyb21FbC52YWx1ZSAhPT0gdG9FbC52YWx1ZSkge1xuICAgICAgICAgICAgZnJvbUVsLnZhbHVlID0gdG9FbC52YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdG9FbC5oYXNBdHRyaWJ1dGUoJ3ZhbHVlJykpIHtcbiAgICAgICAgICAgIGZyb21FbC5yZW1vdmVBdHRyaWJ1dGUoJ3ZhbHVlJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgVEVYVEFSRUE6IGZ1bmN0aW9uKGZyb21FbCwgdG9FbCkge1xuICAgICAgICB2YXIgbmV3VmFsdWUgPSB0b0VsLnZhbHVlO1xuICAgICAgICBpZiAoZnJvbUVsLnZhbHVlICE9PSBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgZnJvbUVsLnZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZmlyc3RDaGlsZCA9IGZyb21FbC5maXJzdENoaWxkO1xuICAgICAgICBpZiAoZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgLy8gTmVlZGVkIGZvciBJRS4gQXBwYXJlbnRseSBJRSBzZXRzIHRoZSBwbGFjZWhvbGRlciBhcyB0aGVcbiAgICAgICAgICAgIC8vIG5vZGUgdmFsdWUgYW5kIHZpc2UgdmVyc2EuIFRoaXMgaWdub3JlcyBhbiBlbXB0eSB1cGRhdGUuXG4gICAgICAgICAgICB2YXIgb2xkVmFsdWUgPSBmaXJzdENoaWxkLm5vZGVWYWx1ZTtcblxuICAgICAgICAgICAgaWYgKG9sZFZhbHVlID09IG5ld1ZhbHVlIHx8ICghbmV3VmFsdWUgJiYgb2xkVmFsdWUgPT0gZnJvbUVsLnBsYWNlaG9sZGVyKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZmlyc3RDaGlsZC5ub2RlVmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgU0VMRUNUOiBmdW5jdGlvbihmcm9tRWwsIHRvRWwpIHtcbiAgICAgICAgaWYgKCF0b0VsLmhhc0F0dHJpYnV0ZSgnbXVsdGlwbGUnKSkge1xuICAgICAgICAgICAgdmFyIHNlbGVjdGVkSW5kZXggPSAtMTtcbiAgICAgICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgICAgIC8vIFdlIGhhdmUgdG8gbG9vcCB0aHJvdWdoIGNoaWxkcmVuIG9mIGZyb21FbCwgbm90IHRvRWwgc2luY2Ugbm9kZXMgY2FuIGJlIG1vdmVkXG4gICAgICAgICAgICAvLyBmcm9tIHRvRWwgdG8gZnJvbUVsIGRpcmVjdGx5IHdoZW4gbW9ycGhpbmcuXG4gICAgICAgICAgICAvLyBBdCB0aGUgdGltZSB0aGlzIHNwZWNpYWwgaGFuZGxlciBpcyBpbnZva2VkLCBhbGwgY2hpbGRyZW4gaGF2ZSBhbHJlYWR5IGJlZW4gbW9ycGhlZFxuICAgICAgICAgICAgLy8gYW5kIGFwcGVuZGVkIHRvIC8gcmVtb3ZlZCBmcm9tIGZyb21FbCwgc28gdXNpbmcgZnJvbUVsIGhlcmUgaXMgc2FmZSBhbmQgY29ycmVjdC5cbiAgICAgICAgICAgIHZhciBjdXJDaGlsZCA9IGZyb21FbC5maXJzdENoaWxkO1xuICAgICAgICAgICAgdmFyIG9wdGdyb3VwO1xuICAgICAgICAgICAgdmFyIG5vZGVOYW1lO1xuICAgICAgICAgICAgd2hpbGUoY3VyQ2hpbGQpIHtcbiAgICAgICAgICAgICAgICBub2RlTmFtZSA9IGN1ckNoaWxkLm5vZGVOYW1lICYmIGN1ckNoaWxkLm5vZGVOYW1lLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGVOYW1lID09PSAnT1BUR1JPVVAnKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGdyb3VwID0gY3VyQ2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgIGN1ckNoaWxkID0gb3B0Z3JvdXAuZmlyc3RDaGlsZDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZU5hbWUgPT09ICdPUFRJT04nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyQ2hpbGQuaGFzQXR0cmlidXRlKCdzZWxlY3RlZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY3VyQ2hpbGQgPSBjdXJDaGlsZC5uZXh0U2libGluZztcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjdXJDaGlsZCAmJiBvcHRncm91cCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VyQ2hpbGQgPSBvcHRncm91cC5uZXh0U2libGluZztcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGdyb3VwID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnJvbUVsLnNlbGVjdGVkSW5kZXggPSBzZWxlY3RlZEluZGV4O1xuICAgICAgICB9XG4gICAgfVxufTtcblxudmFyIEVMRU1FTlRfTk9ERSA9IDE7XG52YXIgRE9DVU1FTlRfRlJBR01FTlRfTk9ERSQxID0gMTE7XG52YXIgVEVYVF9OT0RFID0gMztcbnZhciBDT01NRU5UX05PREUgPSA4O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxuZnVuY3Rpb24gZGVmYXVsdEdldE5vZGVLZXkobm9kZSkge1xuICBpZiAobm9kZSkge1xuICAgIHJldHVybiAobm9kZS5nZXRBdHRyaWJ1dGUgJiYgbm9kZS5nZXRBdHRyaWJ1dGUoJ2lkJykpIHx8IG5vZGUuaWQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gbW9ycGhkb21GYWN0b3J5KG1vcnBoQXR0cnMpIHtcblxuICByZXR1cm4gZnVuY3Rpb24gbW9ycGhkb20oZnJvbU5vZGUsIHRvTm9kZSwgb3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdG9Ob2RlID09PSAnc3RyaW5nJykge1xuICAgICAgaWYgKGZyb21Ob2RlLm5vZGVOYW1lID09PSAnI2RvY3VtZW50JyB8fCBmcm9tTm9kZS5ub2RlTmFtZSA9PT0gJ0hUTUwnIHx8IGZyb21Ob2RlLm5vZGVOYW1lID09PSAnQk9EWScpIHtcbiAgICAgICAgdmFyIHRvTm9kZUh0bWwgPSB0b05vZGU7XG4gICAgICAgIHRvTm9kZSA9IGRvYy5jcmVhdGVFbGVtZW50KCdodG1sJyk7XG4gICAgICAgIHRvTm9kZS5pbm5lckhUTUwgPSB0b05vZGVIdG1sO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9Ob2RlID0gdG9FbGVtZW50KHRvTm9kZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0b05vZGUubm9kZVR5cGUgPT09IERPQ1VNRU5UX0ZSQUdNRU5UX05PREUkMSkge1xuICAgICAgdG9Ob2RlID0gdG9Ob2RlLmZpcnN0RWxlbWVudENoaWxkO1xuICAgIH1cblxuICAgIHZhciBnZXROb2RlS2V5ID0gb3B0aW9ucy5nZXROb2RlS2V5IHx8IGRlZmF1bHRHZXROb2RlS2V5O1xuICAgIHZhciBvbkJlZm9yZU5vZGVBZGRlZCA9IG9wdGlvbnMub25CZWZvcmVOb2RlQWRkZWQgfHwgbm9vcDtcbiAgICB2YXIgb25Ob2RlQWRkZWQgPSBvcHRpb25zLm9uTm9kZUFkZGVkIHx8IG5vb3A7XG4gICAgdmFyIG9uQmVmb3JlRWxVcGRhdGVkID0gb3B0aW9ucy5vbkJlZm9yZUVsVXBkYXRlZCB8fCBub29wO1xuICAgIHZhciBvbkVsVXBkYXRlZCA9IG9wdGlvbnMub25FbFVwZGF0ZWQgfHwgbm9vcDtcbiAgICB2YXIgb25CZWZvcmVOb2RlRGlzY2FyZGVkID0gb3B0aW9ucy5vbkJlZm9yZU5vZGVEaXNjYXJkZWQgfHwgbm9vcDtcbiAgICB2YXIgb25Ob2RlRGlzY2FyZGVkID0gb3B0aW9ucy5vbk5vZGVEaXNjYXJkZWQgfHwgbm9vcDtcbiAgICB2YXIgb25CZWZvcmVFbENoaWxkcmVuVXBkYXRlZCA9IG9wdGlvbnMub25CZWZvcmVFbENoaWxkcmVuVXBkYXRlZCB8fCBub29wO1xuICAgIHZhciBza2lwRnJvbUNoaWxkcmVuID0gb3B0aW9ucy5za2lwRnJvbUNoaWxkcmVuIHx8IG5vb3A7XG4gICAgdmFyIGFkZENoaWxkID0gb3B0aW9ucy5hZGRDaGlsZCB8fCBmdW5jdGlvbihwYXJlbnQsIGNoaWxkKXsgcmV0dXJuIHBhcmVudC5hcHBlbmRDaGlsZChjaGlsZCk7IH07XG4gICAgdmFyIGNoaWxkcmVuT25seSA9IG9wdGlvbnMuY2hpbGRyZW5Pbmx5ID09PSB0cnVlO1xuXG4gICAgLy8gVGhpcyBvYmplY3QgaXMgdXNlZCBhcyBhIGxvb2t1cCB0byBxdWlja2x5IGZpbmQgYWxsIGtleWVkIGVsZW1lbnRzIGluIHRoZSBvcmlnaW5hbCBET00gdHJlZS5cbiAgICB2YXIgZnJvbU5vZGVzTG9va3VwID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB2YXIga2V5ZWRSZW1vdmFsTGlzdCA9IFtdO1xuXG4gICAgZnVuY3Rpb24gYWRkS2V5ZWRSZW1vdmFsKGtleSkge1xuICAgICAga2V5ZWRSZW1vdmFsTGlzdC5wdXNoKGtleSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gd2Fsa0Rpc2NhcmRlZENoaWxkTm9kZXMobm9kZSwgc2tpcEtleWVkTm9kZXMpIHtcbiAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBFTEVNRU5UX05PREUpIHtcbiAgICAgICAgdmFyIGN1ckNoaWxkID0gbm9kZS5maXJzdENoaWxkO1xuICAgICAgICB3aGlsZSAoY3VyQ2hpbGQpIHtcblxuICAgICAgICAgIHZhciBrZXkgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICBpZiAoc2tpcEtleWVkTm9kZXMgJiYgKGtleSA9IGdldE5vZGVLZXkoY3VyQ2hpbGQpKSkge1xuICAgICAgICAgICAgLy8gSWYgd2UgYXJlIHNraXBwaW5nIGtleWVkIG5vZGVzIHRoZW4gd2UgYWRkIHRoZSBrZXlcbiAgICAgICAgICAgIC8vIHRvIGEgbGlzdCBzbyB0aGF0IGl0IGNhbiBiZSBoYW5kbGVkIGF0IHRoZSB2ZXJ5IGVuZC5cbiAgICAgICAgICAgIGFkZEtleWVkUmVtb3ZhbChrZXkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBPbmx5IHJlcG9ydCB0aGUgbm9kZSBhcyBkaXNjYXJkZWQgaWYgaXQgaXMgbm90IGtleWVkLiBXZSBkbyB0aGlzIGJlY2F1c2VcbiAgICAgICAgICAgIC8vIGF0IHRoZSBlbmQgd2UgbG9vcCB0aHJvdWdoIGFsbCBrZXllZCBlbGVtZW50cyB0aGF0IHdlcmUgdW5tYXRjaGVkXG4gICAgICAgICAgICAvLyBhbmQgdGhlbiBkaXNjYXJkIHRoZW0gaW4gb25lIGZpbmFsIHBhc3MuXG4gICAgICAgICAgICBvbk5vZGVEaXNjYXJkZWQoY3VyQ2hpbGQpO1xuICAgICAgICAgICAgaWYgKGN1ckNoaWxkLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgICAgd2Fsa0Rpc2NhcmRlZENoaWxkTm9kZXMoY3VyQ2hpbGQsIHNraXBLZXllZE5vZGVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjdXJDaGlsZCA9IGN1ckNoaWxkLm5leHRTaWJsaW5nO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBSZW1vdmVzIGEgRE9NIG5vZGUgb3V0IG9mIHRoZSBvcmlnaW5hbCBET01cbiAgICAqXG4gICAgKiBAcGFyYW0gIHtOb2RlfSBub2RlIFRoZSBub2RlIHRvIHJlbW92ZVxuICAgICogQHBhcmFtICB7Tm9kZX0gcGFyZW50Tm9kZSBUaGUgbm9kZXMgcGFyZW50XG4gICAgKiBAcGFyYW0gIHtCb29sZWFufSBza2lwS2V5ZWROb2RlcyBJZiB0cnVlIHRoZW4gZWxlbWVudHMgd2l0aCBrZXlzIHdpbGwgYmUgc2tpcHBlZCBhbmQgbm90IGRpc2NhcmRlZC5cbiAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJlbW92ZU5vZGUobm9kZSwgcGFyZW50Tm9kZSwgc2tpcEtleWVkTm9kZXMpIHtcbiAgICAgIGlmIChvbkJlZm9yZU5vZGVEaXNjYXJkZWQobm9kZSkgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHBhcmVudE5vZGUpIHtcbiAgICAgICAgcGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICAgIH1cblxuICAgICAgb25Ob2RlRGlzY2FyZGVkKG5vZGUpO1xuICAgICAgd2Fsa0Rpc2NhcmRlZENoaWxkTm9kZXMobm9kZSwgc2tpcEtleWVkTm9kZXMpO1xuICAgIH1cblxuICAgIC8vIC8vIFRyZWVXYWxrZXIgaW1wbGVtZW50YXRpb24gaXMgbm8gZmFzdGVyLCBidXQga2VlcGluZyB0aGlzIGFyb3VuZCBpbiBjYXNlIHRoaXMgY2hhbmdlcyBpbiB0aGUgZnV0dXJlXG4gICAgLy8gZnVuY3Rpb24gaW5kZXhUcmVlKHJvb3QpIHtcbiAgICAvLyAgICAgdmFyIHRyZWVXYWxrZXIgPSBkb2N1bWVudC5jcmVhdGVUcmVlV2Fsa2VyKFxuICAgIC8vICAgICAgICAgcm9vdCxcbiAgICAvLyAgICAgICAgIE5vZGVGaWx0ZXIuU0hPV19FTEVNRU5UKTtcbiAgICAvL1xuICAgIC8vICAgICB2YXIgZWw7XG4gICAgLy8gICAgIHdoaWxlKChlbCA9IHRyZWVXYWxrZXIubmV4dE5vZGUoKSkpIHtcbiAgICAvLyAgICAgICAgIHZhciBrZXkgPSBnZXROb2RlS2V5KGVsKTtcbiAgICAvLyAgICAgICAgIGlmIChrZXkpIHtcbiAgICAvLyAgICAgICAgICAgICBmcm9tTm9kZXNMb29rdXBba2V5XSA9IGVsO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9XG4gICAgLy8gfVxuXG4gICAgLy8gLy8gTm9kZUl0ZXJhdG9yIGltcGxlbWVudGF0aW9uIGlzIG5vIGZhc3RlciwgYnV0IGtlZXBpbmcgdGhpcyBhcm91bmQgaW4gY2FzZSB0aGlzIGNoYW5nZXMgaW4gdGhlIGZ1dHVyZVxuICAgIC8vXG4gICAgLy8gZnVuY3Rpb24gaW5kZXhUcmVlKG5vZGUpIHtcbiAgICAvLyAgICAgdmFyIG5vZGVJdGVyYXRvciA9IGRvY3VtZW50LmNyZWF0ZU5vZGVJdGVyYXRvcihub2RlLCBOb2RlRmlsdGVyLlNIT1dfRUxFTUVOVCk7XG4gICAgLy8gICAgIHZhciBlbDtcbiAgICAvLyAgICAgd2hpbGUoKGVsID0gbm9kZUl0ZXJhdG9yLm5leHROb2RlKCkpKSB7XG4gICAgLy8gICAgICAgICB2YXIga2V5ID0gZ2V0Tm9kZUtleShlbCk7XG4gICAgLy8gICAgICAgICBpZiAoa2V5KSB7XG4gICAgLy8gICAgICAgICAgICAgZnJvbU5vZGVzTG9va3VwW2tleV0gPSBlbDtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfVxuICAgIC8vIH1cblxuICAgIGZ1bmN0aW9uIGluZGV4VHJlZShub2RlKSB7XG4gICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFIHx8IG5vZGUubm9kZVR5cGUgPT09IERPQ1VNRU5UX0ZSQUdNRU5UX05PREUkMSkge1xuICAgICAgICB2YXIgY3VyQ2hpbGQgPSBub2RlLmZpcnN0Q2hpbGQ7XG4gICAgICAgIHdoaWxlIChjdXJDaGlsZCkge1xuICAgICAgICAgIHZhciBrZXkgPSBnZXROb2RlS2V5KGN1ckNoaWxkKTtcbiAgICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICBmcm9tTm9kZXNMb29rdXBba2V5XSA9IGN1ckNoaWxkO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFdhbGsgcmVjdXJzaXZlbHlcbiAgICAgICAgICBpbmRleFRyZWUoY3VyQ2hpbGQpO1xuXG4gICAgICAgICAgY3VyQ2hpbGQgPSBjdXJDaGlsZC5uZXh0U2libGluZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGluZGV4VHJlZShmcm9tTm9kZSk7XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVOb2RlQWRkZWQoZWwpIHtcbiAgICAgIG9uTm9kZUFkZGVkKGVsKTtcblxuICAgICAgdmFyIGN1ckNoaWxkID0gZWwuZmlyc3RDaGlsZDtcbiAgICAgIHdoaWxlIChjdXJDaGlsZCkge1xuICAgICAgICB2YXIgbmV4dFNpYmxpbmcgPSBjdXJDaGlsZC5uZXh0U2libGluZztcblxuICAgICAgICB2YXIga2V5ID0gZ2V0Tm9kZUtleShjdXJDaGlsZCk7XG4gICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICB2YXIgdW5tYXRjaGVkRnJvbUVsID0gZnJvbU5vZGVzTG9va3VwW2tleV07XG4gICAgICAgICAgLy8gaWYgd2UgZmluZCBhIGR1cGxpY2F0ZSAjaWQgbm9kZSBpbiBjYWNoZSwgcmVwbGFjZSBgZWxgIHdpdGggY2FjaGUgdmFsdWVcbiAgICAgICAgICAvLyBhbmQgbW9ycGggaXQgdG8gdGhlIGNoaWxkIG5vZGUuXG4gICAgICAgICAgaWYgKHVubWF0Y2hlZEZyb21FbCAmJiBjb21wYXJlTm9kZU5hbWVzKGN1ckNoaWxkLCB1bm1hdGNoZWRGcm9tRWwpKSB7XG4gICAgICAgICAgICBjdXJDaGlsZC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZCh1bm1hdGNoZWRGcm9tRWwsIGN1ckNoaWxkKTtcbiAgICAgICAgICAgIG1vcnBoRWwodW5tYXRjaGVkRnJvbUVsLCBjdXJDaGlsZCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhhbmRsZU5vZGVBZGRlZChjdXJDaGlsZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHJlY3Vyc2l2ZWx5IGNhbGwgZm9yIGN1ckNoaWxkIGFuZCBpdCdzIGNoaWxkcmVuIHRvIHNlZSBpZiB3ZSBmaW5kIHNvbWV0aGluZyBpblxuICAgICAgICAgIC8vIGZyb21Ob2Rlc0xvb2t1cFxuICAgICAgICAgIGhhbmRsZU5vZGVBZGRlZChjdXJDaGlsZCk7XG4gICAgICAgIH1cblxuICAgICAgICBjdXJDaGlsZCA9IG5leHRTaWJsaW5nO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsZWFudXBGcm9tRWwoZnJvbUVsLCBjdXJGcm9tTm9kZUNoaWxkLCBjdXJGcm9tTm9kZUtleSkge1xuICAgICAgLy8gV2UgaGF2ZSBwcm9jZXNzZWQgYWxsIG9mIHRoZSBcInRvIG5vZGVzXCIuIElmIGN1ckZyb21Ob2RlQ2hpbGQgaXNcbiAgICAgIC8vIG5vbi1udWxsIHRoZW4gd2Ugc3RpbGwgaGF2ZSBzb21lIGZyb20gbm9kZXMgbGVmdCBvdmVyIHRoYXQgbmVlZFxuICAgICAgLy8gdG8gYmUgcmVtb3ZlZFxuICAgICAgd2hpbGUgKGN1ckZyb21Ob2RlQ2hpbGQpIHtcbiAgICAgICAgdmFyIGZyb21OZXh0U2libGluZyA9IGN1ckZyb21Ob2RlQ2hpbGQubmV4dFNpYmxpbmc7XG4gICAgICAgIGlmICgoY3VyRnJvbU5vZGVLZXkgPSBnZXROb2RlS2V5KGN1ckZyb21Ob2RlQ2hpbGQpKSkge1xuICAgICAgICAgIC8vIFNpbmNlIHRoZSBub2RlIGlzIGtleWVkIGl0IG1pZ2h0IGJlIG1hdGNoZWQgdXAgbGF0ZXIgc28gd2UgZGVmZXJcbiAgICAgICAgICAvLyB0aGUgYWN0dWFsIHJlbW92YWwgdG8gbGF0ZXJcbiAgICAgICAgICBhZGRLZXllZFJlbW92YWwoY3VyRnJvbU5vZGVLZXkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIE5PVEU6IHdlIHNraXAgbmVzdGVkIGtleWVkIG5vZGVzIGZyb20gYmVpbmcgcmVtb3ZlZCBzaW5jZSB0aGVyZSBpc1xuICAgICAgICAgIC8vICAgICAgIHN0aWxsIGEgY2hhbmNlIHRoZXkgd2lsbCBiZSBtYXRjaGVkIHVwIGxhdGVyXG4gICAgICAgICAgcmVtb3ZlTm9kZShjdXJGcm9tTm9kZUNoaWxkLCBmcm9tRWwsIHRydWUgLyogc2tpcCBrZXllZCBub2RlcyAqLyk7XG4gICAgICAgIH1cbiAgICAgICAgY3VyRnJvbU5vZGVDaGlsZCA9IGZyb21OZXh0U2libGluZztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb3JwaEVsKGZyb21FbCwgdG9FbCwgY2hpbGRyZW5Pbmx5KSB7XG4gICAgICB2YXIgdG9FbEtleSA9IGdldE5vZGVLZXkodG9FbCk7XG5cbiAgICAgIGlmICh0b0VsS2V5KSB7XG4gICAgICAgIC8vIElmIGFuIGVsZW1lbnQgd2l0aCBhbiBJRCBpcyBiZWluZyBtb3JwaGVkIHRoZW4gaXQgd2lsbCBiZSBpbiB0aGUgZmluYWxcbiAgICAgICAgLy8gRE9NIHNvIGNsZWFyIGl0IG91dCBvZiB0aGUgc2F2ZWQgZWxlbWVudHMgY29sbGVjdGlvblxuICAgICAgICBkZWxldGUgZnJvbU5vZGVzTG9va3VwW3RvRWxLZXldO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWNoaWxkcmVuT25seSkge1xuICAgICAgICAvLyBvcHRpb25hbFxuICAgICAgICBpZiAob25CZWZvcmVFbFVwZGF0ZWQoZnJvbUVsLCB0b0VsKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1cGRhdGUgYXR0cmlidXRlcyBvbiBvcmlnaW5hbCBET00gZWxlbWVudCBmaXJzdFxuICAgICAgICBtb3JwaEF0dHJzKGZyb21FbCwgdG9FbCk7XG4gICAgICAgIC8vIG9wdGlvbmFsXG4gICAgICAgIG9uRWxVcGRhdGVkKGZyb21FbCk7XG5cbiAgICAgICAgaWYgKG9uQmVmb3JlRWxDaGlsZHJlblVwZGF0ZWQoZnJvbUVsLCB0b0VsKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZyb21FbC5ub2RlTmFtZSAhPT0gJ1RFWFRBUkVBJykge1xuICAgICAgICBtb3JwaENoaWxkcmVuKGZyb21FbCwgdG9FbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzcGVjaWFsRWxIYW5kbGVycy5URVhUQVJFQShmcm9tRWwsIHRvRWwpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vcnBoQ2hpbGRyZW4oZnJvbUVsLCB0b0VsKSB7XG4gICAgICB2YXIgc2tpcEZyb20gPSBza2lwRnJvbUNoaWxkcmVuKGZyb21FbCwgdG9FbCk7XG4gICAgICB2YXIgY3VyVG9Ob2RlQ2hpbGQgPSB0b0VsLmZpcnN0Q2hpbGQ7XG4gICAgICB2YXIgY3VyRnJvbU5vZGVDaGlsZCA9IGZyb21FbC5maXJzdENoaWxkO1xuICAgICAgdmFyIGN1clRvTm9kZUtleTtcbiAgICAgIHZhciBjdXJGcm9tTm9kZUtleTtcblxuICAgICAgdmFyIGZyb21OZXh0U2libGluZztcbiAgICAgIHZhciB0b05leHRTaWJsaW5nO1xuICAgICAgdmFyIG1hdGNoaW5nRnJvbUVsO1xuXG4gICAgICAvLyB3YWxrIHRoZSBjaGlsZHJlblxuICAgICAgb3V0ZXI6IHdoaWxlIChjdXJUb05vZGVDaGlsZCkge1xuICAgICAgICB0b05leHRTaWJsaW5nID0gY3VyVG9Ob2RlQ2hpbGQubmV4dFNpYmxpbmc7XG4gICAgICAgIGN1clRvTm9kZUtleSA9IGdldE5vZGVLZXkoY3VyVG9Ob2RlQ2hpbGQpO1xuXG4gICAgICAgIC8vIHdhbGsgdGhlIGZyb21Ob2RlIGNoaWxkcmVuIGFsbCB0aGUgd2F5IHRocm91Z2hcbiAgICAgICAgd2hpbGUgKCFza2lwRnJvbSAmJiBjdXJGcm9tTm9kZUNoaWxkKSB7XG4gICAgICAgICAgZnJvbU5leHRTaWJsaW5nID0gY3VyRnJvbU5vZGVDaGlsZC5uZXh0U2libGluZztcblxuICAgICAgICAgIGlmIChjdXJUb05vZGVDaGlsZC5pc1NhbWVOb2RlICYmIGN1clRvTm9kZUNoaWxkLmlzU2FtZU5vZGUoY3VyRnJvbU5vZGVDaGlsZCkpIHtcbiAgICAgICAgICAgIGN1clRvTm9kZUNoaWxkID0gdG9OZXh0U2libGluZztcbiAgICAgICAgICAgIGN1ckZyb21Ob2RlQ2hpbGQgPSBmcm9tTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICBjb250aW51ZSBvdXRlcjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjdXJGcm9tTm9kZUtleSA9IGdldE5vZGVLZXkoY3VyRnJvbU5vZGVDaGlsZCk7XG5cbiAgICAgICAgICB2YXIgY3VyRnJvbU5vZGVUeXBlID0gY3VyRnJvbU5vZGVDaGlsZC5ub2RlVHlwZTtcblxuICAgICAgICAgIC8vIHRoaXMgbWVhbnMgaWYgdGhlIGN1ckZyb21Ob2RlQ2hpbGQgZG9lc250IGhhdmUgYSBtYXRjaCB3aXRoIHRoZSBjdXJUb05vZGVDaGlsZFxuICAgICAgICAgIHZhciBpc0NvbXBhdGlibGUgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICBpZiAoY3VyRnJvbU5vZGVUeXBlID09PSBjdXJUb05vZGVDaGlsZC5ub2RlVHlwZSkge1xuICAgICAgICAgICAgaWYgKGN1ckZyb21Ob2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgIC8vIEJvdGggbm9kZXMgYmVpbmcgY29tcGFyZWQgYXJlIEVsZW1lbnQgbm9kZXNcblxuICAgICAgICAgICAgICBpZiAoY3VyVG9Ob2RlS2V5KSB7XG4gICAgICAgICAgICAgICAgLy8gVGhlIHRhcmdldCBub2RlIGhhcyBhIGtleSBzbyB3ZSB3YW50IHRvIG1hdGNoIGl0IHVwIHdpdGggdGhlIGNvcnJlY3QgZWxlbWVudFxuICAgICAgICAgICAgICAgIC8vIGluIHRoZSBvcmlnaW5hbCBET00gdHJlZVxuICAgICAgICAgICAgICAgIGlmIChjdXJUb05vZGVLZXkgIT09IGN1ckZyb21Ob2RlS2V5KSB7XG4gICAgICAgICAgICAgICAgICAvLyBUaGUgY3VycmVudCBlbGVtZW50IGluIHRoZSBvcmlnaW5hbCBET00gdHJlZSBkb2VzIG5vdCBoYXZlIGEgbWF0Y2hpbmcga2V5IHNvXG4gICAgICAgICAgICAgICAgICAvLyBsZXQncyBjaGVjayBvdXIgbG9va3VwIHRvIHNlZSBpZiB0aGVyZSBpcyBhIG1hdGNoaW5nIGVsZW1lbnQgaW4gdGhlIG9yaWdpbmFsXG4gICAgICAgICAgICAgICAgICAvLyBET00gdHJlZVxuICAgICAgICAgICAgICAgICAgaWYgKChtYXRjaGluZ0Zyb21FbCA9IGZyb21Ob2Rlc0xvb2t1cFtjdXJUb05vZGVLZXldKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZnJvbU5leHRTaWJsaW5nID09PSBtYXRjaGluZ0Zyb21FbCkge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIFNwZWNpYWwgY2FzZSBmb3Igc2luZ2xlIGVsZW1lbnQgcmVtb3ZhbHMuIFRvIGF2b2lkIHJlbW92aW5nIHRoZSBvcmlnaW5hbFxuICAgICAgICAgICAgICAgICAgICAgIC8vIERPTSBub2RlIG91dCBvZiB0aGUgdHJlZSAoc2luY2UgdGhhdCBjYW4gYnJlYWsgQ1NTIHRyYW5zaXRpb25zLCBldGMuKSxcbiAgICAgICAgICAgICAgICAgICAgICAvLyB3ZSB3aWxsIGluc3RlYWQgZGlzY2FyZCB0aGUgY3VycmVudCBub2RlIGFuZCB3YWl0IHVudGlsIHRoZSBuZXh0XG4gICAgICAgICAgICAgICAgICAgICAgLy8gaXRlcmF0aW9uIHRvIHByb3Blcmx5IG1hdGNoIHVwIHRoZSBrZXllZCB0YXJnZXQgZWxlbWVudCB3aXRoIGl0cyBtYXRjaGluZ1xuICAgICAgICAgICAgICAgICAgICAgIC8vIGVsZW1lbnQgaW4gdGhlIG9yaWdpbmFsIHRyZWVcbiAgICAgICAgICAgICAgICAgICAgICBpc0NvbXBhdGlibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBmb3VuZCBhIG1hdGNoaW5nIGtleWVkIGVsZW1lbnQgc29tZXdoZXJlIGluIHRoZSBvcmlnaW5hbCBET00gdHJlZS5cbiAgICAgICAgICAgICAgICAgICAgICAvLyBMZXQncyBtb3ZlIHRoZSBvcmlnaW5hbCBET00gbm9kZSBpbnRvIHRoZSBjdXJyZW50IHBvc2l0aW9uIGFuZCBtb3JwaFxuICAgICAgICAgICAgICAgICAgICAgIC8vIGl0LlxuXG4gICAgICAgICAgICAgICAgICAgICAgLy8gTk9URTogV2UgdXNlIGluc2VydEJlZm9yZSBpbnN0ZWFkIG9mIHJlcGxhY2VDaGlsZCBiZWNhdXNlIHdlIHdhbnQgdG8gZ28gdGhyb3VnaFxuICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSBgcmVtb3ZlTm9kZSgpYCBmdW5jdGlvbiBmb3IgdGhlIG5vZGUgdGhhdCBpcyBiZWluZyBkaXNjYXJkZWQgc28gdGhhdFxuICAgICAgICAgICAgICAgICAgICAgIC8vIGFsbCBsaWZlY3ljbGUgaG9va3MgYXJlIGNvcnJlY3RseSBpbnZva2VkXG4gICAgICAgICAgICAgICAgICAgICAgZnJvbUVsLmluc2VydEJlZm9yZShtYXRjaGluZ0Zyb21FbCwgY3VyRnJvbU5vZGVDaGlsZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAvLyBmcm9tTmV4dFNpYmxpbmcgPSBjdXJGcm9tTm9kZUNoaWxkLm5leHRTaWJsaW5nO1xuXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGN1ckZyb21Ob2RlS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTaW5jZSB0aGUgbm9kZSBpcyBrZXllZCBpdCBtaWdodCBiZSBtYXRjaGVkIHVwIGxhdGVyIHNvIHdlIGRlZmVyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgYWN0dWFsIHJlbW92YWwgdG8gbGF0ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZEtleWVkUmVtb3ZhbChjdXJGcm9tTm9kZUtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5PVEU6IHdlIHNraXAgbmVzdGVkIGtleWVkIG5vZGVzIGZyb20gYmVpbmcgcmVtb3ZlZCBzaW5jZSB0aGVyZSBpc1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgc3RpbGwgYSBjaGFuY2UgdGhleSB3aWxsIGJlIG1hdGNoZWQgdXAgbGF0ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZU5vZGUoY3VyRnJvbU5vZGVDaGlsZCwgZnJvbUVsLCB0cnVlIC8qIHNraXAga2V5ZWQgbm9kZXMgKi8pO1xuICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgIGN1ckZyb21Ob2RlQ2hpbGQgPSBtYXRjaGluZ0Zyb21FbDtcbiAgICAgICAgICAgICAgICAgICAgICBjdXJGcm9tTm9kZUtleSA9IGdldE5vZGVLZXkoY3VyRnJvbU5vZGVDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSBub2RlcyBhcmUgbm90IGNvbXBhdGlibGUgc2luY2UgdGhlIFwidG9cIiBub2RlIGhhcyBhIGtleSBhbmQgdGhlcmVcbiAgICAgICAgICAgICAgICAgICAgLy8gaXMgbm8gbWF0Y2hpbmcga2V5ZWQgbm9kZSBpbiB0aGUgc291cmNlIHRyZWVcbiAgICAgICAgICAgICAgICAgICAgaXNDb21wYXRpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGN1ckZyb21Ob2RlS2V5KSB7XG4gICAgICAgICAgICAgICAgLy8gVGhlIG9yaWdpbmFsIGhhcyBhIGtleVxuICAgICAgICAgICAgICAgIGlzQ29tcGF0aWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaXNDb21wYXRpYmxlID0gaXNDb21wYXRpYmxlICE9PSBmYWxzZSAmJiBjb21wYXJlTm9kZU5hbWVzKGN1ckZyb21Ob2RlQ2hpbGQsIGN1clRvTm9kZUNoaWxkKTtcbiAgICAgICAgICAgICAgaWYgKGlzQ29tcGF0aWJsZSkge1xuICAgICAgICAgICAgICAgIC8vIFdlIGZvdW5kIGNvbXBhdGlibGUgRE9NIGVsZW1lbnRzIHNvIHRyYW5zZm9ybVxuICAgICAgICAgICAgICAgIC8vIHRoZSBjdXJyZW50IFwiZnJvbVwiIG5vZGUgdG8gbWF0Y2ggdGhlIGN1cnJlbnRcbiAgICAgICAgICAgICAgICAvLyB0YXJnZXQgRE9NIG5vZGUuXG4gICAgICAgICAgICAgICAgLy8gTU9SUEhcbiAgICAgICAgICAgICAgICBtb3JwaEVsKGN1ckZyb21Ob2RlQ2hpbGQsIGN1clRvTm9kZUNoaWxkKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN1ckZyb21Ob2RlVHlwZSA9PT0gVEVYVF9OT0RFIHx8IGN1ckZyb21Ob2RlVHlwZSA9PSBDT01NRU5UX05PREUpIHtcbiAgICAgICAgICAgICAgLy8gQm90aCBub2RlcyBiZWluZyBjb21wYXJlZCBhcmUgVGV4dCBvciBDb21tZW50IG5vZGVzXG4gICAgICAgICAgICAgIGlzQ29tcGF0aWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgIC8vIFNpbXBseSB1cGRhdGUgbm9kZVZhbHVlIG9uIHRoZSBvcmlnaW5hbCBub2RlIHRvXG4gICAgICAgICAgICAgIC8vIGNoYW5nZSB0aGUgdGV4dCB2YWx1ZVxuICAgICAgICAgICAgICBpZiAoY3VyRnJvbU5vZGVDaGlsZC5ub2RlVmFsdWUgIT09IGN1clRvTm9kZUNoaWxkLm5vZGVWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGN1ckZyb21Ob2RlQ2hpbGQubm9kZVZhbHVlID0gY3VyVG9Ob2RlQ2hpbGQubm9kZVZhbHVlO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoaXNDb21wYXRpYmxlKSB7XG4gICAgICAgICAgICAvLyBBZHZhbmNlIGJvdGggdGhlIFwidG9cIiBjaGlsZCBhbmQgdGhlIFwiZnJvbVwiIGNoaWxkIHNpbmNlIHdlIGZvdW5kIGEgbWF0Y2hcbiAgICAgICAgICAgIC8vIE5vdGhpbmcgZWxzZSB0byBkbyBhcyB3ZSBhbHJlYWR5IHJlY3Vyc2l2ZWx5IGNhbGxlZCBtb3JwaENoaWxkcmVuIGFib3ZlXG4gICAgICAgICAgICBjdXJUb05vZGVDaGlsZCA9IHRvTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICBjdXJGcm9tTm9kZUNoaWxkID0gZnJvbU5leHRTaWJsaW5nO1xuICAgICAgICAgICAgY29udGludWUgb3V0ZXI7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gTm8gY29tcGF0aWJsZSBtYXRjaCBzbyByZW1vdmUgdGhlIG9sZCBub2RlIGZyb20gdGhlIERPTSBhbmQgY29udGludWUgdHJ5aW5nIHRvIGZpbmQgYVxuICAgICAgICAgIC8vIG1hdGNoIGluIHRoZSBvcmlnaW5hbCBET00uIEhvd2V2ZXIsIHdlIG9ubHkgZG8gdGhpcyBpZiB0aGUgZnJvbSBub2RlIGlzIG5vdCBrZXllZFxuICAgICAgICAgIC8vIHNpbmNlIGl0IGlzIHBvc3NpYmxlIHRoYXQgYSBrZXllZCBub2RlIG1pZ2h0IG1hdGNoIHVwIHdpdGggYSBub2RlIHNvbWV3aGVyZSBlbHNlIGluIHRoZVxuICAgICAgICAgIC8vIHRhcmdldCB0cmVlIGFuZCB3ZSBkb24ndCB3YW50IHRvIGRpc2NhcmQgaXQganVzdCB5ZXQgc2luY2UgaXQgc3RpbGwgbWlnaHQgZmluZCBhXG4gICAgICAgICAgLy8gaG9tZSBpbiB0aGUgZmluYWwgRE9NIHRyZWUuIEFmdGVyIGV2ZXJ5dGhpbmcgaXMgZG9uZSB3ZSB3aWxsIHJlbW92ZSBhbnkga2V5ZWQgbm9kZXNcbiAgICAgICAgICAvLyB0aGF0IGRpZG4ndCBmaW5kIGEgaG9tZVxuICAgICAgICAgIGlmIChjdXJGcm9tTm9kZUtleSkge1xuICAgICAgICAgICAgLy8gU2luY2UgdGhlIG5vZGUgaXMga2V5ZWQgaXQgbWlnaHQgYmUgbWF0Y2hlZCB1cCBsYXRlciBzbyB3ZSBkZWZlclxuICAgICAgICAgICAgLy8gdGhlIGFjdHVhbCByZW1vdmFsIHRvIGxhdGVyXG4gICAgICAgICAgICBhZGRLZXllZFJlbW92YWwoY3VyRnJvbU5vZGVLZXkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBOT1RFOiB3ZSBza2lwIG5lc3RlZCBrZXllZCBub2RlcyBmcm9tIGJlaW5nIHJlbW92ZWQgc2luY2UgdGhlcmUgaXNcbiAgICAgICAgICAgIC8vICAgICAgIHN0aWxsIGEgY2hhbmNlIHRoZXkgd2lsbCBiZSBtYXRjaGVkIHVwIGxhdGVyXG4gICAgICAgICAgICByZW1vdmVOb2RlKGN1ckZyb21Ob2RlQ2hpbGQsIGZyb21FbCwgdHJ1ZSAvKiBza2lwIGtleWVkIG5vZGVzICovKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjdXJGcm9tTm9kZUNoaWxkID0gZnJvbU5leHRTaWJsaW5nO1xuICAgICAgICB9IC8vIEVORDogd2hpbGUoY3VyRnJvbU5vZGVDaGlsZCkge31cblxuICAgICAgICAvLyBJZiB3ZSBnb3QgdGhpcyBmYXIgdGhlbiB3ZSBkaWQgbm90IGZpbmQgYSBjYW5kaWRhdGUgbWF0Y2ggZm9yXG4gICAgICAgIC8vIG91ciBcInRvIG5vZGVcIiBhbmQgd2UgZXhoYXVzdGVkIGFsbCBvZiB0aGUgY2hpbGRyZW4gXCJmcm9tXCJcbiAgICAgICAgLy8gbm9kZXMuIFRoZXJlZm9yZSwgd2Ugd2lsbCBqdXN0IGFwcGVuZCB0aGUgY3VycmVudCBcInRvXCIgbm9kZVxuICAgICAgICAvLyB0byB0aGUgZW5kXG4gICAgICAgIGlmIChjdXJUb05vZGVLZXkgJiYgKG1hdGNoaW5nRnJvbUVsID0gZnJvbU5vZGVzTG9va3VwW2N1clRvTm9kZUtleV0pICYmIGNvbXBhcmVOb2RlTmFtZXMobWF0Y2hpbmdGcm9tRWwsIGN1clRvTm9kZUNoaWxkKSkge1xuICAgICAgICAgIC8vIE1PUlBIXG4gICAgICAgICAgaWYoIXNraXBGcm9tKXsgYWRkQ2hpbGQoZnJvbUVsLCBtYXRjaGluZ0Zyb21FbCk7IH1cbiAgICAgICAgICBtb3JwaEVsKG1hdGNoaW5nRnJvbUVsLCBjdXJUb05vZGVDaGlsZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIG9uQmVmb3JlTm9kZUFkZGVkUmVzdWx0ID0gb25CZWZvcmVOb2RlQWRkZWQoY3VyVG9Ob2RlQ2hpbGQpO1xuICAgICAgICAgIGlmIChvbkJlZm9yZU5vZGVBZGRlZFJlc3VsdCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlmIChvbkJlZm9yZU5vZGVBZGRlZFJlc3VsdCkge1xuICAgICAgICAgICAgICBjdXJUb05vZGVDaGlsZCA9IG9uQmVmb3JlTm9kZUFkZGVkUmVzdWx0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY3VyVG9Ob2RlQ2hpbGQuYWN0dWFsaXplKSB7XG4gICAgICAgICAgICAgIGN1clRvTm9kZUNoaWxkID0gY3VyVG9Ob2RlQ2hpbGQuYWN0dWFsaXplKGZyb21FbC5vd25lckRvY3VtZW50IHx8IGRvYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhZGRDaGlsZChmcm9tRWwsIGN1clRvTm9kZUNoaWxkKTtcbiAgICAgICAgICAgIGhhbmRsZU5vZGVBZGRlZChjdXJUb05vZGVDaGlsZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY3VyVG9Ob2RlQ2hpbGQgPSB0b05leHRTaWJsaW5nO1xuICAgICAgICBjdXJGcm9tTm9kZUNoaWxkID0gZnJvbU5leHRTaWJsaW5nO1xuICAgICAgfVxuXG4gICAgICBjbGVhbnVwRnJvbUVsKGZyb21FbCwgY3VyRnJvbU5vZGVDaGlsZCwgY3VyRnJvbU5vZGVLZXkpO1xuXG4gICAgICB2YXIgc3BlY2lhbEVsSGFuZGxlciA9IHNwZWNpYWxFbEhhbmRsZXJzW2Zyb21FbC5ub2RlTmFtZV07XG4gICAgICBpZiAoc3BlY2lhbEVsSGFuZGxlcikge1xuICAgICAgICBzcGVjaWFsRWxIYW5kbGVyKGZyb21FbCwgdG9FbCk7XG4gICAgICB9XG4gICAgfSAvLyBFTkQ6IG1vcnBoQ2hpbGRyZW4oLi4uKVxuXG4gICAgdmFyIG1vcnBoZWROb2RlID0gZnJvbU5vZGU7XG4gICAgdmFyIG1vcnBoZWROb2RlVHlwZSA9IG1vcnBoZWROb2RlLm5vZGVUeXBlO1xuICAgIHZhciB0b05vZGVUeXBlID0gdG9Ob2RlLm5vZGVUeXBlO1xuXG4gICAgaWYgKCFjaGlsZHJlbk9ubHkpIHtcbiAgICAgIC8vIEhhbmRsZSB0aGUgY2FzZSB3aGVyZSB3ZSBhcmUgZ2l2ZW4gdHdvIERPTSBub2RlcyB0aGF0IGFyZSBub3RcbiAgICAgIC8vIGNvbXBhdGlibGUgKGUuZy4gPGRpdj4gLS0+IDxzcGFuPiBvciA8ZGl2PiAtLT4gVEVYVClcbiAgICAgIGlmIChtb3JwaGVkTm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSkge1xuICAgICAgICBpZiAodG9Ob2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgaWYgKCFjb21wYXJlTm9kZU5hbWVzKGZyb21Ob2RlLCB0b05vZGUpKSB7XG4gICAgICAgICAgICBvbk5vZGVEaXNjYXJkZWQoZnJvbU5vZGUpO1xuICAgICAgICAgICAgbW9ycGhlZE5vZGUgPSBtb3ZlQ2hpbGRyZW4oZnJvbU5vZGUsIGNyZWF0ZUVsZW1lbnROUyh0b05vZGUubm9kZU5hbWUsIHRvTm9kZS5uYW1lc3BhY2VVUkkpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gR29pbmcgZnJvbSBhbiBlbGVtZW50IG5vZGUgdG8gYSB0ZXh0IG5vZGVcbiAgICAgICAgICBtb3JwaGVkTm9kZSA9IHRvTm9kZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChtb3JwaGVkTm9kZVR5cGUgPT09IFRFWFRfTk9ERSB8fCBtb3JwaGVkTm9kZVR5cGUgPT09IENPTU1FTlRfTk9ERSkgeyAvLyBUZXh0IG9yIGNvbW1lbnQgbm9kZVxuICAgICAgICBpZiAodG9Ob2RlVHlwZSA9PT0gbW9ycGhlZE5vZGVUeXBlKSB7XG4gICAgICAgICAgaWYgKG1vcnBoZWROb2RlLm5vZGVWYWx1ZSAhPT0gdG9Ob2RlLm5vZGVWYWx1ZSkge1xuICAgICAgICAgICAgbW9ycGhlZE5vZGUubm9kZVZhbHVlID0gdG9Ob2RlLm5vZGVWYWx1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gbW9ycGhlZE5vZGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gVGV4dCBub2RlIHRvIHNvbWV0aGluZyBlbHNlXG4gICAgICAgICAgbW9ycGhlZE5vZGUgPSB0b05vZGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobW9ycGhlZE5vZGUgPT09IHRvTm9kZSkge1xuICAgICAgLy8gVGhlIFwidG8gbm9kZVwiIHdhcyBub3QgY29tcGF0aWJsZSB3aXRoIHRoZSBcImZyb20gbm9kZVwiIHNvIHdlIGhhZCB0b1xuICAgICAgLy8gdG9zcyBvdXQgdGhlIFwiZnJvbSBub2RlXCIgYW5kIHVzZSB0aGUgXCJ0byBub2RlXCJcbiAgICAgIG9uTm9kZURpc2NhcmRlZChmcm9tTm9kZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0b05vZGUuaXNTYW1lTm9kZSAmJiB0b05vZGUuaXNTYW1lTm9kZShtb3JwaGVkTm9kZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBtb3JwaEVsKG1vcnBoZWROb2RlLCB0b05vZGUsIGNoaWxkcmVuT25seSk7XG5cbiAgICAgIC8vIFdlIG5vdyBuZWVkIHRvIGxvb3Agb3ZlciBhbnkga2V5ZWQgbm9kZXMgdGhhdCBtaWdodCBuZWVkIHRvIGJlXG4gICAgICAvLyByZW1vdmVkLiBXZSBvbmx5IGRvIHRoZSByZW1vdmFsIGlmIHdlIGtub3cgdGhhdCB0aGUga2V5ZWQgbm9kZVxuICAgICAgLy8gbmV2ZXIgZm91bmQgYSBtYXRjaC4gV2hlbiBhIGtleWVkIG5vZGUgaXMgbWF0Y2hlZCB1cCB3ZSByZW1vdmVcbiAgICAgIC8vIGl0IG91dCBvZiBmcm9tTm9kZXNMb29rdXAgYW5kIHdlIHVzZSBmcm9tTm9kZXNMb29rdXAgdG8gZGV0ZXJtaW5lXG4gICAgICAvLyBpZiBhIGtleWVkIG5vZGUgaGFzIGJlZW4gbWF0Y2hlZCB1cCBvciBub3RcbiAgICAgIGlmIChrZXllZFJlbW92YWxMaXN0KSB7XG4gICAgICAgIGZvciAodmFyIGk9MCwgbGVuPWtleWVkUmVtb3ZhbExpc3QubGVuZ3RoOyBpPGxlbjsgaSsrKSB7XG4gICAgICAgICAgdmFyIGVsVG9SZW1vdmUgPSBmcm9tTm9kZXNMb29rdXBba2V5ZWRSZW1vdmFsTGlzdFtpXV07XG4gICAgICAgICAgaWYgKGVsVG9SZW1vdmUpIHtcbiAgICAgICAgICAgIHJlbW92ZU5vZGUoZWxUb1JlbW92ZSwgZWxUb1JlbW92ZS5wYXJlbnROb2RlLCBmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFjaGlsZHJlbk9ubHkgJiYgbW9ycGhlZE5vZGUgIT09IGZyb21Ob2RlICYmIGZyb21Ob2RlLnBhcmVudE5vZGUpIHtcbiAgICAgIGlmIChtb3JwaGVkTm9kZS5hY3R1YWxpemUpIHtcbiAgICAgICAgbW9ycGhlZE5vZGUgPSBtb3JwaGVkTm9kZS5hY3R1YWxpemUoZnJvbU5vZGUub3duZXJEb2N1bWVudCB8fCBkb2MpO1xuICAgICAgfVxuICAgICAgLy8gSWYgd2UgaGFkIHRvIHN3YXAgb3V0IHRoZSBmcm9tIG5vZGUgd2l0aCBhIG5ldyBub2RlIGJlY2F1c2UgdGhlIG9sZFxuICAgICAgLy8gbm9kZSB3YXMgbm90IGNvbXBhdGlibGUgd2l0aCB0aGUgdGFyZ2V0IG5vZGUgdGhlbiB3ZSBuZWVkIHRvXG4gICAgICAvLyByZXBsYWNlIHRoZSBvbGQgRE9NIG5vZGUgaW4gdGhlIG9yaWdpbmFsIERPTSB0cmVlLiBUaGlzIGlzIG9ubHlcbiAgICAgIC8vIHBvc3NpYmxlIGlmIHRoZSBvcmlnaW5hbCBET00gbm9kZSB3YXMgcGFydCBvZiBhIERPTSB0cmVlIHdoaWNoXG4gICAgICAvLyB3ZSBrbm93IGlzIHRoZSBjYXNlIGlmIGl0IGhhcyBhIHBhcmVudCBub2RlLlxuICAgICAgZnJvbU5vZGUucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQobW9ycGhlZE5vZGUsIGZyb21Ob2RlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbW9ycGhlZE5vZGU7XG4gIH07XG59XG5cbnZhciBtb3JwaGRvbSA9IG1vcnBoZG9tRmFjdG9yeShtb3JwaEF0dHJzKTtcblxuZXhwb3J0IGRlZmF1bHQgbW9ycGhkb207XG4iLCAiaW1wb3J0IHtcbiAgUEhYX0NPTVBPTkVOVCxcbiAgUEhYX0RJU0FCTEVfV0lUSCxcbiAgUEhYX0ZFRURCQUNLX0ZPUixcbiAgUEhYX0ZFRURCQUNLX0dST1VQLFxuICBQSFhfUFJVTkUsXG4gIFBIWF9ST09UX0lELFxuICBQSFhfU0VTU0lPTixcbiAgUEhYX1NLSVAsXG4gIFBIWF9NQUdJQ19JRCxcbiAgUEhYX1NUQVRJQyxcbiAgUEhYX1RSSUdHRVJfQUNUSU9OLFxuICBQSFhfVVBEQVRFLFxuICBQSFhfU1RSRUFNLFxuICBQSFhfU1RSRUFNX1JFRixcbiAgUEhYX1ZJRVdQT1JUX1RPUCxcbiAgUEhYX1ZJRVdQT1JUX0JPVFRPTSxcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuaW1wb3J0IHtcbiAgZGV0ZWN0RHVwbGljYXRlSWRzLFxuICBpc0NpZFxufSBmcm9tIFwiLi91dGlsc1wiXG5cbmltcG9ydCBET00gZnJvbSBcIi4vZG9tXCJcbmltcG9ydCBET01Qb3N0TW9ycGhSZXN0b3JlciBmcm9tIFwiLi9kb21fcG9zdF9tb3JwaF9yZXN0b3JlclwiXG5pbXBvcnQgbW9ycGhkb20gZnJvbSBcIm1vcnBoZG9tXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRE9NUGF0Y2gge1xuICBzdGF0aWMgcGF0Y2hFbChmcm9tRWwsIHRvRWwsIGFjdGl2ZUVsZW1lbnQpe1xuICAgIG1vcnBoZG9tKGZyb21FbCwgdG9FbCwge1xuICAgICAgY2hpbGRyZW5Pbmx5OiBmYWxzZSxcbiAgICAgIG9uQmVmb3JlRWxVcGRhdGVkOiAoZnJvbUVsLCB0b0VsKSA9PiB7XG4gICAgICAgIGlmKGFjdGl2ZUVsZW1lbnQgJiYgYWN0aXZlRWxlbWVudC5pc1NhbWVOb2RlKGZyb21FbCkgJiYgRE9NLmlzRm9ybUlucHV0KGZyb21FbCkpe1xuICAgICAgICAgIERPTS5tZXJnZUZvY3VzZWRJbnB1dChmcm9tRWwsIHRvRWwpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgY29uc3RydWN0b3IodmlldywgY29udGFpbmVyLCBpZCwgaHRtbCwgc3RyZWFtcywgdGFyZ2V0Q0lEKXtcbiAgICB0aGlzLnZpZXcgPSB2aWV3XG4gICAgdGhpcy5saXZlU29ja2V0ID0gdmlldy5saXZlU29ja2V0XG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXJcbiAgICB0aGlzLmlkID0gaWRcbiAgICB0aGlzLnJvb3RJRCA9IHZpZXcucm9vdC5pZFxuICAgIHRoaXMuaHRtbCA9IGh0bWxcbiAgICB0aGlzLnN0cmVhbXMgPSBzdHJlYW1zXG4gICAgdGhpcy5zdHJlYW1JbnNlcnRzID0ge31cbiAgICB0aGlzLnN0cmVhbUNvbXBvbmVudFJlc3RvcmUgPSB7fVxuICAgIHRoaXMudGFyZ2V0Q0lEID0gdGFyZ2V0Q0lEXG4gICAgdGhpcy5jaWRQYXRjaCA9IGlzQ2lkKHRoaXMudGFyZ2V0Q0lEKVxuICAgIHRoaXMucGVuZGluZ1JlbW92ZXMgPSBbXVxuICAgIHRoaXMucGh4UmVtb3ZlID0gdGhpcy5saXZlU29ja2V0LmJpbmRpbmcoXCJyZW1vdmVcIilcbiAgICB0aGlzLmNhbGxiYWNrcyA9IHtcbiAgICAgIGJlZm9yZWFkZGVkOiBbXSwgYmVmb3JldXBkYXRlZDogW10sIGJlZm9yZXBoeENoaWxkQWRkZWQ6IFtdLFxuICAgICAgYWZ0ZXJhZGRlZDogW10sIGFmdGVydXBkYXRlZDogW10sIGFmdGVyZGlzY2FyZGVkOiBbXSwgYWZ0ZXJwaHhDaGlsZEFkZGVkOiBbXSxcbiAgICAgIGFmdGVydHJhbnNpdGlvbnNEaXNjYXJkZWQ6IFtdXG4gICAgfVxuICB9XG5cbiAgYmVmb3JlKGtpbmQsIGNhbGxiYWNrKXsgdGhpcy5jYWxsYmFja3NbYGJlZm9yZSR7a2luZH1gXS5wdXNoKGNhbGxiYWNrKSB9XG4gIGFmdGVyKGtpbmQsIGNhbGxiYWNrKXsgdGhpcy5jYWxsYmFja3NbYGFmdGVyJHtraW5kfWBdLnB1c2goY2FsbGJhY2spIH1cblxuICB0cmFja0JlZm9yZShraW5kLCAuLi5hcmdzKXtcbiAgICB0aGlzLmNhbGxiYWNrc1tgYmVmb3JlJHtraW5kfWBdLmZvckVhY2goY2FsbGJhY2sgPT4gY2FsbGJhY2soLi4uYXJncykpXG4gIH1cblxuICB0cmFja0FmdGVyKGtpbmQsIC4uLmFyZ3Mpe1xuICAgIHRoaXMuY2FsbGJhY2tzW2BhZnRlciR7a2luZH1gXS5mb3JFYWNoKGNhbGxiYWNrID0+IGNhbGxiYWNrKC4uLmFyZ3MpKVxuICB9XG5cbiAgbWFya1BydW5hYmxlQ29udGVudEZvclJlbW92YWwoKXtcbiAgICBsZXQgcGh4VXBkYXRlID0gdGhpcy5saXZlU29ja2V0LmJpbmRpbmcoUEhYX1VQREFURSlcbiAgICBET00uYWxsKHRoaXMuY29udGFpbmVyLCBgWyR7cGh4VXBkYXRlfT1hcHBlbmRdID4gKiwgWyR7cGh4VXBkYXRlfT1wcmVwZW5kXSA+ICpgLCBlbCA9PiB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUoUEhYX1BSVU5FLCBcIlwiKVxuICAgIH0pXG4gIH1cblxuICBwZXJmb3JtKGlzSm9pblBhdGNoKXtcbiAgICBsZXQge3ZpZXcsIGxpdmVTb2NrZXQsIGNvbnRhaW5lciwgaHRtbH0gPSB0aGlzXG4gICAgbGV0IHRhcmdldENvbnRhaW5lciA9IHRoaXMuaXNDSURQYXRjaCgpID8gdGhpcy50YXJnZXRDSURDb250YWluZXIoaHRtbCkgOiBjb250YWluZXJcbiAgICBpZih0aGlzLmlzQ0lEUGF0Y2goKSAmJiAhdGFyZ2V0Q29udGFpbmVyKXsgcmV0dXJuIH1cblxuICAgIGxldCBmb2N1c2VkID0gbGl2ZVNvY2tldC5nZXRBY3RpdmVFbGVtZW50KClcbiAgICBsZXQge3NlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmR9ID0gZm9jdXNlZCAmJiBET00uaGFzU2VsZWN0aW9uUmFuZ2UoZm9jdXNlZCkgPyBmb2N1c2VkIDoge31cbiAgICBsZXQgcGh4VXBkYXRlID0gbGl2ZVNvY2tldC5iaW5kaW5nKFBIWF9VUERBVEUpXG4gICAgbGV0IHBoeEZlZWRiYWNrRm9yID0gbGl2ZVNvY2tldC5iaW5kaW5nKFBIWF9GRUVEQkFDS19GT1IpXG4gICAgbGV0IHBoeEZlZWRiYWNrR3JvdXAgPSBsaXZlU29ja2V0LmJpbmRpbmcoUEhYX0ZFRURCQUNLX0dST1VQKVxuICAgIGxldCBkaXNhYmxlV2l0aCA9IGxpdmVTb2NrZXQuYmluZGluZyhQSFhfRElTQUJMRV9XSVRIKVxuICAgIGxldCBwaHhWaWV3cG9ydFRvcCA9IGxpdmVTb2NrZXQuYmluZGluZyhQSFhfVklFV1BPUlRfVE9QKVxuICAgIGxldCBwaHhWaWV3cG9ydEJvdHRvbSA9IGxpdmVTb2NrZXQuYmluZGluZyhQSFhfVklFV1BPUlRfQk9UVE9NKVxuICAgIGxldCBwaHhUcmlnZ2VyRXh0ZXJuYWwgPSBsaXZlU29ja2V0LmJpbmRpbmcoUEhYX1RSSUdHRVJfQUNUSU9OKVxuICAgIGxldCBhZGRlZCA9IFtdXG4gICAgbGV0IGZlZWRiYWNrQ29udGFpbmVycyA9IFtdXG4gICAgbGV0IHVwZGF0ZXMgPSBbXVxuICAgIGxldCBhcHBlbmRQcmVwZW5kVXBkYXRlcyA9IFtdXG5cbiAgICBsZXQgZXh0ZXJuYWxGb3JtVHJpZ2dlcmVkID0gbnVsbFxuXG4gICAgdGhpcy50cmFja0JlZm9yZShcImFkZGVkXCIsIGNvbnRhaW5lcilcbiAgICB0aGlzLnRyYWNrQmVmb3JlKFwidXBkYXRlZFwiLCBjb250YWluZXIsIGNvbnRhaW5lcilcblxuICAgIGxpdmVTb2NrZXQudGltZShcIm1vcnBoZG9tXCIsICgpID0+IHtcbiAgICAgIHRoaXMuc3RyZWFtcy5mb3JFYWNoKChbcmVmLCBpbnNlcnRzLCBkZWxldGVJZHMsIHJlc2V0XSkgPT4ge1xuICAgICAgICBpbnNlcnRzLmZvckVhY2goKFtrZXksIHN0cmVhbUF0LCBsaW1pdF0pID0+IHtcbiAgICAgICAgICB0aGlzLnN0cmVhbUluc2VydHNba2V5XSA9IHtyZWYsIHN0cmVhbUF0LCBsaW1pdCwgcmVzZXR9XG4gICAgICAgIH0pXG4gICAgICAgIGlmKHJlc2V0ICE9PSB1bmRlZmluZWQpe1xuICAgICAgICAgIERPTS5hbGwoY29udGFpbmVyLCBgWyR7UEhYX1NUUkVBTV9SRUZ9PVwiJHtyZWZ9XCJdYCwgY2hpbGQgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVTdHJlYW1DaGlsZEVsZW1lbnQoY2hpbGQpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBkZWxldGVJZHMuZm9yRWFjaChpZCA9PiB7XG4gICAgICAgICAgbGV0IGNoaWxkID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoYFtpZD1cIiR7aWR9XCJdYClcbiAgICAgICAgICBpZihjaGlsZCl7IHRoaXMucmVtb3ZlU3RyZWFtQ2hpbGRFbGVtZW50KGNoaWxkKSB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuXG4gICAgICAvLyBjbGVhciBzdHJlYW0gaXRlbXMgZnJvbSB0aGUgZGVhZCByZW5kZXIgaWYgdGhleSBhcmUgbm90IGluc2VydGVkIGFnYWluXG4gICAgICBpZihpc0pvaW5QYXRjaCl7XG4gICAgICAgIERPTS5hbGwodGhpcy5jb250YWluZXIsIGBbJHtwaHhVcGRhdGV9PSR7UEhYX1NUUkVBTX1dYCwgZWwgPT4ge1xuICAgICAgICAgIC8vIG1ha2Ugc3VyZSB0byBvbmx5IHJlbW92ZSBlbGVtZW50cyBvd25lZCBieSB0aGUgY3VycmVudCB2aWV3XG4gICAgICAgICAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9waG9lbml4ZnJhbWV3b3JrL3Bob2VuaXhfbGl2ZV92aWV3L2lzc3Vlcy8zMDQ3XG4gICAgICAgICAgdGhpcy5saXZlU29ja2V0Lm93bmVyKGVsLCAodmlldykgPT4ge1xuICAgICAgICAgICAgaWYodmlldyA9PT0gdGhpcy52aWV3KXtcbiAgICAgICAgICAgICAgQXJyYXkuZnJvbShlbC5jaGlsZHJlbikuZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVTdHJlYW1DaGlsZEVsZW1lbnQoY2hpbGQpXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgbW9ycGhkb20odGFyZ2V0Q29udGFpbmVyLCBodG1sLCB7XG4gICAgICAgIGNoaWxkcmVuT25seTogdGFyZ2V0Q29udGFpbmVyLmdldEF0dHJpYnV0ZShQSFhfQ09NUE9ORU5UKSA9PT0gbnVsbCxcbiAgICAgICAgZ2V0Tm9kZUtleTogKG5vZGUpID0+IHtcbiAgICAgICAgICBpZihET00uaXNQaHhEZXN0cm95ZWQobm9kZSkpeyByZXR1cm4gbnVsbCB9XG4gICAgICAgICAgLy8gSWYgd2UgaGF2ZSBhIGpvaW4gcGF0Y2gsIHRoZW4gYnkgZGVmaW5pdGlvbiB0aGVyZSB3YXMgbm8gUEhYX01BR0lDX0lELlxuICAgICAgICAgIC8vIFRoaXMgaXMgaW1wb3J0YW50IHRvIHJlZHVjZSB0aGUgYW1vdW50IG9mIGVsZW1lbnRzIG1vcnBoZG9tIGRpc2NhcmRzLlxuICAgICAgICAgIGlmKGlzSm9pblBhdGNoKXsgcmV0dXJuIG5vZGUuaWQgfVxuICAgICAgICAgIHJldHVybiBub2RlLmlkIHx8IChub2RlLmdldEF0dHJpYnV0ZSAmJiBub2RlLmdldEF0dHJpYnV0ZShQSFhfTUFHSUNfSUQpKVxuICAgICAgICB9LFxuICAgICAgICAvLyBza2lwIGluZGV4aW5nIGZyb20gY2hpbGRyZW4gd2hlbiBjb250YWluZXIgaXMgc3RyZWFtXG4gICAgICAgIHNraXBGcm9tQ2hpbGRyZW46IChmcm9tKSA9PiB7IHJldHVybiBmcm9tLmdldEF0dHJpYnV0ZShwaHhVcGRhdGUpID09PSBQSFhfU1RSRUFNIH0sXG4gICAgICAgIC8vIHRlbGwgbW9ycGhkb20gaG93IHRvIGFkZCBhIGNoaWxkXG4gICAgICAgIGFkZENoaWxkOiAocGFyZW50LCBjaGlsZCkgPT4ge1xuICAgICAgICAgIGxldCB7cmVmLCBzdHJlYW1BdH0gPSB0aGlzLmdldFN0cmVhbUluc2VydChjaGlsZClcbiAgICAgICAgICBpZihyZWYgPT09IHVuZGVmaW5lZCl7IHJldHVybiBwYXJlbnQuYXBwZW5kQ2hpbGQoY2hpbGQpIH1cblxuICAgICAgICAgIHRoaXMuc2V0U3RyZWFtUmVmKGNoaWxkLCByZWYpXG5cbiAgICAgICAgICAvLyB3ZSBtYXkgbmVlZCB0byByZXN0b3JlIHNraXBwZWQgY29tcG9uZW50cywgc2VlIHJlbW92ZVN0cmVhbUNoaWxkRWxlbWVudFxuICAgICAgICAgIGNoaWxkLnF1ZXJ5U2VsZWN0b3JBbGwoYFske1BIWF9NQUdJQ19JRH1dWyR7UEhYX1NLSVB9XWApLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50ID0gdGhpcy5zdHJlYW1Db21wb25lbnRSZXN0b3JlW2VsLmdldEF0dHJpYnV0ZShQSFhfTUFHSUNfSUQpXVxuICAgICAgICAgICAgaWYoY29tcG9uZW50KXtcbiAgICAgICAgICAgICAgZWwucmVwbGFjZVdpdGgoY29tcG9uZW50KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG5cbiAgICAgICAgICAvLyBzdHJlYW1pbmdcbiAgICAgICAgICBpZihzdHJlYW1BdCA9PT0gMCl7XG4gICAgICAgICAgICBwYXJlbnQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYWZ0ZXJiZWdpblwiLCBjaGlsZClcbiAgICAgICAgICB9IGVsc2UgaWYoc3RyZWFtQXQgPT09IC0xKXtcbiAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChjaGlsZClcbiAgICAgICAgICB9IGVsc2UgaWYoc3RyZWFtQXQgPiAwKXtcbiAgICAgICAgICAgIGxldCBzaWJsaW5nID0gQXJyYXkuZnJvbShwYXJlbnQuY2hpbGRyZW4pW3N0cmVhbUF0XVxuICAgICAgICAgICAgcGFyZW50Lmluc2VydEJlZm9yZShjaGlsZCwgc2libGluZylcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9uQmVmb3JlTm9kZUFkZGVkOiAoZWwpID0+IHtcbiAgICAgICAgICBET00ubWF5YmVBZGRQcml2YXRlSG9va3MoZWwsIHBoeFZpZXdwb3J0VG9wLCBwaHhWaWV3cG9ydEJvdHRvbSlcbiAgICAgICAgICBpZihET00uaXNGZWVkYmFja0NvbnRhaW5lcihlbCwgcGh4RmVlZGJhY2tGb3IpKSBmZWVkYmFja0NvbnRhaW5lcnMucHVzaChlbClcbiAgICAgICAgICB0aGlzLnRyYWNrQmVmb3JlKFwiYWRkZWRcIiwgZWwpXG4gICAgICAgICAgcmV0dXJuIGVsXG4gICAgICAgIH0sXG4gICAgICAgIG9uTm9kZUFkZGVkOiAoZWwpID0+IHtcbiAgICAgICAgICBpZihlbC5nZXRBdHRyaWJ1dGUpeyB0aGlzLm1heWJlUmVPcmRlclN0cmVhbShlbCwgdHJ1ZSkgfVxuXG4gICAgICAgICAgLy8gaGFjayB0byBmaXggU2FmYXJpIGhhbmRsaW5nIG9mIGltZyBzcmNzZXQgYW5kIHZpZGVvIHRhZ3NcbiAgICAgICAgICBpZihlbCBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQgJiYgZWwuc3Jjc2V0KXtcbiAgICAgICAgICAgIGVsLnNyY3NldCA9IGVsLnNyY3NldFxuICAgICAgICAgIH0gZWxzZSBpZihlbCBpbnN0YW5jZW9mIEhUTUxWaWRlb0VsZW1lbnQgJiYgZWwuYXV0b3BsYXkpe1xuICAgICAgICAgICAgZWwucGxheSgpXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKERPTS5pc05vd1RyaWdnZXJGb3JtRXh0ZXJuYWwoZWwsIHBoeFRyaWdnZXJFeHRlcm5hbCkpe1xuICAgICAgICAgICAgZXh0ZXJuYWxGb3JtVHJpZ2dlcmVkID0gZWxcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBuZXN0ZWQgdmlldyBoYW5kbGluZ1xuICAgICAgICAgIGlmKChET00uaXNQaHhDaGlsZChlbCkgJiYgdmlldy5vd25zRWxlbWVudChlbCkpIHx8IERPTS5pc1BoeFN0aWNreShlbCkgJiYgdmlldy5vd25zRWxlbWVudChlbC5wYXJlbnROb2RlKSl7XG4gICAgICAgICAgICB0aGlzLnRyYWNrQWZ0ZXIoXCJwaHhDaGlsZEFkZGVkXCIsIGVsKVxuICAgICAgICAgIH1cbiAgICAgICAgICBhZGRlZC5wdXNoKGVsKVxuICAgICAgICB9LFxuICAgICAgICBvbk5vZGVEaXNjYXJkZWQ6IChlbCkgPT4gdGhpcy5vbk5vZGVEaXNjYXJkZWQoZWwpLFxuICAgICAgICBvbkJlZm9yZU5vZGVEaXNjYXJkZWQ6IChlbCkgPT4ge1xuICAgICAgICAgIGlmKGVsLmdldEF0dHJpYnV0ZSAmJiBlbC5nZXRBdHRyaWJ1dGUoUEhYX1BSVU5FKSAhPT0gbnVsbCl7IHJldHVybiB0cnVlIH1cbiAgICAgICAgICBpZihlbC5wYXJlbnRFbGVtZW50ICE9PSBudWxsICYmIGVsLmlkICYmXG4gICAgICAgICAgICBET00uaXNQaHhVcGRhdGUoZWwucGFyZW50RWxlbWVudCwgcGh4VXBkYXRlLCBbUEhYX1NUUkVBTSwgXCJhcHBlbmRcIiwgXCJwcmVwZW5kXCJdKSl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYodGhpcy5tYXliZVBlbmRpbmdSZW1vdmUoZWwpKXsgcmV0dXJuIGZhbHNlIH1cbiAgICAgICAgICBpZih0aGlzLnNraXBDSURTaWJsaW5nKGVsKSl7IHJldHVybiBmYWxzZSB9XG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBvbkVsVXBkYXRlZDogKGVsKSA9PiB7XG4gICAgICAgICAgaWYoRE9NLmlzTm93VHJpZ2dlckZvcm1FeHRlcm5hbChlbCwgcGh4VHJpZ2dlckV4dGVybmFsKSl7XG4gICAgICAgICAgICBleHRlcm5hbEZvcm1UcmlnZ2VyZWQgPSBlbFxuICAgICAgICAgIH1cbiAgICAgICAgICB1cGRhdGVzLnB1c2goZWwpXG4gICAgICAgICAgdGhpcy5tYXliZVJlT3JkZXJTdHJlYW0oZWwsIGZhbHNlKVxuICAgICAgICB9LFxuICAgICAgICBvbkJlZm9yZUVsVXBkYXRlZDogKGZyb21FbCwgdG9FbCkgPT4ge1xuICAgICAgICAgIERPTS5tYXliZUFkZFByaXZhdGVIb29rcyh0b0VsLCBwaHhWaWV3cG9ydFRvcCwgcGh4Vmlld3BvcnRCb3R0b20pXG4gICAgICAgICAgLy8gbWFyayBib3RoIGZyb20gYW5kIHRvIGVscyBhcyBmZWVkYmFjayBjb250YWluZXJzLCBhcyB3ZSBkb24ndCBrbm93IHlldCB3aGljaCBvbmUgd2lsbCBiZSB1c2VkXG4gICAgICAgICAgLy8gYW5kIHdlIGFsc28gbmVlZCB0byByZW1vdmUgdGhlIHBoeC1uby1mZWVkYmFjayBjbGFzcyB3aGVuIHRoZSBwaHgtZmVlZGJhY2stZm9yIGF0dHJpYnV0ZSBpcyByZW1vdmVkXG4gICAgICAgICAgaWYoRE9NLmlzRmVlZGJhY2tDb250YWluZXIoZnJvbUVsLCBwaHhGZWVkYmFja0ZvcikgfHwgRE9NLmlzRmVlZGJhY2tDb250YWluZXIodG9FbCwgcGh4RmVlZGJhY2tGb3IpKXtcbiAgICAgICAgICAgIGZlZWRiYWNrQ29udGFpbmVycy5wdXNoKGZyb21FbClcbiAgICAgICAgICAgIGZlZWRiYWNrQ29udGFpbmVycy5wdXNoKHRvRWwpXG4gICAgICAgICAgfVxuICAgICAgICAgIERPTS5jbGVhbkNoaWxkTm9kZXModG9FbCwgcGh4VXBkYXRlKVxuICAgICAgICAgIGlmKHRoaXMuc2tpcENJRFNpYmxpbmcodG9FbCkpe1xuICAgICAgICAgICAgLy8gaWYgdGhpcyBpcyBhIGxpdmUgY29tcG9uZW50IHVzZWQgaW4gYSBzdHJlYW0sIHdlIG1heSBuZWVkIHRvIHJlb3JkZXIgaXRcbiAgICAgICAgICAgIHRoaXMubWF5YmVSZU9yZGVyU3RyZWFtKGZyb21FbClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZihET00uaXNQaHhTdGlja3koZnJvbUVsKSl7IHJldHVybiBmYWxzZSB9XG4gICAgICAgICAgaWYoRE9NLmlzSWdub3JlZChmcm9tRWwsIHBoeFVwZGF0ZSkgfHwgKGZyb21FbC5mb3JtICYmIGZyb21FbC5mb3JtLmlzU2FtZU5vZGUoZXh0ZXJuYWxGb3JtVHJpZ2dlcmVkKSkpe1xuICAgICAgICAgICAgdGhpcy50cmFja0JlZm9yZShcInVwZGF0ZWRcIiwgZnJvbUVsLCB0b0VsKVxuICAgICAgICAgICAgRE9NLm1lcmdlQXR0cnMoZnJvbUVsLCB0b0VsLCB7aXNJZ25vcmVkOiB0cnVlfSlcbiAgICAgICAgICAgIHVwZGF0ZXMucHVzaChmcm9tRWwpXG4gICAgICAgICAgICBET00uYXBwbHlTdGlja3lPcGVyYXRpb25zKGZyb21FbClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZihmcm9tRWwudHlwZSA9PT0gXCJudW1iZXJcIiAmJiAoZnJvbUVsLnZhbGlkaXR5ICYmIGZyb21FbC52YWxpZGl0eS5iYWRJbnB1dCkpeyByZXR1cm4gZmFsc2UgfVxuICAgICAgICAgIGlmKCFET00uc3luY1BlbmRpbmdSZWYoZnJvbUVsLCB0b0VsLCBkaXNhYmxlV2l0aCkpe1xuICAgICAgICAgICAgaWYoRE9NLmlzVXBsb2FkSW5wdXQoZnJvbUVsKSl7XG4gICAgICAgICAgICAgIHRoaXMudHJhY2tCZWZvcmUoXCJ1cGRhdGVkXCIsIGZyb21FbCwgdG9FbClcbiAgICAgICAgICAgICAgdXBkYXRlcy5wdXNoKGZyb21FbClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIERPTS5hcHBseVN0aWNreU9wZXJhdGlvbnMoZnJvbUVsKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gbmVzdGVkIHZpZXcgaGFuZGxpbmdcbiAgICAgICAgICBpZihET00uaXNQaHhDaGlsZCh0b0VsKSl7XG4gICAgICAgICAgICBsZXQgcHJldlNlc3Npb24gPSBmcm9tRWwuZ2V0QXR0cmlidXRlKFBIWF9TRVNTSU9OKVxuICAgICAgICAgICAgRE9NLm1lcmdlQXR0cnMoZnJvbUVsLCB0b0VsLCB7ZXhjbHVkZTogW1BIWF9TVEFUSUNdfSlcbiAgICAgICAgICAgIGlmKHByZXZTZXNzaW9uICE9PSBcIlwiKXsgZnJvbUVsLnNldEF0dHJpYnV0ZShQSFhfU0VTU0lPTiwgcHJldlNlc3Npb24pIH1cbiAgICAgICAgICAgIGZyb21FbC5zZXRBdHRyaWJ1dGUoUEhYX1JPT1RfSUQsIHRoaXMucm9vdElEKVxuICAgICAgICAgICAgRE9NLmFwcGx5U3RpY2t5T3BlcmF0aW9ucyhmcm9tRWwpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBpbnB1dCBoYW5kbGluZ1xuICAgICAgICAgIERPTS5jb3B5UHJpdmF0ZXModG9FbCwgZnJvbUVsKVxuXG4gICAgICAgICAgbGV0IGlzRm9jdXNlZEZvcm1FbCA9IGZvY3VzZWQgJiYgZnJvbUVsLmlzU2FtZU5vZGUoZm9jdXNlZCkgJiYgRE9NLmlzRm9ybUlucHV0KGZyb21FbClcbiAgICAgICAgICAvLyBza2lwIHBhdGNoaW5nIGZvY3VzZWQgaW5wdXRzIHVubGVzcyBmb2N1cyBpcyBhIHNlbGVjdCB0aGF0IGhhcyBjaGFuZ2VkIG9wdGlvbnNcbiAgICAgICAgICBsZXQgZm9jdXNlZFNlbGVjdENoYW5nZWQgPSBpc0ZvY3VzZWRGb3JtRWwgJiYgdGhpcy5pc0NoYW5nZWRTZWxlY3QoZnJvbUVsLCB0b0VsKVxuICAgICAgICAgIGlmKGlzRm9jdXNlZEZvcm1FbCAmJiBmcm9tRWwudHlwZSAhPT0gXCJoaWRkZW5cIiAmJiAhZm9jdXNlZFNlbGVjdENoYW5nZWQpe1xuICAgICAgICAgICAgdGhpcy50cmFja0JlZm9yZShcInVwZGF0ZWRcIiwgZnJvbUVsLCB0b0VsKVxuICAgICAgICAgICAgRE9NLm1lcmdlRm9jdXNlZElucHV0KGZyb21FbCwgdG9FbClcbiAgICAgICAgICAgIERPTS5zeW5jQXR0cnNUb1Byb3BzKGZyb21FbClcbiAgICAgICAgICAgIHVwZGF0ZXMucHVzaChmcm9tRWwpXG4gICAgICAgICAgICBET00uYXBwbHlTdGlja3lPcGVyYXRpb25zKGZyb21FbClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBibHVyIGZvY3VzZWQgc2VsZWN0IGlmIGl0IGNoYW5nZWQgc28gbmF0aXZlIFVJIGlzIHVwZGF0ZWQgKGllIHNhZmFyaSB3b24ndCB1cGRhdGUgdmlzaWJsZSBvcHRpb25zKVxuICAgICAgICAgICAgaWYoZm9jdXNlZFNlbGVjdENoYW5nZWQpeyBmcm9tRWwuYmx1cigpIH1cbiAgICAgICAgICAgIGlmKERPTS5pc1BoeFVwZGF0ZSh0b0VsLCBwaHhVcGRhdGUsIFtcImFwcGVuZFwiLCBcInByZXBlbmRcIl0pKXtcbiAgICAgICAgICAgICAgYXBwZW5kUHJlcGVuZFVwZGF0ZXMucHVzaChuZXcgRE9NUG9zdE1vcnBoUmVzdG9yZXIoZnJvbUVsLCB0b0VsLCB0b0VsLmdldEF0dHJpYnV0ZShwaHhVcGRhdGUpKSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgRE9NLnN5bmNBdHRyc1RvUHJvcHModG9FbClcbiAgICAgICAgICAgIERPTS5hcHBseVN0aWNreU9wZXJhdGlvbnModG9FbClcbiAgICAgICAgICAgIHRoaXMudHJhY2tCZWZvcmUoXCJ1cGRhdGVkXCIsIGZyb21FbCwgdG9FbClcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG5cbiAgICBpZihsaXZlU29ja2V0LmlzRGVidWdFbmFibGVkKCkpeyBkZXRlY3REdXBsaWNhdGVJZHMoKSB9XG5cbiAgICBpZihhcHBlbmRQcmVwZW5kVXBkYXRlcy5sZW5ndGggPiAwKXtcbiAgICAgIGxpdmVTb2NrZXQudGltZShcInBvc3QtbW9ycGggYXBwZW5kL3ByZXBlbmQgcmVzdG9yYXRpb25cIiwgKCkgPT4ge1xuICAgICAgICBhcHBlbmRQcmVwZW5kVXBkYXRlcy5mb3JFYWNoKHVwZGF0ZSA9PiB1cGRhdGUucGVyZm9ybSgpKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBET00ubWF5YmVIaWRlRmVlZGJhY2sodGFyZ2V0Q29udGFpbmVyLCBmZWVkYmFja0NvbnRhaW5lcnMsIHBoeEZlZWRiYWNrRm9yLCBwaHhGZWVkYmFja0dyb3VwKVxuXG4gICAgbGl2ZVNvY2tldC5zaWxlbmNlRXZlbnRzKCgpID0+IERPTS5yZXN0b3JlRm9jdXMoZm9jdXNlZCwgc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCkpXG4gICAgRE9NLmRpc3BhdGNoRXZlbnQoZG9jdW1lbnQsIFwicGh4OnVwZGF0ZVwiKVxuICAgIGFkZGVkLmZvckVhY2goZWwgPT4gdGhpcy50cmFja0FmdGVyKFwiYWRkZWRcIiwgZWwpKVxuICAgIHVwZGF0ZXMuZm9yRWFjaChlbCA9PiB0aGlzLnRyYWNrQWZ0ZXIoXCJ1cGRhdGVkXCIsIGVsKSlcblxuICAgIHRoaXMudHJhbnNpdGlvblBlbmRpbmdSZW1vdmVzKClcblxuICAgIGlmKGV4dGVybmFsRm9ybVRyaWdnZXJlZCl7XG4gICAgICBsaXZlU29ja2V0LnVubG9hZCgpXG4gICAgICAvLyB1c2UgcHJvdG90eXBlJ3Mgc3VibWl0IGluIGNhc2UgdGhlcmUncyBhIGZvcm0gY29udHJvbCB3aXRoIG5hbWUgb3IgaWQgb2YgXCJzdWJtaXRcIlxuICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0hUTUxGb3JtRWxlbWVudC9zdWJtaXRcbiAgICAgIE9iamVjdC5nZXRQcm90b3R5cGVPZihleHRlcm5hbEZvcm1UcmlnZ2VyZWQpLnN1Ym1pdC5jYWxsKGV4dGVybmFsRm9ybVRyaWdnZXJlZClcbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIG9uTm9kZURpc2NhcmRlZChlbCl7XG4gICAgLy8gbmVzdGVkIHZpZXcgaGFuZGxpbmdcbiAgICBpZihET00uaXNQaHhDaGlsZChlbCkgfHwgRE9NLmlzUGh4U3RpY2t5KGVsKSl7IHRoaXMubGl2ZVNvY2tldC5kZXN0cm95Vmlld0J5RWwoZWwpIH1cbiAgICB0aGlzLnRyYWNrQWZ0ZXIoXCJkaXNjYXJkZWRcIiwgZWwpXG4gIH1cblxuICBtYXliZVBlbmRpbmdSZW1vdmUobm9kZSl7XG4gICAgaWYobm9kZS5nZXRBdHRyaWJ1dGUgJiYgbm9kZS5nZXRBdHRyaWJ1dGUodGhpcy5waHhSZW1vdmUpICE9PSBudWxsKXtcbiAgICAgIHRoaXMucGVuZGluZ1JlbW92ZXMucHVzaChub2RlKVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlU3RyZWFtQ2hpbGRFbGVtZW50KGNoaWxkKXtcbiAgICBpZighdGhpcy5tYXliZVBlbmRpbmdSZW1vdmUoY2hpbGQpKXtcbiAgICAgIGlmKHRoaXMuc3RyZWFtSW5zZXJ0c1tjaGlsZC5pZF0pe1xuICAgICAgICAvLyB3ZSBuZWVkIHRvIHN0b3JlIGNoaWxkcmVuIHNvIHdlIGNhbiByZXN0b3JlIHRoZW0gbGF0ZXJcbiAgICAgICAgLy8gaW4gY2FzZSB0aGV5IGFyZSBza2lwcGVkXG4gICAgICAgIGNoaWxkLnF1ZXJ5U2VsZWN0b3JBbGwoYFske1BIWF9NQUdJQ19JRH1dYCkuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgICAgdGhpcy5zdHJlYW1Db21wb25lbnRSZXN0b3JlW2VsLmdldEF0dHJpYnV0ZShQSFhfTUFHSUNfSUQpXSA9IGVsXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICBjaGlsZC5yZW1vdmUoKVxuICAgICAgdGhpcy5vbk5vZGVEaXNjYXJkZWQoY2hpbGQpXG4gICAgfVxuICB9XG5cbiAgZ2V0U3RyZWFtSW5zZXJ0KGVsKXtcbiAgICBsZXQgaW5zZXJ0ID0gZWwuaWQgPyB0aGlzLnN0cmVhbUluc2VydHNbZWwuaWRdIDoge31cbiAgICByZXR1cm4gaW5zZXJ0IHx8IHt9XG4gIH1cblxuICBzZXRTdHJlYW1SZWYoZWwsIHJlZil7XG4gICAgRE9NLnB1dFN0aWNreShlbCwgUEhYX1NUUkVBTV9SRUYsIGVsID0+IGVsLnNldEF0dHJpYnV0ZShQSFhfU1RSRUFNX1JFRiwgcmVmKSlcbiAgfVxuXG4gIG1heWJlUmVPcmRlclN0cmVhbShlbCwgaXNOZXcpe1xuICAgIGxldCB7cmVmLCBzdHJlYW1BdCwgcmVzZXR9ID0gdGhpcy5nZXRTdHJlYW1JbnNlcnQoZWwpXG4gICAgaWYoc3RyZWFtQXQgPT09IHVuZGVmaW5lZCl7IHJldHVybiB9XG5cbiAgICAvLyB3ZSBuZWVkIHRvIHNldCB0aGUgUEhYX1NUUkVBTV9SRUYgaGVyZSBhcyB3ZWxsIGFzIGFkZENoaWxkIGlzIGludm9rZWQgb25seSBmb3IgcGFyZW50c1xuICAgIHRoaXMuc2V0U3RyZWFtUmVmKGVsLCByZWYpXG5cbiAgICBpZighcmVzZXQgJiYgIWlzTmV3KXtcbiAgICAgIC8vIHdlIG9ubHkgcmVvcmRlciBpZiB0aGUgZWxlbWVudCBpcyBuZXcgb3IgaXQncyBhIHN0cmVhbSByZXNldFxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYoc3RyZWFtQXQgPT09IDApe1xuICAgICAgZWwucGFyZW50RWxlbWVudC5pbnNlcnRCZWZvcmUoZWwsIGVsLnBhcmVudEVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQpXG4gICAgfSBlbHNlIGlmKHN0cmVhbUF0ID4gMCl7XG4gICAgICBsZXQgY2hpbGRyZW4gPSBBcnJheS5mcm9tKGVsLnBhcmVudEVsZW1lbnQuY2hpbGRyZW4pXG4gICAgICBsZXQgb2xkSW5kZXggPSBjaGlsZHJlbi5pbmRleE9mKGVsKVxuICAgICAgaWYoc3RyZWFtQXQgPj0gY2hpbGRyZW4ubGVuZ3RoIC0gMSl7XG4gICAgICAgIGVsLnBhcmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoZWwpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgc2libGluZyA9IGNoaWxkcmVuW3N0cmVhbUF0XVxuICAgICAgICBpZihvbGRJbmRleCA+IHN0cmVhbUF0KXtcbiAgICAgICAgICBlbC5wYXJlbnRFbGVtZW50Lmluc2VydEJlZm9yZShlbCwgc2libGluZylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbC5wYXJlbnRFbGVtZW50Lmluc2VydEJlZm9yZShlbCwgc2libGluZy5uZXh0RWxlbWVudFNpYmxpbmcpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLm1heWJlTGltaXRTdHJlYW0oZWwpXG4gIH1cblxuICBtYXliZUxpbWl0U3RyZWFtKGVsKXtcbiAgICBsZXQge2xpbWl0fSA9IHRoaXMuZ2V0U3RyZWFtSW5zZXJ0KGVsKVxuICAgIGxldCBjaGlsZHJlbiA9IGxpbWl0ICE9PSBudWxsICYmIEFycmF5LmZyb20oZWwucGFyZW50RWxlbWVudC5jaGlsZHJlbilcbiAgICBpZihsaW1pdCAmJiBsaW1pdCA8IDAgJiYgY2hpbGRyZW4ubGVuZ3RoID4gbGltaXQgKiAtMSl7XG4gICAgICBjaGlsZHJlbi5zbGljZSgwLCBjaGlsZHJlbi5sZW5ndGggKyBsaW1pdCkuZm9yRWFjaChjaGlsZCA9PiB0aGlzLnJlbW92ZVN0cmVhbUNoaWxkRWxlbWVudChjaGlsZCkpXG4gICAgfSBlbHNlIGlmKGxpbWl0ICYmIGxpbWl0ID49IDAgJiYgY2hpbGRyZW4ubGVuZ3RoID4gbGltaXQpe1xuICAgICAgY2hpbGRyZW4uc2xpY2UobGltaXQpLmZvckVhY2goY2hpbGQgPT4gdGhpcy5yZW1vdmVTdHJlYW1DaGlsZEVsZW1lbnQoY2hpbGQpKVxuICAgIH1cbiAgfVxuXG4gIHRyYW5zaXRpb25QZW5kaW5nUmVtb3Zlcygpe1xuICAgIGxldCB7cGVuZGluZ1JlbW92ZXMsIGxpdmVTb2NrZXR9ID0gdGhpc1xuICAgIGlmKHBlbmRpbmdSZW1vdmVzLmxlbmd0aCA+IDApe1xuICAgICAgbGl2ZVNvY2tldC50cmFuc2l0aW9uUmVtb3ZlcyhwZW5kaW5nUmVtb3ZlcylcbiAgICAgIGxpdmVTb2NrZXQucmVxdWVzdERPTVVwZGF0ZSgoKSA9PiB7XG4gICAgICAgIHBlbmRpbmdSZW1vdmVzLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgIGxldCBjaGlsZCA9IERPTS5maXJzdFBoeENoaWxkKGVsKVxuICAgICAgICAgIGlmKGNoaWxkKXsgbGl2ZVNvY2tldC5kZXN0cm95Vmlld0J5RWwoY2hpbGQpIH1cbiAgICAgICAgICBlbC5yZW1vdmUoKVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLnRyYWNrQWZ0ZXIoXCJ0cmFuc2l0aW9uc0Rpc2NhcmRlZFwiLCBwZW5kaW5nUmVtb3ZlcylcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgaXNDaGFuZ2VkU2VsZWN0KGZyb21FbCwgdG9FbCl7XG4gICAgaWYoIShmcm9tRWwgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCkgfHwgZnJvbUVsLm11bHRpcGxlKXsgcmV0dXJuIGZhbHNlIH1cbiAgICBpZihmcm9tRWwub3B0aW9ucy5sZW5ndGggIT09IHRvRWwub3B0aW9ucy5sZW5ndGgpeyByZXR1cm4gdHJ1ZSB9XG5cbiAgICBsZXQgZnJvbVNlbGVjdGVkID0gZnJvbUVsLnNlbGVjdGVkT3B0aW9uc1swXVxuICAgIGxldCB0b1NlbGVjdGVkID0gdG9FbC5zZWxlY3RlZE9wdGlvbnNbMF1cbiAgICBpZihmcm9tU2VsZWN0ZWQgJiYgZnJvbVNlbGVjdGVkLmhhc0F0dHJpYnV0ZShcInNlbGVjdGVkXCIpKXtcbiAgICAgIHRvU2VsZWN0ZWQuc2V0QXR0cmlidXRlKFwic2VsZWN0ZWRcIiwgZnJvbVNlbGVjdGVkLmdldEF0dHJpYnV0ZShcInNlbGVjdGVkXCIpKVxuICAgIH1cblxuICAgIC8vIGluIGdlbmVyYWwgd2UgaGF2ZSB0byBiZSB2ZXJ5IGNhcmVmdWwgd2l0aCB1c2luZyBpc0VxdWFsTm9kZSBhcyBpdCBkb2VzIG5vdCBhIHJlbGlhYmxlXG4gICAgLy8gRE9NIHRyZWUgZXF1YWxpdHkgY2hlY2ssIGJ1dCBmb3Igc2VsZWN0aW9uIGF0dHJpYnV0ZXMgYW5kIG9wdGlvbnMgaXQgd29ya3MgZmluZVxuICAgIHJldHVybiAhZnJvbUVsLmlzRXF1YWxOb2RlKHRvRWwpXG4gIH1cblxuICBpc0NJRFBhdGNoKCl7IHJldHVybiB0aGlzLmNpZFBhdGNoIH1cblxuICBza2lwQ0lEU2libGluZyhlbCl7XG4gICAgcmV0dXJuIGVsLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSAmJiBlbC5oYXNBdHRyaWJ1dGUoUEhYX1NLSVApXG4gIH1cblxuICB0YXJnZXRDSURDb250YWluZXIoaHRtbCl7XG4gICAgaWYoIXRoaXMuaXNDSURQYXRjaCgpKXsgcmV0dXJuIH1cbiAgICBsZXQgW2ZpcnN0LCAuLi5yZXN0XSA9IERPTS5maW5kQ29tcG9uZW50Tm9kZUxpc3QodGhpcy5jb250YWluZXIsIHRoaXMudGFyZ2V0Q0lEKVxuICAgIGlmKHJlc3QubGVuZ3RoID09PSAwICYmIERPTS5jaGlsZE5vZGVMZW5ndGgoaHRtbCkgPT09IDEpe1xuICAgICAgcmV0dXJuIGZpcnN0XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmaXJzdCAmJiBmaXJzdC5wYXJlbnROb2RlXG4gICAgfVxuICB9XG5cbiAgaW5kZXhPZihwYXJlbnQsIGNoaWxkKXsgcmV0dXJuIEFycmF5LmZyb20ocGFyZW50LmNoaWxkcmVuKS5pbmRleE9mKGNoaWxkKSB9XG59XG4iLCAiaW1wb3J0IHtcbiAgQ09NUE9ORU5UUyxcbiAgRFlOQU1JQ1MsXG4gIFRFTVBMQVRFUyxcbiAgRVZFTlRTLFxuICBQSFhfQ09NUE9ORU5ULFxuICBQSFhfU0tJUCxcbiAgUEhYX01BR0lDX0lELFxuICBSRVBMWSxcbiAgU1RBVElDLFxuICBUSVRMRSxcbiAgU1RSRUFNLFxuICBST09ULFxufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQge1xuICBpc09iamVjdCxcbiAgbG9nRXJyb3IsXG4gIGlzQ2lkLFxufSBmcm9tIFwiLi91dGlsc1wiXG5cbmNvbnN0IFZPSURfVEFHUyA9IG5ldyBTZXQoW1xuICBcImFyZWFcIixcbiAgXCJiYXNlXCIsXG4gIFwiYnJcIixcbiAgXCJjb2xcIixcbiAgXCJjb21tYW5kXCIsXG4gIFwiZW1iZWRcIixcbiAgXCJoclwiLFxuICBcImltZ1wiLFxuICBcImlucHV0XCIsXG4gIFwia2V5Z2VuXCIsXG4gIFwibGlua1wiLFxuICBcIm1ldGFcIixcbiAgXCJwYXJhbVwiLFxuICBcInNvdXJjZVwiLFxuICBcInRyYWNrXCIsXG4gIFwid2JyXCJcbl0pXG5jb25zdCBxdW90ZUNoYXJzID0gbmV3IFNldChbXCInXCIsICdcIiddKVxuXG5leHBvcnQgbGV0IG1vZGlmeVJvb3QgPSAoaHRtbCwgYXR0cnMsIGNsZWFySW5uZXJIVE1MKSA9PiB7XG4gIGxldCBpID0gMFxuICBsZXQgaW5zaWRlQ29tbWVudCA9IGZhbHNlXG4gIGxldCBiZWZvcmVUYWcsIGFmdGVyVGFnLCB0YWcsIHRhZ05hbWVFbmRzQXQsIGlkLCBuZXdIVE1MXG5cbiAgbGV0IGxvb2thaGVhZCA9IGh0bWwubWF0Y2goL14oXFxzKig/OjwhLS0uKj8tLT5cXHMqKSopPChbXlxcc1xcLz5dKykvKVxuICBpZihsb29rYWhlYWQgPT09IG51bGwpIHsgdGhyb3cgbmV3IEVycm9yKGBtYWxmb3JtZWQgaHRtbCAke2h0bWx9YCkgfVxuXG4gIGkgPSBsb29rYWhlYWRbMF0ubGVuZ3RoXG4gIGJlZm9yZVRhZyA9IGxvb2thaGVhZFsxXVxuICB0YWcgPSBsb29rYWhlYWRbMl1cbiAgdGFnTmFtZUVuZHNBdCA9IGlcblxuICAvLyBTY2FuIHRoZSBvcGVuaW5nIHRhZyBmb3IgaWQsIGlmIHRoZXJlIGlzIGFueVxuICBmb3IoaTsgaSA8IGh0bWwubGVuZ3RoOyBpKyspe1xuICAgIGlmKGh0bWwuY2hhckF0KGkpID09PSBcIj5cIiApeyBicmVhayB9XG4gICAgaWYoaHRtbC5jaGFyQXQoaSkgPT09IFwiPVwiKXtcbiAgICAgIGxldCBpc0lkID0gaHRtbC5zbGljZShpIC0gMywgaSkgPT09IFwiIGlkXCJcbiAgICAgIGkrKztcbiAgICAgIGxldCBjaGFyID0gaHRtbC5jaGFyQXQoaSlcbiAgICAgIGlmIChxdW90ZUNoYXJzLmhhcyhjaGFyKSkge1xuICAgICAgICBsZXQgYXR0clN0YXJ0c0F0ID0gaVxuICAgICAgICBpKytcbiAgICAgICAgZm9yKGk7IGkgPCBodG1sLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICBpZihodG1sLmNoYXJBdChpKSA9PT0gY2hhcil7IGJyZWFrIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNJZCkge1xuICAgICAgICAgIGlkID0gaHRtbC5zbGljZShhdHRyU3RhcnRzQXQgKyAxLCBpKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBsZXQgY2xvc2VBdCA9IGh0bWwubGVuZ3RoIC0gMVxuICBpbnNpZGVDb21tZW50ID0gZmFsc2VcbiAgd2hpbGUoY2xvc2VBdCA+PSBiZWZvcmVUYWcubGVuZ3RoICsgdGFnLmxlbmd0aCl7XG4gICAgbGV0IGNoYXIgPSBodG1sLmNoYXJBdChjbG9zZUF0KVxuICAgIGlmKGluc2lkZUNvbW1lbnQpe1xuICAgICAgaWYoY2hhciA9PT0gXCItXCIgJiYgaHRtbC5zbGljZShjbG9zZUF0IC0gMywgY2xvc2VBdCkgPT09IFwiPCEtXCIpe1xuICAgICAgICBpbnNpZGVDb21tZW50ID0gZmFsc2VcbiAgICAgICAgY2xvc2VBdCAtPSA0XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjbG9zZUF0IC09IDFcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYoY2hhciA9PT0gXCI+XCIgJiYgaHRtbC5zbGljZShjbG9zZUF0IC0gMiwgY2xvc2VBdCkgPT09IFwiLS1cIil7XG4gICAgICBpbnNpZGVDb21tZW50ID0gdHJ1ZVxuICAgICAgY2xvc2VBdCAtPSAzXG4gICAgfSBlbHNlIGlmKGNoYXIgPT09IFwiPlwiKXtcbiAgICAgIGJyZWFrXG4gICAgfSBlbHNlIHtcbiAgICAgIGNsb3NlQXQgLT0gMVxuICAgIH1cbiAgfVxuICBhZnRlclRhZyA9IGh0bWwuc2xpY2UoY2xvc2VBdCArIDEsIGh0bWwubGVuZ3RoKVxuXG4gIGxldCBhdHRyc1N0ciA9XG4gICAgT2JqZWN0LmtleXMoYXR0cnMpXG4gICAgLm1hcChhdHRyID0+IGF0dHJzW2F0dHJdID09PSB0cnVlID8gYXR0ciA6IGAke2F0dHJ9PVwiJHthdHRyc1thdHRyXX1cImApXG4gICAgLmpvaW4oXCIgXCIpXG5cbiAgaWYoY2xlYXJJbm5lckhUTUwpe1xuICAgIC8vIEtlZXAgdGhlIGlkIGlmIGFueVxuICAgIGxldCBpZEF0dHJTdHIgPSBpZCA/IGAgaWQ9XCIke2lkfVwiYCA6IFwiXCI7XG4gICAgaWYoVk9JRF9UQUdTLmhhcyh0YWcpKXtcbiAgICAgIG5ld0hUTUwgPSBgPCR7dGFnfSR7aWRBdHRyU3RyfSR7YXR0cnNTdHIgPT09IFwiXCIgPyBcIlwiIDogXCIgXCJ9JHthdHRyc1N0cn0vPmBcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3SFRNTCA9IGA8JHt0YWd9JHtpZEF0dHJTdHJ9JHthdHRyc1N0ciA9PT0gXCJcIiA/IFwiXCIgOiBcIiBcIn0ke2F0dHJzU3RyfT48LyR7dGFnfT5gXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGxldCByZXN0ID0gaHRtbC5zbGljZSh0YWdOYW1lRW5kc0F0LCBjbG9zZUF0ICsgMSlcbiAgICBuZXdIVE1MID0gYDwke3RhZ30ke2F0dHJzU3RyID09PSBcIlwiID8gXCJcIiA6IFwiIFwifSR7YXR0cnNTdHJ9JHtyZXN0fWBcbiAgfVxuXG4gIHJldHVybiBbbmV3SFRNTCwgYmVmb3JlVGFnLCBhZnRlclRhZ11cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVuZGVyZWQge1xuICBzdGF0aWMgZXh0cmFjdChkaWZmKXtcbiAgICBsZXQge1tSRVBMWV06IHJlcGx5LCBbRVZFTlRTXTogZXZlbnRzLCBbVElUTEVdOiB0aXRsZX0gPSBkaWZmXG4gICAgZGVsZXRlIGRpZmZbUkVQTFldXG4gICAgZGVsZXRlIGRpZmZbRVZFTlRTXVxuICAgIGRlbGV0ZSBkaWZmW1RJVExFXVxuICAgIHJldHVybiB7ZGlmZiwgdGl0bGUsIHJlcGx5OiByZXBseSB8fCBudWxsLCBldmVudHM6IGV2ZW50cyB8fCBbXX1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHZpZXdJZCwgcmVuZGVyZWQpe1xuICAgIHRoaXMudmlld0lkID0gdmlld0lkXG4gICAgdGhpcy5yZW5kZXJlZCA9IHt9XG4gICAgdGhpcy5tYWdpY0lkID0gMFxuICAgIHRoaXMubWVyZ2VEaWZmKHJlbmRlcmVkKVxuICB9XG5cbiAgcGFyZW50Vmlld0lkKCl7IHJldHVybiB0aGlzLnZpZXdJZCB9XG5cbiAgdG9TdHJpbmcob25seUNpZHMpe1xuICAgIGxldCBbc3RyLCBzdHJlYW1zXSA9IHRoaXMucmVjdXJzaXZlVG9TdHJpbmcodGhpcy5yZW5kZXJlZCwgdGhpcy5yZW5kZXJlZFtDT01QT05FTlRTXSwgb25seUNpZHMsIHRydWUsIHt9KVxuICAgIHJldHVybiBbc3RyLCBzdHJlYW1zXVxuICB9XG5cbiAgcmVjdXJzaXZlVG9TdHJpbmcocmVuZGVyZWQsIGNvbXBvbmVudHMgPSByZW5kZXJlZFtDT01QT05FTlRTXSwgb25seUNpZHMsIGNoYW5nZVRyYWNraW5nLCByb290QXR0cnMpe1xuICAgIG9ubHlDaWRzID0gb25seUNpZHMgPyBuZXcgU2V0KG9ubHlDaWRzKSA6IG51bGxcbiAgICBsZXQgb3V0cHV0ID0ge2J1ZmZlcjogXCJcIiwgY29tcG9uZW50czogY29tcG9uZW50cywgb25seUNpZHM6IG9ubHlDaWRzLCBzdHJlYW1zOiBuZXcgU2V0KCl9XG4gICAgdGhpcy50b091dHB1dEJ1ZmZlcihyZW5kZXJlZCwgbnVsbCwgb3V0cHV0LCBjaGFuZ2VUcmFja2luZywgcm9vdEF0dHJzKVxuICAgIHJldHVybiBbb3V0cHV0LmJ1ZmZlciwgb3V0cHV0LnN0cmVhbXNdXG4gIH1cblxuICBjb21wb25lbnRDSURzKGRpZmYpeyByZXR1cm4gT2JqZWN0LmtleXMoZGlmZltDT01QT05FTlRTXSB8fCB7fSkubWFwKGkgPT4gcGFyc2VJbnQoaSkpIH1cblxuICBpc0NvbXBvbmVudE9ubHlEaWZmKGRpZmYpe1xuICAgIGlmKCFkaWZmW0NPTVBPTkVOVFNdKXsgcmV0dXJuIGZhbHNlIH1cbiAgICByZXR1cm4gT2JqZWN0LmtleXMoZGlmZikubGVuZ3RoID09PSAxXG4gIH1cblxuICBnZXRDb21wb25lbnQoZGlmZiwgY2lkKXsgcmV0dXJuIGRpZmZbQ09NUE9ORU5UU11bY2lkXSB9XG5cbiAgcmVzZXRSZW5kZXIoY2lkKXtcbiAgICAvLyB3ZSBhcmUgcmFjaW5nIGEgY29tcG9uZW50IGRlc3Ryb3ksIGl0IGNvdWxkIG5vdCBleGlzdCwgc29cbiAgICAvLyBtYWtlIHN1cmUgdGhhdCB3ZSBkb24ndCB0cnkgdG8gc2V0IHJlc2V0IG9uIHVuZGVmaW5lZFxuICAgIGlmKHRoaXMucmVuZGVyZWRbQ09NUE9ORU5UU11bY2lkXSl7XG4gICAgICB0aGlzLnJlbmRlcmVkW0NPTVBPTkVOVFNdW2NpZF0ucmVzZXQgPSB0cnVlXG4gICAgfVxuICB9XG5cbiAgbWVyZ2VEaWZmKGRpZmYpe1xuICAgIGxldCBuZXdjID0gZGlmZltDT01QT05FTlRTXVxuICAgIGxldCBjYWNoZSA9IHt9XG4gICAgZGVsZXRlIGRpZmZbQ09NUE9ORU5UU11cbiAgICB0aGlzLnJlbmRlcmVkID0gdGhpcy5tdXRhYmxlTWVyZ2UodGhpcy5yZW5kZXJlZCwgZGlmZilcbiAgICB0aGlzLnJlbmRlcmVkW0NPTVBPTkVOVFNdID0gdGhpcy5yZW5kZXJlZFtDT01QT05FTlRTXSB8fCB7fVxuXG4gICAgaWYobmV3Yyl7XG4gICAgICBsZXQgb2xkYyA9IHRoaXMucmVuZGVyZWRbQ09NUE9ORU5UU11cblxuICAgICAgZm9yKGxldCBjaWQgaW4gbmV3Yyl7XG4gICAgICAgIG5ld2NbY2lkXSA9IHRoaXMuY2FjaGVkRmluZENvbXBvbmVudChjaWQsIG5ld2NbY2lkXSwgb2xkYywgbmV3YywgY2FjaGUpXG4gICAgICB9XG5cbiAgICAgIGZvcihsZXQgY2lkIGluIG5ld2MpeyBvbGRjW2NpZF0gPSBuZXdjW2NpZF0gfVxuICAgICAgZGlmZltDT01QT05FTlRTXSA9IG5ld2NcbiAgICB9XG4gIH1cblxuICBjYWNoZWRGaW5kQ29tcG9uZW50KGNpZCwgY2RpZmYsIG9sZGMsIG5ld2MsIGNhY2hlKXtcbiAgICBpZihjYWNoZVtjaWRdKXtcbiAgICAgIHJldHVybiBjYWNoZVtjaWRdXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBuZGlmZiwgc3RhdCwgc2NpZCA9IGNkaWZmW1NUQVRJQ11cblxuICAgICAgaWYoaXNDaWQoc2NpZCkpe1xuICAgICAgICBsZXQgdGRpZmZcblxuICAgICAgICBpZihzY2lkID4gMCl7XG4gICAgICAgICAgdGRpZmYgPSB0aGlzLmNhY2hlZEZpbmRDb21wb25lbnQoc2NpZCwgbmV3Y1tzY2lkXSwgb2xkYywgbmV3YywgY2FjaGUpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGRpZmYgPSBvbGRjWy1zY2lkXVxuICAgICAgICB9XG5cbiAgICAgICAgc3RhdCA9IHRkaWZmW1NUQVRJQ11cbiAgICAgICAgbmRpZmYgPSB0aGlzLmNsb25lTWVyZ2UodGRpZmYsIGNkaWZmLCB0cnVlKVxuICAgICAgICBuZGlmZltTVEFUSUNdID0gc3RhdFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmRpZmYgPSBjZGlmZltTVEFUSUNdICE9PSB1bmRlZmluZWQgfHwgb2xkY1tjaWRdID09PSB1bmRlZmluZWQgP1xuICAgICAgICAgIGNkaWZmIDogdGhpcy5jbG9uZU1lcmdlKG9sZGNbY2lkXSwgY2RpZmYsIGZhbHNlKVxuICAgICAgfVxuXG4gICAgICBjYWNoZVtjaWRdID0gbmRpZmZcbiAgICAgIHJldHVybiBuZGlmZlxuICAgIH1cbiAgfVxuXG4gIG11dGFibGVNZXJnZSh0YXJnZXQsIHNvdXJjZSl7XG4gICAgaWYoc291cmNlW1NUQVRJQ10gIT09IHVuZGVmaW5lZCl7XG4gICAgICByZXR1cm4gc291cmNlXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZG9NdXRhYmxlTWVyZ2UodGFyZ2V0LCBzb3VyY2UpXG4gICAgICByZXR1cm4gdGFyZ2V0XG4gICAgfVxuICB9XG5cbiAgZG9NdXRhYmxlTWVyZ2UodGFyZ2V0LCBzb3VyY2Upe1xuICAgIGZvcihsZXQga2V5IGluIHNvdXJjZSl7XG4gICAgICBsZXQgdmFsID0gc291cmNlW2tleV1cbiAgICAgIGxldCB0YXJnZXRWYWwgPSB0YXJnZXRba2V5XVxuICAgICAgbGV0IGlzT2JqVmFsID0gaXNPYmplY3QodmFsKVxuICAgICAgaWYoaXNPYmpWYWwgJiYgdmFsW1NUQVRJQ10gPT09IHVuZGVmaW5lZCAmJiBpc09iamVjdCh0YXJnZXRWYWwpKXtcbiAgICAgICAgdGhpcy5kb011dGFibGVNZXJnZSh0YXJnZXRWYWwsIHZhbClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldFtrZXldID0gdmFsXG4gICAgICB9XG4gICAgfVxuICAgIGlmKHRhcmdldFtST09UXSl7XG4gICAgICB0YXJnZXQubmV3UmVuZGVyID0gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIC8vIE1lcmdlcyBjaWQgdHJlZXMgdG9nZXRoZXIsIGNvcHlpbmcgc3RhdGljcyBmcm9tIHNvdXJjZSB0cmVlLlxuICAvL1xuICAvLyBUaGUgYHBydW5lTWFnaWNJZGAgaXMgcGFzc2VkIHRvIGNvbnRyb2wgcHJ1bmluZyB0aGUgbWFnaWNJZCBvZiB0aGVcbiAgLy8gdGFyZ2V0LiBXZSBtdXN0IGFsd2F5cyBwcnVuZSB0aGUgbWFnaWNJZCB3aGVuIHdlIGFyZSBzaGFyaW5nIHN0YXRpY3NcbiAgLy8gZnJvbSBhbm90aGVyIGNvbXBvbmVudC4gSWYgbm90IHBydW5pbmcsIHdlIHJlcGxpY2F0ZSB0aGUgbG9naWMgZnJvbVxuICAvLyBtdXRhYmxlTWVyZ2UsIHdoZXJlIHdlIHNldCBuZXdSZW5kZXIgdG8gdHJ1ZSBpZiB0aGVyZSBpcyBhIHJvb3RcbiAgLy8gKGVmZmVjdGl2ZWx5IGZvcmNpbmcgdGhlIG5ldyB2ZXJzaW9uIHRvIGJlIHJlbmRlcmVkIGluc3RlYWQgb2Ygc2tpcHBlZClcbiAgLy9cbiAgY2xvbmVNZXJnZSh0YXJnZXQsIHNvdXJjZSwgcHJ1bmVNYWdpY0lkKXtcbiAgICBsZXQgbWVyZ2VkID0gey4uLnRhcmdldCwgLi4uc291cmNlfVxuICAgIGZvcihsZXQga2V5IGluIG1lcmdlZCl7XG4gICAgICBsZXQgdmFsID0gc291cmNlW2tleV1cbiAgICAgIGxldCB0YXJnZXRWYWwgPSB0YXJnZXRba2V5XVxuICAgICAgaWYoaXNPYmplY3QodmFsKSAmJiB2YWxbU1RBVElDXSA9PT0gdW5kZWZpbmVkICYmIGlzT2JqZWN0KHRhcmdldFZhbCkpe1xuICAgICAgICBtZXJnZWRba2V5XSA9IHRoaXMuY2xvbmVNZXJnZSh0YXJnZXRWYWwsIHZhbCwgcHJ1bmVNYWdpY0lkKVxuICAgICAgfVxuICAgIH1cbiAgICBpZihwcnVuZU1hZ2ljSWQpe1xuICAgICAgZGVsZXRlIG1lcmdlZC5tYWdpY0lkXG4gICAgICBkZWxldGUgbWVyZ2VkLm5ld1JlbmRlclxuICAgIH0gZWxzZSBpZih0YXJnZXRbUk9PVF0pe1xuICAgICAgbWVyZ2VkLm5ld1JlbmRlciA9IHRydWVcbiAgICB9XG4gICAgcmV0dXJuIG1lcmdlZFxuICB9XG5cbiAgY29tcG9uZW50VG9TdHJpbmcoY2lkKXtcbiAgICBsZXQgW3N0ciwgc3RyZWFtc10gPSB0aGlzLnJlY3Vyc2l2ZUNJRFRvU3RyaW5nKHRoaXMucmVuZGVyZWRbQ09NUE9ORU5UU10sIGNpZCwgbnVsbClcbiAgICBsZXQgW3N0cmlwcGVkSFRNTCwgX2JlZm9yZSwgX2FmdGVyXSA9IG1vZGlmeVJvb3Qoc3RyLCB7fSlcbiAgICByZXR1cm4gW3N0cmlwcGVkSFRNTCwgc3RyZWFtc11cbiAgfVxuXG4gIHBydW5lQ0lEcyhjaWRzKXtcbiAgICBjaWRzLmZvckVhY2goY2lkID0+IGRlbGV0ZSB0aGlzLnJlbmRlcmVkW0NPTVBPTkVOVFNdW2NpZF0pXG4gIH1cblxuICAvLyBwcml2YXRlXG5cbiAgZ2V0KCl7IHJldHVybiB0aGlzLnJlbmRlcmVkIH1cblxuICBpc05ld0ZpbmdlcnByaW50KGRpZmYgPSB7fSl7IHJldHVybiAhIWRpZmZbU1RBVElDXSB9XG5cbiAgdGVtcGxhdGVTdGF0aWMocGFydCwgdGVtcGxhdGVzKXtcbiAgICBpZih0eXBlb2YgKHBhcnQpID09PSBcIm51bWJlclwiKSB7XG4gICAgICByZXR1cm4gdGVtcGxhdGVzW3BhcnRdXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBwYXJ0XG4gICAgfVxuICB9XG5cbiAgbmV4dE1hZ2ljSUQoKXtcbiAgICB0aGlzLm1hZ2ljSWQrK1xuICAgIHJldHVybiBgJHt0aGlzLnBhcmVudFZpZXdJZCgpfS0ke3RoaXMubWFnaWNJZH1gXG4gIH1cblxuICAvLyBDb252ZXJ0cyByZW5kZXJlZCB0cmVlIHRvIG91dHB1dCBidWZmZXIuXG4gIC8vXG4gIC8vIGNoYW5nZVRyYWNraW5nIGNvbnRyb2xzIGlmIHdlIGNhbiBhcHBseSB0aGUgUEhYX1NLSVAgb3B0aW1pemF0aW9uLlxuICAvLyBJdCBpcyBkaXNhYmxlZCBmb3IgY29tcHJlaGVuc2lvbnMgc2luY2Ugd2UgbXVzdCByZS1yZW5kZXIgdGhlIGVudGlyZSBjb2xsZWN0aW9uXG4gIC8vIGFuZCBubyBpbmRpdmlkdWFsIGVsZW1lbnQgaXMgdHJhY2tlZCBpbnNpZGUgdGhlIGNvbXByZWhlbnNpb24uXG4gIHRvT3V0cHV0QnVmZmVyKHJlbmRlcmVkLCB0ZW1wbGF0ZXMsIG91dHB1dCwgY2hhbmdlVHJhY2tpbmcsIHJvb3RBdHRycyA9IHt9KXtcbiAgICBpZihyZW5kZXJlZFtEWU5BTUlDU10peyByZXR1cm4gdGhpcy5jb21wcmVoZW5zaW9uVG9CdWZmZXIocmVuZGVyZWQsIHRlbXBsYXRlcywgb3V0cHV0KSB9XG4gICAgbGV0IHtbU1RBVElDXTogc3RhdGljc30gPSByZW5kZXJlZFxuICAgIHN0YXRpY3MgPSB0aGlzLnRlbXBsYXRlU3RhdGljKHN0YXRpY3MsIHRlbXBsYXRlcylcbiAgICBsZXQgaXNSb290ID0gcmVuZGVyZWRbUk9PVF1cbiAgICBsZXQgcHJldkJ1ZmZlciA9IG91dHB1dC5idWZmZXJcbiAgICBpZihpc1Jvb3QpeyBvdXRwdXQuYnVmZmVyID0gXCJcIiB9XG5cbiAgICAvLyB0aGlzIGNvbmRpdGlvbiBpcyBjYWxsZWQgd2hlbiBmaXJzdCByZW5kZXJpbmcgYW4gb3B0aW1pemFibGUgZnVuY3Rpb24gY29tcG9uZW50LlxuICAgIC8vIExDIGhhdmUgdGhlaXIgbWFnaWNJZCBwcmV2aW91c2x5IHNldFxuICAgIGlmKGNoYW5nZVRyYWNraW5nICYmIGlzUm9vdCAmJiAhcmVuZGVyZWQubWFnaWNJZCl7XG4gICAgICByZW5kZXJlZC5uZXdSZW5kZXIgPSB0cnVlXG4gICAgICByZW5kZXJlZC5tYWdpY0lkID0gdGhpcy5uZXh0TWFnaWNJRCgpXG4gICAgfVxuXG4gICAgb3V0cHV0LmJ1ZmZlciArPSBzdGF0aWNzWzBdXG4gICAgZm9yKGxldCBpID0gMTsgaSA8IHN0YXRpY3MubGVuZ3RoOyBpKyspe1xuICAgICAgdGhpcy5keW5hbWljVG9CdWZmZXIocmVuZGVyZWRbaSAtIDFdLCB0ZW1wbGF0ZXMsIG91dHB1dCwgY2hhbmdlVHJhY2tpbmcpXG4gICAgICBvdXRwdXQuYnVmZmVyICs9IHN0YXRpY3NbaV1cbiAgICB9XG5cbiAgICAvLyBBcHBsaWVzIHRoZSByb290IHRhZyBcInNraXBcIiBvcHRpbWl6YXRpb24gaWYgc3VwcG9ydGVkLCB3aGljaCBjbGVhcnNcbiAgICAvLyB0aGUgcm9vdCB0YWcgYXR0cmlidXRlcyBhbmQgaW5uZXJIVE1MLCBhbmQgb25seSBtYWludGFpbnMgdGhlIG1hZ2ljSWQuXG4gICAgLy8gV2UgY2FuIG9ubHkgc2tpcCB3aGVuIGNoYW5nZVRyYWNraW5nIGlzIHN1cHBvcnRlZCAob3V0c2lkZSBvZiBhIGNvbXByZWhlbnNpb24pLFxuICAgIC8vIGFuZCB3aGVuIHRoZSByb290IGVsZW1lbnQgaGFzbid0IGV4cGVyaWVuY2VkIGFuIHVucmVuZGVyZWQgbWVyZ2UgKG5ld1JlbmRlciB0cnVlKS5cbiAgICBpZihpc1Jvb3Qpe1xuICAgICAgbGV0IHNraXAgPSBmYWxzZVxuICAgICAgbGV0IGF0dHJzXG4gICAgICAvLyB3aGVuIGEgTEMgaXMgYWRkZWQgb24gdGhlIHBhZ2UsIHdlIG5lZWQgdG8gcmUtcmVuZGVyIHRoZSBlbnRpcmUgTEMgdHJlZSxcbiAgICAgIC8vIHRoZXJlZm9yZSBjaGFuZ2VUcmFja2luZyBpcyBmYWxzZTsgaG93ZXZlciwgd2UgbmVlZCB0byBrZWVwIGFsbCB0aGUgbWFnaWNJZHNcbiAgICAgIC8vIGZyb20gYW55IGZ1bmN0aW9uIGNvbXBvbmVudCBzbyB0aGUgbmV4dCB0aW1lIHRoZSBMQyBpcyB1cGRhdGVkLCB3ZSBjYW4gYXBwbHlcbiAgICAgIC8vIHRoZSBza2lwIG9wdGltaXphdGlvblxuICAgICAgaWYoY2hhbmdlVHJhY2tpbmcgfHwgcmVuZGVyZWQubWFnaWNJZCl7XG4gICAgICAgIHNraXAgPSBjaGFuZ2VUcmFja2luZyAmJiAhcmVuZGVyZWQubmV3UmVuZGVyXG4gICAgICAgIGF0dHJzID0ge1tQSFhfTUFHSUNfSURdOiByZW5kZXJlZC5tYWdpY0lkLCAuLi5yb290QXR0cnN9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhdHRycyA9IHJvb3RBdHRyc1xuICAgICAgfVxuICAgICAgaWYoc2tpcCl7IGF0dHJzW1BIWF9TS0lQXSA9IHRydWUgfVxuICAgICAgbGV0IFtuZXdSb290LCBjb21tZW50QmVmb3JlLCBjb21tZW50QWZ0ZXJdID0gbW9kaWZ5Um9vdChvdXRwdXQuYnVmZmVyLCBhdHRycywgc2tpcClcbiAgICAgIHJlbmRlcmVkLm5ld1JlbmRlciA9IGZhbHNlXG4gICAgICBvdXRwdXQuYnVmZmVyID0gcHJldkJ1ZmZlciArIGNvbW1lbnRCZWZvcmUgKyBuZXdSb290ICsgY29tbWVudEFmdGVyXG4gICAgfVxuICB9XG5cbiAgY29tcHJlaGVuc2lvblRvQnVmZmVyKHJlbmRlcmVkLCB0ZW1wbGF0ZXMsIG91dHB1dCl7XG4gICAgbGV0IHtbRFlOQU1JQ1NdOiBkeW5hbWljcywgW1NUQVRJQ106IHN0YXRpY3MsIFtTVFJFQU1dOiBzdHJlYW19ID0gcmVuZGVyZWRcbiAgICBsZXQgW19yZWYsIF9pbnNlcnRzLCBkZWxldGVJZHMsIHJlc2V0XSA9IHN0cmVhbSB8fCBbbnVsbCwge30sIFtdLCBudWxsXVxuICAgIHN0YXRpY3MgPSB0aGlzLnRlbXBsYXRlU3RhdGljKHN0YXRpY3MsIHRlbXBsYXRlcylcbiAgICBsZXQgY29tcFRlbXBsYXRlcyA9IHRlbXBsYXRlcyB8fCByZW5kZXJlZFtURU1QTEFURVNdXG4gICAgZm9yKGxldCBkID0gMDsgZCA8IGR5bmFtaWNzLmxlbmd0aDsgZCsrKXtcbiAgICAgIGxldCBkeW5hbWljID0gZHluYW1pY3NbZF1cbiAgICAgIG91dHB1dC5idWZmZXIgKz0gc3RhdGljc1swXVxuICAgICAgZm9yKGxldCBpID0gMTsgaSA8IHN0YXRpY3MubGVuZ3RoOyBpKyspe1xuICAgICAgICAvLyBJbnNpZGUgYSBjb21wcmVoZW5zaW9uLCB3ZSBkb24ndCB0cmFjayBob3cgZHluYW1pY3MgY2hhbmdlXG4gICAgICAgIC8vIG92ZXIgdGltZSAoYW5kIGZlYXR1cmVzIGxpa2Ugc3RyZWFtcyB3b3VsZCBtYWtlIHRoYXQgaW1wb3NzaWJsZVxuICAgICAgICAvLyB1bmxlc3Mgd2UgbW92ZSB0aGUgc3RyZWFtIGRpZmZpbmcgYXdheSBmcm9tIG1vcnBoZG9tKSxcbiAgICAgICAgLy8gc28gd2UgY2FuJ3QgcGVyZm9ybSByb290IGNoYW5nZSB0cmFja2luZy5cbiAgICAgICAgbGV0IGNoYW5nZVRyYWNraW5nID0gZmFsc2VcbiAgICAgICAgdGhpcy5keW5hbWljVG9CdWZmZXIoZHluYW1pY1tpIC0gMV0sIGNvbXBUZW1wbGF0ZXMsIG91dHB1dCwgY2hhbmdlVHJhY2tpbmcpXG4gICAgICAgIG91dHB1dC5idWZmZXIgKz0gc3RhdGljc1tpXVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmKHN0cmVhbSAhPT0gdW5kZWZpbmVkICYmIChyZW5kZXJlZFtEWU5BTUlDU10ubGVuZ3RoID4gMCB8fCBkZWxldGVJZHMubGVuZ3RoID4gMCB8fCByZXNldCkpe1xuICAgICAgZGVsZXRlIHJlbmRlcmVkW1NUUkVBTV1cbiAgICAgIHJlbmRlcmVkW0RZTkFNSUNTXSA9IFtdXG4gICAgICBvdXRwdXQuc3RyZWFtcy5hZGQoc3RyZWFtKVxuICAgIH1cbiAgfVxuXG4gIGR5bmFtaWNUb0J1ZmZlcihyZW5kZXJlZCwgdGVtcGxhdGVzLCBvdXRwdXQsIGNoYW5nZVRyYWNraW5nKXtcbiAgICBpZih0eXBlb2YgKHJlbmRlcmVkKSA9PT0gXCJudW1iZXJcIil7XG4gICAgICBsZXQgW3N0ciwgc3RyZWFtc10gPSB0aGlzLnJlY3Vyc2l2ZUNJRFRvU3RyaW5nKG91dHB1dC5jb21wb25lbnRzLCByZW5kZXJlZCwgb3V0cHV0Lm9ubHlDaWRzKVxuICAgICAgb3V0cHV0LmJ1ZmZlciArPSBzdHJcbiAgICAgIG91dHB1dC5zdHJlYW1zID0gbmV3IFNldChbLi4ub3V0cHV0LnN0cmVhbXMsIC4uLnN0cmVhbXNdKVxuICAgIH0gZWxzZSBpZihpc09iamVjdChyZW5kZXJlZCkpe1xuICAgICAgdGhpcy50b091dHB1dEJ1ZmZlcihyZW5kZXJlZCwgdGVtcGxhdGVzLCBvdXRwdXQsIGNoYW5nZVRyYWNraW5nLCB7fSlcbiAgICB9IGVsc2Uge1xuICAgICAgb3V0cHV0LmJ1ZmZlciArPSByZW5kZXJlZFxuICAgIH1cbiAgfVxuXG4gIHJlY3Vyc2l2ZUNJRFRvU3RyaW5nKGNvbXBvbmVudHMsIGNpZCwgb25seUNpZHMpe1xuICAgIGxldCBjb21wb25lbnQgPSBjb21wb25lbnRzW2NpZF0gfHwgbG9nRXJyb3IoYG5vIGNvbXBvbmVudCBmb3IgQ0lEICR7Y2lkfWAsIGNvbXBvbmVudHMpXG4gICAgbGV0IGF0dHJzID0ge1tQSFhfQ09NUE9ORU5UXTogY2lkfVxuICAgIGxldCBza2lwID0gb25seUNpZHMgJiYgIW9ubHlDaWRzLmhhcyhjaWQpXG4gICAgLy8gVHdvIG9wdGltaXphdGlvbiBwYXRocyBhcHBseSBoZXJlOlxuICAgIC8vXG4gICAgLy8gICAxLiBUaGUgb25seUNpZHMgb3B0aW1pemF0aW9uIHdvcmtzIGJ5IHRoZSBzZXJ2ZXIgZGlmZiB0ZWxsaW5nIHVzIG9ubHkgc3BlY2lmaWNcbiAgICAvLyAgICAgY2lkJ3MgaGF2ZSBjaGFuZ2VkLiBUaGlzIGFsbG93cyB1cyB0byBza2lwIHJlbmRlcmluZyBhbnkgY29tcG9uZW50IHRoYXQgaGFzbid0IGNoYW5nZWQsXG4gICAgLy8gICAgIHdoaWNoIHVsdGltYXRlbHkgc2V0cyBQSFhfU0tJUCByb290IGF0dHJpYnV0ZSBhbmQgYXZvaWRzIHJlbmRlcmluZyB0aGUgaW5uZXJIVE1MLlxuICAgIC8vXG4gICAgLy8gICAyLiBUaGUgcm9vdCBQSFhfU0tJUCBvcHRpbWl6YXRpb24gZ2VuZXJhbGl6ZXMgdG8gYWxsIEhFRXggZnVuY3Rpb24gY29tcG9uZW50cywgYW5kXG4gICAgLy8gICAgIHdvcmtzIGluIHRoZSBzYW1lIFBIWF9TS0lQIGF0dHJpYnV0ZSBmYXNoaW9uIGFzIDEsIGJ1dCB0aGUgbmV3UmVuZGVyIHRyYWNraW5nIGlzIGRvbmVcbiAgICAvLyAgICAgYXQgdGhlIGdlbmVyYWwgZGlmZiBtZXJnZSBsZXZlbC4gSWYgd2UgbWVyZ2UgYSBkaWZmIHdpdGggbmV3IGR5bmFtaWNzLCB3ZSBuZWNlc3NhcmlseSBoYXZlXG4gICAgLy8gICAgIGV4cGVyaWVuY2VkIGEgY2hhbmdlIHdoaWNoIG11c3QgYmUgYSBuZXdSZW5kZXIsIGFuZCB0aHVzIHdlIGNhbid0IHNraXAgdGhlIHJlbmRlci5cbiAgICAvL1xuICAgIC8vIEJvdGggb3B0aW1pemF0aW9uIGZsb3dzIGFwcGx5IGhlcmUuIG5ld1JlbmRlciBpcyBzZXQgYmFzZWQgb24gdGhlIG9ubHlDaWRzIG9wdGltaXphdGlvbiwgYW5kXG4gICAgLy8gd2UgdHJhY2sgYSBkZXRlcm1pbmlzdGljIG1hZ2ljSWQgYmFzZWQgb24gdGhlIGNpZC5cbiAgICAvL1xuICAgIC8vIEJ5IGRlZmF1bHQgY2hhbmdlVHJhY2tpbmcgaXMgZW5hYmxlZCwgYnV0IHdlIHNwZWNpYWwgY2FzZSB0aGUgZmxvdyB3aGVyZSB0aGUgY2xpZW50IGlzIHBydW5pbmdcbiAgICAvLyBjaWRzIGFuZCB0aGUgc2VydmVyIGFkZHMgdGhlIGNvbXBvbmVudCBiYWNrLiBJbiBzdWNoIGNhc2VzLCB3ZSBleHBsaWNpdGx5IGRpc2FibGUgY2hhbmdlVHJhY2tpbmdcbiAgICAvLyB3aXRoIHJlc2V0UmVuZGVyIGZvciB0aGlzIGNpZCwgdGhlbiByZS1lbmFibGUgaXQgYWZ0ZXIgdGhlIHJlY3Vyc2l2ZSBjYWxsIHRvIHNraXAgdGhlIG9wdGltaXphdGlvblxuICAgIC8vIGZvciB0aGUgZW50aXJlIGNvbXBvbmVudCB0cmVlLlxuICAgIGNvbXBvbmVudC5uZXdSZW5kZXIgPSAhc2tpcFxuICAgIGNvbXBvbmVudC5tYWdpY0lkID0gYCR7dGhpcy5wYXJlbnRWaWV3SWQoKX0tYy0ke2NpZH1gXG4gICAgLy8gZW5hYmxlIGNoYW5nZSB0cmFja2luZyBhcyBsb25nIGFzIHRoZSBjb21wb25lbnQgaGFzbid0IGJlZW4gcmVzZXRcbiAgICBsZXQgY2hhbmdlVHJhY2tpbmcgPSAhY29tcG9uZW50LnJlc2V0XG4gICAgbGV0IFtodG1sLCBzdHJlYW1zXSA9IHRoaXMucmVjdXJzaXZlVG9TdHJpbmcoY29tcG9uZW50LCBjb21wb25lbnRzLCBvbmx5Q2lkcywgY2hhbmdlVHJhY2tpbmcsIGF0dHJzKVxuICAgIC8vIGRpc2FibGUgcmVzZXQgYWZ0ZXIgd2UndmUgcmVuZGVyZWRcbiAgICBkZWxldGUgY29tcG9uZW50LnJlc2V0XG5cbiAgICByZXR1cm4gW2h0bWwsIHN0cmVhbXNdXG4gIH1cbn1cbiIsICJsZXQgdmlld0hvb2tJRCA9IDFcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdIb29rIHtcbiAgc3RhdGljIG1ha2VJRCgpeyByZXR1cm4gdmlld0hvb2tJRCsrIH1cbiAgc3RhdGljIGVsZW1lbnRJRChlbCl7IHJldHVybiBlbC5waHhIb29rSWQgfVxuXG4gIGNvbnN0cnVjdG9yKHZpZXcsIGVsLCBjYWxsYmFja3Mpe1xuICAgIHRoaXMuX192aWV3ID0gdmlld1xuICAgIHRoaXMubGl2ZVNvY2tldCA9IHZpZXcubGl2ZVNvY2tldFxuICAgIHRoaXMuX19jYWxsYmFja3MgPSBjYWxsYmFja3NcbiAgICB0aGlzLl9fbGlzdGVuZXJzID0gbmV3IFNldCgpXG4gICAgdGhpcy5fX2lzRGlzY29ubmVjdGVkID0gZmFsc2VcbiAgICB0aGlzLmVsID0gZWxcbiAgICB0aGlzLmVsLnBoeEhvb2tJZCA9IHRoaXMuY29uc3RydWN0b3IubWFrZUlEKClcbiAgICBmb3IobGV0IGtleSBpbiB0aGlzLl9fY2FsbGJhY2tzKXsgdGhpc1trZXldID0gdGhpcy5fX2NhbGxiYWNrc1trZXldIH1cbiAgfVxuXG4gIF9fbW91bnRlZCgpeyB0aGlzLm1vdW50ZWQgJiYgdGhpcy5tb3VudGVkKCkgfVxuICBfX3VwZGF0ZWQoKXsgdGhpcy51cGRhdGVkICYmIHRoaXMudXBkYXRlZCgpIH1cbiAgX19iZWZvcmVVcGRhdGUoKXsgdGhpcy5iZWZvcmVVcGRhdGUgJiYgdGhpcy5iZWZvcmVVcGRhdGUoKSB9XG4gIF9fZGVzdHJveWVkKCl7IHRoaXMuZGVzdHJveWVkICYmIHRoaXMuZGVzdHJveWVkKCkgfVxuICBfX3JlY29ubmVjdGVkKCl7XG4gICAgaWYodGhpcy5fX2lzRGlzY29ubmVjdGVkKXtcbiAgICAgIHRoaXMuX19pc0Rpc2Nvbm5lY3RlZCA9IGZhbHNlXG4gICAgICB0aGlzLnJlY29ubmVjdGVkICYmIHRoaXMucmVjb25uZWN0ZWQoKVxuICAgIH1cbiAgfVxuICBfX2Rpc2Nvbm5lY3RlZCgpe1xuICAgIHRoaXMuX19pc0Rpc2Nvbm5lY3RlZCA9IHRydWVcbiAgICB0aGlzLmRpc2Nvbm5lY3RlZCAmJiB0aGlzLmRpc2Nvbm5lY3RlZCgpXG4gIH1cblxuICBwdXNoRXZlbnQoZXZlbnQsIHBheWxvYWQgPSB7fSwgb25SZXBseSA9IGZ1bmN0aW9uICgpeyB9KXtcbiAgICByZXR1cm4gdGhpcy5fX3ZpZXcucHVzaEhvb2tFdmVudCh0aGlzLmVsLCBudWxsLCBldmVudCwgcGF5bG9hZCwgb25SZXBseSlcbiAgfVxuXG4gIHB1c2hFdmVudFRvKHBoeFRhcmdldCwgZXZlbnQsIHBheWxvYWQgPSB7fSwgb25SZXBseSA9IGZ1bmN0aW9uICgpeyB9KXtcbiAgICByZXR1cm4gdGhpcy5fX3ZpZXcud2l0aGluVGFyZ2V0cyhwaHhUYXJnZXQsICh2aWV3LCB0YXJnZXRDdHgpID0+IHtcbiAgICAgIHJldHVybiB2aWV3LnB1c2hIb29rRXZlbnQodGhpcy5lbCwgdGFyZ2V0Q3R4LCBldmVudCwgcGF5bG9hZCwgb25SZXBseSlcbiAgICB9KVxuICB9XG5cbiAgaGFuZGxlRXZlbnQoZXZlbnQsIGNhbGxiYWNrKXtcbiAgICBsZXQgY2FsbGJhY2tSZWYgPSAoY3VzdG9tRXZlbnQsIGJ5cGFzcykgPT4gYnlwYXNzID8gZXZlbnQgOiBjYWxsYmFjayhjdXN0b21FdmVudC5kZXRhaWwpXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoYHBoeDoke2V2ZW50fWAsIGNhbGxiYWNrUmVmKVxuICAgIHRoaXMuX19saXN0ZW5lcnMuYWRkKGNhbGxiYWNrUmVmKVxuICAgIHJldHVybiBjYWxsYmFja1JlZlxuICB9XG5cbiAgcmVtb3ZlSGFuZGxlRXZlbnQoY2FsbGJhY2tSZWYpe1xuICAgIGxldCBldmVudCA9IGNhbGxiYWNrUmVmKG51bGwsIHRydWUpXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoYHBoeDoke2V2ZW50fWAsIGNhbGxiYWNrUmVmKVxuICAgIHRoaXMuX19saXN0ZW5lcnMuZGVsZXRlKGNhbGxiYWNrUmVmKVxuICB9XG5cbiAgdXBsb2FkKG5hbWUsIGZpbGVzKXtcbiAgICByZXR1cm4gdGhpcy5fX3ZpZXcuZGlzcGF0Y2hVcGxvYWRzKG51bGwsIG5hbWUsIGZpbGVzKVxuICB9XG5cbiAgdXBsb2FkVG8ocGh4VGFyZ2V0LCBuYW1lLCBmaWxlcyl7XG4gICAgcmV0dXJuIHRoaXMuX192aWV3LndpdGhpblRhcmdldHMocGh4VGFyZ2V0LCAodmlldywgdGFyZ2V0Q3R4KSA9PiB7XG4gICAgICB2aWV3LmRpc3BhdGNoVXBsb2Fkcyh0YXJnZXRDdHgsIG5hbWUsIGZpbGVzKVxuICAgIH0pXG4gIH1cblxuICBfX2NsZWFudXBfXygpe1xuICAgIHRoaXMuX19saXN0ZW5lcnMuZm9yRWFjaChjYWxsYmFja1JlZiA9PiB0aGlzLnJlbW92ZUhhbmRsZUV2ZW50KGNhbGxiYWNrUmVmKSlcbiAgfVxufVxuIiwgImltcG9ydCB7XG4gIEJFRk9SRV9VTkxPQURfTE9BREVSX1RJTUVPVVQsXG4gIENIRUNLQUJMRV9JTlBVVFMsXG4gIENPTlNFQ1VUSVZFX1JFTE9BRFMsXG4gIFBIWF9BVVRPX1JFQ09WRVIsXG4gIFBIWF9DT01QT05FTlQsXG4gIFBIWF9DT05ORUNURURfQ0xBU1MsXG4gIFBIWF9ESVNBQkxFX1dJVEgsXG4gIFBIWF9ESVNBQkxFX1dJVEhfUkVTVE9SRSxcbiAgUEhYX0RJU0FCTEVELFxuICBQSFhfTE9BRElOR19DTEFTUyxcbiAgUEhYX0VWRU5UX0NMQVNTRVMsXG4gIFBIWF9FUlJPUl9DTEFTUyxcbiAgUEhYX0NMSUVOVF9FUlJPUl9DTEFTUyxcbiAgUEhYX1NFUlZFUl9FUlJPUl9DTEFTUyxcbiAgUEhYX0ZFRURCQUNLX0ZPUixcbiAgUEhYX0ZFRURCQUNLX0dST1VQLFxuICBQSFhfSEFTX0ZPQ1VTRUQsXG4gIFBIWF9IQVNfU1VCTUlUVEVELFxuICBQSFhfSE9PSyxcbiAgUEhYX1BBR0VfTE9BRElORyxcbiAgUEhYX1BBUkVOVF9JRCxcbiAgUEhYX1BST0dSRVNTLFxuICBQSFhfUkVBRE9OTFksXG4gIFBIWF9SRUYsXG4gIFBIWF9SRUZfU1JDLFxuICBQSFhfUk9PVF9JRCxcbiAgUEhYX1NFU1NJT04sXG4gIFBIWF9TVEFUSUMsXG4gIFBIWF9UUkFDS19TVEFUSUMsXG4gIFBIWF9UUkFDS19VUExPQURTLFxuICBQSFhfVVBEQVRFLFxuICBQSFhfVVBMT0FEX1JFRixcbiAgUEhYX1ZJRVdfU0VMRUNUT1IsXG4gIFBIWF9NQUlOLFxuICBQSFhfTU9VTlRFRCxcbiAgUFVTSF9USU1FT1VULFxuICBQSFhfVklFV1BPUlRfVE9QLFxuICBQSFhfVklFV1BPUlRfQk9UVE9NLFxufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQge1xuICBjbG9uZSxcbiAgY2xvc2VzdFBoeEJpbmRpbmcsXG4gIGlzRW1wdHksXG4gIGlzRXF1YWxPYmosXG4gIGxvZ0Vycm9yLFxuICBtYXliZSxcbiAgaXNDaWQsXG59IGZyb20gXCIuL3V0aWxzXCJcblxuaW1wb3J0IEJyb3dzZXIgZnJvbSBcIi4vYnJvd3NlclwiXG5pbXBvcnQgRE9NIGZyb20gXCIuL2RvbVwiXG5pbXBvcnQgRE9NUGF0Y2ggZnJvbSBcIi4vZG9tX3BhdGNoXCJcbmltcG9ydCBMaXZlVXBsb2FkZXIgZnJvbSBcIi4vbGl2ZV91cGxvYWRlclwiXG5pbXBvcnQgUmVuZGVyZWQgZnJvbSBcIi4vcmVuZGVyZWRcIlxuaW1wb3J0IFZpZXdIb29rIGZyb20gXCIuL3ZpZXdfaG9va1wiXG5pbXBvcnQgSlMgZnJvbSBcIi4vanNcIlxuXG5sZXQgc2VyaWFsaXplRm9ybSA9IChmb3JtLCBtZXRhZGF0YSwgb25seU5hbWVzID0gW10pID0+IHtcbiAgY29uc3Qge3N1Ym1pdHRlciwgLi4ubWV0YX0gPSBtZXRhZGF0YVxuXG4gIC8vIFdlIG11c3QgaW5qZWN0IHRoZSBzdWJtaXR0ZXIgaW4gdGhlIG9yZGVyIHRoYXQgaXQgZXhpc3RzIGluIHRoZSBET01cbiAgLy8gcmVsZWF0aXZlIHRvIG90aGVyIGlucHV0cy4gRm9yIGV4YW1wbGUsIGZvciBjaGVja2JveCBncm91cHMsIHRoZSBvcmRlciBtdXN0IGJlIG1haW50YWluZWQuXG4gIGxldCBpbmplY3RlZEVsZW1lbnRcbiAgaWYoc3VibWl0dGVyICYmIHN1Ym1pdHRlci5uYW1lKXtcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKVxuICAgIGlucHV0LnR5cGUgPSBcImhpZGRlblwiXG4gICAgLy8gc2V0IHRoZSBmb3JtIGF0dHJpYnV0ZSBpZiB0aGUgc3VibWl0dGVyIGhhcyBvbmU7XG4gICAgLy8gdGhpcyBjYW4gaGFwcGVuIGlmIHRoZSBlbGVtZW50IGlzIG91dHNpZGUgdGhlIGFjdHVhbCBmb3JtIGVsZW1lbnRcbiAgICBjb25zdCBmb3JtSWQgPSBzdWJtaXR0ZXIuZ2V0QXR0cmlidXRlKFwiZm9ybVwiKVxuICAgIGlmKGZvcm1JZCl7XG4gICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJmb3JtXCIsIGZvcm1JZClcbiAgICB9XG4gICAgaW5wdXQubmFtZSA9IHN1Ym1pdHRlci5uYW1lXG4gICAgaW5wdXQudmFsdWUgPSBzdWJtaXR0ZXIudmFsdWVcbiAgICBzdWJtaXR0ZXIucGFyZW50RWxlbWVudC5pbnNlcnRCZWZvcmUoaW5wdXQsIHN1Ym1pdHRlcilcbiAgICBpbmplY3RlZEVsZW1lbnQgPSBpbnB1dFxuICB9XG5cbiAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSlcbiAgY29uc3QgdG9SZW1vdmUgPSBbXVxuXG4gIGZvcm1EYXRhLmZvckVhY2goKHZhbCwga2V5LCBfaW5kZXgpID0+IHtcbiAgICBpZih2YWwgaW5zdGFuY2VvZiBGaWxlKXsgdG9SZW1vdmUucHVzaChrZXkpIH1cbiAgfSlcblxuICAvLyBDbGVhbnVwIGFmdGVyIGJ1aWxkaW5nIGZpbGVEYXRhXG4gIHRvUmVtb3ZlLmZvckVhY2goa2V5ID0+IGZvcm1EYXRhLmRlbGV0ZShrZXkpKVxuXG4gIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKVxuXG4gIGZvcihsZXQgW2tleSwgdmFsXSBvZiBmb3JtRGF0YS5lbnRyaWVzKCkpe1xuICAgIGlmKG9ubHlOYW1lcy5sZW5ndGggPT09IDAgfHwgb25seU5hbWVzLmluZGV4T2Yoa2V5KSA+PSAwKXtcbiAgICAgIHBhcmFtcy5hcHBlbmQoa2V5LCB2YWwpXG4gICAgfVxuICB9XG5cbiAgLy8gcmVtb3ZlIHRoZSBpbmplY3RlZCBlbGVtZW50IGFnYWluXG4gIC8vIChpdCB3b3VsZCBiZSByZW1vdmVkIGJ5IHRoZSBuZXh0IGRvbSBwYXRjaCBhbnl3YXksIGJ1dCB0aGlzIGlzIGNsZWFuZXIpXG4gIGlmKHN1Ym1pdHRlciAmJiBpbmplY3RlZEVsZW1lbnQpe1xuICAgIHN1Ym1pdHRlci5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGluamVjdGVkRWxlbWVudClcbiAgfVxuXG4gIGZvcihsZXQgbWV0YUtleSBpbiBtZXRhKXsgcGFyYW1zLmFwcGVuZChtZXRhS2V5LCBtZXRhW21ldGFLZXldKSB9XG5cbiAgcmV0dXJuIHBhcmFtcy50b1N0cmluZygpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXcge1xuICBjb25zdHJ1Y3RvcihlbCwgbGl2ZVNvY2tldCwgcGFyZW50VmlldywgZmxhc2gsIGxpdmVSZWZlcmVyKXtcbiAgICB0aGlzLmlzRGVhZCA9IGZhbHNlXG4gICAgdGhpcy5saXZlU29ja2V0ID0gbGl2ZVNvY2tldFxuICAgIHRoaXMuZmxhc2ggPSBmbGFzaFxuICAgIHRoaXMucGFyZW50ID0gcGFyZW50Vmlld1xuICAgIHRoaXMucm9vdCA9IHBhcmVudFZpZXcgPyBwYXJlbnRWaWV3LnJvb3QgOiB0aGlzXG4gICAgdGhpcy5lbCA9IGVsXG4gICAgdGhpcy5pZCA9IHRoaXMuZWwuaWRcbiAgICB0aGlzLnJlZiA9IDBcbiAgICB0aGlzLmNoaWxkSm9pbnMgPSAwXG4gICAgdGhpcy5sb2FkZXJUaW1lciA9IG51bGxcbiAgICB0aGlzLnBlbmRpbmdEaWZmcyA9IFtdXG4gICAgdGhpcy5wcnVuaW5nQ0lEcyA9IFtdXG4gICAgdGhpcy5yZWRpcmVjdCA9IGZhbHNlXG4gICAgdGhpcy5ocmVmID0gbnVsbFxuICAgIHRoaXMuam9pbkNvdW50ID0gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5qb2luQ291bnQgLSAxIDogMFxuICAgIHRoaXMuam9pblBlbmRpbmcgPSB0cnVlXG4gICAgdGhpcy5kZXN0cm95ZWQgPSBmYWxzZVxuICAgIHRoaXMuam9pbkNhbGxiYWNrID0gZnVuY3Rpb24ob25Eb25lKXsgb25Eb25lICYmIG9uRG9uZSgpIH1cbiAgICB0aGlzLnN0b3BDYWxsYmFjayA9IGZ1bmN0aW9uKCl7IH1cbiAgICB0aGlzLnBlbmRpbmdKb2luT3BzID0gdGhpcy5wYXJlbnQgPyBudWxsIDogW11cbiAgICB0aGlzLnZpZXdIb29rcyA9IHt9XG4gICAgdGhpcy51cGxvYWRlcnMgPSB7fVxuICAgIHRoaXMuZm9ybVN1Ym1pdHMgPSBbXVxuICAgIHRoaXMuY2hpbGRyZW4gPSB0aGlzLnBhcmVudCA/IG51bGwgOiB7fVxuICAgIHRoaXMucm9vdC5jaGlsZHJlblt0aGlzLmlkXSA9IHt9XG4gICAgdGhpcy5jaGFubmVsID0gdGhpcy5saXZlU29ja2V0LmNoYW5uZWwoYGx2OiR7dGhpcy5pZH1gLCAoKSA9PiB7XG4gICAgICBsZXQgdXJsID0gdGhpcy5ocmVmICYmIHRoaXMuZXhwYW5kVVJMKHRoaXMuaHJlZilcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlZGlyZWN0OiB0aGlzLnJlZGlyZWN0ID8gdXJsIDogdW5kZWZpbmVkLFxuICAgICAgICB1cmw6IHRoaXMucmVkaXJlY3QgPyB1bmRlZmluZWQgOiB1cmwgfHwgdW5kZWZpbmVkLFxuICAgICAgICBwYXJhbXM6IHRoaXMuY29ubmVjdFBhcmFtcyhsaXZlUmVmZXJlciksXG4gICAgICAgIHNlc3Npb246IHRoaXMuZ2V0U2Vzc2lvbigpLFxuICAgICAgICBzdGF0aWM6IHRoaXMuZ2V0U3RhdGljKCksXG4gICAgICAgIGZsYXNoOiB0aGlzLmZsYXNoLFxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBzZXRIcmVmKGhyZWYpeyB0aGlzLmhyZWYgPSBocmVmIH1cblxuICBzZXRSZWRpcmVjdChocmVmKXtcbiAgICB0aGlzLnJlZGlyZWN0ID0gdHJ1ZVxuICAgIHRoaXMuaHJlZiA9IGhyZWZcbiAgfVxuXG4gIGlzTWFpbigpeyByZXR1cm4gdGhpcy5lbC5oYXNBdHRyaWJ1dGUoUEhYX01BSU4pIH1cblxuICBjb25uZWN0UGFyYW1zKGxpdmVSZWZlcmVyKXtcbiAgICBsZXQgcGFyYW1zID0gdGhpcy5saXZlU29ja2V0LnBhcmFtcyh0aGlzLmVsKVxuICAgIGxldCBtYW5pZmVzdCA9XG4gICAgICBET00uYWxsKGRvY3VtZW50LCBgWyR7dGhpcy5iaW5kaW5nKFBIWF9UUkFDS19TVEFUSUMpfV1gKVxuICAgICAgICAubWFwKG5vZGUgPT4gbm9kZS5zcmMgfHwgbm9kZS5ocmVmKS5maWx0ZXIodXJsID0+IHR5cGVvZiAodXJsKSA9PT0gXCJzdHJpbmdcIilcblxuICAgIGlmKG1hbmlmZXN0Lmxlbmd0aCA+IDApeyBwYXJhbXNbXCJfdHJhY2tfc3RhdGljXCJdID0gbWFuaWZlc3QgfVxuICAgIHBhcmFtc1tcIl9tb3VudHNcIl0gPSB0aGlzLmpvaW5Db3VudFxuICAgIHBhcmFtc1tcIl9saXZlX3JlZmVyZXJcIl0gPSBsaXZlUmVmZXJlclxuXG4gICAgcmV0dXJuIHBhcmFtc1xuICB9XG5cbiAgaXNDb25uZWN0ZWQoKXsgcmV0dXJuIHRoaXMuY2hhbm5lbC5jYW5QdXNoKCkgfVxuXG4gIGdldFNlc3Npb24oKXsgcmV0dXJuIHRoaXMuZWwuZ2V0QXR0cmlidXRlKFBIWF9TRVNTSU9OKSB9XG5cbiAgZ2V0U3RhdGljKCl7XG4gICAgbGV0IHZhbCA9IHRoaXMuZWwuZ2V0QXR0cmlidXRlKFBIWF9TVEFUSUMpXG4gICAgcmV0dXJuIHZhbCA9PT0gXCJcIiA/IG51bGwgOiB2YWxcbiAgfVxuXG4gIGRlc3Ryb3koY2FsbGJhY2sgPSBmdW5jdGlvbiAoKXsgfSl7XG4gICAgdGhpcy5kZXN0cm95QWxsQ2hpbGRyZW4oKVxuICAgIHRoaXMuZGVzdHJveWVkID0gdHJ1ZVxuICAgIGRlbGV0ZSB0aGlzLnJvb3QuY2hpbGRyZW5bdGhpcy5pZF1cbiAgICBpZih0aGlzLnBhcmVudCl7IGRlbGV0ZSB0aGlzLnJvb3QuY2hpbGRyZW5bdGhpcy5wYXJlbnQuaWRdW3RoaXMuaWRdIH1cbiAgICBjbGVhclRpbWVvdXQodGhpcy5sb2FkZXJUaW1lcilcbiAgICBsZXQgb25GaW5pc2hlZCA9ICgpID0+IHtcbiAgICAgIGNhbGxiYWNrKClcbiAgICAgIGZvcihsZXQgaWQgaW4gdGhpcy52aWV3SG9va3Mpe1xuICAgICAgICB0aGlzLmRlc3Ryb3lIb29rKHRoaXMudmlld0hvb2tzW2lkXSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBET00ubWFya1BoeENoaWxkRGVzdHJveWVkKHRoaXMuZWwpXG5cbiAgICB0aGlzLmxvZyhcImRlc3Ryb3llZFwiLCAoKSA9PiBbXCJ0aGUgY2hpbGQgaGFzIGJlZW4gcmVtb3ZlZCBmcm9tIHRoZSBwYXJlbnRcIl0pXG4gICAgdGhpcy5jaGFubmVsLmxlYXZlKClcbiAgICAgIC5yZWNlaXZlKFwib2tcIiwgb25GaW5pc2hlZClcbiAgICAgIC5yZWNlaXZlKFwiZXJyb3JcIiwgb25GaW5pc2hlZClcbiAgICAgIC5yZWNlaXZlKFwidGltZW91dFwiLCBvbkZpbmlzaGVkKVxuICB9XG5cbiAgc2V0Q29udGFpbmVyQ2xhc3NlcyguLi5jbGFzc2VzKXtcbiAgICB0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoXG4gICAgICBQSFhfQ09OTkVDVEVEX0NMQVNTLFxuICAgICAgUEhYX0xPQURJTkdfQ0xBU1MsXG4gICAgICBQSFhfRVJST1JfQ0xBU1MsXG4gICAgICBQSFhfQ0xJRU5UX0VSUk9SX0NMQVNTLFxuICAgICAgUEhYX1NFUlZFUl9FUlJPUl9DTEFTU1xuICAgIClcbiAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoLi4uY2xhc3NlcylcbiAgfVxuXG4gIHNob3dMb2FkZXIodGltZW91dCl7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMubG9hZGVyVGltZXIpXG4gICAgaWYodGltZW91dCl7XG4gICAgICB0aGlzLmxvYWRlclRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLnNob3dMb2FkZXIoKSwgdGltZW91dClcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yKGxldCBpZCBpbiB0aGlzLnZpZXdIb29rcyl7IHRoaXMudmlld0hvb2tzW2lkXS5fX2Rpc2Nvbm5lY3RlZCgpIH1cbiAgICAgIHRoaXMuc2V0Q29udGFpbmVyQ2xhc3NlcyhQSFhfTE9BRElOR19DTEFTUylcbiAgICB9XG4gIH1cblxuICBleGVjQWxsKGJpbmRpbmcpe1xuICAgIERPTS5hbGwodGhpcy5lbCwgYFske2JpbmRpbmd9XWAsIGVsID0+IHRoaXMubGl2ZVNvY2tldC5leGVjSlMoZWwsIGVsLmdldEF0dHJpYnV0ZShiaW5kaW5nKSkpXG4gIH1cblxuICBoaWRlTG9hZGVyKCl7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMubG9hZGVyVGltZXIpXG4gICAgdGhpcy5zZXRDb250YWluZXJDbGFzc2VzKFBIWF9DT05ORUNURURfQ0xBU1MpXG4gICAgdGhpcy5leGVjQWxsKHRoaXMuYmluZGluZyhcImNvbm5lY3RlZFwiKSlcbiAgfVxuXG4gIHRyaWdnZXJSZWNvbm5lY3RlZCgpe1xuICAgIGZvcihsZXQgaWQgaW4gdGhpcy52aWV3SG9va3MpeyB0aGlzLnZpZXdIb29rc1tpZF0uX19yZWNvbm5lY3RlZCgpIH1cbiAgfVxuXG4gIGxvZyhraW5kLCBtc2dDYWxsYmFjayl7XG4gICAgdGhpcy5saXZlU29ja2V0LmxvZyh0aGlzLCBraW5kLCBtc2dDYWxsYmFjaylcbiAgfVxuXG4gIHRyYW5zaXRpb24odGltZSwgb25TdGFydCwgb25Eb25lID0gZnVuY3Rpb24oKXt9KXtcbiAgICB0aGlzLmxpdmVTb2NrZXQudHJhbnNpdGlvbih0aW1lLCBvblN0YXJ0LCBvbkRvbmUpXG4gIH1cblxuICB3aXRoaW5UYXJnZXRzKHBoeFRhcmdldCwgY2FsbGJhY2spe1xuICAgIGlmKHBoeFRhcmdldCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50IHx8IHBoeFRhcmdldCBpbnN0YW5jZW9mIFNWR0VsZW1lbnQpe1xuICAgICAgcmV0dXJuIHRoaXMubGl2ZVNvY2tldC5vd25lcihwaHhUYXJnZXQsIHZpZXcgPT4gY2FsbGJhY2sodmlldywgcGh4VGFyZ2V0KSlcbiAgICB9XG5cbiAgICBpZihpc0NpZChwaHhUYXJnZXQpKXtcbiAgICAgIGxldCB0YXJnZXRzID0gRE9NLmZpbmRDb21wb25lbnROb2RlTGlzdCh0aGlzLmVsLCBwaHhUYXJnZXQpXG4gICAgICBpZih0YXJnZXRzLmxlbmd0aCA9PT0gMCl7XG4gICAgICAgIGxvZ0Vycm9yKGBubyBjb21wb25lbnQgZm91bmQgbWF0Y2hpbmcgcGh4LXRhcmdldCBvZiAke3BoeFRhcmdldH1gKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2sodGhpcywgcGFyc2VJbnQocGh4VGFyZ2V0KSlcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHRhcmdldHMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocGh4VGFyZ2V0KSlcbiAgICAgIGlmKHRhcmdldHMubGVuZ3RoID09PSAwKXsgbG9nRXJyb3IoYG5vdGhpbmcgZm91bmQgbWF0Y2hpbmcgdGhlIHBoeC10YXJnZXQgc2VsZWN0b3IgXCIke3BoeFRhcmdldH1cImApIH1cbiAgICAgIHRhcmdldHMuZm9yRWFjaCh0YXJnZXQgPT4gdGhpcy5saXZlU29ja2V0Lm93bmVyKHRhcmdldCwgdmlldyA9PiBjYWxsYmFjayh2aWV3LCB0YXJnZXQpKSlcbiAgICB9XG4gIH1cblxuICBhcHBseURpZmYodHlwZSwgcmF3RGlmZiwgY2FsbGJhY2spe1xuICAgIHRoaXMubG9nKHR5cGUsICgpID0+IFtcIlwiLCBjbG9uZShyYXdEaWZmKV0pXG4gICAgbGV0IHtkaWZmLCByZXBseSwgZXZlbnRzLCB0aXRsZX0gPSBSZW5kZXJlZC5leHRyYWN0KHJhd0RpZmYpXG4gICAgY2FsbGJhY2soe2RpZmYsIHJlcGx5LCBldmVudHN9KVxuICAgIGlmKHRpdGxlKXsgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBET00ucHV0VGl0bGUodGl0bGUpKSB9XG4gIH1cblxuICBvbkpvaW4ocmVzcCl7XG4gICAgbGV0IHtyZW5kZXJlZCwgY29udGFpbmVyfSA9IHJlc3BcbiAgICBpZihjb250YWluZXIpe1xuICAgICAgbGV0IFt0YWcsIGF0dHJzXSA9IGNvbnRhaW5lclxuICAgICAgdGhpcy5lbCA9IERPTS5yZXBsYWNlUm9vdENvbnRhaW5lcih0aGlzLmVsLCB0YWcsIGF0dHJzKVxuICAgIH1cbiAgICB0aGlzLmNoaWxkSm9pbnMgPSAwXG4gICAgdGhpcy5qb2luUGVuZGluZyA9IHRydWVcbiAgICB0aGlzLmZsYXNoID0gbnVsbFxuXG4gICAgQnJvd3Nlci5kcm9wTG9jYWwodGhpcy5saXZlU29ja2V0LmxvY2FsU3RvcmFnZSwgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLCBDT05TRUNVVElWRV9SRUxPQURTKVxuICAgIHRoaXMuYXBwbHlEaWZmKFwibW91bnRcIiwgcmVuZGVyZWQsICh7ZGlmZiwgZXZlbnRzfSkgPT4ge1xuICAgICAgdGhpcy5yZW5kZXJlZCA9IG5ldyBSZW5kZXJlZCh0aGlzLmlkLCBkaWZmKVxuICAgICAgbGV0IFtodG1sLCBzdHJlYW1zXSA9IHRoaXMucmVuZGVyQ29udGFpbmVyKG51bGwsIFwiam9pblwiKVxuICAgICAgdGhpcy5kcm9wUGVuZGluZ1JlZnMoKVxuICAgICAgbGV0IGZvcm1zID0gdGhpcy5mb3Jtc0ZvclJlY292ZXJ5KGh0bWwpXG4gICAgICB0aGlzLmpvaW5Db3VudCsrXG5cbiAgICAgIGlmKGZvcm1zLmxlbmd0aCA+IDApe1xuICAgICAgICBmb3Jtcy5mb3JFYWNoKChbZm9ybSwgbmV3Rm9ybSwgbmV3Q2lkXSwgaSkgPT4ge1xuICAgICAgICAgIHRoaXMucHVzaEZvcm1SZWNvdmVyeShmb3JtLCBuZXdDaWQsIHJlc3AgPT4ge1xuICAgICAgICAgICAgaWYoaSA9PT0gZm9ybXMubGVuZ3RoIC0gMSl7XG4gICAgICAgICAgICAgIHRoaXMub25Kb2luQ29tcGxldGUocmVzcCwgaHRtbCwgc3RyZWFtcywgZXZlbnRzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9uSm9pbkNvbXBsZXRlKHJlc3AsIGh0bWwsIHN0cmVhbXMsIGV2ZW50cylcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZHJvcFBlbmRpbmdSZWZzKCl7XG4gICAgRE9NLmFsbChkb2N1bWVudCwgYFske1BIWF9SRUZfU1JDfT1cIiR7dGhpcy5pZH1cIl1bJHtQSFhfUkVGfV1gLCBlbCA9PiB7XG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoUEhYX1JFRilcbiAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShQSFhfUkVGX1NSQylcbiAgICB9KVxuICB9XG5cbiAgb25Kb2luQ29tcGxldGUoe2xpdmVfcGF0Y2h9LCBodG1sLCBzdHJlYW1zLCBldmVudHMpe1xuICAgIC8vIEluIG9yZGVyIHRvIHByb3ZpZGUgYSBiZXR0ZXIgZXhwZXJpZW5jZSwgd2Ugd2FudCB0byBqb2luXG4gICAgLy8gYWxsIExpdmVWaWV3cyBmaXJzdCBhbmQgb25seSB0aGVuIGFwcGx5IHRoZWlyIHBhdGNoZXMuXG4gICAgaWYodGhpcy5qb2luQ291bnQgPiAxIHx8ICh0aGlzLnBhcmVudCAmJiAhdGhpcy5wYXJlbnQuaXNKb2luUGVuZGluZygpKSl7XG4gICAgICByZXR1cm4gdGhpcy5hcHBseUpvaW5QYXRjaChsaXZlX3BhdGNoLCBodG1sLCBzdHJlYW1zLCBldmVudHMpXG4gICAgfVxuXG4gICAgLy8gT25lIGRvd25zaWRlIG9mIHRoaXMgYXBwcm9hY2ggaXMgdGhhdCB3ZSBuZWVkIHRvIGZpbmQgcGh4Q2hpbGRyZW5cbiAgICAvLyBpbiB0aGUgaHRtbCBmcmFnbWVudCwgaW5zdGVhZCBvZiBkaXJlY3RseSBvbiB0aGUgRE9NLiBUaGUgZnJhZ21lbnRcbiAgICAvLyBhbHNvIGRvZXMgbm90IGluY2x1ZGUgUEhYX1NUQVRJQywgc28gd2UgbmVlZCB0byBjb3B5IGl0IG92ZXIgZnJvbVxuICAgIC8vIHRoZSBET00uXG4gICAgbGV0IG5ld0NoaWxkcmVuID0gRE9NLmZpbmRQaHhDaGlsZHJlbkluRnJhZ21lbnQoaHRtbCwgdGhpcy5pZCkuZmlsdGVyKHRvRWwgPT4ge1xuICAgICAgbGV0IGZyb21FbCA9IHRvRWwuaWQgJiYgdGhpcy5lbC5xdWVyeVNlbGVjdG9yKGBbaWQ9XCIke3RvRWwuaWR9XCJdYClcbiAgICAgIGxldCBwaHhTdGF0aWMgPSBmcm9tRWwgJiYgZnJvbUVsLmdldEF0dHJpYnV0ZShQSFhfU1RBVElDKVxuICAgICAgaWYocGh4U3RhdGljKXsgdG9FbC5zZXRBdHRyaWJ1dGUoUEhYX1NUQVRJQywgcGh4U3RhdGljKSB9XG4gICAgICAvLyBzZXQgUEhYX1JPT1RfSUQgdG8gcHJldmVudCBldmVudHMgZnJvbSBiZWluZyBkaXNwYXRjaGVkIHRvIHRoZSByb290IHZpZXdcbiAgICAgIC8vIHdoaWxlIHRoZSBjaGlsZCBqb2luIGlzIHN0aWxsIHBlbmRpbmdcbiAgICAgIGlmKGZyb21FbCl7IGZyb21FbC5zZXRBdHRyaWJ1dGUoUEhYX1JPT1RfSUQsIHRoaXMucm9vdC5pZCkgfVxuICAgICAgcmV0dXJuIHRoaXMuam9pbkNoaWxkKHRvRWwpXG4gICAgfSlcblxuICAgIGlmKG5ld0NoaWxkcmVuLmxlbmd0aCA9PT0gMCl7XG4gICAgICBpZih0aGlzLnBhcmVudCl7XG4gICAgICAgIHRoaXMucm9vdC5wZW5kaW5nSm9pbk9wcy5wdXNoKFt0aGlzLCAoKSA9PiB0aGlzLmFwcGx5Sm9pblBhdGNoKGxpdmVfcGF0Y2gsIGh0bWwsIHN0cmVhbXMsIGV2ZW50cyldKVxuICAgICAgICB0aGlzLnBhcmVudC5hY2tKb2luKHRoaXMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9uQWxsQ2hpbGRKb2luc0NvbXBsZXRlKClcbiAgICAgICAgdGhpcy5hcHBseUpvaW5QYXRjaChsaXZlX3BhdGNoLCBodG1sLCBzdHJlYW1zLCBldmVudHMpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucm9vdC5wZW5kaW5nSm9pbk9wcy5wdXNoKFt0aGlzLCAoKSA9PiB0aGlzLmFwcGx5Sm9pblBhdGNoKGxpdmVfcGF0Y2gsIGh0bWwsIHN0cmVhbXMsIGV2ZW50cyldKVxuICAgIH1cbiAgfVxuXG4gIGF0dGFjaFRydWVEb2NFbCgpe1xuICAgIHRoaXMuZWwgPSBET00uYnlJZCh0aGlzLmlkKVxuICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKFBIWF9ST09UX0lELCB0aGlzLnJvb3QuaWQpXG4gIH1cblxuICBleGVjTmV3TW91bnRlZCgpe1xuICAgIGxldCBwaHhWaWV3cG9ydFRvcCA9IHRoaXMuYmluZGluZyhQSFhfVklFV1BPUlRfVE9QKVxuICAgIGxldCBwaHhWaWV3cG9ydEJvdHRvbSA9IHRoaXMuYmluZGluZyhQSFhfVklFV1BPUlRfQk9UVE9NKVxuICAgIERPTS5hbGwodGhpcy5lbCwgYFske3BoeFZpZXdwb3J0VG9wfV0sIFske3BoeFZpZXdwb3J0Qm90dG9tfV1gLCBob29rRWwgPT4ge1xuICAgICAgRE9NLm1heWJlQWRkUHJpdmF0ZUhvb2tzKGhvb2tFbCwgcGh4Vmlld3BvcnRUb3AsIHBoeFZpZXdwb3J0Qm90dG9tKVxuICAgICAgdGhpcy5tYXliZUFkZE5ld0hvb2soaG9va0VsKVxuICAgIH0pXG4gICAgRE9NLmFsbCh0aGlzLmVsLCBgWyR7dGhpcy5iaW5kaW5nKFBIWF9IT09LKX1dLCBbZGF0YS1waHgtJHtQSFhfSE9PS31dYCwgaG9va0VsID0+IHtcbiAgICAgIHRoaXMubWF5YmVBZGROZXdIb29rKGhvb2tFbClcbiAgICB9KVxuICAgIERPTS5hbGwodGhpcy5lbCwgYFske3RoaXMuYmluZGluZyhQSFhfTU9VTlRFRCl9XWAsIGVsID0+IHRoaXMubWF5YmVNb3VudGVkKGVsKSlcbiAgfVxuXG4gIGFwcGx5Sm9pblBhdGNoKGxpdmVfcGF0Y2gsIGh0bWwsIHN0cmVhbXMsIGV2ZW50cyl7XG4gICAgdGhpcy5hdHRhY2hUcnVlRG9jRWwoKVxuICAgIGxldCBwYXRjaCA9IG5ldyBET01QYXRjaCh0aGlzLCB0aGlzLmVsLCB0aGlzLmlkLCBodG1sLCBzdHJlYW1zLCBudWxsKVxuICAgIHBhdGNoLm1hcmtQcnVuYWJsZUNvbnRlbnRGb3JSZW1vdmFsKClcbiAgICB0aGlzLnBlcmZvcm1QYXRjaChwYXRjaCwgZmFsc2UsIHRydWUpXG4gICAgdGhpcy5qb2luTmV3Q2hpbGRyZW4oKVxuICAgIHRoaXMuZXhlY05ld01vdW50ZWQoKVxuXG4gICAgdGhpcy5qb2luUGVuZGluZyA9IGZhbHNlXG4gICAgdGhpcy5saXZlU29ja2V0LmRpc3BhdGNoRXZlbnRzKGV2ZW50cylcbiAgICB0aGlzLmFwcGx5UGVuZGluZ1VwZGF0ZXMoKVxuXG4gICAgaWYobGl2ZV9wYXRjaCl7XG4gICAgICBsZXQge2tpbmQsIHRvfSA9IGxpdmVfcGF0Y2hcbiAgICAgIHRoaXMubGl2ZVNvY2tldC5oaXN0b3J5UGF0Y2godG8sIGtpbmQpXG4gICAgfVxuICAgIHRoaXMuaGlkZUxvYWRlcigpXG4gICAgaWYodGhpcy5qb2luQ291bnQgPiAxKXsgdGhpcy50cmlnZ2VyUmVjb25uZWN0ZWQoKSB9XG4gICAgdGhpcy5zdG9wQ2FsbGJhY2soKVxuICB9XG5cbiAgdHJpZ2dlckJlZm9yZVVwZGF0ZUhvb2soZnJvbUVsLCB0b0VsKXtcbiAgICB0aGlzLmxpdmVTb2NrZXQudHJpZ2dlckRPTShcIm9uQmVmb3JlRWxVcGRhdGVkXCIsIFtmcm9tRWwsIHRvRWxdKVxuICAgIGxldCBob29rID0gdGhpcy5nZXRIb29rKGZyb21FbClcbiAgICBsZXQgaXNJZ25vcmVkID0gaG9vayAmJiBET00uaXNJZ25vcmVkKGZyb21FbCwgdGhpcy5iaW5kaW5nKFBIWF9VUERBVEUpKVxuICAgIGlmKGhvb2sgJiYgIWZyb21FbC5pc0VxdWFsTm9kZSh0b0VsKSAmJiAhKGlzSWdub3JlZCAmJiBpc0VxdWFsT2JqKGZyb21FbC5kYXRhc2V0LCB0b0VsLmRhdGFzZXQpKSl7XG4gICAgICBob29rLl9fYmVmb3JlVXBkYXRlKClcbiAgICAgIHJldHVybiBob29rXG4gICAgfVxuICB9XG5cbiAgbWF5YmVNb3VudGVkKGVsKXtcbiAgICBsZXQgcGh4TW91bnRlZCA9IGVsLmdldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoUEhYX01PVU5URUQpKVxuICAgIGxldCBoYXNCZWVuSW52b2tlZCA9IHBoeE1vdW50ZWQgJiYgRE9NLnByaXZhdGUoZWwsIFwibW91bnRlZFwiKVxuICAgIGlmKHBoeE1vdW50ZWQgJiYgIWhhc0JlZW5JbnZva2VkKXtcbiAgICAgIHRoaXMubGl2ZVNvY2tldC5leGVjSlMoZWwsIHBoeE1vdW50ZWQpXG4gICAgICBET00ucHV0UHJpdmF0ZShlbCwgXCJtb3VudGVkXCIsIHRydWUpXG4gICAgfVxuICB9XG5cbiAgbWF5YmVBZGROZXdIb29rKGVsLCBmb3JjZSl7XG4gICAgbGV0IG5ld0hvb2sgPSB0aGlzLmFkZEhvb2soZWwpXG4gICAgaWYobmV3SG9vayl7IG5ld0hvb2suX19tb3VudGVkKCkgfVxuICB9XG5cbiAgcGVyZm9ybVBhdGNoKHBhdGNoLCBwcnVuZUNpZHMsIGlzSm9pblBhdGNoID0gZmFsc2Upe1xuICAgIGxldCByZW1vdmVkRWxzID0gW11cbiAgICBsZXQgcGh4Q2hpbGRyZW5BZGRlZCA9IGZhbHNlXG4gICAgbGV0IHVwZGF0ZWRIb29rSWRzID0gbmV3IFNldCgpXG5cbiAgICBwYXRjaC5hZnRlcihcImFkZGVkXCIsIGVsID0+IHtcbiAgICAgIHRoaXMubGl2ZVNvY2tldC50cmlnZ2VyRE9NKFwib25Ob2RlQWRkZWRcIiwgW2VsXSlcbiAgICAgIGxldCBwaHhWaWV3cG9ydFRvcCA9IHRoaXMuYmluZGluZyhQSFhfVklFV1BPUlRfVE9QKVxuICAgICAgbGV0IHBoeFZpZXdwb3J0Qm90dG9tID0gdGhpcy5iaW5kaW5nKFBIWF9WSUVXUE9SVF9CT1RUT00pXG4gICAgICBET00ubWF5YmVBZGRQcml2YXRlSG9va3MoZWwsIHBoeFZpZXdwb3J0VG9wLCBwaHhWaWV3cG9ydEJvdHRvbSlcbiAgICAgIHRoaXMubWF5YmVBZGROZXdIb29rKGVsKVxuICAgICAgaWYoZWwuZ2V0QXR0cmlidXRlKXsgdGhpcy5tYXliZU1vdW50ZWQoZWwpIH1cbiAgICB9KVxuXG4gICAgcGF0Y2guYWZ0ZXIoXCJwaHhDaGlsZEFkZGVkXCIsIGVsID0+IHtcbiAgICAgIGlmKERPTS5pc1BoeFN0aWNreShlbCkpe1xuICAgICAgICB0aGlzLmxpdmVTb2NrZXQuam9pblJvb3RWaWV3cygpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwaHhDaGlsZHJlbkFkZGVkID0gdHJ1ZVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBwYXRjaC5iZWZvcmUoXCJ1cGRhdGVkXCIsIChmcm9tRWwsIHRvRWwpID0+IHtcbiAgICAgIGxldCBob29rID0gdGhpcy50cmlnZ2VyQmVmb3JlVXBkYXRlSG9vayhmcm9tRWwsIHRvRWwpXG4gICAgICBpZihob29rKXsgdXBkYXRlZEhvb2tJZHMuYWRkKGZyb21FbC5pZCkgfVxuICAgIH0pXG5cbiAgICBwYXRjaC5hZnRlcihcInVwZGF0ZWRcIiwgZWwgPT4ge1xuICAgICAgaWYodXBkYXRlZEhvb2tJZHMuaGFzKGVsLmlkKSl7IHRoaXMuZ2V0SG9vayhlbCkuX191cGRhdGVkKCkgfVxuICAgIH0pXG5cbiAgICBwYXRjaC5hZnRlcihcImRpc2NhcmRlZFwiLCAoZWwpID0+IHtcbiAgICAgIGlmKGVsLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSl7IHJlbW92ZWRFbHMucHVzaChlbCkgfVxuICAgIH0pXG5cbiAgICBwYXRjaC5hZnRlcihcInRyYW5zaXRpb25zRGlzY2FyZGVkXCIsIGVscyA9PiB0aGlzLmFmdGVyRWxlbWVudHNSZW1vdmVkKGVscywgcHJ1bmVDaWRzKSlcbiAgICBwYXRjaC5wZXJmb3JtKGlzSm9pblBhdGNoKVxuICAgIHRoaXMuYWZ0ZXJFbGVtZW50c1JlbW92ZWQocmVtb3ZlZEVscywgcHJ1bmVDaWRzKVxuXG4gICAgcmV0dXJuIHBoeENoaWxkcmVuQWRkZWRcbiAgfVxuXG4gIGFmdGVyRWxlbWVudHNSZW1vdmVkKGVsZW1lbnRzLCBwcnVuZUNpZHMpe1xuICAgIGxldCBkZXN0cm95ZWRDSURzID0gW11cbiAgICBlbGVtZW50cy5mb3JFYWNoKHBhcmVudCA9PiB7XG4gICAgICBsZXQgY29tcG9uZW50cyA9IERPTS5hbGwocGFyZW50LCBgWyR7UEhYX0NPTVBPTkVOVH1dYClcbiAgICAgIGxldCBob29rcyA9IERPTS5hbGwocGFyZW50LCBgWyR7dGhpcy5iaW5kaW5nKFBIWF9IT09LKX1dYClcbiAgICAgIGNvbXBvbmVudHMuY29uY2F0KHBhcmVudCkuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgIGxldCBjaWQgPSB0aGlzLmNvbXBvbmVudElEKGVsKVxuICAgICAgICBpZihpc0NpZChjaWQpICYmIGRlc3Ryb3llZENJRHMuaW5kZXhPZihjaWQpID09PSAtMSl7IGRlc3Ryb3llZENJRHMucHVzaChjaWQpIH1cbiAgICAgIH0pXG4gICAgICBob29rcy5jb25jYXQocGFyZW50KS5mb3JFYWNoKGhvb2tFbCA9PiB7XG4gICAgICAgIGxldCBob29rID0gdGhpcy5nZXRIb29rKGhvb2tFbClcbiAgICAgICAgaG9vayAmJiB0aGlzLmRlc3Ryb3lIb29rKGhvb2spXG4gICAgICB9KVxuICAgIH0pXG4gICAgLy8gV2Ugc2hvdWxkIG5vdCBwcnVuZUNpZHMgb24gam9pbnMuIE90aGVyd2lzZSwgaW4gY2FzZSBvZlxuICAgIC8vIHJlam9pbnMsIHdlIG1heSBub3RpZnkgY2lkcyB0aGF0IG5vIGxvbmdlciBiZWxvbmcgdG8gdGhlXG4gICAgLy8gY3VycmVudCBMaXZlVmlldyB0byBiZSByZW1vdmVkLlxuICAgIGlmKHBydW5lQ2lkcyl7XG4gICAgICB0aGlzLm1heWJlUHVzaENvbXBvbmVudHNEZXN0cm95ZWQoZGVzdHJveWVkQ0lEcylcbiAgICB9XG4gIH1cblxuICBqb2luTmV3Q2hpbGRyZW4oKXtcbiAgICBET00uZmluZFBoeENoaWxkcmVuKHRoaXMuZWwsIHRoaXMuaWQpLmZvckVhY2goZWwgPT4gdGhpcy5qb2luQ2hpbGQoZWwpKVxuICB9XG5cbiAgZ2V0Q2hpbGRCeUlkKGlkKXsgcmV0dXJuIHRoaXMucm9vdC5jaGlsZHJlblt0aGlzLmlkXVtpZF0gfVxuXG4gIGdldERlc2NlbmRlbnRCeUVsKGVsKXtcbiAgICBpZihlbC5pZCA9PT0gdGhpcy5pZCl7XG4gICAgICByZXR1cm4gdGhpc1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbltlbC5nZXRBdHRyaWJ1dGUoUEhYX1BBUkVOVF9JRCldW2VsLmlkXVxuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3lEZXNjZW5kZW50KGlkKXtcbiAgICBmb3IobGV0IHBhcmVudElkIGluIHRoaXMucm9vdC5jaGlsZHJlbil7XG4gICAgICBmb3IobGV0IGNoaWxkSWQgaW4gdGhpcy5yb290LmNoaWxkcmVuW3BhcmVudElkXSl7XG4gICAgICAgIGlmKGNoaWxkSWQgPT09IGlkKXsgcmV0dXJuIHRoaXMucm9vdC5jaGlsZHJlbltwYXJlbnRJZF1bY2hpbGRJZF0uZGVzdHJveSgpIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBqb2luQ2hpbGQoZWwpe1xuICAgIGxldCBjaGlsZCA9IHRoaXMuZ2V0Q2hpbGRCeUlkKGVsLmlkKVxuICAgIGlmKCFjaGlsZCl7XG4gICAgICBsZXQgdmlldyA9IG5ldyBWaWV3KGVsLCB0aGlzLmxpdmVTb2NrZXQsIHRoaXMpXG4gICAgICB0aGlzLnJvb3QuY2hpbGRyZW5bdGhpcy5pZF1bdmlldy5pZF0gPSB2aWV3XG4gICAgICB2aWV3LmpvaW4oKVxuICAgICAgdGhpcy5jaGlsZEpvaW5zKytcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG5cbiAgaXNKb2luUGVuZGluZygpeyByZXR1cm4gdGhpcy5qb2luUGVuZGluZyB9XG5cbiAgYWNrSm9pbihfY2hpbGQpe1xuICAgIHRoaXMuY2hpbGRKb2lucy0tXG5cbiAgICBpZih0aGlzLmNoaWxkSm9pbnMgPT09IDApe1xuICAgICAgaWYodGhpcy5wYXJlbnQpe1xuICAgICAgICB0aGlzLnBhcmVudC5hY2tKb2luKHRoaXMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9uQWxsQ2hpbGRKb2luc0NvbXBsZXRlKClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbkFsbENoaWxkSm9pbnNDb21wbGV0ZSgpe1xuICAgIHRoaXMuam9pbkNhbGxiYWNrKCgpID0+IHtcbiAgICAgIHRoaXMucGVuZGluZ0pvaW5PcHMuZm9yRWFjaCgoW3ZpZXcsIG9wXSkgPT4ge1xuICAgICAgICBpZighdmlldy5pc0Rlc3Ryb3llZCgpKXsgb3AoKSB9XG4gICAgICB9KVxuICAgICAgdGhpcy5wZW5kaW5nSm9pbk9wcyA9IFtdXG4gICAgfSlcbiAgfVxuXG4gIHVwZGF0ZShkaWZmLCBldmVudHMpe1xuICAgIGlmKHRoaXMuaXNKb2luUGVuZGluZygpIHx8ICh0aGlzLmxpdmVTb2NrZXQuaGFzUGVuZGluZ0xpbmsoKSAmJiB0aGlzLnJvb3QuaXNNYWluKCkpKXtcbiAgICAgIHJldHVybiB0aGlzLnBlbmRpbmdEaWZmcy5wdXNoKHtkaWZmLCBldmVudHN9KVxuICAgIH1cblxuICAgIHRoaXMucmVuZGVyZWQubWVyZ2VEaWZmKGRpZmYpXG4gICAgbGV0IHBoeENoaWxkcmVuQWRkZWQgPSBmYWxzZVxuXG4gICAgLy8gV2hlbiB0aGUgZGlmZiBvbmx5IGNvbnRhaW5zIGNvbXBvbmVudCBkaWZmcywgdGhlbiB3YWxrIGNvbXBvbmVudHNcbiAgICAvLyBhbmQgcGF0Y2ggb25seSB0aGUgcGFyZW50IGNvbXBvbmVudCBjb250YWluZXJzIGZvdW5kIGluIHRoZSBkaWZmLlxuICAgIC8vIE90aGVyd2lzZSwgcGF0Y2ggZW50aXJlIExWIGNvbnRhaW5lci5cbiAgICBpZih0aGlzLnJlbmRlcmVkLmlzQ29tcG9uZW50T25seURpZmYoZGlmZikpe1xuICAgICAgdGhpcy5saXZlU29ja2V0LnRpbWUoXCJjb21wb25lbnQgcGF0Y2ggY29tcGxldGVcIiwgKCkgPT4ge1xuICAgICAgICBsZXQgcGFyZW50Q2lkcyA9IERPTS5maW5kUGFyZW50Q0lEcyh0aGlzLmVsLCB0aGlzLnJlbmRlcmVkLmNvbXBvbmVudENJRHMoZGlmZikpXG4gICAgICAgIHBhcmVudENpZHMuZm9yRWFjaChwYXJlbnRDSUQgPT4ge1xuICAgICAgICAgIGlmKHRoaXMuY29tcG9uZW50UGF0Y2godGhpcy5yZW5kZXJlZC5nZXRDb21wb25lbnQoZGlmZiwgcGFyZW50Q0lEKSwgcGFyZW50Q0lEKSl7IHBoeENoaWxkcmVuQWRkZWQgPSB0cnVlIH1cbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSBlbHNlIGlmKCFpc0VtcHR5KGRpZmYpKXtcbiAgICAgIHRoaXMubGl2ZVNvY2tldC50aW1lKFwiZnVsbCBwYXRjaCBjb21wbGV0ZVwiLCAoKSA9PiB7XG4gICAgICAgIGxldCBbaHRtbCwgc3RyZWFtc10gPSB0aGlzLnJlbmRlckNvbnRhaW5lcihkaWZmLCBcInVwZGF0ZVwiKVxuICAgICAgICBsZXQgcGF0Y2ggPSBuZXcgRE9NUGF0Y2godGhpcywgdGhpcy5lbCwgdGhpcy5pZCwgaHRtbCwgc3RyZWFtcywgbnVsbClcbiAgICAgICAgcGh4Q2hpbGRyZW5BZGRlZCA9IHRoaXMucGVyZm9ybVBhdGNoKHBhdGNoLCB0cnVlKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLmxpdmVTb2NrZXQuZGlzcGF0Y2hFdmVudHMoZXZlbnRzKVxuICAgIGlmKHBoeENoaWxkcmVuQWRkZWQpeyB0aGlzLmpvaW5OZXdDaGlsZHJlbigpIH1cbiAgfVxuXG4gIHJlbmRlckNvbnRhaW5lcihkaWZmLCBraW5kKXtcbiAgICByZXR1cm4gdGhpcy5saXZlU29ja2V0LnRpbWUoYHRvU3RyaW5nIGRpZmYgKCR7a2luZH0pYCwgKCkgPT4ge1xuICAgICAgbGV0IHRhZyA9IHRoaXMuZWwudGFnTmFtZVxuICAgICAgLy8gRG9uJ3Qgc2tpcCBhbnkgY29tcG9uZW50IGluIHRoZSBkaWZmIG5vciBhbnkgbWFya2VkIGFzIHBydW5lZFxuICAgICAgLy8gKGFzIHRoZXkgbWF5IGhhdmUgYmVlbiBhZGRlZCBiYWNrKVxuICAgICAgbGV0IGNpZHMgPSBkaWZmID8gdGhpcy5yZW5kZXJlZC5jb21wb25lbnRDSURzKGRpZmYpLmNvbmNhdCh0aGlzLnBydW5pbmdDSURzKSA6IG51bGxcbiAgICAgIGxldCBbaHRtbCwgc3RyZWFtc10gPSB0aGlzLnJlbmRlcmVkLnRvU3RyaW5nKGNpZHMpXG4gICAgICByZXR1cm4gW2A8JHt0YWd9PiR7aHRtbH08LyR7dGFnfT5gLCBzdHJlYW1zXVxuICAgIH0pXG4gIH1cblxuICBjb21wb25lbnRQYXRjaChkaWZmLCBjaWQpe1xuICAgIGlmKGlzRW1wdHkoZGlmZikpIHJldHVybiBmYWxzZVxuICAgIGxldCBbaHRtbCwgc3RyZWFtc10gPSB0aGlzLnJlbmRlcmVkLmNvbXBvbmVudFRvU3RyaW5nKGNpZClcbiAgICBsZXQgcGF0Y2ggPSBuZXcgRE9NUGF0Y2godGhpcywgdGhpcy5lbCwgdGhpcy5pZCwgaHRtbCwgc3RyZWFtcywgY2lkKVxuICAgIGxldCBjaGlsZHJlbkFkZGVkID0gdGhpcy5wZXJmb3JtUGF0Y2gocGF0Y2gsIHRydWUpXG4gICAgcmV0dXJuIGNoaWxkcmVuQWRkZWRcbiAgfVxuXG4gIGdldEhvb2soZWwpeyByZXR1cm4gdGhpcy52aWV3SG9va3NbVmlld0hvb2suZWxlbWVudElEKGVsKV0gfVxuXG4gIGFkZEhvb2soZWwpe1xuICAgIGlmKFZpZXdIb29rLmVsZW1lbnRJRChlbCkgfHwgIWVsLmdldEF0dHJpYnV0ZSl7IHJldHVybiB9XG4gICAgbGV0IGhvb2tOYW1lID0gZWwuZ2V0QXR0cmlidXRlKGBkYXRhLXBoeC0ke1BIWF9IT09LfWApIHx8IGVsLmdldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoUEhYX0hPT0spKVxuICAgIGlmKGhvb2tOYW1lICYmICF0aGlzLm93bnNFbGVtZW50KGVsKSl7IHJldHVybiB9XG4gICAgbGV0IGNhbGxiYWNrcyA9IHRoaXMubGl2ZVNvY2tldC5nZXRIb29rQ2FsbGJhY2tzKGhvb2tOYW1lKVxuXG4gICAgaWYoY2FsbGJhY2tzKXtcbiAgICAgIGlmKCFlbC5pZCl7IGxvZ0Vycm9yKGBubyBET00gSUQgZm9yIGhvb2sgXCIke2hvb2tOYW1lfVwiLiBIb29rcyByZXF1aXJlIGEgdW5pcXVlIElEIG9uIGVhY2ggZWxlbWVudC5gLCBlbCkgfVxuICAgICAgbGV0IGhvb2sgPSBuZXcgVmlld0hvb2sodGhpcywgZWwsIGNhbGxiYWNrcylcbiAgICAgIHRoaXMudmlld0hvb2tzW1ZpZXdIb29rLmVsZW1lbnRJRChob29rLmVsKV0gPSBob29rXG4gICAgICByZXR1cm4gaG9va1xuICAgIH0gZWxzZSBpZihob29rTmFtZSAhPT0gbnVsbCl7XG4gICAgICBsb2dFcnJvcihgdW5rbm93biBob29rIGZvdW5kIGZvciBcIiR7aG9va05hbWV9XCJgLCBlbClcbiAgICB9XG4gIH1cblxuICBkZXN0cm95SG9vayhob29rKXtcbiAgICBob29rLl9fZGVzdHJveWVkKClcbiAgICBob29rLl9fY2xlYW51cF9fKClcbiAgICBkZWxldGUgdGhpcy52aWV3SG9va3NbVmlld0hvb2suZWxlbWVudElEKGhvb2suZWwpXVxuICB9XG5cbiAgYXBwbHlQZW5kaW5nVXBkYXRlcygpe1xuICAgIHRoaXMucGVuZGluZ0RpZmZzLmZvckVhY2goKHtkaWZmLCBldmVudHN9KSA9PiB0aGlzLnVwZGF0ZShkaWZmLCBldmVudHMpKVxuICAgIHRoaXMucGVuZGluZ0RpZmZzID0gW11cbiAgICB0aGlzLmVhY2hDaGlsZChjaGlsZCA9PiBjaGlsZC5hcHBseVBlbmRpbmdVcGRhdGVzKCkpXG4gIH1cblxuICBlYWNoQ2hpbGQoY2FsbGJhY2spe1xuICAgIGxldCBjaGlsZHJlbiA9IHRoaXMucm9vdC5jaGlsZHJlblt0aGlzLmlkXSB8fCB7fVxuICAgIGZvcihsZXQgaWQgaW4gY2hpbGRyZW4peyBjYWxsYmFjayh0aGlzLmdldENoaWxkQnlJZChpZCkpIH1cbiAgfVxuXG4gIG9uQ2hhbm5lbChldmVudCwgY2Ipe1xuICAgIHRoaXMubGl2ZVNvY2tldC5vbkNoYW5uZWwodGhpcy5jaGFubmVsLCBldmVudCwgcmVzcCA9PiB7XG4gICAgICBpZih0aGlzLmlzSm9pblBlbmRpbmcoKSl7XG4gICAgICAgIHRoaXMucm9vdC5wZW5kaW5nSm9pbk9wcy5wdXNoKFt0aGlzLCAoKSA9PiBjYihyZXNwKV0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxpdmVTb2NrZXQucmVxdWVzdERPTVVwZGF0ZSgoKSA9PiBjYihyZXNwKSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgYmluZENoYW5uZWwoKXtcbiAgICAvLyBUaGUgZGlmZiBldmVudCBzaG91bGQgYmUgaGFuZGxlZCBieSB0aGUgcmVndWxhciB1cGRhdGUgb3BlcmF0aW9ucy5cbiAgICAvLyBBbGwgb3RoZXIgb3BlcmF0aW9ucyBhcmUgcXVldWVkIHRvIGJlIGFwcGxpZWQgb25seSBhZnRlciBqb2luLlxuICAgIHRoaXMubGl2ZVNvY2tldC5vbkNoYW5uZWwodGhpcy5jaGFubmVsLCBcImRpZmZcIiwgKHJhd0RpZmYpID0+IHtcbiAgICAgIHRoaXMubGl2ZVNvY2tldC5yZXF1ZXN0RE9NVXBkYXRlKCgpID0+IHtcbiAgICAgICAgdGhpcy5hcHBseURpZmYoXCJ1cGRhdGVcIiwgcmF3RGlmZiwgKHtkaWZmLCBldmVudHN9KSA9PiB0aGlzLnVwZGF0ZShkaWZmLCBldmVudHMpKVxuICAgICAgfSlcbiAgICB9KVxuICAgIHRoaXMub25DaGFubmVsKFwicmVkaXJlY3RcIiwgKHt0bywgZmxhc2h9KSA9PiB0aGlzLm9uUmVkaXJlY3Qoe3RvLCBmbGFzaH0pKVxuICAgIHRoaXMub25DaGFubmVsKFwibGl2ZV9wYXRjaFwiLCAocmVkaXIpID0+IHRoaXMub25MaXZlUGF0Y2gocmVkaXIpKVxuICAgIHRoaXMub25DaGFubmVsKFwibGl2ZV9yZWRpcmVjdFwiLCAocmVkaXIpID0+IHRoaXMub25MaXZlUmVkaXJlY3QocmVkaXIpKVxuICAgIHRoaXMuY2hhbm5lbC5vbkVycm9yKHJlYXNvbiA9PiB0aGlzLm9uRXJyb3IocmVhc29uKSlcbiAgICB0aGlzLmNoYW5uZWwub25DbG9zZShyZWFzb24gPT4gdGhpcy5vbkNsb3NlKHJlYXNvbikpXG4gIH1cblxuICBkZXN0cm95QWxsQ2hpbGRyZW4oKXsgdGhpcy5lYWNoQ2hpbGQoY2hpbGQgPT4gY2hpbGQuZGVzdHJveSgpKSB9XG5cbiAgb25MaXZlUmVkaXJlY3QocmVkaXIpe1xuICAgIGxldCB7dG8sIGtpbmQsIGZsYXNofSA9IHJlZGlyXG4gICAgbGV0IHVybCA9IHRoaXMuZXhwYW5kVVJMKHRvKVxuICAgIHRoaXMubGl2ZVNvY2tldC5oaXN0b3J5UmVkaXJlY3QodXJsLCBraW5kLCBmbGFzaClcbiAgfVxuXG4gIG9uTGl2ZVBhdGNoKHJlZGlyKXtcbiAgICBsZXQge3RvLCBraW5kfSA9IHJlZGlyXG4gICAgdGhpcy5ocmVmID0gdGhpcy5leHBhbmRVUkwodG8pXG4gICAgdGhpcy5saXZlU29ja2V0Lmhpc3RvcnlQYXRjaCh0bywga2luZClcbiAgfVxuXG4gIGV4cGFuZFVSTCh0byl7XG4gICAgcmV0dXJuIHRvLnN0YXJ0c1dpdGgoXCIvXCIpID8gYCR7d2luZG93LmxvY2F0aW9uLnByb3RvY29sfS8vJHt3aW5kb3cubG9jYXRpb24uaG9zdH0ke3RvfWAgOiB0b1xuICB9XG5cbiAgb25SZWRpcmVjdCh7dG8sIGZsYXNofSl7IHRoaXMubGl2ZVNvY2tldC5yZWRpcmVjdCh0bywgZmxhc2gpIH1cblxuICBpc0Rlc3Ryb3llZCgpeyByZXR1cm4gdGhpcy5kZXN0cm95ZWQgfVxuXG4gIGpvaW5EZWFkKCl7IHRoaXMuaXNEZWFkID0gdHJ1ZSB9XG5cbiAgam9pbihjYWxsYmFjayl7XG4gICAgdGhpcy5zaG93TG9hZGVyKHRoaXMubGl2ZVNvY2tldC5sb2FkZXJUaW1lb3V0KVxuICAgIHRoaXMuYmluZENoYW5uZWwoKVxuICAgIGlmKHRoaXMuaXNNYWluKCkpe1xuICAgICAgdGhpcy5zdG9wQ2FsbGJhY2sgPSB0aGlzLmxpdmVTb2NrZXQud2l0aFBhZ2VMb2FkaW5nKHt0bzogdGhpcy5ocmVmLCBraW5kOiBcImluaXRpYWxcIn0pXG4gICAgfVxuICAgIHRoaXMuam9pbkNhbGxiYWNrID0gKG9uRG9uZSkgPT4ge1xuICAgICAgb25Eb25lID0gb25Eb25lIHx8IGZ1bmN0aW9uKCl7fVxuICAgICAgY2FsbGJhY2sgPyBjYWxsYmFjayh0aGlzLmpvaW5Db3VudCwgb25Eb25lKSA6IG9uRG9uZSgpXG4gICAgfVxuICAgIHRoaXMubGl2ZVNvY2tldC53cmFwUHVzaCh0aGlzLCB7dGltZW91dDogZmFsc2V9LCAoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5jaGFubmVsLmpvaW4oKVxuICAgICAgICAucmVjZWl2ZShcIm9rXCIsIGRhdGEgPT4ge1xuICAgICAgICAgIGlmKCF0aGlzLmlzRGVzdHJveWVkKCkpe1xuICAgICAgICAgICAgdGhpcy5saXZlU29ja2V0LnJlcXVlc3RET01VcGRhdGUoKCkgPT4gdGhpcy5vbkpvaW4oZGF0YSkpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAucmVjZWl2ZShcImVycm9yXCIsIHJlc3AgPT4gIXRoaXMuaXNEZXN0cm95ZWQoKSAmJiB0aGlzLm9uSm9pbkVycm9yKHJlc3ApKVxuICAgICAgICAucmVjZWl2ZShcInRpbWVvdXRcIiwgKCkgPT4gIXRoaXMuaXNEZXN0cm95ZWQoKSAmJiB0aGlzLm9uSm9pbkVycm9yKHtyZWFzb246IFwidGltZW91dFwifSkpXG4gICAgfSlcbiAgfVxuXG4gIG9uSm9pbkVycm9yKHJlc3Ape1xuICAgIGlmKHJlc3AucmVhc29uID09PSBcInJlbG9hZFwiKXtcbiAgICAgIHRoaXMubG9nKFwiZXJyb3JcIiwgKCkgPT4gW2BmYWlsZWQgbW91bnQgd2l0aCAke3Jlc3Auc3RhdHVzfS4gRmFsbGluZyBiYWNrIHRvIHBhZ2UgcmVxdWVzdGAsIHJlc3BdKVxuICAgICAgaWYodGhpcy5pc01haW4oKSl7IHRoaXMub25SZWRpcmVjdCh7dG86IHRoaXMuaHJlZn0pIH1cbiAgICAgIHJldHVyblxuICAgIH0gZWxzZSBpZihyZXNwLnJlYXNvbiA9PT0gXCJ1bmF1dGhvcml6ZWRcIiB8fCByZXNwLnJlYXNvbiA9PT0gXCJzdGFsZVwiKXtcbiAgICAgIHRoaXMubG9nKFwiZXJyb3JcIiwgKCkgPT4gW1widW5hdXRob3JpemVkIGxpdmVfcmVkaXJlY3QuIEZhbGxpbmcgYmFjayB0byBwYWdlIHJlcXVlc3RcIiwgcmVzcF0pXG4gICAgICBpZih0aGlzLmlzTWFpbigpKXsgdGhpcy5vblJlZGlyZWN0KHt0bzogdGhpcy5ocmVmfSkgfVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmKHJlc3AucmVkaXJlY3QgfHwgcmVzcC5saXZlX3JlZGlyZWN0KXtcbiAgICAgIHRoaXMuam9pblBlbmRpbmcgPSBmYWxzZVxuICAgICAgdGhpcy5jaGFubmVsLmxlYXZlKClcbiAgICB9XG4gICAgaWYocmVzcC5yZWRpcmVjdCl7IHJldHVybiB0aGlzLm9uUmVkaXJlY3QocmVzcC5yZWRpcmVjdCkgfVxuICAgIGlmKHJlc3AubGl2ZV9yZWRpcmVjdCl7IHJldHVybiB0aGlzLm9uTGl2ZVJlZGlyZWN0KHJlc3AubGl2ZV9yZWRpcmVjdCkgfVxuICAgIHRoaXMuZGlzcGxheUVycm9yKFtQSFhfTE9BRElOR19DTEFTUywgUEhYX0VSUk9SX0NMQVNTLCBQSFhfU0VSVkVSX0VSUk9SX0NMQVNTXSlcbiAgICB0aGlzLmxvZyhcImVycm9yXCIsICgpID0+IFtcInVuYWJsZSB0byBqb2luXCIsIHJlc3BdKVxuICAgIGlmKHRoaXMubGl2ZVNvY2tldC5pc0Nvbm5lY3RlZCgpKXsgdGhpcy5saXZlU29ja2V0LnJlbG9hZFdpdGhKaXR0ZXIodGhpcykgfVxuICB9XG5cbiAgb25DbG9zZShyZWFzb24pe1xuICAgIGlmKHRoaXMuaXNEZXN0cm95ZWQoKSl7IHJldHVybiB9XG4gICAgaWYodGhpcy5saXZlU29ja2V0Lmhhc1BlbmRpbmdMaW5rKCkgJiYgcmVhc29uICE9PSBcImxlYXZlXCIpe1xuICAgICAgcmV0dXJuIHRoaXMubGl2ZVNvY2tldC5yZWxvYWRXaXRoSml0dGVyKHRoaXMpXG4gICAgfVxuICAgIHRoaXMuZGVzdHJveUFsbENoaWxkcmVuKClcbiAgICB0aGlzLmxpdmVTb2NrZXQuZHJvcEFjdGl2ZUVsZW1lbnQodGhpcylcbiAgICAvLyBkb2N1bWVudC5hY3RpdmVFbGVtZW50IGNhbiBiZSBudWxsIGluIEludGVybmV0IEV4cGxvcmVyIDExXG4gICAgaWYoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCl7IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpIH1cbiAgICBpZih0aGlzLmxpdmVTb2NrZXQuaXNVbmxvYWRlZCgpKXtcbiAgICAgIHRoaXMuc2hvd0xvYWRlcihCRUZPUkVfVU5MT0FEX0xPQURFUl9USU1FT1VUKVxuICAgIH1cbiAgfVxuXG4gIG9uRXJyb3IocmVhc29uKXtcbiAgICB0aGlzLm9uQ2xvc2UocmVhc29uKVxuICAgIGlmKHRoaXMubGl2ZVNvY2tldC5pc0Nvbm5lY3RlZCgpKXsgdGhpcy5sb2coXCJlcnJvclwiLCAoKSA9PiBbXCJ2aWV3IGNyYXNoZWRcIiwgcmVhc29uXSkgfVxuICAgIGlmKCF0aGlzLmxpdmVTb2NrZXQuaXNVbmxvYWRlZCgpKXtcbiAgICAgIGlmKHRoaXMubGl2ZVNvY2tldC5pc0Nvbm5lY3RlZCgpKXtcbiAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3IoW1BIWF9MT0FESU5HX0NMQVNTLCBQSFhfRVJST1JfQ0xBU1MsIFBIWF9TRVJWRVJfRVJST1JfQ0xBU1NdKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3IoW1BIWF9MT0FESU5HX0NMQVNTLCBQSFhfRVJST1JfQ0xBU1MsIFBIWF9DTElFTlRfRVJST1JfQ0xBU1NdKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRpc3BsYXlFcnJvcihjbGFzc2VzKXtcbiAgICBpZih0aGlzLmlzTWFpbigpKXsgRE9NLmRpc3BhdGNoRXZlbnQod2luZG93LCBcInBoeDpwYWdlLWxvYWRpbmctc3RhcnRcIiwge2RldGFpbDoge3RvOiB0aGlzLmhyZWYsIGtpbmQ6IFwiZXJyb3JcIn19KSB9XG4gICAgdGhpcy5zaG93TG9hZGVyKClcbiAgICB0aGlzLnNldENvbnRhaW5lckNsYXNzZXMoLi4uY2xhc3NlcylcbiAgICB0aGlzLmV4ZWNBbGwodGhpcy5iaW5kaW5nKFwiZGlzY29ubmVjdGVkXCIpKVxuICB9XG5cbiAgcHVzaFdpdGhSZXBseShyZWZHZW5lcmF0b3IsIGV2ZW50LCBwYXlsb2FkLCBvblJlcGx5ID0gZnVuY3Rpb24gKCl7IH0pe1xuICAgIGlmKCF0aGlzLmlzQ29ubmVjdGVkKCkpeyByZXR1cm4gfVxuXG4gICAgbGV0IFtyZWYsIFtlbF0sIG9wdHNdID0gcmVmR2VuZXJhdG9yID8gcmVmR2VuZXJhdG9yKCkgOiBbbnVsbCwgW10sIHt9XVxuICAgIGxldCBvbkxvYWRpbmdEb25lID0gZnVuY3Rpb24oKXsgfVxuICAgIGlmKG9wdHMucGFnZV9sb2FkaW5nIHx8IChlbCAmJiAoZWwuZ2V0QXR0cmlidXRlKHRoaXMuYmluZGluZyhQSFhfUEFHRV9MT0FESU5HKSkgIT09IG51bGwpKSl7XG4gICAgICBvbkxvYWRpbmdEb25lID0gdGhpcy5saXZlU29ja2V0LndpdGhQYWdlTG9hZGluZyh7a2luZDogXCJlbGVtZW50XCIsIHRhcmdldDogZWx9KVxuICAgIH1cblxuICAgIGlmKHR5cGVvZiAocGF5bG9hZC5jaWQpICE9PSBcIm51bWJlclwiKXsgZGVsZXRlIHBheWxvYWQuY2lkIH1cbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5saXZlU29ja2V0LndyYXBQdXNoKHRoaXMsIHt0aW1lb3V0OiB0cnVlfSwgKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFubmVsLnB1c2goZXZlbnQsIHBheWxvYWQsIFBVU0hfVElNRU9VVCkucmVjZWl2ZShcIm9rXCIsIHJlc3AgPT4ge1xuICAgICAgICAgIGxldCBmaW5pc2ggPSAoaG9va1JlcGx5KSA9PiB7XG4gICAgICAgICAgICBpZihyZXNwLnJlZGlyZWN0KXsgdGhpcy5vblJlZGlyZWN0KHJlc3AucmVkaXJlY3QpIH1cbiAgICAgICAgICAgIGlmKHJlc3AubGl2ZV9wYXRjaCl7IHRoaXMub25MaXZlUGF0Y2gocmVzcC5saXZlX3BhdGNoKSB9XG4gICAgICAgICAgICBpZihyZXNwLmxpdmVfcmVkaXJlY3QpeyB0aGlzLm9uTGl2ZVJlZGlyZWN0KHJlc3AubGl2ZV9yZWRpcmVjdCkgfVxuICAgICAgICAgICAgb25Mb2FkaW5nRG9uZSgpXG4gICAgICAgICAgICBvblJlcGx5KHJlc3AsIGhvb2tSZXBseSlcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYocmVzcC5kaWZmKXtcbiAgICAgICAgICAgIHRoaXMubGl2ZVNvY2tldC5yZXF1ZXN0RE9NVXBkYXRlKCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5hcHBseURpZmYoXCJ1cGRhdGVcIiwgcmVzcC5kaWZmLCAoe2RpZmYsIHJlcGx5LCBldmVudHN9KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYocmVmICE9PSBudWxsKXsgdGhpcy51bmRvUmVmcyhyZWYpIH1cbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZShkaWZmLCBldmVudHMpXG4gICAgICAgICAgICAgICAgZmluaXNoKHJlcGx5KVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYocmVmICE9PSBudWxsKXsgdGhpcy51bmRvUmVmcyhyZWYpIH1cbiAgICAgICAgICAgIGZpbmlzaChudWxsKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cbiAgdW5kb1JlZnMocmVmKXtcbiAgICBpZighdGhpcy5pc0Nvbm5lY3RlZCgpKXsgcmV0dXJuIH0gLy8gZXhpdCBpZiBleHRlcm5hbCBmb3JtIHRyaWdnZXJlZFxuXG4gICAgRE9NLmFsbChkb2N1bWVudCwgYFske1BIWF9SRUZfU1JDfT1cIiR7dGhpcy5pZH1cIl1bJHtQSFhfUkVGfT1cIiR7cmVmfVwiXWAsIGVsID0+IHtcbiAgICAgIGxldCBkaXNhYmxlZFZhbCA9IGVsLmdldEF0dHJpYnV0ZShQSFhfRElTQUJMRUQpXG4gICAgICBsZXQgcmVhZE9ubHlWYWwgPSBlbC5nZXRBdHRyaWJ1dGUoUEhYX1JFQURPTkxZKVxuICAgICAgLy8gcmVtb3ZlIHJlZnNcbiAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShQSFhfUkVGKVxuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKFBIWF9SRUZfU1JDKVxuICAgICAgLy8gcmVzdG9yZSBpbnB1dHNcbiAgICAgIGlmKHJlYWRPbmx5VmFsICE9PSBudWxsKXtcbiAgICAgICAgZWwucmVhZE9ubHkgPSByZWFkT25seVZhbCA9PT0gXCJ0cnVlXCIgPyB0cnVlIDogZmFsc2VcbiAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKFBIWF9SRUFET05MWSlcbiAgICAgIH1cbiAgICAgIGlmKGRpc2FibGVkVmFsICE9PSBudWxsKXtcbiAgICAgICAgZWwuZGlzYWJsZWQgPSBkaXNhYmxlZFZhbCA9PT0gXCJ0cnVlXCIgPyB0cnVlIDogZmFsc2VcbiAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKFBIWF9ESVNBQkxFRClcbiAgICAgIH1cbiAgICAgIC8vIHJlbW92ZSBjbGFzc2VzXG4gICAgICBQSFhfRVZFTlRfQ0xBU1NFUy5mb3JFYWNoKGNsYXNzTmFtZSA9PiBET00ucmVtb3ZlQ2xhc3MoZWwsIGNsYXNzTmFtZSkpXG4gICAgICAvLyByZXN0b3JlIGRpc2FibGVzXG4gICAgICBsZXQgZGlzYWJsZVJlc3RvcmUgPSBlbC5nZXRBdHRyaWJ1dGUoUEhYX0RJU0FCTEVfV0lUSF9SRVNUT1JFKVxuICAgICAgaWYoZGlzYWJsZVJlc3RvcmUgIT09IG51bGwpe1xuICAgICAgICBlbC5pbm5lclRleHQgPSBkaXNhYmxlUmVzdG9yZVxuICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoUEhYX0RJU0FCTEVfV0lUSF9SRVNUT1JFKVxuICAgICAgfVxuICAgICAgbGV0IHRvRWwgPSBET00ucHJpdmF0ZShlbCwgUEhYX1JFRilcbiAgICAgIGlmKHRvRWwpe1xuICAgICAgICBsZXQgaG9vayA9IHRoaXMudHJpZ2dlckJlZm9yZVVwZGF0ZUhvb2soZWwsIHRvRWwpXG4gICAgICAgIERPTVBhdGNoLnBhdGNoRWwoZWwsIHRvRWwsIHRoaXMubGl2ZVNvY2tldC5nZXRBY3RpdmVFbGVtZW50KCkpXG4gICAgICAgIGlmKGhvb2speyBob29rLl9fdXBkYXRlZCgpIH1cbiAgICAgICAgRE9NLmRlbGV0ZVByaXZhdGUoZWwsIFBIWF9SRUYpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHB1dFJlZihlbGVtZW50cywgZXZlbnQsIG9wdHMgPSB7fSl7XG4gICAgbGV0IG5ld1JlZiA9IHRoaXMucmVmKytcbiAgICBsZXQgZGlzYWJsZVdpdGggPSB0aGlzLmJpbmRpbmcoUEhYX0RJU0FCTEVfV0lUSClcbiAgICBpZihvcHRzLmxvYWRpbmcpeyBlbGVtZW50cyA9IGVsZW1lbnRzLmNvbmNhdChET00uYWxsKGRvY3VtZW50LCBvcHRzLmxvYWRpbmcpKX1cblxuICAgIGVsZW1lbnRzLmZvckVhY2goZWwgPT4ge1xuICAgICAgZWwuY2xhc3NMaXN0LmFkZChgcGh4LSR7ZXZlbnR9LWxvYWRpbmdgKVxuICAgICAgZWwuc2V0QXR0cmlidXRlKFBIWF9SRUYsIG5ld1JlZilcbiAgICAgIGVsLnNldEF0dHJpYnV0ZShQSFhfUkVGX1NSQywgdGhpcy5lbC5pZClcbiAgICAgIGxldCBkaXNhYmxlVGV4dCA9IGVsLmdldEF0dHJpYnV0ZShkaXNhYmxlV2l0aClcbiAgICAgIGlmKGRpc2FibGVUZXh0ICE9PSBudWxsKXtcbiAgICAgICAgaWYoIWVsLmdldEF0dHJpYnV0ZShQSFhfRElTQUJMRV9XSVRIX1JFU1RPUkUpKXtcbiAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoUEhYX0RJU0FCTEVfV0lUSF9SRVNUT1JFLCBlbC5pbm5lclRleHQpXG4gICAgICAgIH1cbiAgICAgICAgaWYoZGlzYWJsZVRleHQgIT09IFwiXCIpeyBlbC5pbm5lclRleHQgPSBkaXNhYmxlVGV4dCB9XG4gICAgICAgIC8vIFBIWF9ESVNBQkxFRCBjb3VsZCBoYXZlIGFscmVhZHkgYmVlbiBzZXQgaW4gZGlzYWJsZUZvcm1cbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKFBIWF9ESVNBQkxFRCwgZWwuZ2V0QXR0cmlidXRlKFBIWF9ESVNBQkxFRCkgfHwgZWwuZGlzYWJsZWQpXG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwiXCIpXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gW25ld1JlZiwgZWxlbWVudHMsIG9wdHNdXG4gIH1cblxuICBjb21wb25lbnRJRChlbCl7XG4gICAgbGV0IGNpZCA9IGVsLmdldEF0dHJpYnV0ZSAmJiBlbC5nZXRBdHRyaWJ1dGUoUEhYX0NPTVBPTkVOVClcbiAgICByZXR1cm4gY2lkID8gcGFyc2VJbnQoY2lkKSA6IG51bGxcbiAgfVxuXG4gIHRhcmdldENvbXBvbmVudElEKHRhcmdldCwgdGFyZ2V0Q3R4LCBvcHRzID0ge30pe1xuICAgIGlmKGlzQ2lkKHRhcmdldEN0eCkpeyByZXR1cm4gdGFyZ2V0Q3R4IH1cblxuICAgIGxldCBjaWRPclNlbGVjdG9yID0gb3B0cy50YXJnZXQgfHwgdGFyZ2V0LmdldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoXCJ0YXJnZXRcIikpXG4gICAgaWYoaXNDaWQoY2lkT3JTZWxlY3Rvcikpe1xuICAgICAgcmV0dXJuIHBhcnNlSW50KGNpZE9yU2VsZWN0b3IpXG4gICAgfSBlbHNlIGlmKHRhcmdldEN0eCAmJiAoY2lkT3JTZWxlY3RvciAhPT0gbnVsbCB8fCBvcHRzLnRhcmdldCkpe1xuICAgICAgcmV0dXJuIHRoaXMuY2xvc2VzdENvbXBvbmVudElEKHRhcmdldEN0eClcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH1cblxuICBjbG9zZXN0Q29tcG9uZW50SUQodGFyZ2V0Q3R4KXtcbiAgICBpZihpc0NpZCh0YXJnZXRDdHgpKXtcbiAgICAgIHJldHVybiB0YXJnZXRDdHhcbiAgICB9IGVsc2UgaWYodGFyZ2V0Q3R4KXtcbiAgICAgIHJldHVybiBtYXliZSh0YXJnZXRDdHguY2xvc2VzdChgWyR7UEhYX0NPTVBPTkVOVH1dYCksIGVsID0+IHRoaXMub3duc0VsZW1lbnQoZWwpICYmIHRoaXMuY29tcG9uZW50SUQoZWwpKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfVxuXG4gIHB1c2hIb29rRXZlbnQoZWwsIHRhcmdldEN0eCwgZXZlbnQsIHBheWxvYWQsIG9uUmVwbHkpe1xuICAgIGlmKCF0aGlzLmlzQ29ubmVjdGVkKCkpe1xuICAgICAgdGhpcy5sb2coXCJob29rXCIsICgpID0+IFtcInVuYWJsZSB0byBwdXNoIGhvb2sgZXZlbnQuIExpdmVWaWV3IG5vdCBjb25uZWN0ZWRcIiwgZXZlbnQsIHBheWxvYWRdKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGxldCBbcmVmLCBlbHMsIG9wdHNdID0gdGhpcy5wdXRSZWYoW2VsXSwgXCJob29rXCIpXG4gICAgdGhpcy5wdXNoV2l0aFJlcGx5KCgpID0+IFtyZWYsIGVscywgb3B0c10sIFwiZXZlbnRcIiwge1xuICAgICAgdHlwZTogXCJob29rXCIsXG4gICAgICBldmVudDogZXZlbnQsXG4gICAgICB2YWx1ZTogcGF5bG9hZCxcbiAgICAgIGNpZDogdGhpcy5jbG9zZXN0Q29tcG9uZW50SUQodGFyZ2V0Q3R4KVxuICAgIH0sIChyZXNwLCByZXBseSkgPT4gb25SZXBseShyZXBseSwgcmVmKSlcblxuICAgIHJldHVybiByZWZcbiAgfVxuXG4gIGV4dHJhY3RNZXRhKGVsLCBtZXRhLCB2YWx1ZSl7XG4gICAgbGV0IHByZWZpeCA9IHRoaXMuYmluZGluZyhcInZhbHVlLVwiKVxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBlbC5hdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKXtcbiAgICAgIGlmKCFtZXRhKXsgbWV0YSA9IHt9IH1cbiAgICAgIGxldCBuYW1lID0gZWwuYXR0cmlidXRlc1tpXS5uYW1lXG4gICAgICBpZihuYW1lLnN0YXJ0c1dpdGgocHJlZml4KSl7IG1ldGFbbmFtZS5yZXBsYWNlKHByZWZpeCwgXCJcIildID0gZWwuZ2V0QXR0cmlidXRlKG5hbWUpIH1cbiAgICB9XG4gICAgaWYoZWwudmFsdWUgIT09IHVuZGVmaW5lZCAmJiAhKGVsIGluc3RhbmNlb2YgSFRNTEZvcm1FbGVtZW50KSl7XG4gICAgICBpZighbWV0YSl7IG1ldGEgPSB7fSB9XG4gICAgICBtZXRhLnZhbHVlID0gZWwudmFsdWVcblxuICAgICAgaWYoZWwudGFnTmFtZSA9PT0gXCJJTlBVVFwiICYmIENIRUNLQUJMRV9JTlBVVFMuaW5kZXhPZihlbC50eXBlKSA+PSAwICYmICFlbC5jaGVja2VkKXtcbiAgICAgICAgZGVsZXRlIG1ldGEudmFsdWVcbiAgICAgIH1cbiAgICB9XG4gICAgaWYodmFsdWUpe1xuICAgICAgaWYoIW1ldGEpeyBtZXRhID0ge30gfVxuICAgICAgZm9yKGxldCBrZXkgaW4gdmFsdWUpeyBtZXRhW2tleV0gPSB2YWx1ZVtrZXldIH1cbiAgICB9XG4gICAgcmV0dXJuIG1ldGFcbiAgfVxuXG5cbiAgcHVzaEV2ZW50KHR5cGUsIGVsLCB0YXJnZXRDdHgsIHBoeEV2ZW50LCBtZXRhLCBvcHRzID0ge30sIG9uUmVwbHkpe1xuICAgIHRoaXMucHVzaFdpdGhSZXBseSgoKSA9PiB0aGlzLnB1dFJlZihbZWxdLCB0eXBlLCBvcHRzKSwgXCJldmVudFwiLCB7XG4gICAgICB0eXBlOiB0eXBlLFxuICAgICAgZXZlbnQ6IHBoeEV2ZW50LFxuICAgICAgdmFsdWU6IHRoaXMuZXh0cmFjdE1ldGEoZWwsIG1ldGEsIG9wdHMudmFsdWUpLFxuICAgICAgY2lkOiB0aGlzLnRhcmdldENvbXBvbmVudElEKGVsLCB0YXJnZXRDdHgsIG9wdHMpXG4gICAgfSwgKHJlc3AsIHJlcGx5KSA9PiBvblJlcGx5ICYmIG9uUmVwbHkocmVwbHkpKVxuICB9XG5cbiAgcHVzaEZpbGVQcm9ncmVzcyhmaWxlRWwsIGVudHJ5UmVmLCBwcm9ncmVzcywgb25SZXBseSA9IGZ1bmN0aW9uICgpeyB9KXtcbiAgICB0aGlzLmxpdmVTb2NrZXQud2l0aGluT3duZXJzKGZpbGVFbC5mb3JtLCAodmlldywgdGFyZ2V0Q3R4KSA9PiB7XG4gICAgICB2aWV3LnB1c2hXaXRoUmVwbHkobnVsbCwgXCJwcm9ncmVzc1wiLCB7XG4gICAgICAgIGV2ZW50OiBmaWxlRWwuZ2V0QXR0cmlidXRlKHZpZXcuYmluZGluZyhQSFhfUFJPR1JFU1MpKSxcbiAgICAgICAgcmVmOiBmaWxlRWwuZ2V0QXR0cmlidXRlKFBIWF9VUExPQURfUkVGKSxcbiAgICAgICAgZW50cnlfcmVmOiBlbnRyeVJlZixcbiAgICAgICAgcHJvZ3Jlc3M6IHByb2dyZXNzLFxuICAgICAgICBjaWQ6IHZpZXcudGFyZ2V0Q29tcG9uZW50SUQoZmlsZUVsLmZvcm0sIHRhcmdldEN0eClcbiAgICAgIH0sIG9uUmVwbHkpXG4gICAgfSlcbiAgfVxuXG4gIHB1c2hJbnB1dChpbnB1dEVsLCB0YXJnZXRDdHgsIGZvcmNlQ2lkLCBwaHhFdmVudCwgb3B0cywgY2FsbGJhY2spe1xuICAgIGxldCB1cGxvYWRzXG4gICAgbGV0IGNpZCA9IGlzQ2lkKGZvcmNlQ2lkKSA/IGZvcmNlQ2lkIDogdGhpcy50YXJnZXRDb21wb25lbnRJRChpbnB1dEVsLmZvcm0sIHRhcmdldEN0eCwgb3B0cylcbiAgICBsZXQgcmVmR2VuZXJhdG9yID0gKCkgPT4gdGhpcy5wdXRSZWYoW2lucHV0RWwsIGlucHV0RWwuZm9ybV0sIFwiY2hhbmdlXCIsIG9wdHMpXG4gICAgbGV0IGZvcm1EYXRhXG4gICAgbGV0IG1ldGEgID0gdGhpcy5leHRyYWN0TWV0YShpbnB1dEVsLmZvcm0pXG4gICAgaWYoaW5wdXRFbCBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KXsgbWV0YS5zdWJtaXR0ZXIgPSBpbnB1dEVsIH1cbiAgICBpZihpbnB1dEVsLmdldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoXCJjaGFuZ2VcIikpKXtcbiAgICAgIGZvcm1EYXRhID0gc2VyaWFsaXplRm9ybShpbnB1dEVsLmZvcm0sIHtfdGFyZ2V0OiBvcHRzLl90YXJnZXQsIC4uLm1ldGF9LCBbaW5wdXRFbC5uYW1lXSlcbiAgICB9IGVsc2Uge1xuICAgICAgZm9ybURhdGEgPSBzZXJpYWxpemVGb3JtKGlucHV0RWwuZm9ybSwge190YXJnZXQ6IG9wdHMuX3RhcmdldCwgLi4ubWV0YX0pXG4gICAgfVxuICAgIGlmKERPTS5pc1VwbG9hZElucHV0KGlucHV0RWwpICYmIGlucHV0RWwuZmlsZXMgJiYgaW5wdXRFbC5maWxlcy5sZW5ndGggPiAwKXtcbiAgICAgIExpdmVVcGxvYWRlci50cmFja0ZpbGVzKGlucHV0RWwsIEFycmF5LmZyb20oaW5wdXRFbC5maWxlcykpXG4gICAgfVxuICAgIHVwbG9hZHMgPSBMaXZlVXBsb2FkZXIuc2VyaWFsaXplVXBsb2FkcyhpbnB1dEVsKVxuXG4gICAgbGV0IGV2ZW50ID0ge1xuICAgICAgdHlwZTogXCJmb3JtXCIsXG4gICAgICBldmVudDogcGh4RXZlbnQsXG4gICAgICB2YWx1ZTogZm9ybURhdGEsXG4gICAgICB1cGxvYWRzOiB1cGxvYWRzLFxuICAgICAgY2lkOiBjaWRcbiAgICB9XG4gICAgdGhpcy5wdXNoV2l0aFJlcGx5KHJlZkdlbmVyYXRvciwgXCJldmVudFwiLCBldmVudCwgcmVzcCA9PiB7XG4gICAgICBET00uc2hvd0Vycm9yKGlucHV0RWwsIHRoaXMubGl2ZVNvY2tldC5iaW5kaW5nKFBIWF9GRUVEQkFDS19GT1IpLCB0aGlzLmxpdmVTb2NrZXQuYmluZGluZyhQSFhfRkVFREJBQ0tfR1JPVVApKVxuICAgICAgaWYoRE9NLmlzVXBsb2FkSW5wdXQoaW5wdXRFbCkgJiYgRE9NLmlzQXV0b1VwbG9hZChpbnB1dEVsKSl7XG4gICAgICAgIGlmKExpdmVVcGxvYWRlci5maWxlc0F3YWl0aW5nUHJlZmxpZ2h0KGlucHV0RWwpLmxlbmd0aCA+IDApe1xuICAgICAgICAgIGxldCBbcmVmLCBfZWxzXSA9IHJlZkdlbmVyYXRvcigpXG4gICAgICAgICAgdGhpcy51cGxvYWRGaWxlcyhpbnB1dEVsLmZvcm0sIHRhcmdldEN0eCwgcmVmLCBjaWQsIChfdXBsb2FkcykgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2socmVzcClcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlckF3YWl0aW5nU3VibWl0KGlucHV0RWwuZm9ybSlcbiAgICAgICAgICAgIHRoaXMudW5kb1JlZnMocmVmKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKHJlc3ApXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHRyaWdnZXJBd2FpdGluZ1N1Ym1pdChmb3JtRWwpe1xuICAgIGxldCBhd2FpdGluZ1N1Ym1pdCA9IHRoaXMuZ2V0U2NoZWR1bGVkU3VibWl0KGZvcm1FbClcbiAgICBpZihhd2FpdGluZ1N1Ym1pdCl7XG4gICAgICBsZXQgW19lbCwgX3JlZiwgX29wdHMsIGNhbGxiYWNrXSA9IGF3YWl0aW5nU3VibWl0XG4gICAgICB0aGlzLmNhbmNlbFN1Ym1pdChmb3JtRWwpXG4gICAgICBjYWxsYmFjaygpXG4gICAgfVxuICB9XG5cbiAgZ2V0U2NoZWR1bGVkU3VibWl0KGZvcm1FbCl7XG4gICAgcmV0dXJuIHRoaXMuZm9ybVN1Ym1pdHMuZmluZCgoW2VsLCBfcmVmLCBfb3B0cywgX2NhbGxiYWNrXSkgPT4gZWwuaXNTYW1lTm9kZShmb3JtRWwpKVxuICB9XG5cbiAgc2NoZWR1bGVTdWJtaXQoZm9ybUVsLCByZWYsIG9wdHMsIGNhbGxiYWNrKXtcbiAgICBpZih0aGlzLmdldFNjaGVkdWxlZFN1Ym1pdChmb3JtRWwpKXsgcmV0dXJuIHRydWUgfVxuICAgIHRoaXMuZm9ybVN1Ym1pdHMucHVzaChbZm9ybUVsLCByZWYsIG9wdHMsIGNhbGxiYWNrXSlcbiAgfVxuXG4gIGNhbmNlbFN1Ym1pdChmb3JtRWwpe1xuICAgIHRoaXMuZm9ybVN1Ym1pdHMgPSB0aGlzLmZvcm1TdWJtaXRzLmZpbHRlcigoW2VsLCByZWYsIF9jYWxsYmFja10pID0+IHtcbiAgICAgIGlmKGVsLmlzU2FtZU5vZGUoZm9ybUVsKSl7XG4gICAgICAgIHRoaXMudW5kb1JlZnMocmVmKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGRpc2FibGVGb3JtKGZvcm1FbCwgb3B0cyA9IHt9KXtcbiAgICBsZXQgZmlsdGVySWdub3JlZCA9IGVsID0+IHtcbiAgICAgIGxldCB1c2VySWdub3JlZCA9IGNsb3Nlc3RQaHhCaW5kaW5nKGVsLCBgJHt0aGlzLmJpbmRpbmcoUEhYX1VQREFURSl9PWlnbm9yZWAsIGVsLmZvcm0pXG4gICAgICByZXR1cm4gISh1c2VySWdub3JlZCB8fCBjbG9zZXN0UGh4QmluZGluZyhlbCwgXCJkYXRhLXBoeC11cGRhdGU9aWdub3JlXCIsIGVsLmZvcm0pKVxuICAgIH1cbiAgICBsZXQgZmlsdGVyRGlzYWJsZXMgPSBlbCA9PiB7XG4gICAgICByZXR1cm4gZWwuaGFzQXR0cmlidXRlKHRoaXMuYmluZGluZyhQSFhfRElTQUJMRV9XSVRIKSlcbiAgICB9XG4gICAgbGV0IGZpbHRlckJ1dHRvbiA9IGVsID0+IGVsLnRhZ05hbWUgPT0gXCJCVVRUT05cIlxuXG4gICAgbGV0IGZpbHRlcklucHV0ID0gZWwgPT4gW1wiSU5QVVRcIiwgXCJURVhUQVJFQVwiLCBcIlNFTEVDVFwiXS5pbmNsdWRlcyhlbC50YWdOYW1lKVxuXG4gICAgbGV0IGZvcm1FbGVtZW50cyA9IEFycmF5LmZyb20oZm9ybUVsLmVsZW1lbnRzKVxuICAgIGxldCBkaXNhYmxlcyA9IGZvcm1FbGVtZW50cy5maWx0ZXIoZmlsdGVyRGlzYWJsZXMpXG4gICAgbGV0IGJ1dHRvbnMgPSBmb3JtRWxlbWVudHMuZmlsdGVyKGZpbHRlckJ1dHRvbikuZmlsdGVyKGZpbHRlcklnbm9yZWQpXG4gICAgbGV0IGlucHV0cyA9IGZvcm1FbGVtZW50cy5maWx0ZXIoZmlsdGVySW5wdXQpLmZpbHRlcihmaWx0ZXJJZ25vcmVkKVxuXG4gICAgYnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICBidXR0b24uc2V0QXR0cmlidXRlKFBIWF9ESVNBQkxFRCwgYnV0dG9uLmRpc2FibGVkKVxuICAgICAgYnV0dG9uLmRpc2FibGVkID0gdHJ1ZVxuICAgIH0pXG4gICAgaW5wdXRzLmZvckVhY2goaW5wdXQgPT4ge1xuICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKFBIWF9SRUFET05MWSwgaW5wdXQucmVhZE9ubHkpXG4gICAgICBpbnB1dC5yZWFkT25seSA9IHRydWVcbiAgICAgIGlmKGlucHV0LmZpbGVzKXtcbiAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKFBIWF9ESVNBQkxFRCwgaW5wdXQuZGlzYWJsZWQpXG4gICAgICAgIGlucHV0LmRpc2FibGVkID0gdHJ1ZVxuICAgICAgfVxuICAgIH0pXG4gICAgZm9ybUVsLnNldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoUEhYX1BBR0VfTE9BRElORyksIFwiXCIpXG4gICAgcmV0dXJuIHRoaXMucHV0UmVmKFtmb3JtRWxdLmNvbmNhdChkaXNhYmxlcykuY29uY2F0KGJ1dHRvbnMpLmNvbmNhdChpbnB1dHMpLCBcInN1Ym1pdFwiLCBvcHRzKVxuICB9XG5cbiAgcHVzaEZvcm1TdWJtaXQoZm9ybUVsLCB0YXJnZXRDdHgsIHBoeEV2ZW50LCBzdWJtaXR0ZXIsIG9wdHMsIG9uUmVwbHkpe1xuICAgIGxldCByZWZHZW5lcmF0b3IgPSAoKSA9PiB0aGlzLmRpc2FibGVGb3JtKGZvcm1FbCwgb3B0cylcbiAgICBsZXQgY2lkID0gdGhpcy50YXJnZXRDb21wb25lbnRJRChmb3JtRWwsIHRhcmdldEN0eClcbiAgICBpZihMaXZlVXBsb2FkZXIuaGFzVXBsb2Fkc0luUHJvZ3Jlc3MoZm9ybUVsKSl7XG4gICAgICBsZXQgW3JlZiwgX2Vsc10gPSByZWZHZW5lcmF0b3IoKVxuICAgICAgbGV0IHB1c2ggPSAoKSA9PiB0aGlzLnB1c2hGb3JtU3VibWl0KGZvcm1FbCwgdGFyZ2V0Q3R4LCBwaHhFdmVudCwgc3VibWl0dGVyLCBvcHRzLCBvblJlcGx5KVxuICAgICAgcmV0dXJuIHRoaXMuc2NoZWR1bGVTdWJtaXQoZm9ybUVsLCByZWYsIG9wdHMsIHB1c2gpXG4gICAgfSBlbHNlIGlmKExpdmVVcGxvYWRlci5pbnB1dHNBd2FpdGluZ1ByZWZsaWdodChmb3JtRWwpLmxlbmd0aCA+IDApe1xuICAgICAgbGV0IFtyZWYsIGVsc10gPSByZWZHZW5lcmF0b3IoKVxuICAgICAgbGV0IHByb3h5UmVmR2VuID0gKCkgPT4gW3JlZiwgZWxzLCBvcHRzXVxuICAgICAgdGhpcy51cGxvYWRGaWxlcyhmb3JtRWwsIHRhcmdldEN0eCwgcmVmLCBjaWQsIChfdXBsb2FkcykgPT4ge1xuICAgICAgICBsZXQgbWV0YSA9IHRoaXMuZXh0cmFjdE1ldGEoZm9ybUVsKVxuICAgICAgICBsZXQgZm9ybURhdGEgPSBzZXJpYWxpemVGb3JtKGZvcm1FbCwge3N1Ym1pdHRlciwgLi4ubWV0YX0pXG4gICAgICAgIHRoaXMucHVzaFdpdGhSZXBseShwcm94eVJlZkdlbiwgXCJldmVudFwiLCB7XG4gICAgICAgICAgdHlwZTogXCJmb3JtXCIsXG4gICAgICAgICAgZXZlbnQ6IHBoeEV2ZW50LFxuICAgICAgICAgIHZhbHVlOiBmb3JtRGF0YSxcbiAgICAgICAgICBjaWQ6IGNpZFxuICAgICAgICB9LCBvblJlcGx5KVxuICAgICAgfSlcbiAgICB9IGVsc2UgaWYoIShmb3JtRWwuaGFzQXR0cmlidXRlKFBIWF9SRUYpICYmIGZvcm1FbC5jbGFzc0xpc3QuY29udGFpbnMoXCJwaHgtc3VibWl0LWxvYWRpbmdcIikpKXtcbiAgICAgIGxldCBtZXRhID0gdGhpcy5leHRyYWN0TWV0YShmb3JtRWwpXG4gICAgICBsZXQgZm9ybURhdGEgPSBzZXJpYWxpemVGb3JtKGZvcm1FbCwge3N1Ym1pdHRlciwgLi4ubWV0YX0pXG4gICAgICB0aGlzLnB1c2hXaXRoUmVwbHkocmVmR2VuZXJhdG9yLCBcImV2ZW50XCIsIHtcbiAgICAgICAgdHlwZTogXCJmb3JtXCIsXG4gICAgICAgIGV2ZW50OiBwaHhFdmVudCxcbiAgICAgICAgdmFsdWU6IGZvcm1EYXRhLFxuICAgICAgICBjaWQ6IGNpZFxuICAgICAgfSwgb25SZXBseSlcbiAgICB9XG4gIH1cblxuICB1cGxvYWRGaWxlcyhmb3JtRWwsIHRhcmdldEN0eCwgcmVmLCBjaWQsIG9uQ29tcGxldGUpe1xuICAgIGxldCBqb2luQ291bnRBdFVwbG9hZCA9IHRoaXMuam9pbkNvdW50XG4gICAgbGV0IGlucHV0RWxzID0gTGl2ZVVwbG9hZGVyLmFjdGl2ZUZpbGVJbnB1dHMoZm9ybUVsKVxuICAgIGxldCBudW1GaWxlSW5wdXRzSW5Qcm9ncmVzcyA9IGlucHV0RWxzLmxlbmd0aFxuXG4gICAgLy8gZ2V0IGVhY2ggZmlsZSBpbnB1dFxuICAgIGlucHV0RWxzLmZvckVhY2goaW5wdXRFbCA9PiB7XG4gICAgICBsZXQgdXBsb2FkZXIgPSBuZXcgTGl2ZVVwbG9hZGVyKGlucHV0RWwsIHRoaXMsICgpID0+IHtcbiAgICAgICAgbnVtRmlsZUlucHV0c0luUHJvZ3Jlc3MtLVxuICAgICAgICBpZihudW1GaWxlSW5wdXRzSW5Qcm9ncmVzcyA9PT0gMCl7IG9uQ29tcGxldGUoKSB9XG4gICAgICB9KTtcblxuICAgICAgdGhpcy51cGxvYWRlcnNbaW5wdXRFbF0gPSB1cGxvYWRlclxuICAgICAgbGV0IGVudHJpZXMgPSB1cGxvYWRlci5lbnRyaWVzKCkubWFwKGVudHJ5ID0+IGVudHJ5LnRvUHJlZmxpZ2h0UGF5bG9hZCgpKVxuXG4gICAgICBsZXQgcGF5bG9hZCA9IHtcbiAgICAgICAgcmVmOiBpbnB1dEVsLmdldEF0dHJpYnV0ZShQSFhfVVBMT0FEX1JFRiksXG4gICAgICAgIGVudHJpZXM6IGVudHJpZXMsXG4gICAgICAgIGNpZDogdGhpcy50YXJnZXRDb21wb25lbnRJRChpbnB1dEVsLmZvcm0sIHRhcmdldEN0eClcbiAgICAgIH1cblxuICAgICAgdGhpcy5sb2coXCJ1cGxvYWRcIiwgKCkgPT4gW1wic2VuZGluZyBwcmVmbGlnaHQgcmVxdWVzdFwiLCBwYXlsb2FkXSlcblxuICAgICAgdGhpcy5wdXNoV2l0aFJlcGx5KG51bGwsIFwiYWxsb3dfdXBsb2FkXCIsIHBheWxvYWQsIHJlc3AgPT4ge1xuICAgICAgICB0aGlzLmxvZyhcInVwbG9hZFwiLCAoKSA9PiBbXCJnb3QgcHJlZmxpZ2h0IHJlc3BvbnNlXCIsIHJlc3BdKVxuICAgICAgICBpZihyZXNwLmVycm9yKXtcbiAgICAgICAgICB0aGlzLnVuZG9SZWZzKHJlZilcbiAgICAgICAgICBsZXQgW2VudHJ5X3JlZiwgcmVhc29uXSA9IHJlc3AuZXJyb3JcbiAgICAgICAgICB0aGlzLmxvZyhcInVwbG9hZFwiLCAoKSA9PiBbYGVycm9yIGZvciBlbnRyeSAke2VudHJ5X3JlZn1gLCByZWFzb25dKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxldCBvbkVycm9yID0gKGNhbGxiYWNrKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNoYW5uZWwub25FcnJvcigoKSA9PiB7XG4gICAgICAgICAgICAgIGlmKHRoaXMuam9pbkNvdW50ID09PSBqb2luQ291bnRBdFVwbG9hZCl7IGNhbGxiYWNrKCkgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgICAgdXBsb2FkZXIuaW5pdEFkYXB0ZXJVcGxvYWQocmVzcCwgb25FcnJvciwgdGhpcy5saXZlU29ja2V0KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBkaXNwYXRjaFVwbG9hZHModGFyZ2V0Q3R4LCBuYW1lLCBmaWxlc09yQmxvYnMpe1xuICAgIGxldCB0YXJnZXRFbGVtZW50ID0gdGhpcy50YXJnZXRDdHhFbGVtZW50KHRhcmdldEN0eCkgfHwgdGhpcy5lbFxuICAgIGxldCBpbnB1dHMgPSBET00uZmluZFVwbG9hZElucHV0cyh0YXJnZXRFbGVtZW50KS5maWx0ZXIoZWwgPT4gZWwubmFtZSA9PT0gbmFtZSlcbiAgICBpZihpbnB1dHMubGVuZ3RoID09PSAwKXsgbG9nRXJyb3IoYG5vIGxpdmUgZmlsZSBpbnB1dHMgZm91bmQgbWF0Y2hpbmcgdGhlIG5hbWUgXCIke25hbWV9XCJgKSB9XG4gICAgZWxzZSBpZihpbnB1dHMubGVuZ3RoID4gMSl7IGxvZ0Vycm9yKGBkdXBsaWNhdGUgbGl2ZSBmaWxlIGlucHV0cyBmb3VuZCBtYXRjaGluZyB0aGUgbmFtZSBcIiR7bmFtZX1cImApIH1cbiAgICBlbHNlIHsgRE9NLmRpc3BhdGNoRXZlbnQoaW5wdXRzWzBdLCBQSFhfVFJBQ0tfVVBMT0FEUywge2RldGFpbDoge2ZpbGVzOiBmaWxlc09yQmxvYnN9fSkgfVxuICB9XG5cbiAgdGFyZ2V0Q3R4RWxlbWVudCh0YXJnZXRDdHgpIHtcbiAgICBpZihpc0NpZCh0YXJnZXRDdHgpKXtcbiAgICAgIGxldCBbdGFyZ2V0XSA9IERPTS5maW5kQ29tcG9uZW50Tm9kZUxpc3QodGhpcy5lbCwgdGFyZ2V0Q3R4KVxuICAgICAgcmV0dXJuIHRhcmdldFxuICAgIH0gZWxzZSBpZih0YXJnZXRDdHgpIHtcbiAgICAgIHJldHVybiB0YXJnZXRDdHhcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH1cblxuICBwdXNoRm9ybVJlY292ZXJ5KGZvcm0sIG5ld0NpZCwgY2FsbGJhY2spe1xuICAgIHRoaXMubGl2ZVNvY2tldC53aXRoaW5Pd25lcnMoZm9ybSwgKHZpZXcsIHRhcmdldEN0eCkgPT4ge1xuICAgICAgbGV0IHBoeENoYW5nZSA9IHRoaXMuYmluZGluZyhcImNoYW5nZVwiKVxuICAgICAgbGV0IGlucHV0cyA9IEFycmF5LmZyb20oZm9ybS5lbGVtZW50cykuZmlsdGVyKGVsID0+IERPTS5pc0Zvcm1JbnB1dChlbCkgJiYgZWwubmFtZSAmJiAhZWwuaGFzQXR0cmlidXRlKHBoeENoYW5nZSkpXG4gICAgICBpZihpbnB1dHMubGVuZ3RoID09PSAwKXsgcmV0dXJuIH1cblxuICAgICAgLy8gd2UgbXVzdCBjbGVhciB0cmFja2VkIHVwbG9hZHMgYmVmb3JlIHJlY292ZXJ5IGFzIHRoZXkgbm8gbG9uZ2VyIGhhdmUgdmFsaWQgcmVmc1xuICAgICAgaW5wdXRzLmZvckVhY2goaW5wdXQgPT4gaW5wdXQuaGFzQXR0cmlidXRlKFBIWF9VUExPQURfUkVGKSAmJiBMaXZlVXBsb2FkZXIuY2xlYXJGaWxlcyhpbnB1dCkpXG4gICAgICBsZXQgaW5wdXQgPSBpbnB1dHMuZmluZChlbCA9PiBlbC50eXBlICE9PSBcImhpZGRlblwiKSB8fCBpbnB1dHNbMF1cblxuICAgICAgbGV0IHBoeEV2ZW50ID0gZm9ybS5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFBIWF9BVVRPX1JFQ09WRVIpKSB8fCBmb3JtLmdldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoXCJjaGFuZ2VcIikpXG4gICAgICBKUy5leGVjKFwiY2hhbmdlXCIsIHBoeEV2ZW50LCB2aWV3LCBpbnB1dCwgW1wicHVzaFwiLCB7X3RhcmdldDogaW5wdXQubmFtZSwgbmV3Q2lkOiBuZXdDaWQsIGNhbGxiYWNrOiBjYWxsYmFja31dKVxuICAgIH0pXG4gIH1cblxuICBwdXNoTGlua1BhdGNoKGhyZWYsIHRhcmdldEVsLCBjYWxsYmFjayl7XG4gICAgbGV0IGxpbmtSZWYgPSB0aGlzLmxpdmVTb2NrZXQuc2V0UGVuZGluZ0xpbmsoaHJlZilcbiAgICBsZXQgcmVmR2VuID0gdGFyZ2V0RWwgPyAoKSA9PiB0aGlzLnB1dFJlZihbdGFyZ2V0RWxdLCBcImNsaWNrXCIpIDogbnVsbFxuICAgIGxldCBmYWxsYmFjayA9ICgpID0+IHRoaXMubGl2ZVNvY2tldC5yZWRpcmVjdCh3aW5kb3cubG9jYXRpb24uaHJlZilcbiAgICBsZXQgdXJsID0gaHJlZi5zdGFydHNXaXRoKFwiL1wiKSA/IGAke2xvY2F0aW9uLnByb3RvY29sfS8vJHtsb2NhdGlvbi5ob3N0fSR7aHJlZn1gIDogaHJlZlxuXG4gICAgbGV0IHB1c2ggPSB0aGlzLnB1c2hXaXRoUmVwbHkocmVmR2VuLCBcImxpdmVfcGF0Y2hcIiwge3VybH0sIHJlc3AgPT4ge1xuICAgICAgdGhpcy5saXZlU29ja2V0LnJlcXVlc3RET01VcGRhdGUoKCkgPT4ge1xuICAgICAgICBpZihyZXNwLmxpbmtfcmVkaXJlY3Qpe1xuICAgICAgICAgIHRoaXMubGl2ZVNvY2tldC5yZXBsYWNlTWFpbihocmVmLCBudWxsLCBjYWxsYmFjaywgbGlua1JlZilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZih0aGlzLmxpdmVTb2NrZXQuY29tbWl0UGVuZGluZ0xpbmsobGlua1JlZikpe1xuICAgICAgICAgICAgdGhpcy5ocmVmID0gaHJlZlxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFwcGx5UGVuZGluZ1VwZGF0ZXMoKVxuICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKGxpbmtSZWYpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcblxuICAgIGlmKHB1c2gpe1xuICAgICAgcHVzaC5yZWNlaXZlKFwidGltZW91dFwiLCBmYWxsYmFjaylcbiAgICB9IGVsc2Uge1xuICAgICAgZmFsbGJhY2soKVxuICAgIH1cbiAgfVxuXG4gIGZvcm1zRm9yUmVjb3ZlcnkoaHRtbCl7XG4gICAgaWYodGhpcy5qb2luQ291bnQgPT09IDApeyByZXR1cm4gW10gfVxuXG4gICAgbGV0IHBoeENoYW5nZSA9IHRoaXMuYmluZGluZyhcImNoYW5nZVwiKVxuICAgIGxldCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKVxuICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IGh0bWxcblxuICAgIHJldHVybiAoXG4gICAgICBET00uYWxsKHRoaXMuZWwsIGBmb3JtWyR7cGh4Q2hhbmdlfV1gKVxuICAgICAgICAuZmlsdGVyKGZvcm0gPT4gZm9ybS5pZCAmJiB0aGlzLm93bnNFbGVtZW50KGZvcm0pKVxuICAgICAgICAuZmlsdGVyKGZvcm0gPT4gZm9ybS5lbGVtZW50cy5sZW5ndGggPiAwKVxuICAgICAgICAuZmlsdGVyKGZvcm0gPT4gZm9ybS5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFBIWF9BVVRPX1JFQ09WRVIpKSAhPT0gXCJpZ25vcmVcIilcbiAgICAgICAgLm1hcChmb3JtID0+IHtcbiAgICAgICAgICAvLyBhdHRyaWJ1dGUgZ2l2ZW4gdmlhIEpTIG1vZHVsZSBuZWVkcyB0byBiZSBlc2NhcGVkIGFzIGl0IGNvbnRhaW5zIHRoZSBzeW1ib2xzIFtdXCIsXG4gICAgICAgICAgLy8gd2hpY2ggcmVzdWx0IGluIGFuIGludmFsaWQgY3NzIHNlbGVjdG9yIG90aGVyd2lzZS5cbiAgICAgICAgICBjb25zdCBwaHhDaGFuZ2VWYWx1ZSA9IENTUy5lc2NhcGUoZm9ybS5nZXRBdHRyaWJ1dGUocGh4Q2hhbmdlKSlcbiAgICAgICAgICBsZXQgbmV3Rm9ybSA9IHRlbXBsYXRlLmNvbnRlbnQucXVlcnlTZWxlY3RvcihgZm9ybVtpZD1cIiR7Zm9ybS5pZH1cIl1bJHtwaHhDaGFuZ2V9PVwiJHtwaHhDaGFuZ2VWYWx1ZX1cIl1gKVxuICAgICAgICAgIGlmKG5ld0Zvcm0pe1xuICAgICAgICAgICAgcmV0dXJuIFtmb3JtLCBuZXdGb3JtLCB0aGlzLnRhcmdldENvbXBvbmVudElEKG5ld0Zvcm0pXVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gW2Zvcm0sIGZvcm0sIHRoaXMudGFyZ2V0Q29tcG9uZW50SUQoZm9ybSldXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuZmlsdGVyKChbZm9ybSwgbmV3Rm9ybSwgbmV3Q2lkXSkgPT4gbmV3Rm9ybSlcbiAgICApXG4gIH1cblxuICBtYXliZVB1c2hDb21wb25lbnRzRGVzdHJveWVkKGRlc3Ryb3llZENJRHMpe1xuICAgIGxldCB3aWxsRGVzdHJveUNJRHMgPSBkZXN0cm95ZWRDSURzLmNvbmNhdCh0aGlzLnBydW5pbmdDSURzKS5maWx0ZXIoY2lkID0+IHtcbiAgICAgIHJldHVybiBET00uZmluZENvbXBvbmVudE5vZGVMaXN0KHRoaXMuZWwsIGNpZCkubGVuZ3RoID09PSAwXG4gICAgfSlcbiAgICAvLyBtYWtlIHN1cmUgdGhpcyBpcyBhIGNvcHkgYW5kIG5vdCBhIHJlZmVyZW5jZVxuICAgIHRoaXMucHJ1bmluZ0NJRHMgPSB3aWxsRGVzdHJveUNJRHMuY29uY2F0KFtdKVxuXG4gICAgaWYod2lsbERlc3Ryb3lDSURzLmxlbmd0aCA+IDApe1xuICAgICAgLy8gd2UgbXVzdCByZXNldCB0aGUgcmVuZGVyIGNoYW5nZSB0cmFja2luZyBmb3IgY2lkcyB0aGF0XG4gICAgICAvLyBjb3VsZCBiZSBhZGRlZCBiYWNrIGZyb20gdGhlIHNlcnZlciBzbyB3ZSBkb24ndCBza2lwIHRoZW1cbiAgICAgIHdpbGxEZXN0cm95Q0lEcy5mb3JFYWNoKGNpZCA9PiB0aGlzLnJlbmRlcmVkLnJlc2V0UmVuZGVyKGNpZCkpXG5cbiAgICAgIHRoaXMucHVzaFdpdGhSZXBseShudWxsLCBcImNpZHNfd2lsbF9kZXN0cm95XCIsIHtjaWRzOiB3aWxsRGVzdHJveUNJRHN9LCAoKSA9PiB7XG4gICAgICAgIC8vIFNlZSBpZiBhbnkgb2YgdGhlIGNpZHMgd2Ugd2FudGVkIHRvIGRlc3Ryb3kgd2VyZSBhZGRlZCBiYWNrLFxuICAgICAgICAvLyBpZiB0aGV5IHdlcmUgYWRkZWQgYmFjaywgd2UgZG9uJ3QgYWN0dWFsbHkgZGVzdHJveSB0aGVtLlxuICAgICAgICBsZXQgY29tcGxldGVseURlc3Ryb3lDSURzID0gd2lsbERlc3Ryb3lDSURzLmZpbHRlcihjaWQgPT4ge1xuICAgICAgICAgIHJldHVybiBET00uZmluZENvbXBvbmVudE5vZGVMaXN0KHRoaXMuZWwsIGNpZCkubGVuZ3RoID09PSAwXG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYoY29tcGxldGVseURlc3Ryb3lDSURzLmxlbmd0aCA+IDApe1xuICAgICAgICAgIHRoaXMucHVzaFdpdGhSZXBseShudWxsLCBcImNpZHNfZGVzdHJveWVkXCIsIHtjaWRzOiBjb21wbGV0ZWx5RGVzdHJveUNJRHN9LCAocmVzcCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wcnVuaW5nQ0lEcyA9IHRoaXMucHJ1bmluZ0NJRHMuZmlsdGVyKGNpZCA9PiByZXNwLmNpZHMuaW5kZXhPZihjaWQpID09PSAtMSlcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZWQucHJ1bmVDSURzKHJlc3AuY2lkcylcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIG93bnNFbGVtZW50KGVsKXtcbiAgICBsZXQgcGFyZW50Vmlld0VsID0gZWwuY2xvc2VzdChQSFhfVklFV19TRUxFQ1RPUilcbiAgICByZXR1cm4gZWwuZ2V0QXR0cmlidXRlKFBIWF9QQVJFTlRfSUQpID09PSB0aGlzLmlkIHx8XG4gICAgICAocGFyZW50Vmlld0VsICYmIHBhcmVudFZpZXdFbC5pZCA9PT0gdGhpcy5pZCkgfHxcbiAgICAgICghcGFyZW50Vmlld0VsICYmIHRoaXMuaXNEZWFkKVxuICB9XG5cbiAgc3VibWl0Rm9ybShmb3JtLCB0YXJnZXRDdHgsIHBoeEV2ZW50LCBzdWJtaXR0ZXIsIG9wdHMgPSB7fSl7XG4gICAgRE9NLnB1dFByaXZhdGUoZm9ybSwgUEhYX0hBU19TVUJNSVRURUQsIHRydWUpXG4gICAgY29uc3QgcGh4RmVlZGJhY2tGb3IgPSB0aGlzLmxpdmVTb2NrZXQuYmluZGluZyhQSFhfRkVFREJBQ0tfRk9SKVxuICAgIGNvbnN0IHBoeEZlZWRiYWNrR3JvdXAgPSB0aGlzLmxpdmVTb2NrZXQuYmluZGluZyhQSFhfRkVFREJBQ0tfR1JPVVApXG4gICAgY29uc3QgaW5wdXRzID0gQXJyYXkuZnJvbShmb3JtLmVsZW1lbnRzKVxuICAgIGlucHV0cy5mb3JFYWNoKGlucHV0ID0+IERPTS5wdXRQcml2YXRlKGlucHV0LCBQSFhfSEFTX1NVQk1JVFRFRCwgdHJ1ZSkpXG4gICAgdGhpcy5saXZlU29ja2V0LmJsdXJBY3RpdmVFbGVtZW50KHRoaXMpXG4gICAgdGhpcy5wdXNoRm9ybVN1Ym1pdChmb3JtLCB0YXJnZXRDdHgsIHBoeEV2ZW50LCBzdWJtaXR0ZXIsIG9wdHMsICgpID0+IHtcbiAgICAgIGlucHV0cy5mb3JFYWNoKGlucHV0ID0+IERPTS5zaG93RXJyb3IoaW5wdXQsIHBoeEZlZWRiYWNrRm9yLCBwaHhGZWVkYmFja0dyb3VwKSlcbiAgICAgIHRoaXMubGl2ZVNvY2tldC5yZXN0b3JlUHJldmlvdXNseUFjdGl2ZUZvY3VzKClcbiAgICB9KVxuICB9XG5cbiAgYmluZGluZyhraW5kKXsgcmV0dXJuIHRoaXMubGl2ZVNvY2tldC5iaW5kaW5nKGtpbmQpIH1cbn1cbiIsICIvKiogSW5pdGlhbGl6ZXMgdGhlIExpdmVTb2NrZXRcbiAqXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGVuZFBvaW50IC0gVGhlIHN0cmluZyBXZWJTb2NrZXQgZW5kcG9pbnQsIGllLCBgXCJ3c3M6Ly9leGFtcGxlLmNvbS9saXZlXCJgLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBcIi9saXZlXCJgIChpbmhlcml0ZWQgaG9zdCAmIHByb3RvY29sKVxuICogQHBhcmFtIHtQaG9lbml4LlNvY2tldH0gc29ja2V0IC0gdGhlIHJlcXVpcmVkIFBob2VuaXggU29ja2V0IGNsYXNzIGltcG9ydGVkIGZyb20gXCJwaG9lbml4XCIuIEZvciBleGFtcGxlOlxuICpcbiAqICAgICBpbXBvcnQge1NvY2tldH0gZnJvbSBcInBob2VuaXhcIlxuICogICAgIGltcG9ydCB7TGl2ZVNvY2tldH0gZnJvbSBcInBob2VuaXhfbGl2ZV92aWV3XCJcbiAqICAgICBsZXQgbGl2ZVNvY2tldCA9IG5ldyBMaXZlU29ja2V0KFwiL2xpdmVcIiwgU29ja2V0LCB7Li4ufSlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdHNdIC0gT3B0aW9uYWwgY29uZmlndXJhdGlvbi4gT3V0c2lkZSBvZiBrZXlzIGxpc3RlZCBiZWxvdywgYWxsXG4gKiBjb25maWd1cmF0aW9uIGlzIHBhc3NlZCBkaXJlY3RseSB0byB0aGUgUGhvZW5peCBTb2NrZXQgY29uc3RydWN0b3IuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdHMuZGVmYXVsdHNdIC0gVGhlIG9wdGlvbmFsIGRlZmF1bHRzIHRvIHVzZSBmb3IgdmFyaW91cyBiaW5kaW5ncyxcbiAqIHN1Y2ggYXMgYHBoeC1kZWJvdW5jZWAuIFN1cHBvcnRzIHRoZSBmb2xsb3dpbmcga2V5czpcbiAqXG4gKiAgIC0gZGVib3VuY2UgLSB0aGUgbWlsbGlzZWNvbmQgcGh4LWRlYm91bmNlIHRpbWUuIERlZmF1bHRzIDMwMFxuICogICAtIHRocm90dGxlIC0gdGhlIG1pbGxpc2Vjb25kIHBoeC10aHJvdHRsZSB0aW1lLiBEZWZhdWx0cyAzMDBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0cy5wYXJhbXNdIC0gVGhlIG9wdGlvbmFsIGZ1bmN0aW9uIGZvciBwYXNzaW5nIGNvbm5lY3QgcGFyYW1zLlxuICogVGhlIGZ1bmN0aW9uIHJlY2VpdmVzIHRoZSBlbGVtZW50IGFzc29jaWF0ZWQgd2l0aCBhIGdpdmVuIExpdmVWaWV3LiBGb3IgZXhhbXBsZTpcbiAqXG4gKiAgICAgKGVsKSA9PiB7dmlldzogZWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1teS12aWV3LW5hbWVcIiwgdG9rZW46IHdpbmRvdy5teVRva2VufVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0cy5iaW5kaW5nUHJlZml4XSAtIFRoZSBvcHRpb25hbCBwcmVmaXggdG8gdXNlIGZvciBhbGwgcGh4IERPTSBhbm5vdGF0aW9ucy5cbiAqIERlZmF1bHRzIHRvIFwicGh4LVwiLlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRzLmhvb2tzXSAtIFRoZSBvcHRpb25hbCBvYmplY3QgZm9yIHJlZmVyZW5jaW5nIExpdmVWaWV3IGhvb2sgY2FsbGJhY2tzLlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRzLnVwbG9hZGVyc10gLSBUaGUgb3B0aW9uYWwgb2JqZWN0IGZvciByZWZlcmVuY2luZyBMaXZlVmlldyB1cGxvYWRlciBjYWxsYmFja3MuXG4gKiBAcGFyYW0ge2ludGVnZXJ9IFtvcHRzLmxvYWRlclRpbWVvdXRdIC0gVGhlIG9wdGlvbmFsIGRlbGF5IGluIG1pbGxpc2Vjb25kcyB0byB3YWl0IGJlZm9yZSBhcHBseVxuICogbG9hZGluZyBzdGF0ZXMuXG4gKiBAcGFyYW0ge2ludGVnZXJ9IFtvcHRzLm1heFJlbG9hZHNdIC0gVGhlIG1heGltdW0gcmVsb2FkcyBiZWZvcmUgZW50ZXJpbmcgZmFpbHNhZmUgbW9kZS5cbiAqIEBwYXJhbSB7aW50ZWdlcn0gW29wdHMucmVsb2FkSml0dGVyTWluXSAtIFRoZSBtaW5pbXVtIHRpbWUgYmV0d2VlbiBub3JtYWwgcmVsb2FkIGF0dGVtcHRzLlxuICogQHBhcmFtIHtpbnRlZ2VyfSBbb3B0cy5yZWxvYWRKaXR0ZXJNYXhdIC0gVGhlIG1heGltdW0gdGltZSBiZXR3ZWVuIG5vcm1hbCByZWxvYWQgYXR0ZW1wdHMuXG4gKiBAcGFyYW0ge2ludGVnZXJ9IFtvcHRzLmZhaWxzYWZlSml0dGVyXSAtIFRoZSB0aW1lIGJldHdlZW4gcmVsb2FkIGF0dGVtcHRzIGluIGZhaWxzYWZlIG1vZGUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0cy52aWV3TG9nZ2VyXSAtIFRoZSBvcHRpb25hbCBmdW5jdGlvbiB0byBsb2cgZGVidWcgaW5mb3JtYXRpb24uIEZvciBleGFtcGxlOlxuICpcbiAqICAgICAodmlldywga2luZCwgbXNnLCBvYmopID0+IGNvbnNvbGUubG9nKGAke3ZpZXcuaWR9ICR7a2luZH06ICR7bXNnfSAtIGAsIG9iailcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdHMubWV0YWRhdGFdIC0gVGhlIG9wdGlvbmFsIG9iamVjdCBtYXBwaW5nIGV2ZW50IG5hbWVzIHRvIGZ1bmN0aW9ucyBmb3JcbiAqIHBvcHVsYXRpbmcgZXZlbnQgbWV0YWRhdGEuIEZvciBleGFtcGxlOlxuICpcbiAqICAgICBtZXRhZGF0YToge1xuICogICAgICAgY2xpY2s6IChlLCBlbCkgPT4ge1xuICogICAgICAgICByZXR1cm4ge1xuICogICAgICAgICAgIGN0cmxLZXk6IGUuY3RybEtleSxcbiAqICAgICAgICAgICBtZXRhS2V5OiBlLm1ldGFLZXksXG4gKiAgICAgICAgICAgZGV0YWlsOiBlLmRldGFpbCB8fCAxLFxuICogICAgICAgICB9XG4gKiAgICAgICB9LFxuICogICAgICAga2V5ZG93bjogKGUsIGVsKSA9PiB7XG4gKiAgICAgICAgIHJldHVybiB7XG4gKiAgICAgICAgICAga2V5OiBlLmtleSxcbiAqICAgICAgICAgICBjdHJsS2V5OiBlLmN0cmxLZXksXG4gKiAgICAgICAgICAgbWV0YUtleTogZS5tZXRhS2V5LFxuICogICAgICAgICAgIHNoaWZ0S2V5OiBlLnNoaWZ0S2V5XG4gKiAgICAgICAgIH1cbiAqICAgICAgIH1cbiAqICAgICB9XG4gKiBAcGFyYW0ge09iamVjdH0gW29wdHMuc2Vzc2lvblN0b3JhZ2VdIC0gQW4gb3B0aW9uYWwgU3RvcmFnZSBjb21wYXRpYmxlIG9iamVjdFxuICogVXNlZnVsIHdoZW4gTGl2ZVZpZXcgd29uJ3QgaGF2ZSBhY2Nlc3MgdG8gYHNlc3Npb25TdG9yYWdlYC4gIEZvciBleGFtcGxlLCBUaGlzIGNvdWxkXG4gKiBoYXBwZW4gaWYgYSBzaXRlIGxvYWRzIGEgY3Jvc3MtZG9tYWluIExpdmVWaWV3IGluIGFuIGlmcmFtZS4gIEV4YW1wbGUgdXNhZ2U6XG4gKlxuICogICAgIGNsYXNzIEluTWVtb3J5U3RvcmFnZSB7XG4gKiAgICAgICBjb25zdHJ1Y3RvcigpIHsgdGhpcy5zdG9yYWdlID0ge30gfVxuICogICAgICAgZ2V0SXRlbShrZXlOYW1lKSB7IHJldHVybiB0aGlzLnN0b3JhZ2Vba2V5TmFtZV0gfHwgbnVsbCB9XG4gKiAgICAgICByZW1vdmVJdGVtKGtleU5hbWUpIHsgZGVsZXRlIHRoaXMuc3RvcmFnZVtrZXlOYW1lXSB9XG4gKiAgICAgICBzZXRJdGVtKGtleU5hbWUsIGtleVZhbHVlKSB7IHRoaXMuc3RvcmFnZVtrZXlOYW1lXSA9IGtleVZhbHVlIH1cbiAqICAgICB9XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRzLmxvY2FsU3RvcmFnZV0gLSBBbiBvcHRpb25hbCBTdG9yYWdlIGNvbXBhdGlibGUgb2JqZWN0XG4gKiBVc2VmdWwgZm9yIHdoZW4gTGl2ZVZpZXcgd29uJ3QgaGF2ZSBhY2Nlc3MgdG8gYGxvY2FsU3RvcmFnZWAuXG4gKiBTZWUgYG9wdHMuc2Vzc2lvblN0b3JhZ2VgIGZvciBleGFtcGxlcy5cbiovXG5cbmltcG9ydCB7XG4gIEJJTkRJTkdfUFJFRklYLFxuICBDT05TRUNVVElWRV9SRUxPQURTLFxuICBERUZBVUxUUyxcbiAgRkFJTFNBRkVfSklUVEVSLFxuICBMT0FERVJfVElNRU9VVCxcbiAgTUFYX1JFTE9BRFMsXG4gIFBIWF9ERUJPVU5DRSxcbiAgUEhYX0RST1BfVEFSR0VULFxuICBQSFhfSEFTX0ZPQ1VTRUQsXG4gIFBIWF9LRVksXG4gIFBIWF9MSU5LX1NUQVRFLFxuICBQSFhfTElWRV9MSU5LLFxuICBQSFhfTFZfREVCVUcsXG4gIFBIWF9MVl9MQVRFTkNZX1NJTSxcbiAgUEhYX0xWX1BST0ZJTEUsXG4gIFBIWF9NQUlOLFxuICBQSFhfUEFSRU5UX0lELFxuICBQSFhfVklFV19TRUxFQ1RPUixcbiAgUEhYX1JPT1RfSUQsXG4gIFBIWF9USFJPVFRMRSxcbiAgUEhYX1RSQUNLX1VQTE9BRFMsXG4gIFBIWF9TRVNTSU9OLFxuICBQSFhfRkVFREJBQ0tfRk9SLFxuICBQSFhfRkVFREJBQ0tfR1JPVVAsXG4gIFJFTE9BRF9KSVRURVJfTUlOLFxuICBSRUxPQURfSklUVEVSX01BWCxcbiAgUEhYX1JFRixcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuaW1wb3J0IHtcbiAgY2xvbmUsXG4gIGNsb3Nlc3RQaHhCaW5kaW5nLFxuICBjbG9zdXJlLFxuICBkZWJ1ZyxcbiAgbWF5YmVcbn0gZnJvbSBcIi4vdXRpbHNcIlxuXG5pbXBvcnQgQnJvd3NlciBmcm9tIFwiLi9icm93c2VyXCJcbmltcG9ydCBET00gZnJvbSBcIi4vZG9tXCJcbmltcG9ydCBIb29rcyBmcm9tIFwiLi9ob29rc1wiXG5pbXBvcnQgTGl2ZVVwbG9hZGVyIGZyb20gXCIuL2xpdmVfdXBsb2FkZXJcIlxuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlld1wiXG5pbXBvcnQgSlMgZnJvbSBcIi4vanNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXZlU29ja2V0IHtcbiAgY29uc3RydWN0b3IodXJsLCBwaHhTb2NrZXQsIG9wdHMgPSB7fSl7XG4gICAgdGhpcy51bmxvYWRlZCA9IGZhbHNlXG4gICAgaWYoIXBoeFNvY2tldCB8fCBwaHhTb2NrZXQuY29uc3RydWN0b3IubmFtZSA9PT0gXCJPYmplY3RcIil7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFxuICAgICAgYSBwaG9lbml4IFNvY2tldCBtdXN0IGJlIHByb3ZpZGVkIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gdGhlIExpdmVTb2NrZXQgY29uc3RydWN0b3IuIEZvciBleGFtcGxlOlxuXG4gICAgICAgICAgaW1wb3J0IHtTb2NrZXR9IGZyb20gXCJwaG9lbml4XCJcbiAgICAgICAgICBpbXBvcnQge0xpdmVTb2NrZXR9IGZyb20gXCJwaG9lbml4X2xpdmVfdmlld1wiXG4gICAgICAgICAgbGV0IGxpdmVTb2NrZXQgPSBuZXcgTGl2ZVNvY2tldChcIi9saXZlXCIsIFNvY2tldCwgey4uLn0pXG4gICAgICBgKVxuICAgIH1cbiAgICB0aGlzLnNvY2tldCA9IG5ldyBwaHhTb2NrZXQodXJsLCBvcHRzKVxuICAgIHRoaXMuYmluZGluZ1ByZWZpeCA9IG9wdHMuYmluZGluZ1ByZWZpeCB8fCBCSU5ESU5HX1BSRUZJWFxuICAgIHRoaXMub3B0cyA9IG9wdHNcbiAgICB0aGlzLnBhcmFtcyA9IGNsb3N1cmUob3B0cy5wYXJhbXMgfHwge30pXG4gICAgdGhpcy52aWV3TG9nZ2VyID0gb3B0cy52aWV3TG9nZ2VyXG4gICAgdGhpcy5tZXRhZGF0YUNhbGxiYWNrcyA9IG9wdHMubWV0YWRhdGEgfHwge31cbiAgICB0aGlzLmRlZmF1bHRzID0gT2JqZWN0LmFzc2lnbihjbG9uZShERUZBVUxUUyksIG9wdHMuZGVmYXVsdHMgfHwge30pXG4gICAgdGhpcy5hY3RpdmVFbGVtZW50ID0gbnVsbFxuICAgIHRoaXMucHJldkFjdGl2ZSA9IG51bGxcbiAgICB0aGlzLnNpbGVuY2VkID0gZmFsc2VcbiAgICB0aGlzLm1haW4gPSBudWxsXG4gICAgdGhpcy5vdXRnb2luZ01haW5FbCA9IG51bGxcbiAgICB0aGlzLmNsaWNrU3RhcnRlZEF0VGFyZ2V0ID0gbnVsbFxuICAgIHRoaXMubGlua1JlZiA9IDFcbiAgICB0aGlzLnJvb3RzID0ge31cbiAgICB0aGlzLmhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZlxuICAgIHRoaXMucGVuZGluZ0xpbmsgPSBudWxsXG4gICAgdGhpcy5jdXJyZW50TG9jYXRpb24gPSBjbG9uZSh3aW5kb3cubG9jYXRpb24pXG4gICAgdGhpcy5ob29rcyA9IG9wdHMuaG9va3MgfHwge31cbiAgICB0aGlzLnVwbG9hZGVycyA9IG9wdHMudXBsb2FkZXJzIHx8IHt9XG4gICAgdGhpcy5sb2FkZXJUaW1lb3V0ID0gb3B0cy5sb2FkZXJUaW1lb3V0IHx8IExPQURFUl9USU1FT1VUXG4gICAgdGhpcy5yZWxvYWRXaXRoSml0dGVyVGltZXIgPSBudWxsXG4gICAgdGhpcy5tYXhSZWxvYWRzID0gb3B0cy5tYXhSZWxvYWRzIHx8IE1BWF9SRUxPQURTXG4gICAgdGhpcy5yZWxvYWRKaXR0ZXJNaW4gPSBvcHRzLnJlbG9hZEppdHRlck1pbiB8fCBSRUxPQURfSklUVEVSX01JTlxuICAgIHRoaXMucmVsb2FkSml0dGVyTWF4ID0gb3B0cy5yZWxvYWRKaXR0ZXJNYXggfHwgUkVMT0FEX0pJVFRFUl9NQVhcbiAgICB0aGlzLmZhaWxzYWZlSml0dGVyID0gb3B0cy5mYWlsc2FmZUppdHRlciB8fCBGQUlMU0FGRV9KSVRURVJcbiAgICB0aGlzLmxvY2FsU3RvcmFnZSA9IG9wdHMubG9jYWxTdG9yYWdlIHx8IHdpbmRvdy5sb2NhbFN0b3JhZ2VcbiAgICB0aGlzLnNlc3Npb25TdG9yYWdlID0gb3B0cy5zZXNzaW9uU3RvcmFnZSB8fCB3aW5kb3cuc2Vzc2lvblN0b3JhZ2VcbiAgICB0aGlzLmJvdW5kVG9wTGV2ZWxFdmVudHMgPSBmYWxzZVxuICAgIHRoaXMuZG9tQ2FsbGJhY2tzID0gT2JqZWN0LmFzc2lnbih7b25Ob2RlQWRkZWQ6IGNsb3N1cmUoKSwgb25CZWZvcmVFbFVwZGF0ZWQ6IGNsb3N1cmUoKX0sIG9wdHMuZG9tIHx8IHt9KVxuICAgIHRoaXMudHJhbnNpdGlvbnMgPSBuZXcgVHJhbnNpdGlvblNldCgpXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlaGlkZVwiLCBfZSA9PiB7XG4gICAgICB0aGlzLnVubG9hZGVkID0gdHJ1ZVxuICAgIH0pXG4gICAgdGhpcy5zb2NrZXQub25PcGVuKCgpID0+IHtcbiAgICAgIGlmKHRoaXMuaXNVbmxvYWRlZCgpKXtcbiAgICAgICAgLy8gcmVsb2FkIHBhZ2UgaWYgYmVpbmcgcmVzdG9yZWQgZnJvbSBiYWNrL2ZvcndhcmQgY2FjaGUgYW5kIGJyb3dzZXIgZG9lcyBub3QgZW1pdCBcInBhZ2VzaG93XCJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8vIHB1YmxpY1xuXG4gIGlzUHJvZmlsZUVuYWJsZWQoKXsgcmV0dXJuIHRoaXMuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShQSFhfTFZfUFJPRklMRSkgPT09IFwidHJ1ZVwiIH1cblxuICBpc0RlYnVnRW5hYmxlZCgpeyByZXR1cm4gdGhpcy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFBIWF9MVl9ERUJVRykgPT09IFwidHJ1ZVwiIH1cblxuICBpc0RlYnVnRGlzYWJsZWQoKXsgcmV0dXJuIHRoaXMuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShQSFhfTFZfREVCVUcpID09PSBcImZhbHNlXCIgfVxuXG4gIGVuYWJsZURlYnVnKCl7IHRoaXMuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShQSFhfTFZfREVCVUcsIFwidHJ1ZVwiKSB9XG5cbiAgZW5hYmxlUHJvZmlsaW5nKCl7IHRoaXMuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShQSFhfTFZfUFJPRklMRSwgXCJ0cnVlXCIpIH1cblxuICBkaXNhYmxlRGVidWcoKXsgdGhpcy5zZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFBIWF9MVl9ERUJVRywgXCJmYWxzZVwiKSB9XG5cbiAgZGlzYWJsZVByb2ZpbGluZygpeyB0aGlzLnNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oUEhYX0xWX1BST0ZJTEUpIH1cblxuICBlbmFibGVMYXRlbmN5U2ltKHVwcGVyQm91bmRNcyl7XG4gICAgdGhpcy5lbmFibGVEZWJ1ZygpXG4gICAgY29uc29sZS5sb2coXCJsYXRlbmN5IHNpbXVsYXRvciBlbmFibGVkIGZvciB0aGUgZHVyYXRpb24gb2YgdGhpcyBicm93c2VyIHNlc3Npb24uIENhbGwgZGlzYWJsZUxhdGVuY3lTaW0oKSB0byBkaXNhYmxlXCIpXG4gICAgdGhpcy5zZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFBIWF9MVl9MQVRFTkNZX1NJTSwgdXBwZXJCb3VuZE1zKVxuICB9XG5cbiAgZGlzYWJsZUxhdGVuY3lTaW0oKXsgdGhpcy5zZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFBIWF9MVl9MQVRFTkNZX1NJTSkgfVxuXG4gIGdldExhdGVuY3lTaW0oKXtcbiAgICBsZXQgc3RyID0gdGhpcy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFBIWF9MVl9MQVRFTkNZX1NJTSlcbiAgICByZXR1cm4gc3RyID8gcGFyc2VJbnQoc3RyKSA6IG51bGxcbiAgfVxuXG4gIGdldFNvY2tldCgpeyByZXR1cm4gdGhpcy5zb2NrZXQgfVxuXG4gIGNvbm5lY3QoKXtcbiAgICAvLyBlbmFibGUgZGVidWcgYnkgZGVmYXVsdCBpZiBvbiBsb2NhbGhvc3QgYW5kIG5vdCBleHBsaWNpdGx5IGRpc2FibGVkXG4gICAgaWYod2luZG93LmxvY2F0aW9uLmhvc3RuYW1lID09PSBcImxvY2FsaG9zdFwiICYmICF0aGlzLmlzRGVidWdEaXNhYmxlZCgpKXsgdGhpcy5lbmFibGVEZWJ1ZygpIH1cbiAgICBsZXQgZG9Db25uZWN0ID0gKCkgPT4ge1xuICAgICAgaWYodGhpcy5qb2luUm9vdFZpZXdzKCkpe1xuICAgICAgICB0aGlzLmJpbmRUb3BMZXZlbEV2ZW50cygpXG4gICAgICAgIHRoaXMuc29ja2V0LmNvbm5lY3QoKVxuICAgICAgfSBlbHNlIGlmKHRoaXMubWFpbil7XG4gICAgICAgIHRoaXMuc29ja2V0LmNvbm5lY3QoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5iaW5kVG9wTGV2ZWxFdmVudHMoe2RlYWQ6IHRydWV9KVxuICAgICAgfVxuICAgICAgdGhpcy5qb2luRGVhZFZpZXcoKVxuICAgIH1cbiAgICBpZihbXCJjb21wbGV0ZVwiLCBcImxvYWRlZFwiLCBcImludGVyYWN0aXZlXCJdLmluZGV4T2YoZG9jdW1lbnQucmVhZHlTdGF0ZSkgPj0gMCl7XG4gICAgICBkb0Nvbm5lY3QoKVxuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiBkb0Nvbm5lY3QoKSlcbiAgICB9XG4gIH1cblxuICBkaXNjb25uZWN0KGNhbGxiYWNrKXtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5yZWxvYWRXaXRoSml0dGVyVGltZXIpXG4gICAgdGhpcy5zb2NrZXQuZGlzY29ubmVjdChjYWxsYmFjaylcbiAgfVxuXG4gIHJlcGxhY2VUcmFuc3BvcnQodHJhbnNwb3J0KXtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5yZWxvYWRXaXRoSml0dGVyVGltZXIpXG4gICAgdGhpcy5zb2NrZXQucmVwbGFjZVRyYW5zcG9ydCh0cmFuc3BvcnQpXG4gICAgdGhpcy5jb25uZWN0KClcbiAgfVxuXG4gIGV4ZWNKUyhlbCwgZW5jb2RlZEpTLCBldmVudFR5cGUgPSBudWxsKXtcbiAgICB0aGlzLm93bmVyKGVsLCB2aWV3ID0+IEpTLmV4ZWMoZXZlbnRUeXBlLCBlbmNvZGVkSlMsIHZpZXcsIGVsKSlcbiAgfVxuXG4gIC8vIHByaXZhdGVcblxuICBleGVjSlNIb29rUHVzaChlbCwgcGh4RXZlbnQsIGRhdGEsIGNhbGxiYWNrKXtcbiAgICB0aGlzLndpdGhpbk93bmVycyhlbCwgdmlldyA9PiB7XG4gICAgICBKUy5leGVjKFwiaG9va1wiLCBwaHhFdmVudCwgdmlldywgZWwsIFtcInB1c2hcIiwge2RhdGEsIGNhbGxiYWNrfV0pXG4gICAgfSlcbiAgfVxuXG4gIHVubG9hZCgpe1xuICAgIGlmKHRoaXMudW5sb2FkZWQpeyByZXR1cm4gfVxuICAgIGlmKHRoaXMubWFpbiAmJiB0aGlzLmlzQ29ubmVjdGVkKCkpeyB0aGlzLmxvZyh0aGlzLm1haW4sIFwic29ja2V0XCIsICgpID0+IFtcImRpc2Nvbm5lY3QgZm9yIHBhZ2UgbmF2XCJdKSB9XG4gICAgdGhpcy51bmxvYWRlZCA9IHRydWVcbiAgICB0aGlzLmRlc3Ryb3lBbGxWaWV3cygpXG4gICAgdGhpcy5kaXNjb25uZWN0KClcbiAgfVxuXG4gIHRyaWdnZXJET00oa2luZCwgYXJncyl7IHRoaXMuZG9tQ2FsbGJhY2tzW2tpbmRdKC4uLmFyZ3MpIH1cblxuICB0aW1lKG5hbWUsIGZ1bmMpe1xuICAgIGlmKCF0aGlzLmlzUHJvZmlsZUVuYWJsZWQoKSB8fCAhY29uc29sZS50aW1lKXsgcmV0dXJuIGZ1bmMoKSB9XG4gICAgY29uc29sZS50aW1lKG5hbWUpXG4gICAgbGV0IHJlc3VsdCA9IGZ1bmMoKVxuICAgIGNvbnNvbGUudGltZUVuZChuYW1lKVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIGxvZyh2aWV3LCBraW5kLCBtc2dDYWxsYmFjayl7XG4gICAgaWYodGhpcy52aWV3TG9nZ2VyKXtcbiAgICAgIGxldCBbbXNnLCBvYmpdID0gbXNnQ2FsbGJhY2soKVxuICAgICAgdGhpcy52aWV3TG9nZ2VyKHZpZXcsIGtpbmQsIG1zZywgb2JqKVxuICAgIH0gZWxzZSBpZih0aGlzLmlzRGVidWdFbmFibGVkKCkpe1xuICAgICAgbGV0IFttc2csIG9ial0gPSBtc2dDYWxsYmFjaygpXG4gICAgICBkZWJ1Zyh2aWV3LCBraW5kLCBtc2csIG9iailcbiAgICB9XG4gIH1cblxuICByZXF1ZXN0RE9NVXBkYXRlKGNhbGxiYWNrKXtcbiAgICB0aGlzLnRyYW5zaXRpb25zLmFmdGVyKGNhbGxiYWNrKVxuICB9XG5cbiAgdHJhbnNpdGlvbih0aW1lLCBvblN0YXJ0LCBvbkRvbmUgPSBmdW5jdGlvbigpe30pe1xuICAgIHRoaXMudHJhbnNpdGlvbnMuYWRkVHJhbnNpdGlvbih0aW1lLCBvblN0YXJ0LCBvbkRvbmUpXG4gIH1cblxuICBvbkNoYW5uZWwoY2hhbm5lbCwgZXZlbnQsIGNiKXtcbiAgICBjaGFubmVsLm9uKGV2ZW50LCBkYXRhID0+IHtcbiAgICAgIGxldCBsYXRlbmN5ID0gdGhpcy5nZXRMYXRlbmN5U2ltKClcbiAgICAgIGlmKCFsYXRlbmN5KXtcbiAgICAgICAgY2IoZGF0YSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gY2IoZGF0YSksIGxhdGVuY3kpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHdyYXBQdXNoKHZpZXcsIG9wdHMsIHB1c2gpe1xuICAgIGxldCBsYXRlbmN5ID0gdGhpcy5nZXRMYXRlbmN5U2ltKClcbiAgICBsZXQgb2xkSm9pbkNvdW50ID0gdmlldy5qb2luQ291bnRcbiAgICBpZighbGF0ZW5jeSl7XG4gICAgICBpZih0aGlzLmlzQ29ubmVjdGVkKCkgJiYgb3B0cy50aW1lb3V0KXtcbiAgICAgICAgcmV0dXJuIHB1c2goKS5yZWNlaXZlKFwidGltZW91dFwiLCAoKSA9PiB7XG4gICAgICAgICAgaWYodmlldy5qb2luQ291bnQgPT09IG9sZEpvaW5Db3VudCAmJiAhdmlldy5pc0Rlc3Ryb3llZCgpKXtcbiAgICAgICAgICAgIHRoaXMucmVsb2FkV2l0aEppdHRlcih2aWV3LCAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMubG9nKHZpZXcsIFwidGltZW91dFwiLCAoKSA9PiBbXCJyZWNlaXZlZCB0aW1lb3V0IHdoaWxlIGNvbW11bmljYXRpbmcgd2l0aCBzZXJ2ZXIuIEZhbGxpbmcgYmFjayB0byBoYXJkIHJlZnJlc2ggZm9yIHJlY292ZXJ5XCJdKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcHVzaCgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGZha2VQdXNoID0ge1xuICAgICAgcmVjZWl2ZXM6IFtdLFxuICAgICAgcmVjZWl2ZShraW5kLCBjYil7IHRoaXMucmVjZWl2ZXMucHVzaChba2luZCwgY2JdKSB9XG4gICAgfVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYodmlldy5pc0Rlc3Ryb3llZCgpKXsgcmV0dXJuIH1cbiAgICAgIGZha2VQdXNoLnJlY2VpdmVzLnJlZHVjZSgoYWNjLCBba2luZCwgY2JdKSA9PiBhY2MucmVjZWl2ZShraW5kLCBjYiksIHB1c2goKSlcbiAgICB9LCBsYXRlbmN5KVxuICAgIHJldHVybiBmYWtlUHVzaFxuICB9XG5cbiAgcmVsb2FkV2l0aEppdHRlcih2aWV3LCBsb2cpe1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnJlbG9hZFdpdGhKaXR0ZXJUaW1lcilcbiAgICB0aGlzLmRpc2Nvbm5lY3QoKVxuICAgIGxldCBtaW5NcyA9IHRoaXMucmVsb2FkSml0dGVyTWluXG4gICAgbGV0IG1heE1zID0gdGhpcy5yZWxvYWRKaXR0ZXJNYXhcbiAgICBsZXQgYWZ0ZXJNcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXhNcyAtIG1pbk1zICsgMSkpICsgbWluTXNcbiAgICBsZXQgdHJpZXMgPSBCcm93c2VyLnVwZGF0ZUxvY2FsKHRoaXMubG9jYWxTdG9yYWdlLCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsIENPTlNFQ1VUSVZFX1JFTE9BRFMsIDAsIGNvdW50ID0+IGNvdW50ICsgMSlcbiAgICBpZih0cmllcyA+IHRoaXMubWF4UmVsb2Fkcyl7XG4gICAgICBhZnRlck1zID0gdGhpcy5mYWlsc2FmZUppdHRlclxuICAgIH1cbiAgICB0aGlzLnJlbG9hZFdpdGhKaXR0ZXJUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgLy8gaWYgdmlldyBoYXMgcmVjb3ZlcmVkLCBzdWNoIGFzIHRyYW5zcG9ydCByZXBsYWNlZCwgdGhlbiBjYW5jZWxcbiAgICAgIGlmKHZpZXcuaXNEZXN0cm95ZWQoKSB8fCB2aWV3LmlzQ29ubmVjdGVkKCkpeyByZXR1cm4gfVxuICAgICAgdmlldy5kZXN0cm95KClcbiAgICAgIGxvZyA/IGxvZygpIDogdGhpcy5sb2codmlldywgXCJqb2luXCIsICgpID0+IFtgZW5jb3VudGVyZWQgJHt0cmllc30gY29uc2VjdXRpdmUgcmVsb2Fkc2BdKVxuICAgICAgaWYodHJpZXMgPiB0aGlzLm1heFJlbG9hZHMpe1xuICAgICAgICB0aGlzLmxvZyh2aWV3LCBcImpvaW5cIiwgKCkgPT4gW2BleGNlZWRlZCAke3RoaXMubWF4UmVsb2Fkc30gY29uc2VjdXRpdmUgcmVsb2Fkcy4gRW50ZXJpbmcgZmFpbHNhZmUgbW9kZWBdKVxuICAgICAgfVxuICAgICAgaWYodGhpcy5oYXNQZW5kaW5nTGluaygpKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gdGhpcy5wZW5kaW5nTGlua1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpXG4gICAgICB9XG4gICAgfSwgYWZ0ZXJNcylcbiAgfVxuXG4gIGdldEhvb2tDYWxsYmFja3MobmFtZSl7XG4gICAgcmV0dXJuIG5hbWUgJiYgbmFtZS5zdGFydHNXaXRoKFwiUGhvZW5peC5cIikgPyBIb29rc1tuYW1lLnNwbGl0KFwiLlwiKVsxXV0gOiB0aGlzLmhvb2tzW25hbWVdXG4gIH1cblxuICBpc1VubG9hZGVkKCl7IHJldHVybiB0aGlzLnVubG9hZGVkIH1cblxuICBpc0Nvbm5lY3RlZCgpeyByZXR1cm4gdGhpcy5zb2NrZXQuaXNDb25uZWN0ZWQoKSB9XG5cbiAgZ2V0QmluZGluZ1ByZWZpeCgpeyByZXR1cm4gdGhpcy5iaW5kaW5nUHJlZml4IH1cblxuICBiaW5kaW5nKGtpbmQpeyByZXR1cm4gYCR7dGhpcy5nZXRCaW5kaW5nUHJlZml4KCl9JHtraW5kfWAgfVxuXG4gIGNoYW5uZWwodG9waWMsIHBhcmFtcyl7IHJldHVybiB0aGlzLnNvY2tldC5jaGFubmVsKHRvcGljLCBwYXJhbXMpIH1cblxuICBqb2luRGVhZFZpZXcoKXtcbiAgICBsZXQgYm9keSA9IGRvY3VtZW50LmJvZHlcbiAgICBpZihib2R5ICYmICF0aGlzLmlzUGh4Vmlldyhib2R5KSAmJiAhdGhpcy5pc1BoeFZpZXcoZG9jdW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQpKXtcbiAgICAgIGxldCB2aWV3ID0gdGhpcy5uZXdSb290Vmlldyhib2R5KVxuICAgICAgdmlldy5zZXRIcmVmKHRoaXMuZ2V0SHJlZigpKVxuICAgICAgdmlldy5qb2luRGVhZCgpXG4gICAgICBpZighdGhpcy5tYWluKXsgdGhpcy5tYWluID0gdmlldyB9XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHZpZXcuZXhlY05ld01vdW50ZWQoKSlcbiAgICB9XG4gIH1cblxuICBqb2luUm9vdFZpZXdzKCl7XG4gICAgbGV0IHJvb3RzRm91bmQgPSBmYWxzZVxuICAgIERPTS5hbGwoZG9jdW1lbnQsIGAke1BIWF9WSUVXX1NFTEVDVE9SfTpub3QoWyR7UEhYX1BBUkVOVF9JRH1dKWAsIHJvb3RFbCA9PiB7XG4gICAgICBpZighdGhpcy5nZXRSb290QnlJZChyb290RWwuaWQpKXtcbiAgICAgICAgbGV0IHZpZXcgPSB0aGlzLm5ld1Jvb3RWaWV3KHJvb3RFbClcbiAgICAgICAgdmlldy5zZXRIcmVmKHRoaXMuZ2V0SHJlZigpKVxuICAgICAgICB2aWV3LmpvaW4oKVxuICAgICAgICBpZihyb290RWwuaGFzQXR0cmlidXRlKFBIWF9NQUlOKSl7IHRoaXMubWFpbiA9IHZpZXcgfVxuICAgICAgfVxuICAgICAgcm9vdHNGb3VuZCA9IHRydWVcbiAgICB9KVxuICAgIHJldHVybiByb290c0ZvdW5kXG4gIH1cblxuICByZWRpcmVjdCh0bywgZmxhc2gpe1xuICAgIHRoaXMudW5sb2FkKClcbiAgICBCcm93c2VyLnJlZGlyZWN0KHRvLCBmbGFzaClcbiAgfVxuXG4gIHJlcGxhY2VNYWluKGhyZWYsIGZsYXNoLCBjYWxsYmFjayA9IG51bGwsIGxpbmtSZWYgPSB0aGlzLnNldFBlbmRpbmdMaW5rKGhyZWYpKXtcbiAgICBsZXQgbGl2ZVJlZmVyZXIgPSB0aGlzLmN1cnJlbnRMb2NhdGlvbi5ocmVmXG4gICAgdGhpcy5vdXRnb2luZ01haW5FbCA9IHRoaXMub3V0Z29pbmdNYWluRWwgfHwgdGhpcy5tYWluLmVsXG4gICAgbGV0IG5ld01haW5FbCA9IERPTS5jbG9uZU5vZGUodGhpcy5vdXRnb2luZ01haW5FbCwgXCJcIilcbiAgICB0aGlzLm1haW4uc2hvd0xvYWRlcih0aGlzLmxvYWRlclRpbWVvdXQpXG4gICAgdGhpcy5tYWluLmRlc3Ryb3koKVxuXG4gICAgdGhpcy5tYWluID0gdGhpcy5uZXdSb290VmlldyhuZXdNYWluRWwsIGZsYXNoLCBsaXZlUmVmZXJlcilcbiAgICB0aGlzLm1haW4uc2V0UmVkaXJlY3QoaHJlZilcbiAgICB0aGlzLnRyYW5zaXRpb25SZW1vdmVzKG51bGwsIHRydWUpXG4gICAgdGhpcy5tYWluLmpvaW4oKGpvaW5Db3VudCwgb25Eb25lKSA9PiB7XG4gICAgICBpZihqb2luQ291bnQgPT09IDEgJiYgdGhpcy5jb21taXRQZW5kaW5nTGluayhsaW5rUmVmKSl7XG4gICAgICAgIHRoaXMucmVxdWVzdERPTVVwZGF0ZSgoKSA9PiB7XG4gICAgICAgICAgRE9NLmZpbmRQaHhTdGlja3koZG9jdW1lbnQpLmZvckVhY2goZWwgPT4gbmV3TWFpbkVsLmFwcGVuZENoaWxkKGVsKSlcbiAgICAgICAgICB0aGlzLm91dGdvaW5nTWFpbkVsLnJlcGxhY2VXaXRoKG5ld01haW5FbClcbiAgICAgICAgICB0aGlzLm91dGdvaW5nTWFpbkVsID0gbnVsbFxuICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKGxpbmtSZWYpXG4gICAgICAgICAgb25Eb25lKClcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgdHJhbnNpdGlvblJlbW92ZXMoZWxlbWVudHMsIHNraXBTdGlja3kpe1xuICAgIGxldCByZW1vdmVBdHRyID0gdGhpcy5iaW5kaW5nKFwicmVtb3ZlXCIpXG4gICAgZWxlbWVudHMgPSBlbGVtZW50cyB8fCBET00uYWxsKGRvY3VtZW50LCBgWyR7cmVtb3ZlQXR0cn1dYClcblxuICAgIGlmKHNraXBTdGlja3kpe1xuICAgICAgY29uc3Qgc3RpY2tpZXMgPSBET00uZmluZFBoeFN0aWNreShkb2N1bWVudCkgfHwgW11cbiAgICAgIGVsZW1lbnRzID0gZWxlbWVudHMuZmlsdGVyKGVsID0+ICFET00uaXNDaGlsZE9mQW55KGVsLCBzdGlja2llcykpXG4gICAgfVxuICAgIGVsZW1lbnRzLmZvckVhY2goZWwgPT4ge1xuICAgICAgdGhpcy5leGVjSlMoZWwsIGVsLmdldEF0dHJpYnV0ZShyZW1vdmVBdHRyKSwgXCJyZW1vdmVcIilcbiAgICB9KVxuICB9XG5cbiAgaXNQaHhWaWV3KGVsKXsgcmV0dXJuIGVsLmdldEF0dHJpYnV0ZSAmJiBlbC5nZXRBdHRyaWJ1dGUoUEhYX1NFU1NJT04pICE9PSBudWxsIH1cblxuICBuZXdSb290VmlldyhlbCwgZmxhc2gsIGxpdmVSZWZlcmVyKXtcbiAgICBsZXQgdmlldyA9IG5ldyBWaWV3KGVsLCB0aGlzLCBudWxsLCBmbGFzaCwgbGl2ZVJlZmVyZXIpXG4gICAgdGhpcy5yb290c1t2aWV3LmlkXSA9IHZpZXdcbiAgICByZXR1cm4gdmlld1xuICB9XG5cbiAgb3duZXIoY2hpbGRFbCwgY2FsbGJhY2spe1xuICAgIGxldCB2aWV3ID0gbWF5YmUoY2hpbGRFbC5jbG9zZXN0KFBIWF9WSUVXX1NFTEVDVE9SKSwgZWwgPT4gdGhpcy5nZXRWaWV3QnlFbChlbCkpIHx8IHRoaXMubWFpblxuICAgIGlmKHZpZXcpeyBjYWxsYmFjayh2aWV3KSB9XG4gIH1cblxuICB3aXRoaW5Pd25lcnMoY2hpbGRFbCwgY2FsbGJhY2spe1xuICAgIHRoaXMub3duZXIoY2hpbGRFbCwgdmlldyA9PiBjYWxsYmFjayh2aWV3LCBjaGlsZEVsKSlcbiAgfVxuXG4gIGdldFZpZXdCeUVsKGVsKXtcbiAgICBsZXQgcm9vdElkID0gZWwuZ2V0QXR0cmlidXRlKFBIWF9ST09UX0lEKVxuICAgIHJldHVybiBtYXliZSh0aGlzLmdldFJvb3RCeUlkKHJvb3RJZCksIHJvb3QgPT4gcm9vdC5nZXREZXNjZW5kZW50QnlFbChlbCkpXG4gIH1cblxuICBnZXRSb290QnlJZChpZCl7IHJldHVybiB0aGlzLnJvb3RzW2lkXSB9XG5cbiAgZGVzdHJveUFsbFZpZXdzKCl7XG4gICAgZm9yKGxldCBpZCBpbiB0aGlzLnJvb3RzKXtcbiAgICAgIHRoaXMucm9vdHNbaWRdLmRlc3Ryb3koKVxuICAgICAgZGVsZXRlIHRoaXMucm9vdHNbaWRdXG4gICAgfVxuICAgIHRoaXMubWFpbiA9IG51bGxcbiAgfVxuXG4gIGRlc3Ryb3lWaWV3QnlFbChlbCl7XG4gICAgbGV0IHJvb3QgPSB0aGlzLmdldFJvb3RCeUlkKGVsLmdldEF0dHJpYnV0ZShQSFhfUk9PVF9JRCkpXG4gICAgaWYocm9vdCAmJiByb290LmlkID09PSBlbC5pZCl7XG4gICAgICByb290LmRlc3Ryb3koKVxuICAgICAgZGVsZXRlIHRoaXMucm9vdHNbcm9vdC5pZF1cbiAgICB9IGVsc2UgaWYocm9vdCl7XG4gICAgICByb290LmRlc3Ryb3lEZXNjZW5kZW50KGVsLmlkKVxuICAgIH1cbiAgfVxuXG4gIHNldEFjdGl2ZUVsZW1lbnQodGFyZ2V0KXtcbiAgICBpZih0aGlzLmFjdGl2ZUVsZW1lbnQgPT09IHRhcmdldCl7IHJldHVybiB9XG4gICAgdGhpcy5hY3RpdmVFbGVtZW50ID0gdGFyZ2V0XG4gICAgbGV0IGNhbmNlbCA9ICgpID0+IHtcbiAgICAgIGlmKHRhcmdldCA9PT0gdGhpcy5hY3RpdmVFbGVtZW50KXsgdGhpcy5hY3RpdmVFbGVtZW50ID0gbnVsbCB9XG4gICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcylcbiAgICAgIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgdGhpcylcbiAgICB9XG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGNhbmNlbClcbiAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGNhbmNlbClcbiAgfVxuXG4gIGdldEFjdGl2ZUVsZW1lbnQoKXtcbiAgICBpZihkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBkb2N1bWVudC5ib2R5KXtcbiAgICAgIHJldHVybiB0aGlzLmFjdGl2ZUVsZW1lbnQgfHwgZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBkb2N1bWVudC5hY3RpdmVFbGVtZW50IGNhbiBiZSBudWxsIGluIEludGVybmV0IEV4cGxvcmVyIDExXG4gICAgICByZXR1cm4gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCB8fCBkb2N1bWVudC5ib2R5XG4gICAgfVxuICB9XG5cbiAgZHJvcEFjdGl2ZUVsZW1lbnQodmlldyl7XG4gICAgaWYodGhpcy5wcmV2QWN0aXZlICYmIHZpZXcub3duc0VsZW1lbnQodGhpcy5wcmV2QWN0aXZlKSl7XG4gICAgICB0aGlzLnByZXZBY3RpdmUgPSBudWxsXG4gICAgfVxuICB9XG5cbiAgcmVzdG9yZVByZXZpb3VzbHlBY3RpdmVGb2N1cygpe1xuICAgIGlmKHRoaXMucHJldkFjdGl2ZSAmJiB0aGlzLnByZXZBY3RpdmUgIT09IGRvY3VtZW50LmJvZHkpe1xuICAgICAgdGhpcy5wcmV2QWN0aXZlLmZvY3VzKClcbiAgICB9XG4gIH1cblxuICBibHVyQWN0aXZlRWxlbWVudCgpe1xuICAgIHRoaXMucHJldkFjdGl2ZSA9IHRoaXMuZ2V0QWN0aXZlRWxlbWVudCgpXG4gICAgaWYodGhpcy5wcmV2QWN0aXZlICE9PSBkb2N1bWVudC5ib2R5KXsgdGhpcy5wcmV2QWN0aXZlLmJsdXIoKSB9XG4gIH1cblxuICBiaW5kVG9wTGV2ZWxFdmVudHMoe2RlYWR9ID0ge30pe1xuICAgIGlmKHRoaXMuYm91bmRUb3BMZXZlbEV2ZW50cyl7IHJldHVybiB9XG5cbiAgICB0aGlzLmJvdW5kVG9wTGV2ZWxFdmVudHMgPSB0cnVlXG4gICAgLy8gZW50ZXIgZmFpbHNhZmUgcmVsb2FkIGlmIHNlcnZlciBoYXMgZ29uZSBhd2F5IGludGVudGlvbmFsbHksIHN1Y2ggYXMgXCJkaXNjb25uZWN0XCIgYnJvYWRjYXN0XG4gICAgdGhpcy5zb2NrZXQub25DbG9zZShldmVudCA9PiB7XG4gICAgICAvLyBmYWlsc2FmZSByZWxvYWQgaWYgbm9ybWFsIGNsb3N1cmUgYW5kIHdlIHN0aWxsIGhhdmUgYSBtYWluIExWXG4gICAgICBpZihldmVudCAmJiBldmVudC5jb2RlID09PSAxMDAwICYmIHRoaXMubWFpbil7IHJldHVybiB0aGlzLnJlbG9hZFdpdGhKaXR0ZXIodGhpcy5tYWluKSB9XG4gICAgfSlcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKXsgfSkgLy8gZW5zdXJlIGFsbCBjbGljayBldmVudHMgYnViYmxlIGZvciBtb2JpbGUgU2FmYXJpXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBlID0+IHtcbiAgICAgIGlmKGUucGVyc2lzdGVkKXsgLy8gcmVsb2FkIHBhZ2UgaWYgYmVpbmcgcmVzdG9yZWQgZnJvbSBiYWNrL2ZvcndhcmQgY2FjaGVcbiAgICAgICAgdGhpcy5nZXRTb2NrZXQoKS5kaXNjb25uZWN0KClcbiAgICAgICAgdGhpcy53aXRoUGFnZUxvYWRpbmcoe3RvOiB3aW5kb3cubG9jYXRpb24uaHJlZiwga2luZDogXCJyZWRpcmVjdFwifSlcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpXG4gICAgICB9XG4gICAgfSwgdHJ1ZSlcbiAgICBpZighZGVhZCl7IHRoaXMuYmluZE5hdigpIH1cbiAgICB0aGlzLmJpbmRDbGlja3MoKVxuICAgIGlmKCFkZWFkKXsgdGhpcy5iaW5kRm9ybXMoKSB9XG4gICAgdGhpcy5iaW5kKHtrZXl1cDogXCJrZXl1cFwiLCBrZXlkb3duOiBcImtleWRvd25cIn0sIChlLCB0eXBlLCB2aWV3LCB0YXJnZXRFbCwgcGh4RXZlbnQsIHBoeFRhcmdldCkgPT4ge1xuICAgICAgbGV0IG1hdGNoS2V5ID0gdGFyZ2V0RWwuZ2V0QXR0cmlidXRlKHRoaXMuYmluZGluZyhQSFhfS0VZKSlcbiAgICAgIGxldCBwcmVzc2VkS2V5ID0gZS5rZXkgJiYgZS5rZXkudG9Mb3dlckNhc2UoKSAvLyBjaHJvbWUgY2xpY2tlZCBhdXRvY29tcGxldGVzIHNlbmQgYSBrZXlkb3duIHdpdGhvdXQga2V5XG4gICAgICBpZihtYXRjaEtleSAmJiBtYXRjaEtleS50b0xvd2VyQ2FzZSgpICE9PSBwcmVzc2VkS2V5KXsgcmV0dXJuIH1cblxuICAgICAgbGV0IGRhdGEgPSB7a2V5OiBlLmtleSwgLi4udGhpcy5ldmVudE1ldGEodHlwZSwgZSwgdGFyZ2V0RWwpfVxuICAgICAgSlMuZXhlYyh0eXBlLCBwaHhFdmVudCwgdmlldywgdGFyZ2V0RWwsIFtcInB1c2hcIiwge2RhdGF9XSlcbiAgICB9KVxuICAgIHRoaXMuYmluZCh7Ymx1cjogXCJmb2N1c291dFwiLCBmb2N1czogXCJmb2N1c2luXCJ9LCAoZSwgdHlwZSwgdmlldywgdGFyZ2V0RWwsIHBoeEV2ZW50LCBwaHhUYXJnZXQpID0+IHtcbiAgICAgIGlmKCFwaHhUYXJnZXQpe1xuICAgICAgICBsZXQgZGF0YSA9IHtrZXk6IGUua2V5LCAuLi50aGlzLmV2ZW50TWV0YSh0eXBlLCBlLCB0YXJnZXRFbCl9XG4gICAgICAgIEpTLmV4ZWModHlwZSwgcGh4RXZlbnQsIHZpZXcsIHRhcmdldEVsLCBbXCJwdXNoXCIsIHtkYXRhfV0pXG4gICAgICB9XG4gICAgfSlcbiAgICB0aGlzLmJpbmQoe2JsdXI6IFwiYmx1clwiLCBmb2N1czogXCJmb2N1c1wifSwgKGUsIHR5cGUsIHZpZXcsIHRhcmdldEVsLCBwaHhFdmVudCwgcGh4VGFyZ2V0KSA9PiB7XG4gICAgICAvLyBibHVyIGFuZCBmb2N1cyBhcmUgdHJpZ2dlcmVkIG9uIGRvY3VtZW50IGFuZCB3aW5kb3cuIERpc2NhcmQgb25lIHRvIGF2b2lkIGR1cHNcbiAgICAgIGlmKHBoeFRhcmdldCA9PT0gXCJ3aW5kb3dcIil7XG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5ldmVudE1ldGEodHlwZSwgZSwgdGFyZ2V0RWwpXG4gICAgICAgIEpTLmV4ZWModHlwZSwgcGh4RXZlbnQsIHZpZXcsIHRhcmdldEVsLCBbXCJwdXNoXCIsIHtkYXRhfV0pXG4gICAgICB9XG4gICAgfSlcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIGUgPT4gZS5wcmV2ZW50RGVmYXVsdCgpKVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCBlID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgbGV0IGRyb3BUYXJnZXRJZCA9IG1heWJlKGNsb3Nlc3RQaHhCaW5kaW5nKGUudGFyZ2V0LCB0aGlzLmJpbmRpbmcoUEhYX0RST1BfVEFSR0VUKSksIHRydWVUYXJnZXQgPT4ge1xuICAgICAgICByZXR1cm4gdHJ1ZVRhcmdldC5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFBIWF9EUk9QX1RBUkdFVCkpXG4gICAgICB9KVxuICAgICAgbGV0IGRyb3BUYXJnZXQgPSBkcm9wVGFyZ2V0SWQgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZHJvcFRhcmdldElkKVxuICAgICAgbGV0IGZpbGVzID0gQXJyYXkuZnJvbShlLmRhdGFUcmFuc2Zlci5maWxlcyB8fCBbXSlcbiAgICAgIGlmKCFkcm9wVGFyZ2V0IHx8IGRyb3BUYXJnZXQuZGlzYWJsZWQgfHwgZmlsZXMubGVuZ3RoID09PSAwIHx8ICEoZHJvcFRhcmdldC5maWxlcyBpbnN0YW5jZW9mIEZpbGVMaXN0KSl7IHJldHVybiB9XG5cbiAgICAgIExpdmVVcGxvYWRlci50cmFja0ZpbGVzKGRyb3BUYXJnZXQsIGZpbGVzLCBlLmRhdGFUcmFuc2ZlcilcbiAgICAgIGRyb3BUYXJnZXQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJpbnB1dFwiLCB7YnViYmxlczogdHJ1ZX0pKVxuICAgIH0pXG4gICAgdGhpcy5vbihQSFhfVFJBQ0tfVVBMT0FEUywgZSA9PiB7XG4gICAgICBsZXQgdXBsb2FkVGFyZ2V0ID0gZS50YXJnZXRcbiAgICAgIGlmKCFET00uaXNVcGxvYWRJbnB1dCh1cGxvYWRUYXJnZXQpKXsgcmV0dXJuIH1cbiAgICAgIGxldCBmaWxlcyA9IEFycmF5LmZyb20oZS5kZXRhaWwuZmlsZXMgfHwgW10pLmZpbHRlcihmID0+IGYgaW5zdGFuY2VvZiBGaWxlIHx8IGYgaW5zdGFuY2VvZiBCbG9iKVxuICAgICAgTGl2ZVVwbG9hZGVyLnRyYWNrRmlsZXModXBsb2FkVGFyZ2V0LCBmaWxlcylcbiAgICAgIHVwbG9hZFRhcmdldC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImlucHV0XCIsIHtidWJibGVzOiB0cnVlfSkpXG4gICAgfSlcbiAgfVxuXG4gIGV2ZW50TWV0YShldmVudE5hbWUsIGUsIHRhcmdldEVsKXtcbiAgICBsZXQgY2FsbGJhY2sgPSB0aGlzLm1ldGFkYXRhQ2FsbGJhY2tzW2V2ZW50TmFtZV1cbiAgICByZXR1cm4gY2FsbGJhY2sgPyBjYWxsYmFjayhlLCB0YXJnZXRFbCkgOiB7fVxuICB9XG5cbiAgc2V0UGVuZGluZ0xpbmsoaHJlZil7XG4gICAgdGhpcy5saW5rUmVmKytcbiAgICB0aGlzLnBlbmRpbmdMaW5rID0gaHJlZlxuICAgIHJldHVybiB0aGlzLmxpbmtSZWZcbiAgfVxuXG4gIGNvbW1pdFBlbmRpbmdMaW5rKGxpbmtSZWYpe1xuICAgIGlmKHRoaXMubGlua1JlZiAhPT0gbGlua1JlZil7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ocmVmID0gdGhpcy5wZW5kaW5nTGlua1xuICAgICAgdGhpcy5wZW5kaW5nTGluayA9IG51bGxcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG5cbiAgZ2V0SHJlZigpeyByZXR1cm4gdGhpcy5ocmVmIH1cblxuICBoYXNQZW5kaW5nTGluaygpeyByZXR1cm4gISF0aGlzLnBlbmRpbmdMaW5rIH1cblxuICBiaW5kKGV2ZW50cywgY2FsbGJhY2spe1xuICAgIGZvcihsZXQgZXZlbnQgaW4gZXZlbnRzKXtcbiAgICAgIGxldCBicm93c2VyRXZlbnROYW1lID0gZXZlbnRzW2V2ZW50XVxuXG4gICAgICB0aGlzLm9uKGJyb3dzZXJFdmVudE5hbWUsIGUgPT4ge1xuICAgICAgICBsZXQgYmluZGluZyA9IHRoaXMuYmluZGluZyhldmVudClcbiAgICAgICAgbGV0IHdpbmRvd0JpbmRpbmcgPSB0aGlzLmJpbmRpbmcoYHdpbmRvdy0ke2V2ZW50fWApXG4gICAgICAgIGxldCB0YXJnZXRQaHhFdmVudCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSAmJiBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoYmluZGluZylcbiAgICAgICAgaWYodGFyZ2V0UGh4RXZlbnQpe1xuICAgICAgICAgIHRoaXMuZGVib3VuY2UoZS50YXJnZXQsIGUsIGJyb3dzZXJFdmVudE5hbWUsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMud2l0aGluT3duZXJzKGUudGFyZ2V0LCB2aWV3ID0+IHtcbiAgICAgICAgICAgICAgY2FsbGJhY2soZSwgZXZlbnQsIHZpZXcsIGUudGFyZ2V0LCB0YXJnZXRQaHhFdmVudCwgbnVsbClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBET00uYWxsKGRvY3VtZW50LCBgWyR7d2luZG93QmluZGluZ31dYCwgZWwgPT4ge1xuICAgICAgICAgICAgbGV0IHBoeEV2ZW50ID0gZWwuZ2V0QXR0cmlidXRlKHdpbmRvd0JpbmRpbmcpXG4gICAgICAgICAgICB0aGlzLmRlYm91bmNlKGVsLCBlLCBicm93c2VyRXZlbnROYW1lLCAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMud2l0aGluT3duZXJzKGVsLCB2aWV3ID0+IHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhlLCBldmVudCwgdmlldywgZWwsIHBoeEV2ZW50LCBcIndpbmRvd1wiKVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGJpbmRDbGlja3MoKXtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBlID0+IHRoaXMuY2xpY2tTdGFydGVkQXRUYXJnZXQgPSBlLnRhcmdldClcbiAgICB0aGlzLmJpbmRDbGljayhcImNsaWNrXCIsIFwiY2xpY2tcIiwgZmFsc2UpXG4gICAgdGhpcy5iaW5kQ2xpY2soXCJtb3VzZWRvd25cIiwgXCJjYXB0dXJlLWNsaWNrXCIsIHRydWUpXG4gIH1cblxuICBiaW5kQ2xpY2soZXZlbnROYW1lLCBiaW5kaW5nTmFtZSwgY2FwdHVyZSl7XG4gICAgbGV0IGNsaWNrID0gdGhpcy5iaW5kaW5nKGJpbmRpbmdOYW1lKVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZSA9PiB7XG4gICAgICBsZXQgdGFyZ2V0ID0gbnVsbFxuICAgICAgaWYoY2FwdHVyZSl7XG4gICAgICAgIHRhcmdldCA9IGUudGFyZ2V0Lm1hdGNoZXMoYFske2NsaWNrfV1gKSA/IGUudGFyZ2V0IDogZS50YXJnZXQucXVlcnlTZWxlY3RvcihgWyR7Y2xpY2t9XWApXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBhIHN5bnRoZXRpYyBjbGljayBldmVudCAoZGV0YWlsIDApIHdpbGwgbm90IGhhdmUgY2F1c2VkIGEgbW91c2Vkb3duIGV2ZW50LFxuICAgICAgICAvLyB0aGVyZWZvcmUgdGhlIGNsaWNrU3RhcnRlZEF0VGFyZ2V0IGlzIHN0YWxlXG4gICAgICAgIGlmKGUuZGV0YWlsID09PSAwKSB0aGlzLmNsaWNrU3RhcnRlZEF0VGFyZ2V0ID0gZS50YXJnZXRcbiAgICAgICAgbGV0IGNsaWNrU3RhcnRlZEF0VGFyZ2V0ID0gdGhpcy5jbGlja1N0YXJ0ZWRBdFRhcmdldCB8fCBlLnRhcmdldFxuICAgICAgICB0YXJnZXQgPSBjbG9zZXN0UGh4QmluZGluZyhjbGlja1N0YXJ0ZWRBdFRhcmdldCwgY2xpY2spXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hDbGlja0F3YXkoZSwgY2xpY2tTdGFydGVkQXRUYXJnZXQpXG4gICAgICAgIHRoaXMuY2xpY2tTdGFydGVkQXRUYXJnZXQgPSBudWxsXG4gICAgICB9XG4gICAgICBsZXQgcGh4RXZlbnQgPSB0YXJnZXQgJiYgdGFyZ2V0LmdldEF0dHJpYnV0ZShjbGljaylcbiAgICAgIGlmKCFwaHhFdmVudCl7XG4gICAgICAgIGlmKCFjYXB0dXJlICYmIERPTS5pc05ld1BhZ2VDbGljayhlLCB3aW5kb3cubG9jYXRpb24pKXsgdGhpcy51bmxvYWQoKSB9XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZih0YXJnZXQuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKSA9PT0gXCIjXCIpeyBlLnByZXZlbnREZWZhdWx0KCkgfVxuXG4gICAgICAvLyBub29wIGlmIHdlIGFyZSBpbiB0aGUgbWlkZGxlIG9mIGF3YWl0aW5nIGFuIGFjayBmb3IgdGhpcyBlbCBhbHJlYWR5XG4gICAgICBpZih0YXJnZXQuaGFzQXR0cmlidXRlKFBIWF9SRUYpKXsgcmV0dXJuIH1cblxuICAgICAgdGhpcy5kZWJvdW5jZSh0YXJnZXQsIGUsIFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLndpdGhpbk93bmVycyh0YXJnZXQsIHZpZXcgPT4ge1xuICAgICAgICAgIEpTLmV4ZWMoXCJjbGlja1wiLCBwaHhFdmVudCwgdmlldywgdGFyZ2V0LCBbXCJwdXNoXCIsIHtkYXRhOiB0aGlzLmV2ZW50TWV0YShcImNsaWNrXCIsIGUsIHRhcmdldCl9XSlcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSwgY2FwdHVyZSlcbiAgfVxuXG4gIGRpc3BhdGNoQ2xpY2tBd2F5KGUsIGNsaWNrU3RhcnRlZEF0KXtcbiAgICBsZXQgcGh4Q2xpY2tBd2F5ID0gdGhpcy5iaW5kaW5nKFwiY2xpY2stYXdheVwiKVxuICAgIERPTS5hbGwoZG9jdW1lbnQsIGBbJHtwaHhDbGlja0F3YXl9XWAsIGVsID0+IHtcbiAgICAgIGlmKCEoZWwuaXNTYW1lTm9kZShjbGlja1N0YXJ0ZWRBdCkgfHwgZWwuY29udGFpbnMoY2xpY2tTdGFydGVkQXQpKSl7XG4gICAgICAgIHRoaXMud2l0aGluT3duZXJzKGVsLCB2aWV3ID0+IHtcbiAgICAgICAgICBsZXQgcGh4RXZlbnQgPSBlbC5nZXRBdHRyaWJ1dGUocGh4Q2xpY2tBd2F5KVxuICAgICAgICAgIGlmKEpTLmlzVmlzaWJsZShlbCkgJiYgSlMuaXNJblZpZXdwb3J0KGVsKSl7XG4gICAgICAgICAgICBKUy5leGVjKFwiY2xpY2tcIiwgcGh4RXZlbnQsIHZpZXcsIGVsLCBbXCJwdXNoXCIsIHtkYXRhOiB0aGlzLmV2ZW50TWV0YShcImNsaWNrXCIsIGUsIGUudGFyZ2V0KX1dKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgYmluZE5hdigpe1xuICAgIGlmKCFCcm93c2VyLmNhblB1c2hTdGF0ZSgpKXsgcmV0dXJuIH1cbiAgICBpZihoaXN0b3J5LnNjcm9sbFJlc3RvcmF0aW9uKXsgaGlzdG9yeS5zY3JvbGxSZXN0b3JhdGlvbiA9IFwibWFudWFsXCIgfVxuICAgIGxldCBzY3JvbGxUaW1lciA9IG51bGxcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBfZSA9PiB7XG4gICAgICBjbGVhclRpbWVvdXQoc2Nyb2xsVGltZXIpXG4gICAgICBzY3JvbGxUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBCcm93c2VyLnVwZGF0ZUN1cnJlbnRTdGF0ZShzdGF0ZSA9PiBPYmplY3QuYXNzaWduKHN0YXRlLCB7c2Nyb2xsOiB3aW5kb3cuc2Nyb2xsWX0pKVxuICAgICAgfSwgMTAwKVxuICAgIH0pXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBldmVudCA9PiB7XG4gICAgICBpZighdGhpcy5yZWdpc3Rlck5ld0xvY2F0aW9uKHdpbmRvdy5sb2NhdGlvbikpeyByZXR1cm4gfVxuICAgICAgbGV0IHt0eXBlLCBpZCwgcm9vdCwgc2Nyb2xsfSA9IGV2ZW50LnN0YXRlIHx8IHt9XG4gICAgICBsZXQgaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmXG5cbiAgICAgIERPTS5kaXNwYXRjaEV2ZW50KHdpbmRvdywgXCJwaHg6bmF2aWdhdGVcIiwge2RldGFpbDoge2hyZWYsIHBhdGNoOiB0eXBlID09PSBcInBhdGNoXCIsIHBvcDogdHJ1ZX19KVxuICAgICAgdGhpcy5yZXF1ZXN0RE9NVXBkYXRlKCgpID0+IHtcbiAgICAgICAgaWYodGhpcy5tYWluLmlzQ29ubmVjdGVkKCkgJiYgKHR5cGUgPT09IFwicGF0Y2hcIiAmJiBpZCA9PT0gdGhpcy5tYWluLmlkKSl7XG4gICAgICAgICAgdGhpcy5tYWluLnB1c2hMaW5rUGF0Y2goaHJlZiwgbnVsbCwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5tYXliZVNjcm9sbChzY3JvbGwpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJlcGxhY2VNYWluKGhyZWYsIG51bGwsICgpID0+IHtcbiAgICAgICAgICAgIGlmKHJvb3QpeyB0aGlzLnJlcGxhY2VSb290SGlzdG9yeSgpIH1cbiAgICAgICAgICAgIHRoaXMubWF5YmVTY3JvbGwoc2Nyb2xsKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSwgZmFsc2UpXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICAgIGxldCB0YXJnZXQgPSBjbG9zZXN0UGh4QmluZGluZyhlLnRhcmdldCwgUEhYX0xJVkVfTElOSylcbiAgICAgIGxldCB0eXBlID0gdGFyZ2V0ICYmIHRhcmdldC5nZXRBdHRyaWJ1dGUoUEhYX0xJVkVfTElOSylcbiAgICAgIGlmKCF0eXBlIHx8ICF0aGlzLmlzQ29ubmVjdGVkKCkgfHwgIXRoaXMubWFpbiB8fCBET00ud2FudHNOZXdUYWIoZSkpeyByZXR1cm4gfVxuXG4gICAgICAvLyBXaGVuIHdyYXBwaW5nIGFuIFNWRyBlbGVtZW50IGluIGFuIGFuY2hvciB0YWcsIHRoZSBocmVmIGNhbiBiZSBhbiBTVkdBbmltYXRlZFN0cmluZ1xuICAgICAgbGV0IGhyZWYgPSB0YXJnZXQuaHJlZiBpbnN0YW5jZW9mIFNWR0FuaW1hdGVkU3RyaW5nID8gdGFyZ2V0LmhyZWYuYmFzZVZhbCA6IHRhcmdldC5ocmVmXG5cbiAgICAgIGxldCBsaW5rU3RhdGUgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKFBIWF9MSU5LX1NUQVRFKVxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpIC8vIGRvIG5vdCBidWJibGUgY2xpY2sgdG8gcmVndWxhciBwaHgtY2xpY2sgYmluZGluZ3NcbiAgICAgIGlmKHRoaXMucGVuZGluZ0xpbmsgPT09IGhyZWYpeyByZXR1cm4gfVxuXG4gICAgICB0aGlzLnJlcXVlc3RET01VcGRhdGUoKCkgPT4ge1xuICAgICAgICBpZih0eXBlID09PSBcInBhdGNoXCIpe1xuICAgICAgICAgIHRoaXMucHVzaEhpc3RvcnlQYXRjaChocmVmLCBsaW5rU3RhdGUsIHRhcmdldClcbiAgICAgICAgfSBlbHNlIGlmKHR5cGUgPT09IFwicmVkaXJlY3RcIil7XG4gICAgICAgICAgdGhpcy5oaXN0b3J5UmVkaXJlY3QoaHJlZiwgbGlua1N0YXRlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgZXhwZWN0ZWQgJHtQSFhfTElWRV9MSU5LfSB0byBiZSBcInBhdGNoXCIgb3IgXCJyZWRpcmVjdFwiLCBnb3Q6ICR7dHlwZX1gKVxuICAgICAgICB9XG4gICAgICAgIGxldCBwaHhDbGljayA9IHRhcmdldC5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFwiY2xpY2tcIikpXG4gICAgICAgIGlmKHBoeENsaWNrKXtcbiAgICAgICAgICB0aGlzLnJlcXVlc3RET01VcGRhdGUoKCkgPT4gdGhpcy5leGVjSlModGFyZ2V0LCBwaHhDbGljaywgXCJjbGlja1wiKSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LCBmYWxzZSlcbiAgfVxuXG4gIG1heWJlU2Nyb2xsKHNjcm9sbCl7XG4gICAgaWYodHlwZW9mKHNjcm9sbCkgPT09IFwibnVtYmVyXCIpe1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHNjcm9sbClcbiAgICAgIH0pIC8vIHRoZSBib2R5IG5lZWRzIHRvIHJlbmRlciBiZWZvcmUgd2Ugc2Nyb2xsLlxuICAgIH1cbiAgfVxuXG4gIGRpc3BhdGNoRXZlbnQoZXZlbnQsIHBheWxvYWQgPSB7fSl7XG4gICAgRE9NLmRpc3BhdGNoRXZlbnQod2luZG93LCBgcGh4OiR7ZXZlbnR9YCwge2RldGFpbDogcGF5bG9hZH0pXG4gIH1cblxuICBkaXNwYXRjaEV2ZW50cyhldmVudHMpe1xuICAgIGV2ZW50cy5mb3JFYWNoKChbZXZlbnQsIHBheWxvYWRdKSA9PiB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQsIHBheWxvYWQpKVxuICB9XG5cbiAgd2l0aFBhZ2VMb2FkaW5nKGluZm8sIGNhbGxiYWNrKXtcbiAgICBET00uZGlzcGF0Y2hFdmVudCh3aW5kb3csIFwicGh4OnBhZ2UtbG9hZGluZy1zdGFydFwiLCB7ZGV0YWlsOiBpbmZvfSlcbiAgICBsZXQgZG9uZSA9ICgpID0+IERPTS5kaXNwYXRjaEV2ZW50KHdpbmRvdywgXCJwaHg6cGFnZS1sb2FkaW5nLXN0b3BcIiwge2RldGFpbDogaW5mb30pXG4gICAgcmV0dXJuIGNhbGxiYWNrID8gY2FsbGJhY2soZG9uZSkgOiBkb25lXG4gIH1cblxuICBwdXNoSGlzdG9yeVBhdGNoKGhyZWYsIGxpbmtTdGF0ZSwgdGFyZ2V0RWwpe1xuICAgIGlmKCF0aGlzLmlzQ29ubmVjdGVkKCkgfHwgIXRoaXMubWFpbi5pc01haW4oKSl7IHJldHVybiBCcm93c2VyLnJlZGlyZWN0KGhyZWYpIH1cblxuICAgIHRoaXMud2l0aFBhZ2VMb2FkaW5nKHt0bzogaHJlZiwga2luZDogXCJwYXRjaFwifSwgZG9uZSA9PiB7XG4gICAgICB0aGlzLm1haW4ucHVzaExpbmtQYXRjaChocmVmLCB0YXJnZXRFbCwgbGlua1JlZiA9PiB7XG4gICAgICAgIHRoaXMuaGlzdG9yeVBhdGNoKGhyZWYsIGxpbmtTdGF0ZSwgbGlua1JlZilcbiAgICAgICAgZG9uZSgpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBoaXN0b3J5UGF0Y2goaHJlZiwgbGlua1N0YXRlLCBsaW5rUmVmID0gdGhpcy5zZXRQZW5kaW5nTGluayhocmVmKSl7XG4gICAgaWYoIXRoaXMuY29tbWl0UGVuZGluZ0xpbmsobGlua1JlZikpeyByZXR1cm4gfVxuXG4gICAgQnJvd3Nlci5wdXNoU3RhdGUobGlua1N0YXRlLCB7dHlwZTogXCJwYXRjaFwiLCBpZDogdGhpcy5tYWluLmlkfSwgaHJlZilcbiAgICBET00uZGlzcGF0Y2hFdmVudCh3aW5kb3csIFwicGh4Om5hdmlnYXRlXCIsIHtkZXRhaWw6IHtwYXRjaDogdHJ1ZSwgaHJlZiwgcG9wOiBmYWxzZX19KVxuICAgIHRoaXMucmVnaXN0ZXJOZXdMb2NhdGlvbih3aW5kb3cubG9jYXRpb24pXG4gIH1cblxuICBoaXN0b3J5UmVkaXJlY3QoaHJlZiwgbGlua1N0YXRlLCBmbGFzaCl7XG4gICAgaWYoIXRoaXMuaXNDb25uZWN0ZWQoKSB8fCAhdGhpcy5tYWluLmlzTWFpbigpKXsgcmV0dXJuIEJyb3dzZXIucmVkaXJlY3QoaHJlZiwgZmxhc2gpIH1cblxuICAgIC8vIGNvbnZlcnQgdG8gZnVsbCBocmVmIGlmIG9ubHkgcGF0aCBwcmVmaXhcbiAgICBpZigvXlxcLyR8XlxcL1teXFwvXSsuKiQvLnRlc3QoaHJlZikpe1xuICAgICAgbGV0IHtwcm90b2NvbCwgaG9zdH0gPSB3aW5kb3cubG9jYXRpb25cbiAgICAgIGhyZWYgPSBgJHtwcm90b2NvbH0vLyR7aG9zdH0ke2hyZWZ9YFxuICAgIH1cbiAgICBsZXQgc2Nyb2xsID0gd2luZG93LnNjcm9sbFlcbiAgICB0aGlzLndpdGhQYWdlTG9hZGluZyh7dG86IGhyZWYsIGtpbmQ6IFwicmVkaXJlY3RcIn0sIGRvbmUgPT4ge1xuICAgICAgdGhpcy5yZXBsYWNlTWFpbihocmVmLCBmbGFzaCwgKGxpbmtSZWYpID0+IHtcbiAgICAgICAgaWYobGlua1JlZiA9PT0gdGhpcy5saW5rUmVmKXtcbiAgICAgICAgICBCcm93c2VyLnB1c2hTdGF0ZShsaW5rU3RhdGUsIHt0eXBlOiBcInJlZGlyZWN0XCIsIGlkOiB0aGlzLm1haW4uaWQsIHNjcm9sbDogc2Nyb2xsfSwgaHJlZilcbiAgICAgICAgICBET00uZGlzcGF0Y2hFdmVudCh3aW5kb3csIFwicGh4Om5hdmlnYXRlXCIsIHtkZXRhaWw6IHtocmVmLCBwYXRjaDogZmFsc2UsIHBvcDogZmFsc2V9fSlcbiAgICAgICAgICB0aGlzLnJlZ2lzdGVyTmV3TG9jYXRpb24od2luZG93LmxvY2F0aW9uKVxuICAgICAgICB9XG4gICAgICAgIGRvbmUoKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgcmVwbGFjZVJvb3RIaXN0b3J5KCl7XG4gICAgQnJvd3Nlci5wdXNoU3RhdGUoXCJyZXBsYWNlXCIsIHtyb290OiB0cnVlLCB0eXBlOiBcInBhdGNoXCIsIGlkOiB0aGlzLm1haW4uaWR9KVxuICB9XG5cbiAgcmVnaXN0ZXJOZXdMb2NhdGlvbihuZXdMb2NhdGlvbil7XG4gICAgbGV0IHtwYXRobmFtZSwgc2VhcmNofSA9IHRoaXMuY3VycmVudExvY2F0aW9uXG4gICAgaWYocGF0aG5hbWUgKyBzZWFyY2ggPT09IG5ld0xvY2F0aW9uLnBhdGhuYW1lICsgbmV3TG9jYXRpb24uc2VhcmNoKXtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmN1cnJlbnRMb2NhdGlvbiA9IGNsb25lKG5ld0xvY2F0aW9uKVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cblxuICBiaW5kRm9ybXMoKXtcbiAgICBsZXQgaXRlcmF0aW9ucyA9IDBcbiAgICBsZXQgZXh0ZXJuYWxGb3JtU3VibWl0dGVkID0gZmFsc2VcblxuICAgIC8vIGRpc2FibGUgZm9ybXMgb24gc3VibWl0IHRoYXQgdHJhY2sgcGh4LWNoYW5nZSBidXQgcGVyZm9ybSBleHRlcm5hbCBzdWJtaXRcbiAgICB0aGlzLm9uKFwic3VibWl0XCIsIGUgPT4ge1xuICAgICAgbGV0IHBoeFN1Ym1pdCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoXCJzdWJtaXRcIikpXG4gICAgICBsZXQgcGh4Q2hhbmdlID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKHRoaXMuYmluZGluZyhcImNoYW5nZVwiKSlcbiAgICAgIGlmKCFleHRlcm5hbEZvcm1TdWJtaXR0ZWQgJiYgcGh4Q2hhbmdlICYmICFwaHhTdWJtaXQpe1xuICAgICAgICBleHRlcm5hbEZvcm1TdWJtaXR0ZWQgPSB0cnVlXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICB0aGlzLndpdGhpbk93bmVycyhlLnRhcmdldCwgdmlldyA9PiB7XG4gICAgICAgICAgdmlldy5kaXNhYmxlRm9ybShlLnRhcmdldClcbiAgICAgICAgICAvLyBzYWZhcmkgbmVlZHMgbmV4dCB0aWNrXG4gICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgICBpZihET00uaXNVbmxvYWRhYmxlRm9ybVN1Ym1pdChlKSl7IHRoaXMudW5sb2FkKCkgfVxuICAgICAgICAgICAgZS50YXJnZXQuc3VibWl0KClcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0sIHRydWUpXG5cbiAgICB0aGlzLm9uKFwic3VibWl0XCIsIGUgPT4ge1xuICAgICAgbGV0IHBoeEV2ZW50ID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKHRoaXMuYmluZGluZyhcInN1Ym1pdFwiKSlcbiAgICAgIGlmKCFwaHhFdmVudCl7XG4gICAgICAgIGlmKERPTS5pc1VubG9hZGFibGVGb3JtU3VibWl0KGUpKXsgdGhpcy51bmxvYWQoKSB9XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBlLnRhcmdldC5kaXNhYmxlZCA9IHRydWVcbiAgICAgIHRoaXMud2l0aGluT3duZXJzKGUudGFyZ2V0LCB2aWV3ID0+IHtcbiAgICAgICAgSlMuZXhlYyhcInN1Ym1pdFwiLCBwaHhFdmVudCwgdmlldywgZS50YXJnZXQsIFtcInB1c2hcIiwge3N1Ym1pdHRlcjogZS5zdWJtaXR0ZXJ9XSlcbiAgICAgIH0pXG4gICAgfSwgZmFsc2UpXG5cbiAgICBmb3IobGV0IHR5cGUgb2YgW1wiY2hhbmdlXCIsIFwiaW5wdXRcIl0pe1xuICAgICAgdGhpcy5vbih0eXBlLCBlID0+IHtcbiAgICAgICAgbGV0IHBoeENoYW5nZSA9IHRoaXMuYmluZGluZyhcImNoYW5nZVwiKVxuICAgICAgICBsZXQgaW5wdXQgPSBlLnRhcmdldFxuICAgICAgICBsZXQgaW5wdXRFdmVudCA9IGlucHV0LmdldEF0dHJpYnV0ZShwaHhDaGFuZ2UpXG4gICAgICAgIGxldCBmb3JtRXZlbnQgPSBpbnB1dC5mb3JtICYmIGlucHV0LmZvcm0uZ2V0QXR0cmlidXRlKHBoeENoYW5nZSlcbiAgICAgICAgbGV0IHBoeEV2ZW50ID0gaW5wdXRFdmVudCB8fCBmb3JtRXZlbnRcbiAgICAgICAgaWYoIXBoeEV2ZW50KXsgcmV0dXJuIH1cbiAgICAgICAgaWYoaW5wdXQudHlwZSA9PT0gXCJudW1iZXJcIiAmJiBpbnB1dC52YWxpZGl0eSAmJiBpbnB1dC52YWxpZGl0eS5iYWRJbnB1dCl7IHJldHVybiB9XG5cbiAgICAgICAgbGV0IGRpc3BhdGNoZXIgPSBpbnB1dEV2ZW50ID8gaW5wdXQgOiBpbnB1dC5mb3JtXG4gICAgICAgIGxldCBjdXJyZW50SXRlcmF0aW9ucyA9IGl0ZXJhdGlvbnNcbiAgICAgICAgaXRlcmF0aW9ucysrXG4gICAgICAgIGxldCB7YXQ6IGF0LCB0eXBlOiBsYXN0VHlwZX0gPSBET00ucHJpdmF0ZShpbnB1dCwgXCJwcmV2LWl0ZXJhdGlvblwiKSB8fCB7fVxuICAgICAgICAvLyBCcm93c2VycyBzaG91bGQgYWx3YXlzIGZpcmUgYXQgbGVhc3Qgb25lIFwiaW5wdXRcIiBldmVudCBiZWZvcmUgZXZlcnkgXCJjaGFuZ2VcIlxuICAgICAgICAvLyBJZ25vcmUgXCJjaGFuZ2VcIiBldmVudHMsIHVubGVzcyB0aGVyZSB3YXMgbm8gcHJpb3IgXCJpbnB1dFwiIGV2ZW50LlxuICAgICAgICAvLyBUaGlzIGNvdWxkIGhhcHBlbiBpZiB1c2VyIGNvZGUgdHJpZ2dlcnMgYSBcImNoYW5nZVwiIGV2ZW50LCBvciBpZiB0aGUgYnJvd3NlciBpcyBub24tY29uZm9ybWluZy5cbiAgICAgICAgaWYoYXQgPT09IGN1cnJlbnRJdGVyYXRpb25zIC0gMSAmJiB0eXBlID09PSBcImNoYW5nZVwiICYmIGxhc3RUeXBlID09PSBcImlucHV0XCIpeyByZXR1cm4gfVxuXG4gICAgICAgIERPTS5wdXRQcml2YXRlKGlucHV0LCBcInByZXYtaXRlcmF0aW9uXCIsIHthdDogY3VycmVudEl0ZXJhdGlvbnMsIHR5cGU6IHR5cGV9KVxuXG4gICAgICAgIHRoaXMuZGVib3VuY2UoaW5wdXQsIGUsIHR5cGUsICgpID0+IHtcbiAgICAgICAgICB0aGlzLndpdGhpbk93bmVycyhkaXNwYXRjaGVyLCB2aWV3ID0+IHtcbiAgICAgICAgICAgIERPTS5wdXRQcml2YXRlKGlucHV0LCBQSFhfSEFTX0ZPQ1VTRUQsIHRydWUpXG4gICAgICAgICAgICBpZighRE9NLmlzVGV4dHVhbElucHV0KGlucHV0KSl7XG4gICAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlRWxlbWVudChpbnB1dClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIEpTLmV4ZWMoXCJjaGFuZ2VcIiwgcGh4RXZlbnQsIHZpZXcsIGlucHV0LCBbXCJwdXNoXCIsIHtfdGFyZ2V0OiBlLnRhcmdldC5uYW1lLCBkaXNwYXRjaGVyOiBkaXNwYXRjaGVyfV0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH0sIGZhbHNlKVxuICAgIH1cbiAgICB0aGlzLm9uKFwicmVzZXRcIiwgKGUpID0+IHtcbiAgICAgIGxldCBmb3JtID0gZS50YXJnZXRcbiAgICAgIERPTS5yZXNldEZvcm0oZm9ybSwgdGhpcy5iaW5kaW5nKFBIWF9GRUVEQkFDS19GT1IpLCB0aGlzLmJpbmRpbmcoUEhYX0ZFRURCQUNLX0dST1VQKSlcbiAgICAgIGxldCBpbnB1dCA9IEFycmF5LmZyb20oZm9ybS5lbGVtZW50cykuZmluZChlbCA9PiBlbC50eXBlID09PSBcInJlc2V0XCIpXG4gICAgICBpZihpbnB1dCl7XG4gICAgICAgIC8vIHdhaXQgdW50aWwgbmV4dCB0aWNrIHRvIGdldCB1cGRhdGVkIGlucHV0IHZhbHVlXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgIGlucHV0LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwiaW5wdXRcIiwge2J1YmJsZXM6IHRydWUsIGNhbmNlbGFibGU6IGZhbHNlfSkpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGRlYm91bmNlKGVsLCBldmVudCwgZXZlbnRUeXBlLCBjYWxsYmFjayl7XG4gICAgaWYoZXZlbnRUeXBlID09PSBcImJsdXJcIiB8fCBldmVudFR5cGUgPT09IFwiZm9jdXNvdXRcIil7IHJldHVybiBjYWxsYmFjaygpIH1cblxuICAgIGxldCBwaHhEZWJvdW5jZSA9IHRoaXMuYmluZGluZyhQSFhfREVCT1VOQ0UpXG4gICAgbGV0IHBoeFRocm90dGxlID0gdGhpcy5iaW5kaW5nKFBIWF9USFJPVFRMRSlcbiAgICBsZXQgZGVmYXVsdERlYm91bmNlID0gdGhpcy5kZWZhdWx0cy5kZWJvdW5jZS50b1N0cmluZygpXG4gICAgbGV0IGRlZmF1bHRUaHJvdHRsZSA9IHRoaXMuZGVmYXVsdHMudGhyb3R0bGUudG9TdHJpbmcoKVxuXG4gICAgdGhpcy53aXRoaW5Pd25lcnMoZWwsIHZpZXcgPT4ge1xuICAgICAgbGV0IGFzeW5jRmlsdGVyID0gKCkgPT4gIXZpZXcuaXNEZXN0cm95ZWQoKSAmJiBkb2N1bWVudC5ib2R5LmNvbnRhaW5zKGVsKVxuICAgICAgRE9NLmRlYm91bmNlKGVsLCBldmVudCwgcGh4RGVib3VuY2UsIGRlZmF1bHREZWJvdW5jZSwgcGh4VGhyb3R0bGUsIGRlZmF1bHRUaHJvdHRsZSwgYXN5bmNGaWx0ZXIsICgpID0+IHtcbiAgICAgICAgY2FsbGJhY2soKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgc2lsZW5jZUV2ZW50cyhjYWxsYmFjayl7XG4gICAgdGhpcy5zaWxlbmNlZCA9IHRydWVcbiAgICBjYWxsYmFjaygpXG4gICAgdGhpcy5zaWxlbmNlZCA9IGZhbHNlXG4gIH1cblxuICBvbihldmVudCwgY2FsbGJhY2spe1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBlID0+IHtcbiAgICAgIGlmKCF0aGlzLnNpbGVuY2VkKXsgY2FsbGJhY2soZSkgfVxuICAgIH0pXG4gIH1cbn1cblxuY2xhc3MgVHJhbnNpdGlvblNldCB7XG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgdGhpcy50cmFuc2l0aW9ucyA9IG5ldyBTZXQoKVxuICAgIHRoaXMucGVuZGluZ09wcyA9IFtdXG4gIH1cblxuICByZXNldCgpe1xuICAgIHRoaXMudHJhbnNpdGlvbnMuZm9yRWFjaCh0aW1lciA9PiB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICB0aGlzLnRyYW5zaXRpb25zLmRlbGV0ZSh0aW1lcilcbiAgICB9KVxuICAgIHRoaXMuZmx1c2hQZW5kaW5nT3BzKClcbiAgfVxuXG4gIGFmdGVyKGNhbGxiYWNrKXtcbiAgICBpZih0aGlzLnNpemUoKSA9PT0gMCl7XG4gICAgICBjYWxsYmFjaygpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHVzaFBlbmRpbmdPcChjYWxsYmFjaylcbiAgICB9XG4gIH1cblxuICBhZGRUcmFuc2l0aW9uKHRpbWUsIG9uU3RhcnQsIG9uRG9uZSl7XG4gICAgb25TdGFydCgpXG4gICAgbGV0IHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnRyYW5zaXRpb25zLmRlbGV0ZSh0aW1lcilcbiAgICAgIG9uRG9uZSgpXG4gICAgICB0aGlzLmZsdXNoUGVuZGluZ09wcygpXG4gICAgfSwgdGltZSlcbiAgICB0aGlzLnRyYW5zaXRpb25zLmFkZCh0aW1lcilcbiAgfVxuXG4gIHB1c2hQZW5kaW5nT3Aob3ApeyB0aGlzLnBlbmRpbmdPcHMucHVzaChvcCkgfVxuXG4gIHNpemUoKXsgcmV0dXJuIHRoaXMudHJhbnNpdGlvbnMuc2l6ZSB9XG5cbiAgZmx1c2hQZW5kaW5nT3BzKCl7XG4gICAgaWYodGhpcy5zaXplKCkgPiAwKXsgcmV0dXJuIH1cbiAgICBsZXQgb3AgPSB0aGlzLnBlbmRpbmdPcHMuc2hpZnQoKVxuICAgIGlmKG9wKXtcbiAgICAgIG9wKClcbiAgICAgIHRoaXMuZmx1c2hQZW5kaW5nT3BzKClcbiAgICB9XG4gIH1cbn1cbiIsICIvLyBJZiB5b3Ugd2FudCB0byB1c2UgUGhvZW5peCBjaGFubmVscywgcnVuIGBtaXggaGVscCBwaHguZ2VuLmNoYW5uZWxgXG4vLyB0byBnZXQgc3RhcnRlZCBhbmQgdGhlbiB1bmNvbW1lbnQgdGhlIGxpbmUgYmVsb3cuXG5pbXBvcnQgXCIuL3VzZXJfc29ja2V0LmpzXCJcblxuLy8gWW91IGNhbiBpbmNsdWRlIGRlcGVuZGVuY2llcyBpbiB0d28gd2F5cy5cbi8vXG4vLyBUaGUgc2ltcGxlc3Qgb3B0aW9uIGlzIHRvIHB1dCB0aGVtIGluIGFzc2V0cy92ZW5kb3IgYW5kXG4vLyBpbXBvcnQgdGhlbSB1c2luZyByZWxhdGl2ZSBwYXRoczpcbi8vXG4vLyAgICAgaW1wb3J0IFwiLi4vdmVuZG9yL3NvbWUtcGFja2FnZS5qc1wiXG4vL1xuLy8gQWx0ZXJuYXRpdmVseSwgeW91IGNhbiBgbnBtIGluc3RhbGwgc29tZS1wYWNrYWdlIC0tcHJlZml4IGFzc2V0c2AgYW5kIGltcG9ydFxuLy8gdGhlbSB1c2luZyBhIHBhdGggc3RhcnRpbmcgd2l0aCB0aGUgcGFja2FnZSBuYW1lOlxuLy9cbi8vICAgICBpbXBvcnQgXCJzb21lLXBhY2thZ2VcIlxuLy9cblxuLy8gSW5jbHVkZSBwaG9lbml4X2h0bWwgdG8gaGFuZGxlIG1ldGhvZD1QVVQvREVMRVRFIGluIGZvcm1zIGFuZCBidXR0b25zLlxuaW1wb3J0IFwicGhvZW5peF9odG1sXCJcbi8vIEVzdGFibGlzaCBQaG9lbml4IFNvY2tldCBhbmQgTGl2ZVZpZXcgY29uZmlndXJhdGlvbi5cbmltcG9ydCB7U29ja2V0fSBmcm9tIFwicGhvZW5peFwiXG5pbXBvcnQge0xpdmVTb2NrZXR9IGZyb20gXCJwaG9lbml4X2xpdmVfdmlld1wiXG5pbXBvcnQgdG9wYmFyIGZyb20gXCIuLi92ZW5kb3IvdG9wYmFyXCJcblxubGV0IGNzcmZUb2tlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtZXRhW25hbWU9J2NzcmYtdG9rZW4nXVwiKS5nZXRBdHRyaWJ1dGUoXCJjb250ZW50XCIpXG5sZXQgbGl2ZVNvY2tldCA9IG5ldyBMaXZlU29ja2V0KFwiL2xpdmVcIiwgU29ja2V0LCB7XG4gIGxvbmdQb2xsRmFsbGJhY2tNczogMjUwMCxcbiAgcGFyYW1zOiB7X2NzcmZfdG9rZW46IGNzcmZUb2tlbn1cbn0pXG5cbi8vIFNob3cgcHJvZ3Jlc3MgYmFyIG9uIGxpdmUgbmF2aWdhdGlvbiBhbmQgZm9ybSBzdWJtaXRzXG50b3BiYXIuY29uZmlnKHtiYXJDb2xvcnM6IHswOiBcIiMyOWRcIn0sIHNoYWRvd0NvbG9yOiBcInJnYmEoMCwgMCwgMCwgLjMpXCJ9KVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwaHg6cGFnZS1sb2FkaW5nLXN0YXJ0XCIsIF9pbmZvID0+IHRvcGJhci5zaG93KDMwMCkpXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBoeDpwYWdlLWxvYWRpbmctc3RvcFwiLCBfaW5mbyA9PiB0b3BiYXIuaGlkZSgpKVxuXG4vLyBjb25uZWN0IGlmIHRoZXJlIGFyZSBhbnkgTGl2ZVZpZXdzIG9uIHRoZSBwYWdlXG5saXZlU29ja2V0LmNvbm5lY3QoKVxuXG4vLyBleHBvc2UgbGl2ZVNvY2tldCBvbiB3aW5kb3cgZm9yIHdlYiBjb25zb2xlIGRlYnVnIGxvZ3MgYW5kIGxhdGVuY3kgc2ltdWxhdGlvbjpcbi8vID4+IGxpdmVTb2NrZXQuZW5hYmxlRGVidWcoKVxuLy8gPj4gbGl2ZVNvY2tldC5lbmFibGVMYXRlbmN5U2ltKDEwMDApICAvLyBlbmFibGVkIGZvciBkdXJhdGlvbiBvZiBicm93c2VyIHNlc3Npb25cbi8vID4+IGxpdmVTb2NrZXQuZGlzYWJsZUxhdGVuY3lTaW0oKVxud2luZG93LmxpdmVTb2NrZXQgPSBsaXZlU29ja2V0XG5cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7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Q0osSUFBQTtBQUNILFdBQUssWUFBWSxJQUFJLEtBQUE7SUFBQTtJQUd2QixjQUFjLElBQUc7QUFBRSxXQUFLLFdBQVcsS0FBSyxFQUFBO0lBQUE7SUFFeEMsT0FBTTtBQUFFLGFBQU8sS0FBSyxZQUFZO0lBQUE7SUFFaEMsa0JBQWlCO0FBQ2YsVUFBRyxLQUFLLEtBQUEsSUFBUyxHQUFFO0FBQUU7TUFBQTtBQUNyQixVQUFJLEtBQUssS0FBSyxXQUFXLE1BQUE7QUFDekIsVUFBRyxJQUFHO0FBQ0osV0FBQTtBQUNBLGFBQUssZ0JBQUE7TUFBQTtJQUFBO0VBQUE7OztBQzc2Qlgsc0JBQW1CO0FBRW5CLE1BQUksWUFBWSxTQUFTLGNBQWMseUJBQXlCLEVBQUUsYUFBYSxTQUFTO0FBQ3hGLE1BQUksYUFBYSxJQUFJLFdBQVcsU0FBUyxRQUFRO0FBQUEsSUFDL0Msb0JBQW9CO0FBQUEsSUFDcEIsUUFBUSxFQUFDLGFBQWEsVUFBUztBQUFBLEVBQ2pDLENBQUM7QUFHRCxnQkFBQUMsUUFBTyxPQUFPLEVBQUMsV0FBVyxFQUFDLEdBQUcsT0FBTSxHQUFHLGFBQWEsb0JBQW1CLENBQUM7QUFDeEUsU0FBTyxpQkFBaUIsMEJBQTBCLFdBQVMsY0FBQUEsUUFBTyxLQUFLLEdBQUcsQ0FBQztBQUMzRSxTQUFPLGlCQUFpQix5QkFBeUIsV0FBUyxjQUFBQSxRQUFPLEtBQUssQ0FBQztBQUd2RSxhQUFXLFFBQVE7QUFNbkIsU0FBTyxhQUFhOyIsCiAgIm5hbWVzIjogWyJ3aW5kb3ciLCAiZG9jdW1lbnQiLCAidG9wYmFyIiwgImNsb3N1cmUiLCAic29ja2V0IiwgIkN1c3RvbUV2ZW50IiwgImxpdmVTb2NrZXQiLCAiY2xvc3VyZSIsICJ0b3BiYXIiXQp9Cg==

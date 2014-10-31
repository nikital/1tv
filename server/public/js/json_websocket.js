'use strict';

/*
 * JSON over WebSocket
 */

function JSONWebSocket(endpoint) {
    this._ws = new WebSocket(endpoint, 'json');
    this._messages = [];
    this._handlers = {};

    this._ws.onmessage = this._onMessage.bind(this);
    this._ws.onopen = this._onOpen.bind(this);
    this._ws.onclose = this._onClose.bind(this);
}

JSONWebSocket.prototype.send = function(type, body) {
    var message = {'type': type, 'body': body};

    if (typeof type !== 'string' || !type) {
        throw 'No message type specified';
    }

    message = JSON.stringify(message);
    if (this._ws.readyState == WebSocket.OPEN) {
        this._ws.send(message);
    } else {
        this._messages.push(message);
    }
};

JSONWebSocket.prototype.on = function(type, handler) {
    if (this._handlers[type]) {
        throw 'Two handlers for "' + type + '"! Time to rearchitect...';
    }

    this._handlers[type] = handler;
}

JSONWebSocket.prototype._onMessage = function(e) {
    var message = e.data;
    message = JSON.parse(message);

    this._handlers[message.type](message.body);
};

JSONWebSocket.prototype._onOpen = function() {
    var i = 0;

    for (i = 0; i < this._messages.length; ++i) {
        this._ws.send(this._messages[i]);
    }

    this._messages = [];
};

JSONWebSocket.prototype._onClose = function() {
    console.error("Websocket closed!");
};

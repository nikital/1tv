'use strict';

/*
 * JSON over WebSocket
 */

function JSONWebsocket(endpoint) {
    this._ws = new WebSocket(endpoint, 'json');
    this._messages = [];

    this._ws.onopen = this._onOpen.bind(this);
    this._ws.onmessage = this._onMessage.bind(this);
    this._ws.onclose = this._onClose.bind(this);
}

JSONWebsocket.prototype.send = function(type, body) {
    var message = {'type': type, 'body': body};
    message = JSON.stringify(message);

    if (this._ws.readyState == WebSocket.OPEN) {
        this._ws.send(message);
    } else {
        this._messages.push(message);
    }
};

JSONWebsocket.prototype._onOpen = function() {
    var i = 0;

    for (i = 0; i < this._messages.length; ++i) {
        this._ws.send(this._messages[i]);
    }

    this._messages = [];
};

JSONWebsocket.prototype._onMessage = function(e) {
    console.log(e.data);
};

JSONWebsocket.prototype._onClose = function() {
    console.error("Websocket closed!");
};

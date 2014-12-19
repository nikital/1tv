'use strict';

function Player() {
    var boundStateCallback = this._onStateChange.bind(this);

    this._onetv = new OnetvPlayer(boundStateCallback);
    this._yt = new YTPlayer(boundStateCallback, this._onYTEnd.bind(this));
    this._socket = new JSONWebSocket('ws://' + window.location.host + '/ws/player');
    this._channel = '';

    this._switchChannel('onetv');
    this._yt.cueVideo('J1vpB6h3ek4', 0);

    this._socket.on('select', this._onSelectCmd.bind(this));
    this._socket.on('onetv', this._onOnetvCmd.bind(this));
    this._socket.on('yt', this._onYTCmd.bind(this));
    this._socket.on('get-telemetry', this._onGetTelemetry.bind(this));
    this._socket.on('refresh', this._onRefresh.bind(this));
}

Player.prototype._onSelectCmd = function(message) {
    this._switchChannel(message.channel);
};

Player.prototype._onOnetvCmd = function(message) {
    if (message.sync) {
        this._onetv.sync();
    }
};

Player.prototype._onYTCmd = function(message) {
    if (message.cue) {
        this._yt.cueVideo(message.cue.id, message.cue.start);
    }
    if (message.seek) {
        this._yt.seek(message.seek.time);
    }
};

Player.prototype._switchChannel = function(channel) {
    this._channel = channel;
    if (channel == 'onetv') {
        this._onetv.show();
        this._yt.hide();
    } else if (channel == 'yt') {
        this._onetv.hide();
        this._yt.show();
    } else if (channel == 'none') {
        this._onetv.hide();
        this._yt.hide();
    } else {
        console.error('Unknown channel', channel);
    }
    this._onStateChange();
};

Player.prototype._onGetTelemetry = function() {
    this._onStateChange();
};

Player.prototype._onRefresh = function() {
    window.location.reload(true);
};

Player.prototype._onStateChange = function() {
    var telemetry = {
        channel: this._channel,
        onetv: this._onetv.getState(),
        yt: this._yt.getState()
    };
    this._socket.send('telemetry', telemetry);
};

Player.prototype._onYTEnd = function() {
    this._switchChannel('onetv');
};

(function(exports) {
    exports.player = new Player();
})(window);

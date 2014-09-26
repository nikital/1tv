'use strict';

function Player() {
    this._onetv = new OnetvPlayer();
    this._yt = new YTPlayer(this._onStateChange.bind(this));
    this._socket = new JSONWebSocket('ws://' + window.location.host + '/ws/player');

    this._yt.hide();
    this._yt.cueVideo('J1vpB6h3ek4', 0);

    this._socket.on('select', this._onSelectCmd.bind(this));
    this._socket.on('yt', this._onYTCmd.bind(this));
    this._socket.on('get-telemetry', this._onGetTelemetry.bind(this));
}

Player.prototype._onSelectCmd = function(message) {
    if (message.channel == 'onetv') {
        this._onetv.show();
        this._yt.hide();
    } else if (message.channel == 'yt') {
        this._onetv.hide();
        this._yt.show();
    } else if (message.channel == 'none') {
        this._onetv.hide();
        this._yt.hide();
    } else {
        console.error('Bad message', message);
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

Player.prototype._onGetTelemetry = function() {
    this._onStateChange();
};

Player.prototype._onStateChange = function() {
    var telemetry = {
        yt: this._yt.getState()
    };
    this._socket.send('telemetry', telemetry);
};

(function(exports) {
    exports.player = new Player();
})(window);

'use strict';

function Player() {
    this._onetv = new OnetvPlayer();
    this._yt = new YTPlayer();
    this._socket = new JSONWebSocket('ws://' + window.location.host + '/ws/player');

    this._yt.hide();
    this._yt.cueVideo('J1vpB6h3ek4', 0);

    this._socket.on('select', this._onSelectCmd.bind(this));
}

Player.prototype._onSelectCmd = function(message) {
    if (message.player == 'onetv') {
        this._onetv.show();
        this._yt.hide();
    } else if (message.player == 'yt') {
        this._onetv.hide();
        this._yt.show();
    } else if (message.player == 'none') {
        this._onetv.hide();
        this._yt.hide();
    } else {
        console.error('Bad message', message);
    }
};

(function(exports) {
    exports.player = new Player();
})(window);

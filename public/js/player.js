'use strict';

function Player() {
    // this._onetv = new OnetvPlayer();
    this._yt = new YTPlayer();
    this._socket = new JSONWebSocket('ws://' + window.location.host + '/ws/player');

    this._socket.on('select', this._onSelectCmd.bind(this));
}

Player.prototype._onSelectCmd = function(message) {
    if (message.player == 'onetv') {
        this._onetv.show();
    } else if (message.player == 'none') {
        this._onetv.hide();
    } else {
        console.error('Bad message', message);
    }
};

(function(exports) {
    exports.player = new Player();
})(window);

'use strict';

function Control() {
    this._socket = new JSONWebSocket('ws://' + window.location.host + '/ws/control');

    this._onetv_button = document.getElementById('select-onetv');
    this._none_button = document.getElementById('select-none');

    this._onetv_button.onclick = this._onSelectOnetv.bind(this);
    this._none_button.onclick = this._onSelectNone.bind(this);
}

Control.prototype._onSelectOnetv = function() {
    this._socket.send('select', {player: 'onetv'});
};

Control.prototype._onSelectNone = function() {
    this._socket.send('select', {player: 'none'});
};

(function(exports) {
    exports.control = new Control();
})(window);

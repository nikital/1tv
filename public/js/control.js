'use strict';

function Control() {
    this._socket = new JSONWebSocket('ws://' + window.location.host + '/ws/control');

    this._onetv_button = document.getElementById('select-onetv');
    this._yt_button = document.getElementById('select-yt');
    this._none_button = document.getElementById('select-none');

    this._yt_cue_button = document.getElementById('yt-cue');

    this._onetv_button.onclick = this._onSelectOnetv.bind(this);
    this._yt_button.onclick = this._onSelectYT.bind(this);
    this._none_button.onclick = this._onSelectNone.bind(this);
    this._yt_cue_button.onclick = this._onYTCue.bind(this);
}

Control.prototype._onSelectOnetv = function() {
    this._socket.send('select', {player: 'onetv'});
};

Control.prototype._onSelectYT = function() {
    this._socket.send('select', {player: 'yt'});
};

Control.prototype._onSelectNone = function() {
    this._socket.send('select', {player: 'none'});
};

Control.prototype._onYTCue = function() {
    var id = document.getElementById('yt-id').value;
    this._socket.send('yt', {cue: {id: id, start: 0}});
};

(function(exports) {
    exports.control = new Control();
})(window);

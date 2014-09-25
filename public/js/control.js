'use strict';

function Control() {
    this._socket = new JSONWebSocket('ws://' + window.location.host + '/ws/control');
    this._tabs = document.getElementById('channels');

    this._tabs.addEventListener('core-select', this._onChannelSelect.bind(this));
}

Control.prototype._onChannelSelect = function() {
    this._socket.send('select', {channel: this._tabs.selected});
};

Control.prototype._onYTCue = function() {
    var id = document.getElementById('yt-id').value;
    this._socket.send('yt', {cue: {id: id, start: 0}});
};

(function(exports) {
    exports.control = new Control();
})(window);

'use strict';

function Control() {
    this._socket = new JSONWebSocket('ws://' + window.location.host + '/ws/control');
    this._tabs = document.getElementById('channels');
    this._yt = document.querySelector('yt-rack');

    this._tabs.addEventListener('core-select', this._onChannelSelect.bind(this));
    this._yt.addEventListener('cue-video', this._onYTCue.bind(this));
    this._yt.addEventListener('seek-video', this._onYTSeek.bind(this));
}

Control.prototype._onChannelSelect = function() {
    this._socket.send('select', {channel: this._tabs.selected});
};

Control.prototype._onYTCue = function() {
    var id = this._yt.cueId;
    this._socket.send('yt', {cue: {id: id, start: 0}});
};

Control.prototype._onYTSeek = function() {
    var time = this._yt.seekTime;
    this._socket.send('yt', {seek: {time: time}});
};

(function(exports) {
    exports.control = new Control();
})(window);

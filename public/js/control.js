'use strict';

function Control() {
    this._socket = new JSONWebSocket('ws://' + window.location.host + '/ws/control');
    this._tabs = document.getElementById('channels');
    this._onetv = document.querySelector('onetv-rack');
    this._yt = document.querySelector('yt-rack');

    this._tabs.addEventListener('core-select', this._onChannelSelect.bind(this));
    this._onetv.addEventListener('sync', this._onOnetvSync.bind(this));
    this._yt.addEventListener('cue-video', this._onYTCue.bind(this));
    this._yt.addEventListener('seek-video', this._onYTSeek.bind(this));

    this._socket.on('telemetry', this._onTelemetry.bind(this));
    this._socket.send('get-telemetry', {});
}

Control.prototype._onChannelSelect = function() {
    this._socket.send('select', {channel: this._tabs.selected});
};

Control.prototype._onOnetvSync = function() {
    this._socket.send('onetv', {sync: true});
};

Control.prototype._onYTCue = function() {
    var id = this._yt.cueId;
    this._socket.send('yt', {cue: {id: id, start: 0}});
};

Control.prototype._onYTSeek = function() {
    var time = this._yt.seekTime;
    this._socket.send('yt', {seek: {time: time}});
};

Control.prototype._onTelemetry = function(telemetry) {
    console.log(telemetry);

    this._onetv.state = telemetry.onetv.state;

    this._yt.videoTitle = telemetry.yt.title;
    this._yt.time = telemetry.yt.time;
    this._yt.duration = telemetry.yt.duration;
    this._yt.state = telemetry.yt.state;

    this._tabs.selected = telemetry.channel;
};

(function(exports) {
    exports.control = new Control();
})(window);

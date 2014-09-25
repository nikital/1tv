// 'use strict';

function YTPlayer() {
    this._wrap = document.getElementById('player-yt-wrap');
    this._yt = null;
    this._visible = true;
    this._cued = null;

    YT.ready(this._onYTReady.bind(this));
}

YTPlayer.prototype.cueVideo = function(id, start) {
    if (this._yt) {
        this._yt.cueVideoById(id, start);
        if (this._visible) {
            this._yt.playVideo();
        }
    } else {
        this._cued = {id: id, start: start};
    }
};

YTPlayer.prototype.seek = function(time) {
    if (this._yt) {
        this._yt.seekTo(time, true);
    } else if (this._cued) {
        this._cued.start = time;
    }
};

YTPlayer.prototype.hide = function() {
    this._visible = false;
    this._wrap.style.height = 0;
    if (this._yt) {
        this._yt.pauseVideo();
        this._yt.getIframe().style.visibility = 'hidden';
    }
};

YTPlayer.prototype.show = function() {
    this._visible = true;
    this._wrap.style.height = '';
    if (this._yt) {
        this._yt.playVideo();
        this._yt.getIframe().style.visibility = 'visible';
    }
};

YTPlayer.prototype._onYTReady = function() {
    var config = {
        width: '100%', height:'100%',
        playerVars: {
            controls: 0, disablekb: 1, modestbranding: 1,
            showinfo: 0, rel: 0, iv_load_policy: 3
        }
    };

    if (this._cued) {
        config.videoId = this._cued.id;
        config.playerVars.start = this._cued.start;
        this._cued = null;
    }

    this._yt = new YT.Player('player-yt', config);

    if (!this._visible) {
        this.hide();
    }
};

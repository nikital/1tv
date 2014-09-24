'use strict';

function YTPlayer() {
    YT.ready(this._onYTReady.bind(this));
}

YTPlayer.prototype._onYTReady = function() {};

YTPlayer.prototype._onYTReady = function() {
    this._player = new YT.Player('player-yt', {
        width: '100%', height:'100%',
        playerVars: {
            controls: 0, disablekb: 1, modestbranding: 1,
            showinfo: 0, rel: 0, iv_load_policy: 3
        }
    });
};

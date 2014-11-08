'use strict';
var OnetvStateTracker = {
    observe: function(cb) {
        OnetvStateTracker._callbacks.push(cb);
    },
    onStateChange: function(newState) {
        var i;
        for (i = 0; i < OnetvStateTracker._callbacks.length; ++i) {
            OnetvStateTracker._callbacks[i](newState);
        }
    },
    _callbacks: []
};

function OnetvPlayer(stateChangeCallback) {
    var flashvars = {},
        params = {},
        attributes = {};

    this._wrap = document.getElementById('player-1tv-wrap');
    this._swf = null;
    this._visible = true;
    this._state = 'Unloaded';
    this._stateChangeCallback = stateChangeCallback;

    params.bgcolor='#0'; 
    params.wmode='direct'; 
    params.allownetworking='all'; 
    params.allowscriptaccess='always'; 
    params.allowfullscreen='false'; 

    swfobject.embedSWF('/swf/player.swf',
                       'player-1tv', '100%', '100%', '11.0.0', false,
                       flashvars, params, attributes,
                       this._onSWFEmbedded.bind(this));

    OnetvStateTracker.observe(this._onStateChange.bind(this));

    this._pingAlive = false;
    this._ping();
}

OnetvPlayer.prototype.sync = function() {
    if (this._swf && this._swf.playerSync) {
        this._swf.playerSync();
    }
};

OnetvPlayer.prototype.getState = function() {
    return {state: this._state};
};

OnetvPlayer.prototype.hide = function() {
    this._visible = false;
    this._wrap.style.height = 0;
    this._pause();
    if (this._swf) {
        this._swf.style.visibility = 'hidden';
    }
};

OnetvPlayer.prototype.show = function() {
    this._visible = true;
    this._play();
    this._wrap.style.height = '';
    if (this._swf) {
        this._swf.style.visibility = 'visible';
    }
};

OnetvPlayer.prototype._onSWFEmbedded = function(obj) {
    this._swf = obj.ref;
    if (!this._visible) {
        this.hide();
    }
};

OnetvPlayer.prototype._play = function() {
    if (this._swf && this._swf.playerPlay) {
        this._swf.playerPlay();
    }
};

OnetvPlayer.prototype._pause = function() {
    if (this._swf && this._swf.playerPause) {
        this._swf.playerPause();
    }
};

OnetvPlayer.prototype._onStateChange = function(newState) {
    this._state = newState;
    if (this._stateChangeCallback) {
        this._stateChangeCallback();
    }
};

OnetvPlayer.prototype._ping = function() {
    if (this._swf && (this._pingAlive || this._swf.ping)) {
        var cookie = 20;
        if (!this._swf.ping || cookie != this._swf.ping(cookie)) {
            // Sometimes Flash crashes on Linux so this code detects it and
            // reloads the page.
            // This is kind of like exit(1) in the middle of a program, but
            // that's an extreme case...
            window.location.reload(true);
        }
        this._pingAlive = true;
    }
    setTimeout(this._ping.bind(this), 1000);
};

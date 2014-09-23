'use strict';

function OnetvPlayer() {
    var flashvars = {},
        params = {},
        attributes = {};

    this._swf = null;

    params.bgcolor='#0'; 
    params.wmode='direct'; 
    params.allownetworking='all'; 
    params.allowscriptaccess='always'; 
    params.allowfullscreen='false'; 

    swfobject.embedSWF('/swf/player.swf',
                       'player-1tv', '100%', '100%', '14.0.0', false,
                       flashvars, params, attributes,
                       this._onSWFEmbedded.bind(this));
}

OnetvPlayer.prototype.hide = function() {
    this._pause();
    if (this._swf) {
        this._swf.style.visibility = 'hidden';
    }
};

OnetvPlayer.prototype.show = function() {
    this._play();
    if (this._swf) {
        this._swf.style.visibility = 'visible';
    }
};

OnetvPlayer.prototype._onSWFEmbedded = function(obj) {
    this._swf = obj.ref;
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

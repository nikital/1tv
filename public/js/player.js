"use strict";

var flashvars = {};
var params = {};
var attributes = {};


params.bgcolor="#0"; 
params.wmode="direct"; 
params.allownetworking="all"; 
params.allowscriptaccess="always"; 
params.allowfullscreen="false"; 

attributes.name = "";
attributes.styleclass = "";
attributes.align = "";			
swfobject.embedSWF("/swf/player.swf", "player-1tv", "100%", "100%", "14.0.0", false, flashvars, params, attributes);

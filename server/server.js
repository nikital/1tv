#!/usr/bin/env node

var http = require('http');
var express = require('express');
var WebSocketServer = require('websocket').server;
var Bridge= require('./bridge.js').Bridge;

var app = express();
app.use(express.static(__dirname + '/public'));
var server = app.listen(8080);

var ws = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

var bridge = new Bridge('bridge', 'json', 'json');

ws.on('request', function(req) {
    if (false) {
    } else if (req.resourceURL.pathname == '/ws/player') {
        bridge.addMaster(req);
    } else if (req.resourceURL.pathname == '/ws/control') {
        bridge.addSlave(req);
    } else {
        req.reject(404, 'Endpoint not found');
    }
});

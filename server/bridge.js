/*
 * Provides bridging between websockets.
 */

var util = require('util');
var EventEmitter = require('events').EventEmitter;

function Bridge(name, masterProtocol, slaveProtocol) {
    this.name = name;
    this.master = null;
    this.slaves = [];

    this._masterProtocol = masterProtocol;
    this._slaveProtocol = slaveProtocol;
}

util.inherits(Bridge, EventEmitter);

Bridge.prototype.addMaster = function(req) {
    if (this.master) {
        console.log((new Date()) + ' Duplicate master attemped to connect: ' + this.name);
        req.reject(409, 'Master already connected');
        return;
    }

    console.log((new Date()) + ' Master connected to: ' + this.name);

    this.master = req.accept(this._masterProtocol, req.origin);
    this.master.on('message', this._onMasterMessage.bind(this));
    this.master.on('close', this._onMasterClose.bind(this));
};

Bridge.prototype.addSlave = function(req) {
    var slave;

    console.log((new Date()) + ' Slave connected to: ' + this.name);

    slave = req.accept(this._slaveProtocol, req.origin);
    slave.on('message', this._onSlaveMessage.bind(this));
    slave.on('close', this._onSlaveClose.bind(this));

    this.slaves.push(slave);
};

Bridge.prototype._onMasterMessage = function(message) {
    var i;

    for (i = 0; i < this.slaves.length; ++i) {
        if (message.type == 'binary')
            this.slaves[i].sendBytes(message.binaryData);
        else if (message.type == 'utf8')
            this.slaves[i].sendUTF(message.utf8Data);
    }
};

Bridge.prototype._onSlaveMessage = function(message) {
    if (!this.master) {
        return;
    }

    if (message.type == 'binary')
        this.master.sendBytes(message.binaryData);
    else if (message.type == 'utf8')
        this.master.sendUTF(message.utf8Data);
};

Bridge.prototype._onMasterClose = function() {
    console.log((new Date()) + ' Master disconnected from: ' + this.name);

    this.master = null;

    this.emit('close', this);
};

Bridge.prototype._onSlaveClose = function(e) {
    var i;

    console.log((new Date()) + ' Slave disconnected from: ' + this.name);

    i = this.slaves.indexOf(e.target);
    if (i != -1) {
        this.slaves.splice(i, 1);
    }
};

exports.Bridge = Bridge;

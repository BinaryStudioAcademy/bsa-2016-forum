/**
 * Created by Степан on 22.08.2016.
 */
var Radio = require('backbone.radio');
var io = require('socket.io-client');
var config = require('config');
var logger = require('../instances/logger');

module.exports = new function () {
   
    this.getToken = function () {
        var value = "; " + document.cookie;
        var parts = value.split("; " + 'x-access-token' + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    };
    
    socket = io.connect(config.sokcetUrl);

    socket.on('logged', function(msg) {
        logger("Socket.IO login status: "+msg.status)
    });

    socket.on('newMessage', function(msg) {
        Radio.channel('messagesChannel').trigger('newMessage', msg);
        logger("New message come.")
    });

    var token = this.getToken();

    if(!!token) {
        socket.emit('login', {token: token});
    }
    
};

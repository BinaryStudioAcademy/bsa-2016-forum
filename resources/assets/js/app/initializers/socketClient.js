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

    this.socket = io.connect(config.sokcetUrl);

    this.socket.on('logged', function (msg) {
        logger("Socket: login status: " + msg.status)
    });

    this.socket.on('newMessage', function (msg) {
        Radio.channel('messagesChannel').trigger('newMessage', msg);
        logger("Socket: New message come.")
    });

    this.socket.on('updatedMessage', function (msg) {
        Radio.channel('messagesChannel').trigger('updatedMessage', msg);
        logger("Socket: Updated one message.")
    });

    this.Login = function () {
        var token = this.getToken();
        if (!!token) {
            this.socket.emit('login', {token: token});
        } else {
            logger("Socket: token not found!");
        }
    };
};

/**
 * Created by Степан on 19.08.2016.
 */
var app = require('express')();
var http = require('http');
var io = require('socket.io').listen(3000);
var Redis = require('ioredis');
var redis = new Redis();
var UserOnline = require('./userContainer');

redis.subscribe('messagesChannel', function(err, count) {
});

redis.on('message', function(channel, eventData) {
    eventData = JSON.parse(eventData);
    var message = eventData.data.message;
    console.log('new message');
    if(UserOnline.isOnline(message.user_to_id)){
        UserOnline.getSocket(message.user_to_id).emit('newMessage', message);
        console.log("send to user_id: "+message.user_to_id);
    }
});

io.sockets.on('connection', function (socket) {

    socket.on('login', function (data) {
        // check user id and it token
        data.user_id;
        data.token;
        console.log(data);

        var status = true;
        if(status) {

            UserOnline.userAdd(2, socket);

            socket.on('disconnect', function() {
                UserOnline.remoteSocket(socket);
            });

            socket.emit('logged', {status: 'success'});
        } else {
            socket.emit('logged', {status: 'failure'});
        }
    });
});
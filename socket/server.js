/**
 * Created by Степан on 19.08.2016.
 */
var config = require('./config');
var http = require('http');
var io = require('socket.io');
var Redis = require('ioredis');
var redis = new Redis();
var users = require('./userContainer');
var checkAuth = require('./checkAuth');

io = io.listen(config.socketPort);

redis.subscribe('messagesChannel', function(err, count) {
});

redis.on('message', function(channel, eventData) {
    eventData = JSON.parse(eventData);

    var message = JSON.parse(eventData.data.message);
    var socketId = users.getSocketId(message.user_to_id);

    if (io.sockets.sockets[socketId]) {
        io.sockets.sockets[socketId].emit(eventData.data.socketEvent, message);
        console.log("Message send to user id: " + message.user_to_id);
    }
});

io.sockets.on('connection', function (socket) {

    socket.on('login', function (loginData) {

        if(!!loginData.token)
        {
            checkAuth(loginData.token, function (data) {

                console.log("User id: " + data.id + " connected");

                users.Add(data.id, socket.id);

                socket.emit('logged', {status: 'OK'});

                socket.on('disconnect', function() {
                    console.log("User id: " + users.getUserId(socket.id) + " disconnected");
                    users.Remove(socket.id);
                });
            });
        }
    });
});
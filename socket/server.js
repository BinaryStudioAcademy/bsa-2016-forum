/**
 * Created by Степан on 19.08.2016.
 */
var config = require('./config');
var http = require('http');
var io = require('socket.io');
var Redis = require('ioredis');
var redis = new Redis();
var users = require('./userContainer');

io = io.listen(config.port);

redis.subscribe('messagesChannel', function(err, count) {
});

redis.on('message', function(channel, eventData) {
    eventData = JSON.parse(eventData);

    var message = JSON.parse(eventData.data.message);
    var socketId = users.getSocketId(message.user_to_id);

    if (io.sockets.sockets[socketId]) {
        io.sockets.sockets[socketId].emit('newMessage', message);
        console.log("Message send to user id: " + message.user_to_id);
    }
});

io.sockets.on('connection', function (socket) {

    socket.on('login', function (data) {

        // check user id and it token
        var status = true; data.token; data.user_id; config.authUrl;

        if(status) {
            console.log("User id: " + data.user_id + " connected");
            users.Add(data.user_id, socket.id);
            socket.emit('logged', {status: 'success'});
            
            socket.on('disconnect', function() {
                console.log("User id: " + users.getUserId(socket.id) + " disconnected");
                users.Remove(socket.id);
            });
            
        } else {
            console.log("User id: " + data.user_id + " authentication error");
            socket.emit('logged', {status: 'failure'});
        }
    });
});
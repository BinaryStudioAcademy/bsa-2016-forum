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

console.log("Socket starting..");

io = io.listen(config.socketPort);
console.log("Bind to port: " + config.socketPort);

try {
    redis.subscribe('messagesChannel', 'commentsChannel', function(err, count) {});

    console.log("Subscribe to redis success");
} catch (e) {
    console.log(e.message);
}

redis.on('message', function(channel, eventData) {
    var eventData = JSON.parse(eventData);

    switch (channel) {
        case 'commentsChannel':
            commentsLoad();
            break;
        case 'messagesChannel':
            messagesLoad();
            break;
    }

    function commentsLoad () {
        var comment = JSON.parse(eventData.data.comment);
        var meta = JSON.parse(eventData.data.meta);
        comment.user = meta[comment.id].user;

        var commentType = comment.commentable_type.split('\\');
        commentType = commentType[commentType.length-1];
        var channelName = commentType + 'Comments' + comment.commentable_id;

        io.sockets.emit(channelName, comment);
        console.log("Comment from user id: " + comment.user_id +
            ", through channel " + channelName);
    }

    function messagesLoad () {
        var message = JSON.parse(eventData.data.message);
        var socketId = users.getSocketId(message.user_to_id);

        if (io.sockets.sockets[socketId]) {
            io.sockets.sockets[socketId].emit(eventData.data.socketEvent, message);
            console.log("Message for user id: " + message.user_to_id);
        }
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
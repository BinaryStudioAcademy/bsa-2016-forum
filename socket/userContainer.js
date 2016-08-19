/**
 * Created by Степан on 19.08.2016.
 */

module.exports = new function () {
    this.users = [];
    this.map = [];

    this.userAdd = function (userId, socket) {
        this.users[userId] = socket;
        this.map[socket.id] = userId;
    };

    this.getSocket = function (userId) {
        return this.users[userId];
    };

    this.remoteSocket = function (socket) {
        delete this.users[this.map[socket.id]];
    };
};
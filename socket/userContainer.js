/**
 * online users container
 */
var _ = require("underscore");

module.exports = new function () {
    this._userSocketId = [];
    this._socketIdUser = [];

    this.Add = function (userId, socketId) {
        if(this._userSocketId[userId] != undefined)
            this._userSocketId[userId].push(socketId);
        else
            this._userSocketId[userId] = [socketId];

        this._socketIdUser[socketId] = userId;
    };
   
    this.Remove = function (socketId) {
        delete this._userSocketId[this._socketIdUser[socketId]];
        delete this._socketIdUser[socketId];
    };
    
    this.getSocketIds = function (userId) {
        return this._userSocketId[userId] || [];
    };

    this.doWithSocketIds = function (userIds, callbackFunction) {
        var that = this;
        if(_.isArray(userIds)) {
            userIds.forEach(function (userId) {
                var SocketIds = that._userSocketId[userId] || [];
                SocketIds.forEach(function (SocketId) {
                    callbackFunction(SocketId, userId)
                })
            })
        }
    };
    
    this.getUserId = function (socketId) {
        return this._socketIdUser[socketId];
    };
};
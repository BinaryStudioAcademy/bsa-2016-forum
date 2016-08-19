/**
 * Created by Степан on 19.08.2016.
 */

module.exports = new function () {
    this._userSocketId = [];
    this._socketIdUser = [];

    this.Add = function (userId, socketId) {
        this._userSocketId[userId] = socketId;
        this._socketIdUser[socketId] = userId;
    };
   
    this.Remove = function (socketId) {
        delete this._userSocketId[this._socketIdUser[socketId]];
        delete this._socketIdUser[socketId];
    };
    
    this.getSocketId = function (userId) {
        return this._userSocketId[userId] || 0;
    };
    
    this.getUserId = function (socketId) {
        return this._socketIdUser[socketId];
    };
};
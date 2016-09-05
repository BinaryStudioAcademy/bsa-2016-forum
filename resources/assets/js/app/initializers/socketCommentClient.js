var Radio = require('backbone.radio');
var io = require('socket.io-client');
var config = require('config');
var _ = require('underscore');

var socketCommentClient = {
    bind: function (channelName) {
        this.socket = io.connect(config.socketUrl);

        if (!_.isEmpty(channelName)) {
            this.socket.on(channelName, function (comment) {
                Radio.channel(channelName).trigger('newComment', comment);
            });
        }
    },

    unbind: function (channelName) {
        if (!_.isEmpty(channelName)) {
            this.socket.removeAllListeners(channelName);
        }
    }
};



module.exports = socketCommentClient;
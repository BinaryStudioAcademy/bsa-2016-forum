var app = require('../app.js');
var ForumHeader = require('../views/topics/ForumHeader.js');
var Topics = require('../views/topics.js');

module.exports = {
    index: function () {
        app.RootView.subheader.show(new ForumHeader());
        app.RootView.content.show(new Topics());
    }
};
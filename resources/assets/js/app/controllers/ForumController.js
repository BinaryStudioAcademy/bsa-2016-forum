var app = require('../instances/appInstance');
var ForumHeader = require('../views/ForumHeader.js');
var Topics = require('../views/topics/topics.js');

module.exports = {
    index: function () {
        console.log(app);
        app.getInstance().RootView.navigationMenu.show(new ForumHeader());
        app.getInstance().RootView.content.show(new Topics());
    }
};
var app = require('../instances/appInstance');
var Marionette = require('backbone.marionette');

var ListVotes = require('../views/votes/ListVotes');
module.exports = Marionette.Object.extend({

    index: function () {
        app.getInstance().RootView.content.show(new ListVotes());
    }
});
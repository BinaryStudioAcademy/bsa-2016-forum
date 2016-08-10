var app = require('./app.js');
var _ = require('underscore');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

var Router = require('./router.js');

var RootView = require('./views/RootView.js');
var headerView = require('./views/Header.js');


app.navigate = function (route, options) {
    options || (options = {});
    Backbone.history.navigate(route, options);
};

app.getCurrentRoute = function () {
    return Backbone.history.fragment
};

app.on('start', function () {

    new Router();

    app.RootView = RootView;
    app.RootView.header.show(new headerView());

    Backbone.history.start();

    if (this.getCurrentRoute() === "") {
        Backbone.history.navigate('forum', {
            trigger: true
        });
    }

});

app.start();

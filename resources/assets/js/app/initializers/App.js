var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

//var Router = require('./router.js');

var Routers = require('../config/routers');

var RootView = require('../views/RootView.js');
var headerView = require('../views/Header.js');

var appInstance = require('../instances/appInstance');

var logger = require('../instances/logger');

var app = Marionette.Application.extend({
    initialize: function(options) {
        console.log('My app has initialized');
    },

    setRootLayout: function () {
        this.RootView = new RootView();
    },

    setRouting: function () {

        // не работает

        var routers = Routers.getRouters();
        //console.log(routers);

        routers.forEach(function (router, index) {
            //logger(router);
            var MyRouter = Marionette.AppRouter.extend({
                controller: router.controller,
                appRoutes: router.appRoutes
            });

            return new MyRouter();
        });
    },
    onStart: function (config) {
        this.config = config;
        this.setRootLayout();
        this.setRouting();

        appInstance.setInstance(this);

        //// вот так работает
        //var r = Routers.getRouters();
        //r = r[0];
        //
        //var MyRouter = Marionette.AppRouter.extend({
        //    controller: r.controller,
        //    appRoutes: r.appRoutes
        //});
        //
        //new MyRouter();

        logger('start application');

        // сразу рендерим хедер
        this.RootView.header.show(new headerView());

        if (Backbone.history) {
            Backbone.history.start();
        }
    }
});

app.navigate = function (route, options) {
    options || (options = {});
    Backbone.history.navigate(route, options);
};

app.getCurrentRoute = function () {
    return Backbone.history.fragment
};

module.exports = app;

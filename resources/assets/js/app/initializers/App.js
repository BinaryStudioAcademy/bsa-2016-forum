var Backbone = require('backbone');
var _ = require('underscore');
var Radio = require('backbone.radio');
var Marionette = require('backbone.marionette');

// инитим channels на сам инстанс марионета
Marionette.Application.prototype._initChannel = function () {
    this.channelName = _.result(this, 'channelName') || 'global';
    this.channel = _.result(this, 'channel') || Radio.channel(this.channelName);
};

var $ = require('jquery');

var mainLayoutView = require('../views/mainLayout');

var appInstance = require('../instances/appInstance');
var appRouter = require('../router');
var logger = require('../instances/logger');

var Handlebars = require('handlebars');
var Templates = require('../templates')(Handlebars);

var app = Marionette.Application.extend({
    initialize: function(options) {
        logger('My app has initialized');
    },


    setRouting: function () {
        var routers = require('../config/routers');
        var myRoutes = routers.getRouters();
        console.log('XX');
        myRoutes.forEach(function (item, index) {
            var myRouter = appRouter(item.controller, item.appRoutes);
            var router = new myRouter();
        });
    },
    templateCashing: function () {
        // кешируем шаблоны
        $.each(Templates, function (key, value) {
            var templateCache = new Marionette.TemplateCache(key);
            templateCache.compiledTemplate = value;
            Marionette.TemplateCache.templateCaches[key] = templateCache;
        });
    },
    onStart: function (config) {
        console.log('start');

        this.config = config;
        this.templateCashing();

        appInstance.setRootLayout(new mainLayoutView());
        appInstance.showRootLayout();

        appInstance.setInstance(this);

        this.setRouting();

        logger('start application');

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

app.render = function(view) {
    this.RootView.content.show
};

module.exports = app;
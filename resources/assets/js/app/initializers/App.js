var Backbone = require('backbone');
var _ = require('underscore');
var Radio = require('backbone.radio');
var Marionette = require('backbone.marionette');

// init channels on marionette
Marionette.Application.prototype._initChannel = function () {
    this.channelName = _.result(this, 'channelName') || 'global';
    this.channel = _.result(this, 'channel') || Radio.channel(this.channelName);
};

var $ = require('jquery');

var appRouter = require('../router');

var mainLayoutView = require('../views/mainLayout');

var appInstance = require('../instances/appInstance');

var logger = require('../instances/logger');

var Handlebars = require('handlebars');
var Templates = require('../templates')(Handlebars);

var app = Marionette.Application.extend({
    initialize: function (options) {
        logger('My app has been initialized');
    },

    setRootLayout: function (layout) {
        this.RootView = layout;
    },

    getRootLayout: function () {
        return this.RootView;
    },
    showRootLayout: function () {
        this.RootView.render();
        this.RootView.showRegions();
    },

    setRouting: function () {
        var routers = require('../config/routers');
        var myRoutes = routers.getRouters();
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
        this.config = config;
        this.templateCashing();
        this.setRootLayout(new mainLayoutView());
        appInstance.setInstance(this);
        this.showRootLayout();
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

module.exports = app;
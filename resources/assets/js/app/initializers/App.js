var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var $ = require('jquery');

var routers = require('../config/routers');
var appRouter = require('../router');

var RootLayoutView = require('../views/RootLayoutView');
var mainLayoutView = require('../views/mainLayout');

var appInstance = require('../instances/appInstance');

var logger = require('../instances/logger');

var Handlebars = require('handlebars');
var Templates = require('../templates')(Handlebars);

var app = Marionette.Application.extend({
    initialize: function(options) {
        logger('My app has initialized');
    },

    setRootLayout: function (layout) {
        this.RootView = layout;
    },

    showRootLayout: function () {
        var rootView = new RootLayoutView();
        var mainView = new mainLayoutView();
        rootView.main.show(mainView);
        this.setRootLayout(mainView);
    },

    setRouting: function () {
        var myRoutes = routers.getRouters();

        myRoutes.forEach(function (item, index) {
            var myRouter = appRouter(item.controller, item.appRoutes);
            var router = new myRouter();
        });
    },
    templateCashing: function () {
        // кешируем шаблоны
        $.each(Templates, function (key, value) {
            var templateCache = new Marionette.TemplateCache('#' + key);
            templateCache.compiledTemplate = value;
            Marionette.TemplateCache.templateCaches['#' + key] = templateCache;
        });
    },
    onStart: function (config) {
        this.config = config;

        appInstance.setInstance(this);

        this.setRouting();
        this.templateCashing();
        this.showRootLayout();

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

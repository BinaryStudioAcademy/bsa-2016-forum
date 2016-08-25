var Marionette = require('backbone.marionette');
var logger = require('./instances/logger');
var NavigationCollection = require('./initializers/navigationCollection');

module.exports = function (controller, appRoutes, navigItemName) {

    return Marionette.AppRouter.extend({
        controller: controller,
        appRoutes: appRoutes,

        onRoute: function (name, path, arguments) {
            logger('route #' + path + ' start with method ' + name);
            NavigationCollection.setActive(navigItemName);
        }
    });

};


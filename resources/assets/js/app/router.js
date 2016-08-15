var Marionette = require('backbone.marionette');
var logger = require('./instances/logger');

module.exports = function (controller, appRoutes) {

    return Marionette.AppRouter.extend({
        controller: controller,

        appRoutes: appRoutes,

        onRoute: function (name, path, arguments) {
            logger('route #' + path + ' start with method ' + name);
        }
    });

};


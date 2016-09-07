var Handlebars = require('handlebars');
var currentUser = require('../initializers/currentUser');

module.exports = {
    register: function () {
        Handlebars.registerHelper('comments', function (options) {
            if (options.level < 4)
                return new Handlebars.SafeString('<span class="js-comments-count">Comments: ' + options.comments + '</span>');
        });
    }
};
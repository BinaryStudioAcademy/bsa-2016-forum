var Handlebars = require('handlebars');
var currentUser = require('../initializers/currentUser');

module.exports = {
    register: function () {
        Handlebars.registerHelper('comments', function (options) {
            if (options.level < 4)
                return new Handlebars.SafeString('<span class="js-comments-count">Comments: ' + options.comments + '</span>');
        });

        Handlebars.registerHelper('comments_delete_button', function (options) {
            if (currentUser.get('role') == 'Admin' || options.meta.user.id == currentUser.get('id'))
                return new Handlebars.SafeString('<button class="btn btn-md btn-danger  js-delete" type="button" style="float: right;"><span class="glyphicon glyphicon-remove-circle"></span></button>');
        });
    }
};
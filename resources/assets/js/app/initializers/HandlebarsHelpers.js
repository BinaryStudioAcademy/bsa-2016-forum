var Handlebars = require('handlebars');
var currentUser = require('../initializers/currentUser');

module.exports = {
    register: function () {
        Handlebars.registerHelper('deleteButton', function (meta) {
            if (meta.deletable === true) {
                return new Handlebars.SafeString('<button class="btn btn-sm btn-danger delete-button"><span class="glyphicon glyphicon-remove-sign"></span></button>');
            }
        });
    }
};
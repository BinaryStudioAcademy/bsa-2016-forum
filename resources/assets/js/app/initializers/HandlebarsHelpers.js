var Handlebars = require('handlebars');
var currentUser = require('../initializers/currentUser');

module.exports = {
    register: function () {
        Handlebars.registerHelper('deleteButton', function (model, meta) {
            if ((currentUser.get('role') == 'Admin' || currentUser.get('id') == meta.user.id) && meta.deletable === true) {
                return new Handlebars.SafeString('<button class="btn btn-md btn-danger delete-button"><span class="glyphicon glyphicon-remove-sign"></span></button>');
            }
        });
    }
};
var Handlebars = require('handlebars');
var moment = require('moment');
var currentUser = require('../initializers/currentUser');

module.exports = {
    register: function () {
        Handlebars.registerHelper('deleteButton', function (id, created_at) {
            if (currentUser.get('role') == 'Admin' || (currentUser.get('id') == id && moment(created_at).add(15, 'm').isAfter(moment()))) {
                return new Handlebars.SafeString('<button class="btn btn-md btn-danger delete-button"><span class="glyphicon glyphicon-remove-sign"></span></button>');
            }
        });
    }
};
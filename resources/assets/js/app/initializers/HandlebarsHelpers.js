var Handlebars = require('handlebars');
var currentUser = require('../initializers/currentUser');
var moment = require('moment');

module.exports = {
    register: function () {
        Handlebars.registerHelper('addDate', function (options) {
            return moment().add(30, 'd').format('DD/MM/YYYY HH/mm/ss');
        });
    }
};
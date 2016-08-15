var Handlebars = require('handlebars');
var app = require('../instances/appInstance');
var Backbone = require('backbone');

module.exports = {
    register: function () {
        this.registerHelpers();
        this.registerAppEvents();
    },
    registerHelpers: function () {
        Handlebars.registerHelper('helper1', function(context, options) {

        });
    },
    registerAppEvents: function () {
        var inst = app.getInstance();
        inst.on('show:vote', function (id) {
            Backbone.history.navigate('votes/' + id, {
                trigger: true
            });
        });

    }
};
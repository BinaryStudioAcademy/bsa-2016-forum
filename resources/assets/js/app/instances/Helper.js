var Handlebars = require('handlebars');
var Templates = require('../templates')(Handlebars);
var Marionette = require('backbone.marionette');

Handlebars.registerHelper('agree_button', function() {
    var emotion = Handlebars.escapeExpression(this.emotion),
        name = Handlebars.escapeExpression(this.name);

    return new Handlebars.SafeString(
        "<button>I agree. I " + emotion + " " + name + "</button>"
    );
});

module.exports = {};
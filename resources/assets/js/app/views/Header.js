Handlebars = require('handlebars');
Templates = require('../templates.js')(Handlebars);

module.exports = Marionette.ItemView.extend({
    template: Templates['header.tpl']
});
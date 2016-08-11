var Handlebars = require('handlebars');
var Templates = require('../templates.js')(Handlebars);
var Marionette = require('backbone.marionette');

module.exports = {
    templateCache: function (id, template_file) {
        var templateCache = new Marionette.TemplateCache('#' + id);
        templateCache.compiledTemplate = Templates[template_file];
        Marionette.TemplateCache.templateCaches['#' + id] = templateCache;
    }
};
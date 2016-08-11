var Marionette = require('backbone.marionette');
var Handlebars = require('handlebars');
var Templates = require('../templates.js')(Handlebars);

module.exports = {
    templateCache: function (id, template_file) {
        var templateCache = new Marionette.TemplateCache('#' + id);
        templateCache.compiledTemplate = Templates[template_file];
        Marionette.TemplateCache.templateCaches['#' + id] = templateCache;
    }
};
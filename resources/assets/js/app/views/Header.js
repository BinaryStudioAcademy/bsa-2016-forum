var Marionette = require('backbone.marionette');
var Helper = require('../instances/Helper.js');

Helper.templateCache('header-template', 'header.tpl');

module.exports = Marionette.ItemView.extend({
    template: '#header-template'
});
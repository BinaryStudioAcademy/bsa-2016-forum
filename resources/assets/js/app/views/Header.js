var Helper = require('../controllers/Helper.js');
var Marionette = require('backbone.marionette');

Helper.templateCache('header-template', 'header.tpl');

module.exports = Marionette.ItemView.extend({
    template: '#header-template'
});
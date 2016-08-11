var Marionette = require('backbone.marionette');
var Helper = require('../instances/Helper.js');

Helper.templateCache('navigation-menu', 'navigationMenu.tpl');

module.exports = Marionette.ItemView.extend({
    template: '#navigation-menu'
});
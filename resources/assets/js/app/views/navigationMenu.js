var Helper = require('../instances/Helper.js');
var Marionette = require('backbone.marionette');

Helper.templateCache('navigation-menu', 'navigationMenu.tpl');

module.exports = Marionette.ItemView.extend({
    template: '#navigation-menu'
});
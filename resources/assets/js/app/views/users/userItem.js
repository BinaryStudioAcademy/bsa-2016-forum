var Marionette = require('backbone.marionette');
var mainLayout=require('../mainLayout')

module.exports = Marionette.ItemView.extend({
    template: 'userItem',
    tagName: 'div'
});
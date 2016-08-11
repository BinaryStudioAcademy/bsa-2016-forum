var Helper = require('../../instances/Helper.js');
var Marionette = require('backbone.marionette');

Helper.templateCache('topics-template', 'topics.tpl');

module.exports = Marionette.ItemView.extend({
    template: '#topics-template'
});
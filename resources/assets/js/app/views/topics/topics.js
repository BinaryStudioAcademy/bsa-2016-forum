var Marionette = require('backbone.marionette');

var Helper = require('../../instances/Helper.js');

Helper.templateCache('topics-template', 'topics.tpl');

module.exports = Marionette.ItemView.extend({
    template: '#topics-template'
});
var Marionette = require('backbone.marionette');
var Backbone = require('backbone');

module.exports = Marionette.ItemView.extend({
    template: '#topics.tpl',
    ui: {
        createTopic: '.create-topic'
    },
    initialize: function() {
        this.bindUIElements();
    },
    events: {
        'click @ui.createTopic': function () {
            Backbone.history.navigate('/topic/create', {trigger: true});
        }
    }
});
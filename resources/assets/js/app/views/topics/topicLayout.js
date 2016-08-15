var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var app = require('../../instances/appInstance');
var logger = require('../../instances/logger');
var topicCollection = require('./topicCollection');

module.exports = Marionette.LayoutView.extend({
    template: 'topicLayout',
    ui: {
        createTopic: '.create-topic'
    },
    regions: {
        container: '#posts'
    },
    initialize: function () {
        this.bindUIElements();
    },
    onShow: function () {
        this.container.show(new topicCollection({
            collection: this.collection
        }));
    },
    events:  {
        'click @ui.createTopic': function () {
            Backbone.history.navigate('topic/create', {trigger:true});
        }
    }
});

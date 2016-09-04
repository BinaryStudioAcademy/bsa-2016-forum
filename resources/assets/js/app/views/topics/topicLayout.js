var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var app = require('../../instances/appInstance');
var logger = require('../../instances/logger');
var topicCollection = require('./topicCollection');
var _ = require('underscore');

module.exports = Marionette.LayoutView.extend({
    template: 'topicLayout',

    regions: {
        container: '#posts'
    },


    ui: {
        createTopic: '.create-topic'
    },

    events: {
        'click @ui.createTopic': function () {
            Backbone.history.navigate('topic/create', {trigger: true});
        }
    },

    initialize: function () {
        this.bindUIElements();
    },

    onRender: function () {
        this.container.show(new topicCollection({
            collection: this.collection
        }));
    }
});

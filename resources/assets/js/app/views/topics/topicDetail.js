var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var CommentsCollectionView = require('../comments/TopicCommentsCollection');
var _ = require('underscore');
var logger = require('../../instances/logger');
var Radio = require('backbone.radio');
var TopicHeaderView = require('./topicHeader');

module.exports = Marionette.LayoutView.extend({

    template: 'topicDetail',

    initialize: function (options) {
        //console.log('topic show', options);
    },

    regions: {
        'newComment': '#newcomment',
        'topicHeader': '.topic-head',
        'comments': '.topic-comments'
    },

    ui: {
        'answer': '.topic-answer-btn',
        'share': '.topic-share-btn',
        'notification': '.topic-notification-btn',
        'topic_delete': '.topic-delete-btn'
    },

    events: {
        'click @ui.answer': function (event) {
            Radio.channel('newComment').trigger('showCommentForm', this, false);
        },
        'click @ui.topic_delete': function (event) {
            this.model.destroy();
            this.$('#delete-topic-form').remove();
            Backbone.history.navigate('topics', {trigger: true});
        }
    },

    onBeforeShow: function () {
        this.getRegion('topicHeader').show(new TopicHeaderView({
            model: this.model
        }));

        this.getRegion('comments').show(new CommentsCollectionView({
            collection: this.collection
        }));
    },

    onRender: function () {

    }
});
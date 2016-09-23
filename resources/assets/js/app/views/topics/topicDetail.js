var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var CommentsCollectionView = require('../comments/TopicCommentsCollection');
var logger = require('../../instances/logger');
var Radio = require('backbone.radio');
var TopicHeaderView = require('./topicHeader');
var app = require('../../instances/appInstance');
var ConfirmDeleteView = require('./topicConfirmDeleteView');

module.exports = Marionette.LayoutView.extend({
    template: 'topicDetail',
    _isTopicView: true,

    initialize: function () {
        this.childCommentsCollection = this.getOption('collection');
    },

    regions: {
        'newComment': '.newcomment',
        'topicHeader': '.topic-head',
        'comments': '.topic-comments'
    },

    ui: {
        'answer': '.topic-answer-btn',
        'topic_delete': '.topic-delete-btn'
    },

    events: {
        'click @ui.answer': function (event) {
            Radio.channel('comment').trigger('addComment', this, null, this.childCommentsCollection);
        },

        'click @ui.topic_delete': function () {
            app.renderModal(new ConfirmDeleteView({
                model: this.model
            }));
        }
    },

    onRender: function () {
        this.getRegion('topicHeader').show(new TopicHeaderView({
            model: this.model
        }));

        this.getRegion('comments').show(new CommentsCollectionView({
            collection: this.collection,
            reorderOnSort: true
        }));
    }
});
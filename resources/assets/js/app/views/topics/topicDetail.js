var _ = require('underscore');
var Marionette = require('backbone.marionette');
var CommentsCollectionView = require('../comments/TopicCommentsCollection');
var logger = require('../../instances/logger');
var Radio = require('backbone.radio');
var TopicHeaderView = require('./topicHeader');

module.exports = Marionette.LayoutView.extend({
    template: 'topicDetail',

    ui: {
        'answer': '.topic-answer-btn'
    },

    events: {
        'click @ui.answer': function (event) {
            Radio.channel('comment').trigger('addComment', this);
        }
    },

    modelEvents: {
        'change' : 'render'
    },

    regions: {
        'newComment': '#newcomment',
        'topicHeader': '.topic-head',
        'comments': '.topic-comments'
    },

    onRender: function () {
        this.getRegion('topicHeader').show(new TopicHeaderView({
            model: this.model
        }));

        this.getRegion('comments').show(new CommentsCollectionView({
          collection: this.collection
        }));
    }

});
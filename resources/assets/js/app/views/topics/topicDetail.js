var _ = require('underscore');
var Marionette = require('backbone.marionette');
var CommentsCollectionView = require('../comments/TopicCommentsCollection');
var logger = require('../../instances/logger');
var Radio = require('backbone.radio');
var TopicHeaderView = require('./topicHeader');
var UserAvatarView = require('../users/userAvatar');

module.exports = Marionette.LayoutView.extend({
    template: 'topicDetail',
    _isTopicView: true,

    initialize: function () {
        this.childCommentsCollection = this.getOption('collection');
    },

    regions: {
        'newComment': '.newcomment',
        'topicHeader': '.topic-head',
        'comments': '.topic-comments',
        'avatar': '#avatar-top'
    },

    ui: {
        'answer': '.topic-answer-btn'
    },

    events: {
        'click @ui.answer': function (event) {
            Radio.channel('comment').trigger('addComment', this, null, this.childCommentsCollection);
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


        this.getRegion('avatar').show(
            new UserAvatarView({model: this.model
        }));
    }

});
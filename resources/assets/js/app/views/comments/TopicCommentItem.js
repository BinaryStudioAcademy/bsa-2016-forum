var Marionette = require('backbone.marionette');
var _ = require('underscore');
var logger = require('../../instances/logger');
var Radio = require('backbone.radio');

module.exports = Marionette.LayoutView.extend({
    template: 'TopicCommentItem',

    initialize: function(options) {
        //this.model.set('comment_url', this.model.collection.getEntityUrl() + '/' + this.model.get('id'));
    },

    regions: {
        'newComment': '.new-comment-container'
    },

    ui: {
        'answer': '.topic-comment-item .topic-control-btn .answer-btn',
        'share': '.topic-comment-item .topic-control-btn .share-btn',
        'notification': '.topic-comment-item .topic-control-btn .notification-btn'
    },

    events: {
        'click @ui.answer': function (event) {
            Radio.channel('newComment').trigger('showCommentForm', this);
        }
    },


    onRender: function () {

    }

});
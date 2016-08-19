var Marionette = require('backbone.marionette');
var _ = require('underscore');
var logger = require('../../instances/logger');
var Radio = require('backbone.radio');
var AttachmentsCollection = require('./AttachmentsCollection');

module.exports = Marionette.LayoutView.extend({
    template: 'TopicCommentItem',

    initialize: function(options) {
        //this.model.set('comment_url', this.model.collection.getEntityUrl() + '/' + this.model.get('id'));
    },

    regions: {
        'newComment': '.new-comment-container',
        'attachments': '.attachments-container'
    },

    ui: {
        'answer': '.answer-btn',
        'share': '.share-btn',
        'notification': '.notification-btn'
    },

    events: {
        'click @ui.answer': function (event) {
            Radio.channel('newComment').trigger('showCommentForm', this);
        }
    },


    onRender: function () {

    }

});
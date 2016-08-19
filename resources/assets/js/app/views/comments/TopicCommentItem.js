var Marionette = require('backbone.marionette');
var _ = require('underscore');
var logger = require('../../instances/logger');
var Radio = require('backbone.radio');
var AttachmentsCollectionView = require('./AttachmentsCollection');
var AttachmentCollection = require('../../collections/AttachmentCollection');

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
            Radio.channel('newComment').trigger('showCommentForm', this, this.model.get('id'));
        }
    },

    serializeData: function () {
        var tempmeta = this.model.getMeta();
        var id = this.model.get('id');

        //console.log(tempmeta.attachments[id]);

        return {
            model: this.model.toJSON(),
            meta: {
                user: tempmeta.user[id],
                likes: tempmeta.likes[id],
                attachments: tempmeta.attachments[id],
                tags: tempmeta.tags[id]
            }
        };
    },

    onBeforeShow: function () {
        //this.getRegion('attachments').show(new AttachmentsCollectionView({
        //    collection: attach
        //}));
    },

    onRender: function () {
    }

});
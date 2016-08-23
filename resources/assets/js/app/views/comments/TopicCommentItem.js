var Marionette = require('backbone.marionette');
var _ = require('underscore');
var logger = require('../../instances/logger');
var Radio = require('backbone.radio');
var AttachmentsCollectionView = require('./AttachmentsCollection');
var AttachmentCollection = require('../../collections/AttachmentCollection');
var currentUser = require('../../initializers/currentUser');

module.exports = Marionette.LayoutView.extend({
    template: 'TopicCommentItem',

    initialize: function(options) {
        //console.log(this.model);
        //this.model.set('comment_url', this.model.collection.getEntityUrl() + '/' + this.model.get('id'));
    },

    regions: {
        'newComment': '.new-comment-container',
        'attachments': '.attachments-container'
    },

    ui: {
        'answer': '.answer-btn',
        'share': '.share-btn',
        'notification': '.notification-btn',
        'edit': '.comment-edit-btn',
        'remove': '.comment-remove-btn'
    },

    events: {
        'click @ui.answer': function (event) {
            Radio.channel('comment').trigger('addComment', this, this.model.get('id'));
        },

        'click @ui.edit': function (event) {
            Radio.channel('comment').trigger('editComment', this, this.model);
        },

        'click @ui.remove': function (event) {
            Radio.channel('comment').trigger('removeComment', this.model);
        },
    },

    serializeData: function () {
        var meta = this.model.getMeta();
        var id = this.model.get('id');
        //console.log(meta, currentUser);

        return {
            model: this.model.toJSON(),
            meta: {
                user: meta[id].user,
                likes: meta[id].likes,
                attachments: meta[id].attachments,
                isUserComment: currentUser.get('id') === meta[id].user.id
            }
        };
    },

    onBeforeShow: function () {
        //this.getRegion('attachments').show(new AttachmentsCollectionView({
        //    collection: attachs
        //}));
    },

    onRender: function () {
    }

});
var Marionette = require('backbone.marionette');
var _ = require('underscore');
var logger = require('../../instances/logger');
var Radio = require('backbone.radio');
var currentUser = require('../../initializers/currentUser');

module.exports = Marionette.LayoutView.extend({
    template: 'TopicCommentItem',
    _childUpload: false,

    initialize: function() {
        this.childsCollection = this.options.collection;
    },

    regions: {
        'attachments': '.attachs',
        'childComments': '.topic-comment-childs'
    },

    ui: {
        'answer': '.answer-btn',
        'edit': '.comment-edit-btn',
        'remove': '.removeBtn',
        'showChilds': '.btn-childs',
        'errors': '.errors',
        'childs': '.topic-comment-included'
    },

    events: {
        'click @ui.answer': function (event) {
            event.preventDefault();
            this.collection = this.childsCollection;
            Radio.channel('comment').trigger('addComment', this);
            this.showChildCommentsButton(true);
        },

        'click @ui.edit': function (event) {
            event.preventDefault();
            event.stopPropagation();
            // set collection which has this view model
            this.collection = this.model.collection;
            Radio.channel('comment').trigger('addComment', this, this.model);
        },

        'click @ui.remove': function (event) {
            event.preventDefault();
            event.stopPropagation();
            this.model.destroy({
                success: function () {
                    // if parent comments collection is empty then hide childs btn
                    if (this.options.parentCommentView) {
                        if (!this.options.parentCommentView.collection.length) {
                            this.options.parentCommentView.showChildCommentsButton(false);
                        }
                    }
                }.bind(this),
                error: function (model, response) {
                    console.error(response.responseText);
                }.bind(this),
                wait: true
            });
        },

        'click @ui.showChilds': function (event) {
            event.preventDefault();
            this.ui.childs.slideToggle('fast');
            if (this._childUpload) return;
            Radio.channel('comment').trigger('showChildComments', this);
        },
    },

    showChildCommentsButton: function (show) {
        this.ui.showChilds.toggle(show);
    },

    attachmentThumb: function (attachs) {
        attachs.forEach(function (attach) {
           if (attach.type == 'image/jpeg' || attach.type == 'image/png' ||
               attach.type == 'image/gif') {
               attach.thumb = attach.url;
           } else {
               attach.thumb = '/images/doc.png';
           }

        });
    },

    serializeData: function () {
        var meta = this.model.getMeta();
        var id = this.model.get('id');
        this.attachmentThumb(meta[id].attachments);
        return {
            model: this.model.toJSON(),
            meta: {
                user: meta[id].user,
                likes: meta[id].likes,
                attachments: meta[id].attachments,
                comments: meta[id].comments,
                canReply: !this.model.isChildComment(),
                isUserComment: currentUser.get('id') === meta[id].user.id
            }
        };
    },

    modelEvents: {
        'change': 'render',
    }
});
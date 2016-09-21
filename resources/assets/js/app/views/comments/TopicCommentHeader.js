var Marionette = require('backbone.marionette');
var _ = require('underscore');
var currentUser = require('../../initializers/currentUser');
var logger = require('../../instances/logger');
var Radio = require('backbone.radio');
var dateHelper = require('../../helpers/dateHelper');

module.exports = Marionette.ItemView.extend({
    template: 'TopicCommentHeader',

    modelEvents: {
        'change': 'render'
    },

    ui: {
        'showChilds': '.btn-childs',
        'answer': '.answer-btn',
        'edit': '.comment-edit-btn',
        'remove': '.comment-remove-btn',
        'removeConfirmation': '.remove-modal-btn',
    },

    events: {
        'click @ui.showChilds': function (event) {
            event.preventDefault();

            this.getOption('commentLayout').childsToggle();

            if (this.getOption('commentLayout')._childUpload) {
                return;
            }

            Radio.channel('comment').trigger('showChildComments', this.getOption('commentLayout'));
        },

        'click @ui.answer': function (event) {
            event.preventDefault();

            if (this.getOption('commentLayout')._childCommentsCollection) {
                Radio.channel('comment').trigger('addComment', this, null, this.getOption('commentLayout')._childCommentsCollection);
            } else {
                Radio.channel('comment').trigger('addComment', this);
            }
        },

        'click @ui.edit': function (event) {
            event.preventDefault();
            event.stopPropagation();
            Radio.channel('comment').trigger('addComment', this, this.model, this.model.collection);
        },

        'click @ui.removeConfirmation': function (event) {
            event.preventDefault();
            event.stopPropagation();
            this.model.destroy({
                success: function () {
                    // if parent comments collection is empty then hide childs btn
                    if (this.getOption('parentCommentView') &&
                        this.getOption('parentCommentView')._childCommentsCollection
                    ) {
                        if (!this.getOption('parentCommentView')._childCommentsCollection.length) {
                            // hide child container
                            this.getOption('parentCommentView').childsToggle();
                            this.getOption('parentCommentView')._childCommentsCollection = null;
                            this.getOption('parentCommentView')._childUpload = false;
                            // hide parent child-btn
                            this.getOption('parentCommentView').getRegion('commentHeader').currentView
                                .showChildCommentsButton(false);
                            this.getOption('parentCommentView').getRegion('commentHeader').currentView
                                .showEditDeleteBtn(true);
                        }
                    }
                }.bind(this),

                error: function (model, response) {
                    console.error(response.responseText);
                }.bind(this),

                wait: true
            });
        },

    },

    isChildsOpened: function () {
        return this.getOption('commentLayout').childsVisible();
    },

    showEditDeleteBtn: function (show) {
        this.ui.edit.toggle(show);
        this.ui.remove.toggle(show);
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
                canEditDelete: (currentUser.get('id') === meta[id].user.id) && !meta[id].comments
            },
            createdAt: dateHelper.fullDate(this.model.get('created_at')),
            isUploadingAttachs: this.model.get('isUploadingAttachs')
        };
    }
});
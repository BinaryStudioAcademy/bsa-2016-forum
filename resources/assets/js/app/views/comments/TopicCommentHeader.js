var Marionette = require('backbone.marionette');
var _ = require('underscore');
var currentUser = require('../../initializers/currentUser');
var logger = require('../../instances/logger');
var Radio = require('backbone.radio');
var dateHelper = require('../../helpers/dateHelper');
var CommentLikeModel = require('../../models/CommentLikeModel')

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
        'likeUnlikeTopic': '.link-like-unlike'
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

        'click @ui.likeUnlikeTopic': 'likeUnlikeTopic'
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
                attach.thumb = 'images/doc.png';
            }

        });
    },

    serializeData: function () {
        var style;
        var likeUnlike;
        var countOfLikes;
        var meta = this.model.getMeta();
        var id = this.model.get('id');
        if (!meta[id]) {
            return {
                model: this.model.toJSON(),
                meta: {
                    user: {},
                    likes: 0,
                    attachments: [],
                    comments: 0,
                    canReply: false,
                    canEditDelete: false
                },
                createdAt: '',
                isUploadingAttachs: false
            };
        }
        if (meta[id] && meta[id].attachments.length) {
            this.attachmentThumb(meta[id].attachments);
        }

        if(meta[id].isUser == true) {
            style = 'glyphicon glyphicon-star';
            likeUnlike = 'Unlike';
        } else {
            style ='glyphicon  glyphicon-star-empty';
            likeUnlike = 'Like';
        }
        
        return {
            model: this.model.toJSON(),
            style: style,
            likeUnlike: likeUnlike,
            countOfLikes: meta[id].likes,
            isUser: meta[id].isUser,
            meta: {
                currentUser: meta[id].currentUser,
                isUser: meta[id].isUser,
                likeId: meta[id].likeId,
                countOfLikes: meta[id].countOfLikes,
                category: meta[id].category,
                subscription: meta[id].subscription,
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
    },

    likeUnlikeTopic: function(e){
        e.preventDefault();
        var meta = this.model.getMeta();
        var id = this.model.id;
        var that = this;
        if(meta[id].user.id != meta[id].currentUser) {
            if(meta[id].isUser == true) {
                var parentUrl = '/comments/'+this.model.id+'/likes/'+meta[id].likeId;
                var commentLikeModel = new CommentLikeModel({parentUrl: parentUrl,id:meta[id].likeId});
                commentLikeModel.destroy({
                    success: function(model, response) {
                        meta[id].isUser = false;
                        meta[id].likes = meta[id].likes-1;
                        that.model.setMeta(meta);
                        console.log(that.model);
                        that.model.trigger('change');
                    },
                    error: function (response, xhr) {
                        var errorMsg = '';
                        $.each(xhr.responseJSON, function(index, value) {
                            errorMsg += index + ': ' + value;
                        });
                        logger(errorMsg);
                    }
                });
            } else {
                var parentUrl = '/comments/'+this.model.id+'/likes';
                var commentLikeModel = new CommentLikeModel({parentUrl: parentUrl});
                commentLikeModel.save(null,{
                    success: function (response) {
                        meta[id].isUser = true;
                        meta[id].likes = meta[id].likes+1;
                        meta[id].likeId = response.id;
                        that.model.setMeta(meta);
                        console.log(that.model);
                        that.model.trigger('change');
                    },
                    error: function (response, xhr) {
                        var errorMsg = '';
                        $.each(xhr.responseJSON, function(index, value) {
                            errorMsg += index + ': ' + value;
                        });
                        logger(errorMsg);
                    }
                });
            }
        }
    }
});
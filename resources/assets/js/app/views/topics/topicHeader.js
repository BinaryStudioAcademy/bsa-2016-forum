var Marionette = require('backbone.marionette');
var _ = require('underscore');
var BookmarkBehavior = require('../../behaviors/bookmarkBehavior');
var currentUser = require('../../initializers/currentUser');
var dateHelper = require('../../helpers/dateHelper');
var SubscribeBehavior = require('../../behaviors/subscribeBehavior');
var logger = require('../../instances/logger');
var TopicLikeModel = require('../../models/TopicLikeModel');

module.exports = Marionette.ItemView.extend({
    template: 'topicHeader',

    modelEvents: {
        'change': 'render'
    },

    serializeData: function () {
        var style;
        var likeUnlike;
        var meta = this.model.getMeta();
        var id = this.model.get('id');

        var meta = this.model.getMetaById() || {};

        if (!meta) return {
            model: this.model.toJSON(),
            meta: {
                user: {},
                likes: 0,
                comments: 0
            },
            createdDate: dateHelper.middleDate(this.model.get('created_at'))
        };

        if(meta.isUser == true)
        {
            style = 'glyphicon glyphicon-star';
            likeUnlike = 'Unlike';
        }
        else
        {
            style ='glyphicon  glyphicon-star-empty';
            likeUnlike = 'Like';
        }

        return {
            model: this.model.toJSON(),
            style: style,
            likeUnlike: likeUnlike,
            countOfLikes: meta.likes,
            isUser: meta.isUser,
            meta: {
                user: meta.user,
                likes: meta.likes,
                comments: meta.comments,
                isUser: meta.isUser,
                likeId: meta.likeId,
                countOfLikes: meta.countOfLikes,
                currentUser: meta.currentUser
            },
            canDelete: currentUser.isAdmin() || (currentUser.id == this.model.get('user_id')),
            createdDate: dateHelper.middleDate(this.model.get('created_at'))
        };
    },

    ui: {
        bookmarkButton: '.bookmark-btn',
        icon: '.bookmarked',
        subscribeNotification: '.subscribe-btn',
        likeUnlikeTopic: '.link-like-unlike'
    },

    events: {
        'click @ui.likeUnlikeTopic': 'likeUnlikeTopic'
    },

    behaviors: {
        SubscribeBehavior: {
            behaviorClass: SubscribeBehavior,
            parent_url: _.result(currentUser, 'url'),
            target_type: 'Topic'
        },

        BookmarkBehavior: {
            behaviorClass: BookmarkBehavior,
            target_type: 'Topic'
        }
    },

    likeUnlikeTopic: function(e){
        e.preventDefault();
        var meta = this.model.getMeta();
        var id = this.model.id;
        var that = this;
        if(meta[id].user.id != meta[id].currentUser) {
            if(meta[id].isUser == true) {
                var parentUrl = '/topics/'+this.model.id+'/likes/'+meta[id].likeId;
                var topicLikeModel = new TopicLikeModel({parentUrl: parentUrl,id:meta[id].likeId});
                topicLikeModel.destroy({
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
                var parentUrl = '/topics/'+this.model.id+'/likes';
                var topicLikeModel = new TopicLikeModel({parentUrl: parentUrl});
                topicLikeModel.save(null,{
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
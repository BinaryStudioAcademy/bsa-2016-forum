var Marionette = require('backbone.marionette');var Bookmark = require('../../models/BookmarkModel');var currentUser = require('../../initializers/currentUser');var dateHelper = require('../../helpers/dateHelper');var logger = require('../../instances/logger');var _ = require('underscore');var SubscribeBehavior = require('../../behaviors/subscribeBehavior');var BookmarkBehavior = require('../../behaviors/bookmarkBehavior');var TopicLikeModel = require('../../models/TopicLikeModel');module.exports = Marionette.ItemView.extend({    template: 'topicItem',    tagName: 'li',    ui: {        bookmarkButton: '.bookmark-btn',        subscribeNotification: '.subscribe-btn',        likeUnlikeTopic: '.link-like-unlike'    },    events: {        'click @ui.bookmarkTopic': 'bookmarkTopic',        'click @ui.likeUnlikeTopic': 'likeUnlikeTopic'    },    modelEvents: { change: 'render' },    behaviors: {        SubscribeBehavior: {            behaviorClass: SubscribeBehavior,            parent_url: _.result(currentUser, 'url'),            target_type: 'Topic'        },        BookmarkBehavior: {            behaviorClass: BookmarkBehavior,            target_type: 'Topic'        }    },    serializeData: function () {        var style;        var likeUnlike;        var countOfLikes;        var meta = this.model.getMeta();        var id = this.model.get('id');            if(meta[id].isUser == true)            {                style = 'glyphicon glyphicon-star';                likeUnlike = 'Unlike';            }            else            {                style ='glyphicon  glyphicon-star-empty';                likeUnlike = 'Like';            }            return {                model: this.model.toJSON(),                style: style,                likeUnlike: likeUnlike,                countOfLikes: meta[id].likes,                isUser: meta[id].isUser,                createdDate: dateHelper.shortDate(this.model.get('created_at')),                date : {                    day: dateHelper.getDateDay(this.model.get('created_at')),                    month: dateHelper.getDateMonth(this.model.get('created_at'))                },                meta: {                    isUser: meta[id].isUser,                    likeId: meta[id].likeId,                    countOfLikes: meta[id].countOfLikes,                    bookmark: meta[id].bookmark,                    comments: meta[id].comments,                    likes: meta[id].likes,                    user: meta[id].user,                    category: meta[id].category,                    subscription: meta[id].subscription,                    currentUser: meta[id].currentUser                },            };    },    onRender: function () {        var meta = this.model.getMeta();        if (meta && meta.bookmark) {            var self = this;            $.each(meta.bookmark, function(index, value) {                if (value.topic_id == self.model.get('id')) {                    self.model.bookmarkId = value.id;                    return false;                }            });        }        if (this.model.bookmarkId) {            this.addOkIcon();        }    },    bookmarkTopic: function (e) {        e.preventDefault();        var bookmark = new Bookmark();        this.lockButton();        var that = this;        if (this.model.bookmarkId) {            bookmark.set({                id: this.model.bookmarkId            });            bookmark.destroy({                success: function () {                    that.unlockButton();                    that.$('i.bookmarked').remove();                    that.model.bookmarkId = undefined;                },                error: function (response, xhr) {                    var errorMsg = '';                    $.each(xhr.responseJSON, function(index, value) {                        errorMsg += index + ': ' + value;                    });                    logger(errorMsg);                }            });        } else {            bookmark.save({                topic_id: this.model.id,                user_id: currentUser.id            }, {                success: function (response) {                    that.model.bookmarkId = response.id;                    that.unlockButton();                    that.addOkIcon();                },                error: function (response, xhr) {                    var errorMsg = '';                    $.each(xhr.responseJSON, function(index, value) {                        errorMsg += index + ': ' + value;                    });                    logger(errorMsg);                }            });        }    },    likeUnlikeTopic: function(e){        e.preventDefault();        var meta = this.model.getMeta();        var id = this.model.id;        var that = this;        if(meta[id].user.id != meta[id].currentUser) {            if(meta[id].isUser == true) {                var parentUrl = '/topics/'+this.model.id+'/likes/'+meta[id].likeId;                var topicLikeModel = new TopicLikeModel({parentUrl: parentUrl,id:meta[id].likeId});                topicLikeModel.destroy({                    success: function(model, response) {                        meta[id].isUser = false;                        meta[id].likes = meta[id].likes-1;                        that.model.setMeta(meta);                        console.log(that.model);                        that.model.trigger('change');                    },                    error: function (response, xhr) {                        var errorMsg = '';                        $.each(xhr.responseJSON, function(index, value) {                            errorMsg += index + ': ' + value;                        });                        logger(errorMsg);                    }                });            } else {                var parentUrl = '/topics/'+this.model.id+'/likes';                var topicLikeModel = new TopicLikeModel({parentUrl: parentUrl});                topicLikeModel.save(null,{                    success: function (response) {                        meta[id].isUser = true;                        meta[id].likes = meta[id].likes+1;                        meta[id].likeId = response.id;                        that.model.setMeta(meta);                        console.log(that.model);                        that.model.trigger('change');                    },                    error: function (response, xhr) {                        var errorMsg = '';                        $.each(xhr.responseJSON, function(index, value) {                            errorMsg += index + ': ' + value;                        });                        logger(errorMsg);                    }                });            }        }    }});
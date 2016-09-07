var Marionette = require('backbone.marionette');
var Bookmark = require('../../models/BookmarkModel');
var currentUser = require('../../initializers/currentUser');
var dateHelper = require('../../helpers/dateHelper');
var $ = require('jquery');

var TopicAddLikeModel = require('../../models/TopicAddLikeModel');
var TopicRemoveLikeModel = require('../../models/TopicRemoveLikeModel');

module.exports = Marionette.ItemView.extend({
    template: 'topicItem',
    className: 'row post-item',
    tagName: 'div',

    ui: {
        bookmarkTopic: '.bookmark-btn',
        addLikeTopic: '.fa-star-o',
        removeLikeTopic: '.fa-star'
    },

    events: {
        'click @ui.bookmarkTopic': 'bookmarkTopic',
        'click @ui.addLikeTopic': 'addLikeTopic',
        'click @ui.removeLikeTopic': 'removeLikeTopic'
    },

    modelEvents: { change: 'render' },

    unlockButton: function () {
        this.ui.bookmarkTopic.removeAttr('disabled');
        this.ui.bookmarkTopic.addClass('text-info');
        this.ui.bookmarkTopic.removeClass('text-muted');
    },

    lockButton: function () {
        this.ui.bookmarkTopic.attr('disabled', 'disabled');
        this.ui.bookmarkTopic.removeClass('text-info');
        this.ui.bookmarkTopic.addClass('text-muted');
    },

    addOkIcon: function () {
        this.ui.bookmarkTopic.append(' <i class="glyphicon glyphicon-ok bookmarked"></i>');
    },

    serializeData: function () {
        var style='';
        var href='';
        if(this.model.get('is_user'))
        {
            style = 'fa fa-star fa-2x';
            href =  '#topics/'+this.model.get('id')+'/likes/'+this.model.get('like_id');
        }
        else
        {
            style='fa fa-star-o fa-2x';
            href =  '#topics/'+this.model.get('id')+'/likes';
        }
        return {
            model: this.model.toJSON(),
            style: style,
            href: href,
            createdDate: dateHelper.shortDate(this.model.get('created_at'))
        };
    },

    onRender: function () {
        var meta = this.model.getMeta();

        if (meta && meta.bookmark) {
            var self = this;

            $.each(meta.bookmark, function(index, value) {
                if (value.topic_id == self.model.get('id')) {
                    self.model.bookmarkId = index;
                    return false;
                }
            });
        }

        if (this.model.bookmarkId) {
            this.addOkIcon();
        }
    },

    bookmarkTopic: function () {
        var bookmark = new Bookmark();

        this.lockButton();

        var that = this;

        if (this.model.bookmarkId) {
            bookmark.set({
                id: this.model.bookmarkId
            });
            bookmark.destroy({
                success: function () {
                    that.unlockButton();
                    that.$('i.bookmarked').remove();
                    that.model.bookmarkId = undefined;
                },
                error: function (response, xhr) {
                    var errorMsg = '';
                    $.each(xhr.responseJSON, function(index, value) {
                        errorMsg += index + ': ' + value;
                    });

                    alert(errorMsg);
                }
            });

        } else {
            bookmark.save({
                topic_id: this.model.id,
                user_id: currentUser.id
            }, {
                success: function (response) {
                    that.model.bookmarkId = response.id;
                    that.unlockButton();
                    that.addOkIcon();
                },
                error: function (response, xhr) {
                    var errorMsg = '';
                    $.each(xhr.responseJSON, function(index, value) {
                        errorMsg += index + ': ' + value;
                    });

                    alert(errorMsg);
                }
            });
        }
    },

    addLikeTopic: function(){
        var parentUrl = '/topics/'+this.model.id;
        var topicAddLikeModel=new TopicAddLikeModel({parentUrl: parentUrl});
        topicAddLikeModel.save();
        this.model.fetch({id:this.model.id});
        this.model.set({
            is_user:this.model.attributes.is_user,
            countOfLikes:this.model.attributes.countOfLikes,
        });
    },

    removeLikeTopic: function(){
        console.log(this.model.attributes.like_id);
        var parentUrl = '/topics/'+this.model.id+'/likes/'+this.model.attributes.like_id;
        var topicRemoveLikeModel = new TopicRemoveLikeModel({parentUrl: parentUrl,id:this.model.attributes.like_id});
        topicRemoveLikeModel.destroy({success: function(model, response) {
        },
            error:function(){
            }});
        this.model.fetch({id:this.model.id});
        this.model.set({
            is_user:this.model.attributes.is_user,
            countOfLikes:this.model.attributes.countOfLikes,
        });
    }
});
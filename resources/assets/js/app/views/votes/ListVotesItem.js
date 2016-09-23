var Marionette = require('backbone.marionette');
var Backbone = require('backbone');
var SubscribeBehavior = require('../../behaviors/subscribeBehavior');
var _ = require('underscore');
var currentUser = require('../../initializers/currentUser');
var dateHelper = require('../../helpers/dateHelper');
var VoteLikeModel = require('../../models/VoteLikeModel');

module.exports = Marionette.ItemView.extend({
    template: 'voteItem',
    tagName: 'li',
    
    attributes : function () {
        return {
            href: "#/votes/" + this.model.id
        }
    },
    
    ui: {
        subscribeNotification: '.subscribe-btn',
        likeUnlikeTopic: '.link-like-unlike'
    },

    events: {
        'click @ui.likeUnlikeTopic': 'likeUnlikeTopic'
    },

    modelEvents: { change: 'render' },

    behaviors: {
        SubscribeBehavior: {
            behaviorClass: SubscribeBehavior,
            parent_url: _.result(currentUser, 'url'),
            target_type: 'Vote'
        }
    },

    serializeData: function () {
        var style;
        var likeUnlike;

        var meta = this.model.getMetaById() || {};

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
            isFinished: ((this.model.get('finished_at') == null) || (dateHelper.getDateTimeDiff(this.model.get('finished_at')) < 0)),
            createdDate: dateHelper.fullDate(this.model.get('created_at')),
            finishedDate: (this.model.get('finished_at') != null) ? dateHelper.middleDate(this.model.get('finished_at')) : '',
            meta: {
                meta: meta,
                isUser: meta.isUser,
                likeId: meta.likeId,
                countOfLikes: meta.countOfLikes,
                likes: meta.likes,
                user: meta.user,
                currentUser: meta.currentUser
            },
        };
    },

    likeUnlikeTopic: function(e){
        e.preventDefault();
        var meta = this.model.getMeta();
        var id = this.model.id;
        var that = this;
        if(meta[id].user.id != meta[id].currentUser) {
            if(meta[id].isUser == true) {
                var parentUrl = '/votes/'+this.model.id+'/likes/'+meta[id].likeId;
                var voteLikeModel = new VoteLikeModel({parentUrl: parentUrl,id:meta[id].likeId});
                voteLikeModel.destroy({
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
                var parentUrl = '/votes/'+this.model.id+'/likes';
                var voteLikeModel = new VoteLikeModel({parentUrl: parentUrl});
                voteLikeModel.save(null,{
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
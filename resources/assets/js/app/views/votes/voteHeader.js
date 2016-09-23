var Marionette = require('backbone.marionette');
var SubscribeBehavior = require('../../behaviors/subscribeBehavior');
var _ = require('underscore');
var currentUser = require('../../initializers/currentUser');
var dateHelper = require('../../helpers/dateHelper');
var Radio = require('backbone.radio');
var ConfirmStopView = require('./voteConfirmStopView');
var app = require('../../instances/appInstance');
var VoteLikeModel = require('../../models/VoteLikeModel');

module.exports = Marionette.ItemView.extend({
    template: 'voteHeader',
    tagName: 'div',
    className: 'vote-head',
    modelEvents: {
        'change': 'render'
    },

    ui: {
        subscribeNotification: '.subscribe-btn',
        stopButton: '.stop-category-btn',
        likeUnlikeTopic: '.link-like-unlike'
    },

    events: {
        'click @ui.stopButton': 'showStopConfirmation',
        'click @ui.likeUnlikeTopic': 'likeUnlikeTopic'
    },

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

        var tempmeta = this.model.getMeta();
        var meta = {
            user: {},
            likes: {},
            comments: {},
            tags: {}
        };

        if (tempmeta) {
            var id = this.model.get('id');

            if(tempmeta[id].isUser == true)
            {
                style = 'glyphicon glyphicon-star';
                likeUnlike = 'Unlike';
            }
            else
            {
                style ='glyphicon  glyphicon-star-empty';
                likeUnlike = 'Like';
            }

            meta = {
                isUser: tempmeta[id].isUser,
                likeId: tempmeta[id].likeId,
                countOfLikes: tempmeta[id].countOfLikes,
                currentUser: tempmeta[id].currentUser,
                user: tempmeta[id].user,
                likes: tempmeta[id].likes,
                comments: tempmeta[id].comments,
                status: tempmeta[id].status,
                tags: tempmeta[id].tags,
                numberOfUniqueViews: tempmeta[id].numberOfUniqueViews,
                voteUniqueViewsWithUsers: tempmeta[id].voteUniqueViewsWithUsers,
                isFinished: ((this.model.get('finished_at') == null) || (dateHelper.getDateTimeDiff(this.model.get('finished_at')) < 0)),
                finishedDate: (this.model.get('finished_at') != null) ? dateHelper.middleDate(this.model.get('finished_at')) : '',
                showUsers: currentUser.isAdmin() || (currentUser.get('id') === this.model.get('user_id')),
                userIsAdminOrTS: currentUser.isAdmin() || (currentUser.get('id') === this.model.get('user_id'))
            }
        }

        return {
            model: this.model.toJSON(),
            style: style,
            likeUnlike: likeUnlike,
            countOfLikes: meta.likes,
            isUser: meta.isUser,
            meta: meta
        };
    },

    onRender: function () {
        if (this.model.get('finished_at')) {
            // if current date > vote finished date
            if (dateHelper.getDateTimeDiff(this.model.get('finished_at')) >= 0) {
                Radio.channel('votesChannel').trigger('showVoteResult');
            }
        }
    },

    showStopConfirmation: function () {
        app.renderModal(new ConfirmStopView({
            model: this.model
        }));
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
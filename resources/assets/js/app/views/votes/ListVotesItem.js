var Marionette = require('backbone.marionette');
var Backbone = require('backbone');
var SubscribeBehavior = require('../../behaviors/subscribeBehavior');
var _ = require('underscore');
var currentUser = require('../../initializers/currentUser');
var dateHelper = require('../../helpers/dateHelper');

module.exports = Marionette.ItemView.extend({
    template: 'voteItem',
    tagName: 'li',
    
    attributes : function () {
        return {
            href: "#/votes/" + this.model.id
        }
    },
    
    ui: {
        subscribeNotification: '.subscribe-btn'
    },

    behaviors: {
        SubscribeBehavior: {
            behaviorClass: SubscribeBehavior,
            parent_url: _.result(currentUser, 'url'),
            target_type: 'Vote'
        }
    },

    serializeData: function () {    
        var meta = this.model.getMetaById() || {};
        return {
            model: this.model.toJSON(),
            isFinished: ((this.model.get('finished_at') == null) || (dateHelper.getDateTimeDiff(this.model.get('finished_at')) < 0)),
            createdDate: dateHelper.fullDate(this.model.get('created_at')),
            finishedDate: (this.model.get('finished_at') != null) ? dateHelper.middleDate(this.model.get('finished_at')) : '',
           // meta: meta
            meta: {
                user: tempmeta[id].user,
                likes: tempmeta[id].likes,
                comments: tempmeta[id].comments,
                tags: tempmeta[id].tags,
                status: tempmeta[id].status,
                days_ago:tempmeta[id].days_ago,
                hasMorePages:tempmeta.hasMorePages,
                numberOfUniqueViews: tempmeta[id].numberOfUniqueViews,
                usersWhoSaw: tempmeta[id].usersWhoSaw,
            }
        };
    }
});
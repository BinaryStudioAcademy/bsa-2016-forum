var Marionette = require('backbone.marionette');
var Backbone = require('backbone');
var SubscribeBehavior = require('../../behaviors/subscribeBehavior');
var _ = require('underscore');
var currentUser = require('../../initializers/currentUser');
var dateHelper = require('../../helpers/dateHelper');

module.exports = Marionette.ItemView.extend({
    template: 'voteItem',
    tagName: 'a',

    attributes : function () {
        return {
            href: "#/votes/" + this.model.get("id")
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
        var tempmeta = this.model.getMeta();
        var id = this.model.get('id');
        return {
            model: this.model.toJSON(),
            createdDate: dateHelper.fullDate(this.model.get('created_at')),
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
                isFinished: dateHelper.getDateTimeDiff(this.model.get('finished_at')) > 0,
                finishedDate: dateHelper.middleDate(this.model.get('finished_at'))
            }
        };
    }
});
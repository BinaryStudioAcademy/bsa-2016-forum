var Marionette = require('backbone.marionette');
var SubscribeBehavior = require('../../behaviors/subscribeBehavior');
var _ = require('underscore');
var currentUser = require('../../initializers/currentUser');
var dateHelper = require('../../helpers/dateHelper');

module.exports = Marionette.ItemView.extend({
    template: 'voteHeader',
    tagName: 'div',
    className: 'vote-head',
    modelEvents: {
        'change': 'render'
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
        var meta = {
            user: {},
            likes: {},
            comments: {},
            tags: {}
        };
        if (tempmeta) {
            var id = this.model.get('id');
            meta = {
                user: tempmeta[id].user,
                likes: tempmeta[id].likes,
                comments: tempmeta[id].comments,
                status: tempmeta[id].status,
                tags: tempmeta[id].tags,
                numberOfUniqueViews: tempmeta[id].numberOfUniqueViews,
                usersWhoSaw: tempmeta[id].usersWhoSaw,
                isFinished: dateHelper.getDateTimeDiff(this.model.get('finished_at')) > 0,
                finishedDate: dateHelper.dateToSave(this.model.get('finished_at')),
                showUsers: currentUser.isAdmin() || (currentUser.get('id') === this.model.get('user_id'))
            }
        }

        return {
            model: this.model.toJSON(),
            meta: meta
        };
    }
});
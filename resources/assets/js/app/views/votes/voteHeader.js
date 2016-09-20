var Marionette = require('backbone.marionette');
var SubscribeBehavior = require('../../behaviors/subscribeBehavior');
var _ = require('underscore');
var currentUser = require('../../initializers/currentUser');
var dateHelper = require('../../helpers/dateHelper');
var Radio = require('backbone.radio');

module.exports = Marionette.ItemView.extend({
    template: 'voteHeader',
    tagName: 'div',
    className: 'vote-head',
    modelEvents: {
        'change': 'render'
    },

    ui: {
        subscribeNotification: '.subscribe-btn',
        saveSummary: '#summary-save-btn'
    },

    events: {
        'click @ui.saveSummary': 'saveSummary'
    },

    saveSummary: function () {
        var self = this;
        this.model.set('summary', this.$('#summary').val());
        this.model.set('user_id', currentUser.get('id'));
        this.model.save({}, {
            validate: false,
            success: function () {
                self.render();
            }
        });

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
                isFinished: ((this.model.get('finished_at') == null) || (dateHelper.getDateTimeDiff(this.model.get('finished_at')) < 0)),
                finishedDate: (this.model.get('finished_at') != null) ? dateHelper.middleDate(this.model.get('finished_at')) : '',
                userIsAdminOrTS: currentUser.isAdmin() || (currentUser.get('id') === this.model.get('user_id'))
            }
        }

        return {
            model: this.model.toJSON(),
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
    }
});
var Marionette = require('backbone.marionette');
var _ = require('underscore');
var BookmarkBehavior = require('../../behaviors/bookmarkBehavior');
var currentUser = require('../../initializers/currentUser');
var dateHelper = require('../../helpers/dateHelper');
var SubscribeBehavior = require('../../behaviors/subscribeBehavior');
var logger = require('../../instances/logger');

module.exports = Marionette.ItemView.extend({
    template: 'topicHeader',

    modelEvents: {
        'change': 'render'
    },

    serializeData: function () {
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
        
        return {
            model: this.model.toJSON(),
            meta: {
                user: meta.user,
                likes: meta.likes,
                comments: meta.comments
            },
            createdDate: dateHelper.middleDate(this.model.get('created_at')),
            isEditable: this.model.get('user_id') == currentUser.get('id') || currentUser.isAdmin()
        };
    },

    ui: {
        bookmarkButton: '.bookmark-btn',
        icon: '.bookmarked',
        subscribeNotification: '.subscribe-btn'
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
    }
});
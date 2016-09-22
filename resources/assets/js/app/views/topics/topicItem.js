var Marionette = require('backbone.marionette');
var currentUser = require('../../initializers/currentUser');
var dateHelper = require('../../helpers/dateHelper');
var logger = require('../../instances/logger');
var _ = require('underscore');
var SubscribeBehavior = require('../../behaviors/subscribeBehavior');
var BookmarkBehavior = require('../../behaviors/bookmarkBehavior');

module.exports = Marionette.ItemView.extend({
    template: 'topicItem',
    tagName: 'li',

    ui: {
        bookmarkButton: '.bookmark-btn',
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
    },

    serializeData: function () {
        return {
            model: this.model.toJSON(),
            createdDate: dateHelper.shortDate(this.model.get('created_at')),
            date : {
                day: dateHelper.getDateDay(this.model.get('created_at')),
                month: dateHelper.getDateMonth(this.model.get('created_at'))
            }
        };
    }
});
var Marionette = require('backbone.marionette');
var Backbone = require('backbone');
var SubscribeBehavior = require('../subscribeBehavior');
var _ = require('underscore');
var currentUser = require('../../initializers/currentUser');
var dateHelper = require('../../helpers/dateHelper');

module.exports = Marionette.ItemView.extend({
    template: 'voteItem',
    ui: {
        label: '#label',
        subscribeNotification: '.subscribe-btn'
    },
    events: {
        'click @ui.label': function () {
            Backbone.history.navigate('votes/' + this.model.get('id'), {trigger: true});
        }
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
            createdDate: dateHelper.fullDate(this.model.get('created_at')),
            meta: meta
        };
    }
});
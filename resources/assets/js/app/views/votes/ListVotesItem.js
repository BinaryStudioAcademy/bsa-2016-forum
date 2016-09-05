var Marionette = require('backbone.marionette');
var Backbone = require('backbone');
var SubscribeBehavior = require('../subscribeBehavior');
var _ = require('underscore');
var currentUser = require('../../initializers/currentUser');

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
            instance: "Collection",
            behaviorClass: SubscribeBehavior,
            parent_url: _.result(currentUser, 'url'),
            target_type: 'Vote'
        }
    },

    addOkSubscribeIcon: function () {
        this.ui.subscribeNotification.append(' <i class="glyphicon glyphicon-ok subscribed"></i>');
    },

    onRender: function () {
        if (this.model.getMeta() && this.model.getMeta().subscription && this.model.getMeta().subscription[this.model.get('id')]) {
            this.addOkSubscribeIcon();
        }
    },

    serializeData: function () {
        var tempmeta = this.model.getMeta();
        var id = this.model.get('id');
        return {
            model: this.model.toJSON(),
            meta: {
                user: tempmeta[id].user,
                likes: tempmeta[id].likes,
                comments: tempmeta[id].comments,
                tags: tempmeta[id].tags
            }
        };
    }
});
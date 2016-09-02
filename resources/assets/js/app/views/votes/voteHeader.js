var Marionette = require('backbone.marionette');
var SubscribeBehavior = require('../subscribeBehavior');
var _ = require('underscore');
var currentUser = require('../../initializers/currentUser');


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

    addOkSubscribeIcon: function () {
        this.ui.subscribeNotification.append(' <i class="glyphicon glyphicon-ok subscribed"></i>');
    },

    onRender: function () {
        if(this.model.getMeta() && this.model.getMeta().subscription) {
            this.addOkSubscribeIcon();
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
                tags: tempmeta[id].tags
            }
        }

        return {
            model: this.model.toJSON(),
            meta: meta
        };
    }
});
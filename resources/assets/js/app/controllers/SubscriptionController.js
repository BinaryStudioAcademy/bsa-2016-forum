var _ = require('underscore');
var Marionette = require('backbone.marionette');
var app = require('../instances/appInstance');
var SubscriptionsCollection = require('../collections/subscriptionCollection');
var SubscriptionsLayout = require('../views/subscriptions/subscriptionsLayout');
var currentUser = require('../initializers/currentUser');

module.exports = Marionette.Object.extend({

    index: function () {
        var subscriptionsCollection = new SubscriptionsCollection();
        subscriptionsCollection.parentUrl = _.result(currentUser, 'url');
        subscriptionsCollection.fetch();

        app.render(new SubscriptionsLayout({
            collection: subscriptionsCollection
        }));
    }
});
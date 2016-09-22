var baseCollection = require('../instances/Collection');
var SubscriptionModel = require('../models/SubscriptionModel');

module.exports = baseCollection.extend({
    url: '/subscriptions',
    model: SubscriptionModel
});

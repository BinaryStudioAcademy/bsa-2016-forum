var baseCollection = require('../instances/Collection');
var topicModel = require('../models/TopicModel');

module.exports = baseCollection.extend({
    url: '/topics',
    model: topicModel,

    initialize: function (options) {
        if (options && options.parentUrl) {
            this.parentUrl = options.parentUrl;
        }
    }
});
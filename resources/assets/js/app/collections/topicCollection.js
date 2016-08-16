var baseCollection = require('../instances/Collection');
var topicModel = require('../models/TopicModel');

module.exports = baseCollection.extend({
    url: '/topics',
    model: topicModel
});
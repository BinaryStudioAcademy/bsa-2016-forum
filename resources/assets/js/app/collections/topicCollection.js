var baseCollection = require('../instances/Collection');
var topicModel = require('../models/topicModel');

module.exports = baseCollection.extend({
    url: '/topics',
    model: topicModel
});
var baseCollection = require('../instances/Collection');
var topicModel = require('../models/topicModel');
var topicCollection = require('../models/topicModel');

var topicCollections = new topicCollection();
topicCollections.fetch();

module.exports = baseCollection.extend({
    url: '/topics',
    model: topicModel
});
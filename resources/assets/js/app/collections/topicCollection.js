var baseCollection = require('../instances/Collection');
var topicModel = require('../models/topicModel');

var topicCollection = baseCollection.extend({
    url: '/topics',
    // model: topicModel
});//

module.exports = topicCollection;
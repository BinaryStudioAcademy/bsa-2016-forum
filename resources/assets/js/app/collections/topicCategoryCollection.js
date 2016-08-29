var baseCollection = require('../instances/Collection');
var TopicCategoryModel = require('../models/TopicCategoryModel');

module.exports = baseCollection.extend({
    url: '/categories',
    model: TopicCategoryModel
});
var baseCollection = require('../instances/Collection');
var CommentModel = require('../models/CommentModel');

module.exports = baseCollection.extend({
    url: '/comments',
    model: CommentModel,
});
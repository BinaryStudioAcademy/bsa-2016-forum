var baseCollection = require('../instances/Collection');
var BookmarkModel = require('../models/BookmarkModel');

module.exports = baseCollection.extend({
    url: '/bookmarks',
    model: BookmarkModel
});

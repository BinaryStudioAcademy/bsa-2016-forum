var topicItem = require('./topicItem');
var paginateableCollectionView = require('../../instances/paginateableCollectionView');
module.exports = paginateableCollectionView.extend({
    childView: topicItem
});
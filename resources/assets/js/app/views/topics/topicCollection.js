var topicItem = require('./topicItem');
var paginateableCollectionView = require('../../instances/paginateableCollectionView');
module.exports = paginateableCollectionView.extend({
    childView: topicItem,
    tagName: 'ul',
    className: 'news-items topics',

    serializeData: function () {
        var meta = this.collection.getMeta();
        return {
            meta: meta
        }
    }
});
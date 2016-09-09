var topicItem = require('./topicItem');
var paginateableCollectionView = require('../../instances/paginateableCollectionView');
module.exports = paginateableCollectionView.extend({
    childView: topicItem,

    serializeData: function () {
        var meta = this.collection.getMeta();
        return {
            meta: meta
        }
    }
});
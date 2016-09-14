var Marionette = require('backbone.marionette');
var paginateableCollectionView = require('../../instances/paginateableCollectionView');
var childView = require('./VoteCommentItem');

module.exports =  Marionette.CollectionView.extend({
    childView: childView,

serializeData: function () {
    var meta = this.collection.getMeta();
    return {
        meta: meta
    }
}
});
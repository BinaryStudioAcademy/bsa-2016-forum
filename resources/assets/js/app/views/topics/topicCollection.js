var topicItem = require('./topicItem');
var Radio = require('backbone.radio');
var paginateableCollectionView = require('../../instances/paginateableCollectionView');
module.exports = paginateableCollectionView.extend({
    childView: topicItem,

    serializeData: function () {
        var meta = this.collection.getMeta();
        return {
            meta: meta
        }
    },
    initialize: function(){
        this.listenTo(Radio.channel('topicChannel'), 'removeLike', function (model) {
            model.fetch({url:'api/v1/topics/'+model.get('id')});
        });
        this.listenTo(Radio.channel('topicChannel'), 'addLike', function (model) {
            model.fetch({url:'api/v1/topics/'+model.get('id')});
        });
    }
});
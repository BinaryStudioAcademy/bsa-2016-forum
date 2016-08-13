var Marionette = require('backbone.marionette');
var topicItem = require('./topicItem');
var topicCollection = require('../../collections/topicCollection');

var topicCollections = new topicCollection();
topicCollections.fetch();

module.exports = Marionette.CollectionView.extend({
    collection: topicCollections,
    childView: topicItem
});
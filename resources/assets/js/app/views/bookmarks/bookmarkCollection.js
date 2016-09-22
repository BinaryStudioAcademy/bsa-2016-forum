var Marionette = require('backbone.marionette');

module.exports = Marionette.CollectionView.extend({
    childView: require('./bookmarkItem'),
    tagName: 'ul',
    className: 'news-items',
    emptyView: require('./bookmarkEmptyItem')
});
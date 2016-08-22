var Marionette = require('backbone.marionette');

module.exports = Marionette.CollectionView.extend({
    childView: require('./bookmarkItem'),
    childViewContainer: 'div',
    tagName: 'div'
});
var Marionette = require('backbone.marionette');

module.exports = Marionette.CollectionView.extend({
    childView: require('./userItem'),
    childViewContainer: 'div',
    tagName: 'div'
});
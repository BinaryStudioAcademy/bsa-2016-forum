var Marionette = require('backbone.marionette');

module.exports = Marionette.CollectionView.extend({
    template: '#users',
    childView: require('./userItem'),
    childViewContainer: 'div',
    tagName: 'div'
});
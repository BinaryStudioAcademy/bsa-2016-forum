var Marionette = require('backbone.marionette');

module.exports = Marionette.CollectionView.extend({
    childView: require('./userItem'),
    className: 'news-items users',
    tagName: 'ul'
});
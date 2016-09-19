var Marionette = require('backbone.marionette');
var NavigationItemView = require('./navigationItem');

module.exports = Marionette.CollectionView.extend({
    childView: NavigationItemView,
    className: 'mainnav',
    tagName: 'ul'
});
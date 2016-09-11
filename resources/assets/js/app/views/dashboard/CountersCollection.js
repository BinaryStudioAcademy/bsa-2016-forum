var Marionette = require('backbone.marionette');
var CounterItem = require('./CounterItem');

module.exports = Marionette.CollectionView.extend({
    childView: CounterItem,
    //className: 'nav navbar-nav',
    //tagName: 'ul',
});
var Marionette = require('backbone.marionette');
var childView = require('./VoteResultItem');

module.exports = Marionette.CollectionView.extend({
    tagName: 'div',
    className: 'vote-results col-xs-6',
    childView: childView
});
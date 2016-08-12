var Marionette = require('backbone.marionette');
var ListVotesItem = require('./ListVotesItem');

module.exports = Marionette.CollectionView.extend({
    childView : ListVotesItem
});

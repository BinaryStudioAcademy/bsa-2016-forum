var Marionette = require('backbone.require');
var ListVotesItem = require('./ListVotesItem');

module.exports = Marionette.CollectionView.extend({
    itemView : ListVotesItem
});

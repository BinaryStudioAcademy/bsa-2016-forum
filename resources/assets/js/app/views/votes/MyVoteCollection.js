var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var myVoteItem = require('./MyVoteItem');

module.exports = Marionette.CollectionView.extend({
    childView: myVoteItem
});


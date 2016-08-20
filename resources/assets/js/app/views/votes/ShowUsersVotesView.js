var Marionette = require('backbone.marionette');
var usersVoteItemView = require('./UsersVoteItemView');

module.exports = Marionette.CollectionView.extend({
    childView: usersVoteItemView
});


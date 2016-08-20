var Marionette = require('backbone.marionette');
var usersVoteModel = require('../../models/UsersVoteModel');

module.exports = Marionette.ItemView.extend({
    template: 'voteItem',
    className: 'row post-item',
    tagName: 'div',
});
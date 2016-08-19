var Marionette = require('backbone.marionette');
var myVoteModel = require('../../models/MyVoteModel');

module.exports = Marionette.ItemView.extend({
    template: 'voteItem',
    className: 'row post-item',
    tagName: 'div',
});
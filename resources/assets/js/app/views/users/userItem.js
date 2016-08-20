var Marionette = require('backbone.marionette');
var myVotesCollection=require('../../collections/UsersVotesCollection');
var mainLayout=require('../mainLayout')
var VoteLayout=require('../votes/voteLayout');

module.exports = Marionette.ItemView.extend({
    template: 'userItem',
    tagName: 'div',
});
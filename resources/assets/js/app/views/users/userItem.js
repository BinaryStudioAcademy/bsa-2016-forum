var Marionette = require('backbone.marionette');
var myVotesCollection=require('../../collections/UsersVotesCollection');
var mainLayout=require('../mainLayout')

module.exports = Marionette.ItemView.extend({
    template: 'userItem',
    tagName: 'div',
});
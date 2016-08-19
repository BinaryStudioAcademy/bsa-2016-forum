var Marionette = require('backbone.marionette');
var myVotesCollection=require('../../collections/MyVotesCollection');
var mainLayout=require('../mainLayout')
var VoteLayout=require('../votes/voteLayout');

module.exports = Marionette.ItemView.extend({
    template: 'userItem',
    tagName: 'div',
    ui:{
        user_item_vote:'.users-item-vote',
    },
    events:{
        'click @ui.user_item_vote':'showMyVotesList'
    },
    showMyVotesList:function(){
        var voteLayout=new VoteLayout();
        voteLayout.render();
        alert("xxxxx");
    }
});
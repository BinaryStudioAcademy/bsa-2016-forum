var Marionette = require('backbone.marionette');
var logger = require('../../instances/logger');
var MyVotesCollection = require('../../collections/MyVotesCollection');
var MyVoteCollectionView=require('./MyVoteCollection')

module.exports = Marionette.LayoutView.extend({
    template: 'voteLayout',
    regions: {
        container: '#posts'
    },
    onRender: function () {
       var  myVotesCollection=new MyVotesCollection({url:'votes'});
        myVotesCollection.fetch();
        this.container.show(new MyVoteCollectionView({
            collection: myVotesCollection
        }));
    }
});
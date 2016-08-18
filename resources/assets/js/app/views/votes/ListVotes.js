var Marionette = require('backbone.marionette');
var VotesCollectionView = require('./ListVotesCollection');
var IdeaHubController = require('../../controllers/IdeaHubController'); 

module.exports = Marionette.LayoutView.extend({
    template: 'voteCollection',
    regions: {
        items: '#vote-items'
    },
    initialize: function (options) {
        this.votesCol = options.vc;
    },
    onBeforeShow: function () {
        this.getRegion('items').show(
            new VotesCollectionView({
                collection: this.votesCol
            })
        );
        
    }
});
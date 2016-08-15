var Marionette = require('backbone.marionette');
var VotesCollectionView = require('./ListVotesCollection');
var IdeaHubController = require('../../controllers/IdeaHubController'); 

module.exports = Marionette.LayoutView.extend({
    template: 'voteCollection',
    ui: {
        
    },
    events: {},
    regions: {
        items: '#vote-items'
    },
    initialize: function (options) {
        debugger;
        this.votesCol = options.vc;
    },
    onBeforeShow: function () {
        debugger;
        this.getRegion('items').show(
            new VotesCollectionView({
                collection: this.votesCol
            })
        );
    }
});
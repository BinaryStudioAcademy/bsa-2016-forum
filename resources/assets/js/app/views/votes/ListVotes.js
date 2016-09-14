var Marionette = require('backbone.marionette');
var VotesCollectionView = require('./ListVotesCollection');

module.exports = Marionette.LayoutView.extend({
    template: 'voteCollection',
    regions: {
        items: '#vote-items'
    },
    onRender: function () {
        this.getRegion('items').show(
            new VotesCollectionView({
                collection: this.options.vc
            })
        );
        
    }
});
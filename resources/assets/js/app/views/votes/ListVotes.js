var Marionette = require('backbone.marionette');
var VotesCollectionView = require('./ListVotesCollection');
var UserAvatarView = require('../users/userAvatar');

module.exports = Marionette.LayoutView.extend({
    template: 'voteLayout',
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
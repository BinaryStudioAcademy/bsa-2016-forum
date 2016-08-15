var Marionette = require('backbone.marionette');
var CommentsCollection = require('../../collections/commentCollection');

var CommentsCollectionView = require('../../views/votes/VoteCommentsCollection.js');
module.exports = Marionette.LayoutView.extend({
    template: 'voteDetail',
    regions: {
        comments: '#comments'
    },
    serializeData: function () {
        var data = this.model.toJSON();
        data._meta = this.model._meta;

        return data;
    },
    onBeforeShow: function () {
        var self = this;
        var comcol = new CommentsCollection({ parentUrl: '/votes/' + this.model.get('id') });
        //var comcol = new CommentsCollection();
        comcol.fetch({success: function (data) {
            debugger;
            self.getRegion('comments').show(new CommentsCollectionView({collection: data}));
        }});
    }
});
var Marionette = require('backbone.marionette');
var CommentsCollection = require('../../collections/commentCollection');

var AddCommentView = require('./VoteCommentItemAdd');
var CommentsCollectionView = require('../../views/votes/VoteCommentsCollection.js');
module.exports = Marionette.LayoutView.extend({
    template: 'voteDetail',
    regions: {
        comments: '#comments',
        addcomment: '#add-comment'
    },
    serializeData: function () {
        var data = this.model.toJSON();
        data._meta = this.model._meta;

        return data;
    },
    onBeforeShow: function () {
        var self = this;
        var comcol = new CommentsCollection({ parentUrl: '/votes/' + this.model.get('id') });

        comcol.fetch({success: function (data) {
            self.getRegion('comments').show(new CommentsCollectionView({collection: data}));
        }});

        self.getRegion('addcomment').show(new AddCommentView({collection: comcol, parentId: self.model.get('id')}));
    }
});
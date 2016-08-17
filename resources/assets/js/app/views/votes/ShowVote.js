var Marionette = require('backbone.marionette');

var AddCommentView = require('./VoteCommentItemAdd');
var CommentsCollectionView = require('../../views/votes/VoteCommentsCollection.js');
module.exports = Marionette.LayoutView.extend({
    template: 'voteDetail',
    regions: {
        comments: '#comments',
        addcomment: '#add-comment'
    },
    serializeData: function () {
        var tempmeta = this.model.getMeta();
        var id = this.model.get('id');
        return {
            model: this.model.toJSON(),
            meta: {
                user: tempmeta.user[id],
                likes: tempmeta.likes[id],
                comments: tempmeta.comments[id]
            }
        };

    },
    initialize: function (options) {
        if(options.collection) {
            this.CommentsCollection = options.collection;
        }
        if(options.addcommodel) {
            this.CommentModel = options.addcommodel;
        }
    },
    onBeforeShow: function () {
        this.getRegion('comments').show(
            new CommentsCollectionView({
                collection: this.CommentsCollection
            }));

        this.getRegion('addcomment').show(
            new AddCommentView({
                collection: this.CommentsCollection,
                model: this.CommentModel
            })
        );

        // var comcol = new CommentsCollection({parentUrl: '/votes/' + this.model.get('id')});
        //
        // comcol.fetch({
        //     success: function (data) {
        //         self.getRegion('comments').show(new CommentsCollectionView({collection: data}));
        //     }
        // });
        //
        // self.getRegion('addcomment').show(new AddCommentView({collection: comcol, model: new CommentModel({ parentUrl: '/votes/' + this.model.get('id') })}));
    }
});
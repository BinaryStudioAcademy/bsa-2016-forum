var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');
var AddCommentView = require('./VoteCommentItemAdd');
var CommentsCollectionView = require('../../views/votes/VoteCommentsCollection.js');
module.exports = Marionette.LayoutView.extend({
    template: 'voteDetail',
    regions: {
        comments: '#comments',
        addcomment: '#add-comment'
    },
    ui: {
        c_count: '#count'
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
    initialize: function () {
        this.listenTo(Radio.channel('votesChannel'), 'setCommentsCount', function (n) {
            this.ui.c_count.text(n + ' Comments');
        });
    },
    onBeforeShow: function () {
        this.getRegion('comments').show(
            new CommentsCollectionView({
                collection: this.options.collection
            }));

        this.getRegion('addcomment').show(
            new AddCommentView({
                collection: this.options.collection,
                parentId: this.model.get('id')
            })
        );
    }
});
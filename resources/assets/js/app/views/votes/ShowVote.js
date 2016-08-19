var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');
var AddCommentView = require('./VoteCommentItemAdd');
var CommentsCollectionView = require('../../views/votes/VoteCommentsCollection');
var VoteHeader = require('../../views/votes/voteHeader');

module.exports = Marionette.LayoutView.extend({
    template: 'voteDetail',
    regions: {
        comments: '#comments',
        addcomment: '#add-comment',
        voteheader: '#vote-header'
    },
    ui: {
        c_count: '#count'
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
        console.log('onbeforeshow');
        this.getRegion('addcomment').show(
            new AddCommentView({
                collection: this.options.collection
            })
        );

        this.getRegion('voteheader').show(
            new VoteHeader({model: this.options.voteModel})
        );
    }
});
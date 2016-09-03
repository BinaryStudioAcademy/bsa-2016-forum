var Marionette = require('backbone.marionette');

var Radio = require('backbone.radio');
var CommentsCollectionView = require('../../views/votes/VoteCommentsCollection');
var VoteHeader = require('../../views/votes/voteHeader');
var VoteAnswersCollectionView = require('../../views/votes/VoteAnswersCollection');

module.exports = Marionette.LayoutView.extend({
    template: 'voteDetail',
    regions: {
        comments: '#comments',
        addcomment: '#add-comment',
        voteheader: '#vote-header',
        answers: '#answers'
    },
    ui: {
        c_count: '#count'
    },
    collectionEvents: {
        'update': function () {
            this.ui.c_count.text(this.collection.length + ' Comments');
        }
    },
    onRender: function () {
        Radio.trigger('votesChannel', 'showAddCommentView', this);

        this.getRegion('comments').show(
            new CommentsCollectionView({
                collection: this.options.collection
            }));

        this.getRegion('voteheader').show(
            new VoteHeader({model: this.options.voteModel})
        );

        this.getRegion('answers').show(
            new VoteAnswersCollectionView({collection: this.options.answers})
        );
    }
});
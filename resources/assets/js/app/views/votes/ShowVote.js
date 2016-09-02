var Marionette = require('backbone.marionette');
var _ = require('underscore');
var Radio = require('backbone.radio');
var AddCommentView = require('./VoteCommentItemAdd');
var CommentsCollectionView = require('../../views/votes/VoteCommentsCollection');
var VoteHeader = require('../../views/votes/voteHeader');
var VoteAnswersCollectionView = require('../../views/votes/VoteAnswersCollection');
var CommentModel = require('../../models/CommentModel')

module.exports = Marionette.LayoutView.extend({
    template: 'voteDetail',
    regions: {
        comments: '#comments',
        addcomment: '#add-comment',
        voteheader: '#vote-header',
        answers: '#answers'
    },
    ui: {
        c_count: '#count',
        newCommentButton: '.new-comment-notification'
    },

    events: {
        'click @ui.newCommentButton': 'showNewComments'
    },


    initialize: function () {
        this.listenTo(Radio.channel('votesChannel'), 'setCommentsCount', function (n) {
            this.ui.c_count.text(n + ' Comments');
        });
    },

    showNewComments: function () {
        console.log(this.options);
        this.options.collection.add(this.options.addedCommentsCollection.toJSON());
        this.ui.newCommentButton.hide();
    },

    onRender: function () {
        this.getRegion('comments').show(
            new CommentsCollectionView({
                collection: this.options.collection
            }));

        this.getRegion('addcomment').show(
            new AddCommentView({
                collection: this.options.collection
            })
        );

        this.getRegion('voteheader').show(
            new VoteHeader({model: this.options.voteModel})
        );

        this.getRegion('answers').show(
            new VoteAnswersCollectionView({collection: this.options.answers})
        );
    }
});
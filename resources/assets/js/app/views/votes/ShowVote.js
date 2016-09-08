var Marionette = require('backbone.marionette');
var _ = require('underscore');
var $ = require('jquery');
var Radio = require('backbone.radio');
var CommentsCollectionView = require('../../views/votes/VoteCommentsCollection');
var VoteHeader = require('../../views/votes/voteHeader');
var VoteAnswersCollectionView = require('../../views/votes/VoteAnswersCollection');
var CommentModel = require('../../models/CommentModel');
var socketCommentClient = require('../../initializers/socketCommentClient');
var CommentsCollection = require('../../collections/commentCollection');
var currentUser = require('../../initializers/currentUser');

module.exports = Marionette.LayoutView.extend({
    template: 'voteDetail',
    regions: {
        comments: '#comments',
        addcomment: '#add-comment',
        voteheader: '#vote-header',
        answers: '#answers'
    },
    ui: {
        c_count: '.count',
        newCommentButton: '.new-comment-notification'
    },

    events: {
        'click @ui.newCommentButton': 'showNewComments'
    },


    initialize: function () {
        this.listenTo(Radio.channel('votesChannel'), 'setCommentsCount' + this.options.voteModel.id, function (n) {
            this.ui.c_count.text(n);
        });

        socketCommentClient.bind('VoteComments', this.options.voteModel.id);
    },

    onBeforeDestroy: function () {
        this.stopListening();
        socketCommentClient.unbind('VoteComments', this.options.voteModel.id);
    },

    onShow: function () {
        this.addedCommentsCollection = new CommentsCollection([], {parentUrl: ''});

        var self = this;
        this.collection.listenTo(Radio.channel('VoteComments'),
            'newComment', function (comment) {
                self.addedCommentsCollection.add(new CommentModel(comment), {parentUrl: ''});
                var count = self.addedCommentsCollection.length + self.collection.length;
                Radio.trigger('votesChannel', 'setCommentsCount' + self.options.voteModel.id, count);

                if (comment.user_id != currentUser.id) {
                    self.ui.newCommentButton.show(300);
                } else {
                    self.options.collection.add(self.addedCommentsCollection.toJSON());
                }
            });
    },

    collectionEvents: {
        'update': function () {
            this.ui.c_count.text(this.collection.length);
        }
    },

    showNewComments: function () {
        this.options.collection.add(this.addedCommentsCollection.toJSON());
        this.ui.newCommentButton.hide();
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
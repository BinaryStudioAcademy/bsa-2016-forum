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
        newCommentButton: '.new-comment-notification',
        moreButton: '.vote-comments-more',
        lessButton: '.vote-comments-less'

    },

    events: {
        'click @ui.newCommentButton': 'showNewComments',
        'click @ui.moreButton': 'onClickVoteCommentsMore',
        'click @ui.lessButton': 'onClickVoteCommentsLess'
    },

    _pageMore: 2,
    _pageLess: 1,
    _allItemsUploaded:false,
    
    onClickVoteCommentsMore: function(e) {
        self = this;

        if (this._allItemsUploaded) {
            return;
        }

        var currentPage = this.collection.getMeta().currentPage;
        var lastPage = this.collection.getMeta().lastPage;

        this.collection.fetch({
            remove: true,
            data: {page: this._pageMore},
            error: function (collection, response) {
                console.log('error');
                self._allItemsUploaded = true;
                console.error(response.responseText);
            },
            success: function (collection, xhr) {

                if (currentPage + 1 < lastPage) {
                    this._pageMore++;
                    this._pageLess = this._pageMore - 1;
                }
            }.bind(this)
        });
    },

    onClickVoteCommentsLess: function(e) {

        if (this._allItemsUploaded) {
            return;
        }

        var currentPage = this.collection.getMeta().currentPage;

        this.collection.fetch({
            remove: true,
            data: {page: this._pageLess},
            error: function (collection, response) {
                self._allItemsUploaded = true;
                console.log('error');
                console.error(response.responseText);
            },
            success: function (collection, xhr) {

                if (currentPage >= 2) {
                    this._pageLess--;
                    this._pageMore = this._pageLess + 1;
                }
            }.bind(this)
        });
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
        this.collection.listenTo(Radio.channel('VoteComments'), 'newComment', function (comment) {
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
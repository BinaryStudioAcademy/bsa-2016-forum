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
var VoteRImodel = require('../../models/VoteRImodel');
var dateHelper = require('../../helpers/dateHelper');
var VoteResultsCollectionView = require('./VoteResultsCollection');

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
        voteCommit: '.commit-vote'
    },

    events: {
        'click @ui.newCommentButton': 'showNewComments',
        'click @ui.voteCommit': 'saveVotingOption'
    },


    initialize: function () {
        this.listenTo(Radio.channel('votesChannel'), 'setCommentsCount' + this.model.id, function (n) {
            this.ui.c_count.text(n);
        });

        socketCommentClient.bind('VoteComments', this.model.id);
        var self = this;
        // triggered after vote model fetched and if vote is finished
        this.listenTo(Radio.channel('votesChannel'), 'showVoteResult', function () {
            self.ui.voteCommit.hide();
            self.getRegion('answers').show(
                new VoteResultsCollectionView({
                    collection: this.options.answers,
                    isPublic: this.options.voteModel.get('is_public')
                })
            );
        });

        socketCommentClient.bind('VoteComments', this.options.voteModel.id);
    },

    onBeforeDestroy: function () {
        this.stopListening();
        socketCommentClient.unbind('VoteComments', this.model.id);
    },

    onShow: function () {
        this.addedCommentsCollection = new CommentsCollection([], {parentUrl: ''});

        var self = this;
        this.collection.listenTo(Radio.channel('VoteComments'), 'newComment', function (comment) {
            self.addedCommentsCollection.add(new CommentModel(comment), {parentUrl: ''});
            var count = self.addedCommentsCollection.length + self.collection.length;
            Radio.trigger('votesChannel', 'setCommentsCount' + self.model.id, count);

            if (comment.user_id != currentUser.id) {
                self.ui.newCommentButton.show(300);
            } else {
                self.options.collection.add(self.addedCommentsCollection.toJSON());
            }
        });


        this.listenTo(Radio.channel('votesChannel'), 'saveUserChoice', function () {
            self.ui.voteCommit.removeClass('disabled btn-default');
            self.ui.voteCommit.addClass('btn-primary');
        });
    },

    saveVotingOption: function () {
        var self = this;

        if (!self.ui.voteCommit.hasClass('disabled')) {
            if (this.model.get('is_single') == 1) {
                var voteOption = this.$('input[name=optionsRadios]:checked').val();

                var voteOptionModel = this.createVoteOptionModel(voteOption, 1);

                voteOptionModel.save({}, {
                    success: function () {
                        self.changeVoteButton();
                    }
                });
            } else {
                var selectedVotes = [];

                this.$('input:checkbox[name=optionsCheckboxes]').each(function () {
                    var option = [];
                    option['id'] = $(this).val();

                    if ($(this).is(':checked')) {
                        option['value'] = 1;
                    } else {
                        option['value'] = 0;
                    }

                    selectedVotes.push(option);
                });

                _.each(selectedVotes, function(num, key) {
                    var voteOptionModel = self.createVoteOptionModel(num['id'], num['value']);

                    if (num == (selectedVotes.length + 1)) {
                        voteOptionModel.save();
                    } else {
                        voteOptionModel.save({}, {
                            success: function () {
                                self.changeVoteButton();
                            }
                        });
                    }
                });
            }
        }
    },

    createVoteOptionModel: function (voteOption, voteValue) {
        return new VoteRImodel({
            user_id: currentUser.get('id'),
            vote_id: this.model.get('id'),
            vote_item_id: voteOption,
            vote_item_value: voteValue
        }, {parentUrl: this.options.collection.parentUrl});
    },

    changeVoteButton: function() {
        this.$('i.voted').remove();
        this.ui.voteCommit.append(' <i class="glyphicon glyphicon-ok voted"></i>');
        this.ui.voteCommit.removeClass('btn-primary');
        this.ui.voteCommit.addClass('disabled btn-default');
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
            new VoteHeader({model: this.model})
        );

        this.getRegion('answers').show(
            new VoteAnswersCollectionView({collection: this.options.answers})
        );
    },
    serializeData: function () {
        return {
            slug: this.model.vote_slug()
        }
    }
});
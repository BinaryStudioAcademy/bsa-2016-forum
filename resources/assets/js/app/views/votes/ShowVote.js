var Marionette = require('backbone.marionette');
var _ = require('underscore');
var $ = require('jquery');
var Radio = require('backbone.radio');
var CommentsCollectionView = require('../comments/TopicCommentsCollection');
var VoteHeader = require('../../views/votes/voteHeader');
var VoteSummary = require('../../views/votes/voteSummary');
var VoteAnswersCollectionView = require('../../views/votes/VoteAnswersCollection');
var CommentModel = require('../../models/CommentModel');
var socketCommentClient = require('../../initializers/socketCommentClient');
var CommentsCollection = require('../../collections/commentCollection');
var currentUser = require('../../initializers/currentUser');
var VoteRImodel = require('../../models/VoteRImodel');
var UserAvatarView = require('../users/userAvatar');
var VoteResultsCollectionView = require('./VoteResultsCollection');


module.exports = Marionette.LayoutView.extend({
    template: 'voteDetail',
    _isVoteView: true,
    regions: {
        comments: '#comments',
        newComment: '#add-comment',
        voteheader: '#vote-header',
        answers: '#answers',
        avatar: '#avatar',
        summary: '#summary-region'
    },
    ui: {
        c_count: '.count',
        newCommentButton: '.new-comment-notification',
        voteCommit: '.commit-vote',
        load: '.js-load-main-comments',
        reply: '.js-reply'
    },

    events: {
        'click @ui.newCommentButton': 'showNewComments',
        'click @ui.voteCommit': 'saveVotingOption',
        'click @ui.reply': function () {
            Radio.trigger('comment', 'addComment', this, null, this.collection);
        }
    },


    modelEvents: {
        'change:id': function () {
            if (this.model.get('id') && parseInt(this.model.get('id'))) {
                this.bindEvents();
            }
        }
    },

    initialize: function () {
    },

    onBeforeDestroy: function () {
        this.stopListening();
        socketCommentClient.unbind('VoteComments', this.model.id);
    },

    bindEvents: function () {
        socketCommentClient.bind('VoteComments', this.model.id);

        this.listenTo(Radio.channel('votesChannel'), 'setCommentsCount' + this.model.id, function (n) {
            this.ui.c_count.text(n);
        });

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
            var OneOrMoreCheeckedItems = this.getOption('answers').where({checked: true}).length > 0;
            this.ui.voteCommit.toggleClass('btn-primary', OneOrMoreCheeckedItems);
            this.ui.voteCommit.toggleClass('disabled btn-default', !OneOrMoreCheeckedItems);
        });

        // triggered after vote model fetched and if vote is finished
        this.listenTo(Radio.channel('votesChannel'), 'showVoteResult', function () {
            // if user has permissions to see vote results
            if (currentUser.isAdmin() || (self.model.get('user_id') == currentUser.get('id'))) {
                self.ui.voteCommit.hide();
                self.getRegion('answers').show(
                    new VoteResultsCollectionView({
                        collection: this.options.answers,
                        isPublic: self.model.get('is_public')
                    })
                );
            }
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

         this.getRegion('comments').show(
             new CommentsCollectionView({
                 collection: this.options.collection
             }));
        

        this.getRegion('voteheader').show(
            new VoteHeader({model: this.model})
        );

        this.getRegion('summary').show(
            new VoteSummary({model: this.model})
        );

        this.getRegion('answers').show(
            new VoteAnswersCollectionView({
                collection: this.options.answers,
                parent: this
            })
        );

        this.getRegion('avatar').show(
           new UserAvatarView({model: this.model})
        );
    },
    serializeData: function () {
        return {
            slug: this.model.vote_slug()
        }
    },
    
    showLoadCommentsButton: function (state) {
        this.ui.load.toggleClass('hidden', !state);
    },

    showChildCommentsButton: function (asd) {

    }
});
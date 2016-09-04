var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');
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
        c_count: '#count',
        general_comments: '.js-show-general-comments'
    },
    events: {
        'click @ui.general_comments': function () {
            Radio.trigger('votesChannel', 'renderCommentsView', {parentUrl: '/votes/' + this.options.id, view: this});
        }
    },
    collectionEvents: {
        'update': function () {
            this.ui.c_count.text(this.collection.length + ' Comments');
        }
    },
    onRender: function () {
        var self = this;

        Radio.trigger('votesChannel', 'showAddCommentView', {view: this, atStart: true});
        Radio.trigger('votesChannel', 'renderCommentsView', {parentUrl: '/votes/' + this.options.id, view: this});

        this.getRegion('voteheader').show(
            new VoteHeader({model: this.options.voteModel})
        );

        this.getRegion('answers').show(
            new VoteAnswersCollectionView({
                collection: this.options.answers,
                parent: self
            })
        );
    },
    updateCount: function () {
        this.ui.c_count.text(this.collection.length + ' Comments');
    }
});
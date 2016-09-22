var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');

module.exports = Marionette.LayoutView.extend({
    template: 'voteAnswerItem',
    _isVoteView: true,
    initialize: function (options) {
        this.vote = this.model.getMeta().vote;
    },
    serializeData: function () {
        var meta = this.model.getMetaById() || {
                checked: 0,
                vote: {},
                attachments: 0
            };
        return {
            model: this.model.toJSON(),
            meta: meta
        };
    },
    ui: {
        item: '.js-item-click',
        select: '.js-select',
        comments: '.js-show-answer-comments',
        addComment: '.js-comment-vote-item',
        commentsCount: '.js-vote-item-comments-count'
    },
    regions: {
        comments: '.js-vote-item-comments'
    },
    modelEvents: {
        'change': 'render'
    },
    events: {
        'click @ui.item': function (e) {
            Radio.trigger('votesChannel', 'saveUserChoice', this);
        },
        'click @ui.addComment': function (e) {
            Radio.trigger('comment', 'addComment', this, null, this.collection);
        }
    },
    onRender: function () {
        this.$('#collapse-'+this.model.id).on('show.bs.collapse', function () {
            if(!this.collection)
                Radio.trigger('votesChannel', 'loadVoteItemsComments', this);
        }.bind(this));

        this.model.url = '/voteitems/' + this.model.id;
        this.model.commentsUrl = '/votes/' + this.getOption('parent').model.vote_slug() + '/voteitems/' + this.model.id;
    }
    
});
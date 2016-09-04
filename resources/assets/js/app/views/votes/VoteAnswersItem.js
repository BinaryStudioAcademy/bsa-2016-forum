var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');

module.exports = Marionette.ItemView.extend({
    template: 'voteAnswerItem',
    initialize: function (options) {
        this.vote = this.model.getMeta().vote;
    },
    serializeData: function () {
        var tempmeta = this.model.getMeta();
        console.log(this.model.toJSON());
        return {
            model: this.model.toJSON(),
            meta: {
                vote: tempmeta.vote
            }
        };
    },
    ui: {
        item: '.js-item-click',
        select: '.js-select',
        comments: '.js-show-answer-comments'
    },
    modelEvents: {
        'change': 'render'
    },
    events: {
        'click @ui.comments': function (e) {
            e.stopPropagation();
            e.preventDefault();
            Radio.trigger('votesChannel', 'showAddCommentView', {view: this.options.parent, atStart: true});
            Radio.trigger('votesChannel', 'renderCommentsView', {parentUrl: '/votes/' + this.model.getMeta().vote.id + '/voteitems/' + this.model.get('id'), view: this.options.parent});
        }
    }
});
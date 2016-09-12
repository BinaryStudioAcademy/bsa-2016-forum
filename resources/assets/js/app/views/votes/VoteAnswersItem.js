var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');

module.exports = Marionette.ItemView.extend({
    template: 'voteAnswerItem',
    initialize: function (options) {
        this.vote = this.model.getMeta().vote;
    },
    serializeData: function () {
        var tempmeta = this.model.getMeta();
        return {
            model: this.model.toJSON(),
            meta: {
                checked: tempmeta.checked[this.model.get('id')],
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
        'click @ui.item': function (e) {
            Radio.trigger('votesChannel', 'saveUserChoice', this);
        }
    }
});
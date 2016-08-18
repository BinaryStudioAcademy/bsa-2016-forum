var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');

module.exports = Marionette.ItemView.extend({
    template: 'VoteCommentAdd',
    ui: {
        addButton: '.js-confirm',
        text: '.js-comment-text'
    },
    events: {
        'click @ui.addButton': function () {
            Radio.trigger('votesChannel', 'storeComment', this);
        }
    }
});
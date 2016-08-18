var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');

module.exports = Marionette.ItemView.extend({
    template: 'VoteCommentAdd',
    ui: {
        addButton: '.js-confirm',
        text: '.js-comment-text'
    },
    initialize: function (options) {
        if (options.collection) {
            this.collection = options.collection;
        }
        if (options.parentId) {
            this.parentId = options.parentId;
        }
    },
    events: {
        'click @ui.addButton': function () {
            Radio.trigger('votesChannel', 'storeComment', this);
        }
    }
});
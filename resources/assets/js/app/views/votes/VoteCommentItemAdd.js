var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');


module.exports = Marionette.ItemView.extend({
    template: 'VoteCommentAdd',
    ui: {
        addButton: '.js-confirm',
        text: '.js-comment-text',
        errorContainer: '.errors'
    },
    modelEvents: {
        'invalid': function (model, errors) {
            this.ui.errorContainer.html(errors['content_origin']);
        }
    },
    events: {
        'click @ui.addButton': function () {
            var parent = this.options.parent;
            this.model.save({content_origin: this.ui.text.val()}, {
                success: function (data) {
                    parent.collection.add(data);
                    Radio.trigger('votesChannel', 'showAddCommentView', parent);
                }
            });
        }
    }
});
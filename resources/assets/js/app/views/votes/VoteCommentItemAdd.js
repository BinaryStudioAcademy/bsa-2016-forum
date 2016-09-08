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
            var parent = this.getOption('parent');
            var atStart = this.getOption('atStart');
            this.model.save({}, {
                success: function (data) {
                    if (atStart)
                        parent.collection.add(data, {at: 0});
                    else {
                        if (parent.collection.level < 5) {
                            parent.collection.add(data);
                        } else {
                            data.parentUrl = null;
                            parent.getOption('parent').collection.add(data);
                        }
                    }
                    Radio.trigger('votesChannel', 'showAddCommentView', {view: parent, atStart: atStart});
                }
            });
        },
        'change @ui.text': function () {
            this.model.set({content_origin: this.ui.text.val()});
        }
    }
});
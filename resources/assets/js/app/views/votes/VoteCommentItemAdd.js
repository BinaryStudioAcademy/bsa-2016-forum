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
            this.model.save({content_origin: this.ui.text.val()}, {
                success: function (data) {
                    parent.collection.add(data);
                    Radio.trigger('votesChannel', 'showAddCommentView', parent);
                }
            });
        },
    },
    initialize: function(){
        this.listenTo(Radio.channel('votesChannel'), 'setCommentQuote', function (quote) {
            this.setComment(quote);
            this.setFocus();
        })
    },
    setComment: function(content){
        var value=this.EditQuote(content);
        $(this.ui.text).val(value);
    },
    setFocus: function(){
        $(this.ui.text).focus();
    },
    EditQuote: function (value) {
        value='>>> '+value+'\n';
        return value;
    }
});
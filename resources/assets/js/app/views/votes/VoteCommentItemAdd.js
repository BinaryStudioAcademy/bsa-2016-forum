var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: 'VoteCommentAdd',
    ui: {
        addButton: '.js-confirm',
        text: '.js-comment-text'
    },
    initialize: function (options) {
        this.model.set('rating', 3);
        this.model.set('user_id', 2);

        if (options.collection) {
            this.collection = options.collection;
        }
        if (options.parentId) {
            this.parentId = options.parentId;
        }
    },
    modelEvents: {
        'change:id': function() {this.ui.text.val('');}
    },
    events: {
        'click @ui.addButton': function () {
            var self = this;
            this.model.save({}, {
                success: function (data) {
                    self.collection.fetch();
                    data.unset('content_origin');
                    data.unset('id');
                }
            });
        },
        'change @ui.text': 'textChanged'
    },
    textChanged: function () {
        this.model.set('content_origin', this.ui.text.val());
        //console.log(this.model.get('content_origin'));
    }
});
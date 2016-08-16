var Marionette = require('backbone.marionette');
var CommentModel = require('../../models/CommentModel');

module.exports = Marionette.ItemView.extend({
    template: 'VoteCommentAdd',
    ui: {
        addButton: '.js-confirm',
        text: '.js-comment-text'
    },
    initialize: function (options) {
        if (options.collection) {
            this.storedColletion = options.collection;
            console.log(this.storedColletion);
        }
        if (options.parentId) {
            this.parentId = options.parentId;
            console.log(this.parentId);
        }
    },
    events: {
        'click @ui.addButton': function () {
            var self = this;
            var model = new CommentModel({ parentUrl: '/votes/' + this.parentId });
            model.set('content_origin', this.ui.text.val());
            model.set('rating', 3);
            model.set('user_id', 2);
            model.save({}, {
                    success: function (data) {
                        self.storedColletion.add(data);
                        self.render();
                    }
                });
        }
    }
});
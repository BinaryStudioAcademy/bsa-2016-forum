var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');
var CommentModel = require('../../models/CommentModel');

module.exports = Marionette.ItemView.extend({
    template: 'VoteCommentAdd',
    ui: {
        addButton: '.js-confirm',
        text: '.js-comment-text'
    },
    events: {
        'click @ui.addButton': function () {
            var self = this;
            var model = new CommentModel({}, {parentUrl: this.options.collection.parentUrl});
            model.set('user_id', 2);
            model.set('rating', 0);
            model.save({content_origin: this.ui.text.val()}, {
                success: function (data) {
                    //self.options.collection.fetch({async: false});
                    self.options.collection.add(data);
                    self.ui.text.val('');
                    Radio.trigger('votesChannel', 'setCommentsCount', self.options.collection.length);
                }
            });
        }
    }
});
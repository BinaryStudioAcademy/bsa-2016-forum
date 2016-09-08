var Marionette = require('backbone.marionette');
var dateHelper = require('../../helpers/dateHelper');
var VoteCommentItemAdd = require('./VoteCommentItemAdd');

module.exports = Marionette.ItemView.extend({
    tagName: 'div',
    className: 'vote-comment',
    template: 'voteDetailComment',
    ui: {
        replyComment: '#comment_reply'
    },

    events: {
        'click @ui.replyComment': 'replyComment'
    },
    serializeData: function () {
        var id = this.model.get('id');
        return {
            model: this.model.toJSON(),
            createdDate: dateHelper.fullDate(this.model.get('created_at')),
            meta: {
                user: this.model.getMeta()[id].user
            }
        };
    },
    replyComment: function () {
        var voteCommentAdd = new VoteCommentItemAdd();
        $(voteCommentAdd.ui.text).val('>>> '+this.model.attributes.content_origin+'\n');
        $(voteCommentAdd.ui.text).focus();
    },
});
var Marionette = require('backbone.marionette');
var dateHelper = require('../../helpers/dateHelper');
var VoteCommentItemAdd = require('./VoteCommentItemAdd');

module.exports = Marionette.ItemView.extend({
    tagName: 'div',
    className: 'vote-comment',
    template: 'voteDetailComment',
    ui: {
        replyComment: '.comment_reply'
    },

    events: {
        'click @ui.replyComment': 'replyComment'
    },
    serializeData: function () {
        var id = this.model.get('id');
        var meta = this.model.getMeta();

        if (!meta[id]) return {
            model: this.model.toJSON(),
            createdDate: dateHelper.fullDate(this.model.get('created_at')),
            meta: {
                user: this.model.get('user')
            }
        };

        return {
            model: this.model.toJSON(),
            createdDate: dateHelper.fullDate(this.model.get('created_at')),
            meta: {
                user: meta[id].user
            }
        };
    },
    replyComment: function () {
        var voteCommentAdd = new VoteCommentItemAdd();
        this.setComment(voteCommentAdd.ui.text,this.model.attributes.content_origin);
        this.setFocus(voteCommentAdd.ui.text);
    },
    setComment: function(id,content){
        var value='>>> '+content+'\n'
        $(id).val(value);
    },
    setFocus: function(id){
       $(id).focus();
        }
    }
});
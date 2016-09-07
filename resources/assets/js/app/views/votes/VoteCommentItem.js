var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');

var moment = require('moment');
module.exports = Marionette.LayoutView.extend({
    tagName: 'div',
    className: 'vote-comment well',
    template: 'voteDetailComment',
    ui: {
        submit: '.js-show-branch',
        count: '.js-comments-count',
        delete: '.js-delete'
    },
    regions: {
        answers: '#comment-answer',
        addcomment: '#add-comment'
    },
    modelEvents: {
        'change': 'render'
    },
    collectionEvents: {
        'update':'updateCount'
    },
    initialize: function (options) {
        if(options.parent) this.parent = options.parent;
        this.opened = false;
        this.commentable = false;
    },
    events: {
        'click @ui.submit': function (e) {
            e.stopPropagation();
            if(!this.opened){
                Radio.trigger('votesChannel', 'loadNestedComments', this);
                if(this.commentable)
                    Radio.trigger('votesChannel', 'showAddCommentView', {view: this, atStart: false});
                this.ui.submit.text('Hide');
            } else {
                this.getRegion('addcomment').empty();
                this.getRegion('answers').empty();
                this.ui.submit.text('Show comments branch');
            }
            this.opened = !this.opened;
        },
        'click @ui.delete': function (e) {
            e.preventDefault();
            e.stopPropagation();
            this.model.destroy({async: false});
            if(this.parent.collection) this.parent.collection.fetch({async: false});
        }
    },
    serializeData: function () {
        var id = this.model.get('id');
        var tempmeta = this.model.getMeta()[id];
        this.commentable = tempmeta.commentable;
        return {
            model: this.model.toJSON(),
            meta: {
                user: tempmeta.user,
                comments: tempmeta.comments,
                level: this.model.collection.level,
                deletable: tempmeta.deletable
            }
        };
    },
    updateCount: function () {
        this.ui.count.text('Comments: ' + this.collection.length);
    }
});
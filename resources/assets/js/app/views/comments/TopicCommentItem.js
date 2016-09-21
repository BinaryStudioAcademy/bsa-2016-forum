var Marionette = require('backbone.marionette');
var _ = require('underscore');
var logger = require('../../instances/logger');
var currentUser = require('../../initializers/currentUser');
var TopicCommentHeaderView = require('./TopicCommentHeader');
var CommentsCollection = require('../../collections/TopicCommentsCollection');

module.exports = Marionette.LayoutView.extend({
    template: 'TopicCommentItem',
    _childUpload: false,
    _childCommentsCollection: null,

    initialize: function() {
        this._childCommentsCollection = new CommentsCollection();
    },

    regions: {
        'commentHeader': '.comment-header',
        'childComments': '.topic-comment-childs'
    },

    ui: {
        'errors': '.errors',
        'childs': '.topic-comment-included',
    },

    childsVisible: function () {
        return this.ui.childs.is(':visible');
    },

    childsToggle: function () {
        return this.ui.childs.slideToggle('fast');
    },

    onRender: function () {
        this.getRegion('commentHeader').show(new TopicCommentHeaderView({
            model: this.model,
            commentLayout: this,
            parentCommentView: this.getOption('parentCommentView')
        }));
    }
});
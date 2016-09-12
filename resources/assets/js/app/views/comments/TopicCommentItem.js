var Marionette = require('backbone.marionette');
var _ = require('underscore');
var logger = require('../../instances/logger');
var Radio = require('backbone.radio');
var currentUser = require('../../initializers/currentUser');
var TopicCommentHeaderView = require('./TopicCommentHeader');

module.exports = Marionette.LayoutView.extend({
    template: 'TopicCommentItem',
    _childUpload: false,
    _childCommentsCollection: null,

    regions: {
        'commentHeader': '.comment-header',
        'childComments': '.topic-comment-childs'
    },

    ui: {
        'errors': '.errors',
        'childs': '.topic-comment-included',
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
    },
});
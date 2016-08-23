var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var CommentItem = require('./TopicCommentItem');
var logger = require('../../instances/logger');
var Radio = require('backbone.radio');

module.exports = Marionette.CollectionView.extend({
    childView: CommentItem,

    initialize: function (options) {
        this.listenTo(Radio.channel('сommentCollection'), 'addComment', this.addComment);
    },

    collectionEvents: {
        'change': 'render'
    },

    addComment: function (model) {
        //logger(model);
        this.collection.add(model);
    },

    onRender: function () {
        //console.log(this.collection, 'topic comments collection render');
    }
});

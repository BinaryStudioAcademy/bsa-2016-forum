var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var CommentItem = require('./TopicCommentItem');
var logger = require('../../instances/logger');
var Radio = require('backbone.radio');

module.exports = Marionette.CollectionView.extend({
    childView: CommentItem,

    events: {

    },

    initialize: function (options) {
        this.listenTo(Radio.channel('newComment'), 'addCommentModel', this.addCommentModel);
    },

    addCommentModel: function (model) {
        //logger(model);
        this.collection.add(model);
    },

    onRender: function () {

    }
});

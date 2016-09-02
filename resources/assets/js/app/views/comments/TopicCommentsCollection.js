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

    addComment: function (model) {
        if (!this.collection.findWhere({ id: model.get('id') })) this.collection.add(model);
        else {
            model.trigger('change');
        }
    },
});

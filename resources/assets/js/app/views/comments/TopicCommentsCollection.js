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
        //console.log(model.collection, 'collection');
        //console.log(this._parent);
        ////if (model.collection) {
        ////    model.collection.add(model);
        ////    return;
        ////}
        if (!this.collection.findWhere({ id: model.get('id') })) {
            debugger;
            this.collection.add(model);
        }
        else {
            model.trigger('change');
        }
    },
});

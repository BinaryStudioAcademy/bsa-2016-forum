var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var CommentItem = require('./CommentItem');

module.exports = Marionette.CollectionView.extend({
    childView: CommentItem,

    onRender: function () {

    }
});

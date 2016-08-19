var Marionette = require('backbone.marionette');
var childView = require('./VoteCommentItem');

module.exports = Marionette.CollectionView.extend({
    childView: childView
});
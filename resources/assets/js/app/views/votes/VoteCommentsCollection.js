var Marionette = require('backbone.marionette');
var childView = require('./VoteCommentItem');

module.exports = Marionette.CollectionView.extend({
    childView: childView,
    initialize: function (options) {
        if(options.parent) this.parent = options.parent;
    },
    childViewOptions: function (model, index) {
        return {
            parent: this.parent
        }
    }
});
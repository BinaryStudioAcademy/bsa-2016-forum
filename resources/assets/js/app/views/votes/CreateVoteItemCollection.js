var Marionette = require('backbone.marionette');
var childView = require('./CreateVoteItem');

module.exports = Marionette.CollectionView.extend({
    childView: childView,
    childViewOptions: function() {
        return {
            parent: this.getOption('parent')
        }
    }
});
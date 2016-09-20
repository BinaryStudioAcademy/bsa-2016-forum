var Marionette = require('backbone.marionette');
var childView = require('./VoteResultItem');

module.exports = Marionette.CollectionView.extend({
    tagName: 'div',
    className: 'vote-results',
    childView: childView,
    childViewOptions: function () {
        return {
            isPublic: this.options.isPublic
        };
    }
});
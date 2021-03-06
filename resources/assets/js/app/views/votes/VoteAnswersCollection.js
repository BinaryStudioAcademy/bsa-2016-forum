var Marionette = require('backbone.marionette');
var childView = require('./VoteAnswersItem');

module.exports = Marionette.CollectionView.extend({
    tagName: 'div',
    className: 'vote-question',
    childView: childView,
    childViewOptions: function () {
        return {
            parent: this.getOption('parent')
        }
    }
});
var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: 'voteItem',
    className: 'row post-item',
    tagName: 'div'
});
var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: 'bookmarkEmptyItem',
    tagName: 'li'
});
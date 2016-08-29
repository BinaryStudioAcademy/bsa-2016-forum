var Marionette = require('backbone.marionette');
var logger = require('../../instances/logger');
var bookmarkCollection = require('./bookmarkCollection');

module.exports = Marionette.LayoutView.extend({
    template: 'bookmarkLayout',
    regions: {
        container: '#bookmarks'
    },

    onRender: function () {
        this.container.show(new bookmarkCollection({
            collection: this.collection
        }));
    }
});
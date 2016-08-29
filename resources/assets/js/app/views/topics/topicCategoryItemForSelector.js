var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: 'topicCategoryItemForSelector',

    onRender: function () {
        console.log(this.collection, 'render');
    },

    collectionEvents: {
        'sync': 'render'
    },

    initialize: function (options) {
    }

});
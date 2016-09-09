var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: 'topicCategoryItemForSelector',

    collectionEvents: {
        'sync': 'reRender'
    },

    reRender: function () {
        var self = this;

        this.collection.forEach (function (model, index) {
            if (self.options.topicModel.get('category_id') == model.get('id')) {
                model.attributes.selectedItem = 'selected'
            } else {
                model.attributes.selectedItem = ''
            }
        });

        this.render();
    }
});
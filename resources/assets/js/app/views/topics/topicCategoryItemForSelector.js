var Marionette = require('backbone.marionette');
var _ = require('underscore');

module.exports = Marionette.ItemView.extend({
    template: 'topicCategoryItemForSelector',

    collectionEvents: {
        'sync': 'reRender'
    },
    
    modelEvents: {
        'sync': 'reRender'
    },

    serializeData: function () {
        return {
            selectOptions: this.selectOptions
        }
    },

    reRender: function () {
        var self = this;
        this.selectOptions = this.collection.toJSON();
        this.selectOptions = _.each(this.selectOptions, function (model, key) {
            if (self.model.get('category_id') == model.id) {
                model.selectedItem = 'selected'
            } else {
                model.selectedItem = ''
            }
        });
        this.render();
    }
});
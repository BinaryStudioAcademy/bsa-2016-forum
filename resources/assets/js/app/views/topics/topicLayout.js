var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var app = require('../../instances/appInstance');
var logger = require('../../instances/logger');
var topicCollection = require('./topicCollection');
var _ = require('underscore');

module.exports = Marionette.LayoutView.extend({
    template: 'topicLayout',
    regions: {
        container: '#posts'
    },

    onRender: function () {
        this.container.show(new topicCollection({
            collection: this.collection
        }));
    },

    serializeData: function () {
        if (this.options.categoryId) {
            var catId = this.options.categoryId;
        } else {
            var catId = 0;
        }

        return {
            categoryId: catId
        }
    }
});

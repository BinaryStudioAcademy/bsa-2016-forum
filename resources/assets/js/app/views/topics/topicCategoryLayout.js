var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var app = require('../../instances/appInstance');
var logger = require('../../instances/logger');
var topicCategoryCollection = require('./topicCategoryCollection');

module.exports = Marionette.LayoutView.extend({
    template: 'topicCategoryLayout',
    regions: {
        container: '#categories'
    },
    
    onRender: function () {
        this.container.show(new topicCategoryCollection({
            collection: this.collection
        }));
    }
});

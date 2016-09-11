var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var app = require('../../instances/appInstance');
var logger = require('../../instances/logger');
var topicCategoryCollection = require('./topicCategoryCollection');
var currentUser = require('../../initializers/currentUser');

module.exports = Marionette.LayoutView.extend({
    template: 'topicCategoryLayout',
    regions: {
        container: '#categories'
    },

    serializeData: function () {
        return {
            isAdmin: currentUser.isAdmin()
        };
    },

    onRender: function () {
        this.container.show(new topicCategoryCollection({
            collection: this.collection
        }));
    }
});

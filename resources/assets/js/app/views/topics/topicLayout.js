var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var app = require('../../instances/appInstance');
var logger = require('../../instances/logger');
var topicCollection = require('./topicCollection');
var _ = require('underscore');
var currentUser = require('../../initializers/currentUser');

module.exports = Marionette.LayoutView.extend({
    template: 'topicLayout',
    regions: {
        container: '#posts'
    },

    serializeData: function () {
        return {
            role: (currentUser.isAdmin()) ? '' : 'hide'
        };
    },

    onRender: function () {
        this.container.show(new topicCollection({
            collection: this.collection
        }));
    }

});

var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var app = require('../../instances/appInstance');
var logger = require('../../instances/logger');
var topicCollection = require('./topicCollection');
var _ = require('underscore');
var topicCategoryItemForBreadcrumbs = require('../../views/topics/topicCategoryItemForBreadcrumbs');
var TopicCategoryModel = require('../../models/TopicCategoryModel');

module.exports = Marionette.LayoutView.extend({
    template: 'topicLayout',
    regions: {
        container: '#posts',
        breadcrumbs: '#categoryForBreadcrumbs'
    },
    events: {
        'change': 'render'
    },
    onRender: function () {

        this.container.show(new topicCollection({
            collection: this.collection
        }));
        
        this.breadcrumbs.show(new topicCategoryItemForBreadcrumbs({
            model: this.model
        }));
    }

});

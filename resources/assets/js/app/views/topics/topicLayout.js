var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var app = require('../../instances/appInstance');
var logger = require('../../instances/logger');
var topicCollection = require('./topicCollection');
var _ = require('underscore');
var currentUser = require('../../initializers/currentUser');
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

    serializeData: function () {
        var shows = true;

        if (this.options.categoryId) {
            var catId = this.options.categoryId;
        }

        if (this.options.blockhide) {
            shows = false;
        }

        return {
            isAdmin: currentUser.isAdmin(),
            categoryId: catId
        };
    },

    onRender: function () {
        this.container.show(new topicCollection({
            collection: this.collection,
            paginate: this.options.paginate
        }));
        
        this.breadcrumbs.show(new topicCategoryItemForBreadcrumbs({
            model: this.model
        }));
    }

});

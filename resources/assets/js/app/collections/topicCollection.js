var baseCollection = require('../instances/Collection');
var topicModel = require('../models/TopicModel');
var Backbone = require("backbone");
var PageableCollection = require("backbone.paginator");


module.exports = baseCollection.extend({
    url: '/categories/:catId/topics',
    model: topicModel,

    initialize: function (options) {
        if (options && options.parentUrl) {
            this.parentUrl = options.parentUrl;
        }
    }

});
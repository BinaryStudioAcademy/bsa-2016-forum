var baseCollection = require('../instances/Collection');
var topicModel = require('../models/TopicModel');
var Backbone = require("backbone");


module.exports = baseCollection.extend({
   
    model: topicModel,
    url: '/topics',

    initialize: function (options) {
        
        if (options && options.parentUrl) {
            this.parentUrl = options.parentUrl;
        }
    }

});
var Model = require('../models/VoteAIModel');
var BaseCollection = require('../instances/Collection');

module.exports = BaseCollection.extend({
    model: Model,
    url: '/voteitems',
    initialize: function (models, options) {
        if (options.parentUrl) {
            this.parentUrl = options.parentUrl;
        }
    }
});

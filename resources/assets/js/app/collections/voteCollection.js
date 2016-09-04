var Model = require('../models/VoteModel');
var BaseCollection = require('../instances/Collection');

module.exports = BaseCollection.extend({
    model: Model,
    url: '/votes',
    initialize: function (models, options) {
        if (options && options.parentUrl) {
            this.parentUrl = options.parentUrl;
        }
    }
});

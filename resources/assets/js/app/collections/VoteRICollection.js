var Model = require('../models/VoteRImodel');
var BaseCollection = require('../instances/Collection');

module.exports = BaseCollection.extend({
    model: Model,
    url: '/voteresult',
    initialize: function (models, options) {
        if (options)
            if (options.parentUrl) {
                this.parentUrl = options.parentUrl;
            }
    }
});
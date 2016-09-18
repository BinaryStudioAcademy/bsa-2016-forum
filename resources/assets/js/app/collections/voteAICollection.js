var Model = require('../models/VoteAIModel');
var BaseCollection = require('../instances/Collection');

module.exports = BaseCollection.extend({
    model: Model,
    url: '/voteitems'
});

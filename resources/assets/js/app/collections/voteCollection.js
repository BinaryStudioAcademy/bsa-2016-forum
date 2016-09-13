var Model = require('../models/VoteModel');
var BaseCollection = require('../instances/Collection');

module.exports = BaseCollection.extend({
    model: Model,
    url: '/votes'
});

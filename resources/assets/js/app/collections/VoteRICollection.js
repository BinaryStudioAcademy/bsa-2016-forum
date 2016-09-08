var Model = require('../models/VoteRImodel');
var BaseCollection = require('../instances/Collection');

module.exports = BaseCollection.extend({
    model: Model,
    url: '/voteresult'
});
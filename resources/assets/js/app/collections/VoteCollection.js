var baseCollection = require('../instances/Collection');
var voteModel = require('../models/VoteModel');

module.exports = baseCollection.extend({
    url: '/votes',
    model: voteModel
});

var baseCollection = require('../instances/Collection');
var myVoteModel = require('../models/MyVoteModel');

module.exports = baseCollection.extend({
    model: myVoteModel,
});
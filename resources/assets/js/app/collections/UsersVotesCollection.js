var baseCollection = require('../instances/Collection');
var usersVoteModel = require('../models/UsersVoteModel');

module.exports = baseCollection.extend({
    model: usersVoteModel,
});
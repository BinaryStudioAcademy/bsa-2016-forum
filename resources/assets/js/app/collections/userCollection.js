var baseCollection = require('../instances/Collection');
var UserModel = require('../models/UserModel');

module.exports = baseCollection.extend({
    url: '/users',
    model: UserModel
});

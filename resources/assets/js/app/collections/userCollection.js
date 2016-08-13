var baseCollection = require('../instances/Collection');

var userCollection = baseCollection.extend({
    url: '/users',
});

module.exports = userCollection;
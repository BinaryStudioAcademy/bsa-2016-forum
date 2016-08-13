var baseCollection = require('../instances/Collection');

var userCollection = baseCollection.extend({
    url: '/users',
    parse: function(response) {
        this._meta = response.meta;
        return response.data;
    }
});

module.exports = userCollection;
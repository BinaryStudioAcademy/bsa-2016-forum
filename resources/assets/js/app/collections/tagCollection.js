var Model = require('../models/TagModel');
var BaseCollection = require('../instances/Collection');

module.exports = BaseCollection.extend({
    model: Model,
    url: '/tags',
    initialize: function (options) {
        if()
    }
});
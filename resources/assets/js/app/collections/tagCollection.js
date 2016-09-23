var baseCollection = require('../instances/Collection');
var Tag = require('../models/Tag');

module.exports = baseCollection.extend({
    url: '/tags',
    model: Tag
});

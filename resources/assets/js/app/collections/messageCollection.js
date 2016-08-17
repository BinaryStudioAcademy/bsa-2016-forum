var baseCollection = require('../instances/Collection');
var MessageModel = require('../models/MessageModel');

module.exports = baseCollection.extend({
    url: '/messages',
    model: MessageModel
});

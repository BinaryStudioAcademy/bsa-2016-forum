var Backbone = require('backbone');
var logger = require('../instances/logger');
var VoteModel = require('../models/VoteModel');

module.exports = Backbone.Collection.extend({
    model: VoteModel
});

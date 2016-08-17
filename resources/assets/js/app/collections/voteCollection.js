var Backbone = require('backbone');
var logger = require('../instances/logger');
var Model = require('../models/VoteModel');
var BaseCollection = require('../instances/Collection');
var _ = require('underscore');

module.exports = BaseCollection.extend({
    model: Model,
    url: '/votes'
});

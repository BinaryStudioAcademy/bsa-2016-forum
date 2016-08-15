var Backbone = require('backbone');
var logger = require('../instances/logger');
var Model = require('../models/VoteModel');
var BaseCollection = require('../instances/Collection');
var _ = require('underscore');

var collection = BaseCollection.extend({
    model: Model,
    url: '/votes',
    parse: function (response) {
        this._meta = response._meta;
        return response.data;
    }
});

module.exports = new collection();

var Backbone = require('backbone');
var logger = require('../instances/logger');
var VoteModel = require('../models/VoteModel');
var BaseCollection = require('../instances/Collection');
var _ = require('underscore');

var collection = BaseCollection.extend({
    model: VoteModel,
    url: '/votes',
    parse: function (response) {
        this._meta = response._meta;
        //this._meta = {'id': '1', 'name': 'tralala'};
        return response.data;
    }
});

module.exports = new collection();

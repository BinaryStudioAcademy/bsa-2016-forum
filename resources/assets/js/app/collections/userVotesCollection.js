/**
 * Created by lyudmila on 26.08.16.
 */
var baseCollection = require('../instances/Collection');
var baseModel = require('../instances/Model');

module.exports = baseCollection.extend({
    url: '/votes',
    model: baseModel
});
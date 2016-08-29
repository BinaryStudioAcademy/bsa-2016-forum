/**
 * Created by lyudmila on 26.08.16.
 */
var baseCollection = require('../instances/Collection');
var baseModel = require('../instances/Model');

module.exports = baseCollection.extend({
    url: '/votes',
    model: baseModel,
    initialize: function (models, options) {
        if (options.parentUrl) {
            this.parentUrl = options.parentUrl;
        }
    }
});
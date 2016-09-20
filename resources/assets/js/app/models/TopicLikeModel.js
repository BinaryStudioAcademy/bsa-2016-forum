var baseModel = require('../instances/Model');
var _ = require('underscore');

module.exports = baseModel.extend({
    url:'',
    initialize: function (options) {
        if (options && options.parentUrl) {
            this.parentUrl = options.parentUrl;
        }
    }
});
var baseModel = require('../instances/Model');

module.exports = baseModel.extend({
    urlRoot: '/users',
    initialize: function (data, options) {
        if(options)
            if(options.parentUrl) this.parentUrl = options.parentUrl;
    }
});
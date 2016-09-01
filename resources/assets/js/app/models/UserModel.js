var baseModel = require('../instances/Model');

module.exports = baseModel.extend({
    urlRoot: '/users',
    initialize: function (data, options) {
        debugger;
        if(options)
            if(options.parentUrl) this.parentUrl = options.parentUrl;
    }
});
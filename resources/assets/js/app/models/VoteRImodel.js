var BaseModel = require('../instances/Model');

module.exports = BaseModel.extend({
    urlRoot: '/voteresult',
    initialize: function (data, options) {
        if (options.parentUrl) {
            this.parentUrl = options.parentUrl;
        }
    }
});
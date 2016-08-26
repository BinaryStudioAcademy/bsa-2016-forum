var baseModel = require('../instances/Model');
var logger = require('../instances/logger');

module.exports = baseModel.extend({
    urlRoot: '/comments',

    initialize: function(options) {

    },
    
    validate: function (attrs, options) {
        //logger('validate topic comment model', attrs);

        var error = {
            message: [],
        };

        if (!attrs.content_origin.trim()) {
            error.message.push('Message cant be empty');
        }

        if (error.message.length) return error;
    }
});

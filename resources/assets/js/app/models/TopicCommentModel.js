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
            error.message = 'Message cant be empty';
        }

        return error ? error : null;
    }
});

var baseModel = require('../instances/Model');
var logger = require('../instances/logger');

module.exports = baseModel.extend({
    urlRoot: '/comments',

    validate: function (attrs, options) {
        //logger('validate topic comment model', attrs);
        var error = {
            message: [],
        };

        if (!attrs.content_origin.trim()) {
            error.message.push('Message cant be empty');
        }

        if (error.message.length) return error;
    },

    isChildComment: function() {
        return this.get('commentable_type') === "App\\Models\\Comment";
    }
});

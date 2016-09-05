var BaseModel = require('../instances/Model');
var _ = require('underscore');

module.exports = BaseModel.extend({
    urlRoot: '/comments',
    defaults: {
        rating: 0
    },
    validate: function (attrs) {
        var errors = {};
        if (!attrs.content_origin) {
            errors.content_origin = 'Write your comment';
        }

        if (!_.isEmpty(errors)) {
            return errors;
        }
    }
});
var BaseModel = require('../instances/Model');
var _ = require('underscore');

module.exports = BaseModel.extend({
    urlRoot: '/comments',
    initialize: function (options) {
        if (options.parentUrl) {
            this.parentUrl = options.parentUrl;
        }
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
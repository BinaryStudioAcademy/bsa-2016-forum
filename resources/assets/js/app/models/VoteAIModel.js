var BaseModel = require('../instances/Model');
var _ = require('underscore');

module.exports = BaseModel.extend({
    urlRoot: '/voteitems',
    initialize: function (options) {
        this.parentUrl = options.parentUrl;
    },
    validate:function (attrs) {
        var errors = {};
        if(!attrs.name || attrs.name == ' ') {
            errors['name'] = 'Write the name of vote item';
        }

        if (!_.isEmpty(errors)) {
            return errors;
        }
    }
});

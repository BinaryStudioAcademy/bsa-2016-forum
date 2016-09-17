var BaseModel = require('../instances/Model');
var _ = require('underscore');

var currentUser = require('../initializers/currentUser');

module.exports = BaseModel.extend({
    urlRoot: '/voteitems',
    validate: function (attrs) {
        var errors = {};
        if (attrs.name.trim().length == 0) {
            errors['name'] = 'Write the name of vote item';
        }

        if (!_.isEmpty(errors)) {
            return errors;
        } else this.trigger('valid');
    },
    defaults: {
        name: '',
        user_id: currentUser.get('id')
    }
});

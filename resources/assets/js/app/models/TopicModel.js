var baseModel = require('../instances/Model');
var _ = require('underscore');

module.exports = baseModel.extend({
    urlRoot: '/topics',
	idAttribute:'slug',
    validate: function (attrs) {
        var errors = {};
        if (!attrs.name) errors['name'] = 'Name is required';
        if (!attrs.description) errors['description'] = 'Description is required';
        if (!attrs.category_id) errors['category_id'] = 'Category is required';

        if (!_.isEmpty(errors)) {
            return errors;
        }
    }
});

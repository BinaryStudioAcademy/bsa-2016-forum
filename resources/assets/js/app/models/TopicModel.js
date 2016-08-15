var baseModel = require('../instances/Model');

module.exports = baseModel.extend({
    urlRoot: '/topics',
    validation: {
        name: {
            required: true,
        },
        description: {
            required: true
        }
    }
});

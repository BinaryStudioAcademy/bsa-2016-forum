var baseModel = require('../instances/Model');

module.exports = baseModel.extend({
    urlRoot: '/users',
    isAdmin: function () {
        return (this.get('role') == 'Admin')
    }
});
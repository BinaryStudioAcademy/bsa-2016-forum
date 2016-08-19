var baseModel = require('../instances/Model');

module.exports = baseModel.extend({
    url: function () {
        return 'api/v1/users/' + this.model.get('id')+'/votes';
    }
});
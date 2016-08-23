var baseModel = require('../instances/Model');

module.exports = baseModel.extend({
    url: function () {
        return 'users/' + this.model.get('id')+'/votes';
    }
});
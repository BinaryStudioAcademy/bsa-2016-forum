var baseModel = require('../instances/Model');

module.exports = baseModel.extend({
    urlRoot: '/messages',
    
    messageDirection: (this.user_from_id == 2)?'from':'to'
    
});
var baseModel = require('../instances/Model');

module.exports = baseModel.extend({
    urlRoot: '/messages',

    initialize: function() {
        this.computeAttributes();
        this.on('change', this.computeAttributes(), this);
    },

    computeAttributes: function() {
        this.set({
            messageDirection:(this.get('user_from_id') == 2)?'from':'to'
        });
    }
});
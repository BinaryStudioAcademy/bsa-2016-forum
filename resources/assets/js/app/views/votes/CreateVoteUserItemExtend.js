var userItem = require('../users/userItem');

module.exports = userItem.extend({
    moveModel: function () {
        var opposite = this.model.collection.opposite;

        this.model.collection.remove(this.model);
        opposite.add(this.model);
    },
    events: {
        'click': 'moveModel'
    }
});
var userItem = require('../users/userItem');

module.exports = userItem.extend({
    moveModel: function () {
        var accessedCollection = this.model.collection.accessedCollection;

        this.model.collection.remove(this.model);
        accessedCollection.add(this.model);
        console.log(this.model);
    },
    events: {
        'click': 'moveModel'
    }
});
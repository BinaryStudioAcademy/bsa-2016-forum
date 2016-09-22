var userItem = require('../users/userItem');

module.exports = userItem.extend({
    template: 'vote-create-edit-user-item',
    serializeData:function() {
        return {
            model: this.model.toJSON(),
            glyph: this.model.collection.glyph
        }
    },
    moveModel: function () {
        var opposite = this.model.collection.opposite;

        this.model.collection.remove(this.model);
        opposite.add(this.model);
    },
    events: {
        'click': 'moveModel'
    }
});
var userItem = require('../users/userItem');

module.exports = userItem.extend({
    template: 'vote-create-edit-user-item',

    modelEvents: {
        'change': 'render'
    },

    serializeData:function() {
        meta = this.model.collection.getMeta();
        metaOpposite = this.model.collection.opposite.getMeta();
        if (meta.urlBaseAvatar){
            urlBaseAvatar = meta.urlBaseAvatar;
        } else if (metaOpposite.urlBaseAvatar) {
            urlBaseAvatar = metaOpposite.urlBaseAvatar;
        }
        return {
            model: this.model.toJSON(),
            glyph: this.model.collection.glyph,
            urlBaseAvatar : urlBaseAvatar
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
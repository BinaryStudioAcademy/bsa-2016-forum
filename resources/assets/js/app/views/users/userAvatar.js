
var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: 'userAvatar',
    tagName: 'div',
    class: 'users-item-avatar',

    modelEvents: {
        'change': 'render'
    },

    serializeData: function () {
        var tempmeta = this.model.getMeta();
        var meta = {
            user: {}
        };
        if (tempmeta) {
            var id = this.model.get('id');
            meta = {
                user: tempmeta[id].user
            }
        }
        console.log(meta);
        return {
            model: this.model.toJSON(),
            meta: meta
        };
    }
});
var Marionette = require('backbone.marionette');
var app = require('../../instances/appInstance');

module.exports = Marionette.ItemView.extend({
    template: 'voteItem',
    events: {
        'click': function () {
            app.getInstance().trigger('show:vote', this.model.get('id'));
        }
    },
    serializeData: function () {
        var tempmeta = this.model.getMeta();
        var id = this.model.get('id');
        return {
            model: this.model.toJSON(),
            meta: {
                user: tempmeta.user[id],
                likes: tempmeta.likes[id],
                comments: tempmeta.comments[id]
            }
        };
    }
});
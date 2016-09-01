var Marionette = require('backbone.marionette');
var Backbone = require('backbone');

module.exports = Marionette.ItemView.extend({
    template: 'voteItem',
    ui: {
        label: '#label',
        deleteButton: '.voteitem-delete-button'
    },
    events: {
        'click @ui.label': function () {
            Backbone.history.navigate('votes/' + this.model.get('id'), {trigger: true});
        },
        'click @ui.deleteButton': function (e) {
            e.preventDefault();
            this.model.destroy();
        }
    },
    serializeData: function () {
        var tempmeta = this.model.getMeta();
        var id = this.model.get('id');
        return {
            model: this.model.toJSON(),
            meta: {
                user: tempmeta[id].user,
                likes: tempmeta[id].likes,
                comments: tempmeta[id].comments,
                tags: tempmeta[id].tags
            }
        };
    },
    remove: function () {
        this.$el.fadeOut();
    }
});
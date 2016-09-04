var Marionette = require('backbone.marionette');
var Backbone = require('backbone');

module.exports = Marionette.ItemView.extend({
    template: 'voteHeader',
    tagName: 'div',
    className: 'vote-head',
    modelEvents: {
        'change': 'render'
    },
    ui: {
        deleteButton: '.delete-button'
    },
    events: {
        'click @ui.deleteButton': function () {
            this.model.destroy({success: function () {
                Backbone.history.navigate('votes', {trigger: true});
            }});
        }
    },
    serializeData: function () {
        var tempmeta = this.model.getMeta();
        var meta = {
            user: {},
            likes: {},
            comments: {},
            tags: {}
        };
        if (tempmeta) {
            var id = this.model.get('id');
            meta = {
                user: tempmeta[id].user,
                likes: tempmeta[id].likes,
                comments: tempmeta[id].comments,
                tags: tempmeta[id].tags,
                deletable: tempmeta[id].deletable
            }
        }

        return {
            model: this.model.toJSON(),
            meta: meta
        };
    }
});
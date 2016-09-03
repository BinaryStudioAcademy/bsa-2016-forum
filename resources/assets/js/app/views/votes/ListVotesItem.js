var Marionette = require('backbone.marionette');
var Backbone = require('backbone');

module.exports = Marionette.ItemView.extend({
    template: 'voteItem',
    ui: {
        label: '#label'
    },
    events: {
        'click @ui.label': function () {
            Backbone.history.navigate('votes/' + this.model.get('id'), {trigger: true});
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

    }
});
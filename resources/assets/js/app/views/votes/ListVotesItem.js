var Marionette = require('backbone.marionette');
var app = require('../../instances/appInstance');
var Radio = require('backbone.radio');

module.exports = Marionette.ItemView.extend({
    template: 'voteItem',
    ui: {
        label: '#label'
    },
    events: {
        'click @ui.label': function () {
            Radio.trigger('votesChannel', 'showVote', this.model.get('id'));
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
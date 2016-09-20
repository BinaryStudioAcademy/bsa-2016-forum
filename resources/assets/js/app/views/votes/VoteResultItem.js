var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');

module.exports = Marionette.ItemView.extend({
    template: 'voteResultItem',

    initialize: function (options) {
        this.vote = this.model.getMeta().vote;
    },
    serializeData: function () {
        var tempmeta = this.model.getMeta();
        var votePercent = 0;
        if (tempmeta.users.count && tempmeta.users[this.model.get('id')].length) {
            votePercent = Math.floor(100 * tempmeta.users[this.model.get('id')].length / tempmeta.users.count);
        }
        return {
            model: this.model.toJSON(),
            meta: {
                checked: tempmeta.checked[this.model.get('id')],
                vote: tempmeta.vote,
                users: tempmeta.users[this.model.get('id')]
            },
            isPublic: this.options.isPublic,
            // percentage
            votePercent: votePercent
        };
    },
});
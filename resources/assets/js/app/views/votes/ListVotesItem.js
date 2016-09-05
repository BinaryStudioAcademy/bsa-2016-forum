var Marionette = require('backbone.marionette');
var Backbone = require('backbone');
var dateHelper = require('../../helpers/dateHelper');

module.exports = Marionette.ItemView.extend({
    template: 'voteItem',
    ui: {
        label: '#label',
        deleteButton: '.delete-button'
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
            createdDate: dateHelper.fullDate(this.model.get('created_at')),
            meta: {
                user: tempmeta[id].user,
                likes: tempmeta[id].likes,
                comments: tempmeta[id].comments,
                tags: tempmeta[id].tags,
                deletable: tempmeta[id].deletable,
                days_ago:tempmeta[id].days_ago
            }
        };
    },
    remove: function () {
        this.$el.fadeOut();
    }
});
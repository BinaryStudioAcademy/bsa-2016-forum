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
        var data = this.model.toJSON();
        data._meta = this.model.getMeta();

        return data;
    }
});
var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: 'navigationItem',
    tagName: 'li',

    modelEvents: {
        'change:active': 'setActive'
    },

    initialize: function (options) {
        this.setActive();
    },

    setActive: function () {
        if (this.model.get('active')) {
            this.$el.addClass('active');
        } else {
            this.$el.removeClass('active');
        }
    }
});
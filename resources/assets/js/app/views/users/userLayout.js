var Marionette = require('backbone.marionette');
var UsersView = require('./userCollection');

module.exports = Marionette.LayoutView.extend({
    template: 'userLayout',
    regions: {
        container: '#users'
    },

    onRender: function () {
        this.container.show(new UsersView({
            collection: this.collection
        }));
    }
});
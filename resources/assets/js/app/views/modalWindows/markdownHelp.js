var Marionette = require('backbone.marionette');
var currentUser = require('../../initializers/currentUser');
var app = require('../../instances/appInstance');

module.exports = Marionette.ItemView.extend({
    template: 'markdownHelp',
    
    show: function () {
        this.$('.modal').modal('show');
    },
    onRender: function() {
        this.$('.modal').modal('show');
}
    
});

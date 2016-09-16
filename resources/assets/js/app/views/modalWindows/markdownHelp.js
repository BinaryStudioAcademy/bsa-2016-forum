var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: 'markdownHelp',
    
    show: function () {
        this.$('.modal').modal('show');
    },
    onRender: function() {
        this.$('.modal').modal('show');
}
    
});

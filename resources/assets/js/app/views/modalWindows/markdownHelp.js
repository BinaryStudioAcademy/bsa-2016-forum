var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: 'markdownHelp',
    
    onRender: function() {
        this.$('.modal').modal('show');
}
    
});

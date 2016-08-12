var Marionette = require('backbone.marionette');

module.exports = Marionette.LayoutView.extend({
    template: '#voteCollection.tpl',
    ui: {
    
    },
    events: {

    },
    regions: {
        items: '#vote-items'
    }
});
var Marionette = require('backbone.marionette');

var RootLayoutView = Marionette.LayoutView.extend({
    el: 'body',
    regions: {
        main: '#main'
    }
});

module.exports = RootLayoutView;
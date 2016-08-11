var Marionette = require('backbone.marionette');

var RootView = Marionette.LayoutView.extend({
    el: 'body',
    regions: {
        content: '#content',
        header: '#header',
        navigationMenu: '#navigationMenu'
    }
});

module.exports = RootView;
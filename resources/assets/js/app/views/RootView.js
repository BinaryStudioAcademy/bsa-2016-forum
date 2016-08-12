var Marionette = require('backbone.marionette');

var RootView = Marionette.LayoutView.extend({
    el: 'body',
    //template: '#root.tpl',
    regions: {
        content: '#content',
        header: '#header',
        navigationMenu: '#navigationMenu',
        breadCrumbs: '#breadcrumbs'
    }
});

module.exports = RootView;
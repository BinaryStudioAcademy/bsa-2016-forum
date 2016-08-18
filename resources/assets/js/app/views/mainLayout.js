var Marionette = require('backbone.marionette');
var headerView = require('../views/headers/Header');
var navigationLayoutView = require('./headers/navigationLayout');

var mainLayoutView = Marionette.LayoutView.extend({
    el: 'body',
    template: 'mainLayout',
    regions: {
        header: '#header',
        navigationMenu: '#navigationMenu',
        content: '#main-content',
        breadCrumbs: '#breadcrumbs'
    },

    initialize: function () {

    },

    onRender: function () {
        //console.log('main layout render');
    },

    showRegions: function () {
        this.getRegion('header').show(new headerView());
        this.getRegion('navigationMenu').show(new navigationLayoutView({
            collection: this.collection
        }));
    }

});

module.exports = mainLayoutView;
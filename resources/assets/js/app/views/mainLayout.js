var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');
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
    ui: {
        spinner: '#spinner'
    },

    initialize: function () {
        this.listenTo(Radio.channel('spinnerChannel'), 'show', function () {
            this.ui.spinner.fadeIn(100);
        });

        this.listenTo(Radio.channel('spinnerChannel'), 'hide', function () {
            this.ui.spinner.fadeOut(100);
        });
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
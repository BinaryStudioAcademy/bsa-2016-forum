var Marionette = require('backbone.marionette');
var headerView = require('../views/headers/Header');
var navigationView = require('../views/headers/navigationMenu.');

var mainLayoutView = Marionette.LayoutView.extend({
  el: 'body',
  template: '#mainLayout.tpl',
  regions: {
      header: '#header',
      navigationMenu: '#navigationMenu',
      content: '#main-content',
      breadCrumbs: '#breadcrumbs'
  },

  initialize: function() {
    //Radio.channel('root').comply('set:content',function(contentView) {
    //    this.getRegion('content').show(contentView);
    //});
  },

  showRegions: function() {
    this.getRegion('header').show(new headerView());
    this.getRegion('navigationMenu').show(new navigationView());
  }

});

module.exports = mainLayoutView;
Marionette = require('backbone.marionette');
Handlebars = require('handlebars');
templates = require('../templates.js')(Handlebars);

var RootView = Marionette.LayoutView.extend({
    el: 'body'
});

var rw = new RootView();

rw.addRegions({
    main: '#content',
    header: '#header'
});

module.exports = rw;
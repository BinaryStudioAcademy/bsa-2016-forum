var Marionette = require('backbone.marionette');
var Handlebars = require('handlebars');

var RootView = Marionette.LayoutView.extend({
    el: 'body'
});

var rw = new RootView();

rw.addRegions({
    content: '#content',
    header: '#header',
    subheader: '#subheader'
});

module.exports = rw;
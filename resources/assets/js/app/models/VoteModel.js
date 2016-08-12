var Backbone = require('backbone');
var app = require('../../app');

module.exports = Backbone.Model.extend({
    urlRoot: app.getInstance().config['baseUrl'] + 'vote',
    defaults: {
        
    }
});
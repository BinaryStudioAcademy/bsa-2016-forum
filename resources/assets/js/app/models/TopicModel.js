var Backbone = require('backbone');

var Topic = Backbone.Model.extend({
    urlRoot: '/topics'
});

module.exports = Topic;
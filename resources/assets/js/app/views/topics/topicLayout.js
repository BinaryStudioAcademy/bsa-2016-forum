var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var app = require('../../instances/appInstance');
var logger = require('../../instances/logger');
var topicCollection = require('./topicCollection');

module.exports = Marionette.LayoutView.extend({
    template: 'topicLayout',
    regions: {
        container: '#posts'
    },

    events: {
        'scroll': 'loadMoreTopics'
    },

    loadMoreTopics: function(){
        var totalHeight = this.$('> div').height(),
            scrollTop = this.$el.scrollTop() + this.$el.height(),
            margin = 200;

        // if we are closer than 'margin' to the end of the content, load more topics
        if (scrollTop + margin >= totalHeight) {
            MyApp.vent.trigger("search:more");
        }
    },

    onRender: function () {
        this.container.show(new topicCollection({
            collection: this.collection
        }));
    }
});

var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var app = require('../../instances/appInstance');
var logger = require('../../instances/logger');
var topicCollection = require('./topicCollection');
var InfiniScroll = require('../../../../js/vendor/infiniScroll');
var _ = require('underscore');

module.exports = Marionette.LayoutView.extend({
    template: 'topicLayout',
    regions: {
        container: '#posts'
    },

    // initialize: function(){
    //     this.infiniScroll = new InfiniScroll(this.collection, {success: this.appendRender});
    // },

    // remove: function() {
    //     this.infiniScroll.destroy();
    //     return Backbone.View.prototype.remove.call(this);
    // },

    events: {
        'scroll': 'loadMoreTopics'
    },

    loadMoreTopics: function(){
 
    },

    onRender: function () {
        this.infiniScroll = new InfiniScroll(this.collection, {success: this.appendRender});
        this.container.show(new topicCollection({
            collection: this.collection
        }));
    }
});

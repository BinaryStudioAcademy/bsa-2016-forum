var Marionette = require('backbone.marionette');
var Backbone = require('backbone');
var CommentsCollection = require('../../collections/CommentsCollection');
var CommentsCollectionView = require('../comments/CommentsCollection');
var _ = require('underscore');

module.exports = Marionette.LayoutView.extend({

    template: 'topicDetail',

    regions: {
        'commentsContainer': '.topic-comments'
    },

    initialize: function(options) {
    },

    onRender: function () {
        var collection = new CommentsCollection();
        collection.parentUrl = _.result(this.model, 'url');

        collection.fetch({ success: function() {},
            error: function (response) {
                console.error(response.responseText);
            }
        });

        this.getRegion('commentsContainer').show(new CommentsCollectionView({
          collection: collection
        }))
    }
});
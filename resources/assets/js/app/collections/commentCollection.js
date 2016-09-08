var BaseCollection = require('../instances/Collection');
var model = require('../models/CommentModel');

module.exports = BaseCollection.extend({
    model: model,
    url: '/comments',
    initialize: function (models, options) {
        if (options.parentUrl) {
            this.parentUrl = options.parentUrl;
        }
    }
});
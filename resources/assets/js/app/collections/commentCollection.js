var BaseCollection = require('../instances/Collection');
var model = require('../models/CommentModel');

module.exports = BaseCollection.extend({
    model: model,
    url: '/comments',
    initialize: function (options) {
        if (options) {
            console.log(options);
            console.log(options.parentUrl);
            this.parentUrl = options.parentUrl;
        }
    }
});
var BaseCollection = require('../instances/Collection');
var model = require('../models/CommentModel');

module.exports = BaseCollection.extend({
    model: model,
    url: '/comments',
    initialize: function (options) {
        if (options) {
            this.parentUrl = options.parentUrl;
        }
    },
    comparator: function (model) {
        return -model.get("id"); // Note the minus!
    }
});
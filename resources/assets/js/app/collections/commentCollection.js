var BaseCollection = require('../instances/Collection');
var model = require('../models/CommentModel');

module.exports = BaseCollection.extend({
    model: model,
    url: '/comments',
    comparator: function (model) {
        return -model.get("id");
        }
});
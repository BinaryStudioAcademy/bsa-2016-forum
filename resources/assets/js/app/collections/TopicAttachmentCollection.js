var BaseCollection = require('../instances/Collection');
var TopicAttachmentModel = require('../models/TopicAttachmentModel');

module.exports = BaseCollection.extend({
    model: TopicAttachmentModel
});


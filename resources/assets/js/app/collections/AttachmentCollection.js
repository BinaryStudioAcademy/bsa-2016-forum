var BaseCollection = require('../instances/Collection');
var TopicAttachmentModel = require('../models/AttachmentModel');

module.exports = BaseCollection.extend({
    url: '/attachments',
    model: TopicAttachmentModel
});


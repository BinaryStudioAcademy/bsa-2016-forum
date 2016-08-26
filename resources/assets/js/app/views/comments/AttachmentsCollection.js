var Marionette = require('backbone.marionette');
var AttachmentItem = require('./AttachmentItem');
var logger = require('../../instances/logger');
var Radio = require('backbone.radio');

module.exports = Marionette.CollectionView.extend({
    childView: AttachmentItem,

    initialize: function () {
        this.listenTo(Radio.channel('attachment'), 'addAttachmentModel', this.addAttachmentModel);
    },

    addAttachmentModel: function (model) {
        this.collection.add(model);
    },

    collectionEvents: {
        'change': 'render',
        'sync': 'render',
        'add': 'render'
    },

    onRender: function () {

    }
});

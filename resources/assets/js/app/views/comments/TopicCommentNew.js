var Marionette = require('backbone.marionette');
var logger = require('../../instances/logger');
var _ = require('underscore');
var Radio = require('backbone.radio');
var Dropzone = require('dropzone');

module.exports = Marionette.ItemView.extend({
    template: 'TopicCommentNew',
    _dropZone: null,

    ui: {
        'attach': '.topic-attachment button',
        'submit': '#submit',
        'close': '.close-btn button'
    },

    events: {
        'click @ui.attach': 'attachFile',
        'click @ui.submit': 'submitComment',
        'click @ui.close': 'close'
    },

    initialize: function (options) {
        this._topicModel = options.topicModel;
    },

    close: function (event) {
        this.remove();
    },

    attachFile: function (event) {
        if (this.$('.dropzone-container').hasClass('hidden')) {
            this.$('.dropzone-container').removeClass('hidden')
        } else {
            this.$('.dropzone-container').addClass('hidden')
        }
    },

    submitComment: function (event) {
        event.preventDefault();

        var data = {
            user_id: 2,
        };

        _.each(this.$('form').serializeArray(), function(input) {
            data[ input.name ] = input.value;
        });

        this.model.set(data);
        
        var parent = this;

        this.model.save({}, {
            success: function (model) {
                logger('comment saved successfully');

                if (parent._dropZone && parent._dropZone.files) {

                    model.parentUrl = '';

                    parent._dropZone.options.url = model.getEntityUrl() + '/attachments';

                    console.log(parent._dropZone.options.url);

                    parent._dropZone.processQueue();
                }

                Radio.channel('newComment').trigger('addCommentModel', data);
            },

            error: function (response) {
                console.error(response.responseText);
            }
        });
    },

    initDropZone: function () {
        this._dropZone = new Dropzone(this.$('#drop')[0], {

            url: '/comments',
            method: 'post',

            init: function () {

            },

            parallelUploads : 10,
            autoProcessQueue : false,
            uploadMultiple: false,
            addRemoveLinks: true,

            sending: function(file, xhr, formData) {
                //console.log(xhr, formData, 'sending');
            },

            error: function (xhr) {
                console.error('error');
            },

            success: function (data, xhr) {
                console.log('success', data);
            },
        });
    },

    onRender: function () {
        this.initDropZone();
    }
});
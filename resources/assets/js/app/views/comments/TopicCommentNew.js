var Marionette = require('backbone.marionette');
var logger = require('../../instances/logger');
var _ = require('underscore');
var Radio = require('backbone.radio');
var Dropzone = require('dropzone');

module.exports = Marionette.ItemView.extend({
    template: 'TopicCommentNew',
    _dropZone: null,
    className: 'topic-comment-item',

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

    showLoader: function (show) {
        return show ? this.$('.topic-control-add .loader')
            .removeClass('hidden') : this.$('.topic-control-add .loader').addClass('hidden');
    },

    submitComment: function (event) {
        event.preventDefault();

        var data = {
            // user id from server is default
            user_id: 2,
        };

        _.each(this.$('form').serializeArray(), function(input) {
            data[ input.name ] = input.value;
        });

        this.model.set(data);

        var parent = this;

        if (this.model.isValid()) {
            this.showLoader(true);
            this.model.save({}, {
                success: function (model) {
                    //logger('comment saved successfully');

                    if (parent._dropZone && parent._dropZone.files.length) {
                        parent._dropZone.processQueue();
                    } else {
                        Radio.channel('newComment').trigger('addCommentModel', model);
                        parent.remove();
                    }
                },

                error: function (response) {
                    console.error(response.responseText);
                }
            });
        }
    },

    initDropZone: function () {
        var parent = this;
        var model = this.model;

        this._dropZone = new Dropzone(this.$('#drop')[0], {

            url: function(file) {
                return model.getSelfUrl() + '/attachments';
            },

            method: 'post',
            // input file name, registered on server
            paramName: "f",
            parallelUploads : 10,
            autoProcessQueue : false,
            uploadMultiple: false,
            addRemoveLinks: true,

            init: function () {

            },

            sending: function(file, xhr, formData) {
                // triggered on each file
                //console.log(xhr, formData, 'sending');
            },

            error: function (xhr) {
                console.error('error');
            },

            success: function (file, xhr) {
                logger(file);
                //Radio.channel('attachment').trigger('addAttachmentModel', file);
            },

            complete: function(file) {
                if (file.status !== 'canceled') {
                    this.removeFile(file);
                }
            },

            // file canceled to upload
            canceled: function(file) {

            },

            // event triggers when all files has been uploaded
            queuecomplete: function () {
                parent.remove();
                Radio.channel('newComment').trigger('addCommentModel', model);
            }
        });
    },

    onRender: function () {
        this.initDropZone();
    }
});
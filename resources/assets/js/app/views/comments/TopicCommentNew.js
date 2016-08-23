var Marionette = require('backbone.marionette');
var logger = require('../../instances/logger');
var _ = require('underscore');
var Radio = require('backbone.radio');
var Dropzone = require('dropzone');
var currentUser = require('../../initializers/currentUser');

module.exports = Marionette.ItemView.extend({
    template: 'TopicCommentNew',
    _dropZone: null,
    _files: [],
    className: 'topic-comment-item',

    ui: {
        'attach': '.topic-attachment button',
        'submit': '#submit',
        'close': '.close-btn button'
    },

    modelEvents: {
        'invalid': function (model, errors, options) {
            //logger('model is invalid', errors, options);
            this.showLoader(false);
            this.$('.errors').empty();
            errors.message.forEach(function (message, i) {
                logger(message);
                this.$('.errors').append(message);
            });
            this.showErrors(true);
        }
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
        var dropz = this.$('.dropzone-container');

        if (dropz.hasClass('hidden')) {
            dropz.removeClass('hidden');
        } else {
            dropz.addClass('hidden');
        }
    },

    showLoader: function (show) {
        return show ? this.$('.topic-control-add .loader')
            .removeClass('hidden') : this.$('.topic-control-add .loader').addClass('hidden');
    },

    showErrors: function (show) {
        return show ? this.$('.errors')
            .removeClass('hidden') : this.$('.errors').addClass('hidden');
    },

    submitComment: function (event) {
        event.preventDefault();
        this.showErrors(false);

        var data = {
            user_id: currentUser.get('id'),
        };

        _.each(this.$('form').serializeArray(), function(input) {
            data[ input.name ] = input.value;
        });

        //this.model.set(data);
        var parent = this;
        this.showLoader(true);
        this.model.save(data, {
            success: function (model) {
                logger('comment saved successfully');

                //console.log(model, model.getMeta());

                if (parent._dropZone && parent._dropZone.files.length) {
                    parent._dropZone.processQueue();
                } else {
                    Radio.channel('сommentCollection').trigger('addComment', model);
                    parent.remove();
                }
            },

            error: function (response) {
                console.error(response.responseText);
            }
        });
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
                xhr.data ? parent._files.push(xhr.data) : '';

                //logger(file, model);
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
                model.getMeta()[model.get('id')].attachments = parent._files;
                Radio.channel('сommentCollection').trigger('addComment', model);
                parent._files = [];
            }
        });
    },

    onRender: function () {
        this.initDropZone();
    }
});
var Marionette = require('backbone.marionette');
var logger = require('../../instances/logger');
var _ = require('underscore');
var Radio = require('backbone.radio');
var Dropzone = require('dropzone');
var currentUser = require('../../initializers/currentUser');
var AttachmentModel = require('../../models/AttachmentModel');

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

        var parent = this;
        this.showLoader(true);
        this.model.save(data, {
            success: function (model) {
                logger('comment saved successfully');
                if (parent._dropZone && parent._dropZone.files.length) {
                    parent.filterAttachs();
                    // start upload to server
                    parent._dropZone.processQueue();
                } else {
                    Radio.channel('сommentCollection').trigger('addComment', model);
                    parent.remove();
                }
            },

            error: function (response) {
                parent.showErrors(true);
                parent.$('.errors').empty().append(response.responseText);
            }
        });
    },

    initDropZone: function () {
        var parent = this;
        this._dropZone = new Dropzone(this.$('#drop')[0], {
            url: function(file) {
                return parent.model.getSelfUrl() + '/attachments';
            },
            method: 'post',
            // input file name, registered on server
            paramName: "f",
            parallelUploads : 10,
            autoProcessQueue : false,
            uploadMultiple: false,
            addRemoveLinks: true,
            acceptedFiles: 'image/*,.pdf,.docx,.doc,.xlsx,.xls',
            error: function (xhr) {
                parent.showErrors(true);
                parent.$('.errors').append(xhr.responseText);
            },
            success: function (file, xhr) {
                if (xhr.data) {
                    parent._files.push(xhr.data);
                    //logger('success', file;
                }
            },
            // file canceled to upload
            canceled: function(file) {

            },
            removedfile: function (file) {
                if (file.id) {
                    parent.removeAttachmentFromServer(file);
                } else {
                    parent.$(file.previewElement).remove();
                }
            },
            // event triggers when all files has been uploaded
            queuecomplete: function () {
                parent.setModelAttachments();
                parent.remove();
            }
        });

        this.showAttachments();
    },

    filterAttachs: function() {
        // remove from dropzone some files, that already has uploaded to server
        this._dropZone.files.filter(function (file) {
            return file.id == true;
        });
    },

    setModelAttachments: function () {
        // add attachments to model meta
        var id = this.model.get('id');
        var parent = this;
        // if model has attachments we must push new to it
        if (this._files.length) {
            this._files.forEach(function (file, i) {
                parent.model.getMeta()[id].attachments.push(file);
                // add file to attachment collection
                //parent.options.attachs.add(new AttachmentModel(file));
            });
        }

        Radio.channel('сommentCollection').trigger('addComment', this.model);

        this._files = [];
    },

    removeAttachmentFromServer: function (file) {
        // remove single file from server
        var model = new AttachmentModel({ id: file.id });
        var parent = this;
        model.parentUrl = _.result(this.model, 'url');
        //console.log(model);
        model.destroy({ success: function (model) {
            parent.options.attachs.remove({ id: file.id });
            parent.$(file.previewElement).remove();
            parent.$('.errors').removeClass('alert-danger')
                .addClass('alert-info').text('File was successfully removed');
            parent.showErrors(true);
        }, error: function (response) {
            this.$('.errors').empty();
            this.$('.errors').text(response.responseText);
            parent.showErrors(true);
        }});
    },

    showAttachments: function () {
        // if comment already has attachments they will be show
        var id = this.model.get('id');
        if (!id) return;
        //var attachs = this.options.attachs.toJSON();
        var attachs = this.model.getMeta()[id].attachments;
        var drop = this._dropZone;
        if (attachs.length) {
            attachs.forEach(function (file, i) {
                var mockFile = {
                    name: file.cloud_public_id,
                    type: file.type,
                    id: file.id
                };
                drop.emit("addedfile", mockFile);
                drop.emit("thumbnail", mockFile, file.url);
            });
        }
        //drop.options.maxFiles = drop.options.maxFiles - attachs.length;
    },

    onRender: function () {
        this.initDropZone();
    }
});
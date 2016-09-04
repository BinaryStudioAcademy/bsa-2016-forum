var Marionette = require('backbone.marionette');
var logger = require('../../instances/logger');
var _ = require('underscore');
var Radio = require('backbone.radio');
var Dropzone = require('dropzone');
var currentUser = require('../../initializers/currentUser');
var AttachmentModel = require('../../models/AttachmentModel');
var App = require('../../instances/appInstance');
var config = require('config');

module.exports = Marionette.ItemView.extend({
    template: 'TopicCommentNew',
    _dropZone: null,
    _files: [],

    ui: {
        'submit': '#submit',
        'close': '.close',
        'errors': '.errors',
        'loader': '.loader',
        'commentDlg': '#commentdlg'
    },

    modelEvents: {
        'invalid': function (model, errors, options) {
            //logger('model is invalid', errors, options);
            this.showLoader(false);
            var ui = this.ui;
            ui.errors.empty();
            errors.message.forEach(function (message, i) {
                ui.errors.append(message);
            });
            this.showErrors(true);
        },
    },

    events: {
        'click @ui.submit': 'submitComment',
    },

    showLoader: function (show) {
        return this.ui.loader.toggleClass('hidden', !show);
    },

    showErrors: function (show) {
        return this.ui.errors.toggleClass('hidden', !show);
    },

    submitComment: function (event) {
        event.preventDefault();

        this.showErrors(false);
        this.showLoader(true);

        var user_id = currentUser.toJSON().id;

        var data = {
            user_id: user_id
        };

        _.each(this.$('form').serializeArray(), function(input) {
            data[ input.name ] = input.value;
        });

        var view = this;

        this.model.save(data, {
            success: function (model) {
                if (view._dropZone && view._dropZone.files.length) {
                    // start upload to server
                    view._dropZone.processQueue();
                }
                Radio.channel('сommentCollection').trigger('addComment', model);
                view.ui.commentDlg.modal('hide');
            },

            error: function (model, response) {
                view.showErrors(true);
                view.showLoader(false);
                view.ui.errors.empty().append(response.responseText);
            },
        });
    },

    initDropZone: function () {
        var view = this;
        var attachModel = new AttachmentModel();
        this._dropZone = new Dropzone(this.$('#drop')[0], {
            url: function(file) {
                return App.getBaseUrl() + _.result(view.model, 'url') + _.result(attachModel, 'url');
            },
            method: 'post',
            // input file name, registered on server
            paramName: "f",
            hiddenInputContainer: '#drop',
            autoProcessQueue : false,
            parallelUploads : config.parallelFileUploads,
            maxFilesize: config.maxFileSize,
            maxFiles: config.maxFiles,
            //if max files count
            maxfilesexceeded: function (file) {
                this.removeFile(file);
                view.ui.errors.text('Max files is 5');
            },
            uploadMultiple: false,
            addRemoveLinks: true,
            acceptedFiles: 'image/*,.pdf,.docx,.doc,.xlsx,.xls',
            error: function (xhr) {
                view.showErrors(true);
                view.ui.errors.append(xhr.responseText);
            },
            success: function (file, xhr) {
                if (xhr.data) {
                    view._files.push(xhr.data);
                }
            },
            removedfile: function (file) {
                if (file.id) {
                    view.$(file.previewElement).remove();
                    view.$('.dz-message').hide();
                    view.removeAttachmentFromServer(file);
                } else {
                    view.$(file.previewElement).remove();
                }
            },
            // event triggers when all files has been uploaded
            queuecomplete: function () {
                view.setModelWithAttachments();
            }
        });

        this.showAttachments();
    },

    setModelWithAttachments: function () {
        // add attachments to model meta
        var id = this.model.get('id');
        var view = this;

        // if model has attachments we must push new to it
        if (this._files.length) {
            this._files.forEach(function (file, i) {
                view.model.getMeta()[id].attachments.push(file);
            });
        }

        this._files.splice(0, this._files.length);
        this.model.trigger('change');
    },

    removeAttachmentFromServer: function (file) {
        // remove single file from server
        this.showLoader(true);
        var model = new AttachmentModel({ id: file.id });
        var view = this;
        model.parentUrl = _.result(this.model, 'url');
        model.destroy({
            success: function () {
                view.showLoader(false);
                view.ui.errors.text('File was successfully removed');
                view.showErrors(true);
                view.destroyAttachsFromMeta(file.id);
                view.model.trigger('change');
            },

            error: function (response) {
                view.showLoader(false);
                view.ui.errors.empty();
                view.ui.errors.text(response.responseText);
                view.showErrors(true);
            },
        });
    },

    destroyAttachsFromMeta: function (id) {
        var attachs = this.model.getMeta()[this.model.get('id')].attachments.filter(function (file) {
            return file.id !== id;
        });

        this.model.getMeta()[this.model.get('id')].attachments = attachs;
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
        this._dropZone.options.maxFiles = this._dropZone.options.maxFiles - attachs.length;
    },

    onShow: function() {
        this.initDropZone();
        this.ui.commentDlg.modal('show');
        this.ui.commentDlg.on('hidden.bs.modal', function (e) {
            this.remove();
        }.bind(this));
    },
});
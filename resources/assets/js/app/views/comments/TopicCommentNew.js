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
        return (show ? this.ui.loader.removeClass('hidden') : this.ui.loader.addClass('hidden'));
    },

    showErrors: function (show) {
        return (show ? this.ui.errors.removeClass('hidden') : this.ui.errors.addClass('hidden'));
    },

    submitComment: function (event) {
        event.preventDefault();

        this.showErrors(false);
        this.showLoader(true);

        var data = {
            user_id: currentUser.get('id'),
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
                } else {
                    Radio.channel('сommentCollection').trigger('addComment', model);
                }
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
        this._dropZone = new Dropzone(this.$('#drop')[0], {
            url: function(file) {
                return view.model.getSelfUrl() + '/attachments';
            },
            method: 'post',
            // input file name, registered on server
            paramName: "f",
            //parallelUploads : 10,
            hiddenInputContainer: '#drop',
            autoProcessQueue : false,
            uploadMultiple: false,
            addRemoveLinks: true,
            acceptedFiles: 'image/*,.pdf,.docx,.doc,.xlsx,.xls',
            error: function (xhr) {
                view.showErrors(true);
                view.ui.errors.append(xhr.responseText);
            },
            success: function (file, xhr) {
                if (xhr.data) {
                    if (!view.fileIsUploadedToDropZone(xhr.data.id)) view._files.push(xhr.data);
                }
            },
            removedfile: function (file) {
                if (file.id) {
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

    fileIsUploadedToDropZone: function (id) {
        var res = false;
        this._files.forEach(function (item, i) {
            if (item.id == id) res = true;
        });
        return res;
    },

    setModelWithAttachments: function () {
        // add attachments to model meta
        var id = this.model.get('id');
        var view = this;
        var a = view.model.getMeta()[id].attachments;

        // if model has attachments we must push new to it
        if (this._files.length) {
            this._files.forEach(function (file, i) {
                view.model.getMeta()[id].attachments.push(file);
            });
        }

        Radio.channel('сommentCollection').trigger('addComment', this.model);

        this._files = [];
    },

    removeAttachmentFromServer: function (file) {
        // remove single file from server
        this.showLoader(true);
        var model = new AttachmentModel({ id: file.id });
        this.destroyAttachsFromMeta(file.id);
        var view = this;
        model.parentUrl = _.result(this.model, 'url');
        model.destroy({
            success: function (model) {
                view.$(file.previewElement).remove();
                view.showLoader(false);
                view.ui.errors.removeClass('alert-danger').addClass('alert-info').text('File was successfully removed');
                view.showErrors(true);
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
    },

    onShow: function() {
        this.initDropZone();
        this.ui.commentDlg.modal('show');
        var view = this;
        view.ui.commentDlg.on('hidden.bs.modal', function (e) {
            view.remove();
        });
    },
});
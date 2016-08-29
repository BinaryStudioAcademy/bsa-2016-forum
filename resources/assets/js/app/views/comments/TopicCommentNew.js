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
                //logger('comment saved successfully');
                if (parent._dropZone && parent._dropZone.files.length) {
                    parent.filterAttachs();
                    // start upload to server
                    parent._dropZone.processQueue();
                } else {
                    parent.ui.commentDlg.modal('hide');
                    Radio.channel('сommentCollection').trigger('addComment', model);
                }
            },

            error: function (response) {
                parent.showErrors(true);
                parent.ui.errors.empty().append(response.responseText);
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
                parent.ui.errors.append(xhr.responseText);
            },
            success: function (file, xhr) {
                if (xhr.data) {
                    parent._files.push(xhr.data);
                }
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
                parent.ui.commentDlg.modal('hide');
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
        // remove bootstrap modal overlay from body
        $('.modal-backdrop').remove();
        Radio.channel('сommentCollection').trigger('addComment', this.model);
        this._files = [];
    },

    removeAttachmentFromServer: function (file) {
        // remove single file from server
        this.showLoader(true);
        var model = new AttachmentModel({ id: file.id });
        var parent = this;
        model.parentUrl = _.result(this.model, 'url');
        //console.log(model);
        model.destroy({ success: function (model) {
            parent.showLoader(false);
            if (parent.options.attachs) parent.options.attachs.remove({ id: file.id });
            parent.$(file.previewElement).remove();
            parent.ui.errors.removeClass('alert-danger')
                .addClass('alert-info').text('File was successfully removed');
            parent.showErrors(true);
        }, error: function (response) {
            parent.showLoader(false);
            parent.ui.errors.empty();
            parent.ui.errors.text(response.responseText);
            parent.showErrors(true);
        }});
    },

    showAttachments: function () {
        // if comment already has attachments they will be show
        var id = this.model.get('id');
        if (!id) return;
        var attachs = this.options.attachs.toJSON();
        //var attachs = this.model.getMeta()[id].attachments;
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
    
    onShow: function () {
        this.ui.commentDlg.modal('show');

        var view = this;
        view.ui.commentDlg.on('hidden.bs.modal', function (e) {
            view.remove();
        });

        this.initDropZone();

        return this;
    }
});
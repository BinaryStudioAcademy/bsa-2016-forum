var Marionette = require('backbone.marionette');
var logger = require('../../instances/logger');
var _ = require('underscore');
var Dropzone = require('dropzone');
var currentUser = require('../../initializers/currentUser');
var AttachmentModel = require('../../models/AttachmentModel');
var App = require('../../instances/appInstance');
var config = require('config');

module.exports = Marionette.ItemView.extend({
    template: 'TopicCommentNew',
    _dropZone: null,
    _files: [],
    _deletedFiles: [],

    initialize: function (options) {
        if (this.model.get('id')) {
            this._isEditComment = true;
        }
    },

    ui: {
        'submit': '#submit',
        'close': '.close',
        'errors': '.errors',
        'loader': '.loader',
        'commentDlg': '#commentdlg',
        'textField': '.text-field',
        'dropzone': '.dropzone'
    },

    serializeData: function () {
        return {
            model: this.model.toJSON(),
            title: (this._isEditComment ? 'Edit comment' : 'Create comment')
        };
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
                // add comment to comment collection
                if (view.getOption('commentCollection')) {
                    view.getOption('commentCollection').add(model, { merge: true });
                    if (view.getOption('parentCommentView') && !view._isEditComment) {
                        view.getOption('parentCommentView').showChildCommentsButton(true);
                        // hide edit/delete btns
                        view.getOption('parentCommentView').showEditDeleteBtn(false);
                        if (!view.getOption('parentCommentView').isChildsOpened()) {
                            view.getOption('parentCommentView').ui.showChilds.trigger('click');
                        }
                    }
                }
                if (view._dropZone && view._dropZone.files.length) {
                    // start upload to server
                    view._dropZone.processQueue();
                }

                if (view._deletedFiles.length) {
                    view.removeFilesFromServer();
                }

                view.ui.commentDlg.modal('hide');
            },

            error: function (model, response) {
                view.showErrors(true);
                view.showLoader(false);
                view.ui.errors.empty().append(response.responseText);
            },

            wait: true
        });
    },

    initDropZone: function () {
        var view = this;
        var attachModel = new AttachmentModel();
        this._dropZone = new Dropzone(this.ui.dropzone[0], {
            url: function(file) {
                return App.getBaseUrl() + _.result(view.model, 'url') + _.result(attachModel, 'url');
            },
            method: 'post',
            // input file name, registered on server
            paramName: "f",
            hiddenInputContainer: '.dropzone-container',
            autoProcessQueue : false,
            parallelUploads : config.parallelFileUploads,
            maxFilesize: config.maxFileSize,
            maxFiles: config.maxFiles,
            //if max files count
            maxfilesexceeded: function (file) {
                this.removeFile(file);
                view.ui.errors.text(config.maxFilesMessage);
            },
            uploadMultiple: false,
            addRemoveLinks: true,
            acceptedFiles: config.acceptedFiles,
            error: function (file, msg, xhr) {
                view.showErrors(true);
                view.ui.errors.text(msg);
                this.removeFile(file);
            },
            success: function (file, xhr) {
                if (xhr.data) {
                    view._files.push(xhr.data);
                }
            },
            complete: function (file) {
                view.$('.dz-progress', file.previewElement).hide();
                view.$('.dz-size', file.previewElement).hide();
            },
            removedfile: function (file) {
                view.$(file.previewElement).remove();
                if (file.id) {
                    view._deletedFiles.push(file);
                    view.$('.dz-message').hide();
                    var attachs = view.model.getMeta()[view.model.get('id')].attachments;
                    // show drop msg only when delete all files from dropzone
                    if ((view._deletedFiles.length === attachs.length) && !this.files.length) {
                        view.$('.dz-message').show();
                    }
                    this.options.maxFiles++;
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
            this._files.splice(0, this._files.length);
            this.modelChangeMeta();
        }
    },

    modelChangeMeta: function () {
        if (this.options.commentCollection) {
            var model = this.options.commentCollection.findWhere({ id: this.model.get('id') });
            model.setMeta(this.model.getMeta());
            return model.trigger('change');
        }

        return false;
    },

    removeFilesFromServer: function() {
        var self = this;
        this._deletedFiles.forEach(function (file, i) {
            self.destroyAttachsFromMeta(file.id);
            self.removeAttachmentFromServer(file);
        });

        this._deletedFiles.splice(0, this._deletedFiles.length);
        this.modelChangeMeta();
    },

    removeAttachmentFromServer: function (file) {
        // remove single file from server
        var model = new AttachmentModel({ id: file.id });
        var view = this;
        model.parentUrl = _.result(this.model, 'url');
        model.destroy({
            wait: true
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
        var attachs = [];
        var id = this.model.get('id');
        // if model is new there is no id
        if (!id) return;
        attachs = this.model.getMeta()[id].attachments;
        var drop = this._dropZone;
        if (attachs.length) {
            attachs.forEach(function (file, i) {
                var mockFile = {
                    name: file.cloud_public_id,
                    type: file.type,
                    id: file.id
                };
                drop.emit("addedfile", mockFile);
                drop.emit("thumbnail", mockFile, file.thumb);
                drop.emit("complete", mockFile);
            });
        }
        this._dropZone.options.maxFiles = config.maxFiles - attachs.length;
    },

    onShow: function() {
        this.initDropZone();

        this.ui.commentDlg.on('shown.bs.modal', function () {
            // show caret at the end oj textarea
            var text = this.ui.textField.val();
            this.ui.textField.focus().val('').val(text);
        }.bind(this));

        this.ui.commentDlg.on('hidden.bs.modal', function (e) {
            this.remove();
        }.bind(this));

        this.ui.commentDlg.modal('show');

    }
});
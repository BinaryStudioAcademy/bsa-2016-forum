var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var app = require('../../instances/appInstance');
var DateHelper = require('../../helpers/dateHelper');
var _ = require('underscore');
var markdownHelp = require('../../views/modalWindows/markdownHelp');
var currentUser = require('../../initializers/currentUser');
var Dropzone = require('dropzone');
var AttachmentModel = require('../../models/AttachmentModel');
var App = require('../../instances/appInstance');
var config = require('config');
var helper = require('../../helpers/helper');

Dropzone.autoDiscover = false;

module.exports = Marionette.ItemView.extend({
    template: 'create-vote-header',
    _dropZone: null,
    _files: [],
    _deletedFiles: [],
    _filesCounter: 0,

    ui: {
        title: '#question-title',
        errors: '.js-errors',
        tags: '#tags',
        isPublic: 'input[name=access]',
        finished: '#finished',
        isSingle: 'input[name=isSingle]',
        description: '#question-description',
        slug: '#question-slug',
        openMarkdownHelp: '.openMarkdownHelp',
        dropzone: '.dropzone',
        attachsError: '.js-error-attachments'
    },
    modelEvents: {
        'change:title':'render',
        'save':'saveVote',
        'invalid': function (model, errors) {
            this.ui.errors.empty();
            var self = this;
            _.each(errors, function (error, key) {
                self.$('.js-error-' + key).html(error);
            });
        },
        'sync': function () {
            this.$('.public-' + this.model.get('is_public')).prop('checked', true);
            this.$('.single-' + this.model.get('is_single')).prop('checked', true);
            this.ui.errors.empty();
        },
        'valid': function () {
            this.ui.errors.empty();
        }
    },
    events: {
        'change @ui.title': function () {
            this.model.save({title: this.ui.title.val()});
        },
        'click @ui.isPublic': function () {
            this.saveModel({is_public: parseInt(this.ui.isPublic.filter(':checked').val(), 10)});
        },
        'click @ui.isSingle': function () {
            this.saveModel({is_single: this.ui.isSingle.filter(':checked').val()});
        },
        'change @ui.finished': function () {
            this.saveModel({finished_at: DateHelper.voteDateToSave(this.ui.finished.val())}, {validate: true});
        },
        'change @ui.description': function () {
            this.saveModel({description: this.ui.description.val()});
        },
        'change @ui.slug': function () {
            this.saveModel({slug: this.ui.slug.val()});
        },
        'click @ui.openMarkdownHelp': function () {
            app.renderModal(new markdownHelp());
        }
    },
    serializeData: function () {
        var meta = this.model.getMetaById() || {
                tags:''
            };

        meta.deletable = !this.model.get('id') ? true :  this.model.get('user_id') == currentUser.id || currentUser.isAdmin();

        meta.editable = !this.model.get('id') ? true :  this.model.get('user_id') == currentUser.id || currentUser.isAdmin();

        meta.tags = (_.pluck(meta.tags, 'name')).join(' ');
        meta.finished_at = DateHelper.dateWithTimezone(this.model.get('finished_at'));
        return {
            model: this.model.toJSON(),
            meta: meta
        };
    },

    onRender: function () {
        this.ui.finished.datetimepicker({
            startDate: new Date(),
            todayBtn: true,
            minuteStep: 5,
            autoclose: true,
            clearBtn: true,
            todayHighlight:true
        });

        this.initDropZone();
    },

    saveModel: function (obj) {
        if (this.model.get('id')) {
            this.model.save(obj);
        } else {
            this.model.set(obj);
        }
    },
    saveVote: function () {
        var view = this;
        var users = [];
        var tags = [];
        if (view.model.get('is_public') == 0) {
            view.getOption('parent').getOption('accessedUsers').each(function (model, index) {
                users.push(model.get('id'));
            });
            if(_.indexOf(users, currentUser.id) == -1)
                users.push(currentUser.id);
        }

        if (view.ui.tags.val().trim().length > 0) {
            var splitted = view.ui.tags.val().split(' ');
            _.each(splitted, function (value, index) {
                tags.push({name: value});
            });
        }

        view.model.save({
            users: JSON.stringify(users),
            tags: JSON.stringify(tags),
            is_saved: 1,
            finished_at: DateHelper.voteDateToSave(this.ui.finished.val())
        }, {
            success: function (data) {
                if (!view._deletedFiles.length && !view._dropZone.files.length) {
                    return view.navigateTo();
                } else if (view._deletedFiles.length) {
                    view.removeFilesFromServer();
                }
                if (view._dropZone.files.length) {
                    // start upload to server
                    view._dropZone.processQueue();
                }
            }
        });
    },

    navigateTo: function () {
        Backbone.history.navigate('votes/' + this.model.get('id'), {trigger: true});
    },

    onDestroy: function() {
        // remove unnessecary elements from dom
        $('.datetimepicker').remove();
        $('.dz-hidden-input').remove();
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
            autoProcessQueue : false,
            parallelUploads : config.parallelFileUploads,
            maxFilesize: config.maxFileSize,
            maxFiles: config.maxFiles,
            //if max files count
            maxfilesexceeded: function (file) {
                this.removeFile(file);
                view.ui.attachsError.text(config.maxFilesMessage);
            },
            uploadMultiple: false,
            addRemoveLinks: true,
            acceptedFiles: config.acceptedFiles,
            error: function (file, msg, xhr) {
                view.ui.attachsError.text(msg);
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
                view.ui.attachsError.text('');
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
                if (!this.files.length) return;
                return view.navigateTo();
            }
        });

        this.showAttachments();
    },

    removeFilesFromServer: function() {
        var self = this;
        this._deletedFiles.forEach(function (file, i) {
            self.removeAttachmentFromServer(file);
        });
    },

    removeAttachmentFromServer: function (file) {
        // remove single file from server
        var model = new AttachmentModel({ id: file.id });
        model.parentUrl = _.result(this.model, 'url');
        model.destroy({
            success: function () {
                // if all attachs has been deleted from server
                this._filesCounter++;
                if (!this._files.length &&
                    this._filesCounter == this._deletedFiles.length) {
                    return this.navigateTo();
                }
            }.bind(this)
        });
    },

    showAttachments: function () {
        // if comment already has attachments they will be show
        var attachs = [];
        var id = this.model.get('id');
        // if model is new there is no id
        if (!id) return;
        attachs = this.model.getMeta()[id].attachments;
        helper.attachmentThumb(attachs);
        if (attachs.length) {
            var drop = this._dropZone;
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
            this._dropZone.options.maxFiles = config.maxFiles - attachs.length;
        }
    }
});

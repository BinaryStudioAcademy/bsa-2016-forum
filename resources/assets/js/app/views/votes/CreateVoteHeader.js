var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var app = require('../../instances/appInstance');
var DateHelper = require('../../helpers/dateHelper');
var _ = require('underscore');
var markdownHelp = require('../../views/modalWindows/markdownHelp');
var currentUser = require('../../initializers/currentUser');
var TagBehavior = require('../../behaviors/tagBehavior');

module.exports = Marionette.ItemView.extend({
    template: 'create-vote-header',
    ui: {
        title: '#question-title',
        errors: '.js-errors',
        isPublic: 'input[name=access]',
        finished: '#finished',
        isSingle: 'input[name=isSingle]',
        description: '#question-description',
        slug: '#question-slug',
        openMarkdownHelp: '.openMarkdownHelp',
        tagsInput: '.tags'
    },
    modelEvents: {
        'change:title': 'render',
        'save': 'saveVote',
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
        },
        'change @ui.tagsInput': function () {
            this.model.save({tags: this.ui.tagsInput.val()});
        }
    },
    behaviors: [{
        behaviorClass: TagBehavior
    }],
    serializeData: function () {
        var meta = this.model.getMetaById() || {
            tags: ''
        };
        meta.deletable = !this.model.get('id') ? true : this.model.get('user_id') == currentUser.id || currentUser.isAdmin();

        meta.editable = !this.model.get('id') ? true : this.model.get('user_id') == currentUser.id || currentUser.isAdmin();

        meta.tags = (_.pluck(meta.tags, 'name')).join(',');

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
            todayHighlight: true
        });

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
        if (view.model.get('is_public') == 0) {
            view.getOption('parent').getOption('accessedUsers').each(function (model, index) {
                users.push(model.get('id'));
            });
            if (_.indexOf(users, currentUser.id) == -1)
                users.push(currentUser.id);
        }

        view.model.save({
            users: JSON.stringify(users),
            tags: this.ui.tagsInput.val(),
            is_saved: 1,
            finished_at: DateHelper.voteDateToSave(this.ui.finished.val())
        }, {
            success: function (data) {
                Backbone.history.navigate('votes/' + view.model.id, {trigger: true});
            }
        });
    },
    initialize: function (options) {
        this.tags = options.parent.tags;
    }
});

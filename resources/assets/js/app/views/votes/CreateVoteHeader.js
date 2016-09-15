var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var DateHelper = require('../../helpers/dateHelper');
var _ = require('underscore');

var currentUser = require('../../initializers/currentUser');

module.exports = Marionette.ItemView.extend({
    template: 'create-vote-header',
    ui: {
        title: '#question-title',
        errors: '.js-errors',
        tags: '#tags',
        isPublic: 'input[name=access]',
        finished: '#finished',
        isSingle: 'input[name=isSingle]',
        description: '#question-description',
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
        }
    },
    events: {
        'change @ui.title': function () {
            this.model.save({title: this.ui.title.val()});
        },
        'click @ui.isPublic': function () {
            this.saveModel({is_public: this.ui.isPublic.filter(':checked').val()});
        },
        'click @ui.isSingle': function () {
            this.saveModel({is_single: this.ui.isSingle.filter(':checked').val()});
        },
        'change @ui.finished': function () {
            this.saveModel({finished_at: DateHelper.dateToSave(this.ui.finished.val())});
        },
        'change @ui.description': function () {
            this.saveModel({description: this.ui.description.val()});
        },
    },
    serializeData: function () {
        var meta = this.model.getMetaById() || {
                editable: true,
                deletable: true,
                tags:''
            };
        meta.tags = (_.pluck(meta.tags, 'name')).join(' ');
        meta.finished_at = DateHelper.dateWithTimezoneInFormat(this.model.get('finished_at'));
        return {
            model: this.model.toJSON(),
            meta: meta
        };
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

        if (view.model.get('is_public') == '0') {
            view.getOption('parent').getOption('accessedUsers').each(function (model, index) {
                users.push(model.get('id'));
            });
            users.push(currentUser.id);
        }

        if (view.ui.tags.val().trim().length > 0) {
            var splitted = view.ui.tags.val().split(' ');
            _.each(splitted, function (value, index) {
                tags.push({name: value});
            });
        }
        if(view.model.get('finished_at') == '0000-00-00 00:00:00' || view.model.get('finished_at') == '')
            view.model.set('finished_at', null);

        view.model.save({
            users: JSON.stringify(users),
            tags: JSON.stringify(tags),
            is_saved: 1
        }, {
            success: function (data) {
                Backbone.history.navigate('votes/' + data.get('id'), {trigger: true});
            }
        });
    }
});
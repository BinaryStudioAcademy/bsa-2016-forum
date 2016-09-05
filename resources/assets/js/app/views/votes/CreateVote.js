var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');
var moment = require('moment');
var _ = require('underscore');

var DateHelper = require('../../helpers/dateHelper.js');

var currentUser = require('../../initializers/currentUser');

var CreateVoteItemCollection = require('./CreateVoteItemCollection');
var userCollectionView = require('../users/userCollection');


module.exports = Marionette.LayoutView.extend({
    className: 'well',
    template: 'voteCreateLayout',
    regions: {
        answers: '#vote-answers',
        voteAcessedUsers: '#vote-access-users',
        voteNotAccessedUsers: '#vote-new-addUsers'
    },
    ui: {
        add: '#addAnswer',
        start: '#start',
        title: '#question-title',
        errors: '.js-errors',
        tags: '#tags',
        isPublic: 'input[name=access]:checked',
        finished: '#finished',
        dateerrors: '.js-date-errors',
        isSingle: 'input[name=isSingle]:checked'
    },
    modelEvents: {
        'invalid': function (model, errors) {
            this.ui.errors.empty();
            var self = this;
            $.each(errors, function (key, error) {
                self.$('.js-error-' + key).html(error);
            });
        },
        'saved': function (id) {
            this.ui.errors.empty();
            this.ui.dateerrors.empty();
            this.createVoteItems(id);
        }
    },
    collectionEvents: {
        'voteItemsSaved': function () {
            Backbone.history.navigate('votes/' + this.model.get('id'), {trigger: true});
        }
    },
    events: {
        'click @ui.add': function () {
            Radio.trigger('votesChannel', 'createEmptyVoteItem', this.collection);
        },
        'click @ui.start': 'createVote',
        'change @ui.title': function () {
            this.model.set({title: this.ui.title.val()});
        },
        'click @ui.isPublic': function () {
            this.model.set({is_public: this.ui.isPublic.prop('checked')});
            if (this.ui.isPublic.prop('checked')) {
                this.$('.vote-new-access').hide();
            } else
                this.$('.vote-new-access').show();
        },
        'click @ui.isSingle': function () {
            this.model.set({is_single: this.ui.isSingle.prop('checked')});
        },
        'change @ui.finished': function () {
            var field = this.ui.finished;
            field.addClass('bordered-success');
            setTimeout(function () {
                field.removeClass('bordered-success');
            }, 1500);
        }
    },
    onRender: function () {
        this.ui.finished.trigger('change');

        this.getRegion('answers').show(new CreateVoteItemCollection({collection: this.collection}));

        this.getRegion('voteNotAccessedUsers').show(new userCollectionView({
            collection: this.options.users,
            childView: require('./CreateVoteUserItemExtend')
        }));

        this.getRegion('voteAcessedUsers').show(new userCollectionView({
            collection: this.options.accessedUsers,
            childView: require('./CreateVoteUserItemExtend')
        }));
    },
    createVote: function () {
        var view = this;
        var users = [];
        var tags = [];
        if (!view.model.get('is_public')) {
            view.options.accessedUsers.each(function (model, index) {
                users.push(model.get('id'));
            });
        }

        if (!(view.ui.tags.val().length == 0)) {
            var splitted = view.ui.tags.val().split(' ');
            $.each(splitted, function (index, value) {
                tags.push({name: value});
            });
        }
        view.model.save({
            user_id: currentUser.get('id'),
            finished_at: DateHelper.dateWithoutTimezone(this.ui.finished.val()),
            users: users,
            tags: tags
        }, {
            success: function (data) {
                view.model.trigger('saved', data.get('id'));
            }
        });
    },
    createVoteItems: function (id) {
        var collection = this.collection;
        collection.parentUrl = '/votes/' + id;
        collection.itemsToSave = 0;
        _.each(collection.models, function (model, key) {
            if (model.hasChanged('name') || !model.get('id'))
                if(model.save({
                    user_id: currentUser.get('id'),
                    vote_id: id
                }, {
                    success: function () {
                        model.trigger('saved');
                    }
                })) {collection.itemsToSave++;}
        });
    }
});
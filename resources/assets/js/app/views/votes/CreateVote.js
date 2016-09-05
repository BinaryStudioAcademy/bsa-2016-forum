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
    initialize: function () {
        this.model.set({user_id: currentUser.get('id')});
    },
    regions: {
        answers: '#vote-answers',
        voteAcessedUsers: '#vote-access-users',
        voteNotAccessedUsers: '#vote-new-addUsers'
    },
    ui: {
        add: '#addAnswer',
        start: '#start',
        delete: '#delete',
        title: '#question-title',
        errors: '.js-errors',
        tags: '#tags',
        isPublic: 'input[name=access]',
        finished: '#finished',
        dateerrors: '.js-date-errors',
        isSingle: 'input[name=isSingle]'
    },
    modelEvents: {
        'invalid': function (model, errors) {
            this.ui.errors.empty();
            var self = this;
            _.each(errors, function (error, key) {
                self.$('.js-error-' + key).html(error);
            });
        },
        'change:id': function () {
            var id = this.model.get('id');

            this.collection.parentUrl = '/votes/' + id;

            this.collection.each(function (model, index) {
                model.save({
                    vote_id: id
                });
            });
        },
        'sync': function () {
            this.ui.errors.empty();
        }
    },
    events: {
        'click @ui.add': function () {
            Radio.trigger('votesChannel', 'createEmptyVoteItem', this.collection);
        },
        'click @ui.start': 'createVote',
        'change @ui.title': function () {
            this.model.save({title: this.ui.title.val()});
        },
        'click @ui.isPublic': function () {
            this.saveModel({is_public: this.ui.isPublic.filter(':checked').val()});
            if (this.ui.isPublic.prop('checked')) {
                this.$('.vote-new-access').hide();
            } else
                this.$('.vote-new-access').show();
        },
        'click @ui.isSingle': function () {
            this.saveModel({is_single: this.ui.isSingle.filter(':checked').val()});
            console.log(this.model.get('is_single'));

        },
        'change @ui.finished': function () {
            this.saveModel({finished_at: DateHelper.dateWithoutTimezone(this.ui.finished.val())});
        }
    },
    onRender: function () {
        var self = this;
        this.getRegion('answers').show(new CreateVoteItemCollection({
            collection: this.collection,
            parent: self.model
        }));

        this.getRegion('voteNotAccessedUsers').show(new userCollectionView({
            collection: this.getOption('users'),
            childView: require('./CreateVoteUserItemExtend')
        }));

        this.getRegion('voteAcessedUsers').show(new userCollectionView({
            collection: this.getOption('accessedUsers'),
            childView: require('./CreateVoteUserItemExtend')
        }));
    },
    createVote: function () {
        var view = this;
        var users = [];
        var tags = [];
        if (!view.model.get('is_public')) {
            view.getOption('accessedUsers').each(function (model, index) {
                users.push(model.get('id'));
            });
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
            is_saved: 1
        }, {
            success: function (data) {
                Backbone.history.navigate('votes/' + data.get('id'), {trigger: true});
            }
        });
    },
    saveModel: function (obj) {
        if (this.model.get('id')) {
            this.model.save(obj);
        } else {
            this.model.set(obj);
        }
    }
});
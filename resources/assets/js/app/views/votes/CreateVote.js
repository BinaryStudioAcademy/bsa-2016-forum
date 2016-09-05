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
    initialize:function() {
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
            $.each(errors, function (key, error) {
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
            this.model.set({is_public: this.ui.isPublic.filter(':checked').val()});
            if (this.ui.isPublic.prop('checked')) {
                this.$('.vote-new-access').hide();
            } else
                this.$('.vote-new-access').show();
        },
        'click @ui.isSingle': function () {
            this.model.set({is_single: this.ui.isSingle.filter(':checked').val()});
        },
        'change @ui.finished': function () {
            var field = this.ui.finished;
            this.model.save({finished_at: DateHelper.dateWithoutTimezone(this.ui.finished.val())});
            field.addClass('bordered-success');
            setTimeout(function () {
                field.removeClass('bordered-success');
            }, 1500);
        }
    },
    onRender: function () {
        var self = this;
        this.getRegion('answers').show(new CreateVoteItemCollection({
            collection: this.collection,
            parent: self.model
        }));

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
            users: users,
            tags: tags
        }, {
            success: function (data) {
                Backbone.history.navigate('votes/' + data.get('id'), {trigger: true});
            }
        });
    }
});
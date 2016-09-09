var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');
var moment = require('moment');
var _ = require('underscore');

var DateHelper = require('../../helpers/dateHelper.js');

var currentUser = require('../../initializers/currentUser');

var CreateVoteItemCollection = require('./CreateVoteItemCollection');
var userCollectionView = require('../users/userCollection');
var CreateVoteHeader = require('./CreateVoteHeader');

module.exports = Marionette.LayoutView.extend({
    className: 'well',
    template: 'voteCreateLayout',
    regions: {
        answers: '#vote-answers',
        voteAcessedUsers: '#vote-access-users',
        voteNotAccessedUsers: '#vote-new-addUsers',
        voteHeader: '.vote-new-head'
    },
    ui: {
        add: '#addAnswer',
        start: '#start',
        delete: '#delete',
        selectAccessedUsersBlock: '.vote-new-access',
        toAccessed: '.js-to-accessed',
        toNotAccessed: '.js-to-not-accessed'
    },
    events: {
        'click @ui.add': function () {
            Radio.trigger('votesChannel', 'createEmptyVoteItem', this.collection);
        },
        'click @ui.start': 'createVote',
        'click @ui.delete': function () {
            this.model.destroy({success: function() {Backbone.history.navigate('votes', {trigger: true});}});
        },
        'click @ui.toAccessed': function () {
            this.moveUsers(this.getOption('users'), this.getOption('accessedUsers'));
        },
        'click @ui.toNotAccessed': function () {
            this.moveUsers(this.getOption('accessedUsers'), this.getOption('users'));
        }
    },
    modelEvents: {
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
    onRender: function () {
        var model = this.model;
        this.getRegion('voteHeader').show(new CreateVoteHeader({
            model: model
        }));

        this.getRegion('answers').show(new CreateVoteItemCollection({
            collection: this.collection,
            parent: this.model
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

        if (view.model.get('is_public') == '0') {
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
    serializeData: function () {
        var meta = this.model.getMetaById() || {
                deletable: !true,
                editable: !true
            };

        return {
            model: this.model.toJSON(),
            meta: meta
        };
    },
    moveUsers: function (from, to) {
        var models = from.clone().models;

        from.remove(from.models);

        to.add(models);
    }
});
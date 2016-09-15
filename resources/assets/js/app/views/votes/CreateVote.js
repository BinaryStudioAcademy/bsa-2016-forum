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
        errors: '.js-errors',
        toAccessed: '.js-to-accessed',
        toNotAccessed: '.js-to-not-accessed',
        selectAccessedUsersBlock: '.vote-new-access'
    },
    modelEvents: {
        'change:id': function () {
            var id = this.model.get('id');

            this.collection.parentUrl = '/votes/' + id;

            this.collection.each(function (model, index) {
                if (!model.get('vote_id') || !model.get('id'))
                    model.save({
                        vote_id: id
                    });
            });
        },
        'change:is_public': function (model) {
            if (model.get('is_public') == '0' && (!model.get('user_id') || model.get('user_id') == currentUser.get('id')) || currentUser.get('role') == 'Admin') {
                var naUsers =  this.getOption('users');
                var aUsers = this.getOption('accessedUsers');
                naUsers.remove(naUsers.models);
                aUsers.remove(aUsers.models);
                if (model.get('id')) {
                    naUsers.fetch({
                        success: function (response) {
                            aUsers.add(response.remove(_.pluck(model._meta[model.get('id')].accessedUsers, 'user_id')));
                        }
                    });
                } else {
                    naUsers.fetch();
                }
                this.ui.selectAccessedUsersBlock.show();
            } else
                this.ui.selectAccessedUsersBlock.hide();
        },
        'sync': function (model) {
            var meta = model.getMetaById() || {deletable: false};
            meta.deletable ? this.ui.delete.show() : this.ui.delete.hide();
        }
    },
    events: {
        'click @ui.add': function () {
            Radio.trigger('votesChannel', 'createEmptyVoteItem', this.collection);
        },
        'click @ui.toAccessed': function () {
            this.moveUsers(this.getOption('users'), this.getOption('accessedUsers'));
        },
        'click @ui.toNotAccessed': function () {
            this.moveUsers(this.getOption('accessedUsers'), this.getOption('users'));
        },
        'click @ui.start': function() {
            if(this.model.get('user_id') == currentUser.id || currentUser.get('role') == 'Admin')
                this.model.trigger('save');
            else
                Backbone.history.navigate('votes/' + this.model.get('id'), {trigger: true});
        },
        'click @ui.delete': function () {
            this.model.destroy({
                success: function () {
                    Backbone.history.navigate('votes', {trigger: true});
                }
            });
        }
    },
    onRender: function () {
        var model = this.model;
        this.getRegion('voteHeader').show(new CreateVoteHeader({
            model: model,
            parent: this
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
    moveUsers: function (from, to) {
        var models = from.clone().models;

        from.remove(from.models);

        to.add(models);
    }
});
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');
var moment = require('moment');

var markdownHelp = require('../../views/modalWindows/markdownHelp');

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
        title: '#question-title',
        description: '#question-description',
        errors: '.js-errors',
        toAccessed: '.js-to-accessed',
        toNotAccessed: '.js-to-not-accessed',
        selectAccessedUsersBlock: '.vote-new-access',
        modal: '#noAnswersModal',
        modalErrorField: '#modalErrorField'
    },
    initialize:function() {
        this.collection.trigger('update', this.collection);
    },
    modelEvents: {
        'change:id': function () {
            var id = this.model.get('id');

            this.collection.parentUrl = '/votes/' + id;

            this.collection.each(function (model, index) {
                if (!model.get('id') && model.get('name').trim().length > 0)
                    model.save({
                        vote_id: id
                    });
            });

            this.ui.delete.toggleClass( 'hidden', !(this.model.get('user_id') == currentUser.id || currentUser.isAdmin()));
        },
        'change:is_public': function (model) {
            if (model.get('is_public') == 0 && (!model.get('user_id') || model.get('user_id') == currentUser.id) || currentUser.isAdmin()) {
                Radio.trigger('votesChannel', 'loadAccessedUsers', this);
                this.ui.selectAccessedUsersBlock.show();
            } else {
                this.ui.selectAccessedUsersBlock.hide();
            }
        }
    },
    collectionEvents: {
        'update': function (collection) {
            collection.each(function (model) {
                model.trigger('collectionUpdated', collection.size() > 2);
            });
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

            var validAnswers = true;
            this.collection.each(function (model) {
                if (!model.isValid()) {
                    validAnswers = false;
                }
            });

            if (this.model.get('user_id') == currentUser.id || currentUser.isAdmin()) {

                if (this.collection.length < 2) {
                    this.model.save({is_saved: 0});
                    this.ui.modal.modal('show');
                } else if(validAnswers)
                    this.model.trigger('save');
                else {
                    this.model.isValid();
                }

            }
            else if(validAnswers) {
                Backbone.history.navigate('votes/' + this.model.get('id'), {trigger: true});
            }
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
    },
    saveModel: function (obj) {
        if (this.model.get('id')) {
            this.model.save(obj);
        } else {
            this.model.set(obj);
        }
        to.add(models);
    }
});
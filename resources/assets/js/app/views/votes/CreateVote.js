var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');
var moment = require('moment');

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
                if (key == 'invalidDate')
                    self.printInvalidDateError();
                else
                    self.$('.js-error-' + key).html(error);
            });
        },
        'saved': function (id) {
            this.ui.errors.empty();
            this.ui.dateerrors.empty();
            this.options.answers.parentUrl = '/votes/' + id;
        }
    },
    events: {
        'click @ui.add': function () {
            Radio.trigger('votesChannel', 'createEmptyVoteItem', this.options.answers);
        },
        'click @ui.start': 'createVote',
        'change @ui.title': function () {
            this.model.set({title: this.ui.title.val()});
        },
        'change @ui.finished': function () {
            this.model.set({finished_at: this.ui.finished.val()});
        },
        'click @ui.isPublic': function () {
            this.model.set({is_public: this.ui.isPublic.prop('checked')});
            if (this.ui.isPublic.prop('checked')) {
                this.$('.vote-new-access').hide();
            } else
                this.$('.vote-new-access').show();
        },
        'click @ui.isSingle': function () {
            this.model.set({is_public: this.ui.isSingle.prop('checked')});
        }
    },
    onRender: function () {
        this.ui.finished.trigger('change');

        this.getRegion('answers').show(new CreateVoteItemCollection({collection: this.options.answers}));

        this.getRegion('voteNotAccessedUsers').show(new userCollectionView({
            collection: this.options.users,
            childView: require('./CreateVoteUserItemExtend')
        }));

        this.getRegion('voteAcessedUsers').show(new userCollectionView({
            collection: this.options.accessedUsers,
            childView: require('./CreateVoteUserItemExtend')
        }));
    },
    printInvalidDateError: function () {
        var block = this.$('.js-error-invalidDate');
        block.append('<span> Typed datetime format is invalid. Here is a list of available formats: </span>');
        block.append('<ul>');
        $.each(this.dateFormats, function (key, value) {
            block.find('ul').append('<li>' + value + '</li>');
        });
    },
    createVote: function () {
        var view = this;
        var success = true;
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
        if (!view.model.save({
                user_id: currentUser.get('id'),
                finished_at: moment(view.ui.finished.val(), view.dateFormats, true).format("YYYY-MM-DD HH:mm:ss"),
                users: users,
                tags: tags
            }, {
                async: false,
                success: function (data) {
                    view.model.trigger('saved', data.get('id'));
                }
            })) {
            success = false;
        }

        if (view.model.get('id')) {
            view.options.answers.each(function (model, index) {
                if (model.hasChanged('name') || !model.get('id'))
                    if (!model.save({
                            user_id: currentUser.get('id'),
                            vote_id: view.model.get('id')
                        }, {
                            success: function () {
                                model.trigger('saved');
                            }
                        })) {
                        success = false;
                    }
            });
        }
        if (success && view.model.get('id')) {
            view.$('.vote-new *').prop('disabled', true);
            setTimeout(function () {
                Backbone.history.navigate('votes/' + view.model.get('id'), {trigger: true});
            }, 1000);
        }
    },
    dateFormats: [
        //full
        'DD:MM:YYYY HH:mm:ss',
        'DD/MM/YYYY HH/mm/ss',
        'DD-MM-YYYY HH-mm-ss',

        //short dates
        'D:M:YY HH:mm:ss',
        'D/M/YY HH/mm/ss',
        'D-M-YY HH-mm-ss',

        //short times
        'DD:MM:YYYY H:m:s',
        'DD/MM/YYYY H/m/s',
        'DD-MM-YYYY H-m-s',

        //short
        'D:M:YY H:m:s',
        'D/M/YY H/m/s',
        'D-M-YY H-m-s'
    ]
});
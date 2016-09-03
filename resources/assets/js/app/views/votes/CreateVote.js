var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');
var moment = require('moment');

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
            this.ui.title.css('border', '1px solid green');
            this.ui.errors.empty();
            this.ui.dateerrors.empty();
            this.options.answers.parentUrl = '/votes/' + id ;
        }
    },
    events: {
        'click @ui.add': function () {
            Radio.trigger('votesChannel', 'createEmptyVoteItem', this.options.answers);
        },
        'click @ui.start': function () {
            Radio.trigger('votesChannel', 'createVote', this);
        },
        'change @ui.title': function () {
            this.model.set({title: this.ui.title.val()});
        },
        'change @ui.finished': function () {
            console.log(this.ui.finished.val());
            this.model.set({finished_at: this.ui.finished.val()});
        },
        'click @ui.isPublic': function () {
            if (this.ui.isPublic.prop('checked')) {
                this.$('.vote-new-access').hide();
            } else
                this.$('.vote-new-access').show();
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
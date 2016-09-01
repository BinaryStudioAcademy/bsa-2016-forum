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
        radiobuttons: 'input[name=access]:checked',
        finished: '#finished',
        dateerrors: '.js-date-errors',
        isSingle: 'input[name=isSingle]:checked'
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
            var d = moment(this.ui.finished.val(), this.model.dateFormats, true);
            if(!d.isValid())
                this.printDateErrors(errors = {invalidDate:true});
            else
                this.printDateErrors(errors = {invalidDate:false});
        },
        'click @ui.radiobuttons': function () {
            if(this.ui.radiobuttons.prop('checked')){
                this.$('.vote-new-access').hide();
            } else
                this.$('.vote-new-access').show();
        }
    },
    onRender: function () {
        this.options.users.on('click', function () {
            console.log('123');
        });
        this.getRegion('answers').show(new CreateVoteItemCollection({collection: this.options.answers}));
        this.getRegion('voteNotAccessedUsers').show(new userCollectionView({collection: this.options.users, childView: require('./CreateVoteUserItemExtend')}));
        this.getRegion('voteAcessedUsers').show(new userCollectionView({collection: this.options.accessedUsers}));
    },
    printErrors: function (errors) {
        if (errors.title) {
            this.ui.errors.empty();
            this.ui.errors.append('<span>' + errors.title + '</span>');
        } else this.ui.errors.empty();
        this.printDateErrors(errors);
    },
    printDateErrors: function (errors) {
        if(errors.invalidDate || errors.finishInThePast) {
            if(errors.invalidDate) {
                var self = this;
                this.ui.dateerrors.empty();
                this.ui.dateerrors.append('<span> Typed datetime format is invalid. Here is a list of available formats: </span>');
                this.ui.dateerrors.append('<ul>');
                $.each(self.model.dateFormats, function (key, value) {
                    self.ui.dateerrors.find('ul').append('<li>' + value + '</li>');
                })
            }
            if(errors.finishInThePast){
                this.ui.dateerrors.empty();
                this.ui.dateerrors.append('<span> Typed datetime is in the past! </span>');
            }
        } else this.ui.dateerrors.empty();
    }
});
var Marionette = require('backbone.marionette');
var currentUser = require('../../initializers/currentUser');
var Radio = require('backbone.radio');

module.exports = Marionette.ItemView.extend({
    template: 'vote-create-input-voteitem',
    className: 'form-group relative limited-block-for-corner-button',
    ui: {
        name: '.js-item-name',
        deleteButton: '.voteitem-delete',
        error_name: '.js-error-field'
    },
    events: {
        'change @ui.name': function () {
            var name = this.ui.name.val();
            if (name.trim().length > 0)
                this.model.set({name: name}, {validate: true});
            if (this.model.get('vote_id') && this.model.hasChanged('name'))
                this.model.save();
        },
        'click @ui.deleteButton': function (e) {
            e.stopPropagation();
            e.preventDefault();
            this.model.destroy();
        }
    },
    modelEvents: {
        'invalid': function (model, errors) {
            this.ui.error_name.html('<span>' + errors['name'] + '</span>');
        },
        'sync': 'render',
        'valid': function () {
            this.ui.error_name.empty();
        },
        'enter': function () {
            var collection = this.model.collection;
            var index = collection.indexOf(this.model);
            if(collection.at(index + 1))
                collection.at(index + 1).trigger('setFocus');
            else {
                Radio.trigger('votesChannel', 'createEmptyVoteItem', this.model.collection);
                collection.at(collection.length - 1).trigger('setFocus');
            }

        },
        'setFocus': 'setFocus',
        'collectionUpdated': function (moreThanTwoAnswers) {
            if(this._deletable != moreThanTwoAnswers)
            {
                this._deletable = moreThanTwoAnswers;
                this.render();
            }
        }
    },
    initialize: function () {
        var self = this;
        this.model.view = this;
        this._deletable = this.model.collection.length > 2;
        this.model.set({user_id: currentUser.get('id')});
        if(this.getOption('parent').get('id'))
            this.model.set({vote_id: this.getOption('parent').get('id')});
        this.getOption('parent').on('change:id', function (model) {
            self.model.set({vote_id: model.get('id')});
        });
    },
    serializeData: function () {
        
        var meta = this.model.getMetaById() || {};
        meta.deletable = this._deletable && !this.model.get('id')
            ? this._deletable
            : (this._deletable && meta.comments == 0 && meta.results == 0 && (currentUser.id == this.model.get('user_id') || currentUser.isAdmin()));


        meta.editable = !this.model.get('id')
            ? true
            : (meta.comments == 0 && meta.results == 0 && (currentUser.id == this.model.get('user_id') || currentUser.isAdmin()));

        return {
            model: this.model.toJSON(),
            meta: meta
        };
    },
    onRender: function () {
        this.ui.name.keypress(function(e){
            if(e.keyCode == 13){
                this.model.trigger('enter', e);
            }
        }.bind(this));
    },
    setFocus: function () {
        this.ui.name.focus();
    }
});
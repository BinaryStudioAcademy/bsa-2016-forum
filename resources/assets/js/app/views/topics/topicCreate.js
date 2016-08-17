var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var TopicModel = require('../../Models/TopicModel');

module.exports = Marionette.ItemView.extend({
    template: 'topicCreateNew',
    model: new TopicModel(),

    ui: {
        name: '[name="name"]',
        description: '[name="description"]',
        createForm: '.topic-form'
    },

    initialize: function () {
        this.bindUIElements();
    },

    modelEvents: {
        'invalid': function (model, errors, options) {
            $('.errors').empty();
            for (var error in errors) {
                $('[name="' + error + '"]').siblings('.errors').html(errors[error]);
            }
        }
    },

    events: {
        'change @ui.name': function () {
            this.model.set({name: this.ui.name.val()})
        },
        'change @ui.description': function () {
            this.model.set({description: this.ui.description.val()})
        },
        'submit @ui.createForm': function (e) {
            e.preventDefault();
            this.model.save({
                name: this.ui.name.val(),
                description: this.ui.description.val(),
                user_id: 2
            }, {
                success: function (model, response) {
                    Backbone.history.navigate('topics/' + model.get('id'), {trigger: true});
                },
                error: function (model, xhr, options) {
                    var errors = JSON.parse(xhr.responseText);
                    model.trigger('invalid', model, errors);
                }
            });
        }
    }
});
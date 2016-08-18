var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var TopicModel = require('../../Models/TopicModel');

module.exports = Marionette.ItemView.extend({
    template: 'topicCreateNew',

    ui: {
        createForm: '.topic-form'
    },

    initialize: function () {
        this.model.set({user_id: 2})
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
        'change @ui.createForm': function (e) {
            var updateModel = {};
            var value = e.target.value;
            var attr = e.target.name;
            updateModel[attr] = value;
            this.model.set(updateModel);
        },
        'submit @ui.createForm': function (e) {
            e.preventDefault();
            this.model.save({}, {
                success: function (model, response) {
                    Backbone.history.navigate('topics/' + model.get('id'), {trigger: true});
                }
            });
        }
    }
});
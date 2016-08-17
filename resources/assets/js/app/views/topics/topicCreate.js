var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var TopicModel = require('../../Models/TopicModel');
var router = require('../../router');
var _ = require('underscore');

module.exports = Marionette.ItemView.extend({
    template: 'topicCreateNew',
    model: new TopicModel(),
    ui: {
        name: '[name="name"]',
        description: '[name="description"]',
        createForm: '.topic-form'
    },
    initialize: function() {
        this.bindUIElements();
    },
    events: {
        'change @ui.name': function() {
            this.model.set({name: this.ui.name.val()})
        },
        'change @ui.description': function() {
            this.model.set({name: this.ui.description.val()})
        },
        'submit @ui.createForm': function (e) {
            e.preventDefault();

            this.model.save({
                name: this.ui.name.val(),
                description: this.ui.description.val(),
                user_id: 2
            },{
                success: function(model, response) {
                    Backbone.history.navigate('/', { trigger: true });
                },
                error: function(model, xhr, options) {
                    var errors = JSON.parse(xhr.responseText);
                    console.log(errors);
                }
            });
        }
    }
});
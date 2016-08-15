var Marionette = require('backbone.marionette');
var TopicModel = require('../../Models/TopicModel');

module.exports = Marionette.ItemView.extend({
    template: 'topicCreateNew',
    model: new TopicModel(),
    ui: {
        name: '[name="topic-name"]',
        description: '[name="topic-description"]',
        createForm: '.topic-form'
    },
    initialize: function() {
        this.bindUIElements();
    },
    events: {
        'submit @ui.createForm': function (e) {
            e.preventDefault();
            this.model.save({
                name: this.ui.name.val(),
                description: this.ui.description.val(),
                user_id: 2
            });
            console.log(this.model);
        }
    }
});
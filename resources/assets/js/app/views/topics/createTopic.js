var Marionette = require('backbone.marionette');
var TopicModel = require('../../Models/TopicModel');

module.exports = Marionette.ItemView.extend({
    template: '#create.tpl',
    model: new TopicModel(),
    ui: {
        name: '#topic-name',
        description: '#topic-description',
        createForm: '#create-form'
    },
    initialize: function() {
        this.bindUIElements();
    },
    events: {
        'submit @ui.createForm': function (e) {
            e.preventDefault();
            this.model.save({
                name: this.ui.name.val(),
                description: this.ui.description.val()
            });
            console.log(this.model);
        }
    }
});
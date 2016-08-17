var Marionette = require('backbone.marionette');
var logger = require('../../instances/logger');
var _ = require('underscore');
var TopicCommentModel = require('../../models/TopicCommentModel');

module.exports = Marionette.ItemView.extend({
    template: 'TopicCommentNew',
    attachment: null,

    ui: {
        'attach': '.topic-attachment button',
        'submit': '#submit'
    },

    events: {
        'click @ui.attach': 'attachFile',
        'click @ui.submit': 'submitComment'
    },

    initialize: function (options) {

    },

    attachFile: function (event) {
        logger(this.$el.find('#attach'));
        this.$el.find('#attach').trigger('click');
    },

    submitComment: function (event) {
        event.preventDefault();

        var data = {
            files: this.$('#attach').prop('files')
        };

        _.each(this.$('form').serializeArray(), function(input) {
            data[ input.name ] = input.value;
        });

        //logger(data);

        //var model = new TopicCommentModel();
        //
        //console.log(model.save(data, {}));
    }
});
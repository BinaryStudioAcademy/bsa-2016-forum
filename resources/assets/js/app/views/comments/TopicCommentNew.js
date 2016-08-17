var Marionette = require('backbone.marionette');
var logger = require('../../instances/logger');
var _ = require('underscore');
var TopicCommentModel = require('../../models/TopicCommentModel');
var Radio = require('backbone.radio');

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
        this._topicModel = options.topicModel;
    },

    attachFile: function (event) {
        logger(this.$el.find('#attach'));
        this.$el.find('#attach').trigger('click');
    },

    submitComment: function (event) {
        event.preventDefault();

        var data = {
            //files: this.$('#attach').prop('files'),
            user_id: 2,
        };

        _.each(this.$('form').serializeArray(), function(input) {
            data[ input.name ] = input.value;
        });

        var model = new TopicCommentModel();

        model.parentUrl = _.result(this._topicModel, 'url');

        logger(model);

        model.set(data);

        model.save({}, {
            success: function (data) {
                logger('comment saved succesfully', data, model);
                Radio.channel('newComment').trigger('addComentModel', model)
            },
            error: function (response) {
                console.error(response.responseText);
            }
        });
    }
});
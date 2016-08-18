var Marionette = require('backbone.marionette');
var logger = require('../../instances/logger');
var _ = require('underscore');
var TopicCommentModel = require('../../models/TopicCommentModel');
var Radio = require('backbone.radio');
var Dropzone = require('dropzone');

module.exports = Marionette.ItemView.extend({
    template: 'TopicCommentNew',
    attachment: null,

    ui: {
        'attach': '.topic-attachment button',
        'submit': '#submit',
        'close': '.close-btn button'
    },

    events: {
        'click @ui.attach': 'attachFile',
        'click @ui.submit': 'submitComment',
        'click @ui.close': 'close'
    },

    initialize: function (options) {
        this._topicModel = options.topicModel;
    },

    close: function (event) {
        this.remove();
    },

    attachFile: function (event) {
        this.$el.find('.dropzone-container').toggle();
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

        model.set(data);

        model.save({}, {
            success: function (data) {
                logger('comment saved successfully');
                Radio.channel('newComment').trigger('addCommentModel', data);
            },
            error: function (response) {
                console.error(response.responseText);
            }
        });
    },

    onRender: function () {
        var drop = new Dropzone(this.$('#drop')[0], {
            url: function(file) {
                console.log(file);
                return '';
            }
        });
    }
});
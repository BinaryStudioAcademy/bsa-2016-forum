var Marionette = require('backbone.marionette');
var _ = require('underscore');
var logger = require('../../instances/logger');
var Radio = require('backbone.radio');
var currentUser = require('../../initializers/currentUser');

module.exports = Marionette.LayoutView.extend({
    template: 'TopicCommentItem',

    regions: {
        'attachments': '.attachs'
    },

    ui: {
        'answer': '.answer-btn',
        'edit': '.comment-edit-btn',
        'remove': '#removeBtn'
    },

    events: {
        'click @ui.answer': function (event) {
            Radio.channel('comment').trigger('addComment', this);
        },

        'click @ui.edit': function (event) {
            Radio.channel('comment').trigger('addComment', this, this.model);
        },

        'click @ui.remove': function (event) {
            this.model.parentUrl = this.model.collection.parentUrl;
            this.model.destroy({
                error: function (model, response) {
                    this.$('.errors').text(response.responseText);
                },
            });
        },
    },

    attachmentThumb: function (attachs) {
        attachs.forEach(function (attach) {
           if (attach.type == 'image/jpeg' || attach.type == 'image/png' ||
               attach.type == 'image/gif') {
               attach.thumb = attach.url;
           } else {
               attach.thumb = '/images/doc.png';
           }

        });
    },

    serializeData: function () {
        var meta = this.model.getMeta();
        var id = this.model.get('id');
        //console.log(meta, currentUser);
        this.attachmentThumb(meta[id].attachments);
        return {
            model: this.model.toJSON(),
            meta: {
                user: meta[id].user,
                likes: meta[id].likes,
                attachments: meta[id].attachments,
                isUserComment: currentUser.get('id') === meta[id].user.id
            }
        };
    },

    modelEvents: {
        'change': 'render'
    }
});
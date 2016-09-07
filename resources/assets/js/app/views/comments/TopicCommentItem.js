var Marionette = require('backbone.marionette');
var _ = require('underscore');
var logger = require('../../instances/logger');
var Radio = require('backbone.radio');
var currentUser = require('../../initializers/currentUser');
var ChildCommentsCollection = require('../../collections/TopicCommentsCollection');
var ChildCommentsView = require('./TopicCommentNew');

module.exports = Marionette.LayoutView.extend({
    template: 'TopicCommentItem',
    _childUpload: false,

    initialize: function () {
        //this._childs = new ChildCommentsCollection();
        //this._childs.parentUrl = _.result(this.model, 'getEntityUrl');
    },

    regions: {
        'attachments': '.attachs',
        'childComments': '.topic-comment-childs'
    },

    ui: {
        'answer': '.answer-btn',
        'edit': '.comment-edit-btn',
        'remove': '#removeBtn',
        'showChilds': '.btn-childs'
    },

    events: {
        'click @ui.answer': function (event) {
            Radio.channel('comment').trigger('addComment', this);
        },

        'click @ui.edit': function (event) {
            event.preventDefault();
            event.stopPropagation();
            //console.log(this.model);
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

        'click @ui.showChilds': function (event) {
            event.preventDefault();
            Radio.channel('comment').trigger('showChildComments', this);
        },
    },

    childCommentsBtnIcon: function () {
        this.ui.showChilds.find('span').toggleClass('glyphicon-chevron-down').toggleClass('glyphicon-chevron-up');
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
        this.attachmentThumb(meta[id].attachments);
        return {
            model: this.model.toJSON(),
            meta: {
                user: meta[id].user,
                likes: meta[id].likes,
                attachments: meta[id].attachments,
                comments: meta[id].comments,
                isUserComment: currentUser.get('id') === meta[id].user.id
            }
        };
    },

    modelEvents: {
        'change': 'render',
        'destroy': 'modelDestroy'
    },

    modelDestroy: function (model) {
        console.log(model, 'destroy model');
        //this.render();
    }
});
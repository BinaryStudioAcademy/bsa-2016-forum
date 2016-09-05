var Marionette = require('backbone.marionette');
var _ = require('underscore');
var Bookmark = require('../../models/BookmarkModel');
var currentUser = require('../../initializers/currentUser');
var dateHelper = require('../../helpers/dateHelper');
var logger = require('../../instances/logger');

module.exports = Marionette.ItemView.extend({
    template: 'topicHeader',

    modelEvents: {
        'change': 'render'
    },

    serializeData: function () {
        var meta = this.model.getMeta();
        if (!meta) return {
            model: this.model.toJSON(),
            meta: {
                user: {},
                likes: 0,
                comments: 0,
                createdDate: dateHelper.middleDate(this.model.get('created_at'))
            }
        };
        return {
            model: this.model.toJSON(),
            meta: {
                user: meta.user,
                likes: meta.likes,
                comments: meta.comments,
                createdDate: dateHelper.middleDate(this.model.get('created_at'))
            }
        };
    },

    ui: {
        bookmarkTopic: '.bookmark-btn',
        icon: '.bookmarked'
    },

    events: {
        'click @ui.bookmarkTopic': 'bookmarkTopic'
    },

    unlockButton: function () {
        this.ui.bookmarkTopic.removeAttr('disabled');
        this.ui.bookmarkTopic.addClass('text-info');
        this.ui.bookmarkTopic.removeClass('text-muted');
    },

    lockButton: function () {
        this.ui.bookmarkTopic.attr('disabled', 'disabled');
        this.ui.bookmarkTopic.removeClass('text-info');
        this.ui.bookmarkTopic.addClass('text-muted');
    },

    addOkIcon: function () {
        this.ui.bookmarkTopic.append(' <i class="glyphicon glyphicon-ok bookmarked"></i>');
    },

    onRender: function () {
        var meta = this.model.getMeta();
        if (!meta) return;
        if (meta.bookmark) {
            this.model.bookmarkId = meta.bookmark.id;
        }

        if (this.model.bookmarkId) {
            this.addOkIcon();
        }
    },

    bookmarkTopic: function () {
        var bookmark = new Bookmark();

        this.lockButton();

        var that = this;

        if (this.model.bookmarkId) {
            bookmark.set({
                id: this.model.bookmarkId
            });
            bookmark.destroy({
                success: function () {
                    that.unlockButton();
                    that.ui.icon.remove();
                    that.model.bookmarkId = undefined;
                },
                error: function (response, xhr) {
                    var errorMsg = '';
                    $.each(xhr.responseJSON, function(index, value) {
                        errorMsg += index + ': ' + value;
                    });

                    alert(errorMsg);
                }
            });

        } else {
            bookmark.save({
                topic_id: this.model.id,
                user_id: currentUser.id
            }, {
                success: function (response) {
                    that.model.bookmarkId = response.id;
                    that.unlockButton();
                    that.addOkIcon();
                },
                error: function (response, xhr) {
                    var errorMsg = '';
                    $.each(xhr.responseJSON, function(index, value) {
                        errorMsg += index + ': ' + value;
                    });

                    alert(errorMsg);
                }
            });
        }
    }

});
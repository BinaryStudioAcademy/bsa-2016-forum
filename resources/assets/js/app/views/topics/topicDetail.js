var Marionette = require('backbone.marionette');
var Bookmark = require('../../models/BookmarkModel');
var currentUser = require('../../initializers/currentUser');
var moment = require('moment-timezone');
var config = require('config');

module.exports = Marionette.ItemView.extend({
    template: 'topicDetail',

    ui: {
        bookmarkTopic: '.bookmark-btn'
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

    serializeData: function () {
        return {
            model: this.model.toJSON(),
            createdDate: moment.utc(this.model.get('created_at')).tz(config.timeZone).format('DD.MM.YYYY HH:mm')
        };
    },

    onRender: function () {
        var meta = this.model.getMeta();

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
                    that.$('i.bookmarked').remove();
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
var Marionette = require('backbone.marionette');
var Bookmark = require('../../models/BookmarkModel');
var currentUser = require('../../initializers/currentUser');
var dateHelper = require('../../helpers/dateHelper');
var $ = require('jquery');
var SubscribeBehavior = require('../subscribeBehavior');

module.exports = Marionette.ItemView.extend({
    template: 'topicItem',
    className: 'row post-item',
    tagName: 'div',

    ui: {
        bookmarkTopic: '.bookmark-btn',
        subscribeNotification: '.subscribe-btn'
    },

    events: {
        'click @ui.bookmarkTopic': 'bookmarkTopic'
    },

    behaviors: {
        SubscribeBehavior: {
            instance: 'Collection',
            behaviorClass: SubscribeBehavior,
            parent_url: _.result(currentUser, 'url'),
            target_type: 'Topic'
        }
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

    addOkBookmarkIcon: function () {
        this.ui.bookmarkTopic.append(' <i class="glyphicon glyphicon-ok bookmarked"></i>');
    },

    addOkSubscribeIcon: function () {
        this.ui.subscribeNotification.append(' <i class="glyphicon glyphicon-ok subscribed"></i>');
    },

    serializeData: function () {
        return {
            model: this.model.toJSON(),
            createdDate: dateHelper.shortDate(this.model.get('created_at'))
        };
    },

    onRender: function () {
        var meta = this.model.getMeta();

        if (meta && meta.bookmark) {
            var self = this;

            $.each(meta.bookmark, function(index, value) {
                if (value.topic_id == self.model.get('id')) {
                    self.model.bookmarkId = index;
                    return false;
                }
            });
        }

        if (this.model.bookmarkId) {
            this.addOkBookmarkIcon();
        }

        if (meta && meta.subscription && meta.subscription[this.model.attributes.id]) {
            this.addOkSubscribeIcon();
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
                    that.addOkBookmarkIcon();
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
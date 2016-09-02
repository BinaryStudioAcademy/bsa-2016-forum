var _ = require('underscore');
var Marionette = require('backbone.marionette');
var Bookmark = require('../../models/BookmarkModel');
var currentUser = require('../../initializers/currentUser');
var SubscribeBehavior = require('../subscribeBehavior');
var moment = require('momentjs');

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
            behaviorClass: SubscribeBehavior,
            parent_url: _.result(currentUser, 'url'),
            target_type: 'Topic'
        }
    },

    unlockButton: function (uiButton) {
        uiButton.removeAttr('disabled');
        uiButton.addClass('text-info');
        uiButton.removeClass('text-muted');
    },

    lockButton: function (uiButton) {
        uiButton.attr('disabled', 'disabled');
        uiButton.removeClass('text-info');
        uiButton.addClass('text-muted');
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
            createdDate: moment(this.model.get('created_at')).format('dd.MM.YYYY')
        };
    },

    onRender: function () {
        var meta = this.model.getMeta();

        if (meta && meta.bookmark && meta.bookmark[this.model.attributes.id]) {
            this.model.bookmarkId = meta.bookmark[this.model.attributes.id].id;
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

        this.lockButton(this.ui.bookmarkTopic);

        var that = this;

        if (this.model.bookmarkId) {
            bookmark.set({
                id: this.model.bookmarkId
            });
            bookmark.destroy({
                success: function () {
                    that.unlockButton(that.ui.bookmarkTopic);
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
                    that.unlockButton(that.ui.bookmarkTopic);
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
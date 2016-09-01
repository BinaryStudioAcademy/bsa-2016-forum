var _ = require('underscore');
var Marionette = require('backbone.marionette');
var Bookmark = require('../../models/BookmarkModel');
var Subscription = require('../../models/SubscriptionModel');
var currentUser = require('../../initializers/currentUser');
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
        'click @ui.bookmarkTopic': 'bookmarkTopic',
        'click @ui.subscribeNotification': 'subscribeNotification'
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

    addOkIcon: function (uiButton) {
        uiButton.append(' <i class="glyphicon glyphicon-ok bookmarked"></i>');
    },

    addOkSubscribeIcon: function (uiButton) {
        uiButton.append(' <i class="glyphicon glyphicon-ok subscribed"></i>');
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
            this.addOkIcon(this.ui.bookmarkTopic);
        }

        if (meta && meta.subscription && meta.subscription[this.model.attributes.id]) {
            this.addOkSubscribeIcon(this.ui.subscribeNotification);
        }

        if(!meta.subscription) {
            meta.subscription = {};
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
                    that.addOkIcon(that.ui.bookmarkTopic);
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
    },

    subscribeNotification: function () {
        var subscription = new Subscription();
        subscription.parentUrl = _.result(currentUser, 'url');
        this.lockButton(this.ui.subscribeNotification);

        var that = this;

        if (this.model.getMeta().subscription && this.model.getMeta().subscription[this.model.attributes.id]) {
            subscription.set({
                id: this.model.getMeta().subscription[that.model.attributes.id].id
            });
            subscription.destroy({
                success: function () {
                    that.unlockButton(that.ui.subscribeNotification);
                    that.$('i.subscribed').remove();
                    that.model.getMeta().subscription[that.model.attributes.id] = undefined;
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
            subscription.save({
                subscription_id: this.model.id,
                subscription_type: 'Topic'
            }, {
                success: function (response) {
                    that.model.getMeta().subscription[that.model.attributes.id] = response;
                    that.unlockButton(that.ui.subscribeNotification);
                    that.addOkSubscribeIcon(that.ui.subscribeNotification);
                },
                error: function (response, xhr) {
                    var errorMsg = '';
                    $.each(xhr.responseJSON, function(index, value) {
                        errorMsg += index + ': ' + value;
                    });
                    logger(errorMsg);
                }
            });
        }
    }
});
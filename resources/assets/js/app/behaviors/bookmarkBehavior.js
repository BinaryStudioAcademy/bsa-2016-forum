var _ = require("underscore");
var Marionette = require('backbone.marionette');
var Bookmark = require('../models/BookmarkModel');
var ConfirmDeleteView = require('./../views/bookmarks/bookmarkConfirmDeleteView');
var logger = require('../instances/logger');
var Radio = require('backbone.radio');
var app = require('../instances/appInstance');
var currentUser = require('../initializers/currentUser');

module.exports = Marionette.Behavior.extend({

    defaults: {
        "target_type": undefined
    },

    events: {
       'click @ui.bookmarkButton': 'changeBookmark'
    },

    onRender: function () {
        if(!_.isUndefined(this.view.model.getMeta())) {
            if (!_.isNull(this.view.model.getMetaById().bookmark))
                this.addOkIcon();
        }
    },

    unlockButton: function () {
        this.ui.bookmarkButton.removeAttr('disabled');
        this.ui.bookmarkButton.addClass('text-info');
        this.ui.bookmarkButton.removeClass('text-muted');
    },

    lockButton: function () {
        this.ui.bookmarkButton.attr('disabled', 'disabled');
        this.ui.bookmarkButton.removeClass('text-info');
        this.ui.bookmarkButton.addClass('text-muted');
    },

    addOkIcon: function () {
        this.ui.bookmarkButton.html('<i class="glyphicon glyphicon-ok bookmarked"></i> Bookmarked');
    },

    removeOkIcon: function () {
        this.ui.bookmarkButton.html('Bookmark');
    },

    saveBookmark: function(data) {
        this.view.model.getMetaById().bookmark = data;
    },

    getBookmark: function () {
        var model = this.view.model;
        if (_.isUndefined(model.getMetaById().bookmark) || _.isNull(model.getMetaById().bookmark)) {
            return undefined;
        } else {
            return model.getMetaById().bookmark;
        }
    },

    changeBookmark: function(e) {
        e.preventDefault();
        var bookmark = new Bookmark();
        
        var that = this;
        
        var bookmark_meta = that.getBookmark();

        if (bookmark_meta) {
            bookmark.set(bookmark_meta);

            var modal = new ConfirmDeleteView({
                model: bookmark,
                meta: that.view.model.toJSON(),
                target_type: that.options.target_type
            });

            modal.listenTo(Radio.channel('subscriptionChannel'), 'unbookmarked', function () {
                that.unlockButton();
                that.removeOkIcon();
                that.saveBookmark(undefined);
            });

            app.renderModal(modal);

        } else {
            this.lockButton();
            bookmark.save({
                topic_id: this.view.model.id,
                user_id: currentUser.id
            }, {
                success: function (response) {
                    that.saveBookmark(response.toJSON());
                    that.unlockButton();
                    that.addOkIcon();
                },
                error: function (response, xhr) {
                    var errorMsg = '';
                    $.each(xhr.responseJSON, function (index, value) {
                        errorMsg += index + ': ' + value;
                    });
                    logger(errorMsg);
                }
            });
        }
    }
});
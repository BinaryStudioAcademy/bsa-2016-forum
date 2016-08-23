var Marionette = require('backbone.marionette');
var Bookmark = require('../../models/BookmarkModel');

module.exports = Marionette.ItemView.extend({
    template: 'topicDetail',

    ui: {
        bookmarkTopic: '.bookmark-btn'
    },

    events: {
        'click @ui.bookmarkTopic': 'bookmarkTopic'
    },

    onRender: function () {
        var meta = this.model.getMeta();

        if (meta.bookmark) {
            this.model.bookmarkId = meta.bookmark.id;
        }

        if (this.model.bookmarkId) {
            this.ui.bookmarkTopic.append(' <i class="glyphicon glyphicon-ok bookmarked"></i>');
            this.ui.bookmarkTopic.addClass('bookmarked');
        }
    },

    bookmarkTopic: function () {
        var bookmark = new Bookmark();

        this.ui.bookmarkTopic.attr('disabled', 'disabled');
        this.ui.bookmarkTopic.removeClass('text-info');
        this.ui.bookmarkTopic.addClass('text-muted');

        if (this.model.bookmarkId) {
            bookmark.set({
                id: this.model.bookmarkId
            });
            bookmark.destroy({
                success: function () {
                    $('.bookmark-btn').removeAttr('disabled');
                    $('.bookmark-btn').addClass('text-info');
                    $('.bookmark-btn').removeClass('text-muted');
                    $('i.bookmarked').remove();

                    //this.model.bookmarkId = undefined;
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
                user_id: 2,
            }, {
                success: function (response) {
                    //this.model.bookmarkId = response.id;

                    $('.bookmark-btn').removeAttr('disabled');
                    $('.bookmark-btn').addClass('text-info');
                    $('.bookmark-btn').removeClass('text-muted');
                    $('.bookmark-btn').append(' <i class="glyphicon glyphicon-ok bookmarked"></i>');
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
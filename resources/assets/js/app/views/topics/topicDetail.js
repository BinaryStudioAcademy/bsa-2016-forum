var Marionette = require('backbone.marionette');
var Bookmark = require('../../models/BookmarkModel');

module.exports = Marionette.ItemView.extend({
    template: 'topicDetail',

    ui: {
        bookmarkTopic: '.bookmark-btn'
    },

    events: {
        'click @ui.bookmarkTopic': 'addBookmark'
    },

    onRender: function () {
        var meta = this.model.getMeta();

        if (meta.bookmark) {
            this.ui.bookmarkTopic.append(' <i class="glyphicon glyphicon-ok"></i>');
        }
    },

    addBookmark: function () {
        var bookmark = new Bookmark();

        this.ui.bookmarkTopic.attr('disabled', 'disabled');
        this.ui.bookmarkTopic.removeClass('text-info');
        this.ui.bookmarkTopic.addClass('text-muted');

        bookmark.save({
            topic_id: this.model.id,
            user_id: 2,
        }, {
            success: function () {
                $('.bookmark-btn').removeAttr('disabled');
                $('.bookmark-btn').addClass('text-info');
                $('.bookmark-btn').removeClass('text-muted');
                $('.bookmark-btn').append(' <i class="glyphicon glyphicon-ok"></i>');
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
});
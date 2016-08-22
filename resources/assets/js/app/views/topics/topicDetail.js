var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: 'topicDetail',
    events: {
        'click #bookmark-btn': 'addBookmark'
    },

    addBookmark: function () {
       var Bookmark = require('../../models/BookmarkModel');
       var bookmark = new Bookmark();

        $('#bookmark-btn').attr('disabled', 'disabled');
        $('#bookmark-btn').removeClass('text-info');
        $('#bookmark-btn').addClass('text-muted');

        bookmark.save({
            topic_id: 5,
            user_id: 2,
        }, {
            success: function (response) {
                $('#bookmark-btn').removeAttr('disabled');
                $('#bookmark-btn').addClass('text-info');
                $('#bookmark-btn').removeClass('text-muted');
                $('#bookmark-btn').append(' <i class="glyphicon glyphicon-ok"></i>');$("p").append(document.createTextNode(' <i class="glyphicon glyphicon-ok"></i>'));
            },
        });
    }
});
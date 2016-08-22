var Marionette = require('backbone.marionette');
var Bookmark = require('../../models/BookmarkModel');

module.exports = Marionette.ItemView.extend({
    template: 'topicDetail',
    events: {
        'click #bookmark-btn': 'addBookmark'
    },

    addBookmark: function () {
       var bookmark = new Bookmark();

        $('#bookmark-btn').attr('disabled', 'disabled');
        $('#bookmark-btn').removeClass('text-info');
        $('#bookmark-btn').addClass('text-muted');

        bookmark.save({
            topic_id: this.model.id,
            user_id: 2,
        }, {
            success: function () {
                $('#bookmark-btn').removeAttr('disabled');
                $('#bookmark-btn').addClass('text-info');
                $('#bookmark-btn').removeClass('text-muted');
                $('#bookmark-btn').append(' <i class="glyphicon glyphicon-ok"></i>');
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
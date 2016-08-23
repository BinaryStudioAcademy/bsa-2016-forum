var Marionette = require('backbone.marionette');
var Bookmark = require('../../models/BookmarkModel');

module.exports = Marionette.ItemView.extend({
    template: 'topicItem',
    className: 'row post-item',
    tagName: 'div',

    events: {
        'click .bookmark-btn': 'addBookmark'
    },

    addBookmark: function (e) {
        e.preventDefault();
        var element = $(e.currentTarget);
        var bookmark = new Bookmark();

        element.attr('disabled', 'disabled');
        element.removeClass('text-info');
        element.addClass('text-muted');

        bookmark.save({
            topic_id: this.model.id,
            user_id: 2,
        }, {
            success: function () {
                element.removeAttr('disabled');
                element.addClass('text-info');
                element.removeClass('text-muted');
                element.append(' <i class="glyphicon glyphicon-ok"></i>');
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
var Marionette = require('backbone.marionette');
var Bookmark = require('../../models/BookmarkModel');
var currentUser = require('../../initializers/currentUser');
var moment = require('momentjs');

module.exports = Marionette.ItemView.extend({
    template: 'topicItem',
    className: 'row post-item',
    tagName: 'div',

    ui: {
        bookmarkTopic: '.bookmark-btn',
        addLikeTopic: '.fa-star-o',
        removeLikeTopic: 'fa-star'
    },

    events: {
        'click @ui.bookmarkTopic': 'bookmarkTopic',
        'click @ui.addLikeTopic': 'addLikeTopic',
        'click @ui.removeLikeTopic': 'removeLikeTopic'
    },

    modelEvents: { change: 'render' },

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
        var style='';
        var href='';
        if(this.model.get('is_user'))
        {
            style = 'fa fa-star fa-2x';
            href =  '#topics/'+this.model.get('id')+'/likes/'+this.model.get('like_id');
        }
        else
        {
            style='fa fa-star-o fa-2x';
            href =  '#topics/'+this.model.get('id')+'/likes';
        }
        return {
            model: this.model.toJSON(),
            createdDate: moment(this.model.get('created_at')).format('dd.MM.YYYY'),
            style: style,
            href: href
        };
    },

    onRender: function () {
        var meta = this.model.getMeta();

        if (meta && meta.bookmark && meta.bookmark[this.model.attributes.id]) {
            this.model.bookmarkId = meta.bookmark[this.model.attributes.id].id;
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
    },
});
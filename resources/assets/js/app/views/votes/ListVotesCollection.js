var Marionette = require('backbone.marionette');
var ListVotesItem = require('./ListVotesItem'); 

module.exports = Marionette.CollectionView.extend({
    childView : ListVotesItem,

    initialize: function () {

        $(window).on('scroll', this.fetchPage.bind(this));

    },

    _page: 1,
    _allItemsUploaded: false,

    fetchPage: function () {
        var self = this;
        if (this.getScrollTop() < this.getDocumentHeight() - window.innerHeight) {
            return;
        }

        if (this._allItemsUploaded) {
            return;
        }

        this.collection.fetch({
            remove: false,
            data: {page: this._page + 1},
            error: function (collection, response) {
                self._allItemsUploaded = true;
                console.error(response.responseText);
            },
            success: function (collection, xhr) {
                if (!xhr.data.length) {
                    // all items has been uploaded
                    self._allItemsUploaded = true;
                } else {
                    this._page++;
                }
            }.bind(this)
        });
    },

    getDocumentHeight: function () {
        var body = document.body;
        var html = document.documentElement;

        return Math.max(
            body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight
        );
    },

    getScrollTop: function () {
        return (window.pageYOffset !== undefined) ?
            window.pageYOffset :
            (document.documentElement || document.body.parentNode || document.body).scrollTop;
    }
});

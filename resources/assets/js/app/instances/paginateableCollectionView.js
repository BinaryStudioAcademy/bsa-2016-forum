var Marionette = require('backbone.marionette');

module.exports = Marionette.CollectionView.extend({
    onShow: function () {
        if (!this.options.paginate) return;
        $(window).on('scroll', this.fetchPage.bind(this));
    },
    onDestroy: function() {
        $(window).off('scroll');
    },

    _page: 2,
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
            data: {page: this._page},
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

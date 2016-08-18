var Marionette = require('backbone.marionette');
var messageDialogItem = require('./messageDialogItem');

module.exports = Marionette.CollectionView.extend({
    childView: messageDialogItem,
    initialize: function(){
        this.listenTo(this.collection, "add", this.scrollDown);
    },
    childViewOptions : function () {
        return { 
            currentUser: this.options.currentUser,
            withUser: this.collection.getMeta().with_user
        }; 
    },

    scrollDown: function () {
        this._parent.$el.animate({ scrollTop: this.$el.prop("scrollHeight")}, 200);
    }
});

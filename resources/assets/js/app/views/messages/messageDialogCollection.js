var Marionette = require('backbone.marionette');
var messageDialogItem = require('./messageDialogItem');
var Radio = require('backbone.radio');

module.exports = Marionette.CollectionView.extend({
    childView: messageDialogItem,
    initialize: function(){
        this.listenTo(Radio.channel('messagesChannel'),'newMessageScroll', this.scrollDown);
    },
    childViewOptions : function () {
        return { 
            currentUser: this.options.currentUser,
            withUser: this.collection.getMeta().with_user
        }; 
    },

    scrollDown: function () {
        this._parent.$el.animate({ scrollTop: this.$el.prop("scrollHeight")}, 500);
    }
});

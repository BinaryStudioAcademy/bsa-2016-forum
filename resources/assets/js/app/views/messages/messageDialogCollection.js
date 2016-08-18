var Marionette = require('backbone.marionette');
var messageDialogItem = require('./messageDialogItem');

module.exports = Marionette.CollectionView.extend({
    childView: messageDialogItem,
    childViewOptions : function () { 
        Test = this;
        return { 
            currentUser: this.options.currentUser,
            withUser: this.collection._meta.with_user
        }; 
    }
});

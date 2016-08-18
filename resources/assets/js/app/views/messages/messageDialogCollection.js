var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var messageDialogItem = require('./messageDialogItem');

module.exports = Marionette.CollectionView.extend({
    childView: messageDialogItem,
    childViewOptions : function () { 
        Test = this;
        return { 
            currentUser: this.options.currentUser.toJSON(),
            withUser: this.collection._meta.with_user
        }; 
    }
});

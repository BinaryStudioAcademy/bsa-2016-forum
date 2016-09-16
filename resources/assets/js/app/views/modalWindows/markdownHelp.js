var Marionette = require('backbone.marionette');
var currentUser = require('../../initializers/currentUser');
var app = require('../../instances/appInstance');

module.exports = Marionette.ItemView.extend({
    template: 'markdownHelp',
   
    ui: {
        closeButton: '#closeWindow'
    },

    events: {
        'click @ui.closeButton': 'closeWindow'
    },



    closeWindow: function () {
        this.destroy();
    }
});

var Marionette = require('backbone.marionette'); 

module.exports = Marionette.LayoutView.extend({
    template: 'voteDetail',
    serializeData: function () {
        var data = this.model.toJSON();
        data._meta = this.model._meta;

        return data;
    }
});
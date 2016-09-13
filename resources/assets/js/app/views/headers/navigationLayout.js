var Marionette = require('backbone.marionette');
var NavigationCollectionView = require('./navigationCollection');
var currentUser = require('../../initializers/currentUser');

module.exports = Marionette.LayoutView.extend({
    template: 'navigationLayout',

    regions: {
        menuContainer: '#navig-menu'
    },

    onRender: function () {
        //console.log('nav-menu layout render');
        if(!currentUser.isAdmin()){
            this.collection.pop()
        }
        this.getRegion('menuContainer').show(new NavigationCollectionView({
            collection: this.collection
        }));
    },

    initialize: function (options) {

    }
});
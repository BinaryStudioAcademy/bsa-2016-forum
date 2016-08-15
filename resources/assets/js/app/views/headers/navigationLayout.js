var Marionette = require('backbone.marionette');
var NavigationCollectionView = require('./navigationCollection');
var NavigCollection = require('../../initializers/navigationCollection');

module.exports = Marionette.LayoutView.extend({
    template: 'navigationLayout',

    regions: {
        menuContainer: '#navig-menu'
    },

    onRender: function () {
        //console.log('nav-menu layout render');
        this.getRegion('menuContainer').show(new NavigationCollectionView({
            collection: NavigCollection
        }));
    },

    initialize: function (options) {
    }
});
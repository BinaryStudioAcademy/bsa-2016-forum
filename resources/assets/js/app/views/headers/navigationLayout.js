var Marionette = require('backbone.marionette');
var NavigationCollectionView = require('./navigationCollection');

module.exports = Marionette.LayoutView.extend({
    template: 'navigationLayout',
    className: 'subnavbar-inner',

    regions: {
        menuContainer: '#navig-menu'
    },

    onRender: function () {
        //console.log('nav-menu layout render');
        this.getRegion('menuContainer').show(new NavigationCollectionView({
            collection: this.collection
        }));
    }
});
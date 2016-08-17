var BaseCollection = require('../instances/Collection');
var NavigationModel = require('../models/NavigationModel');

module.exports = BaseCollection.extend({
    model: NavigationModel,

    setActive: function (name) {
        this.each(function (model) {
            model.set('active', (model.get('name') == name));
        });
    }
});


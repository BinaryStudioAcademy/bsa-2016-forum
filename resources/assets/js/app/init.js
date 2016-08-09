app = require('./app');
_ = require('underscore');
Backbone = require('backbone');
Marionette = require('backbone.marionette');
Handlebars = require('handlebars');
Templates = require('./templates.js')(Handlebars);

var Router = require('./routes.js');
var RouterApi = require('./router_api.js');

var headerView = require('./views/Header.js');

app.addRegions({
    main: '#main',
    header: '#header'
});

app.navigate = function (route, options) {
    options || (options = {});
    Backbone.history.navigate(route, options);
};

app.getCurrentRoute = function () {
    return Backbone.history.fragment
};

app.on('start', function () {

    new Router({
        controller: RouterApi
    });
    app.header.show(new headerView());
    //console.log('App init at ' + moment().locale('en').format('LLL'));
    Backbone.history.start();

    if (this.getCurrentRoute() === "") {
        Backbone.history.navigate('user', {
            trigger: true
        });
    }

});

app.start();

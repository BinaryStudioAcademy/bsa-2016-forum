var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');
var headerView = require('../views/headers/Header');
var navigationLayoutView = require('./headers/navigationLayout');
var config = require('config');

var mainLayoutView = Marionette.LayoutView.extend({
    el: 'body',
    template: 'mainLayout',
    regions: {
        header: '#header',
        navigationMenu: '#navigationMenu',
        content: '#main-content',
        breadCrumbs: '#breadcrumbs',
        modalWindow: '#modal-container'
    },
    onRender: function () {
        if(config.debug === false){
            var getHeader = function() {
                var request = new XMLHttpRequest();
                request.open('GET', 'http://team.binary-studio.com/app/header', true);
                request.send();
                request.onreadystatechange = function() {
                    if (request.readyState != 4) return;
                    if (request.status != 200) {
                        alert(request.status + ': ' + request.statusText);
                    } else {
                        var headerHtml = request.responseText;
                        var headerContainer = document.getElementById('header');
                        headerContainer.innerHTML =headerHtml;
                        headerFunction();
                    }
                };
            };
            getHeader();
        }

    },
    showRegions: function () {
        if(config.debug === true){
            this.getRegion('header').show(new headerView());
        }

        this.getRegion('navigationMenu').show(new navigationLayoutView({
            collection: this.collection
        }));
    }

});

module.exports = mainLayoutView;
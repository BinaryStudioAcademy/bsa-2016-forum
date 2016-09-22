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
    initExternalHeader: function () {
        var getHeader = function() {
            var request = new XMLHttpRequest();
            request.open('GET', config.externalHeaderLink, true);
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
    },
    onRender: function () {
        if(config.externalHeader){
            this.initExternalHeader();
        }

    },
    showRegions: function () {
        if(!config.externalHeader){
            this.getRegion('header').show(new headerView());
        }

        this.getRegion('navigationMenu').show(new navigationLayoutView({
            collection: this.collection
        }));
    }

});

module.exports = mainLayoutView;
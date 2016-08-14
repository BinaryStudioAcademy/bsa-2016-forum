var appInstance = {
    _instance: null,
    RootView: null,

    setInstance: function (instance) {
        this._instance = instance;
    },

    setRootLayout: function (rootView) {
        this.RootView = rootView;
    },

    showRootLayout: function () {
        this.RootView.render();
        this.RootView.showRegions();
    },

    getRootView: function () {
        return this.RootView;
    },

    getInstance: function () {
        return this._instance;
    },

    getBaseUrl: function () {
        return this._instance.config.baseUrl;
    },

    render: function (view) {
        this.RootView.getRegion('content').show(view);
    }
};

module.exports = appInstance;
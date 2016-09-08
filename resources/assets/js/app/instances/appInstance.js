var appInstance = {
    _instance: null,
    RootView: null,

    setInstance: function (instance) {
        this._instance = instance;
    },

    getInstance: function () {
        return this._instance;
    },

    getBaseUrl: function () {
        return this._instance.config.baseUrl;
    },

    render: function (view) {
        return this._instance.getRootLayout().getRegion('content').show(view);
    }

};

module.exports = appInstance;
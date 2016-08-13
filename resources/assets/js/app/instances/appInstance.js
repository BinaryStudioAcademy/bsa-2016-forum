var appInstance = {
  _instance: null,
  RootView: null,

  setInstance: function (instance) {
    this._instance = instance;
    this.setRootView(instance.RootView);
  },

  setRootView: function (rootView) {
    this.RootView = rootView;
  },

  getInstance: function () {
    return this._instance;
  },

  getBaseUrl: function() {
    return this._instance.config.baseUrl;
  },


};

module.exports = appInstance;
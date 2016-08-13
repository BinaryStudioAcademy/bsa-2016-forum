var appInstance = {
  instance: null,

  setInstance: function (instance) {
    this.instance = instance;
  },

  getInstance: function () {
    return this.instance;
  },

  getBaseUrl: function() {
    return this.instance.config.baseUrl;
  }
};

module.exports = appInstance;
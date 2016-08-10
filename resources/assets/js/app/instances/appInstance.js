var appInstance = {
  instance: null,

  setInstance: function (instance) {
    this.instance = instance;
  },

  getInstance: function () {
    return this.instance;
  }
};

module.exports = appInstance;
define(
  ['config/config.common', 'config/config.local'],
  function (commonConfig, localConfig) {
    var addConfigMethods = function (config) {
      config.api.getUrl = function () {
        return this.protocol + '://' + this.domain + (this.port ? ':' + this.port : '') + this.urlBase;
      };
    };

    var getConfigObject = function () {
      var config = _.merge(commonConfig, localConfig);
      addConfigMethods(config);
      return config;
    };

    return getConfigObject();
  }
);

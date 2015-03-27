define(
  ['config/config'],
  function (config) {
    config.api.getUrl = function () {
      return this.protocol + '://' + this.domain + (this.port ? ':' + this.port : '') + this.urlBase;
    };
    return config;
  }
);

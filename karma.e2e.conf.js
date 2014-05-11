module.exports = function (config){
    config.set({

        basePath : '',

        files : [
            'js/vendor/amd-angular-scenario.js',
            'test/e2e/*.js'
        ],

        autoWatch : true,

        browsers : ['Chrome', 'Firefox', 'PhantomJS'],

        frameworks: ['ng-scenario'],

        singleRun : false,

        proxies : {
          '/': 'http://localhost:8080/'
        },

        logLevel : config.LOG_WARN,

        plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-ng-scenario'    
        ],

        urlRoot: '/__karma/'

    }
)};

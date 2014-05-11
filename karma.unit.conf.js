module.exports = function (config){
    config.set({

        basePath : '',

        files : [
          {pattern: 'js/src/**/*.js', included: false},
          {pattern: 'test/unit/**/*Spec*.js', included: false},
          'test/unit/main.js'
        ],

        exclude : [
          'js/src/main.js'
        ],

        autoWatch : true,

        browsers : ['Chrome', 'Firefox', 'PhantomJS'],

        frameworks: ['jasmine', 'requirejs'],

        singleRun : false,

        plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine', 
            'karma-requirejs', 
        ],

        reporters : ['dots'],



        port : 9877,

        runnerPort : 9101,

        logLevel : config.LOG_WARN

    }
)};
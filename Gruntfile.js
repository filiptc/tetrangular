module.exports = function (grunt) {

  var VENDOR_DIR = 'web/js/vendor';
  var COMPILED_DIR = 'web/js/dist';
  var CSS_DIR = 'web/css';
  var SASS_CACHE_DIR = '.sass-cache';
  var MAIN_JS = 'mainLoad';
  var APP_PATH = 'web/js/src/' + MAIN_JS + '.js';

  var gruntConfig = {
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      scss: {
        files: ['resources/sass/**/*.scss'],
        tasks: ['sass:development', 'beep']
      }
    },
    clean: {
      'vendor': [VENDOR_DIR],
      'css-folder': [CSS_DIR],
      'sass-cache': [SASS_CACHE_DIR],
      'minified-js': [COMPILED_DIR],
      'prod-index-file': ['web/index.html']
    },
    bower: {
      install: {
        options: {
          targetDir: './' + VENDOR_DIR
        }
      },
      'inject-to-requireJs': {
        rjsConfig: APP_PATH,
        options: {
          exclude: ['requirejs', 'jquery', 'angular', 'lodash']
        }
      }
    },
    sass: {
      production: {
        options: {
          quiet: true,
          compass: true,
          style: 'compressed'
        },
        files: {
          'web/css/screen.css': 'resources/sass/screen.scss'
        }
      },
      development: {
        options: {
          compass: true,
          sourcemap: true,
          style: 'expanded'
        },
        files: {
          'web/css/screen.css': 'resources/sass/screen.scss'
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          mainConfigFile: APP_PATH,
          findNestedDependencies: true,
          removeCombined: true,
          dir: COMPILED_DIR,
          modules: [
            {
              name: MAIN_JS,
              exclude: ['infrastructure']
            },
            {
              name: 'infrastructure'
            }
          ],
          paths: {
            jquery: 'empty:',
            angular: 'empty:',
            lodash: 'empty:',
            facebook: 'empty:'
          }
        }
      }
    },
    copy: {
      'create-prod-index': {
        files: [
          {src: 'web/index-dev.html', dest: 'web/index.html'},
        ]
      }
    },
    replace: {
      'main-js-reference': {
        src: ['web/index.html'],
        overwrite: true,
        replacements: [{
          from: '/js/src/mainLoad',
          to: '/js/dist/mainLoad'
        }]
      }
    },
    stripDebug: {
      dist: {
        files: {/* See below */}
      }
    },
    'cache-busting': {
      mainJs: {
        replace: ['web/index.html'],
        replacement: MAIN_JS,
        file: COMPILED_DIR + '/' + MAIN_JS + '.js',
        cleanup: true
      },
      infrastructureJs: {
        replace: [COMPILED_DIR + '/' + MAIN_JS + '*.js'],
        replacement: 'infrastructure',
        file: COMPILED_DIR + '/infrastructure.js',
        cleanup: true
      },
      css: {
        replace: ['web/index.html'],
        replacement: 'screen.css',
        file: 'web/css/screen.css',
        cleanup: true
      }
    }
  };

  gruntConfig.stripDebug.dist.files[COMPILED_DIR + '/' + MAIN_JS +'.js'] = COMPILED_DIR + '/' + MAIN_JS +'.js'

  // Project configuration.
  grunt.initConfig(gruntConfig);
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-bower-requirejs');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-strip-debug');
  grunt.loadNpmTasks('grunt-cache-busting');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-beep');

  var prodTasks = [
    'clean:vendor',
    'bower:install',
    'bower:inject-to-requireJs',
    'clean:css-folder',
    'clean:sass-cache',
    'sass:production',
    'clean:minified-js',
    'requirejs:compile',
    'clean:prod-index-file',
    'copy:create-prod-index',
    'replace:main-js-reference',
    'stripDebug',
    'cache-busting'
  ];

  var devTasks = [
    'clean:vendor',
    'bower:install',
    'bower:inject-to-requireJs',
    'clean:css-folder',
    'clean:sass-cache',
    'sass:development',
    'clean:minified-js',
    'clean:prod-index-file'
  ];

  grunt.registerTask('default', prodTasks);
  grunt.registerTask('production', prodTasks);
  grunt.registerTask('development', devTasks);
  grunt.registerTask('watcher', ['watch:scss']);
};

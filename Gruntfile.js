module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            vendors: {
                src: 'resources/assets/js/vendors.js',
                dest: 'public/js/vendors.js'
            },
            app: {
                src: 'resources/assets/js/app/app.js',
                dest: 'public/js/bundle.js'
            }
        },
        watch: {
            js: {
                files: 'resources/assets/js/**/*.js',
                tasks: 'browserify:dev'
            },
            css: {
                files: 'resources/assets/css/**/*.css',
                tasks: 'concat:dev'
            },
            templates: {
                files: 'resources/assets/templates/**/*.tpl',
                tasks: 'handlebars'
            }
        },
        handlebars: {
            options: {
                processName: function (filepath) {
                    var name = filepath.split('/');
                    return name[name.length - 1];
                },
                commonjs: true
            },
            dist: {
                files: {
                    'resources/assets/js/app/templates.js': ['resources/assets/templates/**/*.tpl']
                }
            }
        },
        concat: {
            prod: {
                src: ['resources/assets/css/header-styles.css', 'resources/assets/css/style.css'],
                dest: 'resources/assets/css/concated/css-concat.css'
            },
            dev: {
                src: 'resources/assets/css/*.css',
                dest: 'public/css/styles-min.css'
            }
        },
        uglify: {
            vendors: {
                src: 'public/js/vendors.js',
                dest: 'public/js/vendors.js'
            },
            app: {
                src: 'public/js/bundle.js',
                dest: 'public/js/bundle.js'
            }
        },
        cssmin: {
            dist: {
                files: {
                    'public/css/styles-min.css': ['resources/assets/css/concated/css-concat.css'],
                    'public/css/vendors-min.css': ['public/css/vendors-min.css']
                }
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    loadPath: 'node_modules/bootstrap-sass/assets/stylesheets'
                },
                files: {
                    'public/css/vendors.css': 'resources/assets/sass/vendors.scss'
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('dev', ['handlebars', 'browserify', 'concat:dev', 'watch']);
    grunt.registerTask('stage', ['handlebars', 'browserify', 'concat:dev', 'sass']);
    grunt.registerTask('prod', ['handlebars', 'browserify', 'uglify', 'concat:prod', 'cssmin']);

    grunt.registerTask('default', ['stage']);
    grunt.registerTask('w', ['watch']);
};
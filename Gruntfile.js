module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        browserify: {
            app: {
                src: 'resources/assets/js/app/app.js',
                dest: 'public/js/bundle.js'
            },
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
            css: {
                src: ['public/css/styles.css', 'resources/assets/css/*.css'],
                dest: 'public/css/styles.css'
            },
            vendors_css: {
                // css вендоров пока нету
            },
            js: {
                src: [
                    'node_modules/jquery/dist/jquery.min.js',
                    'node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js',
                    'public/js/bundle.js'
                ],
                dest: 'public/js/bundle.js'
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    //loadPath: 'node_modules/bootstrap-sass/assets/stylesheets'
                },
                files: {
                    'public/css/styles.css': 'resources/assets/sass/**/*.scss',
                }
            }
        },

        uglify: {
            app: {
                src: 'public/js/bundle.js',
                dest: 'public/js/bundle.min.js'
            }
        },

        cssmin: {
            dist: {
                files: {
                    'public/css/styles.css': ['public/css/styles.css'],
                }
            }
        },

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('stage', ['browserify', 'handlebars', 'sass', 'concat']);
    grunt.registerTask('dev', ['stage', 'watch']);
    grunt.registerTask('prod', ['stage', 'uglify', 'cssmin']);

    grunt.registerTask('w', ['watch']);
    grunt.registerTask('default', ['stage']);
};
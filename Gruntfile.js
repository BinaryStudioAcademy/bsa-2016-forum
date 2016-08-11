module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        browserify: {
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
                tasks: 'concat:css'
            },
            templates: {
                files: 'resources/assets/templates/**/*.tpl',
                tasks: 'handlebars'
            },
            sass: {
                files: 'resources/assets/sass/**/*.scss',
                tasks: ['sass:dest', 'concat:css']
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
                src: [
                    'public/css/bootstrap.css',
                    'resources/assets/css/*.css',
                    'public/css/styles.css',
                ],
                dest: 'public/css/styles.css'
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
            bootstrap: {
                options: {
                    style: 'expanded',
                    loadPath: 'node_modules/bootstrap-sass/assets/stylesheets'
                },
                files: {
                    'public/css/bootstrap.css': 'resources/assets/sass/vendors.scss'
                }
            },
            dest: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'public/css/styles.css': 'resources/assets/sass/styles.scss'
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
                    'public/css/styles.css': ['public/css/styles.css']
                }
            }
        },

        copy: {
            bootstrap_fonts: {
                files: [
                    // includes files within path and its sub-directories
                    {
                        expand: true,
                        flatten: true,
                        src: [
                            'node_modules/bootstrap-sass/assets/fonts/**/*.woff2',
                            'node_modules/bootstrap-sass/assets/fonts/**/*.woff',
                            'node_modules/bootstrap-sass/assets/fonts/**/*.ttf',

                        ],
                        dest: 'public/fonts/bootstrap'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('stage', ['handlebars', 'browserify', 'sass', 'concat', 'copy']);
    grunt.registerTask('dev', ['stage', 'watch']);
    grunt.registerTask('prod', ['stage', 'uglify', 'cssmin']);

    grunt.registerTask('w', ['watch']);
    grunt.registerTask('default', ['stage']);
};
module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        browserify: {
            dev: {
                options: {
                    alias: {
                        'config': './resources/assets/js/app/config/debug/config.js'
                    },
                    browserifyOptions: {
                        debug: true
                    }
                },
                src: 'resources/assets/js/app/app.js',
                dest: 'public/js/bundle.js',
            },
            prod: {
                options: {
                    alias: {
                        'config': './resources/assets/js/app/config/prod/config.js'
                    }
                },
                src: 'resources/assets/js/app/app.js',
                dest: 'public/js/bundle.js',
            }
        },

        watch: {
            js: {
                files: 'resources/assets/js/**/*.js',
                tasks: 'browserify:dev'
            },
            templates: {
                files: 'resources/assets/templates/**/*.hbs',
                tasks: 'handlebars'
            },
            sass: {
                files: 'resources/assets/sass/**/*.scss',
                tasks: 'sass:index'
            }
        },

        handlebars: {
            options: {
                processName: function (filepath) {
                    var name = filepath.split('/');
                    return name[name.length - 1].split('.')[0];
                },
                commonjs: true
            },
            dist: {
                files: {
                    'resources/assets/js/app/templates.js': ['resources/assets/templates/**/*.hbs']
                }
            }
        },

        sass: {
            index: {
                options: {
                    loadPath: [
                        'node_modules/bootstrap-sass/assets/stylesheets',
                        'node_modules/dropzone/src',
                    ]
                },
                files: {
                    'public/css/styles.css': 'resources/assets/sass/index.scss'
                }
            },
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
                    {
                        expand: true,
                        flatten: true,
                        src: [
                            'node_modules/bootstrap-sass/assets/fonts/**/*.woff2',
                            'node_modules/bootstrap-sass/assets/fonts/**/*.woff',
                            'node_modules/bootstrap-sass/assets/fonts/**/*.ttf'
                        ],
                        dest: 'public/fonts/bootstrap'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('stage', ['handlebars', 'sass', 'copy']);
    grunt.registerTask('dev', ['stage', 'browserify:dev', 'watch']);
    grunt.registerTask('prod', ['stage', 'browserify:prod', 'uglify', 'cssmin']);

    grunt.registerTask('w', ['watch']);
    grunt.registerTask('default', []);
};
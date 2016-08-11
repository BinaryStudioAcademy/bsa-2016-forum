module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        browserify: {
            prod: {
                src: 'resources/assets/js/app/app.js',
                dest: 'public/js/bundle.js'

            },
            dev: {
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

        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    sourcemap: 'none',
                },
                files: [{
                    expand: true,
                    cwd: 'resources/assets/sass',
                    src: ['**/*.scss'],
                    dest: 'resources/assets/css/',
                    ext: '.css'
                }]
            }
        },

        concat: {
            dev: {
                src: [
                    'resources/assets/css/header-styles.css',
                    'resources/assets/css/style.css',
                    'resources/assets/css/app.css'
                ],
                dest: 'public/css/styles-min.css'
            },
            prod: {
                src: 'resources/assets/css/**/*.css',
                dest: 'public/css/styles-min.css'
            }
        },

        uglify: {
            javascript: {
                src: 'public/js/bundle.js',
                dest: 'public/js/bundle.js'
            }
        },

        cssmin: {
            dist: {
                files: {
                    'public/css/styles-min.css': ['public/css/styles-min.css']
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

    grunt.registerTask('stage', ['handlebars', 'browserify:dev', 'sass', 'concat:dev']);
    grunt.registerTask('dev', ['stage', 'watch']);
    grunt.registerTask('prod', ['handlebars', 'browserify:prod', 'sass', 'concat:prod', 'uglify', 'cssmin']);
    grunt.registerTask('w', ['watch']);
    grunt.registerTask('default', ['stage']);
};
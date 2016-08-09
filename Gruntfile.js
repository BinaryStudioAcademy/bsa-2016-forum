module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            prod: {
                src: 'resources/assets/js/app/init.js',
                dest: 'resources/assets/js/bundle.js'

            },
            dev: {
                src: 'resources/assets/js/app/init.js',
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
                src: 'resources/assets/css/*.css',
                dest: 'resources/assets/css/concated/css-concat.css'
            },
            dev: {
                src: 'resources/assets/css/*.css',
                dest: 'public/css/styles-min.css'
            }
        },
        uglify: {
            javascript: {
                src: 'resources/assets/js/bundle.js',
                dest: 'public/js/bundle.js'
            }
        },
        cssmin: {
            dist: {
                files: {
                    'public/css/styles-min.css': ['resources/assets/css/concated/css-concat.css']
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

    grunt.registerTask('dev', ['handlebars', 'browserify:dev', 'concat:dev', 'watch']);
    grunt.registerTask('stage', ['handlebars', 'browserify:dev', 'concat:dev']);
    grunt.registerTask('prod', ['handlebars', 'browserify:prod', 'uglify', 'concat:prod', 'cssmin']);

    grunt.registerTask('default', ['browserify:dev', 'jst:dev', 'concat:dev']);
    grunt.registerTask('w', ['watch']);
};
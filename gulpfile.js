'use strict';

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require("gulp-rename"),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cleanCSS = require('gulp-clean-css'),
    handlebars = require('gulp-handlebars'),
    wrap = require('gulp-wrap'),
    declare = require('gulp-declare'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    util = require('gulp-util'),
    del = require('del'),
// debug = require('gulp-debug'),
    concat = require('gulp-concat');

var appNamespace = 'APP';

var cfg = {
    prod: !!util.env.prod
};

var customConfig = './resources/assets/js/app/config/config.custom.js';
var fs = require('fs');

try {
    fs.accessSync(customConfig);
} catch (e) {
    var content = 'module.exports = {};';
    fs.writeFileSync(customConfig, content);
}

gulp.task('clean', function () {
    return del([
        'public/css/*',
        'public/fonts/**/*',
        'public/js/*'
    ]);
});

gulp.task('sass', function () {
    return gulp.src('resources/assets/sass/index.scss')
        .pipe(cfg.prod ? util.noop() : sourcemaps.init())
        .pipe(sass({
            includePaths: [
                'node_modules/bootstrap-sass/assets/stylesheets',
                'node_modules/dropzone/src',
                'node_modules/nprogress'
            ]
        }))
        .pipe(cfg.prod ? cleanCSS() : util.noop())
        .pipe(rename('styles.css'))
        .pipe(cfg.prod ? util.noop() : sourcemaps.write('.'))
        .pipe(gulp.dest('public/css'));
});

gulp.task('tmpl', function () {
    return gulp.src('resources/assets/templates/**/*.hbs')
        .pipe(handlebars({
            handlebars: require('handlebars')
        }))
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: appNamespace,
            noRedeclare: true
        }))
        .pipe(concat('templates.js'))
        .pipe(wrap('module.exports = function(Handlebars) { <%= contents %> return this["' + appNamespace + '"];};'))
        .pipe(gulp.dest('resources/assets/js/app'));
});

gulp.task('copy', function () {
    return gulp.src([
        'node_modules/bootstrap-sass/assets/fonts/**/*.woff2',
        'node_modules/bootstrap-sass/assets/fonts/**/*.woff',
        'node_modules/bootstrap-sass/assets/fonts/**/*.ttf',
        'node_modules/font-awesome/fonts/**/*'
    ])
        .pipe(gulp.dest('./public/fonts/'));
});

function js() {
    var browserifyOpt = {
        entries: './resources/assets/js/app/app.js',
        debug: true
    };
    var appConfig = './resources/assets/js/app/config/config.dev.js';
    if (cfg.prod) {
        appConfig = './resources/assets/js/app/config/config.prod.js';
        browserifyOpt.debug = false;
    }
    var b = browserify(browserifyOpt)
        .require('./resources/assets/js/app/config/common.js', {expose: 'config'})
        .require(appConfig, {expose: 'configBuild'});

    return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        // .pipe(cfg.prod ? util.noop() : sourcemaps.init({loadMaps: true}))
        .pipe(cfg.prod ? uglify() : util.noop())
        // .pipe(cfg.prod ? util.noop() : sourcemaps.write('.'))
        .pipe(gulp.dest('./public/js'));
}

gulp.task('js:firstrun', ['tmpl'], js);

gulp.task('js', js);

gulp.task('watch', ['js:firstrun'], function() {
    gulp.watch('resources/assets/sass/**/*.scss', ['sass', 'css-concat']);
    gulp.watch('resources/assets/templates/**/*.hbs', ['tmpl']);
    gulp.watch('resources/assets/js/**/*.js', ['js']);
});

gulp.task('css-concat', ['sass'], function () {
    return gulp.src(['public/css/styles.css', 'node_modules/bootstrap-datetime-picker/css/bootstrap-datetimepicker.css', 'node_modules/bootstrap-tokenfield/dist/css/bootstrap-typeahead.css', 'node_modules/bootstrap-tokenfield/dist/css/bootstrap-tokenfield.css', 'node_modules/jquery-ui-browserify/themes/base/*.css'])
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('public/css'));
});

var tasks = ['clean', 'js:firstrun', 'sass', 'copy', 'css-concat'];
if (!cfg.prod) {
    tasks.push('watch');
}

gulp.task('default', tasks);



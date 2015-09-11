/**
 * Created by fabio on 09/09/15.
 */
var rootPath = __dirname+'/';
var GULP_FILE = 'gulpfile.js';

var SOURCES_JS = [
    rootPath+'public/**/*.js',
    '!'+rootPath+'public/bower_components/**/*.js',
    '!'+rootPath+'public/_dist/*.js',
];

var SOURCES_JS_DIST = [
    rootPath+'public/_dist/**/*.min.js',
    '!'+rootPath+'public/bower_components/**/*.js',
];

var SOURCES_HTML = [
    rootPath+'public/**/*.html'
];

var SOURCES_CSS = [
    rootPath+'public/**/*.css',
    '!'+rootPath+'public/bower_components/**/*.css',
    '!'+rootPath+'public/_dist/*.css'
];

var SOURCES_CSS_DIST = [
    rootPath+'public/_dist/**/*.min.css',
    '!'+rootPath+'public/bower_components/**/*.css',
];

var SOURCES_SPEC = [
    rootPath+'tests/**/*.js'
];

var IS_DIST = false;
var DIST_JS = rootPath+ 'public/_dist';
var DIST_CSS = rootPath+ 'public/_dist';

var KARMA_CONF_FILE = rootPath + 'tests/karma.conf.js';
var SPEC_DIRECTORY = rootPath + 'tests/';
var SPEC_FILES = '"./**/*Spec.js"';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
gulp.task('server', ['jshint', 'inject'], function () {
    browserSync.init({
        open: false,
        notify: false,
        port: 3000,
        server: {
            baseDir: './public'
        }
    });
    gulp.watch(SOURCES_CSS).on('change', function () {
        gulp.start('inject');
        browserSync.reload();
    });
    gulp.watch(SOURCES_JS).on('change', function () {
        gulp.start('jshint', 'inject');
        browserSync.reload();
    });
    gulp.watch(SOURCES_HTML).on('change', browserSync.reload);
});

gulp.task('serverMin', ['isDist', 'server']);

// jshint
var jshint = require('gulp-jshint');
gulp.task('jshint', function () {
    var JSHINT_JS = SOURCES_JS.concat(GULP_FILE).concat(SOURCES_SPEC);

    return gulp.src(JSHINT_JS)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Inject
var inject = require('gulp-inject');
var wiredep = require('wiredep').stream;
gulp.task('inject', function () {
    var options = {
        read: false,
        ignorePath: ['public'],
        addRootSlash: false
    };

    var wiredepOptions = {
        directory: rootPath+'public/bower_components',
        exclude: rootPath+'public/bower_components/angular-mocks/angular-mocks.js'
    };

    var source_js = [];
    var source_css = [];

    if (IS_DIST) {
        source_js = SOURCES_JS_DIST;
        source_css = SOURCES_CSS_DIST;
    } else {
        source_js = SOURCES_JS;
        source_css = SOURCES_CSS;
    }

    return gulp.src(rootPath+'public/index.html')
        .pipe(inject(gulp.src(source_js), options))
        .pipe(inject(gulp.src(source_css), options))
        .pipe(wiredep(wiredepOptions))
        .pipe(gulp.dest(rootPath+'public'));
});

// Karma
gulp.task('inject-karma', function () {
    // Inject all SOURCE_JS files
    function injectAppJsFiles(filepath, i, length) {
        return '"..' + filepath + '"' + (i + 1 < length ? ',\n            ' : '');
    }

    // Inject SPEC files
    function injectSpecFiles(i, length, extracted) {
        if (i + 1 == length) {
            extracted = extracted + ',\n            ' + SPEC_FILES;
        }
        return extracted;
    }

    gulp.src(KARMA_CONF_FILE)
        .pipe(inject(gulp.src(SOURCES_JS, {read: false}), {
            starttag: 'files: [',
            endtag: ']',
            transform: function (filepath, file, i, length) {
                var extracted = injectAppJsFiles(filepath, i, length);
                return injectSpecFiles(i, length, extracted);
            }
        })).pipe(gulp.dest(SPEC_DIRECTORY));
});

// Tests
var argv = require('yargs').argv;
var Server = require('karma').Server;
gulp.task('test', ['inject-karma'], function (done) {
    var singleRun, browsers;
    if (argv.d) { // argument to debug
        singleRun = false;
        browsers = ['Chrome'];
    } else {
        singleRun = true;
        browsers = ['PhantomJS'];
    }

    new Server({
        browsers: browsers,
        configFile: KARMA_CONF_FILE,
        singleRun: singleRun
    }, function(karmaExitStatus) {
        if (karmaExitStatus) {
            process.exit(1);
        }
        done();
    }).start();
});

// Minify
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify'); // minify js
var minifycss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');

gulp.task('minify', ['minify-js', 'minify-css']);

gulp.task('minify-js', function () {
    return gulp.src(SOURCES_JS)
        .pipe(concat('all.js'))
        .pipe(gulp.dest(DIST_JS))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(DIST_JS));
});

gulp.task('minify-css', function() {
    return gulp.src(SOURCES_CSS)
        .pipe(concat('all.css'))
        .pipe(gulp.dest(DIST_CSS))
        .pipe(rename('all.min.css'))
        .pipe(sourcemaps.init())
        .pipe(minifycss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DIST_CSS));
});

var zip = require('gulp-zip');
gulp.task('dist', ['isDist', 'jshint', 'test', 'minify', 'inject'], function() {
    var source = ['public/**/*.*'];
    return gulp.src(source)
        .pipe(zip('secret_friend.zip'))
        .pipe(gulp.dest('dist'));
});

gulp.task('isDist', function() {
    IS_DIST = true;
});

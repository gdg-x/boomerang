var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var del = require('del');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');
var jscs = require('gulp-jscs');
var karma = require('karma').server;

var getBundleName = function () {
    var name = require(__dirname + '/package.json').name;
    return name + '.' + 'min';
};

var outputPath = __dirname + '/app/dist/';

gulp.task('clean', function (cb) {
    del([outputPath + '**'], cb);
});

gulp.task('jshint', ['clean'], function () {
    return gulp.src([
        __dirname + '/gulpfile.js',
        __dirname + '/app/**/**.js',
        __dirname + '/test/e2e/**.js',
        __dirname + '/test/unit/**.js',
        '!' + outputPath + '**'
    ])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('jscs', function () {
    return gulp.src([
        __dirname + '/gulpfile.js',
        __dirname + '/app/**/**.js',
        __dirname + '/test/e2e/**.js',
        __dirname + '/test/unit/**.js',
        '!' + outputPath + '**'
    ])
        .pipe(jscs({configPath: '.jscsrc'}));
});

/**
 * Run test once and exit
 */
gulp.task('karma', function (done) {
    karma.start({
        configFile: __dirname + '/test/unit/karma.conf.js',
        singleRun: true
    }, done);
});

gulp.task('karma-watch', function (done) {
    karma.start({
        configFile: __dirname + '/test/unit/karma.conf.js',
        singleRun: false,
        autoWatch: true
    }, done);
});

gulp.task('concat', ['clean'], function () {
    return gulp.src([
        __dirname + '/app/boomerang.module.js',
        __dirname + '/app/boomerang.config.js',
        __dirname + '/app/services/*.js',
        __dirname + '/app/**/**.js',
        '!' + outputPath + '**'
    ])
        .pipe(concat('boomerang.js'))
        .pipe(gulp.dest(outputPath));
});

gulp.task('javascript', ['clean', 'concat'], function () {
    var bundler = browserify({
        entries: [outputPath + 'boomerang.js'],
        debug: true
    });

    var bundle = function () {
        return bundler.bundle()
            .pipe(source(getBundleName() + '.js'))
            .pipe(buffer())
            .pipe(ngAnnotate())
            .pipe(sourcemaps.init({loadMaps: true}))
            // Add transformation tasks to the pipeline here.
            .pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(outputPath));
    };

    return bundle();
});

gulp.task('default', ['jshint', 'jscs', 'javascript']);

var gulp = require('gulp');
var gulpJshint = require('gulp-jshint');
var gulpConcat = require('gulp-concat');
var del = require('del');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');
var gulpJscs = require('gulp-jscs');
var karma = require('karma');
var gulpInject = require('gulp-inject');
var mainBowerFiles = require('main-bower-files');
var angularFilesort = require('gulp-angular-filesort');
var gulpFile = require('gulp-file');

const CDN_FILES = require(__dirname + '/config/CDN.json');
const outputPath = __dirname + '/app/dist/';

var getBundleName = function () {
    var name = require(__dirname + '/package.json').name;
    return name + '.' + 'min';
};

/**
 *  Tasks
 */
gulp.task('default', ['jshint', 'jscs', 'dev']);
gulp.task('clean', clean);
gulp.task('concat', ['clean'], concat);
gulp.task('jshint', ['clean'], jshint);
gulp.task('jscs', jscs);
gulp.task('dev', ['clean'], devBuild);
gulp.task('inject-cdn', injectCdn);
gulp.task('prod', ['jshint', 'jscs', 'concat', 'inject-cdn'], productionBuild);
gulp.task('karma', unitTests);
gulp.task('karma-watch', unitTestsWatch);

/**
 * Functions
 */
function clean(cb) {
    del([outputPath + '**'], cb);
}

function jshint() {
    return gulp.src([
        __dirname + '/gulpfile.js',
        __dirname + '/app/**/**.js',
        __dirname + '/test/e2e/**.js',
        __dirname + '/test/unit/**.js',
        '!' + outputPath + '**'
    ])
        .pipe(gulpJshint())
        .pipe(gulpJshint.reporter('default'))
        .pipe(gulpJshint.reporter('fail'));
}

function jscs() {
    return gulp.src([
        __dirname + '/gulpfile.js',
        __dirname + '/app/**/**.js',
        __dirname + '/test/e2e/**.js',
        __dirname + '/test/unit/**.js',
        '!' + outputPath + '**'
    ])
        .pipe(gulpJscs({configPath: '.jscsrc'}));
}

/**
 * Run test once and exit
 */
function unitTests(done) {
    new karma.Server({
        configFile: __dirname + '/test/unit/karma.conf.js',
        singleRun: true
    }, done).start();
}

function unitTestsWatch(done) {
    new karma.Server({
        configFile: __dirname + '/test/unit/karma.conf.js',
        singleRun: false,
        autoWatch: true
    }, done).start();
}

function concat() {
    return gulp.src([
        __dirname + '/app/boomerang.module.js',
        __dirname + '/app/boomerang.config.js',
        __dirname + '/app/services/*.js',
        __dirname + '/app/**/**.js',
        '!' + outputPath + '**'
    ])
        .pipe(gulpConcat('boomerang.js'))
        .pipe(gulp.dest(outputPath));
}

function productionBuild() {
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
            .pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(outputPath));
    };

    return bundle();
}

function injectCdn() {
    return gulp.src(__dirname + '/index.html')
        .pipe(gulpInject(
            gulpFile('cdn.css', '', { src: true })
                .pipe(gulpFile('cdn.js', '')),
            {
                name: 'bower',
                transform: function (filePath) {
                    var tags = '', jsIndex, cssIndex;
                    if (filePath.indexOf('.js') !== -1) {
                        var jsUrls = CDN_FILES.js;
                        for (jsIndex = 0; jsIndex < jsUrls.length; jsIndex++) {
                            tags += '<script src="' + jsUrls[jsIndex] + '"></script>\n';
                        }
                    } else {
                        var cssUrls = CDN_FILES.css;
                        for (cssIndex = 0; cssIndex < cssUrls.length; cssIndex++) {
                            tags += '<link rel="stylesheet" href="' + cssUrls[cssIndex] + '">\n';
                        }
                    }
                    return tags.substring(0, tags.length - 1);
                }
            }))
        .pipe(gulpInject(
            gulpFile('local.css', '', { src: true })
                .pipe(gulpFile('local.js', '')),
            {
                name: 'inject',
                transform: function (filePath) {
                    var tags = '';
                    if (filePath.indexOf('.js') !== -1) {
                        tags += '<script src="' + 'app/dist/' + getBundleName() + '.js' + '"></script>\n';
                    } else {
                        tags += '<link rel="stylesheet" href="' + 'app/css/gdg.css' + '">\n';
                    }
                    return tags.substring(0, tags.length - 1);
                }
            }))
        .pipe(gulp.dest(__dirname));
}

function devBuild() {
    var target = gulp.src(__dirname + '/index.html');
    var sources = gulp.src([__dirname + '/app/**/**.js'], {read: true});
    var styles = gulp.src([__dirname + '/app/**/**.css'], {read: false});

    return target
        .pipe(gulpInject(gulp.src(mainBowerFiles(), {read: false}), {name: 'bower'}))
        .pipe(gulpInject(sources.pipe(angularFilesort())))
        .pipe(gulpInject(styles))
        .pipe(gulp.dest(__dirname));
}

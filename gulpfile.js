'use strict';
// generated on 2015-01-30 using generator-gulp-foundation 0.0.3

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var gutil = require('gulp-util');
var ghPages = require('gulp-gh-pages');
var mainBowerFiles = require('main-bower-files');

// load plugins
var $ = require('gulp-load-plugins')();

gulp.task('styles', function () {
    return gulp.src('app/styles/**/*')
        .pipe($.sass({errLogToConsole: true}))
        .pipe($.autoprefixer('last 1 version'))
        .pipe($.csso())
        .pipe(gulp.dest('dist/styles'))
        .pipe(reload({stream:true}))
        .pipe($.size())
        .pipe($.notify("Compilation complete."));;
});

gulp.task('scripts', function () {
    return gulp.src('app/scripts/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter(require('jshint-stylish')))
        .pipe($.uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe($.size());
});

gulp.task('html', ['styles', 'scripts'], function () {
    return gulp.src('app/*.html')
        .pipe($.htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});

gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe(gulp.dest('dist/images'))
        .pipe(reload({stream:true, once:true}))
        .pipe($.size());
});

gulp.task('img', function () {
    return gulp.src('app/img/**/*')
        .pipe(gulp.dest('dist/img'))
        .pipe(reload({stream:true, once:true}))
        .pipe($.size());
});

gulp.task('bower', function () {
			return gulp.src(mainBowerFiles(), { base: 'app/bower_components' })
        .pipe(gulp.dest('dist/bower_components'))
        .pipe($.size());
});

gulp.task('build', ['html', 'images', 'img', 'bower', 'cname']);

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

gulp.task('serve', ['styles'], function () {
    browserSync.init(null, {
        server: {
            baseDir: 'dist',
            directory: true
        },
        debugInfo: false,
        open: false,
        hostnameSuffix: ".xip.io"
    }, function (err, bs) {
        require('opn')(bs.options.url);
        console.log('Started connect web server on ' + bs.options.url);
    });
});

// inject bower components
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;
    gulp.src('app/styles/*.scss')
        .pipe(wiredep({
            directory: 'app/bower_components'
        }))
        .pipe(gulp.dest('app/styles'));
    gulp.src('app/*.html')
        .pipe(wiredep({
            directory: 'app/bower_components',
            exclude: ['bootstrap-sass-official']
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('watch', ['serve'], function () {
    // watch for changes
    gulp.watch(['app/*.html'], reload);
    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch('app/images/**/*', ['images']);
    gulp.watch('app/img/**/*', ['img']);
    gulp.watch('bower.json', ['wiredep']);
});

gulp.task('cname', function() {
  return gulp.src('app/CNAME')
    .pipe(gulp.dest('dist'));
});

gulp.task('deploy', function () {
	return gulp.src('./dist/**/*')
	  .pipe(ghPages());
});
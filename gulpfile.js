'use strict';

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    cssnano = require('gulp-cssnano'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    util = require('gulp-util'),
    watch = require('gulp-watch');

// Configuration
var config = require('./gulp-config.js');

// Default task to watch all files.
gulp.task('default', ['sass', 'watch']);

// Gulp SASS Task
gulp.task('sass', function() {
    return gulp.src(config.path.sassRoot + config.fileNames.sassMain)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', util.log))
        .pipe(autoprefixer())
        // Write original file
        .pipe(gulp.dest(config.path.dist))
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write(config.path.sourcemaps))
        // Write minified file
        .pipe(gulp.dest(config.path.dist))
        .pipe(livereload())
        .pipe(notify('Built ' + config.fileNames.appCSS))
        ;
});

// Watch files
gulp.task('watch', function () {
    // Activate LiveReload
    livereload.listen();

    // Files to watch
    gulp.watch(config.path.sass, ['sass'], function() {
        // Tasks to run
        gulp.run('sass');
    });
});

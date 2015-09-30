'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var header = require('gulp-header');
var footer = require('gulp-footer');
var cached = require('gulp-cached');
var remember = require('gulp-remember');
var compass = require('gulp-compass');
var minifyCSS = require('gulp-minify-css');
var webserver = require('gulp-webserver');

var jsGlob = 'src/**/*.js';
var htmlGlob = 'src/modules/**/*.html';
var sassGlob = 'src/**/*.scss';
var dest = 'dist';

var gulp_src = gulp.src;
gulp.src = function() {
  return gulp_src.apply(gulp, arguments)
    .pipe(plumber(function(error) {
      // Output an error message
      gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
      // emit the end event, to properly end the task
      this.emit('end');
    })
  );
};

gulp.task('default', ['all','watch', 'webserver']);                // gulp will run through everything once first then set the watcher
gulp.task('all', ['js','sass']);                           // use 'gulp all' to run everything once

gulp.task('watch', function() {
  var watcher = gulp.watch(jsGlob, ['js']);             // watch the same files in our scripts task
  watcher.on('change', function (event) {
    if (event.type === 'deleted') {                         // if a file is deleted, forget about it
      delete cached.caches.scripts[event.path];       // gulp-cached remove api
      remember.forget('scripts', event.path);         // gulp-remember remove api
    }
  });
  gulp.watch(sassGlob, ['sass']);
});

gulp.task('js', function() {
  gulp.src(jsGlob)
		.pipe(cached('scripts'))            // only pass through changed files
		.pipe(jshint())                     // do special things to the changed files...
		.pipe(jshint.reporter())            // Dump results
		.pipe(remember('scripts'))          // add back all files to the stream
		.pipe(header('(function () {\n'))
		.pipe(footer('\n})();\n'))
		.pipe(gulp.dest(dest))
		.pipe(uglify())
		.pipe(rename({extname: '.min.js'}))
		.pipe(gulp.dest(dest));
});

gulp.task('sass', function () {
  gulp.src(sassGlob)
    .pipe(compass({
      css: 'dist/css',
      sass: 'src/sass',
      image: 'dist/images',
      comments: false
    }))
    .pipe(rename({dirname:'css'}))
    .pipe(gulp.dest(dest))
    .pipe(minifyCSS())
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest(dest));
});

gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

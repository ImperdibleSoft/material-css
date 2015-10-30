'use strict';

var gulp = require('gulp');
var cached = require('gulp-cached');
var clean = require('gulp-clean');
var compass = require('gulp-compass');
var concat = require('gulp-concat');
var filter = require('gulp-filter');
var inject = require('gulp-inject');
var jshint = require('gulp-jshint');
var mainBowerFiles = require('main-bower-files');
var minifyCSS = require('gulp-minify-css');
var plumber = require('gulp-plumber');
var remember = require('gulp-remember');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var webserver = require('gulp-webserver');

var devEnv = './src';
var prodEnv = './dist';
var htmlGlob = './src/templates/**/*.html';
var sassGlob = './src/**/*.scss';
var jsGlob = './src/controllers/**/*.js';

// Parse all ./src files into ./dist folder
gulp.task('build', ['index', 'html', 'sass', 'js']);

// Inject dependencies on index.html and launc webserver
gulp.task('default', ['inject', 'webserver']);

// Clean production directory
gulp.task('clean', function(){
  gulp.src(prodEnv + '/*', {read: false})
    .pipe(clean());

  console.log("Cleaning...");
});

// Parse index.html file and save it into ./dist/
gulp.task('index', function() {
	gulp.src('src/index.html')
		.pipe(gulp.dest(prodEnv));

  console.log("Moving index.html...");
});

// Parse html files and save them into ./dist/templates
gulp.task('html', function() {
  gulp.src(htmlGlob, {base: devEnv + '/modules'})
    .pipe(rename(function(path) {
      path.dirname += '/../';
    }))
    .pipe(gulp.dest(prodEnv+'/templates'));

  console.log("Moving HTML files...");
});

// Parse sass files and save them into ./dist/css
// Also move images and fonts
gulp.task('sass', function () {
  gulp.src(sassGlob)
    .pipe(compass({
      css: prodEnv + '/css',
      image: prodEnv + '/images',
      sass: devEnv + '/sass',
      comments: true
    }));

	gulp.src(devEnv + '/images/*.*')
		.pipe(gulp.dest(prodEnv + '/images'));

	gulp.src(devEnv + '/fonts/*.*')
		.pipe(gulp.dest(prodEnv + '/fonts'));

  console.log("Moving CSS files...");
});

// Parse js files and save them into ./dist/js
gulp.task('js', function(){
  gulp.src(jsGlob)
    .pipe(rename({dirname:'js'}))
    .pipe(gulp.dest(prodEnv));

  console.log("Moving JS files...");
});

// Inject files into ./dist/index.html
gulp.task('inject', function(){
  gulp.src(prodEnv + '/index.html')
    .pipe(inject(
      gulp.src([
        prodEnv + '/lib/jquery.js',
        prodEnv + '/lib/angular.js',
        prodEnv + '/lib/*.js',
        prodEnv + '/js/core.js',
        prodEnv + '/js/*.js'
      ]), {ignorePath: 'dist', addRootSlash: false}
    ))
    .pipe(inject(
      gulp.src([
        prodEnv + '/**/*-v.css',
        prodEnv + '/css/master.css',
        prodEnv + '/css/master.min.css'
      ]), {ignorePath: 'dist', addRootSlash: false}
    ))
    .pipe(gulp.dest(prodEnv));

  console.log("Injecting files into index.html...");
});

// Concat all CSS, Libraries and JS files on ./dist/css/main.css
gulp.task('compact', function(){

  // Compact CSS
  gulp.src(prodEnv + '/css/*.css')
    .pipe(clean())
    .pipe(minifyCSS())
    .pipe(concat('master.min.css'))
    .pipe(gulp.dest(prodEnv + '/css'));

  // Compact JS
  gulp.src([
    prodEnv + '/js/core.js',
    prodEnv + '/js/*.js'
  ])
    .pipe(clean())
    .pipe(concat('app.min.js'))
		.pipe(uglify())
    .pipe(gulp.dest(prodEnv + '/js'));

  // Compact Libs
  gulp.src([
    prodEnv + '/lib/jquery.js',
    prodEnv + '/lib/angular.js',
    prodEnv + '/lib/*.js'
  ])
    .pipe(clean())
    .pipe(concat('vendors.min.js'))
		.pipe(uglify())
    .pipe(gulp.dest(prodEnv + '/lib'));

  console.log("Minimizing files...");
});

// Watch for changes into ./src and make a new build
gulp.task('watcher', function(){
  gulp.watch([devEnv + '/**/*.scss'], ['sass']);
  gulp.watch([devEnv + '/**/*.js'], ['js']);
  gulp.watch([devEnv + '/**/*.html'], ['html']);
})

// Launch webserver
gulp.task('webserver', ['watcher'], function() {
  gulp.src(prodEnv)
    .pipe(webserver({
      host: '0.0.0.0',
      port: 8081,
      livereload: true,
      open: true
    }));
});

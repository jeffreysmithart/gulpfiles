"use strict";

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
    watch = require('gulp-watch'),
      del = require('del'),
      minify = require('gulp-minify-css');

gulp.task("concatScripts", function() {
    return gulp.src([
        'js/jquery.js',
        'js/sticky/jquery.sticky.js',
        'js/main.js'
        ])
    .pipe(maps.init())
    .pipe(concat('app.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('js'));
});

gulp.task("minifyScripts", ["concatScripts"], function() {
	return gulp.src("js/app.js")
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('js'));
});

gulp.task('compileSass', function() {
  return gulp.src("scss/application.scss")
      .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write('./'))
      .pipe(gulp.dest('css'));
})
gulp.task('minifyCSS', ['compileSass'], function(){
  return gulp.src('css/application.css')
  .pipe(minify())
  .pipe(rename('application.min.css'))
  .pipe(gulp.dest('css'));
});


gulp.task("clean", function(){
  del(['dist', 'css/application.css*', 'js/app*.js', 'js/app.js*']);
});

gulp.task('watchFiles', function(){
  gulp.watch(['scss/**/*.scss'],['compileSass']);
  gulp.watch(['js/main.js'],['concatScripts']);
});

gulp.task("serve", ['watchFiles']);

gulp.task("build", ['minifyScripts','compileSass'], function(){
  return gulp.src(["css/application.css", "js/app.min.js", "index.html", "img/**", "fonts/**"], {base: './'})
  .pipe(gulp.dest('dist'));
});

gulp.task("default", ["clean"], function() {
    gulp.start('build');
});
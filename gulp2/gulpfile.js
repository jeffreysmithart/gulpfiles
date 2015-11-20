'use strict';
var gulp = require('gulp'),
		sass = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer');

gulp.task("compileSass",function(){
	return gulp.src([
		'css/scss/bootstrap.scss'
		])
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('css'));
});

gulp.task('vendorPrefix', ["compileSass"], function () {
    return gulp.src('css/bootstrap.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('styles'));
});

gulp.task('watch', function(){
	gulp.watch(['css/scss/**/*.scss', 'css/scss/*.scss'],['vendorPrefix']);
});

gulp.task('default', ['watch']);
'use strict';

// Global
import gulp from 'gulp';
// JS specific
import concat from 'gulp-concat';
import eslint from 'gulp-eslint';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
// SCSS specific
import autoprefixer from 'gulp-autoprefixer';
import sass from 'gulp-sass';
// Image specific
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';

gulp.task('build-scss', () => {
  // Compile SCSS
  gulp.src('src/scss/mj_cos_styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('work/hubthemes/mj/custom/styles'));
});

gulp.task('build-js', () => {
  // Hinting for JS
  gulp.src('src/js/main.babel.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('work/hubthemes/mj/custom/page/mj_scripts'));
});

gulp.task('compress-images', () => {
  // Compress images
  return gulp.src('src/images/**/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()],
    }))
    .pipe(gulp.dest('work/hubthemes/mj/img/'));
});

// Watch task
gulp.task('watch', () => {
  gulp.watch('src/scss/**/**/*.scss', ['build-scss']);
  gulp.watch('src/js/main.babel.js', ['build-js']);
  gulp.watch('src/images/**', ['compress-images']);
});

// Make default task go to 'watch'
gulp.task('default', ['watch']);

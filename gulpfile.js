var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var imagemin = require('gulp-imagemin');
var reload = browserSync.reload;


// Browser synchronization
gulp.task('browser-sync', function () {
   browserSync.init ({
       server: {
           baseDir: "."
       }
   });

});

// Watch for changes in files
gulp.task('watch', function() {
    gulp.watch('src/scss/**/*.scss', ['styles']).on('change', browserSync.reload);
    gulp.watch('src/js/*.js', ['jshint', 'compress']).on('change', browserSync.reload);
    gulp.watch('index.html').on('change', browserSync.reload);
});


// Compile Sass to css and place it in css/styles.css
gulp.task('styles', function() {
  return gulp.src('src/scss/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(autoprefixer('last 2 version', 'ie 9'))
    .pipe(gulp.dest('css/'))
    .pipe(reload({stream:true}));

});

// Catch JS errors
gulp.task('jshint', function() {
    return gulp.src('src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
});

// Ugligy JS
gulp.task('compress', function() {
  return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('js/'));
});

// Minify CSS
gulp.task('cleanCSS', function() {
  return gulp.src('css/styles.css')
  	.pipe(rename({suffix: ".min"}))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('css/'));
});

// Minify IMG
gulp.task('img-minify', function() {
  return gulp.src('src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('img/'));
});

// All tasks together
gulp.task('src-ver', ['browser-sync', 'watch', 'styles']);
gulp.task('build', ['styles','jshint','compress', 'img-minify']);
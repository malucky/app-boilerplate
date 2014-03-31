var gulp = require('gulp');

var jade = require('gulp-jade');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-ruby-sass');
var livereload = require('gulp-livereload');
var jshint = require('gulp-jshint');
var browserify = require('gulp-browserify');

var paths = {
  scripts: ['public/scripts/*.js'],
  sass: ['public/styles/sass/*.scss'],
  html: ['public/*.html', 'public/views/*.html'],
  jade: ['public/views/jade/*.jade'],
  build: ['public/scripts/build/*.js']
};

gulp.task('server', function () {
  nodemon({
    script: 'app.js'
  });
});

gulp.task('lint', function () {
  return gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function () {
  // Single entry point to browserify
  return gulp.src(paths.scripts)
    .pipe(browserify({
      insertGlobals: true,
      debug: !gulp.env.production
    }))
    .pipe(gulp.dest('public/scripts/build/'))
    .pipe(livereload());
  // return gulp.src(paths.scripts)
  //   .pipe(plumber())
  //   .pipe(concat('all.min.js'))
  //   .pipe(uglify())
  //   .pipe(gulp.dest('public/scripts/min'))
  //   .pipe(livereload());
});

gulp.task('sass', function () {
  return gulp.src(paths.sass)
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('public/styles/'))
    .pipe(livereload());
});

gulp.task('templates', function () {
  var YOUR_LOCALS = {};

  return gulp.src(paths.jade)
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('public/'))
    .pipe(livereload());
});

gulp.task('html', function () {
  return gulp.src(paths.html)
    .pipe(livereload());
});

gulp.task('watch', function () {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.jade, ['templates']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.scripts, ['lint', 'scripts']);
});

gulp.task('default', ['server', 'sass', 'scripts', 'lint', 'watch']);
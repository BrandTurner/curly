// Require gulp deps
var path = require('path');
var nib = require('nib');
var gulp = require('gulp');
var concat = require('gulp-concat');
var del = require('del');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var jade = require('gulp-jade');
var data = require('gulp-data');
var stylus = require('gulp-stylus');

var src = {
  build: [
  "./src/app/app.js"
  ]
};

var out = {
  build: "./build"
};

gulp.task('clean', function(cb) {
  del(out.build, {
    force: true
  }, cb)
});

gulp.task('buildES6', ['clean'], function() {
  browserify({
    entries: src.build,
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('built.js'))
  .pipe(gulp.dest(out.build))
  ;
});

gulp.task('concat', ['clean'], function() {
  gulp.src(src.build, {
    base: './src'
  })
  .pipe(babel())
  .pipe(concat('built.js'))
  .pipe(gulp.dest(out.build));
});

//gulp.task('build', ['clean']);
gulp.task('default', ['buildES6']);

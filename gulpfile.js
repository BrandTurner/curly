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
  //"./src/app/shared/**/*.js",
  //"./src/app/components/**/*.js",
  "./src/app/app.js"//,
  //"./src/assets/**/*.*"],
  ],
  jade: ["./src/index.jade"],
  fonts: ["./src/assets/**/*.woff"],
  css: ["./src/assets/**/*.css"],
  images:["./src/assets/**/*.jpg"],
  stylus: ["./src/assets/**/*.styl"]
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

gulp.task('font', ['clean'], function() {
  gulp.src(src.fonts)
  .pipe(gulp.dest(out.build));
})

gulp.task('image', ['clean'], function(){
  gulp.src(src.images)
  .pipe(gulp.dest(out.build));
});

gulp.task('copyCss', ['clean'], function() {
  gulp.src(src.css)
  .pipe(gulp.dest(out.build));
});

gulp.task('stylus', ['clean'], function() {
  gulp.src(src.stylus)
  .pipe(stylus({use: nib()}))
  .pipe(gulp.dest(out.build));
});

gulp.task('buildjade', ['clean'], function() {
  gulp.src(src.jade)
  //.pipe(data(function(file) {
  //  return {
  //    fileName: path.basename(file.path)
  //  }
  //}))
  .pipe(jade({
    locals: {
      styletags: [{
        path: "styles/rug/rug.built.css"
      }, {
        path: "styles/index.css"
      }],
      scripttags: [{
        path: "https://code.jquery.com/jquery-1.11.3.min.js"
      }, {
        path: "built.js"
      }]
    },
    pretty:true
  }))
  .pipe(gulp.dest(out.build));
});

//gulp.task('build', ['clean']);
gulp.task('default', ['buildES6', 'buildjade', 'stylus', 'copyCss','font','image']);

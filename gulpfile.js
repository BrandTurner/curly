// Require gulp deps
var path = require('path');
var gulp = require('gulp');
var concat = require('gulp-concat');
var del = require('del');
var babel = require('gulp-babel');
var jade = require('gulp-jade');
var data = require('gulp-data');
var stylus = require('gulp-stylus');

var src = {
	build: [
	"./src/app/shared/**/*.js", 
	"./src/app/components/**/*.js",
	"./src/app/app.js",
	"./src/assets/**/*.*"],
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

// gulp.task('concat', ['clean'], function() {
// 	gulp.src(src.build, {
// 		base: './src'
// 	})
// 	.pipe(babel())
// 	.pipe(concat('built.js'))
// 	.pipe(gulp.dest(out.build));
// });

gulp.task('font', function() {
  gulp.src(src.fonts)
  .pipe(gulp.dest(out.build));
})

gulp.task('image', function(){
  gulp.src(src.images)
  .pipe(gulp.dest(out.build));
});

gulp.task('copyCss', function() {
  gulp.src(src.css)
  .pipe(gulp.dest(out.build));
});

gulp.task('stylus', function() {
  gulp.src(src.stylus)
  .pipe(stylus())
  .pipe(gulp.dest(out.build));
});

gulp.task('buildjade', function() {
	gulp.src(src.jade)
	//.pipe(data(function(file) {
	//	return {
	//		fileName: path.basename(file.path)
	//	}
	//}))
	.pipe(jade({
		locals: {
			styletags: [{
				path: "styles/rug/rug.built.css"
			}, {
			  path: "styles/index.css"
			}],
			scripttags: [{
				path: "https://code.jquery.com/jquery-2.1.4.min.js"
			}]
		},
		pretty:true
	}))
	.pipe(gulp.dest(out.build));
});

//gulp.task('build', ['clean']);
gulp.task('default', ['buildjade', 'stylus', 'copyCss','font','image']);

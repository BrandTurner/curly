// Require gulp deps
var path = require('path');
var gulp = require('gulp');
var concat = require('gulp-concat');
var del = require('del');
var babel = require('gulp-babel');
var jade = require('gulp-jade');
var data = require('gulp-data');

var src = {
	build: [
	"./src/app/shared/**/*.js", 
	"./src/app/components/**/*.js",
	"./src/app/app.js"],
	jade: ["./src/index.jade"]
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

gulp.task('buildjade', function() {
	gulp.src(src.jade)
	.pipe(data(function(file) {
		return {
			fileName: path.basename(file.path)
		}
	}))
	.pipe(jade({
		locals: {
			styletags: [{
				path: "http://css.com"
			}],
			scripttags: [{
				path: "http://js.com"
			}]
		},
		pretty:true
	}))
	.pipe(gulp.dest(out.build));
});

gulp.task('build', ['clean']);
gulp.task('default', ['build', 'buildjade']);
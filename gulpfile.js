// Require gulp deps
var gulp = require('gulp');
var concat = require('gulp-concat');
var del = require('del');
var babel = require('gulp-babel');

var src = {
	build: ["./src/**/*.*"]
};

var out = {
	build: "./build"
};

gulp.task('clean', function(cb) {
	del(out.build, {
		force: true
	}, cb)
});

gulp.task('concat', ['clean'], function() {
	gulp.src(src.build, {
		base: './src'
	})
	.pipe(babel())
	.pipe(concat('built.js'))
	.pipe(gulp.dest(out.build));
});

gulp.task('build', ['clean','concat']);

gulp.task('default', ['build']);
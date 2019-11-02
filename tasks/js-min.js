'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const pump = require('pump');  // https://github.com/gulpjs/gulp/tree/master/docs/why-use-pump

module.exports = function(options) {

	return function(callback) {
		pump([
				gulp.src(options.src),
				$.if(options.isDevelopment, $.sourcemaps.init()),
				$.uglify({output: {comments: /^!/}}),
				$.debug({title: options.taskName}),
				$.if(options.isDevelopment, $.sourcemaps.write('.')),
				$.rename({suffix: '.min'}),
				gulp.dest(options.dest),
			],
			callback
		);
	};

};

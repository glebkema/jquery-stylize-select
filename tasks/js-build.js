'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const pump = require('pump');  // https://github.com/gulpjs/gulp/tree/master/docs/why-use-pump
const replace = require('gulp-replace');  // ??? why does not work "$.replace"

module.exports = function(options) {

	return function(callback) {
		pump([
				gulp.src(options.src, {since: gulp.lastRun(options.taskName)}),
				replace('\'', '"'),  // https://www.npmjs.com/package/gulp-replace
				$.debug({title: options.taskName}),  // ?????
				gulp.dest(options.dest),
				$.jshint(),
				$.jshint.reporter('jshint-stylish'),
				$.jshint.reporter('fail'),  // https://www.npmjs.com/package/gulp-jshint
				$.uglify({output: {comments: /^!/}}),
				$.debug({title: options.taskName}),  // ?????
				$.rename({suffix: '.min'}),
				gulp.dest(options.dest),
			],
			callback
		);
	};

};

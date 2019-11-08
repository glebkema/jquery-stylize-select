'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const multipipe = require('multipipe');

module.exports = function(options) {

	return function() {
		return multipipe(
			gulp.src(options.src, {since: gulp.lastRun(options.taskName)}),
			$.jshint(),
		//	$.jshint.reporter('jshint-stylish'),
			$.jshint.reporter('jshint-stylish', {beep: true}),  // https://www.npmjs.com/package/jshint-stylish
		//	$.jshint.reporter('fail'),  // https://www.npmjs.com/package/gulp-jshint
			$.debug({title: options.taskName})
		).on('error', $.notify.onError());
	};

};

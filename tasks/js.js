'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const multipipe = require('multipipe');

module.exports = function(options) {

	return function() {
		return multipipe(
			gulp.src(options.src, {since: gulp.lastRun(options.taskName)}),
			$.debug({title: options.taskName}),
			gulp.dest(options.dest)
		).on('error', $.notify.onError());
	};

};

'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const autoprefixer = require('autoprefixer');
const multipipe = require('multipipe');

module.exports = function(options) {

	return function() {
		return multipipe(
			gulp.src(options.src),
			$.if(options.isDevelopment, $.sourcemaps.init()),
			$.sass(),
			$.postcss([ autoprefixer() ]),
			$.debug({title: options.taskName}),
			$.if(options.isDevelopment, $.sourcemaps.write('.')),
			gulp.dest(options.dest)
		).on('error', $.notify.onError());
	};

};

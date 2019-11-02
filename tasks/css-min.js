'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const pump = require('pump');  // https://github.com/gulpjs/gulp/tree/master/docs/why-use-pump
const package_json = require('../package.json');  // https://stackoverflow.com/a/22646149/6263942

module.exports = function(options) {

	return function(callback) {
		pump([
				gulp.src(options.src),
				$.if(options.isDevelopment, $.sourcemaps.init()),
				$.sass(),
				//gulp.dest('app/css'),
				$.cssnano({
				//	autoprefixer: {browsers: ['> 1%', 'last 2 versions', 'ie >= 9'], add: true},
					autoprefixer: {browsers: package_json.browserslist, add: true},
				}),
				$.debug({title: options.taskName}),
				$.if(options.isDevelopment, $.sourcemaps.write('.')),
				$.rename({suffix: '.min'}),
				gulp.dest(options.dest),
			],
			callback
		);
	};

};

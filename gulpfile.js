'use strict';

const	gulp            = require('gulp'),
	isDevelopment	= false,  // (! process.env.NODE_ENV) || ('development' === process.env.NODE_ENV),
	DIR_DEST		= 'dist',
	DIR_TESTS       = 'tests',
	SRC_CSS			= 'app/scss/**/*.scss',
	SRC_JS			= 'app/js/**/*.js',
	TASK_BUILD		= 'build',
	TASK_CSS		= 'css',
	TASK_JS			= 'js',
	TASK_LIVE		= 'live',
	TASK_SERVE		= 'serve',
	TASK_WATCH		= 'watch';

function lazyRequireTask(taskName, options) {
	const path = './tasks/' + taskName.replace(/:/g, '-');
	options = options || {};
	options.taskName = taskName;
	options.isDevelopment = isDevelopment;
	gulp.task(taskName, function(callback) {
		let task = require(path).call(this, options);
		return task(callback);
	});
}

lazyRequireTask(TASK_CSS, {
	src:   SRC_CSS,
	dest:  DIR_DEST,
});

lazyRequireTask(TASK_CSS + ':min', {
	src:   SRC_CSS,
	dest:  DIR_DEST,
});

lazyRequireTask(TASK_JS, {
	src:   SRC_JS,
	dest:  DIR_DEST,
});

lazyRequireTask(TASK_JS + ':build', {
	src:   SRC_JS,
	dest:  DIR_DEST,
});

lazyRequireTask(TASK_JS + ':hint', {
	src:   SRC_JS,
});

lazyRequireTask(TASK_JS + ':lint', {
	src:   SRC_JS,
	dest:  DIR_DEST,
	cacheFilePath: process.cwd() + '/tmp/lintCache.json',
});

lazyRequireTask(TASK_JS + ':min', {
	src:   SRC_JS,
	dest:  DIR_DEST,
});

//gulp.task(TASK_BUILD, gulp.parallel(TASK_CSS, TASK_CSS + ':min', gulp.series(TASK_JS + ':lint', TASK_JS, TASK_JS + ':min')));
gulp.task(TASK_BUILD, gulp.parallel(TASK_CSS, TASK_CSS + ':min', TASK_JS + ':build'));

lazyRequireTask(TASK_SERVE, {
	server: {
	//	baseDir: '.',
		index: DIR_TESTS + '/index.html',
	},
});

gulp.task(TASK_WATCH, function() {
	gulp.watch(SRC_CSS,  gulp.parallel(TASK_CSS, TASK_CSS + ':min'));
//	gulp.watch(SRC_JS,   gulp.series(TASK_JS + ':lint', TASK_JS, TASK_JS + ':min'));
	gulp.watch(SRC_JS,   TASK_JS + ':build');
});

gulp.task(TASK_LIVE, gulp.parallel(TASK_WATCH, TASK_SERVE));

gulp.task('dev', gulp.series(TASK_BUILD, TASK_LIVE));

gulp.task('default', function() {
});

'use strict';

const browserSync = require('browser-sync').create();

module.exports = function(options) {

	return function() {

		browserSync.init({  // https://browsersync.io/docs/options#option-server
			// browser: ["google chrome", "firefox"],
			server: options.server,
		});

		browserSync.watch(`${options.src}/**/*.*`).on('change', browserSync.reload);
	};

};

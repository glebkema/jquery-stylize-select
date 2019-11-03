jQuery(document).ready(function($) {

	//**** stylize select. https://github.com/glebkema/jquery-stylize-select
	var	$tests = $('.tests');
	if ($tests.length && "function" === typeof $tests.stylizeSelect) {
		$tests.stylizeSelect();
	}

	$tests.change(function() {
		console.log($(this).attr('id'), 'change', $(this).find(":selected").text());
	});

});

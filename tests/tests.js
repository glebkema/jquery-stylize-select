jQuery(document).ready(function($) {

	//**** stylize select. https://github.com/glebkema/jquery-stylize-select
	var	$tests = $('.tests');
	if ($tests.length && "function" === typeof $tests.stylizeSelect) {
		$tests.stylizeSelect();
	}


	//**** debug
	$tests.change(function() {
		console.log($(this).attr('id'), 'changes to "' + $(this).find(":selected").text() + '"');
	});


	//**** tests
	var changeValueByScript = 'changeValueByScript',
		$changeValueByScript = $('#' + changeValueByScript);
	$changeValueByScript.val(2).change();  // trigger `change` after setting the value: https://api.jquery.com/val/
	$('label[for="' + changeValueByScript + '"]').children('span').html($changeValueByScript.val());
	console.log('changeValueByScript has been changed to',  $changeValueByScript.val());

});

/*!
  * jQuery Stylize Select Plugin
  * Description: This plugin adds HTML blocks around the <select> field and creates the necessary event handlers. All that remains is to style these blocks with CSS.
  * Copyright (c) 2019 Gleb Kemarsky, https://github.com/glebkema/jquery-stylize-select
  * Licensed under the MIT license
  * Version: 0.5.7
  */

(function($) {

	$.fn.stylizeSelect = function( options ) {
		var	classSelect,
			settings,
			STR_ACTIVE = 'active';
		if (options && options.classSelect) {
			classSelect = options.classSelect;
		} else {
			classSelect = ('string' === typeof options ? options : $.fn.stylizeSelect.defaults.classSelect);
		}
		settings = $.extend({                          // CSS classes:
			classSelect:   classSelect,                // main <div> that wraps the original <select> and all blocks we add
		//	classSelectAdd: '',                        // modify the main <div>
			classDisabled: classSelect + '__disabled', // the disabled item in the drop-down list
			classHidden:   classSelect + '__hidden',   // the hidden item in the drop-down list
			classList:     classSelect + '__list',     // <ul> that shows the drop-down list of the options for selection
			classSelected: classSelect + '__selected', // the selected item in the drop-down list
			classStyled:   classSelect + '__styled',   // <div> that shows the selected option
		}, options );

		this.each(function() {
			var	$select = $(this),
				$selectOptions = $select.children('option'),
				numberOptions = $selectOptions.length,
				$selectStyled,
				$list,
				$listOptions;

			$select
				.hide()
				.wrap($('<div />', {
					'class': settings.classSelect.slice(1),
				//	'class': (settings.classSelect.slice(1) + ' ' + settings.classSelectAdd.slice(1)).trim(),
				}))
				.after($('<div />', {
					'class': settings.classStyled.slice(1),
					'tabindex': 0,
				}));

			$selectStyled = $select.next(settings.classStyled);

			$list = $('<ul />', {
				'class': settings.classList.slice(1),
			}).insertAfter($selectStyled);

			for (var i = 0; i < numberOptions; i++) {
				var $option = $selectOptions.eq(i);
				$('<li />', {
					'class': (($option.attr('class') ? $option.attr('class') : '')+
						($option.prop('disabled') ? ' ' + settings.classDisabled.slice(1) : '') +
						($option.prop('hidden') ? ' ' + settings.classHidden.slice(1) : '')).trim(),
					'html':  $option.data('html') || $option.text(),
					'rel':   $option.val(),
					'style': $option.attr('style'),
					'tabindex': 0,
				}).appendTo($list);
			}
			$listOptions = $list.children('li');

			$select
				.change(function() {
					if (this.selectedIndex > -1) {  // or $(this).prop('selectedIndex')
						var $selectedOption = $list.children('[rel=\'' + $(this).val() + '\']');
						if ($selectedOption) {
							$selectStyled
								.html($selectedOption.html())
								.attr('style', function() {
									var newStyle = $selectedOption.attr('style');
									return ( newStyle ? newStyle : null );
								});
							$selectedOption.addClass(settings.classSelected.slice(1))
								.siblings(settings.classSelected)
								.removeClass(settings.classSelected.slice(1));
						}
					}
				})
				.change();  // put the initial content in $selectStyled

			$select.parent(settings.classSelect)
				.focusout(function(event) {
					if (! this.contains(event.relatedTarget)) {
						closeSelect();
					}
				});

			$selectStyled
				.click(function() {
					toggleSelect();
					return false;  // stopPropagation & stopImmediatePropagation don`t prevent the document.click` event
				})
				.keydown(function(event) {
					var charCode = event.charCode || event.keyCode || event.which;
					switch (charCode) {
						case 27:  // escape
							event.stopPropagation();
							closeSelect();
							break;
						case 13:  // enter
						case 32:  // space
							event.preventDefault();
							event.stopPropagation();
							toggleSelect();
							break;
						case 38:  // arrow up
							if ($selectStyled.hasClass(STR_ACTIVE)) {
								event.preventDefault();
								event.stopPropagation();
								closeSelect();
							}
							break;
						case 40:  // arrow down
							event.preventDefault();
							event.stopPropagation();
							if ($selectStyled.hasClass(STR_ACTIVE)) {
								$listOptions.filter(':visible').first().focus();
							} else {
								openSelect();
							}
							break;
					}
				});

			$listOptions
				.click(function(event) {
					event.stopPropagation();
					performSelect($(this));
				})
				.keydown(function(event) {
					var $next, $prev,
						charCode = event.charCode || event.keyCode || event.which;
					switch (charCode) {
						case 27:  // escape
							event.stopPropagation();
							closeSelect();
							$selectStyled.focus();
							break;
						case 13:  // enter
						case 32:  // space
							event.preventDefault();
							event.stopPropagation();
							performSelect($(this));
							break;
						case 38:  // arrow up
							event.preventDefault();
							event.stopPropagation();
							$prev = $(this).prevAll(':visible:first');  // prev() has a problem with hidden options
							if ($prev.length) {
								$prev.focus();
							} else {
								$selectStyled.focus();
							}
							break;
						case 40:  // arrow down
							event.preventDefault();
							event.stopPropagation();
							$next = $(this).nextAll(':visible:first');
							if ($next.length) {
								$next.focus();
							}
							break;
					}
				});

			$(document).click(closeSelect);

			function closeSelect() {
				$selectStyled.removeClass(STR_ACTIVE);
				$list.hide();
			}

			function openSelect() {
				$selectStyled.find('.' + STR_ACTIVE).not(this).each(function() {
					$(this).removeClass(STR_ACTIVE).next(settings.classList).hide();
				});
				$selectStyled.toggleClass(STR_ACTIVE).next(settings.classList).toggle();
			}

			function performSelect($newOption) {
				updateSelect($newOption);
				closeSelect();
				$selectStyled.focus();
			}

			function toggleSelect() {
				if ($selectStyled.hasClass(STR_ACTIVE)) {
					closeSelect();
				} else {
					openSelect();
				}
			}

			function updateSelect($newOption) {
				if ($newOption && ! $newOption.hasClass(settings.classDisabled.slice(1))) {
					$select.val($newOption.attr('rel')).change();  // run event handlers for the `change` event
				}
			}
		});

		return this;
	};

	$.fn.stylizeSelect.defaults = {
		classSelect: '.stylize-select',
	};

}( jQuery ));

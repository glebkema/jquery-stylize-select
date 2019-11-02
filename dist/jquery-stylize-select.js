/*!
  * jQuery Stylize Select Plugin
  * Description: This plugin adds blocks around the selection field and creates the necessary event handlers. You can stylize the look of these blocks using the CSS. The plugin simplifies website development.
  * Copyright (c) 2019 Gleb Kemarsky, https://github.com/glebkema/jquery-stylize-select
  * Based on https://codepen.io/wallaceerick/pen/ctsCz by Wallace Erick
  * Licensed under the MIT license
  * Version: 0.5.2
  */

(function($) {

	$.fn.stylizeSelect = function( options ) {
		var	classSelect = (options && options.classSelect ? options.classSelect :
				('string' === typeof options ? options : '.stylize-select'));
			settings = $.extend({
				classSelect:   classSelect,                // CSS class for a <div> that wraps the original <select> and the blocks we're going to add
				classHidden:   classSelect + '__hidden',   // CSS class for the original <select> to make it hidden
				classList:     classSelect + '__list',     // CSS class for a <ul> that shows the drop-down list of the options for selection
				classSelected: classSelect + '__selected', // CSS class for the selected item in the drop-down list
				classStyled:   classSelect + '__styled',   // CSS class for a <div> that shows the selected option
			}, options ),
			STR_ACTIVE = 'active';

		this.each(function() {
			var	$select = $(this),
				$selectOptions = $select.children('option'),
				numberOptions = $selectOptions.length,
				$selectStyled,
				$list,
				$listOptions;

			$select.addClass(settings.classHidden.slice(1))
				.wrap($('<div />', {
					'class': settings.classSelect.slice(1),
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
					'class': $option.attr('class'),
					'html':  $option.data('html') || $option.text(),
					'rel':   $option.val(),
					'style': $option.attr('style'),
					'tabindex': 0,
				}).appendTo($list);
			}
			$listOptions = $list.children('li');

			updateSelect(function() {
				var indexSelected = Math.max(0, $selectOptions.index($(':selected')));
				return $listOptions.eq(indexSelected);
			}());  // NB: ()

			$select.parent(settings.classSelect).focusout(function(event) {
				if (! this.contains(event.relatedTarget)) {
					closeSelect();
				}
			});

			$selectStyled.click(function(event) {
				toggleSelect();
				return false;  // stopPropagation & stopImmediatePropagation are not enough to prevent the `document.click` event
			})
			.keydown(function(event) {
				var charCode = event.charCode || event.keyCode || event.which;
				switch (charCode) {
					case 27:  // esc
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
							$listOptions.first().focus();;
						} else {
							openSelect();
						}
						break;
				}
			});

			$listOptions.click(function(event) {
				event.stopPropagation();
				updateSelect($(this));
				$selectStyled.focus();
			})
			.keydown(function(event) {
				var charCode = event.charCode || event.keyCode || event.which;
				switch (charCode) {
					case 27:  // esc
						event.stopPropagation();
						closeSelect();
						$selectStyled.focus();
						break;
					case 13:  // enter
					case 32:  // space
						event.preventDefault();
						event.stopPropagation();
						updateSelect($(this));
						$selectStyled.focus();
						break;
					case 38:  // arrow up
						event.preventDefault();
						event.stopPropagation();
						if ($(this).is(':first-child')) {
							$selectStyled.focus();
						} else {
							$(this).prev().focus();
						}
						break;
					case 40:  // arrow down
						event.preventDefault();
						event.stopPropagation();
						if (! $(this).is(':last-child')) {
							$(this).next().focus();
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

			function toggleSelect() {
				if ($selectStyled.hasClass(STR_ACTIVE)) {
					closeSelect();
				} else {
					openSelect();
				}
			}

			function updateSelect($selectedItem) {
				$selectStyled.html($selectedItem.html()).attr('style', $selectedItem.attr('style'));  // ??? and the class too
				$selectedItem.addClass(settings.classSelected.slice(1)).siblings(settings.classSelected).removeClass(settings.classSelected.slice(1));
				$select.val($selectedItem.attr('rel')).change();
				closeSelect();
			}
		});

		return this;
	};

}( jQuery ));

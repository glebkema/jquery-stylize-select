/*
	jQuery Custom Select Plugin
	Description: This plugin adds blocks around the selection field and creates the necessary event handlers. You can stylize the look of these blocks using the CSS. The plugin simplifies website development.
	Copyright (c) 2019 Gleb Kemarsky, https://github.com/glebkema
	Based on https://codepen.io/wallaceerick/pen/ctsCz by Wallace Erick
	Licensed under the MIT license
	Version: 0.4.1
*/

(function($) {

	$.fn.customSelect = function( options ) {
		var	classSelect = (options && options.classSelect ? options.classSelect :
				('string' === typeof options ? options : '.custom-select'));
			settings = $.extend({
				classSelect: classSelect,               // CSS class for a <div> that wraps the original <select> and the blocks we're going to add
				classHidden: classSelect + '__hidden',  // CSS class for the original <select> to make it hidden
				classList:   classSelect + '__list',    // CSS class for a <ul> that shows the list of the options for selection
				classStyled: classSelect + '__styled',  // CSS class for a <div> that shows the selected option
			}, options ),
			STR_ACTIVE = 'active';

		this.each(function() {
			var	$select = $(this),
				$selectOptions = $select.children('option'),
				numberOptions = $selectOptions.length,
				$selectStyled,
				$list;

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

// ???????? how can i use function to send its result as a parameter of another function
//			updateSelect(function() {
//				var indexSelected = Math.max(0, $selectOptions.index($(':selected')));
//				console.log( $list.children('li').eq(indexSelected) );
//				return $list.children('li').eq(indexSelected);
//			});
			updateSelect($list.children('li').eq(Math.max(0, $selectOptions.index($(':selected')))));

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
					case 27:
						event.stopPropagation();
						closeSelect();
						break;
					case 13:
					case 32:
						event.preventDefault();
						event.stopPropagation();
						toggleSelect();
						break;
				}
			});

			$list.children('li').click(function(event) {
				event.stopPropagation();
				updateSelect($(this));
			})
			.keydown(function(event) {
				var charCode = event.charCode || event.keyCode || event.which;
				switch (charCode) {
					case 27:
						event.stopPropagation();
						closeSelect();
						break;
					case 13:
					case 32:
						event.stopPropagation();
						updateSelect($(this));
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
				$selectStyled.html($selectedItem.html()).attr('style', $selectedItem.attr('style'));  // ??? and class too
				$select.val($selectedItem.attr('rel')).change();
				closeSelect();
			}
		});

		return this;
	};

}( jQuery ));

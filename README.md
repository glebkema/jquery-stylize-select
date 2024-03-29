# jQuery Stylize Select Plugin

![GitHub last commit](https://img.shields.io/github/last-commit/glebkema/jquery-stylize-select)
![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/glebkema/jquery-stylize-select)
![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/glebkema/jquery-stylize-select?include_prereleases)

The drop-down list for the select field itself is almost not styled. This plugin adds blocks around it and creates the necessary event handlers. So you can stylize the look of these blocks using the CSS. The plugin simplifies website development.

The CSS file contains only the properties required for the functioning of the drop-down list and the field with the selection result. You need to stylize them yourself.

Inspired by [Wallace Erick](https://codepen.io/wallaceerick)'s CodePen "[Custom Select Menu](https://codepen.io/wallaceerick/pen/ctsCz)".


## The plugin creates 3 blocks and uses 6 style classes

```html
<div class="stylize-select">
	<select class="your-select-field" style="display: none;">
		<option value="apple">Apple</option>
		<option value="banana" selected>Banana</option>
		<option value="carrot" disabled>Carrot</option>
		<option value="grape" hidden>Grape</option>
	</select>
	<div class="stylize-select__styled" tabindex="0">Apple</div>
	<ul class="stylize-select__list" style="display: none;">
		<li rel="apple"  tabindex="0">Apple</li>
		<li rel="banana" tabindex="0" class="stylize-select__selected">Banana</li>
		<li rel="carrot" tabindex="0" class="stylize-select__disabled">Carrot</li>
		<li rel="grape" tabindex="0" class="stylize-select__hidden">Grape</li>
	</ul>
</div>
```

| Option        | Default value              | CSS class for                                                                   |
| :---          | :---                       | :---                                                                            |
| classSelect   | `.stylize-select`          | main `<div>` that wraps the original <select> and the blocks we're going to add |
| classHidden   | classSelect + `__disabled` | the disabled item in the drop-down list                                         |
| classHidden   | classSelect + `__hidden`   | the hidden item in the drop-down list                                           |
| classList     | classSelect + `__list`     | a `<ul>` that shows the list of the options for selection                       |
| classSelected | classSelect + `__selected` | the selected item in the drop-down list                                         |
| classStyled   | classSelect + `__styled`   | a `<div>` that shows the selected option                                        |

When the drop-down list opens, the styled field gets the `.active` class. Thus, you can style this state with a combination of two styles. For example, using `.stylize-select__styled.active` if the website uses the default values ​​for the options.

If the original `<select>` has no selected option yet, the plugin defines the first option as a selected one.


## HTML attributes

The plugin copies the `class` and `style` attributes from each `<option>` tag to the corresponding `<li>` tag as is.

Also, when the user selects an option, the plugin copies the `style` attribute from the option to the main field. The `class` attribute of the option will not be copied.

If `<option>` tag has the `data-html` attribute. then the plugin places this HTML as a content of the depending `<li>` tag.

So you can use images in the layout of options and customize the appearance of these images using CSS properties.

For example, the plugin will turn such HTML source code:

```html
<select class="your-select-field">
	<option value="apple" class="apple-class" style="background-image:url('/images/apple.jpg');">Apple</option>
	<option value="banana" data-html="<img class='stylize-select__image' src='/images/banana.jpg' />Banana">Banana</option>
</select>
```

into such final code:

```html
<div class="stylize-select">
	<select class="your-select-field stylize-select__hidden">
...
	</select>
	<div class="stylize-select__styled" tabindex="0">Apple</div>
	<ul class="stylize-select__list">
		<li rel="apple" class="apple-class" style="background-image:url('/images/apple.jpg');">Apple</li>
		<li rel="banana">
			<img class="stylize-select__image" src="/images/banana.jpg" />
			Banana
		</li>
	</ul>
</div>
```


## Event handlers

Trigger `change` event on the select field after updating the value. So your `onchange` handlers would work too.

Keyboard:
Open drop-down list by <kbd>Space</kbd>, <kbd>Enter</kbd> or <kbd>Arrow Down</kbd>.
Close drop-down list by second by <kbd>Space</kbd> or <kbd>Enter</kbd>, by <kbd>Arrow Up</kbd>, by `Esc` (and by click outside).
Go to next option by <kbd>Tab</kbd> or <kbd>Arrow Down</kbd>.
Go to previous option by <kbd>Shift</kbd>+<kbd>Tab</kbd> or <kbd>Arrow Up</kbd>.
Choose item by <kbd>Space</kbd> or <kbd>Enter</kbd>.


## How to use

1) Include jquery-stylize-select.js in your page.
1) Include jquery-stylize-select.css or use it as a basis for your styles.
2) Create your own style classes.
3) Call the `.stylizeSelect()` method, passing it the names of the style classes as parameters:

```js
$('.your-select-field').stylizeSelect();

$('.your-select-field').stylizeSelect('.your-main-wrapper-class');

$('.your-select-field').stylizeSelect(array(
	classSelect: '.your-main-wrapper-class',
	classHidden: '.your-class-to-hide-the-original-select',
	classList:   '.your-class-for-the-dropdown-list',
	classStyled: '.your-class-for-the-div-with-the-result-of-select',
));
```

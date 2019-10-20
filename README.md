# jQuery Custom Select Plugin

The drop-down list for the select field itself is almost not styled. This plugin adds blocks around it and creates the necessary event handlers. So you can stylize the look of these blocks using the CSS. The plugin simplifies website development.

The CSS file contains only the properties required for the functioning of the drop-down list and the field with the selection result. You need to stylize them yourself.

Based on [Custom Select Menu](https://codepen.io/wallaceerick/pen/ctsCz) by Wallace Erick [@wallaceerick](https://codepen.io/wallaceerick).

<p class="codepen" data-height="265" data-theme-id="0" data-default-tab="result" data-user="wallaceerick" data-slug-hash="ctsCz" style="height: 265px; box-sizing: border-box; display: flex;" data-pen-title="Custom Select Menu"></p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>


## The plugin creates 3 blocks and uses 4 style classes

| Option      | Default value            | Role                                                                                       |
| ----------- | ------------------------ | ------------------------------------------------------------------------------------------ |
| classSelect | `.custom-select`         | CSS class for a `<div>` that wraps the original <select> and the blocks we're going to add |
| classHidden | classSelect + `__hidden` | CSS class for the original `<select>` to make it hidden                                    |
| classList   | classSelect + `__list`   | CSS class for a `<ul>` that shows the list of the options for selection                    |
| classStyled | classSelect + `__styled` | CSS class for a `<div>` that shows the selected option                                     |


## How to use

1) Include jquery-custom-select.js in your page.
1) Include jquery-custom-select.css or use it as a basis for your styles.
2) Create your own style classes.
3) Call the `.customSelect()` method, passing it the names of the style classes as parameters:

```js
$('.your-select-field').customSelect();

$('.your-select-field').customSelect('.your-main-customization-class');

$('.your-select-field').customSelect(array(
	classSelect: '.your-main-customization-class',
	classHidden: '.your-class-to-hide-the-original-select',
	classList:   '.your-class-for-the-dropdown-list',
	classStyled: '.your-class-for-the-div-with-the-result-of-select',
));
```

# Morse CSS

A powerful classless CSS framework with a unique approach to styling.

## What is Morse CSS?

Morse CSS is a classless CSS framework that allows you to style your HTML without writing any CSS classes. Instead of adding classes to your HTML elements, styling is determined by the document structure and special Morse code patterns embedded in your markup.

## Key Features

- **Truly Classless**: No need to add classes to your HTML elements
- **Structure-Based Styling**: Styling is computed based on document structure (headings, sections, etc.)
- **Utility-Like Control**: Achieve the precision of utility frameworks like Tailwind CSS, but without classes
- **Morse Code Magic**: Use Morse code patterns to apply specific styles to elements

## How It Works

Morse CSS uses a clever approach to styling by recognizing Morse code patterns at the beginning of your HTML elements:

- **Dots** in Morse code are represented as `<i></i>`
- **Dashes** are represented as `<span></span>`

For example, to make an element **bold**, you would include the Morse code for "BOLD" at the beginning of the element:

```html
<p>
  <!-- Morse code for BOLD: -... --- .-.. -.. -->
  <span></span
  ><!-- B: -... -->
  <i></i>
  <i></i>
  <i></i>
  <span></span
  ><!-- O: --- -->
  <span></span>
  <span></span>
  <i></i
  ><!-- L: .-.. -->
  <span></span>
  <i></i>
  <i></i>
  <span></span
  ><!-- D: -.. -->
  <i></i>
  <i></i>

  This entire paragraph will be bold because the Morse code pattern at the beginning applies the
  style to the whole element.
</p>
```

The Morse code `-... --- .-.. -..` (BOLD) is represented by the pattern of empty `<i>` and `<span>` elements at the beginning of the element, which Morse CSS recognizes and applies the corresponding style (in this case, `font-weight: bold`) to the entire element.

## Installation

### Direct Download

Download the CSS file directly from the [releases page](https://github.com/uhyo/morse-css/releases).

## Usage

### Using the CSS

Include the Morse CSS stylesheet in your HTML:

```html
<link rel="stylesheet" href="path/to/morse.css" />
```

## Multiple Patterns Per Element

Morse CSS allows you to apply multiple patterns to a single HTML element. This is done by separating the patterns with a `<wbr>` element in the HTML.

To apply multiple Morse patterns to a single element, separate each pattern with a `<wbr>` element:

```html
<p>
  <!-- Morse code for BOLD -->
  <span></span>
  <i></i>
  <i></i>
  <i></i>
  <!-- ... rest of BOLD pattern -->
  <wbr />
  <!-- Morse code for RED -->
  <i></i>
  <span></span>
  <i></i>
  <!-- ... rest of RED pattern -->
  This text will be both bold and red.
</p>
```

This allows you to combine multiple styles without having to nest elements, making your HTML cleaner and more maintainable.

## Available Patterns

Here are the patterns included in the default Morse CSS:

### Text Formatting

| Pattern   | CSS Property                  |
| --------- | ----------------------------- |
| BOLD      | font-weight: bold             |
| ITALIC    | font-style: italic            |
| UNDERLINE | text-decoration: underline    |
| STRIKE    | text-decoration: line-through |
| OVERLINE  | text-decoration: overline     |
| SMALL     | font-size: 0.875em            |
| MEDIUM    | font-size: 1em                |
| LARGE     | font-size: 1.5em              |
| XLARGE    | font-size: 2em                |
| XXLARGE   | font-size: 3em                |

### Text Alignment

| Pattern | CSS Property       |
| ------- | ------------------ |
| CENTER  | text-align: center |
| LEFT    | text-align: left   |
| RIGHT   | text-align: right  |

### Display

| Pattern | CSS Property  |
| ------- | ------------- |
| HIDE    | display: none |

### Colors

| Pattern  | CSS Property                           |
| -------- | -------------------------------------- |
| RED      | color: red                             |
| GREEN    | color: green                           |
| BLUE     | color: blue                            |
| YELLOW   | color: yellow                          |
| PURPLE   | color: purple                          |
| ORANGE   | color: orange                          |
| BLACK    | color: black                           |
| WHITE    | color: white                           |
| GRAY     | color: gray                            |
| BGRED    | background-color: red                  |
| BGGREEN  | background-color: green                |
| BGBLUE   | background-color: blue; color: white   |
| BGYELLOW | background-color: yellow               |
| BGPURPLE | background-color: purple; color: white |
| BGORANGE | background-color: orange               |
| BGBLACK  | background-color: black; color: white  |
| BGWHITE  | background-color: white                |
| BGGRAY   | background-color: gray; color: white   |

### Spacing

| Pattern  | CSS Property  |
| -------- | ------------- |
| PADDING1 | padding: 4px  |
| PADDING2 | padding: 8px  |
| PADDING3 | padding: 16px |
| PADDING4 | padding: 24px |
| PADDING5 | padding: 32px |
| MARGIN1  | margin: 4px   |
| MARGIN2  | margin: 8px   |
| MARGIN3  | margin: 16px  |
| MARGIN4  | margin: 24px  |
| MARGIN5  | margin: 32px  |
| GAP1     | gap: 4px      |
| GAP2     | gap: 8px      |
| GAP3     | gap: 16px     |

### Layout

| Pattern | CSS Property                          |
| ------- | ------------------------------------- |
| FLEX    | display: flex                         |
| FLEXROW | display: flex; flex-direction: row    |
| FLEXCOL | display: flex; flex-direction: column |
| GRID    | display: grid                         |
| START   | justify-content: flex-start           |
| END     | justify-content: flex-end             |
| BETWEEN | justify-content: space-between        |
| AROUND  | justify-content: space-around         |

### Size

| Pattern | CSS Property   |
| ------- | -------------- |
| FULL    | width: 100%    |
| HALF    | width: 50%     |
| THIRD   | width: 33.333% |
| QUARTER | width: 25%     |
| TALL    | height: 100%   |
| SHORT   | height: 50%    |

### Borders

| Pattern     | CSS Property                     |
| ----------- | -------------------------------- |
| BORDER      | border: 1px solid currentColor   |
| BORDERTHIN  | border: 0.5px solid currentColor |
| BORDERTHICK | border: 2px solid currentColor   |
| ROUND       | border-radius: 4px               |
| ROUNDFULL   | border-radius: 9999px            |

## Browser Support

Morse CSS relies on modern CSS selectors like `:has()`. Check browser compatibility before using in production:

- Chrome 105+
- Safari 15.4+
- Firefox 121+
- Edge 105+

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

[MIT License](LICENSE)

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

- **Dots** in Morse code are represented as `<span></span>`
- **Dashes** are represented as `<span><span><span></span></span></span>`

For example, to make an element **bold**, you would include the Morse code for "BOLD" at the beginning of the element:

```html
<p>
  <!-- Morse code for BOLD: -... --- .-.. -.. -->
  <span></span
  ><span
    ><span><span></span></span></span
  ><span
    ><span><span></span></span></span
  ><span></span>
  <span
    ><span><span></span></span></span
  ><span
    ><span><span></span></span></span
  ><span
    ><span><span></span></span
  ></span>
  <span></span
  ><span
    ><span><span></span></span></span
  ><span></span><span></span>
  <span
    ><span><span></span></span></span
  ><span></span><span></span>

  This entire paragraph will be bold because the Morse code pattern at the beginning applies the
  style to the whole element.
</p>
```

The Morse code `-... --- .-.. -..` (BOLD) is represented by the pattern of nested spans at the beginning of the element, which Morse CSS recognizes and applies the corresponding style (in this case, `font-weight: bold`) to the entire element.

## Installation

### Using npm/pnpm

```bash
# Using npm
npm install morse-css

# Using pnpm
pnpm add morse-css
```

### Direct Download

You can also download the CSS file directly from the [releases page](https://github.com/your-username/morse-css/releases).

## Usage

### 1. Using the pre-built CSS

Include the Morse CSS stylesheet in your HTML:

```html
<link rel="stylesheet" href="path/to/morse.css" />
```

### 2. Using the converter

If you want to create your own custom Morse CSS file, you can use the converter:

```bash
# Using npx
npx morse-css src/css/your-file.pcss output/your-output.css

# If installed globally
morse-css src/css/your-file.pcss output/your-output.css
```

### 3. Creating a custom pseudo-CSS file

Create a file with your desired styles using the `:morse()` selector:

```css
/* Make elements bold */
*:morse(BOLD) {
  font-weight: bold;
}

/* Make elements red */
*:morse(RED) {
  color: red;
}

/* Make elements italic */
*:morse(ITALIC) {
  font-style: italic;
}
```

## Available Patterns

Here are some common patterns included in the default Morse CSS:

| Pattern   | Morse Code                    | CSS Property                         |
| --------- | ----------------------------- | ------------------------------------ |
| BOLD      | -... --- .-.. -..             | font-weight: bold                    |
| RED       | .-. . -..                     | color: red                           |
| ITALIC    | .. - .- .-.. .. -.-.          | font-style: italic                   |
| UNDERLINE | ..- -. -.. . .-. .-.. .. -. . | text-decoration: underline           |
| LARGE     | .-.. .- .-. --. .             | font-size: 1.5em                     |
| CENTER    | -.-. . -. - . .-.             | text-align: center                   |
| BLUE      | -... .-.. ..- .               | background-color: blue; color: white |

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

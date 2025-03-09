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
  <span></span><span><span><span></span></span></span><span><span><span></span></span></span><span></span>
  <span><span><span></span></span></span><span><span><span></span></span></span><span></span>
  <span></span><span><span><span></span></span></span><span></span><span></span>
  <span><span><span></span></span></span><span><span><span></span></span></span><span></span><span></span>
  
  This entire paragraph will be bold because the Morse code pattern at the beginning applies the style to the whole element.
</p>
```

The Morse code `-... --- .-.. -..` (BOLD) is represented by the pattern of nested spans at the beginning of the element, which Morse CSS recognizes and applies the corresponding style (in this case, `font-weight: bold`) to the entire element.

## Getting Started

1. Include the Morse CSS stylesheet in your HTML:

```html
<link rel="stylesheet" href="path/to/morse.css">
```

2. Start writing HTML without classes, using Morse code patterns for specific styling needs.

## Browser Support

Morse CSS relies on modern CSS selectors like `:has()`. Check browser compatibility before using in production.

## License

[MIT License](LICENSE)

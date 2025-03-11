# Morse CSS Architecture

This document outlines the architecture and implementation details for the Morse CSS framework.

## Overview

Morse CSS is a classless CSS framework that uses Morse code patterns to apply specific styles to HTML elements. The core of the implementation involves generating a CSS file from a human-readable pseudo-CSS format.

## Core Components

### 1. Morse Code Converter

The main component of Morse CSS is a converter that transforms pseudo-CSS with `:morse()` selectors into standard CSS with `:has()` selectors. This is done through a simple string replacement process that:

1. Identifies `:morse()` selectors in the pseudo-CSS
2. Translates the Morse code words inside the selectors into HTML pattern selectors
3. Replaces the `:morse()` selectors with `:has()` selectors containing the translated patterns

Example pseudo-CSS:

```css
*:morse(BOLD) {
  font-weight: bold;
}

*:morse(RED) {
  color: red;
}
```

### 2. Morse Code Representation

In Morse CSS, Morse code is represented in HTML using the following conventions:

- **Dots** (`.`) in Morse code are represented as `<i></i>` (empty italic elements)
- **Dashes** (`-`) are represented as `<span></span>` (empty spans)
- **Spaces** between characters are represented by the adjacent sibling combinator (`+`)

The converter maintains a dictionary of Morse code patterns for letters and numbers, which it uses to generate the appropriate CSS selectors.

### 3. CSS Generation

The converter transforms the pseudo-CSS with `:morse()` selectors into standard CSS using the `:has()` selector and combinations of child and adjacent sibling selectors to match the Morse code patterns.

Example transformation:

```css
/* Input: Pseudo-CSS */
*:morse(BOLD) {
  font-weight: bold;
}

/* Output: Generated CSS */
*:has(
  > i:empty:first-child + 
  span:empty + 
  span:empty + 
  i:empty + 
  /* ... rest of the Morse pattern for "BOLD" */
) {
  font-weight: bold;
}
```

The `+` (adjacent sibling combinator) ensures the spans appear in the correct sequence, matching the Morse code pattern.

## Build Process

1. **Input**: Developer creates a pseudo-CSS file with `:morse()` selectors
2. **Processing**: The converter transforms the pseudo-CSS into standard CSS
3. **Output**: A production-ready CSS file that can be included in HTML documents

The build process is automated with the `generate` script, which:

- Converts the pseudo-CSS file from `src/css/` to the main CSS output (`website/morse.css`)
- Converts the pseudo-syntax HTML example from `src/html/` to its final form with Morse code patterns (`website/examples/converted.html`)
- Converts the website pseudo HTML file from `src/website/` to the main website HTML (`website/index.html`)

## Usage

Morse CSS provides a CSS file (`website/morse.css`) that can be included in HTML documents to apply styles based on Morse code patterns. The framework is designed to be used directly without requiring any build steps by the end user.

## File Structure

```
morse-css/
├── src/                  # All source files
│   ├── index.ts          # Main implementation
│   ├── morse-selector.ts # Morse code to CSS selector conversion
│   ├── html-converter.ts # HTML pseudo-syntax conversion
│   ├── types.ts          # Type definitions
│   ├── css/              # Source pseudo-CSS files
│   │   └── morse.pcss    # Source for morse.css
│   ├── html/             # Source HTML files
│   │   └── pseudo-syntax.html # Example with pseudo-syntax
│   └── website/          # Website source files
│       └── index.pseudo.html # Source for website index.html
└── website/              # Generated files and website
    ├── index.html        # Main website HTML
    ├── morse.css         # Main CSS output
    └── examples/         # Example usage
        └── converted.html # Generated HTML file from pseudo-syntax.html
```

## Technical Considerations

### CSS Selector Complexity

The generated CSS uses complex selectors to match Morse code patterns. Care must be taken to ensure these selectors are efficient and don't cause performance issues in browsers.

### Browser Compatibility

The implementation relies heavily on the CSS `:has()` selector, which is a relatively new feature. Browser compatibility should be carefully considered and documented.

### Extensibility

The architecture allows for easy addition of new Morse code patterns by updating the Morse code dictionary. The system is designed to be extensible without requiring major changes to the core components.

## Future Enhancements

1. **Morse Code Shorthand**: Develop a more concise way to represent Morse code in HTML
2. **Custom Pattern Support**: Allow users to define their own Morse code patterns and corresponding styles
3. **Integration with Build Tools**: Create plugins for popular build tools (webpack, Vite, etc.)
4. **Theme Support**: Add support for theming and customization
5. **Performance Optimization**: Optimize the generated CSS for better performance

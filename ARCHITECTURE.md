# Morse CSS Architecture

This document outlines the planned architecture and implementation details for the Morse CSS framework.

## Overview

Morse CSS is a classless CSS framework that uses Morse code patterns to apply specific styles to HTML elements. The core of the implementation involves generating a CSS file from a human-readable pseudo-CSS format.

## Core Components

### 1. Pseudo-CSS Parser

The parser will read a human-readable pseudo-CSS file that uses a custom `:morse()` selector. This selector allows developers to specify styles based on Morse code patterns.

Example pseudo-CSS:

```css
*:morse(BOLD) {
  font-weight: bold;
}

*:morse(RED) {
  color: red;
}
```

### 2. Morse Code Translator

This component will translate Morse code words into their corresponding HTML pattern selectors:

- **Dots** (`.`) in Morse code are represented as `<span></span>`
- **Dashes** (`-`) are represented as `<span><span><span></span></span></span>`
- **Spaces** between characters are represented by the absence of elements

The translator will maintain a dictionary of Morse code patterns and generate the appropriate CSS selectors.

### 3. CSS Generator

The CSS generator will transform the pseudo-CSS with `:morse()` selectors into standard CSS using the `:has()` selector and complex combinations of child and descendant selectors to match the Morse code patterns at the beginning of elements.

Example transformation:

```css
/* Input: Pseudo-CSS */
*:morse(BOLD) {
  font-weight: bold;
}

/* Output: Generated CSS */
*:has(
  span:empty:first-child + 
  span:has(span:has(span:empty)) + 
  span:has(span:has(span:empty)) + 
  span:empty + 
  /* ... rest of the Morse pattern for "BOLD" */
) {
  font-weight: bold;
}
```

Note that the generated selectors specifically target elements where the Morse code pattern appears at the beginning of the element (using `:first-child`), ensuring the style applies to the entire element. The `+` (adjacent sibling combinator) ensures the spans appear in the correct sequence.

## Build Process

1. **Input**: Developer creates a pseudo-CSS file with `:morse()` selectors
2. **Processing**:
   - Parse the pseudo-CSS file
   - For each `:morse()` selector, translate the Morse code word into the corresponding HTML pattern selector
   - Generate the final CSS with standard selectors
3. **Output**: A production-ready CSS file that can be included in HTML documents

## Development Workflow

1. **Setup**: Initialize the project with necessary dependencies
2. **Development**:
   - Create the parser for pseudo-CSS
   - Implement the Morse code translator
   - Build the CSS generator
   - Add test cases for various Morse patterns
3. **Build**: Create a build script that processes the pseudo-CSS file and outputs the final CSS
4. **Documentation**: Provide examples and usage guidelines for developers

## File Structure

```
morse-css/
├── src/
│   ├── parser/           # Pseudo-CSS parser implementation
│   ├── translator/       # Morse code translator
│   ├── generator/        # CSS generator
│   └── index.js          # Main entry point
├── examples/             # Example usage
├── dist/                 # Generated CSS files
├── tests/                # Test cases
└── pseudo-css/           # Source pseudo-CSS files
```

## Technical Considerations

### CSS Selector Complexity

The generated CSS will use complex selectors to match Morse code patterns. Care must be taken to ensure these selectors are efficient and don't cause performance issues in browsers.

### Browser Compatibility

The implementation relies heavily on the CSS `:has()` selector, which is a relatively new feature. Browser compatibility should be carefully considered and documented.

### Extensibility

The architecture should allow for easy addition of new Morse code patterns and corresponding styles. The system should be designed to be extensible without requiring major changes to the core components.

## Future Enhancements

1. **Morse Code Shorthand**: Develop a more concise way to represent Morse code in HTML
2. **Custom Pattern Support**: Allow users to define their own Morse code patterns and corresponding styles
3. **Integration with Build Tools**: Create plugins for popular build tools (webpack, Vite, etc.)
4. **Theme Support**: Add support for theming and customization
5. **Performance Optimization**: Optimize the generated CSS for better performance

## Implementation Phases

1. **Phase 1**: Core functionality - Parse pseudo-CSS and generate basic CSS with Morse code pattern recognition
2. **Phase 2**: Optimization - Improve selector efficiency and reduce CSS file size
3. **Phase 3**: Extensions - Add support for custom patterns and themes
4. **Phase 4**: Tooling - Develop build tool integrations and developer utilities

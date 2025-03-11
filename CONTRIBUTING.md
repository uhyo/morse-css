# Contributing to Morse CSS

Thank you for your interest in contributing to Morse CSS! This document provides guidelines and instructions for development.

## Development Setup

### Prerequisites

- Node.js (v14 or higher)
- pnpm package manager

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/morse-css.git
   cd morse-css
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

## Project Structure

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

## Development Workflow

1. Make changes to the source code in the `src/` directory.
2. Write tests for your changes in the `tests/` directory.
3. Run tests to ensure your changes work as expected:
   ```bash
   pnpm test
   ```
4. Build the project:
   ```bash
   pnpm build
   ```
5. Try your changes with an example:
   ```bash
   pnpm convert src/css/morse.pcss website/example.css
   ```

## Commands

- `pnpm build`: Build the project
- `pnpm dev`: Run the project in development mode
- `pnpm test`: Run tests
- `pnpm test:watch`: Run tests in watch mode
- `pnpm lint`: Lint the code
- `pnpm format`: Format the code
- `pnpm convert <input> <output>`: Convert a pseudo-CSS file to a CSS file

## How It Works

Morse CSS works by converting pseudo-CSS with `:morse()` selectors to standard CSS with complex selectors that match Morse code patterns in HTML.

### Pseudo-CSS Format

```css
*:morse(BOLD) {
  font-weight: bold;
}
```

### Generated CSS

```css
*:has(span:empty + span:has(span:has(span:empty)) + ...) {
  font-weight: bold;
}
```

### HTML Usage

```html
<p>
  <!-- Morse code for BOLD: -... --- .-.. -.. -->
  <span></span
  ><span
    ><span><span></span></span></span
  >... This paragraph will be bold.
</p>
```

## Adding New Morse Patterns

To add new Morse patterns, simply add them to your pseudo-CSS file:

```css
*:morse(NEWPATTERN) {
  /* Your CSS properties here */
}
```

The converter will automatically translate the word "NEWPATTERN" to its Morse code representation and generate the appropriate CSS selectors.

## Testing

We use Vitest for testing. Tests are located in the `tests/` directory. To run tests:

```bash
pnpm test
```

## Building

To build the project:

```bash
pnpm build
```

Since we use `noEmit` in TypeScript configuration, no JavaScript files are generated. The TypeScript code is run directly using `ts-node`.

## License

Morse CSS is licensed under the MIT License. See the LICENSE file for details.

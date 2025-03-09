# Morse CSS Development Memo

## Overview

Morse CSS is a powerful classless CSS framework. A classless CSS framework is a CSS framework where users don't have to write any classes to determine styling. Instead, styling is computed solely by document structure (typically heading files, sections, etc).

The unique point of Morse CSS is that it allows users to still specify specific styling similarly to utility-based CSS frameworks (e.g. Tailwind CSS), yet without any classes.

## Core Concept

The core idea of Morse CSS is that it employs Morse code to specify styles.

For example, if a user wants some element to be bold, the user includes BOLD in its contents, but as a Morse code.

The Morse code for BOLD is `-... --- .-.. -..`.

We use `<span>` elements to represent Morse code:

- Dots are represented as `<span></span>` (empty spans)
- Dashes are represented as `<span><span><span></span></span></span>` (nested spans)

## Implementation

Morse CSS provides a CSS file that achieves the above feature. Implementation of Morse CSS is mainly about generating such CSS file from a human-readable pseudo-CSS file:

```css
/* pseudo CSS */
*:morse(BOLD) {
  font-weight: bold;
}

/* generated CSS */
*:has(span:empty + span:has(span:has(span:empty)) + /* rest of Morse code for BOLD... */) {
  font-weight: bold;
}
```

## Architecture Rework (2025-03-10)

The initial architecture of Morse CSS was based on a three-step process:

1. Parse the pseudo-CSS file to extract `:morse()` selectors
2. Translate Morse code words into HTML pattern selectors
3. Generate the final CSS with the translated selectors

This approach, while structured, was unnecessarily complex and relied on regex-based parsing that was both fragile and overkill for our needs.

### Simplified Approach

The architecture has been reworked to use a simpler approach:

1. We now directly replace any `:morse(...)` part in pseudo-CSS with a transformed `:has(...)` selector
2. This is done through a single regex-based string replacement operation
3. The Morse code translation logic is maintained but integrated into the replacement process

### Benefits of the New Approach

1. **Simplicity**: The code is now more straightforward and easier to understand
2. **Maintainability**: Fewer components and moving parts means less code to maintain
3. **Robustness**: The simplified approach is less prone to parsing errors
4. **Performance**: The direct replacement approach is potentially more efficient

### Implementation Details

The new implementation:

- Uses a single regex to match `:morse()` selectors and capture the necessary parts
- Translates Morse code words to HTML pattern selectors on-the-fly during replacement
- Maintains the same output format and functionality as the previous implementation
- Preserves all existing tests and functionality

See the updated ARCHITECTURE.md for more details on the new implementation.

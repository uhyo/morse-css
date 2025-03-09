Morse CSS will be a powerful classless CSS framework. A classless CSS framework is a CSS framework where users don't have to write any classes to determine styling. Instead, styling is computed solely by document structure (typically heading files, sections, etc).

The unique point of Morse CSS is that it allows users to still specify specific styling similarly to utility-based CSS frameworks (e.g. Tailwind CSS), yet without any classes.

The core idea of Morce CSS is that it employs Morse code to specify styles.

For example, if user wants some element to be bold, user includes BOLD in its contents, but as a Morse code.

The Morse code for BOLD is `-... --- .-.. -..`.

The point is that we actually use `<span>` element to represent. Dots are represented as `<span></span>`. Dashes are represented as `<span><span><span></span></span></span>`.

Morse CSS will provide a CSS file that achieves above feature. Implementation of Morse CSS will be mainly about generating such CSS file from human-readable pseudo-CSS file:

```css
/* pseudo CSS */
*:morse(BOLD) {
  font-weight: bold;
}

/* generated CSS */
*:has(/* Morse code for BOLD... */) {
  font-weight: bold;
}
```
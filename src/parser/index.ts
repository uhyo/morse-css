/**
 * Parser for pseudo-CSS with :morse() selectors
 */

import { MorsePattern } from "../types";

/**
 * Regular expression to match :morse() selectors
 * Captures:
 * 1. The selector part before :morse()
 * 2. The Morse word inside the parentheses
 * 3. The CSS block content (everything between the curly braces)
 */
const MORSE_SELECTOR_REGEX = /([^{:]+):morse\(([A-Z]+)\)\s*{([^}]*)}/g;

/**
 * Parses a pseudo-CSS string and extracts patterns with :morse() selectors
 *
 * @param pseudoCSS - The pseudo-CSS content with :morse() selectors
 * @returns An array of detected Morse patterns
 */
export function parsePseudoCSS(pseudoCSS: string): MorsePattern[] {
  const patterns: MorsePattern[] = [];

  // Find all :morse() selectors in the pseudo-CSS
  let match;
  while ((match = MORSE_SELECTOR_REGEX.exec(pseudoCSS)) !== null) {
    const [fullMatch, selector, morseWord, cssBlock] = match;

    // Add the detected pattern
    patterns.push({
      fullMatch,
      selector: selector.trim(),
      morseWord: morseWord.trim(),
      cssBlock: cssBlock.trim(),
    });
  }

  return patterns;
}

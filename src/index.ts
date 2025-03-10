/**
 * Morse CSS - A powerful classless CSS framework with Morse code patterns
 *
 * This is the main entry point for the Morse CSS framework.
 * It provides functionality to convert pseudo-CSS with :morse() selectors
 * to standard CSS with :has() selectors that match Morse code patterns.
 */

// Import dependencies (used internally, not exported)
import { getMorseSelectorForWord, MORSE_CODE } from "./morse-selector";

/**
 * Regular expression to match :morse() selectors
 * Captures:
 * 1. Everything before :morse()
 * 2. The Morse word inside the parentheses
 * 3. Everything after the closing parenthesis
 */
const MORSE_SELECTOR_REGEX = /([^{]*):morse\(([A-Z0-9]+)\)([^{]*{[^}]*})/g;

/**
 * Converts pseudo-CSS with :morse() selectors to standard CSS with :has() selectors
 *
 * @param pseudoCSS - The pseudo-CSS content with :morse() selectors
 * @returns The generated CSS with :has() selectors
 */
export function convertMorseCSS(pseudoCSS: string): string {
  // Add a header comment
  let css = "/* Generated by Morse CSS */\n";
  css += "/* https://github.com/morse-css */\n";
  css += "\n";

  // Replace all :morse() selectors with :has() selectors
  const convertedCSS = pseudoCSS.replace(
    MORSE_SELECTOR_REGEX,
    (match, before, morseWord, after) => {
      try {
        // Get the HTML pattern selector for the Morse word
        const morseSelector = getMorseSelectorForWord(morseWord);

        // Replace the :morse() selector with :has() selector
        return `${before}:has(${morseSelector})${after}`;
      } catch (error) {
        console.error(`Error converting Morse word "${morseWord}": ${(error as Error).message}`);
        // Return the original match if there's an error
        return match;
      }
    }
  );

  // Add the converted CSS to the output
  css += convertedCSS;

  return css;
}

/**
 * Morse CSS - A powerful classless CSS framework with Morse code patterns
 *
 * This is the main entry point for the Morse CSS framework.
 * It exports the functions to convert pseudo-CSS with :morse() selectors
 * to standard CSS with complex selectors that match Morse code patterns.
 */

import { parsePseudoCSS } from "./parser";
import { translateMorsePatterns } from "./translator";
import { generateCSS } from "./generator";

/**
 * Converts pseudo-CSS with :morse() selectors to standard CSS
 *
 * @param pseudoCSS - The pseudo-CSS content with :morse() selectors
 * @returns The generated CSS with standard selectors
 */
export function convertMorseCSS(pseudoCSS: string): string {
  // Parse the pseudo-CSS to extract :morse() selectors and their properties
  const parsedRules = parsePseudoCSS(pseudoCSS);

  // Translate Morse code patterns to HTML pattern selectors
  const translatedRules = translateMorsePatterns(parsedRules);

  // Generate the final CSS with standard selectors
  return generateCSS(translatedRules);
}

// Export the individual components for more granular usage
export { parsePseudoCSS } from "./parser";
export { translateMorsePatterns } from "./translator";
export { generateCSS } from "./generator";

// Export types
export * from "./types";

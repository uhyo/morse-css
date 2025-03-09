/**
 * Parser for pseudo-CSS with :morse() selectors
 */

import { ParsedMorseRule } from "../types";

/**
 * Regular expression to match :morse() selectors
 * Captures the selector and the Morse word inside the parentheses
 */
const MORSE_SELECTOR_REGEX = /([^{]+):morse\(([A-Z]+)\)\s*{([^}]*)}/g;

/**
 * Parses a pseudo-CSS string and extracts rules with :morse() selectors
 *
 * @param pseudoCSS - The pseudo-CSS content with :morse() selectors
 * @returns An array of parsed Morse rules
 */
export function parsePseudoCSS(pseudoCSS: string): ParsedMorseRule[] {
  const parsedRules: ParsedMorseRule[] = [];

  // Find all :morse() selectors in the pseudo-CSS
  let match;
  while ((match = MORSE_SELECTOR_REGEX.exec(pseudoCSS)) !== null) {
    const [, selector, morseWord, propertiesText] = match;

    // Parse the CSS properties
    const properties = parseProperties(propertiesText);

    // Add the parsed rule
    parsedRules.push({
      originalSelector: selector.trim(),
      morseWord: morseWord.trim(),
      properties,
    });
  }

  return parsedRules;
}

/**
 * Parses CSS properties from a string
 *
 * @param propertiesText - The CSS properties as a string
 * @returns The CSS properties as key-value pairs
 */
function parseProperties(propertiesText: string): Record<string, string> {
  const properties: Record<string, string> = {};

  // Split the properties text by semicolons
  const propertyLines = propertiesText.split(";");

  // Parse each property line
  for (const line of propertyLines) {
    const trimmedLine = line.trim();
    if (trimmedLine) {
      // Split the property line by the first colon
      const colonIndex = trimmedLine.indexOf(":");
      if (colonIndex !== -1) {
        const property = trimmedLine.substring(0, colonIndex).trim();
        const value = trimmedLine.substring(colonIndex + 1).trim();
        properties[property] = value;
      }
    }
  }

  return properties;
}

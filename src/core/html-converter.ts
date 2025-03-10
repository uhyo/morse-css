/**
 * HTML Converter for Morse CSS
 *
 * This module provides functions to convert HTML with pseudo syntax like {BOLD}
 * to actual Morse CSS compatible HTML with the appropriate <span> elements.
 */

import { MORSE_CODE } from "./morse-selector";
import { MorseChar } from "./types";

/**
 * Converts a Morse character to its corresponding HTML representation
 *
 * @param char - The Morse character (dot or dash)
 * @returns The HTML representation of the Morse character
 */
function getMorseHtmlForChar(char: MorseChar): string {
  if (char === ".") {
    // Dot: <i></i>
    return "<i></i>";
  } else if (char === "-") {
    // Dash: <span></span>
    return "<span></span>";
  } else {
    throw new Error(`Unknown Morse character: ${char}`);
  }
}

/**
 * Converts a Morse word to its corresponding HTML representation
 *
 * @param morseWord - The Morse word to convert
 * @returns The HTML representation of the Morse word
 */
function getMorseHtmlForWord(morseWord: string): string {
  // Convert the word to an array of characters
  const characters = morseWord.split("");

  // Build the HTML parts for each character
  const htmlParts: string[] = [];

  for (const char of characters) {
    const sequence = MORSE_CODE[char];
    if (!sequence) {
      throw new Error(`Unknown character in Morse word: ${char}`);
    }

    // Convert each Morse character to its HTML representation
    for (const morseChar of sequence) {
      htmlParts.push(getMorseHtmlForChar(morseChar));
    }
  }

  // Join the HTML parts
  return htmlParts.join("");
}

/**
 * Regular expression to match {WORD} patterns in HTML
 * Captures the word inside the curly braces
 */
const MORSE_HTML_REGEX = /\{([^}]+)\}/g;

/**
 * Converts HTML with pseudo syntax like {BOLD} to actual Morse CSS compatible HTML
 *
 * @param html - The HTML content with pseudo syntax
 * @returns The converted HTML with actual Morse CSS compatible markup
 */
export function convertMorseHtml(html: string): string {
  // Replace all {WORD} patterns with their Morse HTML representation
  return html.replace(MORSE_HTML_REGEX, (match, word) => {
    try {
      // Check if the word exists in the MORSE_CODE dictionary
      const allCharsValid = word.split("").every((char: string) => char in MORSE_CODE);
      if (!allCharsValid) {
        // If any character is not in the dictionary, return the original match
        console.error(`Error converting Morse word "${word}": Contains unknown characters`);
        return match;
      }

      return getMorseHtmlForWord(word);
    } catch (error) {
      console.error(`Error converting Morse word "${word}": ${(error as Error).message}`);
      // Return the original match if there's an error
      return match;
    }
  });
}

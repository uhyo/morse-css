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
 * Regular expression to match {WORD} or {WORD+WORD+...} patterns in HTML
 * Captures the word or words inside the curly braces
 */
const MORSE_HTML_REGEX = /\{([^}]+)\}/g;

/**
 * Converts a pattern or multiple patterns to HTML markup
 *
 * @param input - The input pattern(s) to convert (e.g., "BOLD" or "BOLD+RED")
 * @returns The HTML markup for the pattern(s)
 * @throws Error if the pattern contains unknown characters
 */
export function convertPatternToHtml(input: string): string {
  // Split the input by + to get individual patterns
  const patterns = input.split("+");

  if (patterns.length === 0) {
    return "";
  }

  const htmlParts: string[] = [];

  for (let i = 0; i < patterns.length; i++) {
    const pattern = patterns[i].trim();

    // Skip empty patterns
    if (!pattern) {
      continue;
    }

    // Validate the pattern
    const allCharsValid = pattern.split("").every((char: string) => char in MORSE_CODE);
    if (!allCharsValid) {
      throw new Error(`Pattern "${pattern}" contains unknown characters`);
    }

    // Add the pattern's HTML
    htmlParts.push(getMorseHtmlForWord(pattern));

    // Add a <wbr> separator between patterns (except after the last one)
    if (i < patterns.length - 1) {
      htmlParts.push("<wbr>");
    }
  }

  return htmlParts.join("");
}

/**
 * Converts HTML with pseudo syntax like {BOLD} or {BOLD+RED+UNDERLINE} to actual Morse CSS compatible HTML
 * For multiple patterns, they are separated by <wbr> elements to allow multiple patterns to be applied
 * to a single element.
 *
 * @param html - The HTML content with pseudo syntax
 * @returns The converted HTML with actual Morse CSS compatible markup
 */
export function convertMorseHtml(html: string): string {
  // Replace all {WORD} or {WORD+WORD+...} patterns with their Morse HTML representation
  return html.replace(MORSE_HTML_REGEX, (match, words) => {
    try {
      return convertPatternToHtml(words);
    } catch (error) {
      console.error(`Error converting Morse words "${words}": ${(error as Error).message}`);
      // Return the original match if there's an error
      return match;
    }
  });
}

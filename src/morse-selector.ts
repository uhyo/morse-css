/**
 * Functions for converting Morse code to CSS selectors
 */

import { MorseChar, MorseCodeMap, MorseSequence } from "./types";

/**
 * Morse code mapping for letters and numbers
 */
export const MORSE_CODE: MorseCodeMap = {
  // Letters
  A: [".", "-"],
  B: ["-", ".", ".", "."],
  C: ["-", ".", "-", "."],
  D: ["-", ".", "."],
  E: ["."],
  F: [".", ".", "-", "."],
  G: ["-", "-", "."],
  H: [".", ".", ".", "."],
  I: [".", "."],
  J: [".", "-", "-", "-"],
  K: ["-", ".", "-"],
  L: [".", "-", ".", "."],
  M: ["-", "-"],
  N: ["-", "."],
  O: ["-", "-", "-"],
  P: [".", "-", "-", "."],
  Q: ["-", "-", ".", "-"],
  R: [".", "-", "."],
  S: [".", ".", "."],
  T: ["-"],
  U: [".", ".", "-"],
  V: [".", ".", ".", "-"],
  W: [".", "-", "-"],
  X: ["-", ".", ".", "-"],
  Y: ["-", ".", "-", "-"],
  Z: ["-", "-", ".", "."],

  // Numbers
  "0": ["-", "-", "-", "-", "-"],
  "1": [".", "-", "-", "-", "-"],
  "2": [".", ".", "-", "-", "-"],
  "3": [".", ".", ".", "-", "-"],
  "4": [".", ".", ".", ".", "-"],
  "5": [".", ".", ".", ".", "."],
  "6": ["-", ".", ".", ".", "."],
  "7": ["-", "-", ".", ".", "."],
  "8": ["-", "-", "-", ".", "."],
  "9": ["-", "-", "-", "-", "."],
};

/**
 * Converts a Morse character to its corresponding HTML pattern selector
 *
 * @param char - The Morse character (dot or dash)
 * @returns The HTML pattern selector for the Morse character
 */
export function getMorseSelectorForChar(char: MorseChar): string {
  if (char === ".") {
    // Dot: <i></i>
    return "i:empty";
  } else if (char === "-") {
    // Dash: <span></span>
    return "span:empty";
  } else {
    throw new Error(`Unknown Morse character: ${char}`);
  }
}

/**
 * Converts a Morse word to its corresponding HTML pattern selector
 * The selector will match patterns both at the beginning of an element
 * and after a <wbr> element, allowing multiple patterns to be applied
 * to a single element.
 *
 * @param morseWord - The Morse word to convert
 * @returns The HTML pattern selector for the Morse word
 */
export function getMorseSelectorForWord(morseWord: string): string {
  // Convert the word to an array of characters
  const characters = morseWord.split("");

  // Build the selector parts for each character
  const selectorParts: string[] = [];

  for (const char of characters) {
    const sequence = MORSE_CODE[char];
    if (!sequence) {
      throw new Error(`Unknown character in Morse word: ${char}`);
    }

    // Convert each Morse character to its selector
    for (const morseChar of sequence) {
      selectorParts.push(getMorseSelectorForChar(morseChar));
    }

    // Add a space between characters (represented by incrementing the child index)
    // This is handled by the adjacent sibling combinator (+)
  }

  // Create two different pattern selectors
  let beginningSelector = "";
  let afterWbrSelector = "";

  if (selectorParts.length > 0) {
    // For the beginning selector, add :first-child to the first part
    const beginningParts = [...selectorParts];
    beginningParts[0] = beginningParts[0] + ":first-child";
    beginningSelector = beginningParts.join(" + ");

    // For the after-wbr selector, don't add :first-child
    afterWbrSelector = "wbr + " + selectorParts.join(" + ");
  }

  // Return a selector that matches either pattern using :is() (or :where() for lower specificity)
  // The > (child combinator) is placed outside the :is() to ensure valid CSS syntax
  return "> :is(" + beginningSelector + ", " + afterWbrSelector + ")";
}

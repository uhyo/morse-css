/**
 * Translator for Morse code patterns
 */

import {
  MorseCodeMap,
  MorseChar,
  MorsePattern,
  MorseSequence,
  TranslatedMorsePattern,
} from "../types";

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
 * Translates Morse patterns to CSS selectors with HTML pattern selectors
 *
 * @param patterns - The detected Morse patterns
 * @returns The translated Morse patterns
 */
export function translateMorsePatterns(patterns: MorsePattern[]): TranslatedMorsePattern[] {
  return patterns.map((pattern) => {
    // Get the Morse code sequence for the word
    const morseSequence = getMorseSequenceForWord(pattern.morseWord);

    // Generate the CSS selector for the Morse sequence
    const translatedSelector = generateSelectorForMorseSequence(pattern.selector, morseSequence);

    return {
      fullMatch: pattern.fullMatch,
      translatedSelector,
      cssBlock: pattern.cssBlock,
    };
  });
}

/**
 * Gets the Morse code sequence for a word
 *
 * @param word - The word to convert to Morse code
 * @returns The Morse code sequence for the word
 */
function getMorseSequenceForWord(word: string): MorseSequence[] {
  // Convert the word to an array of characters
  const characters = word.split("");

  // Convert each character to its Morse code sequence
  return characters.map((char) => {
    const sequence = MORSE_CODE[char];
    if (!sequence) {
      throw new Error(`Unknown character in Morse word: ${char}`);
    }
    return sequence;
  });
}

/**
 * Generates a CSS selector for a Morse sequence
 *
 * @param baseSelector - The base selector to apply the Morse sequence to
 * @param morseSequence - The Morse sequence for the word
 * @returns The CSS selector for the Morse sequence
 */
function generateSelectorForMorseSequence(
  baseSelector: string,
  morseSequence: MorseSequence[]
): string {
  // Start with the base selector
  let selector = baseSelector;

  // Add the :has() selector to match the Morse sequence
  selector += `:has(`;

  // Generate the selector for the Morse sequence
  const patternSelectors: string[] = [];

  // Flatten the Morse sequence for the word
  const flatSequence: MorseChar[] = [];
  for (const charSequence of morseSequence) {
    for (const symbol of charSequence) {
      flatSequence.push(symbol);
    }
    // Add a space between characters
    flatSequence.push(" " as MorseChar);
  }

  // Remove the last space
  flatSequence.pop();

  // Generate the selector for each Morse symbol
  let currentIndex = 0;
  for (const symbol of flatSequence) {
    if (symbol === ".") {
      // Dot: <span></span>
      patternSelectors.push(`span:empty:nth-child(${currentIndex + 1})`);
      currentIndex++;
    } else if (symbol === "-") {
      // Dash: <span><span><span></span></span></span>
      patternSelectors.push(`span:nth-child(${currentIndex + 1}):has(span:has(span:empty))`);
      currentIndex++;
    } else if (symbol === " ") {
      // Space between characters: no element
      // Just increment the index for the next character
      currentIndex++;
    }
  }

  // Join the pattern selectors with the adjacent sibling combinator
  selector += patternSelectors.join(" + ");

  // Close the :has() selector
  selector += `)`;

  return selector;
}

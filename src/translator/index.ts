/**
 * Translator for Morse code patterns
 */

import { MorseCodeMap, MorsePattern, ParsedMorseRule, TranslatedMorseRule } from "../types";

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
 * Translates parsed Morse rules to CSS selectors with HTML pattern selectors
 *
 * @param parsedRules - The parsed Morse rules
 * @returns The translated Morse rules
 */
export function translateMorsePatterns(parsedRules: ParsedMorseRule[]): TranslatedMorseRule[] {
  return parsedRules.map((rule) => {
    // Get the Morse code pattern for the word
    const morsePattern = getMorsePatternForWord(rule.morseWord);

    // Generate the CSS selector for the Morse pattern
    const translatedSelector = generateSelectorForMorsePattern(rule.originalSelector, morsePattern);

    return {
      originalSelector: rule.originalSelector,
      translatedSelector,
      properties: rule.properties,
    };
  });
}

/**
 * Gets the Morse code pattern for a word
 *
 * @param word - The word to convert to Morse code
 * @returns The Morse code pattern for the word
 */
function getMorsePatternForWord(word: string): MorsePattern[] {
  // Convert the word to an array of characters
  const characters = word.split("");

  // Convert each character to its Morse code pattern
  return characters.map((char) => {
    const pattern = MORSE_CODE[char];
    if (!pattern) {
      throw new Error(`Unknown character in Morse word: ${char}`);
    }
    return pattern;
  });
}

/**
 * Generates a CSS selector for a Morse pattern
 *
 * @param baseSelector - The base selector to apply the Morse pattern to
 * @param morsePattern - The Morse pattern for the word
 * @returns The CSS selector for the Morse pattern
 */
function generateSelectorForMorsePattern(
  baseSelector: string,
  morsePattern: MorsePattern[]
): string {
  // Start with the base selector
  let selector = baseSelector;

  // Add the :has() selector to match the Morse pattern
  selector += `:has(`;

  // Generate the selector for the Morse pattern
  const patternSelectors: string[] = [];

  // Flatten the Morse pattern for the word
  const flatPattern: string[] = [];
  for (const charPattern of morsePattern) {
    for (const symbol of charPattern) {
      flatPattern.push(symbol);
    }
    // Add a space between characters
    flatPattern.push(" ");
  }

  // Remove the last space
  flatPattern.pop();

  // Generate the selector for each Morse symbol
  let currentIndex = 0;
  for (const symbol of flatPattern) {
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

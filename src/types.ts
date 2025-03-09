/**
 * Types for Morse CSS
 */

/**
 * Represents a detected Morse pattern in the CSS
 */
export interface MorsePattern {
  /** The full match including the :morse() selector */
  fullMatch: string;
  /** The selector part before :morse() */
  selector: string;
  /** The Morse code word extracted from the :morse() selector */
  morseWord: string;
  /** The CSS block content (everything between the curly braces) */
  cssBlock: string;
}

/**
 * Represents a translated Morse pattern
 */
export interface TranslatedMorsePattern {
  /** The original full match */
  fullMatch: string;
  /** The translated selector with HTML pattern selectors */
  translatedSelector: string;
  /** The original CSS block content */
  cssBlock: string;
}

/**
 * Represents a Morse code character (dot or dash)
 */
export type MorseChar = "." | "-";

/**
 * Represents a Morse code sequence as an array of dots and dashes
 */
export type MorseSequence = MorseChar[];

/**
 * Maps characters to their Morse code sequences
 */
export type MorseCodeMap = Record<string, MorseSequence>;

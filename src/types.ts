/**
 * Types for Morse CSS
 */

/**
 * Represents a CSS rule with a selector and properties
 */
export interface CSSRule {
  /** The CSS selector */
  selector: string;
  /** The CSS properties as key-value pairs */
  properties: Record<string, string>;
}

/**
 * Represents a parsed pseudo-CSS rule with a :morse() selector
 */
export interface ParsedMorseRule {
  /** The original selector containing :morse() */
  originalSelector: string;
  /** The Morse code word extracted from the :morse() selector */
  morseWord: string;
  /** The CSS properties as key-value pairs */
  properties: Record<string, string>;
}

/**
 * Represents a rule with translated Morse code patterns
 */
export interface TranslatedMorseRule {
  /** The original selector containing :morse() */
  originalSelector: string;
  /** The translated selector with HTML pattern selectors */
  translatedSelector: string;
  /** The CSS properties as key-value pairs */
  properties: Record<string, string>;
}

/**
 * Represents a Morse code character (dot or dash)
 */
export type MorseChar = "." | "-";

/**
 * Represents a Morse code pattern as an array of dots and dashes
 */
export type MorsePattern = MorseChar[];

/**
 * Maps characters to their Morse code patterns
 */
export type MorseCodeMap = Record<string, MorsePattern>;

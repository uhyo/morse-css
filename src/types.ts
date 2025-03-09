/**
 * Types for Morse CSS
 */

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

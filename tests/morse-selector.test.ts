import { describe, it, expect } from "vitest";
import {
  getMorseSelectorForChar,
  getMorseSelectorForWord,
  MORSE_CODE,
} from "../src/morse-selector";

describe("getMorseSelectorForChar", () => {
  it("should convert a dot to span:empty", () => {
    const result = getMorseSelectorForChar(".");
    expect(result).toBe("span:empty");
  });

  it("should convert a dash to span:has(span:has(span:empty))", () => {
    const result = getMorseSelectorForChar("-");
    expect(result).toBe("span:has(span:has(span:empty))");
  });

  it("should throw an error for unknown characters", () => {
    // @ts-expect-error Testing invalid input
    expect(() => getMorseSelectorForChar("x")).toThrow("Unknown Morse character: x");
  });
});

describe("getMorseSelectorForWord", () => {
  it("should convert a single letter word", () => {
    // A = .-
    const result = getMorseSelectorForWord("A");
    const expected = "span:empty + span:has(span:has(span:empty))";
    expect(result).toBe(expected);
  });

  it("should convert a multi-letter word", () => {
    // SOS = ... --- ...
    const result = getMorseSelectorForWord("SOS");

    // Build the expected selector for SOS
    const dotSelector = "span:empty";
    const dashSelector = "span:has(span:has(span:empty))";

    // S = ...
    const sSelector = `${dotSelector} + ${dotSelector} + ${dotSelector}`;
    // O = ---
    const oSelector = `${dashSelector} + ${dashSelector} + ${dashSelector}`;

    // SOS = ... --- ...
    const expected = `${sSelector} + ${oSelector} + ${sSelector}`;

    expect(result).toBe(expected);
  });

  it("should convert a word with numbers", () => {
    // A1 = .- .----
    const result = getMorseSelectorForWord("A1");

    // Build the expected selector for A1
    const dotSelector = "span:empty";
    const dashSelector = "span:has(span:has(span:empty))";

    // A = .-
    const aSelector = `${dotSelector} + ${dashSelector}`;
    // 1 = .----
    const oneSelector = `${dotSelector} + ${dashSelector} + ${dashSelector} + ${dashSelector} + ${dashSelector}`;

    // A1 = .- .----
    const expected = `${aSelector} + ${oneSelector}`;

    expect(result).toBe(expected);
  });

  it("should throw an error for unknown characters", () => {
    expect(() => getMorseSelectorForWord("A*B")).toThrow("Unknown character in Morse word: *");
  });

  it("should handle all letters and numbers", () => {
    // Test all letters A-Z and numbers 0-9
    const allChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (const char of allChars) {
      const result = getMorseSelectorForWord(char);
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);

      // Verify the result contains the correct number of selectors
      const sequence = MORSE_CODE[char];
      const expectedParts = sequence.length;
      const actualParts = result.split(" + ").length;
      expect(actualParts).toBe(expectedParts);
    }
  });

  it("should generate selectors that match the Morse code pattern", () => {
    // Test a few specific cases to ensure the pattern matches the Morse code
    const testCases = [
      { word: "E", morse: ".", parts: 1 },
      { word: "T", morse: "-", parts: 1 },
      { word: "A", morse: ".-", parts: 2 },
      { word: "N", morse: "-.", parts: 2 },
      { word: "SOS", morse: "...---...", parts: 9 },
    ];

    for (const { word, morse, parts } of testCases) {
      const result = getMorseSelectorForWord(word);
      const resultParts = result.split(" + ");

      // Check the number of parts matches the Morse code length
      expect(resultParts.length).toBe(parts);

      // Check each part corresponds to the correct Morse character
      for (let i = 0; i < morse.length; i++) {
        const morseChar = morse[i];
        const selectorPart = resultParts[i];

        if (morseChar === ".") {
          expect(selectorPart).toBe("span:empty");
        } else if (morseChar === "-") {
          expect(selectorPart).toBe("span:has(span:has(span:empty))");
        }
      }
    }
  });
});

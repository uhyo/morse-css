import { describe, it, expect } from "vitest";
import { getMorseSelectorForChar, getMorseSelectorForWord, MORSE_CODE } from "./morse-selector";

describe("getMorseSelectorForChar", () => {
  it("should convert a dot to i:empty", () => {
    const result = getMorseSelectorForChar(".");
    expect(result).toBe("i:empty");
  });

  it("should convert a dash to span:empty", () => {
    const result = getMorseSelectorForChar("-");
    expect(result).toBe("span:empty");
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
    const expected = "> i:empty:first-child + span:empty";
    expect(result).toBe(expected);
  });

  it("should convert a multi-letter word", () => {
    // SOS = ... --- ...
    const result = getMorseSelectorForWord("SOS");

    // Build the expected selector for SOS
    const dotSelector = "i:empty";
    const dashSelector = "span:empty";

    // S = ...
    const sSelector = `${dotSelector}:first-child + ${dotSelector} + ${dotSelector}`;
    // O = ---
    const oSelector = `${dashSelector} + ${dashSelector} + ${dashSelector}`;

    // SOS = ... --- ...
    // Note: Only the first span gets :first-child
    const expected = `> ${dotSelector}:first-child + ${dotSelector} + ${dotSelector} + ${dashSelector} + ${dashSelector} + ${dashSelector} + ${dotSelector} + ${dotSelector} + ${dotSelector}`;

    expect(result).toBe(expected);
  });

  it("should convert a word with numbers", () => {
    // A1 = .- .----
    const result = getMorseSelectorForWord("A1");

    // Build the expected selector for A1
    const dotSelector = "i:empty";
    const dashSelector = "span:empty";

    // A = .-
    const aSelector = `${dotSelector}:first-child + ${dashSelector}`;
    // 1 = .----
    const oneSelector = `${dotSelector} + ${dashSelector} + ${dashSelector} + ${dashSelector} + ${dashSelector}`;

    // A1 = .- .----
    const expected = `> ${aSelector} + ${oneSelector}`;

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

      // Check that the result starts with >
      expect(result.startsWith("> ")).toBe(true);

      // Remove the > prefix for part checking
      const resultWithoutPrefix = result.substring(2);
      const resultParts = resultWithoutPrefix.split(" + ");

      // Check the number of parts matches the Morse code length
      expect(resultParts.length).toBe(parts);

      // Check each part corresponds to the correct Morse character
      for (let i = 0; i < morse.length; i++) {
        const morseChar = morse[i];
        let selectorPart = resultParts[i];

        // Remove :first-child from the first part if present
        if (i === 0 && selectorPart.includes(":first-child")) {
          selectorPart = selectorPart.replace(":first-child", "");
        }

        if (morseChar === ".") {
          expect(selectorPart).toBe("i:empty");
        } else if (morseChar === "-") {
          expect(selectorPart).toBe("span:empty");
        }
      }
    }
  });
});

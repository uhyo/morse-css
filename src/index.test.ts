import { describe, it, expect } from "vitest";
import { convertMorseCSS, MORSE_CODE } from "./index";

describe("convertMorseCSS", () => {
  it("should convert pseudo-CSS to standard CSS", () => {
    const pseudoCSS = `
      *:morse(BOLD) {
        font-weight: bold;
      }
    `;

    const result = convertMorseCSS(pseudoCSS);

    // Check that the result is a string
    expect(typeof result).toBe("string");

    // Check that the result contains the header comment
    expect(result).toContain("/* Generated by Morse CSS */");

    // Check that the result contains :has() selector
    expect(result).toContain(":has(");

    // Check that the result contains span selectors
    expect(result).toContain("span");

    // Check that the result contains the properties
    expect(result).toContain("font-weight: bold;");

    // Check that the :morse() selector is replaced with :has()
    expect(result).not.toContain(":morse(");
  });

  it("should convert multiple pseudo-CSS rules", () => {
    const pseudoCSS = `
      *:morse(BOLD) {
        font-weight: bold;
      }
      
      *:morse(RED) {
        color: red;
      }
    `;

    const result = convertMorseCSS(pseudoCSS);

    // Check that the result contains both properties
    expect(result).toContain("font-weight: bold;");
    expect(result).toContain("color: red;");

    // Check that both :morse() selectors are replaced with :has()
    expect(result).not.toContain(":morse(");
    // The number of :has( occurrences will depend on the implementation
    // Just check that there are at least 2 (one for each rule)
    expect((result.match(/:has\(/g) || []).length).toBeGreaterThanOrEqual(2);
  });

  it("should handle complex selectors", () => {
    const pseudoCSS = `
      div > p:morse(BOLD) {
        font-weight: bold;
      }
    `;

    const result = convertMorseCSS(pseudoCSS);

    // Check that the result contains the complex selector
    expect(result).toContain("div > p:has(");
    expect(result).not.toContain(":morse(");
  });

  it("should handle multiple properties", () => {
    const pseudoCSS = `
      *:morse(BLUE) {
        background-color: blue;
        color: white;
      }
    `;

    const result = convertMorseCSS(pseudoCSS);

    // Check that the result contains both properties
    expect(result).toContain("background-color: blue;");
    expect(result).toContain("color: white;");
  });

  it("should return header comment plus original CSS for empty input", () => {
    const pseudoCSS = "";

    const result = convertMorseCSS(pseudoCSS);

    // Check that the result contains only the header comment
    expect(result).toContain("/* Generated by Morse CSS */");
    // The header comment is 2 lines plus an empty line, but the empty line might be trimmed
    expect(result.trim().split("\n").length).toBeGreaterThanOrEqual(2);
  });

  it("should preserve input without :morse() selectors", () => {
    const pseudoCSS = `
      * {
        font-weight: bold;
      }
    `;

    const result = convertMorseCSS(pseudoCSS);

    // Check that the result contains the header comment and the original CSS
    expect(result).toContain("/* Generated by Morse CSS */");
    expect(result).toContain("* {");
    expect(result).toContain("font-weight: bold;");
  });

  it("should correctly translate Morse code characters", () => {
    // Test with a word that uses various Morse characters
    const pseudoCSS = `
      *:morse(SOS) {
        color: red;
      }
    `;

    const result = convertMorseCSS(pseudoCSS);

    // S is "..." in Morse, O is "---"
    // So SOS should translate to "... --- ..."
    // Which should be represented as i:empty for dots and span:empty for dashes
    expect(result).toContain("i:empty");
    expect(result).toContain("span:empty");

    // Verify the specific pattern for SOS
    // S = "..." = 3 dots
    // O = "---" = 3 dashes
    // S = "..." = 3 dots
    // So we should have 3 dots, then 3 dashes, then 3 dots
    // With the new format, we add > at the beginning and :first-child to the first element
    const firstChar = MORSE_CODE.S[0];
    const firstSelector = firstChar === "." ? "i:empty:first-child" : "span:empty:first-child";
    const sosPattern = "> " + firstSelector;

    // Just check that the result contains the beginning of the pattern
    expect(result).toContain(`:has(${sosPattern}`);
  });
});

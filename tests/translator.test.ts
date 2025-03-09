import { describe, it, expect } from "vitest";
import { translateMorsePatterns } from "../src/translator";
import { MorsePattern } from "../src/types";

describe("translateMorsePatterns", () => {
  it("should translate a simple Morse pattern", () => {
    const morsePatterns: MorsePattern[] = [
      {
        fullMatch: "*:morse(BOLD) { font-weight: bold; }",
        selector: "*",
        morseWord: "BOLD",
        cssBlock: "font-weight: bold;",
      },
    ];

    const result = translateMorsePatterns(morsePatterns);

    expect(result).toHaveLength(1);
    expect(result[0].fullMatch).toBe("*:morse(BOLD) { font-weight: bold; }");
    expect(result[0].cssBlock).toBe("font-weight: bold;");
    // The translated selector should contain :has() and span selectors
    expect(result[0].translatedSelector).toContain(":has(");
    expect(result[0].translatedSelector).toContain("span");
  });

  it("should translate multiple Morse patterns", () => {
    const morsePatterns: MorsePattern[] = [
      {
        fullMatch: "*:morse(BOLD) { font-weight: bold; }",
        selector: "*",
        morseWord: "BOLD",
        cssBlock: "font-weight: bold;",
      },
      {
        fullMatch: "*:morse(RED) { color: red; }",
        selector: "*",
        morseWord: "RED",
        cssBlock: "color: red;",
      },
    ];

    const result = translateMorsePatterns(morsePatterns);

    expect(result).toHaveLength(2);
    // Check the first pattern
    expect(result[0].fullMatch).toBe("*:morse(BOLD) { font-weight: bold; }");
    expect(result[0].cssBlock).toBe("font-weight: bold;");
    expect(result[0].translatedSelector).toContain(":has(");

    // Check the second pattern
    expect(result[1].fullMatch).toBe("*:morse(RED) { color: red; }");
    expect(result[1].cssBlock).toBe("color: red;");
    expect(result[1].translatedSelector).toContain(":has(");
  });

  it("should translate Morse patterns with complex selectors", () => {
    const morsePatterns: MorsePattern[] = [
      {
        fullMatch: "div > p:morse(BOLD) { font-weight: bold; }",
        selector: "div > p",
        morseWord: "BOLD",
        cssBlock: "font-weight: bold;",
      },
    ];

    const result = translateMorsePatterns(morsePatterns);

    expect(result).toHaveLength(1);
    expect(result[0].translatedSelector).toContain("div > p:has(");
  });

  it("should handle unknown characters in Morse words", () => {
    const morsePatterns: MorsePattern[] = [
      {
        fullMatch: "*:morse(BOLD123) { font-weight: bold; }",
        selector: "*",
        morseWord: "BOLD123", // Contains numbers which should be handled by the translator
        cssBlock: "font-weight: bold;",
      },
    ];

    // This should not throw an error since the translator handles numbers
    expect(() => translateMorsePatterns(morsePatterns)).not.toThrow();
  });
});

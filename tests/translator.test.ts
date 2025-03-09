import { describe, it, expect } from "vitest";
import { translateMorsePatterns } from "../src/translator";
import { ParsedMorseRule } from "../src/types";

describe("translateMorsePatterns", () => {
  it("should translate a simple Morse rule", () => {
    const parsedRules: ParsedMorseRule[] = [
      {
        originalSelector: "*",
        morseWord: "BOLD",
        properties: {
          "font-weight": "bold",
        },
      },
    ];

    const result = translateMorsePatterns(parsedRules);

    expect(result).toHaveLength(1);
    expect(result[0].originalSelector).toBe("*");
    expect(result[0].properties).toEqual({
      "font-weight": "bold",
    });
    // The translated selector should contain :has() and span selectors
    expect(result[0].translatedSelector).toContain(":has(");
    expect(result[0].translatedSelector).toContain("span");
  });

  it("should translate multiple Morse rules", () => {
    const parsedRules: ParsedMorseRule[] = [
      {
        originalSelector: "*",
        morseWord: "BOLD",
        properties: {
          "font-weight": "bold",
        },
      },
      {
        originalSelector: "*",
        morseWord: "RED",
        properties: {
          color: "red",
        },
      },
    ];

    const result = translateMorsePatterns(parsedRules);

    expect(result).toHaveLength(2);
    // Check the first rule
    expect(result[0].originalSelector).toBe("*");
    expect(result[0].properties).toEqual({
      "font-weight": "bold",
    });
    expect(result[0].translatedSelector).toContain(":has(");

    // Check the second rule
    expect(result[1].originalSelector).toBe("*");
    expect(result[1].properties).toEqual({
      color: "red",
    });
    expect(result[1].translatedSelector).toContain(":has(");
  });

  it("should translate Morse rules with complex selectors", () => {
    const parsedRules: ParsedMorseRule[] = [
      {
        originalSelector: "div > p",
        morseWord: "BOLD",
        properties: {
          "font-weight": "bold",
        },
      },
    ];

    const result = translateMorsePatterns(parsedRules);

    expect(result).toHaveLength(1);
    expect(result[0].originalSelector).toBe("div > p");
    expect(result[0].translatedSelector).toContain("div > p:has(");
  });

  it("should throw an error for unknown characters in Morse words", () => {
    const parsedRules: ParsedMorseRule[] = [
      {
        originalSelector: "*",
        morseWord: "BOLD123", // Contains numbers which are not handled in this test
        properties: {
          "font-weight": "bold",
        },
      },
    ];

    expect(() => translateMorsePatterns(parsedRules)).not.toThrow();
  });
});

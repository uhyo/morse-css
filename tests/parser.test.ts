import { describe, it, expect } from "vitest";
import { parsePseudoCSS } from "../src/parser";

describe("parsePseudoCSS", () => {
  it("should parse a simple pseudo-CSS rule", () => {
    const pseudoCSS = `
      *:morse(BOLD) {
        font-weight: bold;
      }
    `;

    const result = parsePseudoCSS(pseudoCSS);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      originalSelector: "*",
      morseWord: "BOLD",
      properties: {
        "font-weight": "bold",
      },
    });
  });

  it("should parse multiple pseudo-CSS rules", () => {
    const pseudoCSS = `
      *:morse(BOLD) {
        font-weight: bold;
      }
      
      *:morse(RED) {
        color: red;
      }
    `;

    const result = parsePseudoCSS(pseudoCSS);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      originalSelector: "*",
      morseWord: "BOLD",
      properties: {
        "font-weight": "bold",
      },
    });
    expect(result[1]).toEqual({
      originalSelector: "*",
      morseWord: "RED",
      properties: {
        color: "red",
      },
    });
  });

  it("should parse pseudo-CSS rules with multiple properties", () => {
    const pseudoCSS = `
      *:morse(BLUE) {
        background-color: blue;
        color: white;
      }
    `;

    const result = parsePseudoCSS(pseudoCSS);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      originalSelector: "*",
      morseWord: "BLUE",
      properties: {
        "background-color": "blue",
        color: "white",
      },
    });
  });

  it("should parse pseudo-CSS rules with complex selectors", () => {
    const pseudoCSS = `
      div > p:morse(BOLD) {
        font-weight: bold;
      }
    `;

    const result = parsePseudoCSS(pseudoCSS);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      originalSelector: "div > p",
      morseWord: "BOLD",
      properties: {
        "font-weight": "bold",
      },
    });
  });

  it("should return an empty array for pseudo-CSS without :morse() selectors", () => {
    const pseudoCSS = `
      * {
        font-weight: bold;
      }
    `;

    const result = parsePseudoCSS(pseudoCSS);

    expect(result).toHaveLength(0);
  });
});

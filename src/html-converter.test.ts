import { describe, it, expect } from "vitest";
import { convertMorseHtml } from "./html-converter";

describe("convertMorseHtml", () => {
  it("should convert {BOLD} to Morse HTML", () => {
    const input = "<p>{BOLD} This is bold text</p>";
    const result = convertMorseHtml(input);

    // Check that the result is a string
    expect(typeof result).toBe("string");

    // Check that the {BOLD} pattern is replaced
    expect(result).not.toContain("{BOLD}");

    // Check that the result contains span elements
    expect(result).toContain("<span></span>");
    expect(result).toContain("<span><span><span></span></span></span>");
  });

  it("should convert multiple patterns in the same HTML", () => {
    const input = "<p>{BOLD} Bold text</p><p>{RED} Red text</p>";
    const result = convertMorseHtml(input);

    // Check that both patterns are replaced
    expect(result).not.toContain("{BOLD}");
    expect(result).not.toContain("{RED}");

    // Check that the result contains span elements
    expect(result).toContain("<span></span>");
    expect(result).toContain("<span><span><span></span></span></span>");
  });

  it("should handle patterns within HTML attributes", () => {
    const input = '<div data-morse="{BOLD}" class="test">Test</div>';
    const result = convertMorseHtml(input);

    // Check that the pattern in the attribute is replaced
    expect(result).not.toContain('data-morse="{BOLD}"');
    expect(result).toContain("data-morse=");
    expect(result).toContain("<span></span>");
  });

  it("should preserve HTML that doesn't contain patterns", () => {
    const input = "<p>This is regular HTML without patterns</p>";
    const result = convertMorseHtml(input);

    // Check that the result is the same as the input
    expect(result).toBe(input);
  });

  it("should handle patterns at the beginning, middle, and end of text", () => {
    const input = "{BOLD} at beginning, in the {ITALIC} middle, and at the end {RED}";
    const result = convertMorseHtml(input);

    // Check that all patterns are replaced
    expect(result).not.toContain("{BOLD}");
    expect(result).not.toContain("{ITALIC}");
    expect(result).not.toContain("{RED}");
  });

  it("should handle invalid patterns gracefully", () => {
    const input = "<p>{INVALID!} This has an invalid pattern</p>";

    // Should not throw an error
    expect(() => convertMorseHtml(input)).not.toThrow();

    // The invalid pattern should remain unchanged
    const result = convertMorseHtml(input);
    expect(result).toContain("{INVALID!}");
  });

  it("should handle complex HTML structure", () => {
    const input = `
      <div class="container">
        <header>
          <h1>{BOLD} Bold Heading</h1>
        </header>
        <main>
          <section>
            <p>{ITALIC} Italic paragraph</p>
            <ul>
              <li>{RED} Red list item</li>
              <li>Normal list item</li>
            </ul>
          </section>
        </main>
      </div>
    `;

    const result = convertMorseHtml(input);

    // Check that all patterns are replaced
    expect(result).not.toContain("{BOLD}");
    expect(result).not.toContain("{ITALIC}");
    expect(result).not.toContain("{RED}");

    // Check that the HTML structure is preserved
    expect(result).toContain('<div class="container">');
    expect(result).toContain("<header>");
    expect(result).toContain("<h1>");
    expect(result).toContain("<main>");
    expect(result).toContain("<section>");
    expect(result).toContain("<p>");
    expect(result).toContain("<ul>");
    expect(result).toContain("<li>");
  });
});

#!/usr/bin/env node
/**
 * Generate script for Morse CSS
 *
 * This script generates the morse.css file and converted HTML examples
 * from the source files.
 */

import fs from "fs";
import path from "path";
import { convertMorseCSS } from "./index";
import { convertMorseHtml } from "./html-converter";

// Paths
const PSEUDO_CSS_PATH = path.join(process.cwd(), "pseudo-css", "example.pcss");
const CSS_OUTPUT_PATH = path.join(process.cwd(), "dist", "morse.css");
const PSEUDO_HTML_PATH = path.join(process.cwd(), "examples", "pseudo-syntax.html");
const HTML_OUTPUT_PATH = path.join(process.cwd(), "examples", "converted.html");

// Ensure dist directory exists
if (!fs.existsSync(path.dirname(CSS_OUTPUT_PATH))) {
  fs.mkdirSync(path.dirname(CSS_OUTPUT_PATH), { recursive: true });
}

// Generate CSS
console.log(`Generating CSS from ${PSEUDO_CSS_PATH}...`);
try {
  const pseudoCSS = fs.readFileSync(PSEUDO_CSS_PATH, "utf-8");
  const css = convertMorseCSS(pseudoCSS);
  fs.writeFileSync(CSS_OUTPUT_PATH, css);
  console.log(`CSS written to ${CSS_OUTPUT_PATH}`);
} catch (error) {
  console.error(`Error generating CSS: ${(error as Error).message}`);
  process.exit(1);
}

// Generate HTML
console.log(`\nGenerating HTML from ${PSEUDO_HTML_PATH}...`);
try {
  const pseudoHTML = fs.readFileSync(PSEUDO_HTML_PATH, "utf-8");
  const html = convertMorseHtml(pseudoHTML);
  fs.writeFileSync(HTML_OUTPUT_PATH, html);
  console.log(`HTML written to ${HTML_OUTPUT_PATH}`);
} catch (error) {
  console.error(`Error generating HTML: ${(error as Error).message}`);
  process.exit(1);
}

console.log("\nGeneration complete!");

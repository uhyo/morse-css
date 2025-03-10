#!/usr/bin/env node
/**
 * Generate script for Morse CSS
 *
 * This script generates the morse.css file and converted HTML examples
 * from the source files.
 */

import fs from "fs";
import path from "path";
import { convertMorseCSS } from "./core/index";
import { convertMorseHtml } from "./core/html-converter";

// Paths
const PSEUDO_CSS_PATH = path.join(process.cwd(), "src", "css", "example.pcss");
const CSS_OUTPUT_PATH = path.join(process.cwd(), "output", "morse.css");
const PSEUDO_HTML_PATH = path.join(process.cwd(), "src", "html", "pseudo-syntax.html");
const HTML_OUTPUT_PATH = path.join(process.cwd(), "output", "converted.html");

// Ensure output directory exists
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
  // Convert the Morse code patterns
  let html = convertMorseHtml(pseudoHTML);
  // Fix the CSS path for the output file
  html = html.replace("../output/morse.css", "morse.css");
  fs.writeFileSync(HTML_OUTPUT_PATH, html);
  console.log(`HTML written to ${HTML_OUTPUT_PATH}`);
} catch (error) {
  console.error(`Error generating HTML: ${(error as Error).message}`);
  process.exit(1);
}

console.log("\nGeneration complete!");

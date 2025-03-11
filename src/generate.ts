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
const PSEUDO_CSS_PATH = path.join(process.cwd(), "src", "css", "morse.pcss");
const CSS_OUTPUT_PATH = path.join(process.cwd(), "website", "morse.css");
const PSEUDO_HTML_PATH = path.join(process.cwd(), "src", "html", "pseudo-syntax.html");
const HTML_OUTPUT_PATH = path.join(process.cwd(), "website", "examples", "converted.html");
const WEBSITE_PSEUDO_HTML_PATH = path.join(process.cwd(), "src", "website", "index.pseudo.html");
const WEBSITE_HTML_OUTPUT_PATH = path.join(process.cwd(), "website", "index.html");

// Ensure output directory exists
if (!fs.existsSync(path.dirname(CSS_OUTPUT_PATH))) {
  fs.mkdirSync(path.dirname(CSS_OUTPUT_PATH), { recursive: true });
}

// Ensure examples directory exists
if (!fs.existsSync(path.dirname(HTML_OUTPUT_PATH))) {
  fs.mkdirSync(path.dirname(HTML_OUTPUT_PATH), { recursive: true });
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
  html = html.replace("../output/morse.css", "../morse.css");
  fs.writeFileSync(HTML_OUTPUT_PATH, html);
  console.log(`HTML written to ${HTML_OUTPUT_PATH}`);
} catch (error) {
  console.error(`Error generating HTML: ${(error as Error).message}`);
  process.exit(1);
}

// Generate Website HTML
console.log(`\nGenerating Website HTML from ${WEBSITE_PSEUDO_HTML_PATH}...`);
try {
  // Check if the website pseudo HTML file exists
  if (fs.existsSync(WEBSITE_PSEUDO_HTML_PATH)) {
    const websitePseudoHTML = fs.readFileSync(WEBSITE_PSEUDO_HTML_PATH, "utf-8");
    // Convert the Morse code patterns
    const websiteHtml = convertMorseHtml(websitePseudoHTML);
    fs.writeFileSync(WEBSITE_HTML_OUTPUT_PATH, websiteHtml);
    console.log(`Website HTML written to ${WEBSITE_HTML_OUTPUT_PATH}`);
  } else {
    console.log(`Website pseudo HTML file ${WEBSITE_PSEUDO_HTML_PATH} does not exist. Skipping.`);
  }
} catch (error) {
  console.error(`Error generating Website HTML: ${(error as Error).message}`);
  // Don't exit the process, just log the error and continue
  console.error("Continuing with other generation tasks...");
}

console.log("\nGeneration complete!");

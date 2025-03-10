#!/usr/bin/env node
/**
 * Command-line interface for Morse HTML converter
 *
 * This module provides a CLI tool to convert HTML files with pseudo syntax like {BOLD}
 * to actual Morse CSS compatible HTML with the appropriate <span> elements.
 */

import fs from "fs";
import path from "path";
import { convertMorseHtml } from "./html-converter";

// Get command-line arguments
const args = process.argv.slice(2);

// Show usage if no arguments are provided
if (args.length === 0) {
  console.log("Usage: morse-html <input-file> [output-file]");
  console.log("");
  console.log("If no output file is specified, the output is written to stdout.");
  process.exit(0);
}

// Get input and output file paths
const inputFile = args[0];
const outputFile = args[1];

// Check if input file exists
if (!fs.existsSync(inputFile)) {
  console.error(`Error: Input file "${inputFile}" does not exist.`);
  process.exit(1);
}

try {
  // Read input file
  const inputHtml = fs.readFileSync(inputFile, "utf-8");

  // Convert HTML
  const outputHtml = convertMorseHtml(inputHtml);

  // Write output
  if (outputFile) {
    // Create directory if it doesn't exist
    const outputDir = path.dirname(outputFile);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write to output file
    fs.writeFileSync(outputFile, outputHtml);
    console.log(`Converted HTML written to "${outputFile}".`);
  } else {
    // Write to stdout
    console.log(outputHtml);
  }
} catch (error) {
  console.error(`Error: ${(error as Error).message}`);
  process.exit(1);
}

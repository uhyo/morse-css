#!/usr/bin/env node

/**
 * Command-line interface for Morse CSS
 *
 * This script converts pseudo-CSS files with :morse() selectors to standard CSS.
 *
 * Usage:
 *   npx morse-css <input-file> [output-file]
 *
 * If no output file is specified, the output will be written to stdout.
 */

import fs from "fs";
import path from "path";
import { convertMorseCSS } from "./index";

// Get the input and output file paths from the command-line arguments
const inputFile = process.argv[2];
const outputFile = process.argv[3];

// Check if the input file is specified
if (!inputFile) {
  console.error("Error: No input file specified");
  console.error("Usage: npx morse-css <input-file> [output-file]");
  process.exit(1);
}

try {
  // Read the input file
  const inputPath = path.resolve(process.cwd(), inputFile);
  const pseudoCSS = fs.readFileSync(inputPath, "utf-8");

  // Convert the pseudo-CSS to standard CSS
  const css = convertMorseCSS(pseudoCSS);

  // Write the output
  if (outputFile) {
    // Write to the output file
    const outputPath = path.resolve(process.cwd(), outputFile);
    fs.writeFileSync(outputPath, css);
    console.log(`CSS written to ${outputPath}`);
  } else {
    // Write to stdout
    console.log(css);
  }
} catch (error) {
  console.error(`Error: ${(error as Error).message}`);
  process.exit(1);
}

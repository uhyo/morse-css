#!/usr/bin/env node
/**
 * Interactive Command-line interface for Morse HTML converter
 *
 * This module provides an interactive CLI tool to convert user inputs like `BOLD+RED`
 * to corresponding HTML markup with the appropriate <span> and <i> elements.
 */

import * as readline from "readline";
import { convertPatternToHtml } from "./html-converter";

/**
 * Wrapper for convertPatternToHtml that handles errors
 *
 * @param input - The input pattern(s) to convert (e.g., "BOLD" or "BOLD+RED")
 * @returns The HTML markup for the pattern(s) or an error message
 */
function convertPatternWithErrorHandling(input: string): string {
  try {
    return convertPatternToHtml(input);
  } catch (error) {
    return `Error: ${(error as Error).message}`;
  }
}

/**
 * Displays the help message
 */
function displayHelp(): void {
  console.log("Available commands:");
  console.log("  - Any pattern name (e.g., BOLD, RED, etc.) or combination (e.g., BOLD+RED)");
  console.log("  - help: Display this help message");
  console.log("  - list: Show all available patterns");
  console.log("  - exit: Exit the program");
}

/**
 * Displays the list of available patterns
 */
function displayPatternList(): void {
  console.log("Available patterns:");

  console.log("\nText Formatting:");
  console.log("  BOLD, ITALIC, UNDERLINE, STRIKE, OVERLINE, SMALL, MEDIUM, LARGE, XLARGE, XXLARGE");

  console.log("\nText Alignment:");
  console.log("  CENTER, LEFT, RIGHT");

  console.log("\nDisplay:");
  console.log("  HIDE");

  console.log("\nColors:");
  console.log("  RED, GREEN, BLUE, YELLOW, PURPLE, ORANGE, BLACK, WHITE, GRAY");
  console.log("  BGRED, BGGREEN, BGBLUE, BGYELLOW, BGPURPLE, BGORANGE, BGBLACK, BGWHITE, BGGRAY");

  console.log("\nSpacing:");
  console.log("  PADDING1, PADDING2, PADDING3, PADDING4, PADDING5");
  console.log("  MARGIN1, MARGIN2, MARGIN3, MARGIN4, MARGIN5");
  console.log("  GAP1, GAP2, GAP3");

  console.log("\nLayout:");
  console.log("  FLEX, FLEXROW, FLEXCOL, GRID, START, END, BETWEEN, AROUND");

  console.log("\nSize:");
  console.log("  FULL, HALF, THIRD, QUARTER, TALL, SHORT");

  console.log("\nBorders:");
  console.log("  BORDER, BORDERTHIN, BORDERTHICK, ROUND, ROUNDFULL");
}

/**
 * Main function to run the interactive CLI
 */
function runInteractiveCli(): void {
  // Create readline interface
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> ",
  });

  // Display welcome message
  console.log("Welcome to Morse CSS Interactive Converter!");
  console.log("Type a pattern (e.g., BOLD or BOLD+RED) to convert it to HTML markup.");
  console.log("Type 'help' for more information or 'exit' to quit.");
  console.log("");

  // Prompt for input
  rl.prompt();

  // Handle input
  rl.on("line", (line) => {
    const input = line.trim();

    // Process commands
    if (input.toLowerCase() === "exit" || input.toLowerCase() === "quit") {
      console.log("Goodbye!");
      rl.close();
      return;
    } else if (input.toLowerCase() === "help") {
      displayHelp();
    } else if (input.toLowerCase() === "list") {
      displayPatternList();
    } else if (input) {
      // Convert the input to HTML markup
      const html = convertPatternWithErrorHandling(input);
      console.log(html);
    }

    // Prompt for next input
    console.log("");
    rl.prompt();
  });

  // Handle close
  rl.on("close", () => {
    process.exit(0);
  });
}

// Run the interactive CLI if this file is executed directly
if (require.main === module) {
  runInteractiveCli();
}

#!/usr/bin/env node

import { createRequire } from "node:module";
import process from "node:process";
import { runContextCommand } from "./commands/context.js";
import { runGenerateCommand } from "./commands/generate.js";
import { runInitCommand } from "./commands/init.js";
import { runScanCommand } from "./commands/scan.js";

let version = "0.1.0";

try {
  const require = createRequire(import.meta.url);
  const packageJson = require("../package.json") as { version: string };
  version = packageJson.version;
} catch {
  // Keep the CLI usable if package metadata is unavailable in a bundled runtime.
}

const [, , command, coordinate] = process.argv;

switch (command) {
  case "init":
    runInitCommand();
    break;
  case "scan":
  case "discover":
    runScanCommand();
    break;
  case "classify":
    console.log("ContextAtlas classify: evidence-based classifier not implemented yet.");
    break;
  case "resolve":
    console.log("ContextAtlas resolve: URL, page, or file resolver not implemented yet.");
    break;
  case "generate":
    runGenerateCommand();
    break;
  case "context":
    runContextCommand(coordinate);
    break;
  case undefined:
  case "help":
  case "--help":
  case "-h":
    printHelp();
    break;
  case "--version":
  case "-v":
    console.log(version);
    break;
  default:
    console.error(`ContextAtlas: unknown command "${command}".`);
    printHelp();
    process.exitCode = 1;
}

function printHelp(): void {
  console.log(`ContextAtlas CLI

Usage:
  contextatlas init
  contextatlas discover
  contextatlas classify
  contextatlas generate
  contextatlas resolve <url-or-coordinate>
  contextatlas context <coordinate>

Aliases:
  contextatlas scan
`);
}

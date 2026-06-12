#!/usr/bin/env node

import { createRequire } from "node:module";
import process from "node:process";
import { runContextCommand } from "./commands/context.js";
import { runGenerateCommand } from "./commands/generate.js";
import { runInitCommand } from "./commands/init.js";
import { runScanCommand } from "./commands/scan.js";

const require = createRequire(import.meta.url);
const packageJson = require("../package.json") as { version: string };
const version = packageJson.version;
const [, , command, coordinate] = process.argv;

switch (command) {
  case "init":
    runInitCommand();
    break;
  case "scan":
    runScanCommand();
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
  contextatlas scan
  contextatlas generate
  contextatlas context <coordinate>
`);
}

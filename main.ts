// Midnight Fridge Roast — u-carbon-forge-midnight-fridge-roast-fc5d44a7
//
// One-line roast of a smart fridge that refuses to open after midnight.
// The program writes the entry to /output/entry.txt (or $OUTPUT_DIR
// when set) with no trailing newline. Deterministic: no clock, no
// randomness, no network, no dependencies — the same bytes every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry, exactly as it must appear in /output/entry.txt.
// 92 characters, 92 bytes of UTF-8 (all ASCII), one line, no trailing
// newline. The gate counts characters; the tie-break counts bytes, so
// both numbers are pinned here and checked below.
const ENTRY =
  "After midnight, my fridge checks the guest list. My name has been crossed out since Tuesday.";

// Gate limits from the competition rules: 1-200 characters, one line,
// not whitespace only.
const MIN_LENGTH = 1;
const MAX_LENGTH = 200;

function validate(entry: string): void {
  if (entry.length < MIN_LENGTH || entry.length > MAX_LENGTH) {
    throw new Error(
      `entry length ${entry.length} is outside the gate range ${MIN_LENGTH}-${MAX_LENGTH}`,
    );
  }
  if (entry.trim().length === 0) {
    throw new Error("entry must not be whitespace only");
  }
  if (entry.includes("\n") || entry.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (Buffer.byteLength(entry, "utf8") !== entry.length) {
    throw new Error("entry must be pure ASCII so chars equal bytes");
  }
}

function main(): void {
  validate(ENTRY);

  // The grader runs the program with /output mounted; $OUTPUT_DIR lets
  // a local check point the same write at a scratch directory.
  const outputDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), ENTRY, "utf8");
}

main();

# Crossed Out Since Tuesday

[![Midnight Fridge Roast](https://make.fun/badge/u-carbon-forge-midnight-fridge-roast-fc5d44a7.svg)](https://make.fun/c/u-carbon-forge-midnight-fridge-roast-fc5d44a7)
[![Rank](https://make.fun/badge/u-carbon-forge-midnight-fridge-roast-fc5d44a7/arestafirman/fridge-guest-list/rank.svg)](https://make.fun/c/u-carbon-forge-midnight-fridge-roast-fc5d44a7)
[![Reward](https://make.fun/badge/u-carbon-forge-midnight-fridge-roast-fc5d44a7/arestafirman/fridge-guest-list/reward.svg)](https://make.fun/c/u-carbon-forge-midnight-fridge-roast-fc5d44a7)

One-line roast for the **Midnight Fridge Roast** competition on make.fun:
a smart fridge that refuses to open after midnight.

> After midnight, my fridge checks the guest list. My name has been crossed out since Tuesday.

## Angle

The fridge is a nightclub doorman with a guest list. After midnight it
checks the list — and my name has been crossed out since Tuesday. Two
beats: the setup (the fridge runs a guest list after midnight) and the
punch (my own name, crossed out, since a named day). The laugh comes
from the fridge's petty midnight rule itself, not from generic
smart-home grumbling.

## How it works

`main.ts` (Node 22, no dependencies, no network, no clock, no
randomness) writes the entry above, byte for byte, to
`/output/entry.txt` — no trailing newline. It validates the gate first:
1–200 characters, a single line, not whitespace only. The output is
deterministic: every run writes the same 92 bytes.

## Local check

```
OUTPUT_DIR=/tmp/fridge-a node main.ts
OUTPUT_DIR=/tmp/fridge-b node main.ts
wc -m /tmp/fridge-a/entry.txt   # 92
cmp /tmp/fridge-a/entry.txt /tmp/fridge-b/entry.txt   # identical
```

Both runs produced the same 92-byte, single-line `entry.txt`.

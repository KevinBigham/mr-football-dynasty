# Hybrid v3 Integration Contract

## Purpose
Defines the shared contract surface between Codex lane (launcher/runtime/infra) and Claude lane (gameplay systems/data) for stable hybrid release gating.

## Contract Inputs (Claude -> Codex)
1. Sim output shape and score-field expectations.
2. Draft commentary threshold behavior.
3. Trade-engine acceptance thresholds.
4. Chemistry/system-fit invariants.
5. Rivalry heat/trophy behavior invariants.

## Contract Inputs (Codex -> Claude)
1. Launcher mode routing precedence.
2. Playability report schema and gate semantics.
3. Lane policy and shared-window change protocol.

## Gate Behavior
1. Contract drift should fail `verify:contracts` when added.
2. Drift messages must identify owner lane and required follow-up.

import type { Format, LevelCode, StageKey } from "./programmes";

export const STAGE_OPTS: StageKey[] = ["foundation", "generative", "agentic", "physical", "core", "drive", "all"];
export const LEVEL_OPTS: LevelCode[] = ["C1", "C2", "C3", "C4", "C5"];
export const FORMAT_OPTS: Format[] = ["Self-paced", "Cohort", "Executive", "For organisations"];

export type Filters = { q: string; stage: StageKey | null; level: LevelCode | null; format: Format | null };
export const EMPTY: Filters = { q: "", stage: null, level: null, format: null };

/** Reads ?stage=&level=&format=&q= into catalogue filters. Shared by the server page and the client explorer. */
export function parseFilters(get: (key: string) => string | null | undefined): Filters {
  const stage = get("stage") as StageKey | null | undefined;
  const level = get("level")?.toUpperCase() as LevelCode | undefined;
  const format = get("format") as Format | null | undefined;
  return {
    q: get("q") ?? "",
    stage: stage && STAGE_OPTS.includes(stage) ? stage : null,
    level: level && LEVEL_OPTS.includes(level) ? level : null,
    format: format && FORMAT_OPTS.includes(format) ? format : null,
  };
}

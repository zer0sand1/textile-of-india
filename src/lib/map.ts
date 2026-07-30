import indiaStatesData from "../data/india-states.json";

export interface IndiaStateData {
  source: string;
  sourceUrl: string;
  viewBox: [number, number, number, number];
  project: { x: string; y: string };
  states: Array<{ slug: string; name: string; path: string }>;
}

export interface CraftThumbData {
  slug: string;
  name: string;
  summary: string;
  imageSrc: string;
  imageAlt: string;
}

export interface PlaceCluster {
  placeSlug: string;
  x: number;
  y: number;
  crafts: CraftThumbData[];
}

/** Craft shown in the state side panel — same shape as a map thumb payload. */
export type StateCraftEntry = CraftThumbData;

export const mapData = indiaStatesData as unknown as IndiaStateData;

export function projectPoint(lng: number, lat: number): { x: number; y: number } {
  return { x: lng, y: -lat };
}

/** Resolve the Indian state/UT slug a Place belongs to. */
export function placeStateSlug(place: {
  slug: string;
  granularity: string;
  parentState?: string;
}): string | undefined {
  if (place.parentState) return place.parentState;
  if (place.granularity === "state") return place.slug;
  return undefined;
}

import indiaStatesData from "../data/india-states.json";

export interface IndiaStateData {
  source: string;
  sourceUrl: string;
  viewBox: [number, number, number, number];
  project: { x: string; y: string };
  states: Array<{ slug: string; name: string; path: string }>;
}

export const mapData = indiaStatesData as unknown as IndiaStateData;

export function projectPoint(lng: number, lat: number): { x: number; y: number } {
  return { x: lng, y: -lat };
}

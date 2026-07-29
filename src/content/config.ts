import { z, defineCollection, reference } from "astro:content";

const techniqueSchema = z.enum([
  "weave",
  "embroidery",
  "block-print",
  "resist-dye",
  "hand-paint",
]);

const creditSchema = z.object({
  author: z.string().min(1, "Image credit must have an author"),
  license: z.string().min(1, "Image credit must have a license"),
  sourceUrl: z.string().url("Image credit source URL must be valid"),
});

const imageSchema = z.object({
  src: z.string().min(1, "Image must have a src path"),
  alt: z.string().min(1, "Image must have alt text"),
  credit: creditSchema,
});

const sourceSchema = z.object({
  title: z.string().min(1, "Source must have a title"),
  author: z.string().min(1, "Source must have an author or site name"),
  url: z.string().url("Source URL must be valid"),
  year: z.number().int().positive().optional(),
  accessed: z.string().optional(),
});

const craftSchema = z.object({
  name: z.string().min(1, "Craft must have a name"),
  alternateNames: z.array(z.string()).default([]),
  technique: techniqueSchema,
  origins: z.array(reference("place")).min(1, "Craft must have at least one origin place"),
  summary: z.string().min(1, "Craft must have a one-line summary"),
  history: z.string().optional(),
  howItsMade: z.string().optional(),
  motifsAndMaterials: z.string().optional(),
  images: z.array(imageSchema).default([]),
  sources: z.array(sourceSchema).default([]),
  generation: z.object({
    model: z.string().optional(),
    date: z.string().optional(),
  }).optional(),
});

const placeSchema = z.object({
  name: z.string().min(1, "Place must have a name"),
  granularity: z.enum(["state", "region", "town"]),
  parentState: z.string().optional(),
  coordinates: z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
  }),
});

export const collections = {
  craft: defineCollection({ type: "content", schema: craftSchema }),
  place: defineCollection({ type: "content", schema: placeSchema }),
};

export type Craft = z.infer<typeof craftSchema>;
export type Place = z.infer<typeof placeSchema>;
export type Technique = z.infer<typeof techniqueSchema>;

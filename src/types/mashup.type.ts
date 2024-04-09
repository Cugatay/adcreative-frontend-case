import { z } from "zod";
import { GPTResponseSchema } from "./gpt-response.type";

export const MashupTraitSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const MashupObjectType = GPTResponseSchema.extend({
  characterImages: z.array(z.string()),
});

export type MashupTraitType = z.infer<typeof MashupTraitSchema>;
export type MashupObjectType = z.infer<typeof MashupObjectType>;

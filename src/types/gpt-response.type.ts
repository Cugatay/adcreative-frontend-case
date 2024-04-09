import { z } from "zod";
import { MashupTraitSchema } from "./mashup.type";

export const GPTResponseSchema = z.object({
  mashupName: z.string(),
  traits: z.array(MashupTraitSchema),
});

export type GPTResponseType = z.infer<typeof GPTResponseSchema>;

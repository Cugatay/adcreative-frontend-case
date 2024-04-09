import { z } from "zod";
import { OpenAI } from "openai";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import gptTuning from "@/constants/gpt-tuning";
import { type GPTResponseType } from "@/types/gpt-response.type";

export const mashRouter = createTRPCRouter({
  mashTogether: publicProcedure
    .input(z.object({ character: z.array(z.string()) }))
    .mutation(async ({ input }) => {
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      let gptJSON: GPTResponseType | undefined = undefined;

      while (!gptJSON) {
        try {
          const chatCompletion = await openai.chat.completions.create({
            messages: [
              {
                role: "user",
                content: gptTuning + input.character.join(", "),
              },
            ],
            model: "gpt-3.5-turbo-16k",
          });

          if (!chatCompletion.choices[0]?.message.content) {
            throw new Error();
          }

          const json = JSON.parse(
            chatCompletion.choices[0].message.content,
          ) as GPTResponseType;

          gptJSON = json;
        } catch (error) {
          return;
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));

      return gptJSON;
    }),
});

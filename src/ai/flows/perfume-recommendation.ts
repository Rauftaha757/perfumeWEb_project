
'use server';
/**
 * @fileOverview Perfume recommendation flow.
 *
 * - perfumeRecommendation - A function that recommends perfumes based on cart items.
 * - PerfumeRecommendationInput - The input type for the perfumeRecommendation function.
 * - PerfumeRecommendationOutput - The return type for the perfumeRecommendation function.
 */

import {ai} from '@/ai/genkit';
import { allPerfumeNames } from '@/lib/perfumes';
import {z} from 'genkit';

const PerfumeRecommendationInputSchema = z.object({
  cartItems: z.array(z.string()).describe('A list of perfume names currently in the shopping cart.'),
});
export type PerfumeRecommendationInput = z.infer<typeof PerfumeRecommendationInputSchema>;

const PerfumeRecommendationOutputSchema = z.object({
  recommendations: z.array(z.string()).describe('A list of recommended perfume names that are not in the cart.'),
});
export type PerfumeRecommendationOutput = z.infer<typeof PerfumeRecommendationOutputSchema>;


const RecommendationPromptInputSchema = z.object({
    cartItems: z.array(z.string()).describe('A list of perfume names currently in the shopping cart.'),
    availablePerfumes: z.array(z.string()).describe('A list of available perfumes to recommend from.'),
});

const recommendationPrompt = ai.definePrompt({
    name: 'perfumeRecommendationPrompt',
    input: {schema: RecommendationPromptInputSchema},
    output: {schema: PerfumeRecommendationOutputSchema},
    prompt: `You are a perfume recommendation expert for an online store called Scentique.
Your task is to recommend up to 2 perfumes based on the items currently in the user's shopping cart.

The user has the following items in their cart:
{{#each cartItems}}
- {{{this}}}
{{/each}}

Here is the full list of available perfumes you can recommend from:
{{#each availablePerfumes}}
- {{{this}}}
{{/each}}

Based on the user's cart, please provide up to 2 recommendations from the available list. Do not recommend items that are already in the cart.
Only return the names of the recommended perfumes in the output.`,
});
  
const perfumeRecommendationFlow = ai.defineFlow(
    {
      name: 'perfumeRecommendationFlow',
      inputSchema: PerfumeRecommendationInputSchema,
      outputSchema: PerfumeRecommendationOutputSchema,
    },
    async (input) => {
      const availableForRecommendation = allPerfumeNames.filter(name => !input.cartItems.includes(name));

      if (availableForRecommendation.length === 0) {
          return { recommendations: [] };
      }
      
      const { output } = await recommendationPrompt({
          cartItems: input.cartItems,
          availablePerfumes: availableForRecommendation,
      });

      return output!;
    }
);

export async function perfumeRecommendation(input: PerfumeRecommendationInput): Promise<PerfumeRecommendationOutput> {
    return perfumeRecommendationFlow(input);
}

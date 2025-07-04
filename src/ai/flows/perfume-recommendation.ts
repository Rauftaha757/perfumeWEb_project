'use server';

/**
 * @fileOverview An AI agent that provides perfume recommendations based on the items in the user's cart.
 *
 * - perfumeRecommendation - A function that handles the perfume recommendation process.
 * - PerfumeRecommendationInput - The input type for the perfumeRecommendation function.
 * - PerfumeRecommendationOutput - The return type for the perfumeRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PerfumeRecommendationInputSchema = z.object({
  cartItems: z
    .array(z.string())
    .describe('An array of perfume names currently in the user\'s cart.'),
});
export type PerfumeRecommendationInput = z.infer<typeof PerfumeRecommendationInputSchema>;

const PerfumeRecommendationOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('An array of perfume names recommended to the user.'),
});
export type PerfumeRecommendationOutput = z.infer<typeof PerfumeRecommendationOutputSchema>;

export async function perfumeRecommendation(input: PerfumeRecommendationInput): Promise<PerfumeRecommendationOutput> {
  return perfumeRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'perfumeRecommendationPrompt',
  input: {schema: PerfumeRecommendationInputSchema},
  output: {schema: PerfumeRecommendationOutputSchema},
  prompt: `You are a perfume expert. A user has the following perfumes in their cart: {{cartItems}}. Recommend three perfumes that would complement their existing selections. Return only the names of the recommended perfumes. Do not include any descriptions or other information.`,
});

const perfumeRecommendationFlow = ai.defineFlow(
  {
    name: 'perfumeRecommendationFlow',
    inputSchema: PerfumeRecommendationInputSchema,
    outputSchema: PerfumeRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

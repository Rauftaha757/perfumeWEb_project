/**
 * @fileoverview This file configures and exports the Genkit AI instance.
 */
import 'dotenv/config';
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI()],
});

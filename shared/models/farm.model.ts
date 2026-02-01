// models/farm.model.ts

import { z } from 'zod';

export const FarmSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  name: z.string(),
  location: z.string(),
  type: z.enum(['hydroponic', 'horticulture']),
});

export type Farm = z.infer<typeof FarmSchema>;

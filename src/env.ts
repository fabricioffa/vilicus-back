import { z } from "zod";
 
export const env = z.object({
  PORT: z.string().default('3000').transform(Number),
}).parse(process.env);

 

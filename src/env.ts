import { z } from "zod";
 
export const env = z.object({
  TURSO_DATABASE_URL: z.string(),
  TURSO_AUTH_TOKEN: z.string(),
  PORT: z.string().default('3000').transform(Number),
}).parse(process.env);

 

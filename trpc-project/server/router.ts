import { z } from 'zod';
import { procedure, router } from './trpc';

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string().max(10),
      })
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
});

export type AppRouter = typeof appRouter;
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { publicProcedure as procedure, router } from './trpc';
const prisma = new PrismaClient();

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
  getTodos: procedure
    .query(async () =>{
      return prisma.todo.findMany()
    }),
  createTodo: procedure
    .input(z.object({
      title: z.string(),
    }))
    .mutation(async (opts) => {
      const { input } = opts;
      return prisma.todo.create({ data: {title: input.title} })
    }),
  updateTodo: procedure
    .input(z.object({
      id: z.number(),
      completed: z.boolean(),
    }))
    .mutation(async (opts) => {
      const { input } = opts;
      return prisma.todo.update({
        where: { id: input.id },
        data: { completed: input.completed },
      })
    }),
  deleteTodo: procedure
    .input(z.object({
      id: z.number(),
    }))
    .mutation(async (opts) => {
      const { input } = opts;
      return prisma.todo.delete({
        where: { id: input.id },
      })
    }),
});
export type AppRouter = typeof appRouter;

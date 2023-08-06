import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const historyRouter = createTRPCRouter({
  completeHistory: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.energyData.findMany({});
  }),
});

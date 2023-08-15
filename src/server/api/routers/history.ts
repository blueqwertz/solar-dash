import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const historyRouter = createTRPCRouter({
  completeHistory: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.energyData.findMany({});
  }),
  todayHistory: publicProcedure.query(({ ctx }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return ctx.prisma.energyData.findMany({
      where: {
        timestamp: {
          gte: today,
          lte: new Date(),
        },
      },
    });
  }),
});

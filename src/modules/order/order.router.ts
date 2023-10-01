import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createLogger } from "../../lib/logger";
import { protectedClientProcedure } from "../trpc/protected-client-procedure";
import { router } from "../trpc/trpc-server";
import { OrderInfoFetcher } from "./order-info-fetcher";

export const orderRouter = router({
  get: protectedClientProcedure
    .input(z.object({ orderId: z.string() }))
    .query(async ({ ctx, input }) => {
      const logger = createLogger({ saleorApiUrl: ctx.saleorApiUrl });

      logger.debug("order.get called");

      const { orderId } = input;

      const orderInfoFetcher = new OrderInfoFetcher(ctx.apiClient);
      const orderInfoQuery = await orderInfoFetcher.fetchOrderInfo(orderId);

      if (!orderInfoQuery || !orderInfoQuery.order) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch the order.",
        });
      }

      const { order } = orderInfoQuery;

      return order;
    }),
});

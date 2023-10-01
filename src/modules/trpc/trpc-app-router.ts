import { orderRouter } from "../order/order.router";
import { router } from "./trpc-server";

export const appRouter = router({
  order: orderRouter,
});

export type AppRouter = typeof appRouter;

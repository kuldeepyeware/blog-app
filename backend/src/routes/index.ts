import { Hono } from "hono";
import { userRouter } from "./user";
import { blogRouter } from "./blog";

export const indexRouter = new Hono();

indexRouter.route("/user", userRouter);
indexRouter.route("/blog", blogRouter);

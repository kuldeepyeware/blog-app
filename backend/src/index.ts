import { Hono } from "hono";
import { cors } from "hono/cors";
import { indexRouter } from "./routes";

const app = new Hono();

app.use(cors());
app.route("/api/v1", indexRouter);

export default app;

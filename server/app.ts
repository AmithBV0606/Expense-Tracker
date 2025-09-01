import { Hono } from "hono";
import { logger } from "hono/logger";
import { expensesRoute } from "./routes/expenses";
import { serveStatic } from "hono/bun";

const app = new Hono();

// Middleware :
app.use(logger());

// Starting endpoint :
// app.get("/", (c) => c.text("Hello from Hono!"));

// Expenses endpoint :
const apiRoutes = app.basePath("/api").route("/expenses", expensesRoute);

// Serving Static files :
app.get("*", serveStatic({ root: "./client/dist" }));
app.get("*", serveStatic({ path: "./client/dist/index.html" }));

export default app;
export type APIRoutes = typeof apiRoutes;

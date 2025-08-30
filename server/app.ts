import { Hono } from "hono";
import { logger } from "hono/logger";
import { expensesRoute } from "./routes/expenses";

const app = new Hono();

// Middleware :
app.use(logger());

// Starting endpoint :
app.get("/", (c) => c.text("Hello from Hono!"));

// Expenses endpoint :
app.route("/api/expenses", expensesRoute);

export default app;

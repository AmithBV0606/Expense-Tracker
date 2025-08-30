import { Hono } from "hono";
import { logger } from 'hono/logger'

const app = new Hono();

app.use(logger())

app.get("/", (c) => c.text("Hello from Hono!"));

export default app;

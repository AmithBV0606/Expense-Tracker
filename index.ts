import app from "./server/app.ts";

Bun.serve({
    fetch: app.fetch
});

import type { APIRoutes } from "@server/app";
import { hc } from "hono/client";

const client = hc<APIRoutes>("/");

export const api = client.api;

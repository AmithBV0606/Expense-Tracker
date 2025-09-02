import type { APIRoutes } from "@server/app";
import { queryOptions } from "@tanstack/react-query";
import { hc } from "hono/client";

const client = hc<APIRoutes>("/");

export const api = client.api;

async function getCurrentUser() {
  const result = await api.me.$get();
  if (!result.ok) {
    throw new Error("Server error");
  }
  const data = await result.json();
  return data;
}

export const userQueryOptions = queryOptions({
  queryKey: ["get-current-user"],
  queryFn: getCurrentUser,
  staleTime: Infinity,
});

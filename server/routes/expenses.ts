import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

type Expense = {
  id: number;
  title: string;
  amount: number;
};

const fakeExpenses: Expense[] = [
  {
    id: 1,
    title: "Coffee at Starbucks",
    amount: 4.5,
  },
  {
    id: 2,
    title: "Groceries - Trader Joe's",
    amount: 56.2,
  },
  {
    id: 3,
    title: "Monthly Netflix Subscription",
    amount: 15.99,
  },
];

const createPostSchema = z.object({
  title: z.string().min(5).max(100),
  amount: z.number().int().positive(),
});

export const expensesRoute = new Hono()
  .get("/", (c) => {
    return c.json({ expenses: fakeExpenses });
  })
  .post("/", zValidator("json", createPostSchema), async (c) => {
    const data = await c.req.valid("json");
    fakeExpenses.push({ id: fakeExpenses.length + 1, ...data });
    c.status(201);
    return c.json(data);
  })
  .get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.find((expense) => expense.id === id);
    if (!expense) {
      return c.notFound();
    }
    return c.json({ expense });
  })
  .delete("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const index = fakeExpenses.findIndex((expense) => expense.id === id);
    if (index === -1) {
      return c.notFound();
    }
    const deletedExpenses = fakeExpenses.splice(index, 1)[0];
    return c.json({
      expense: deletedExpenses,
    });
  });

import { Hono } from "hono";
import { z } from "zod";

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
  .post("/", async (c) => {
    const data = await c.req.json();
    const expense = createPostSchema.parse(data)
    console.log(data.amount);
    console.log(data);
    return c.json(data);
  });

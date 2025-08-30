import { Hono } from "hono";

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

export const expensesRoute = new Hono()
  .get("/", (c) => {
    return c.json({ expenses: fakeExpenses });
  })
  .post("/", async (c) => {
    const data: Expense = await c.req.json();
    console.log(data.amount);
    console.log(data);
    return c.json(data);
  });

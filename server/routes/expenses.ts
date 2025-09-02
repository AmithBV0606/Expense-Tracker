import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { getUser } from "../kinde";
import { db } from "../db";
import { expenses as expensesTable } from "../db/schema/expenses";
import { eq } from "drizzle-orm";

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(5).max(100),
  amount: z.string(),
});

type Expense = z.infer<typeof expenseSchema>;

const createPostSchema = expenseSchema.omit({ id: true });

const fakeExpenses: Expense[] = [
  {
    id: 1,
    title: "Coffee at Starbucks",
    amount: "4.5",
  },
  {
    id: 2,
    title: "Groceries - Trader Joe's",
    amount: "56.2",
  },
  {
    id: 3,
    title: "Monthly Netflix Subscription",
    amount: "15.99",
  },
];

export const expensesRoute = new Hono()
  .get("/", getUser, async (c) => {
    const user = c.var.user;

    const expenses = await db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id));

    return c.json({ expenses: expenses });
  })
  .post("/", getUser, zValidator("json", createPostSchema), async (c) => {
    const expense = await c.req.valid("json");
    const user = c.var.user;

    const result = await db
      .insert(expensesTable)
      .values({
        ...expense,
        userId: user.id,
      })
      .returning();

    c.status(201);
    return c.json(result);
  })
  .get("/total-spent", getUser, (c) => {
    const total = fakeExpenses.reduce(
      (acc, expense) => acc + +expense.amount,
      0
    );
    c.status(200);
    return c.json({ total: total });
  })
  .get("/:id{[0-9]+}", getUser, (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.find((expense) => expense.id === id);
    if (!expense) {
      return c.notFound();
    }
    return c.json({ expense });
  })
  .delete("/:id{[0-9]+}", getUser, (c) => {
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

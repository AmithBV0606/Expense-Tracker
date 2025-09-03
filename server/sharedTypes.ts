import { z } from "zod";

export const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z
    .string()
    .min(3, { message: "Title must contain at least 3 characters!!" })
    .max(100, { message: "Title must contain at most 100 characters!!" }),
  amount: z.string(),
});

export const createExpenseSchema = expenseSchema.omit({ id: true });

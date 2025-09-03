import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import type { AnyFieldApi } from "@tanstack/react-form";
import { api, getAllExpensesQueryOptions } from "@/lib/api";
import { Calendar } from "@/components/ui/calendar";
import { useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/_authenticated/create-expense")({
  component: CreateExpense,
});

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em>{field.state.meta.errors.join(", ")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

function CreateExpense() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      title: "",
      amount: "0",
      date: new Date().toISOString(),
    },
    onSubmit: async ({ value }) => {
      const res = await api.expenses.$post({ json: value });
      if (!res.ok) {
        throw new Error("Server error!!");
      }
      const newExpense = await res.json();
      const existingExpenses = await queryClient.ensureQueryData(
        getAllExpensesQueryOptions
      );
      queryClient.setQueryData(getAllExpensesQueryOptions.queryKey, {
        expenses: [newExpense, ...existingExpenses.expenses],
      });
      navigate({ to: "/expenses" });
    },
  });

  return (
    <div className="p-2 space-y-3">
      <h1 className="font-bold">Create Expenses</h1>

      <form
        action=""
        className="flex flex-col gap-y-4 max-w-xl m-auto"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="title"
          validators={{
            onChange: ({ value }) =>
              value.length < 3
                ? "Title must contain at least 3 characters!!"
                : undefined,
          }}
          children={(field) => (
            <div className="grid w-full max-w-xl items-center gap-3">
              <Label htmlFor={field.name}>Title</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        />

        <form.Field
          name="amount"
          validators={{
            onChange: ({ value }) =>
              Number(value) < 0 ? "Amount must be positive!!" : undefined,
          }}
          children={(field) => (
            <div className="grid w-full max-w-xl items-center gap-3">
              <Label htmlFor={field.name}>Amount</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type="number"
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        />

        <form.Field
          name="date"
          validators={{
            onChange: ({ value }) =>
              value === null ? "Please enter the date!!" : undefined,
          }}
          children={(field) => (
            <div className="self-center grid max-w-2xl items-center gap-3">
              <Calendar
                mode="single"
                selected={new Date(field.state.value)}
                onSelect={(date) =>
                  field.handleChange((date ?? new Date()).toISOString())
                }
                className="rounded-md border shadow-sm"
                captionLayout="dropdown"
              />
              <FieldInfo field={field} />
            </div>
          )}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit}>
              {isSubmitting ? "..." : "Create Expense"}
            </Button>
          )}
        />
      </form>
    </div>
  );
}

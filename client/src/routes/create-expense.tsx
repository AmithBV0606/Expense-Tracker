import { createFileRoute } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/create-expense")({
  component: CreateExpense,
});

function CreateExpense() {
  return (
    <div className="p-2 space-y-3">
      <Card className="max-w-2xl m-auto px-8">
        <h2 className=" max-w-xl m-auto">Create Expenses</h2>

        <form action="" className="space-y-3">
          <div className="grid w-full max-w-xl items-center gap-3">
            <Label htmlFor="title">Title</Label>
            <Input type="text" id="title" placeholder="Title" />
          </div>

          <div className="grid w-full max-w-xl items-center gap-3">
            <Label htmlFor="amount">Amount</Label>
            <Input type="number" id="amount" placeholder="Amount" />
          </div>

          <Button type="submit">Create Expense</Button>
        </form>
      </Card>
    </div>
  );
}

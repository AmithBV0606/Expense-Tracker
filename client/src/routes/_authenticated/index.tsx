import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export const Route = createFileRoute("/_authenticated/")({
  component: Index,
});

async function getTotalSpent() {
  const result = await api.expenses["total-spent"].$get();
  if (!result.ok) {
    throw new Error("Server error");
  }
  const data = await result.json();
  return data;
}

function Index() {
  const { isPending, error, data } = useQuery({
    queryKey: ["get-total-spent"],
    queryFn: getTotalSpent,
  });

  if (error) return "An error has occured: " + error.message;

  return (
    <div className="h-screen max-w-md m-auto mt-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Amount</CardTitle>
          <CardDescription>Total amount you've spent!!</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{isPending ? "..." : data.total}</p>
        </CardContent>
      </Card>
    </div>
  );
}

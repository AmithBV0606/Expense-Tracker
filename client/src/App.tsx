import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

function App() {
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    async function fetchTotal() {
      const res = await fetch("/api/expenses/total-spent");
      const data = await res.json();
      setTotalAmount(data.total);
    }

    fetchTotal();
  }, []);

  return (
    <div className="h-screen max-w-md m-auto mt-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Amount</CardTitle>
          <CardDescription>Total amount you've spent!!</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{totalAmount}</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;

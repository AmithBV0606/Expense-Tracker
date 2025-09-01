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

  const totalSpent = async () => {
    const total = await fetch("http://localhost:3000/api/expenses/total-spent");
    const data = await total.json();
    setTotalAmount(data.total);
  };

  useEffect(() => {
    totalSpent();
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

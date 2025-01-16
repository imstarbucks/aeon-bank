import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TransactionHistoryType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/login/logout-btn";

const DashboardPage = async () => {
  const cookiesStore = await cookies();
  const username = cookiesStore.get("username");
  const login = cookiesStore.get("login");

  const fetchTransactionHistory = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/transaction-history`,
    { cache: "no-store" },
  );

  if (!fetchTransactionHistory.ok) {
    throw new Error("Error fetching transaction history");
  }

  if (!login || login.value !== "true") {
    return redirect("/login");
  }

  const res = await fetchTransactionHistory.json();
  const tableData: TransactionHistoryType[] = res.data || [];

  return (
    <div className="flex h-screen flex-col items-center justify-center px-12 text-black">
      <h2 className="mb-8 text-4xl font-bold">
        Welcome Back {username?.value}!
      </h2>
      <Table className="mx-auto max-w-3xl rounded border border-gray-400">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-300">
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Reference ID</TableHead>
            <TableHead>To</TableHead>
            <TableHead className="text-center">Transaction Type</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">{transaction.date}</TableCell>
              <TableCell>{transaction.referenceId}</TableCell>
              <TableCell className="flex flex-col">
                <div className="">{transaction.to}</div>
                <p className="text-sm text-gray-400">
                  Recipient references will go here
                </p>
              </TableCell>
              <TableCell className="text-center">
                {transaction.transactionType}
              </TableCell>
              <TableCell className="text-right">
                RM{" "}
                {transaction.amount.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <LogoutButton />
    </div>
  );
};

export default DashboardPage;

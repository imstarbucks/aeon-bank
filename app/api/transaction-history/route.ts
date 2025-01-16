import { TransactionHistoryType } from "@/lib/types";
import { NextResponse } from "next/server";

const transactionHistory: TransactionHistoryType[] = [
  {
    id: 1,
    date: "2023-01-01",
    referenceId: "#8990813",
    amount: 1000,
    transactionType: "DuitNow payment",
    to: "Mednefits Sdn Bhd",
  },
  {
    id: 2,
    date: "2023-01-02",
    referenceId: "#899323813",
    amount: 2000,
    transactionType: "Transfer",
    to: "Spencer Wong",
  },
  {
    id: 3,
    date: "2023-01-02",
    referenceId: "#8990812",
    amount: 2000.5,
    transactionType: "Transfer",
    to: "John Doe",
  },
];

export async function GET() {
  return NextResponse.json({
    status: 200,
    message: "success",
    data: transactionHistory,
  });
}

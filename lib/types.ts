export type TransactionHistoryType = {
  id: number;
  date: string;
  referenceId: string;
  amount: number;
  transactionType: "DuitNow payment" | "Transfer";
  to: string;
};

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export interface TableRowData {
  runningAge: string;
  year: string;
  month: string;
  N: string;
  Nx: string;
  yearly_expenses: string;
  monthly_expenses: string;
  monthly_income: string;
  income_Nx: string;
  expected_income: string;
  income_invest: string;
}

interface RetirementTableProps {
  tableData: TableRowData[];
  handleTableChange: (index: number, name: string, value: string) => void;
  compareValues: (expected: string, actual: string) => string;
}

const RetirementTable: React.FC<RetirementTableProps> = ({
  tableData,
  handleTableChange,
  compareValues,
}) => {
  return (
    <Table className="min-w-full table-auto overflow-x-auto bg-transparent">
      <TableHeader className="">
        <TableRow className=" text-green-700">
          <TableHead className="px-4 py-2 text-center border border-black font-bold text-blue-900">
            Age
          </TableHead>
          <TableHead className="px-4 py-2 text-center border border-black font-bold text-blue-900">
            Year
          </TableHead>
          <TableHead className="px-4 py-2 text-center border border-black font-bold text-blue-900">
            Month
          </TableHead>
          <TableHead className="px-4 py-2 text-center border border-black font-bold text-blue-900">
            N
          </TableHead>
          <TableHead className="px-4 py-2 text-center border border-black font-bold text-blue-900">
            Nx
          </TableHead>
          <TableHead className="px-4 py-2 text-center border border-black font-bold text-blue-900">
            Yearly Expenses
          </TableHead>
          <TableHead className="px-4 py-2 text-center border border-black font-bold text-blue-900">
            Monthly Expenses (Expected)
          </TableHead>
          {/* <TableHead className="px-4 py-2 text-center border border-black font-bold text-blue-900">Monthly Expenses (Actual)</TableHead> */}
          <TableHead className="px-4 py-2 text-center border border-black font-bold text-blue-900">
            Monthly Income (Expected)
          </TableHead>
          {/* <TableHead className="px-4 py-2 text-center border border-black font-bold text-blue-900">Monthly Income (Actual)</TableHead> */}
          <TableHead className="px-4 py-2 text-center border border-black font-bold text-blue-900">
            Income from Nx (%){" "}
          </TableHead>
          <TableHead className="px-4 py-2 text-center border border-black font-bold text-blue-900">
            Income from Nx((Expected))
          </TableHead>

          {/* <TableHead className="px-4 py-2 text-center border border-black font-bold text-blue-900">Assets</TableHead> */}
          <TableHead className="px-4 py-2 text-center border border-black font-bold text-blue-900">
            Income to Invest
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((row, index) => (
          <TableRow
            key={index}
            className="hover:bg-green-50 transition-all duration-300"
          >
            <TableCell className="px-4 py-2 text-center border border-black">
              {row.runningAge}
            </TableCell>
            <TableCell className="px-4 py-2 text-center border border-black">
              {row.year}
            </TableCell>
            <TableCell className="px-4 py-2 text-center border border-black">
              {row.month}
            </TableCell>
            <TableCell className="px-4 py-2 text-center border border-black">
              {row.N}
            </TableCell>
            <TableCell className="px-4 py-2 text-center border border-black">
              {row.Nx}
            </TableCell>
            <TableCell className="px-4 py-2 text-center border border-black">
              {row.yearly_expenses}
            </TableCell>
            <TableCell className="px-4 py-2 text-center border border-black">
              {row.monthly_expenses}
            </TableCell>
            <TableCell className="px-4 py-2 text-center border border-black">
              {row.monthly_income}
            </TableCell>
            <TableCell className="px-4 py-2 text-center border border-black">
              {row.income_Nx}
            </TableCell>
            <TableCell className="px-4 py-2 text-center border border-black">
              {row.expected_income}
            </TableCell>
            <TableCell className="px-4 py-2 text-center border border-black">
              {row.income_invest}
            </TableCell>
            {/* <TableCell className="px-4 py-2">
              <Input
                type="number"
                value={row.actualIncome}
                onChange={(e) =>
                  handleTableChange(index, "actualIncome", e.target.value)
                }
                className={`w-full p-2 rounded-md border ${
                  compareValues(row.expectedIncome, row.actualIncome) === "high"
                    ? "border-red-500"
                    : compareValues(row.expectedIncome, row.actualIncome) ===
                      "moderate"
                    ? "border-yellow-500"
                    : "border-green-300"
                }`}
              />
            </TableCell> */}
            {/* <TableCell className="px-4 py-2">
              <Input
                type="number"
                value={row.actualExpenses}
                onChange={(e) =>
                  handleTableChange(index, "actualExpenses", e.target.value)
                }
                className={`w-full p-2 rounded-md border ${
                  compareValues(row.expectedExpenses, row.actualExpenses) ===
                  "high"
                    ? "border-red-500"
                    : compareValues(
                        row.expectedExpenses,
                        row.actualExpenses
                      ) === "moderate"
                    ? "border-yellow-500"
                    : "border-green-300"
                }`}
              />
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RetirementTable;

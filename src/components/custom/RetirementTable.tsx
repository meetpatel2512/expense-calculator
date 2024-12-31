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

interface TableRowData {
  age: number;
  assets: string;
  expectedIncome: string;
  expectedExpenses: string;
  actualIncome: string;
  actualExpenses: string;
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
    <Table className="min-w-full table-auto overflow-x-auto">
      <TableHeader>
        <TableRow className="bg-green-100 text-green-700">
          <TableHead className="px-4 py-2">Age</TableHead>
          <TableHead className="px-4 py-2">Year</TableHead>
          <TableHead className="px-4 py-2">Month</TableHead>
          <TableHead className="px-4 py-2">N</TableHead>
          <TableHead className="px-4 py-2">Nx</TableHead>
          <TableHead className="px-4 py-2">Yearly Expenses</TableHead>
          <TableHead className="px-4 py-2">
            Monthly Expenses (Expected)
          </TableHead>
          <TableHead className="px-4 py-2">Monthly Expenses (Actual)</TableHead>
          <TableHead className="px-4 py-2">Monthly Income (Expected)</TableHead>
          <TableHead className="px-4 py-2">Monthly Income (Actual)</TableHead>
          <TableHead className="px-4 py-2">Income from Nx (%) </TableHead>
          <TableHead className="px-4 py-2">
            Income from Nx (%) ((Expected))
          </TableHead>

          {/* <TableHead className="px-4 py-2">Assets</TableHead> */}
          <TableHead className="px-4 py-2">Income to Invest</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* {tableData.map((row, index) => (
          <TableRow
            key={index}
            className="hover:bg-green-50 transition-all duration-300"
          >
            <TableCell className="px-4 py-2">{row.age}</TableCell>
            <TableCell className="px-4 py-2">{row.assets}</TableCell>
            <TableCell className="px-4 py-2">{row.expectedIncome}</TableCell>
            <TableCell className="px-4 py-2">{row.expectedExpenses}</TableCell>
            <TableCell className="px-4 py-2">
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
            </TableCell>
            <TableCell className="px-4 py-2">
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
            </TableCell>
          </TableRow>
        ))} */}
      </TableBody>
    </Table>
  );
};

export default RetirementTable;

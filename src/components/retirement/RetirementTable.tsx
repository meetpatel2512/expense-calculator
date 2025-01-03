"use client";

import { TableRowData } from "@/types/table";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import DialogDemo from "./UserDataDialog";

export const RetirementTable = ({
  tableData,
  setResetKey,
}: {
  setResetKey: (key: number) => void;
  tableData: TableRowData[];
}) => {
  return (
    <div className="m-6 border rounded-2xl overflow-scroll shadow-sm">
      <Table className="min-w-full table-auto overflow-x-auto bg-transparent ">
        <TableHeader className="">
          <TableRow className=" text-white bg-gradient-to-r from-blue-400 to-violet-400">
            <TableHead className="px-4 py-2 text-center border border-white font-bold text-white">
              Age
            </TableHead>
            <TableHead className="px-4 py-2 text-center border border-white font-bold text-white">
              Year
            </TableHead>
            <TableHead className="px-4 py-2 text-center border border-white font-bold text-white">
              Month
            </TableHead>
            <TableHead className="px-4 py-2 text-center border border-white font-bold text-white">
              N
            </TableHead>
            <TableHead className="px-4 py-2 text-center border border-white font-bold text-white">
              Nx
            </TableHead>
            <TableHead className="px-4 py-2 text-center border border-white font-bold text-white">
              Expense/Year
            </TableHead>
            <TableHead className="px-4 py-2 text-center border border-white font-bold text-white">
              Expense/month (Expected)
            </TableHead>
            <TableHead className="px-4 py-2 text-center border border-white font-bold text-white">
              Expense/month (Actual)
            </TableHead>
            {/* <TableHead className="px-4 py-2 text-center border border-white font-bold text-white">Monthly Expenses (Actual)</TableHead> */}
            <TableHead className="px-4 py-2 text-center border border-white font-bold text-white">
              Income/month (Expected)
            </TableHead>
            <TableHead className="px-4 py-2 text-center border border-white font-bold text-white">
              Income/month (Actual)
            </TableHead>
            {/* <TableHead className="px-4 py-2 text-center border border-white font-bold text-white">Monthly Income (Actual)</TableHead> */}
            <TableHead className="px-4 py-2 text-center border border-white font-bold text-white">
              Income from Nx (%)
            </TableHead>
            <TableHead className="px-4 py-2 text-center border border-white font-bold text-white">
              Income from Nx (Expected)
            </TableHead>

            {/* <TableHead className="px-4 py-2 text-center border border-white font-bold text-white">Assets</TableHead> */}
            <TableHead className="px-4 py-2 text-center border border-white font-bold text-white">
              Income to Invest
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData?.map((row, index) => (
            <Row
              key={index}
              row={row}
              index={index}
              setResetKey={setResetKey}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const Row = ({
  row,
  index,
  setResetKey,
}: {
  row: TableRowData;
  index: number;
  setResetKey: (key: number) => void;
}) => {
  const a = Math.ceil(Number(row.runningAge)) == Number(row.runningAge);

  return (
    <>
      <TableRow
        key={index}
        className={`hover:bg-green-100 ${
          a ? "bg-green-200" : ""
        } transition-all duration-300 `}
      >
        <TableCell className="px-4 py-2 text-center border">
          <div className="flex items-center">
            <DialogDemo id={row.runningAge} setResetKey={setResetKey} />
            {row.runningAge}
          </div>
        </TableCell>
        <TableCell className="px-4 py-2 text-center border">
          {row.year}
        </TableCell>
        <TableCell className="px-4 py-2 text-center border">
          {row.month}
        </TableCell>
        <TableCell className="px-4 py-2 text-center border">{row.N}</TableCell>
        <TableCell className="px-4 py-2 text-center border">{row.Nx}</TableCell>
        <TableCell className="px-4 py-2 text-center border">
          {row.yearly_expenses}
        </TableCell>
        <TableCell className="px-4 py-2 text-center border">
          {row.monthly_expenses}
        </TableCell>
        <TableCell className="px-4 py-2 text-center border">
          {row.actual_expenses}
        </TableCell>
        <TableCell className="px-4 py-2 text-center border">
          {row.monthly_income}
        </TableCell>
        <TableCell className="px-4 py-2 text-center border">
          {row.actual_income}
        </TableCell>
        <TableCell className="px-4 py-2 text-center border">
          {row.income_Nx}
        </TableCell>
        <TableCell className="px-4 py-2 text-center border">
          {row.expected_income}
        </TableCell>
        <TableCell className="px-4 py-2 text-center border">
          {row.income_invest}
        </TableCell>
      </TableRow>
    </>
  );
};

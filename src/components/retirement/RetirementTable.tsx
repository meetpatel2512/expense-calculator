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

export const RetirementTable = ({
  tableData,
}: {
  tableData: TableRowData[];
}) => {
  return (
    <div className="p-6">
      <Table className="min-w-full table-auto overflow-x-auto bg-transparent ">
        <TableHeader className="">
          <TableRow className=" text-green-700 bg-gray-100">
            <TableHead className="px-4 py-2 text-center border border-black font-bold text-blue-800">
              Age
            </TableHead>
            <TableHead className="px-4 py-2 text-center border border-black font-bold text-blue-800">
              Year
            </TableHead>
            <TableHead className="px-4 py-2 text-center border border-black font-bold text-blue-800">
              Month
            </TableHead>
            <TableHead className="px-4 py-2 text-center border border-black font-bold text-blue-800">
              N
            </TableHead>
            <TableHead className="px-4 py-2 text-center border border-black font-bold text-blue-800">
              Nx
            </TableHead>
            <TableHead className="px-4 py-2 text-center border border-black font-bold text-blue-800">
              Yearly Expenses
            </TableHead>
            <TableHead className="px-4 py-2 text-center border border-black font-bold text-blue-800">
              Monthly Expenses (Expected)
            </TableHead>
            {/* <TableHead className="px-4 py-2 text-center border border-black font-bold text-blue-800">Monthly Expenses (Actual)</TableHead> */}
            <TableHead className="px-4 py-2 text-center border border-black font-bold text-blue-800">
              Monthly Income (Expected)
            </TableHead>
            {/* <TableHead className="px-4 py-2 text-center border border-black font-bold text-blue-800">Monthly Income (Actual)</TableHead> */}
            <TableHead className="px-4 py-2 text-center border border-black font-bold text-blue-800">
              Income from Nx (%)
            </TableHead>
            <TableHead className="px-4 py-2 text-center border border-black font-bold text-blue-800">
              Income from Nx (Expected)
            </TableHead>

            {/* <TableHead className="px-4 py-2 text-center border border-black font-bold text-blue-800">Assets</TableHead> */}
            <TableHead className="px-4 py-2 text-center border border-black font-bold text-blue-800">
              Income to Invest
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData?.map((row, index) => (
            <Row key={index} row={row} index={index} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const Row = ({ row, index }: { row: TableRowData; index: number }) => {
  const a = Math.ceil(Number(row.runningAge)) == Number(row.runningAge);

  return (
    <>
      <TableRow
        key={index}
        className={`hover:bg-green-100 ${
          a ? "bg-green-400" : ""
        } transition-all duration-300 `}
      >
        <TableCell className="px-4 py-2 text-center border border-black">
          {row.runningAge}
          <DialogDemo />
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
      </TableRow>
    </>
  );
};

import { Dialog } from "@mui/material";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import ReturnsForm from "./ReturnsForm";

const DialogDemo = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button size="small" variant="outlined" onClick={handleClickOpen}>
        Open
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          {open && (
            <ReturnsForm
              disabledForm={false}
              onChange={(data) => {
                console.log(data);
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogDemo;

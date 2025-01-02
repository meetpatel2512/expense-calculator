import { TableRowData } from "@/types/table";
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
            <TableRow
              key={index}
              className="hover:bg-green-100 transition-all duration-300 even:bg-gray-100"
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

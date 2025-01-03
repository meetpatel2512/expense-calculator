import { FormDataType } from "@/types/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

function ReturnsForm({
  disabledForm,
  onChange,
}: {
  disabledForm: boolean;
  onChange: (data: FormDataType) => void;
}) {
  const { watch, register, reset } = useForm({});

  useEffect(() => {
    reset(JSON.parse(localStorage.getItem("staticData") || "{}"));
  }, []);

  useEffect(() => {
    const { unsubscribe } = watch((value) => {
      onChange(value);
    });
    return () => unsubscribe();
  }, [watch, onChange]);

  return (
    <form className="w-full flex-1 flex flex-col bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3 mb-6">
        Investment Details
      </h2>

      {/* Investment Details Table */}

      <div className="overflow-x-auto p-1">
        <table className="w-full border border-gray-300 rounded-md table-auto min-w-full overflow-x-auto ">
          <TableHeader>
            <TableRow className="border-b border-gray-300">
              <TableHead className="text-sm text-gray-600 font-medium px-4 py-2 border-r border-gray-300 text-center">
                Investment Type
              </TableHead>
              <TableHead className="text-sm text-gray-600 font-medium px-4 py-2 border-r border-gray-300 text-center">
                Percentage (%)
              </TableHead>
              <TableHead className="text-sm text-gray-600 font-medium px-4 py-2 border-r border-gray-300 text-center">
                Yearly Return
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {["Small Cap", "Mid Cap", "Large Cap", "Savings"].map(
              (type, index) => (
                <TableRow
                  key={type}
                  className="hover:bg-gray-50 border-b border-gray-200"
                >
                  <TableCell className="text-sm font-medium text-gray-700 px-4 py-4 border-r border-gray-300">
                    {type}
                  </TableCell>
                  <TableCell className="border-r border-gray-300">
                    <Input
                      type="number"
                      max={100}
                      className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none bg-white shadow-sm"
                      {...register(
                        `investment[${index}].percentage` as keyof FormDataType,
                        {
                          required: true,
                        }
                      )}
                      disabled={disabledForm}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      max={100}
                      className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none bg-white shadow-sm"
                      {...register(
                        `investment[${index}].return` as keyof FormDataType,
                        {
                          required: true,
                        }
                      )}
                      disabled={disabledForm}
                    />
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </table>
        <div className="flex w-full gap-6 py-6">
          <div className="space-y-2 w-full">
            <Label className="text-lg font-medium text-gray-700">
              {"Monthy Income"}
            </Label>
            <Input
              type="number"
              max={1000000}
              placeholder={`Enter your Monthly Income`}
              className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none bg-white shadow-sm"
              {...register("monthlyIncome" as keyof FormDataType, {
                required: true,
              })}
              disabled={disabledForm}
            />
          </div>
          <div className="space-y-2 w-full">
            <Label className="text-lg font-medium text-gray-700">
              {"monthly Expenses"}
            </Label>
            <Input
              type="number"
              max={1000000}
              placeholder={`Enter your Monthly Expenses`}
              className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none bg-white shadow-sm"
              {...register("monthlyExpenses" as keyof FormDataType, {
                required: true,
              })}
              disabled={disabledForm}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default ReturnsForm;

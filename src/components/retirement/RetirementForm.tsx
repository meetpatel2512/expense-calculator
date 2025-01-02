import { FormDataType } from "@/types/form";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export const RetirementForm = ({
  form,
  formData,
  disabledForm,
}: {
  form: UseFormReturn<FormDataType>;
  formData: FormDataType;
  disabledForm: boolean;
}) => {
  useEffect(() => {
    form.reset(formData);
  }, [form, formData]);
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      {/* Left Column - Personal Details */}
      <div className="w-full lg:w-2/5 bg-white p-6 rounded-lg shadow-lg space-y-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Retirement Calculator
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[
            { label: "Current Age", name: "currentAge" },
            { label: "Retirement Age", name: "retirementAge" },
            { label: "life Expectancy", name: "lifeExpectancy" },
            { label: "starting Assets", name: "startingAssets" },
            { label: "monthly Income", name: "monthlyIncome" },
            { label: "monthly Expenses", name: "monthlyExpenses" },
          ].map((data, index) => (
            <div key={index} className="space-y-2">
              <Label className="text-lg font-medium text-gray-700">
                {data.label}
              </Label>
              <Input
                placeholder={`Enter your ${data.label.toLowerCase()}`}
                className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none bg-white shadow-sm"
                {...form.register(data.name as keyof FormDataType, {
                  required: true,
                })}
                disabled={disabledForm}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right Column - Investment Details */}
      <div className="w-full lg:w-3/5 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3 mb-6">
          Investment Details
        </h2>

        {/* Investment Details Table */}

        <div className="overflow-x-auto">
          <Table className="w-full border border-gray-300 rounded-md table-auto min-w-full overflow-x-auto">
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
                    <TableCell className="text-sm font-medium text-gray-700 px-4 py-3 border-r border-gray-300">
                      {type}
                    </TableCell>
                    <TableCell className="px-4 py-3 border-r border-gray-300">
                      <Input
                        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none bg-white shadow-sm"
                        {...form.register(
                          `investment[${index}].percentage` as keyof FormDataType,
                          {
                            required: true,
                          }
                        )}
                        disabled={disabledForm}
                      />
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <Input
                        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none bg-white shadow-sm"
                        {...form.register(
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
          </Table>
        </div>

        {/* Submit Button */}
        <div className="text-right mt-6">
          <Button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg shadow-md hover:from-blue-500 hover:to-green-500 transition-all duration-300"
          >
            Save Data
          </Button>
        </div>
      </div>
    </div>
  );
};

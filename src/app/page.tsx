"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [values, setValues] = useState({
    income: 40000,
    expense: 20000,
    currentAge: 30,
    ageToRetire: 60,
    currentCorpus: 1000000,
  });

  const [investments, setInvestments] = useState([
    { type: "Small Cap", returnRate: 12, value: 5000 },
    { type: "Medium Cap", returnRate: 3, value: 8000 },
    { type: "Large Cap", returnRate: 10, value: 12000 },
    { type: "Bonds", returnRate: 8, value: 3000 },
  ]);

  const handleReturnChange = (index: number, value: string) => {
    const updatedInvestments = [...investments];
    updatedInvestments[index].returnRate = Number(value);
    setInvestments(updatedInvestments);
  };

  const handleRangeChange = (key: string, value: number) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = (data: any) => {
    console.log("Form submitted with data:", data);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="p-6 rounded-md w-full h-full max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-900">
          Investment Calculator
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6 lg:flex-row justify-between border rounded-lg shadow-lg bg-white p-6">
            {/* Left Section */}
            <div className="w-full lg:w-1/2">
              {/* Monthly Income Range */}
              <div className="my-4">
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="income">Monthly Income</Label>
                  <span className="text-sm bg-gray-200 rounded px-2 py-1 text-right w-20">
                    {values.income}
                  </span>
                </div>
                <div className="relative">
                  <Input
                    id="income"
                    type="range"
                    min={10000}
                    max={100000}
                    step={1000}
                    value={values.income}
                    {...register("income", { required: "Income is required" })}
                    className="w-full h-2 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full appearance-none px-0"
                    onChange={(e) =>
                      handleRangeChange("income", +e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Monthly Expense Range */}
              <div className="my-4">
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="expense">Monthly Expense</Label>
                  <span className="text-sm bg-gray-200 rounded px-2 py-1 text-right w-20">
                    {values.expense}
                  </span>
                </div>
                <div className="relative">
                  <Input
                    id="expense"
                    type="range"
                    min={5000}
                    max={50000}
                    step={500}
                    value={values.expense}
                    {...register("expense", {
                      required: "Expense is required",
                    })}
                    className="w-full h-2 bg-gradient-to-r from-red-400 to-orange-600 rounded-full appearance-none px-0"
                    onChange={(e) =>
                      handleRangeChange("expense", +e.target.value)
                    }
                  />
                  {errors.expense && (
                    <span className="text-red-500 text-sm">
                      {errors.expense.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Current Age Range */}
              <div className="my-4">
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="currentAge">Current Age</Label>
                  <span className="text-sm bg-gray-200 rounded px-2 py-1 text-right w-20">
                    {values.currentAge}
                  </span>
                </div>
                <div className="relative">
                  <Input
                    id="currentAge"
                    type="range"
                    min={18}
                    max={80}
                    value={values.currentAge}
                    {...register("currentAge", {
                      required: "Current Age is required",
                    })}
                    className="w-full h-2 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full appearance-none px-0"
                    onChange={(e) =>
                      handleRangeChange("currentAge", +e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Age to Retire Range */}
              <div className="my-4">
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="ageToRetire">Age to Retire</Label>
                  <span className="text-sm bg-gray-200 rounded px-2 py-1 text-right w-20">
                    {values.ageToRetire}
                  </span>
                </div>
                <div className="relative">
                  <Input
                    id="ageToRetire"
                    type="range"
                    min={40}
                    max={100}
                    value={values.ageToRetire}
                    {...register("ageToRetire", {
                      required: "Age to Retire is required",
                    })}
                    className="w-full h-2 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full appearance-none px-0"
                    onChange={(e) =>
                      handleRangeChange("ageToRetire", +e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Current Investment Corpus Range */}
              <div className="my-4">
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="currentCorpus">
                    Current Investment Corpus
                  </Label>
                  <span className="text-sm bg-gray-200 rounded px-2 py-1 text-right w-20">
                    {values.currentCorpus}
                  </span>
                </div>
                <div className="relative">
                  <Input
                    id="currentCorpus"
                    type="range"
                    min={0}
                    max={10000000}
                    step={10000}
                    value={values.currentCorpus}
                    {...register("currentCorpus", {
                      required: "Current Corpus is required",
                    })}
                    className="w-full h-2 bg-gradient-to-r from-yellow-400 to-green-600 rounded-full appearance-none px-0"
                    onChange={(e) =>
                      handleRangeChange("currentCorpus", +e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="w-full lg:w-1/2 mt-5 lg:mt-0 lg:ml-4 border-l p-5">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="text-gray-900">
                    <th className="py-2 px-4 border">Investment Type</th>
                    <th className="py-2 px-4 border">Investment Value</th>
                    <th className="py-2 px-4 border">Return (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {investments.map((investment, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border">{investment.type}</td>

                      {/* Investment Value */}
                      <td className="py-2 px-4 border">
                        <Input
                          type="number"
                          {...register(`investments[${index}].value`, {
                            required: true,
                          })}
                          defaultValue={investment.value}
                          className="w-20 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>

                      {/* Return Rate */}
                      <td className="py-2 px-4 border">
                        <Input
                          type="number"
                          {...register(`investments[${index}].returnRate`, {
                            required: true,
                          })}
                          defaultValue={investment.returnRate}
                          className="w-20 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onChange={(e) => {
                            handleReturnChange(index, e.target.value);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Button
              type="submit"
              className="lg:w-1/4 w-full bg-teal-600 hover:bg-teal-500 text-white rounded-lg py-2"
            >
              Calculate
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

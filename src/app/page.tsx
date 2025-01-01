"use client";
import RetirementForm from "@/components/custom/RetirementForm";
import RetirementTable from "@/components/custom/RetirementTable";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

type UserInputType = {
  currentAge: string;
  retirementAge: string;
  lifeExpectancy: string;
  startingAssets: string;
  monthlyIncome: string;
  monthlyExpenses: string;
  SmallCapInvestments: string;
  MidCapInvestments: string;
  LargeCapInvestments: string;
  SavingCapInvestments: string;
};

const RetirementCalculator = () => {
  const [staticData, setStaticData] = useState({
    currentAge: "",
    retirementAge: "",
    lifeExpectancy: "",
    startingAssets: "",
    monthlyIncome: "",
    monthlyExpenses: "",
    SmallCapInvestments: "",
    MidCapInvestments: "",
    LargeCapInvestments: "",
    SavingCapInvestments: "",
  });

  const [tableData, setTableData] = useState([]);
  const [isStaticFilled, setIsStaticFilled] = useState(false);

  // useEffect(() => {
  //   const savedStaticData = JSON.parse(localStorage.getItem("staticData"));
  //   const savedTableData = JSON.parse(localStorage.getItem("tableData")) || [];

  //   if (savedStaticData) {
  //     setStaticData(savedStaticData);
  //     setIsStaticFilled(true);
  //     if (savedTableData.length) {
  //       setTableData(savedTableData);
  //     } else {
  //       generateTable(savedStaticData);
  //     }
  //   }
  // }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleStaticSubmit = (data: UserInputType) => {
    localStorage.setItem("staticData", JSON.stringify(data));
    setStaticData(data);
    setIsStaticFilled(true);
    generateTable(data);
  };

  const generateTable = (data: UserInputType) => {
    const {
      currentAge,
      retirementAge,
      lifeExpectancy,
      startingAssets,
      monthlyIncome,
      monthlyExpenses,
      SmallCapInvestments,
      MidCapInvestments,
      LargeCapInvestments,
      SavingCapInvestments,
    } = data;
    const rows = [];
    const percentage_corpus =
      Number(startingAssets) / (Number(monthlyExpenses) * 12);
    const return_year =
      (Number(SmallCapInvestments) +
        Number(MidCapInvestments) +
        Number(LargeCapInvestments) +
        Number(SavingCapInvestments)) /
      4;

    const avg_return_month = Number(return_year / 12);
    let income_invest = 0;
    let previous_Nx = Number(startingAssets);
    let month = 1;
    for (
      let age = parseInt(currentAge) * 12;
      age <= parseInt(lifeExpectancy) * 12;
      age++
    ) {
      const year = month / 12;
      const runningAge = parseInt(currentAge) + year;
      const N = percentage_corpus + year / 2;
      const Nx = previous_Nx + Number(income_invest);
      const yearly_expenses = Number(Nx) / Number(N);
      const monthly_expenses = yearly_expenses / 12;
      const monthly_income =
        runningAge <= Number(retirementAge) ? Number(monthlyIncome) : 0;
      const expected_income = (avg_return_month * Nx) / 100;
      income_invest = monthly_income - monthly_expenses + expected_income;

      rows.push({
        runningAge: Intl.NumberFormat("en-IN", {
          maximumFractionDigits: 2,
        }).format(runningAge),

        year: Intl.NumberFormat("en-IN", {
          maximumFractionDigits: 2,
        }).format(year),

        month,

        N: Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(N),

        Nx: Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }).format(Nx),

        yearly_expenses: Intl.NumberFormat("en-IN", {
          maximumFractionDigits: 0,
        }).format(yearly_expenses),

        monthly_expenses: Intl.NumberFormat("en-IN", {
          maximumFractionDigits: 0,
        }).format(monthly_expenses),

        monthly_income: Intl.NumberFormat("en-IN", {
          maximumFractionDigits: 0,
        }).format(monthly_income),

        income_Nx: Intl.NumberFormat("en-IN", {
          style: "percent",
          currency: "INR",
          maximumFractionDigits: 2,
        }).format(avg_return_month),

        expected_income: Intl.NumberFormat("en-IN", {
          maximumFractionDigits: 0,
        }).format(expected_income),

        income_invest: Intl.NumberFormat("en-IN", {
          maximumFractionDigits: 0,
        }).format(income_invest),
      });
      month += 1;
      previous_Nx = Nx;
    }

    setTableData(rows);
    localStorage.setItem("tableData", JSON.stringify(rows));
  };

  const handleTableChange = (index, name, value) => {
    const updatedTable = [...tableData];
    updatedTable[index][name] = value;
    setTableData(updatedTable);
    localStorage.setItem("tableData", JSON.stringify(updatedTable));
  };

  const compareValues = (expected, actual) => {
    if (expected && actual) {
      const diff = Math.abs(parseFloat(expected) - parseFloat(actual));
      if (diff / parseFloat(expected) > 0.2) return "high";
      if (diff / parseFloat(expected) > 0.1) return "moderate";
    }
    return "normal";
  };

  return (
    <div className="p-6  shadow-lg rounded-xl  bg-gradient-to-r from-green-200 via-green-300 to-blue-200">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-center mb-8 text-blue-800 text-gray-800">
        Retirement Calculator
      </h1>
      <RetirementForm
        staticData={staticData}
        isStaticFilled={isStaticFilled}
        handleStaticSubmit={handleSubmit(handleStaticSubmit)}
        errors={errors}
        register={register}
      />

      {isStaticFilled && (
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-green-600">
            Generated Table
          </h2>
          <RetirementTable
            tableData={tableData}
            handleTableChange={handleTableChange}
            compareValues={compareValues}
          />
        </div>
      )}
    </div>
  );
};

export default RetirementCalculator;

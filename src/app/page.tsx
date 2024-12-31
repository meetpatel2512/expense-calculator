"use client";
import RetirementForm from "@/components/custom/RetirementForm";
import RetirementTable from "@/components/custom/RetirementTable";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const RetirementCalculator = () => {
  const [staticData, setStaticData] = useState({
    name: "",
    currentAge: "",
    retirementAge: "",
    lifeExpectancy: "",
    startingAssets: "",
    monthlyIncome: "",
    monthlyExpenses: "",
    annualReturnRate: "",
    preRetirementInflation: "",
    postRetirementInflation: "",
  });

  const [tableData, setTableData] = useState([]);
  const [isStaticFilled, setIsStaticFilled] = useState(false);

  useEffect(() => {
    const savedStaticData = JSON.parse(localStorage.getItem("staticData"));
    const savedTableData = JSON.parse(localStorage.getItem("tableData")) || [];

    if (savedStaticData) {
      setStaticData(savedStaticData);
      setIsStaticFilled(true);
      if (savedTableData.length) {
        setTableData(savedTableData);
      } else {
        generateTable(savedStaticData);
      }
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleStaticSubmit = (data) => {
    localStorage.setItem("staticData", JSON.stringify(data));
    setStaticData(data);
    setIsStaticFilled(true);
    generateTable(data);
  };

  const generateTable = (data) => {
    const {
      currentAge,
      retirementAge,
      lifeExpectancy,
      startingAssets,
      annualReturnRate,
      monthlyIncome,
      monthlyExpenses,
    } = data;
    const rows = [];
    const annualReturn = parseFloat(annualReturnRate) / 100;
    const monthlyReturn = Math.pow(1 + annualReturn, 1 / 12) - 1;
    let assets = parseFloat(startingAssets);

    for (
      let age = parseInt(currentAge);
      age <= parseInt(lifeExpectancy);
      age++
    ) {
      const isRetired = age >= parseInt(retirementAge);
      const yearlyExpenses = isRetired ? parseFloat(monthlyExpenses) * 12 : 0;
      const yearlyIncome = isRetired ? parseFloat(monthlyIncome) * 12 : 0;
      assets = assets * (1 + annualReturn) - yearlyExpenses + yearlyIncome;

      rows.push({
        age,
        assets: assets.toFixed(2),
        expectedIncome: yearlyIncome.toFixed(2),
        expectedExpenses: yearlyExpenses.toFixed(2),
        actualIncome: "",
        actualExpenses: "",
      });
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
    <div className="p-6  shadow-lg rounded-xl">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-center mb-8 ">
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

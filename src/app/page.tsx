"use client";

import { calculateRetirementSavings } from "@/calculation/retirementCalculator";
import { RetirementForm } from "@/components/retirement/RetirementForm";
import { RetirementTable } from "@/components/retirement/RetirementTable";
import { FormDataType } from "@/types/form";
import { TableRowData } from "@/types/table";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const Page = () => {
  const form = useForm<FormDataType>();
  const [tableData, setTableData] = useState<TableRowData[]>([]);
  const [disabledForm, setDisabledForm] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormDataType>({
    currentAge: "",
    retirementAge: "",
    lifeExpectancy: "",
    startingAssets: "",
    monthlyIncome: "",
    monthlyExpenses: "",
    investment: [],
  });

  useEffect(() => {
    const savedStaticData = localStorage.getItem("staticData");
    const savedTableData = localStorage.getItem("tableData");
    if (savedStaticData) {
      setDisabledForm(true);
      setFormData(JSON.parse(savedStaticData));
    }
    if (savedTableData) setTableData(JSON.parse(savedTableData));
  }, []);

  const onSubmit: SubmitHandler<FormDataType> = (data) => {
    setFormData(data);
    const calculatedData = calculateRetirementSavings(data);
    setTableData(calculatedData);
    setDisabledForm(true);
    localStorage.setItem("staticData", JSON.stringify(data));
    localStorage.setItem("tableData", JSON.stringify(calculatedData));
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <RetirementForm
        form={form}
        formData={formData}
        disabledForm={disabledForm}
      />
      <RetirementTable tableData={tableData} />
    </form>
  );
};

export default Page;

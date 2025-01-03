"use client";

import { calculateRetirementSavings } from "@/calculation/retirementCalculator";
import { RetirementForm } from "@/components/retirement/RetirementForm";
import { RetirementTable } from "@/components/retirement/RetirementTable";
import ReturnsForm from "@/components/retirement/ReturnsForm";
import { FormDataType } from "@/types/form";
import { TableRowData } from "@/types/table";
import { Button } from "@mui/material";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";

export const RootComponent = () => {
  const [tableData, setTableData] = useState<TableRowData[]>([]);
  const [disabledForm, setDisabledForm] = useState<boolean>();
  const [formData, setFormData] = useState<FormDataType>({
    currentAge: 24,
    retirementAge: 50,
    lifeExpectancy: 80,
    startingAssets: 1000000,
    investment: [
      {
        percentage: 30,
        return: 14,
      },
      {
        percentage: 30,
        return: 12,
      },
      {
        percentage: 10,
        return: 10,
      },
      {
        percentage: 30,
        return: 6,
      },
    ],
    monthlyIncome: 10000,
    monthlyExpenses: 10000,
  });

  useEffect(() => {
    const savedStaticData = localStorage.getItem("staticData");
    const savedTableData = localStorage.getItem("tableData");
    const savedDisabledForm = localStorage.getItem("disabled");

    setDisabledForm(savedDisabledForm === "true");
    if (savedStaticData) {
      setFormData(JSON.parse(savedStaticData));
    }
    if (savedTableData) setTableData(JSON.parse(savedTableData));
  }, []);

  const onChange = useCallback(
    (data: FormDataType) => {
      setFormData((prevData) => ({ ...prevData, ...data }));
    },
    [setFormData]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(
    debounce((formData: FormDataType) => {
      const calculatedData = calculateRetirementSavings(formData);
      setTableData(calculatedData);
      localStorage.setItem("staticData", JSON.stringify(formData));
      localStorage.setItem("tableData", JSON.stringify(calculatedData));
    }, 1000),
    []
  );

  useEffect(() => {
    if (formData) {
      debounceFn(formData);
    }
  }, [debounceFn, formData]);

  return (
    <>
      <div className="flex flex-col gap-6 p-6 ">
        <div className="flex gap-6">
          <RetirementForm disabledForm={disabledForm} onChange={onChange} />
          <ReturnsForm disabledForm={disabledForm} onChange={onChange} />
        </div>
        <div className="flex justify-end">
          <Button
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg shadow-md hover:from-blue-500 hover:to-green-500 transition-all duration-300"
            onClick={() => {
              localStorage.setItem("disabled", disabledForm.toString());
              setDisabledForm(!disabledForm);
            }}
          >
            {disabledForm ? "Enable Form" : "Disable Form"}
          </Button>
        </div>
      </div>

      <RetirementTable tableData={tableData} />
    </>
  );
};

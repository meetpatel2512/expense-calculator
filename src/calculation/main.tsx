"use client";

import { calculateRetirementSavings } from "@/calculation/retirementCalculator";
import { RetirementForm } from "@/components/retirement/RetirementForm";
import { RetirementTable } from "@/components/retirement/RetirementTable";
import ReturnsForm from "@/components/retirement/ReturnsForm";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormDataType } from "@/types/form";
import { TableRowData } from "@/types/table";
import { Button } from "@mui/material";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";

export const RootComponent = () => {
  const [tableData, setTableData] = useState<TableRowData[]>([]);
  const [disabledForm, setDisabledForm] = useState<boolean>(true);
  const [resetKey, setResetKey] = useState(0);

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

  const [userData, setUserData] = useState<Record<string, string | undefined>>(
    {}
  );

  useEffect(() => {
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }
  }, [resetKey]);

  useEffect(() => {
    const savedStaticData = localStorage.getItem("staticData");
    const savedTableData = localStorage.getItem("tableData");
    const savedDisabledForm = localStorage.getItem("disabled");

    setDisabledForm(JSON.parse(savedDisabledForm));
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

  const reCalculateData = useCallback(
    (formData: FormDataType) => {
      const calculatedData = calculateRetirementSavings(formData, userData);
      setTableData(calculatedData);
      localStorage.setItem("staticData", JSON.stringify(formData));
      localStorage.setItem("tableData", JSON.stringify(calculatedData));
    },
    [userData]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(debounce(reCalculateData, 1000), [userData]);

  useEffect(() => {
    if (formData) {
      debounceFn(formData);
    }
  }, [debounceFn, formData]);

  useEffect(() => {
    if (resetKey !== 0) {
      reCalculateData(formData);
    }
  }, [resetKey, formData, reCalculateData]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f87171",
          gap: "1.5rem",
          height: "auto",
          width: "100%",
          background: "linear-gradient(to right, #ddd6f3, #fbc2eb)",
        }}
        className="md:p-6"
      >
        <div className="flex flex-col gap-6 p-6 ">
          {!disabledForm ? (
            <div>
              <div className="flex gap-6 flex-col sm:flex-row">
                <RetirementForm
                  disabledForm={disabledForm}
                  onChange={onChange}
                />
                <ReturnsForm
                  disabledForm={disabledForm}
                  onChange={onChange}
                  defaultData={formData}
                  className="p-6"
                />
              </div>
              <Button
                variant="contained"
                sx={{
                  background:
                    "linear-gradient(to right, #ec4899, #f43f5e)" /* from-pink-500 to-rose-500 */,
                  marginTop: "1rem",
                }}
                onClick={() => {
                  setDisabledForm(!disabledForm);
                  localStorage.setItem(
                    "disabled",
                    JSON.stringify(!disabledForm)
                  );
                }}
              >
                {disabledForm ? "Enable Form" : "Disable Form"}
              </Button>
            </div>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <div className="flex justify-end">
                  <Button
                    variant="contained"
                    sx={{
                      background:
                        "linear-gradient(to right, #ec4899, #f43f5e)" /* from-pink-500 to-rose-500 */,
                    }}
                  >
                    Show Form
                  </Button>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-full">
                <DialogTitle className="hidden" />
                <div className="flex flex-col gap-6 p-6">
                  <div className="flex gap-6 flex-col sm:flex-row h-full w-full">
                    <RetirementForm
                      disabledForm={disabledForm}
                      onChange={onChange}
                    />
                    <ReturnsForm
                      disabledForm={disabledForm}
                      onChange={onChange}
                      defaultData={formData}
                      className="p-6"
                    />
                  </div>

                  <DialogFooter>
                    <div className="flex justify-between w-full">
                      <Button
                        variant="contained"
                        sx={{
                          background:
                            "linear-gradient(to right, #ec4899, #f43f5e)" /* from-pink-500 to-rose-500 */,
                        }}
                        onClick={() => {
                          localStorage.setItem(
                            "disabled",
                            JSON.stringify(!disabledForm)
                          );
                          setDisabledForm(!disabledForm);
                        }}
                      >
                        {disabledForm ? "Enable Form" : "Disable Form"}
                      </Button>

                      <DialogClose asChild>
                        <Button type="button" variant="contained">
                          Close
                        </Button>
                      </DialogClose>
                    </div>
                  </DialogFooter>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
        <RetirementTable tableData={tableData} setResetKey={setResetKey} />
      </div>
    </div>
  );
};

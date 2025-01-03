import { FormDataType } from "@/types/form";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";

export const RetirementForm = ({
  onChange,
  disabledForm,
}: {
  onChange: (data: FormDataType) => void;
  disabledForm: boolean;
}) => {
  const { watch, getValues, register, reset } = useForm<FormDataType>({
    disabled: disabledForm,
  });

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
    <div className="w-full bg-white p-6 rounded-lg shadow-lg md:w-1/3">
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
        Retirement Calculator
      </h1>

      <div className="flex flex-col gap-6 py-6">
        {[
          {
            label: "Current Age",
            name: "currentAge",
            min: 0,
            max: 100,
            defaultValue: 24,
          },
          {
            label: "Retirement Age",
            name: "retirementAge",
            min: 0,
            max: 100,
            defaultValue: 50,
          },
          {
            label: "life Expectancy",
            name: "lifeExpectancy",
            min: 0,
            max: 100,
            defaultValue: 80,
          },
          {
            label: "starting Assets",
            name: "startingAssets",
            min: 0,
            max: 10000000,
            defaultValue: 1000000,
          },
        ].map((data, index) => (
          <div key={index} className="space-y-2 mt-3">
            <Label className="text-lg font-medium text-gray-700">
              {data.label} -{" "}
              {typeof getValues(data.name as keyof FormDataType) !== "object"
                ? `${getValues(data.name as keyof FormDataType)}`
                : null}
            </Label>
            <div className="relative mb-6">
              <input
                disabled={disabledForm}
                defaultValue={data.defaultValue}
                {...register(data.name as keyof FormDataType, {
                  required: true,
                  onChange: (e) => {
                    onChange({
                      ...watch(),
                      [data.name]: Number(e.target.value),
                    });
                  },
                })}
                id="labels-range-input"
                type="range"
                max={data.max}
                min={data.min}
                className={
                  "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" +
                  (disabledForm ? " opacity-50" : "")
                }
              />
              <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
                {data.min}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
                {data.max}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import { FormDataType } from "@/types/form";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SliderWithInput } from "../Slider";

export const RetirementForm = ({
  onChange,
  disabledForm,
}: {
  onChange: (data: FormDataType) => void;
  disabledForm: boolean;
}) => {
  const [staticData, setStaticData] = useState<FormDataType>({});
  const { watch, getValues, reset } = useForm<FormDataType>({
    disabled: disabledForm,
    defaultValues: staticData,
  });

  useEffect(() => {
    const savedStaticData = localStorage.getItem("staticData");
    if (savedStaticData) {
      setStaticData(JSON.parse(savedStaticData));
      reset(JSON.parse(savedStaticData));
    }
  }, [reset]);

  useEffect(() => {
    const { unsubscribe } = watch((value) => {
      onChange(value);
    });
    return () => unsubscribe();
  }, [watch, onChange]);

  const sliders = [
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
      label: "Life Expectancy",
      name: "lifeExpectancy",
      min: 0,
      max: 100,
      defaultValue: 80,
    },
    {
      label: "Starting Assets",
      name: "startingAssets",
      min: 0,
      max: 10000000,
      defaultValue: 1000000,
    },
  ];

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-lg md:w-1/3">
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
        Retirement Calculator
      </h1>
      <div className="flex flex-col gap-6 py-6">
        {sliders.map((slider, index) => (
          <SliderWithInput
            key={index}
            label={slider.label}
            value={
              getValues(
                slider.name as keyof {
                  currentAge?: number | undefined;
                  retirementAge?: number | undefined;
                  lifeExpectancy?: number | undefined;
                  startingAssets?: number | undefined;
                }
              ) || slider.defaultValue
            }
            min={slider.min}
            max={slider.max}
            disabled={disabledForm}
            onChange={(value) => {
              const updatedValues = { ...watch(), [slider.name]: value };
              onChange(updatedValues);
              reset(updatedValues); // Update the form state
            }}
          />
        ))}
      </div>
    </div>
  );
};

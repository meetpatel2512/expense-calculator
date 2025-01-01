"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface RetirementFormProps {
  staticData: Record<string, string>;
  isStaticFilled: boolean;
  handleStaticSubmit: (data: any) => void;
  errors: any;
  register: any;
}

const RetirementForm: React.FC<RetirementFormProps> = ({
  register,
  staticData,
  isStaticFilled,
  handleStaticSubmit,
  errors,
}) => {
  return (
    <form
      onSubmit={handleStaticSubmit}
      className="border rounded-md bg-white shadow-md"
    >
      <div className="md:grid lg:grid-cols-4 gap-5 items-center p-5 md:grid-cols-3 grid-cols-1">
        {Object.keys(staticData).map((key) => (
          <div key={key} className="w-full max-sm:my-3">
            <label className="block text-lg font-medium capitalize text-green-800">
              {key.replace(/([A-Z])/g, " $1")}:
            </label>
            <div className="w-full p-[2px] rounded-md bg-gradient-to-r from-green-500 via-blue-400 to-red-300">
              <Input
                type="text"
                name={key}
                {...register(key, { required: true })}
                defaultValue={staticData[key]}
                className="w-full p-3 rounded-md border-none focus:ring-green-500 focus:outline-none shadow-sm bg-white"
              />
            </div>
            {errors[key] && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>
        ))}
      </div>

      <Button
        type="submit"
        className="py-3 mx-5 bg-green-600 text-white rounded-md hover:bg-green-700 mb-3 shadow-md"
      >
        Save Data
      </Button>
    </form>
  );
};

export default RetirementForm;

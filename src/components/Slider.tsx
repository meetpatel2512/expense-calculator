import { styled } from "@mui/material/styles";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import { useState } from "react";

const Input = styled(MuiInput)`
  width: 60px;
`;

interface SliderWithInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  disabled: boolean;
  onChange: (value: number) => void;
}

export const SliderWithInput = ({
  label,
  value,
  min,
  max,
  disabled,
  onChange,
}: SliderWithInputProps) => {
  const [localValue, setLocalValue] = useState(value);

  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    const updatedValue = newValue as number;
    setLocalValue(updatedValue);
    onChange(updatedValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValue = Number(event.target.value);
    setLocalValue(updatedValue);
    onChange(updatedValue);
  };

  const handleBlur = () => {
    if (localValue < min) {
      setLocalValue(min);
      onChange(min);
    } else if (localValue > max) {
      setLocalValue(max);
      onChange(max);
    }
  };

  return (
    <div className="space-y-2 mt-3">
      <label className="text-lg font-medium text-gray-700">
        {label} (
        {label === "Starting Assets"
          ? `${Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 0,
            }).format(localValue)}`
          : localValue}
        )
      </label>
      <div className="flex items-center gap-4">
        <Slider
          value={localValue}
          min={min}
          max={max}
          disabled={disabled}
          onChange={handleSliderChange}
          color="secondary"
        />
        <Input
          value={localValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          disabled={disabled}
          inputProps={{
            min,
            max,
            type: "number",
          }}
        />
      </div>
    </div>
  );
};

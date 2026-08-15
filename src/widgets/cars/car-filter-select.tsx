"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CarFilterSelectProps {
  placeholder: string;
  value?: string;
  options: string[];
  onChange: (value: string | null) => void;
}

export const CarFilterSelect = ({
  placeholder,
  value,
  options,
  onChange,
}: CarFilterSelectProps) => {
  return (
    <Select value={value ?? ""} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
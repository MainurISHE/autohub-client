import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  placeholder: string;
  value?: string;
  options: SelectOption[];
  onValueChange: (value: string | null) => void;
}

export const FormSelect = ({
  placeholder,
  value,
  options,
  onValueChange,
}: FormSelectProps) => {
  return (
    <Select
      value={value ?? null}
      onValueChange={(value) => {
        if (!value) return;

        onValueChange(value);
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

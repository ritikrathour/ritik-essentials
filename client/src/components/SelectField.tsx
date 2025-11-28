import { AlertCircle, Loader2 } from "lucide-react";

const SelectField: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: readonly string[];
  required?: boolean;
  error?: string;
}> = ({ label, name, value, onChange, options, required, error }) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full py-2 md:py-3.5 px-4  border  ${
          error ? "border-red-500" : "border-gray-300"
        } rounded focus:outline-1 transition-all`}
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options?.map?.((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && (
        <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
          <AlertCircle className="w-3 h-3" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
export default SelectField;

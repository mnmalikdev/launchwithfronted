import { FC } from "react";
import { TiTick } from "react-icons/ti";

interface Props {
  options: string[];
  selected: string;
  defaultValue?: string;
  onChange: (value: string) => void;
}

const VerticalRadioSelect: FC<Props> = ({ options, defaultValue, selected, onChange }) => {
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const showDefaultValue = selected === ""; // Only show defaultValue when not in edit mode

  return (
    <div className="flex flex-col">
      {options.map((option) => (
        <label key={option} className="flex items-center py-2">
          <input type="radio" value={option} checked={selected === option} onChange={handleOptionChange} className="hidden" />
          <div
            className={`w-6 h-6 rounded-full border-2 border-gray-400 mr-2 flex items-center justify-center transition-colors ${
              selected === option || (showDefaultValue && defaultValue === option) ? "bg-primary border-white" : ""
            }`}
          >
            {(selected === option || (showDefaultValue && defaultValue === option)) && <TiTick size={20} className="text-white" />}
          </div>
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
};

export default VerticalRadioSelect;

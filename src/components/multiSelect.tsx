import { FC, useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";

interface Props {
  options: string[];
  selected: string[];
  defaultValue?: string[];
  onChange: (value: string[]) => void;
}

const InlineMultiselect: FC<Props> = ({ options, selected, defaultValue, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(defaultValue || []);

  useEffect(() => {
    setSelectedOptions(defaultValue || []);
  }, [defaultValue]);

  useEffect(() => {
    setSelectedOptions(selected);
  }, [selected]);

  const toggleOption = (option: string) => {
    const updatedOptions = selectedOptions.includes(option) ? selectedOptions.filter((o) => o !== option) : [...selectedOptions, option];

    setSelectedOptions(updatedOptions);
    onChange(updatedOptions);
  };

  const isSelected = (option: string) => {
    return selectedOptions.includes(option);
  };

  return (
    <div className="inline-flex flex-wrap items-center gap-2">
      {options.map((option) => (
        <button
          key={option}
          className={`${isSelected(option) ? " bg-primary text-white" : "bg-gray-100 text-gray-600"} rounded-full flex items-center px-2 py-1`}
          onClick={() => toggleOption(option)}
          type="button"
        >
          {option}
          {isSelected(option) && (
            <span className="ml-2 flex items-center justify-center w-6 h-6 bg-secondary rounded-full">
              <RxCross1 size={16} className="text-white" />
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default InlineMultiselect;

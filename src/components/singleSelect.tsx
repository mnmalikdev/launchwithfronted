import { FC, useState } from "react";
import { RxCross1 } from "react-icons/rx";

interface Props {
  options: string[];
  selected?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
}

const SingleSelect: FC<Props> = ({ options, selected, defaultValue, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(selected);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onChange(option);
  };

  return (
    <div className="inline-flex flex-wrap items-center gap-2">
      {options.map((option) => (
        <button
          key={option}
          className={`${
            selectedOption === option ? "bg-green-500 text-white" : "bg-gray-100 text-gray-600"
          } rounded-full flex items-center px-2 py-1`}
          onClick={() => handleOptionClick(option)}
        >
          {option}
          {selectedOption === option ||
            (defaultValue === option && (
              <span className="ml-2">
                <RxCross1 className="w-3 h-3 bg-green-700 rounded-full" />
              </span>
            ))}
        </button>
      ))}
    </div>
  );
};

export default SingleSelect;

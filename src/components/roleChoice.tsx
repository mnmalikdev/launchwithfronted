import { useState } from "react";

const RoleChoice = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  return (
    <>
      <div className=" w-4/5 bg-primary lg:w-2/3 py-4 rounded-full">
        <label className="flex flex-row cursor-pointer">
          <input
            type="radio"
            className="w-1/4 "
            name="option"
            value="visionary"
            onChange={(event) => setSelectedOption(event.target.value)}
            checked={selectedOption === "visionary"}
          />
          <span className="text-white text-4xl text-center ">Visionary</span>
        </label>
      </div>

      <div className="w-4/5 bg-primary lg:w-2/3 py-4 rounded-full">
        <label className="flex flex-row cursor-pointer">
          <input
            type="radio"
            className="w-1/4   "
            name="option"
            value="contributor"
            onChange={(event) => setSelectedOption(event.target.value)}
            checked={selectedOption === "contributor"}
          />
          <span className="text-white text-4xl text-center">Contributor</span>
        </label>
      </div>
    </>
  );
};
export default RoleChoice;

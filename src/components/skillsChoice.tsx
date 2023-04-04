import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import categories from "./../data/data";

const SkillsChoice = () => {
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState<number>(-1);
  const [selectedSubCategories, setSelectedSubCategories] = useState<Array<{ category: string; subcategory: string }>>([]);

  const handleSubCategorySelect = (subcategory: string) => {
    const category = categories[selectedCategoryIdx].name;
    const index = selectedSubCategories.findIndex((item) => item.subcategory === subcategory);
    if (index === -1) {
      // subcategory not found in selectedSubCategories, add it
      setSelectedSubCategories([...selectedSubCategories, { category, subcategory }]);
    } else {
      // subcategory found in selectedSubCategories, remove it
      const updatedSubCategories = [...selectedSubCategories];
      updatedSubCategories.splice(index, 1);
      setSelectedSubCategories(updatedSubCategories);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full py-10">
      <input
        type="text"
        value={selectedSubCategories.length > 0 ? selectedSubCategories.map((item) => item.subcategory).join(", ") : ""}
        placeholder="Selected subcategories"
        className="border-greendark border-2 w-4/5 bg-transparent rounded-sm text-white py-2 px-4 my-5 placeholder:text-greendark"
      />
      {selectedCategoryIdx === -1 ? (
        <div className="flex flex-wrap justify-around items-center w-full my-5">
          {categories.map((category, index) => (
            <p key={index} className="text-white text-lg font-semibold cursor-pointer" onClick={() => setSelectedCategoryIdx(index)}>
              {category.name}
            </p>
          ))}
        </div>
      ) : (
        <>
          <div className="flex flex-row justify-center ml-8 mt-3 gap-3">
            <div className="flex items-start mt-1 ">
              <p className="text-white text-lg mb-2 decoration-greensemidark underline decoration-solid decoration-2">
                {categories[selectedCategoryIdx].name}
              </p>
            </div>

            <div className="flex flex-wrap ">
              {categories[selectedCategoryIdx].subcategories.map((subcategory, index) => (
                <button
                  key={index}
                  className={`bg-bglight text-sm text-black font-semibold py-1 px-2 rounded-full mx-2 my-1 hover:bg-bgdark focus:outline-none ${
                    selectedSubCategories.find((item) => item.subcategory === subcategory) ? "bg-primary" : ""
                  }`}
                  onClick={() => handleSubCategorySelect(subcategory)}
                >
                  <span className="flex items-center gap-2">
                    {selectedSubCategories.find((item) => item.subcategory === subcategory) && (
                      <RxCross1
                        size={23}
                        className="ml-2 bg-bglight p-1 rounded-full cursor-pointer"
                        onClick={() => handleSubCategorySelect(subcategory)}
                      />
                    )}
                    <span>{subcategory}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className=" flex justify-center items-center mt-10">
            <button
              className="bg-orangelight text-white py-2 px-4 rounded-full mt-2 hover:bg-orangedark focus:outline-none"
              onClick={() => {
                setSelectedCategoryIdx(-1);
                console.log(selectedSubCategories);
              }}
            >
              <p className="text-white">Back to categories</p>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SkillsChoice;

import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";

interface Props {
  title?: string;
  category?: string;
  startDate?: string;
}

const ProjectCard: React.FC<Props> = ({ title, category, startDate }) => {
  return (
    <div className="bg-primary w-fit rounded-md shadow-md px-10 py-12 flex flex-col justify-center items-center hover:bg-orangelight hover:cursor-pointer hover:-translate-y-2 transition duration-300 ease-in-out">
      {title ? (
        <>
          <h3 className="text-xl text-white font-semibold pb-4 ">{title}</h3>
          <p className="text-white text-sm pt-5 ">{category}</p>
          <p className="text-white text-xs  ">{startDate}</p>
        </>
      ) : (
        <>
          <AiOutlinePlusCircle className="text-white text-3xl mb-2" />
          <p className="text-white text-lg py-5 px-3 font-bold ">Add New</p>
        </>
      )}
    </div>
  );
};

export default ProjectCard;

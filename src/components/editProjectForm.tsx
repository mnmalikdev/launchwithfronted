// TODO : INCORPORATE LATER WHILE CLEANING CODE !!!
import useProjects from "@/pages/profile/hooks/useProjects";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { TiEdit } from "react-icons/ti";
import InterestedContributer from "./interestedContributer";
import Modal from "./modal";

interface Props {
  displayViewModal: boolean;
  toggleViewProjectModal: () => void;
  projectId?: string;
}

const EditProjectForm: FC<Props> = ({ displayViewModal, toggleViewProjectModal, projectId }) => {
  const { projects, isLoading, handleCreateProjectSubmit, convertTimeStampToDate } = useProjects();
  const [editMode, setEditMode] = useState(false);
  const {
    handleSubmit,
    reset,
    control,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const [selectedProject, setSelectedProject] = useState({
    projectId: "",
    name: "",
    basicInfo: "",
    moreInfo: "",
    industry: [{ name: "" }],
    category: "",
    stage: "",
    startDate: 0,

    companyUrl: "",
    contributerInProjects: [
      {
        userId: "",
        userName: "",
        firstName: "",
        lastName: "",
        position: "",
        major: "",
        bio: "",
        email: "",
        profileImageUrl: "",
      },
    ],
  });
  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  const handleEditFormSubmit = (formData: any) => {
    // if (event) {
    //   event.preventDefault();
    // }
    console.log("sbumited !!", formData);
  };

  return (
    <Modal isOpen={displayViewModal} onClose={toggleViewProjectModal} bgColor="bg-white">
      <form>
        <div className="flex flex-col gap-4 w-full ">
          <TiEdit onClick={toggleEditMode} size={20} />
          {/* project name */}
          <div className="w-full ">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
              Project Title
            </label>
            <input
              key={`${Math.floor(Math.random() * 1000)}-min`}
              className={`appearance-none block w-full ${
                !editMode ? "  bg-zinc-200 text-gray-700" : "focus:bg-white focus:border-gray-500"
              } border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none bg-white `}
              disabled={!editMode}
              defaultValue={selectedProject?.name}
              type="text"
              {...register("name")}
            />
          </div>

          {/* project industries */}
          <div className="w-full ">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="industry">
              Project industry
            </label>
            <input
              key={`${Math.floor(Math.random() * 1000)}-min`}
              className={`appearance-none block w-full ${
                !editMode ? "  bg-zinc-200 text-gray-700" : "focus:bg-white focus:border-gray-500"
              } border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none bg-white `}
              disabled={!editMode}
              defaultValue={selectedProject?.industry
                ?.map((industry) => {
                  return industry?.name;
                })
                .join(", ")}
              type="text"
              {...register("industry")}
            />
          </div>

          {/* project category */}
          <div className="w-full ">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="category">
              Project category
            </label>
            <input
              key={`${Math.floor(Math.random() * 1000)}-min`}
              className={`appearance-none block w-full ${
                !editMode ? "  bg-zinc-200 text-gray-700" : "focus:bg-white focus:border-gray-500"
              } border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none bg-white `}
              disabled={!editMode}
              defaultValue={selectedProject?.category}
              type="text"
              {...register("category")}
            />
          </div>

          {/* project stage */}
          <div className="w-full ">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="stage">
              Project stage
            </label>
            <input
              key={`${Math.floor(Math.random() * 1000)}-min`}
              className={`appearance-none block w-full ${
                !editMode ? "  bg-zinc-200 text-gray-700" : "focus:bg-white focus:border-gray-500"
              } border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none bg-white `}
              disabled={!editMode}
              defaultValue={selectedProject?.stage}
              type="text"
              {...register("stage")}
            />
          </div>

          {/* project start date */}
          <div className="w-full ">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="startDate">
              Project start date
            </label>
            <input
              className={`appearance-none block w-full ${
                !editMode ? "  bg-zinc-200 text-gray-700" : "focus:bg-white focus:border-gray-500"
              } border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none bg-white `}
              disabled={!editMode}
              defaultValue={convertTimeStampToDate(selectedProject?.startDate)}
              type="text"
              {...register("startDate")}
            />
          </div>

          {/* project basic info */}
          <div className="w-full py-3 ">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="basicInfo">
              Basic Info
            </label>
            <textarea
              className={`appearance-none block w-full h-36 ${
                !editMode ? "  bg-zinc-200 text-gray-700" : "focus:bg-white focus:border-gray-500"
              } border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none bg-white `}
              disabled={!editMode}
              defaultValue={selectedProject.basicInfo}
              {...register("basicInfo")}
            />
          </div>

          {/* project more info */}
          <div className="w-full  ">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="moreInfo">
              More Info
            </label>
            <textarea
              className={`appearance-none block w-full h-36 ${
                !editMode ? "  bg-zinc-200 text-gray-700" : "focus:bg-white focus:border-gray-500"
              } border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none bg-white `}
              disabled={!editMode}
              defaultValue={selectedProject.moreInfo}
              {...register("moreInfo")}
            />
          </div>

          <div className="flex flex-col gap-3 py-2  ">
            <h2 className="text-2xl text-greendark font-semibold ">Interested Contributers</h2>
            {selectedProject?.contributerInProjects?.map((contributerInProjects) => {
              return (
                <InterestedContributer
                  userId={contributerInProjects?.userId}
                  email={contributerInProjects?.email}
                  imgUrl={contributerInProjects?.profileImageUrl}
                  userName={contributerInProjects?.userName}
                />
              );
            })}
          </div>
        </div>
        <button
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            const formValues = getValues();
            handleEditFormSubmit(formValues);
          }}
          className="bg-orangelight text-white py-2 px-4 rounded-full mt-2 hover:bg-orangedark focus:outline-none  w-full"
        >
          <p className="text-white">Submit</p>
        </button>
      </form>
    </Modal>
  );
};
export default EditProjectForm;

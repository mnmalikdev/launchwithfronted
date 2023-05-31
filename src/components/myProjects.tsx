import { CategoryArray, IndustriesArray, ProjectStageArray } from "@/constants/data-store";
import useProjects from "@/pages/profile/hooks/useProjects";
import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import { Controller, useForm } from "react-hook-form";
import { AiFillCalendar } from "react-icons/ai";
import { TiEdit } from "react-icons/ti";
import { ToastContainer } from "react-toastify";
import CreateProjectForm from "./createProjectForm";
import InterestedContributer from "./interestedContributer";
import Loader from "./loader";
import Modal from "./modal";
import InlineMultiselect from "./multiSelect";
import ProjectCard from "./projectCard";
import VerticalRadioSelect from "./singleVerticalSelect";

const MyProjects = () => {
  // seperate states for eact modal.

  const [displayCreateModal, setDisplayCreateModal] = useState(false);
  const [displayViewModal, setDisplayViewModalModal] = useState(false);
  const [editProjectId, setEditProjectId] = useState(undefined);
  const [editMode, setEditMode] = useState(false);

  const { projects, isLoading, convertTimeStampToDate, convertTimeStampToDateObj, fetchUserProjects, handleEditProject } = useProjects();
  const {
    handleSubmit,
    reset,
    control,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const toggleCreateProjectModal = () => {
    reset();
    setDisplayCreateModal((prev) => !prev);
  };

  const toggleViewProjectModal = () => {
    setDisplayViewModalModal((prev) => !prev);
  };

  const handleEditFormSubmit = (formData: any) => {
    console.log("submitted !!", formData);

    // Check if any changes have been made
    const hasChanges = Object.entries(formData).some(([key, value]) => selectedProject[key as keyof typeof selectedProject] !== value);

    // If no changes, update the form data with default values
    if (!hasChanges) {
      formData = selectedProject;
    } else {
      // Convert the startDate to a timestamp if it exists
      const { startDate, ...otherData } = formData;

      if (startDate) {
        const timestamp = Math.floor(startDate.getTime() / 1000);
        formData = { ...otherData, startDate: timestamp };
      }
    }

    handleEditProject(editProjectId, formData);
    reset();
    toggleViewProjectModal();
    fetchUserProjects();
  };
  // this function only enables forms inputs to be edited.
  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  const [selectedProject, setSelectedProject] = useState({
    projectId: "",
    name: "",
    basicInfo: "",
    moreInfo: "",
    industry: [
      {
        name: "",
      },
    ],
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

  const projectCards = projects?.map((project: any) => {
    return (
      <div key={project?.projectId}>
        <button
          onClick={() => {
            setSelectedProject(project);
            setEditProjectId(project?.projectId);
            console.log("SELECTED PROJECT", selectedProject);
          }}
        >
          <ProjectCard
            projectId={project?.projectId}
            title={project?.name}
            stage={project?.stage}
            industry={project?.industry}
            category={project?.category}
            startDate={convertTimeStampToDate(project?.startDate)}
            onClick={toggleViewProjectModal}
          />
        </button>
      </div>
    );
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUserProjects();
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    console.log("INCOMING FROM state projects", projects);
  }, []);

  return (
    <div className="flex flex-col  mx-14 my-5 overflow-hidden w-full">
      <ToastContainer />
      <div className="flex flex-row w-full justify-between my-4">
        <p className="text-2xl text-orangedark font-bold">My Projects</p>
      </div>
      <div className="flex  md:flex-row gap-4 md:justify-between md:items-start">
        {isLoading ? <Loader /> : <div className="flex flex-col md:flex-row gap-3 flex-wrap  my-2">{projectCards}</div>}
        <div className="flex flex-col md:flex-row gap-5 my-2">
          <ProjectCard onClick={toggleCreateProjectModal} />
        </div>
      </div>

      <Modal isOpen={displayViewModal} onClose={toggleViewProjectModal} bgColor="bg-white">
        <form onSubmit={handleSubmit(handleEditFormSubmit)}>
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

            <label htmlFor="startDate" className="text-lg font-medium">
              Start Date
            </label>
            <Controller
              control={control}
              name="startDate"
              render={({ field }) => (
                <DatePicker
                  required
                  disabled={!editMode}
                  name="startDate"
                  className="w-full text-greendark"
                  calendarIcon={<AiFillCalendar className="text-orangedark" />}
                  clearIcon={null}
                  value={field.value || convertTimeStampToDateObj(selectedProject?.startDate)}
                  selectRange={false}
                  onChange={(dateTime) => {
                    field.onChange(dateTime); // Update the field value
                  }}
                />
              )}
            />

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

            <div className="flex flex-wrap gap-2 ">
              <Controller
                name="industry"
                control={control}
                defaultValue={selectedProject?.industry?.map((industry) => industry?.name) || []} // Update defaultValue to contain the actual values
                render={({ field: { onChange, value } }) => (
                  <InlineMultiselect
                    options={IndustriesArray}
                    selected={value}
                    defaultValue={selectedProject?.industry?.map((industry) => industry?.name) || []} // Update defaultValue to contain the actual values
                    onChange={onChange}
                  />
                )}
              />

              {errors?.industry && <span className="text-red-500">This field is required</span>}
            </div>

            <label htmlFor="stage" className="text-lg font-medium">
              Which stage is your idea currently in ?
            </label>

            <div className="flex flex-col gap-2 ">
              <Controller
                name="stage"
                control={control}
                defaultValue={selectedProject?.stage}
                render={({ field: { onChange, value } }) => (
                  <VerticalRadioSelect options={ProjectStageArray} defaultValue={selectedProject?.stage} selected={value} onChange={onChange} />
                )}
              />

              {errors?.projectStage && <span className="text-red-500">This field is required</span>}
            </div>

            <label htmlFor="category" className="text-lg font-medium">
              Which category does your project/idea belong to?
            </label>

            <div className="flex flex-col gap-2 ">
              <Controller
                name="category"
                control={control}
                defaultValue={selectedProject?.category}
                render={({ field: { onChange, value } }) => (
                  <VerticalRadioSelect options={CategoryArray} selected={value} defaultValue={selectedProject?.category} onChange={onChange} />
                )}
              />

              {errors?.category && <span className="text-red-500">This field is required</span>}
            </div>

            <label htmlFor="companyUrl" className="text-lg font-medium">
              Company website if any
            </label>
            <input
              defaultValue={selectedProject?.companyUrl}
              className=" w-full border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none bg-white"
              placeholder="Company Url (Optional)"
              type="text"
              {...register("companyUrl", { required: false })}
            />

            <div className="flex flex-col gap-3 py-2  ">
              <h2 className="text-2xl text-greendark font-semibold ">Interested Contributers</h2>
              {selectedProject?.contributerInProjects?.map((contributerInProjects) => {
                return (
                  <InterestedContributer
                    key={contributerInProjects?.userId}
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

      <CreateProjectForm displayCreateModal={displayCreateModal} toggleCreateProjectModal={toggleCreateProjectModal} />
    </div>
  );
};

export default MyProjects;

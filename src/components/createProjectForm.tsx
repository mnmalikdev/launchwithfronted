import { CategoryArray, IndustriesArray, ProjectStageArray } from "@/constants/data-store";
import useProjects from "@/pages/profile/hooks/useProjects";
import { FC, useEffect } from "react";
import DatePicker from "react-date-picker";
import { Controller, useForm } from "react-hook-form";
import { AiFillCalendar } from "react-icons/ai";
import Loader from "./loader";
import Modal from "./modal";
import InlineMultiselect from "./multiSelect";
import VerticalRadioSelect from "./singleVerticalSelect";

interface Props {
  displayCreateModal: boolean;
  toggleCreateProjectModal: () => void;
}

const CreateProjectForm: FC<Props> = ({ displayCreateModal, toggleCreateProjectModal }) => {
  const { isLoading, handleCreateProjectSubmit, fetchUserProjects } = useProjects();

  const {
    handleSubmit,
    reset,
    control,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset();
  }, []);

  const handleFormSubmit = async (formData: any) => {
    const { startDate, ...otherData } = formData;
    console.log("incoming start date vefore conversion", startDate);

    const timestamp = Math.floor(startDate.getTime() / 1000);

    console.log("incoming start date after conversion", timestamp);
    const updatedFormData = {
      ...otherData,
      startDate: timestamp,
    };

    await handleCreateProjectSubmit(updatedFormData);
    reset();

    toggleCreateProjectModal();
    await fetchUserProjects();
  };

  return (
    <Modal isOpen={displayCreateModal} onClose={toggleCreateProjectModal} bgColor="bg-white">
      {isLoading ? (
        <Loader />
      ) : (
        <form className="flex flex-col justify-center items-center w-full gap-2" onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="flex flex-col gap-3 justify-start w-full">
            {/* project name */}
            <label htmlFor="name" className="text-lg font-medium">
              Project Title
            </label>
            <input
              className="w-full border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none bg-white"
              placeholder="Enter project title"
              type="text"
              defaultValue=""
              {...register("name", { required: true })}
            />
            {errors?.name && <span className="text-red-400">Project Title is required</span>}
            {/* start date  */}

            {/* start date */}
            <label htmlFor="startDate" className="text-lg font-medium">
              Start Date
            </label>
            <Controller
              control={control}
              name="startDate"
              render={({ field }) => (
                <DatePicker
                  required
                  name="startDate"
                  className="w-full text-greendark"
                  calendarIcon={<AiFillCalendar className="text-orangedark" />}
                  clearIcon={null}
                  value={field.value}
                  selectRange={false}
                  onChange={(dateTime) => {
                    console.log("sfafsa", field); // Verify the field object
                    field.onChange(dateTime); // Update the field value
                  }}
                />
              )}
            />

            {/* project basic info */}
            <label htmlFor="basicInfo" className="text-lg font-medium">
              Basic Info
            </label>
            <textarea
              className="w-full border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none bg-white h-32"
              placeholder="project basic info"
              {...register("basicInfo", { required: true })}
            />
            {errors?.basicInfo && <span className="text-red-400">Project&apos;s basic info is required</span>}
            {/* project basic info */}
            <label htmlFor="moreInfo" className="text-lg font-medium">
              More Info
            </label>
            <textarea
              className="w-full  border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none bg-white h-32"
              placeholder="explain your idea briefly"
              {...register("moreInfo", { required: true })}
            />
            {errors?.moreInfo && <span className="text-red-400">Some more details about the project are required</span>}

            {/* category */}
            <label htmlFor="industry" className="text-lg font-medium">
              Which industry best describes your company or idea ?
            </label>
            <div className="flex flex-wrap gap-2 ">
              <Controller
                name="industry"
                control={control}
                defaultValue={[]}
                render={({ field: { onChange, value } }) => (
                  <InlineMultiselect defaultValue={[]} options={IndustriesArray} selected={value} onChange={onChange} />
                )}
              />

              {errors.choice && <span className="text-red-500">This field is required</span>}
            </div>
            <label htmlFor="stage" className="text-lg font-medium">
              Which stage is your idea currently in ?
            </label>

            <div className="flex flex-col gap-2 ">
              <Controller
                name="stage"
                control={control}
                defaultValue={""}
                shouldUnregister={true}
                render={({ field: { onChange, value } }) => (
                  <VerticalRadioSelect defaultValue={""} options={ProjectStageArray} selected={value} onChange={onChange} />
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
                shouldUnregister={true}
                control={control}
                defaultValue={""}
                render={({ field: { onChange, value } }) => <VerticalRadioSelect options={CategoryArray} selected={value} onChange={onChange} />}
              />

              {errors?.category && <span className="text-red-500">This field is required</span>}
            </div>

            <label htmlFor="companyUrl" className="text-lg font-medium">
              Company website if any
            </label>
            <input
              className=" w-full border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none bg-white"
              placeholder="Company Url (Optional)"
              type="text"
              {...register("companyUrl", { required: false })}
            />

            <button type="submit" className="bg-orangelight text-white py-2 px-4 rounded-full mt-2 hover:bg-orangedark focus:outline-none  w-full">
              <p className="text-white">Submit</p>
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
export default CreateProjectForm;

import { useModal } from "@/hooks/useModal";
import useProjects from "@/hooks/useProjects";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineMessage } from "react-icons/ai";
import {
  BsHandThumbsDown,
  BsHandThumbsDownFill,
  BsHandThumbsUp,
  BsHandThumbsUpFill,
} from "react-icons/bs";
import Loader from "./loader";
import Modal from "./modal";
import { ToastContainer } from "react-toastify";
interface Request {
  projectId?: any;
  userName: string;
  profilePicUrl: string;
  title: string;
  description: string;
  onProfilePreview: () => void; // added prop type
}

const Request: FC<Request> = ({
  profilePicUrl,
  userName,
  title,
  description,
  projectId,
  onProfilePreview,
}) => {
  const { isLoading, sendCollaborationRequest } = useProjects();
  const { isOpen, toggleModal } = useModal();
  const { likeProject, unlikeProject } = useProjects();
  const [isIconFilled, setIsIconFilled] = useState({
    like: false,
    unlike: false,
  });

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();

  const handlelikeProject = async () => {
    await likeProject(projectId);

    setIsIconFilled((prevState) => ({
      ...prevState,
      like: true,
      unlike: false,
    }));
  };

  const handleUnlikeProject = async () => {
    await unlikeProject(projectId);

    setIsIconFilled((prevState) => ({
      ...prevState,
      like: false,
      unlike: true,
    }));
  };

  const handleSendCollabRequest = async (formData: any) => {
    // add project id to the form data. it should be projectAssociatedWith
    formData.projectId = projectId;
    console.log("collab incoming!!!=>>", formData);
    await sendCollaborationRequest(formData);
    reset();
    toggleModal();
  };

  return (
    <div className="flex flex-col bg-white rounded-lg p-4 shadow-lg w-11/12 md:w-full lg:w-3/4">
      <ToastContainer />

      <div className="flex flex-row gap-1" onClick={onProfilePreview}>
        <img
          src={profilePicUrl}
          width={50}
          height={50}
          alt="profile-pic-url"
          className=" rounded-full"
        />
        <span>
          <p className=" text-base text-greendark">{userName}</p>
          <p className="text-sm">7d</p>
        </span>
      </div>

      <div className="flex flex-col mt-3">
        <h3 className=" text-2xl text-greendark font-bold">{title}</h3>
        <p className=" text-lg text-greendark border-2 border-greendark p-2 my-3 max-h-96 overflow-auto">
          {description}
        </p>
        <div className="flex flex-row justify-evenly items-center ">
          <span className=" flex flex-row justify-around items-center gap-2 cursor-pointer w-full">
            <button
              className="hover:-translate-y-1 transition-all"
              onClick={handlelikeProject}
            >
              {isIconFilled.like ? (
                <BsHandThumbsUpFill className="text-orangedark" size={25} />
              ) : (
                <BsHandThumbsUp className="text-orangedark" size={25} />
              )}
              <p className="text-orangelight text-sm">like</p>
            </button>

            <button
              className="hover:-translate-y-1 transition-all"
              onClick={handleUnlikeProject}
            >
              {isIconFilled.unlike ? (
                <BsHandThumbsDownFill className="text-orangedark" size={25} />
              ) : (
                <BsHandThumbsDown className="text-orangedark" size={25} />
              )}
              <p className="text-orangelight text-sm">unlike</p>
            </button>

            <button
              className="hover:-translate-y-1 transition-all"
              onClick={toggleModal}
            >
              <AiOutlineMessage
                color="#ff7800"
                className="text-orangedark"
                size={25}
              />
              <p className="text-orangelight text-base ">send collab request</p>
            </button>
          </span>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={toggleModal} bgColor="bg-white">
        {isLoading ? (
          <Loader />
        ) : (
          <form
            className="flex flex-col justify-center items-center w-full gap-2 my-4"
            onSubmit={handleSubmit(handleSendCollabRequest)}
          >
            <div className="flex flex-col gap-3 justify-start w-full">
              {/* project collaboration request message */}

              <label htmlFor="requestMessage" className="text-lg font-medium">
                Project Description
              </label>
              <textarea
                className="w-full bg-zinc-200 text-gray-700  border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none h-32"
                value={description}
                disabled
              />

              <label htmlFor="requestMessage" className="text-lg font-medium">
                Collaboration Request Message
              </label>
              <textarea
                className="w-full  border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none bg-white h-32"
                placeholder="Please briefly explain how would you do this project. keep it simple and precise."
                maxLength={450}
                {...register("requestMessage", { required: true })}
              />
              {errors?.requestMessage && (
                <span className="text-red-400">
                  Please write a collaboration request message.
                </span>
              )}

              {/* start date  */}

              <button
                type="submit"
                className="bg-orangelight text-white py-2 px-4 rounded-full mt-2 hover:bg-orangedark focus:outline-none  w-full"
              >
                <p className="text-white">Submit</p>
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default Request;

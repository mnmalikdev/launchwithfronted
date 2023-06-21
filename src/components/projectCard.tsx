import { useModal } from "@/hooks/useModal";
import useProjects from "@/hooks/useProjects";
import React, { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { SlPeople } from "react-icons/sl";
import { ToastContainer } from "react-toastify";
import Modal from "./modal";

interface Props {
  projectId?: string;
  title?: string;
  stage?: string;
  industry?: any;
  category?: string;
  startDate?: any;
  onClick?: () => void;
  collabRequests?: any;
}

const ProjectCard: React.FC<Props> = ({
  projectId,
  title,
  category,
  collabRequests,
  startDate,
  stage,
  onClick,
}) => {
  const { isOpen, toggleModal } = useModal();
  const [isHovered, setIsHovered] = useState(false);
  const [showContributerModal, setShowContributerModal] = useState(false);
  const {
    handleDeleteProject,
    fetchUserProjects,
    projects,
    acceptContributerRequest,
    declineCollabRequest: deleteCollabRequest,
  } = useProjects();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const toggleContributorModal = () => {
    setShowContributerModal((prev) => !prev);
  };

  const handleAcceptContributerRequest = async (
    projectId: string,
    userId: string
  ) => {
    const formData = {
      projectId: projectId,
      userId: userId,
    };
    await acceptContributerRequest(formData);
    await fetchUserProjects();
    toggleContributorModal();
  };

  return (
    <>
      <ToastContainer />
      <button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div
          className={`bg-primary  max-w-sm rounded-md shadow-md px-10 py-12 flex flex-col justify-center items-center hover:bg-orangelight hover:cursor-pointer hover:-translate-y-2 transition duration-300 ease-in-out ${
            isHovered ? "relative" : ""
          }`}
        >
          {title ? (
            <>
              <div className="  absolute top-2 right-2">
                {isHovered && (
                  <div className="flex flex-row gap-1">
                    <SlPeople
                      size={35}
                      className="text-white bg-primary hover:bg-secondary transition-all   shadow-lg rounded-lg p-2"
                      onClick={toggleContributorModal}
                    />
                    <MdEdit
                      size={35}
                      className="text-white bg-primary hover:bg-secondary transition-all   shadow-lg rounded-lg p-2"
                      onClick={onClick}
                    />
                    <MdDeleteForever
                      size={35}
                      className="text-white bg-red-500 shadow-lg rounded-lg p-2 hover:bg-red-700 transition-all"
                      onClick={toggleModal}
                    />
                  </div>
                )}
              </div>
              <h3 className="text-xl text-white font-semibold pb-4">{title}</h3>
              <p className="text-white text-base pt-5">{category}</p>
              <p className="text-white text-sm pt-5">{stage}</p>
              <p className="text-white text-xs">{startDate}</p>
            </>
          ) : (
            <div className="flex flex-col justify-center items-center w-full">
              <button onClick={onClick}>
                <AiOutlinePlusCircle className="text-white text-3xl text-center mb-2 w-full" />
                <p className="text-white text-lg py-5 px-3 font-bold">
                  Add New
                </p>
              </button>
            </div>
          )}
        </div>
      </button>

      {/* contributer requests modal */}
      <Modal
        isOpen={showContributerModal}
        onClose={toggleContributorModal}
        bgColor="bg-white"
      >
        <div className="flex flex-col gap-8 items-center h-full">
          <p className="text-3xl text-primary">Contributer Requests</p>
          <p>Requests:{projects?.length}</p>

          {collabRequests?.length < 1 ? (
            <div className="flex flex-col  justify-center">
              <div className=" flex flex-col justify-center items-center h-full">
                <img
                  width={350}
                  height={350}
                  src="/icons/no-collab-request.svg"
                  alt="filter-icon"
                  className=" my-9"
                />
                <p className="text-2xl text-orangedark">
                  No Collaboration Requests Yet !
                </p>
              </div>
            </div>
          ) : (
            collabRequests?.map((request: any, idx: number) => {
              return (
                <div key={idx} className="flex flex-col w-full ">
                  <div className="flex flex-row gap-1 items-center">
                    <img
                      className="  w-14 h-14 border-2 border-bgbox object-cover rounded-full my-2 shadow-xl relative"
                      src={request?.collabRequestedBy?.profileImageUrl}
                      alt="profile-avatar"
                    />
                    <div className="flex flex-col justify-start items-start ">
                      <p className=" text-primary text-lg">
                        {request?.collabRequestedBy?.userName}
                      </p>
                      <p className="text-primary text-md">
                        {request?.collabRequestedBy?.position}
                      </p>
                    </div>
                  </div>
                  <textarea
                    className=" bg-zinc-100 text-lg text-greendark font-normal w-full px-3 py-2 border-4 rounded-lg border-primary "
                    disabled
                    value={request?.requestMessage}
                    rows={6}
                  />
                  <div className="flex flex-row gap-3">
                    <button
                      onClick={() => {
                        handleAcceptContributerRequest(
                          projectId ?? "",
                          request?.collabRequestedBy?.userId
                        );
                        deleteCollabRequest(request?.collabRequestId);
                      }}
                      className="bg-primary text-white py-2 px-4  mt-2 hover:bg-secondary focus:outline-none w-2/12 rounded-md"
                    >
                      <p className="text-white">Accept Request</p>
                    </button>
                    <button
                      onClick={() => {
                        deleteCollabRequest(request?.collabRequestId);
                      }}
                      className="bg-red-500 text-white py-2 px-4  mt-2 hover:bg-red-700 focus:outline-none w-2/12 rounded-md"
                    >
                      <p className="text-white">Decline Request</p>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Modal>

      <Modal isOpen={isOpen} onClose={toggleModal} bgColor="bg-primary">
        <div className="flex flex-col gap-8 justify-center items-center h-full">
          <p className="text-3xl text-white">
            Are you sure you want to delete this project?
          </p>
          <div className="flex flex-row gap-3">
            <button
              onClick={toggleModal}
              className="bg-orangelight text-white py-2 px-14 rounded-full mt-2 hover:bg-orangedark focus:outline-none  w-full"
            >
              <p className="text-white">Cancel</p>
            </button>
            <button
              onClick={() => {
                handleDeleteProject(projectId);
                toggleModal();
              }}
              className=" bg-red-800 text-white py-2  px-14 rounded-full mt-2 hover:bg-orangedark focus:outline-none  w-full"
            >
              <p className="text-white">Delete</p>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProjectCard;

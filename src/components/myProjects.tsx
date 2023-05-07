import { useModal } from "@/hooks/useModal";
import useProjects from "@/pages/profile/hooks/useProjects";
import { useEffect, useState } from "react";
import InterestedContributer from "./interestedContributer";
import Modal from "./modal";
import ProjectCard from "./projectCard";

const MyProjects = () => {
  const { isOpen, toggleModal } = useModal();
  const { projects } = useProjects();
  useEffect(() => {
    console.log("COMING AS RESPONSE PROJECT", projects);
  }, []);

  const [selectedProject, setSelectedProject] = useState({
    projectId: "",
    name: "",
    basicInfo: "",
    moreInfo: "",
    industry: "",
    category: "",
    stage: "",
    startDate: "",

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
      <div
        key={project.projectId}
        onClick={() => {
          setSelectedProject(project);
          toggleModal();
        }}
      >
        <ProjectCard title={project?.name} category={project?.category} startDate={project?.startDate} />
      </div>
    );
  });

  return (
    <div className="flex flex-col w-full mx-14 my-5 overflow-hidden">
      <div className="flex flex-row w-full justify-between my-4">
        <p className="text-2xl text-orangedark font-bold">My Projects</p>
      </div>
      <div className="flex flex-col-reverse flex-wrap md:flex-row gap-4 md:justify-between md:items-center">
        <div className="flex flex-col md:flex-row gap-3 flex-wrap  my-2">{projectCards}</div>
        <div className="flex flex-col md:flex-row gap-5 my-2">
          <ProjectCard />
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={toggleModal} bgColor="bg-white">
        {selectedProject && (
          <div className="bg-bgbox border-2 border-white h-full  p-4">
            <p className="text-2xl font-bold text-greendark py-2">{selectedProject.name}</p>
            <p className="text-greendark text-base font-normal py-2">Category: {selectedProject.category}</p>
            <p className="text-greendark text-base font-normal py-2">Start Date: {selectedProject.startDate}</p>
            <p className="text-greendark text-base font-normal py-2"> Basic Info: {selectedProject.basicInfo}</p>
            <p className="text-greendark text-base font-normal py-2"> More Details: {selectedProject.moreInfo}</p>
            {/* interested contributers. */}
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
        )}
      </Modal>
    </div>
  );
};

export default MyProjects;

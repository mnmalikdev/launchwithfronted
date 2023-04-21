import { useModal } from "@/hooks/useModal";
import { useState } from "react";
import InterestedContributer from "./interestedContributer";
import Modal from "./modal";
import ProjectCard from "./projectCard";

const MyProjects = () => {
  const [selectedProject, setSelectedProject] = useState({
    id: 0,
    title: "",
    category: "",
    startDate: "",
    description: "",
    interestedContributer: [
      {
        imgUrl: "",
        userName: "",
      },
    ],
  });

  const { isOpen, toggleModal } = useModal();

  const projects = [
    {
      id: 1,
      title: "Flippa.com",
      category: "Web Dev",
      startDate: "20th March 2023",
      description:
        "An online marketplace for buying and selling websites, domains, and online businesses.is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publis",
      interestedContributer: [
        {
          imgUrl: "/images/profile-avatar.png",
          userName: "Robert Eddie",
        },
        {
          imgUrl: "/images/profile-avatar.png",
          userName: "Jonhatahn Pierce",
        },
      ],
    },
    {
      id: 2,
      title: "Flippa logo",
      category: "Graphic Design",
      startDate: "2nd April 2023",
      description:
        "A redesign of the Flippa logo to give it a fresh and modern look.is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publis",
      interestedContributer: [
        {
          imgUrl: "/images/profile-avatar.png",
          userName: "Jenny Garcia",
        },
        {
          imgUrl: "/images/profile-avatar.png",
          userName: "Vrene Op",
        },
      ],
    },
    {
      id: 3,
      title: "Flippa.com",
      category: "UI/UX Design",
      startDate: "1st March 2023",
      description:
        "A redesign of the user interface and user experience of the Flippa website to make it more intuitive and user-friendly.is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publis",
      interestedContributer: [
        {
          imgUrl: "/images/profile-avatar.png",
          userName: "Ellie Avram",
        },
        {
          imgUrl: "/images/profile-avatar.png",
          userName: "Omi Rochsdale",
        },
      ],
    },
  ];

  const projectCards = projects.map((project) => {
    return (
      <div
        key={project.id}
        onClick={() => {
          setSelectedProject(project);
          toggleModal();
        }}
      >
        <ProjectCard title={project.title} category={project.category} startDate={project.startDate} />
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
          <div className="bg-bgbox  p-4">
            <p className="text-2xl font-bold text-greendark py-2">{selectedProject.title}</p>
            <p className="text-greendark text-base font-normal py-2">Category: {selectedProject.category}</p>
            <p className="text-greendark text-base font-normal py-2">Start Date: {selectedProject.startDate}</p>
            <p className="text-greendark text-base font-normal py-2"> {selectedProject.description}</p>
            {/* interested contributers. */}
            <div className="flex flex-col gap-3 py-2  ">
              <h2 className="text-2xl text-greendark font-semibold ">Interested Contributers</h2>
              {selectedProject?.interestedContributer?.map((interestedContributer) => {
                return <InterestedContributer imgUrl={interestedContributer.imgUrl} userName={interestedContributer.userName} />;
              })}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MyProjects;

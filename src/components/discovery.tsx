import { useModal } from "@/hooks/useModal";
import useProjects from "@/hooks/useProjects";
import { useEffect, useState } from "react";
import Modal from "./modal";
import ProfilePreview from "./profilePreview";
import Request from "./request";

const Discovery = () => {
  const { isOpen, toggleModal } = useModal();
  const { fetchAllProjects } = useProjects();
  const [allProjects, setAllProjects] = useState<any>([]);
  const [userProfileData, setUserProfileData] = useState<any>(null);
  const [showProfilePreview, setShowProfilePreview] = useState(false);

  const handleProfilePreview = (userData: any) => {
    console.log("PROFILE PREVIEW DATA", userData);
    setUserProfileData(userData);
    setShowProfilePreview((prev) => !prev);
  };

  const handleBack = () => {
    setShowProfilePreview(false);
  };

  useEffect(() => {
    const fetchAllProjectsForDiscovery = async () => {
      try {
        const res = await fetchAllProjects();
        setAllProjects(res);
        // Delay the setLoading state change for 1-2 seconds
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllProjectsForDiscovery();
  }, []);

  return (
    <div className="flex flex-col w-full mx-2 md:mx-14 my-5 overflow-hidden">
      {showProfilePreview ? (
        <div className="flex flex-col w-full">
          <button
            onClick={handleBack}
            className="text-orangedark font-bold mb-2"
          >
            {"<"} Back
          </button>
          {/* todo: replace later with dynamic user */}
          <ProfilePreview
            profileData={{
              name: `${userProfileData?.userName}`,
              profilePic: `${userProfileData?.profileImageUrl}`,
              jobTitle: `${userProfileData?.position}`,
              major: `${userProfileData?.major}`,
              profileBio: `${userProfileData?.bio}`,
              skills: userProfileData?.skills,
              email: userProfileData?.email,
              portfolioImages: userProfileData?.portfolioUrls,
            }}
          />
        </div>
      ) : (
        <div>
          <div className="flex flex-row w-full justify-start gap-7 my-4">
            <div className="flex flex-col gap-2">
              <p className="text-2xl text-orangedark font-bold ">Discovery</p>
              <p className="text-lg text-orangedark font-medium ">
                Search and offer your skills on the projects posted by
                visionaries
              </p>
            </div>

            <span
              onClick={toggleModal}
              className="flex flex-row justify-center items-center gap-2 bg-orangeshade px-2 py-1 cursor-pointer"
            >
              <img
                width={20}
                src="/icons/img_filter.svg"
                alt="save-icon"
                className="cursor-pointer"
              />
              <p className="text-base text-orangedark">filter</p>
            </span>
          </div>
          {allProjects?.map((project: any) => {
            return (
              <div
                key={project?.projectId}
                className="flex flex-col md:mx-4 my-4"
              >
                <Request
                  projectId={project?.projectId}
                  title={project?.name}
                  userName={project?.projectOwner?.userName}
                  profilePicUrl={project?.projectOwner?.profileImageUrl}
                  description={project?.basicInfo}
                  onProfilePreview={() => {
                    handleProfilePreview(project?.projectOwner);
                  }}
                />
              </div>
            );
          })}
          <Modal isOpen={isOpen} onClose={toggleModal} bgColor="bg-bgbox">
            <div className="flex flex-col bg-bgbox justify-center">
              <span className="flex flex-row justify-between items-start border-b-2 border-orangedark w-full">
                <p className="text-lg text-greendark font-semibold">Filters</p>
                <img
                  width={20}
                  src="/icons/img_x.svg"
                  alt="save-icon"
                  className="cursor-pointer"
                  onClick={toggleModal}
                />
              </span>
              <div className=" flex flex-col justify-center items-center h-full">
                <img
                  width={300}
                  height={300}
                  src="/icons/filter-search.svg"
                  alt="filter-icon"
                  className=" my-9"
                />
                <p className="text-2xl text-orangedark">
                  Filters feature coming soon !
                </p>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Discovery;

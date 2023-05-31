import { useModal } from "@/hooks/useModal";
import useProjects from "@/hooks/useProjects";
import { useEffect, useState } from "react";
import Modal from "./modal";
import ProfilePreview from "./profilePreview";
import Request from "./request";

const LikedProjects = () => {
  const { fetchLikedProjects } = useProjects();
  const [likedProjects, setLikedProjects] = useState<Array<any>>([]);
  const [userProfileData, setUserProfileData] = useState<any>(null);

  useEffect(() => {
    fetchLikedProjects()
      .then((res) => {
        console.log("LIKEDWAAAAA", res);
        setLikedProjects(res);
      })
      .catch((error) => {
        console.log("Error fetching liked projects:", error);
      });
  }, []);

  const { isOpen, toggleModal } = useModal();
  const [showProfilePreview, setShowProfilePreview] = useState(false);

  const handleProfilePreview = (userData: any) => {
    console.log("PROFILE PREVIEW DATA", userData);
    setUserProfileData(userData);
    setShowProfilePreview((prev) => !prev);
  };

  const handleBack = () => {
    setShowProfilePreview(false);
  };

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
              email: `${userProfileData?.email}`,
              skills: userProfileData?.skills,
            }}
          />
        </div>
      ) : (
        <div>
          <div className="flex flex-row w-full justify-start gap-7 my-4">
            <p className="text-2xl text-orangedark font-bold ">
              Projects Liked By You
            </p>
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
          {likedProjects?.map((project) => {
            return (
              <div
                key={project?.projectId}
                className="flex flex-col md:mx-4 my-4"
              >
                <Request
                  title={project?.name}
                  // replace later with username
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
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default LikedProjects;

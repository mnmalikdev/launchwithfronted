import { useModal } from "@/hooks/useModal";
import { useState } from "react";
import Modal from "./modal";
import ProfilePreview from "./profilePreview";
import Request from "./request";

const Discovery = () => {
  const { isOpen, toggleModal } = useModal();
  const [showProfilePreview, setShowProfilePreview] = useState(false);

  const handleProfilePreview = () => {
    setShowProfilePreview((prev) => !prev);
  };

  const handleBack = () => {
    setShowProfilePreview(false);
  };

  return (
    <div className="flex flex-col w-full mx-2 md:mx-14 my-5 overflow-hidden">
      {showProfilePreview ? (
        <div className="flex flex-col w-full">
          <button onClick={handleBack} className="text-orangedark font-bold mb-2">
            {"<"} Back
          </button>
          {/* todo: replace later with dynamic user */}
          <ProfilePreview
            profileData={{
              name: "Edward",
              profilePic: "/images/profile-avatar.png",
              jobTitle: "Assistant",
              major: "NeuroScience",
              profileBio:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It ",
            }}
          />
        </div>
      ) : (
        <div>
          <div className="flex flex-row w-full justify-start gap-7 my-4">
            <p className="text-2xl text-orangedark font-bold ">Discovery</p>
            <span onClick={toggleModal} className="flex flex-row justify-center items-center gap-2 bg-orangeshade px-2 py-1 cursor-pointer">
              <img width={20} src="/icons/img_filter.svg" alt="save-icon" className="cursor-pointer" />
              <p className="text-base text-orangedark">filter</p>
            </span>
          </div>
          <div className="flex flex-col md:mx-4">
            <Request
              title="TEST PROJECT"
              userName="Edward hew"
              profilePicUrl="/images/profile-avatar.png"
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
              onProfilePreview={handleProfilePreview}
            />
          </div>
          <Modal isOpen={isOpen} onClose={toggleModal} bgColor="bg-bgbox">
            <div className="flex flex-col bg-bgbox justify-center">
              <span className="flex flex-row justify-between items-start border-b-2 border-orangedark w-full">
                <p className="text-lg text-greendark font-semibold">Filters</p>
                <img width={20} src="/icons/img_x.svg" alt="save-icon" className="cursor-pointer" onClick={toggleModal} />
              </span>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Discovery;

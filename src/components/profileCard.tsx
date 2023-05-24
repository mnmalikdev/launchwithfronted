import { useModal } from "@/hooks/useModal";
import useUpdateProfile from "@/pages/profile/hooks/useUpdateProfile";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Controller, useForm } from "react-hook-form";
import { BiImageAdd } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import Loader from "./loader";
import Modal from "./modal";
interface ProfileCardProps {
  onMenuItemClick: (name: string) => void;
}

const ProfileCard = ({ onMenuItemClick }: ProfileCardProps) => {
  const { handleProfilePicUpload, userData, isLoading } = useUpdateProfile();
  const { handleSubmit, control, reset } = useForm({ mode: "onChange" });
  const { isOpen, toggleModal } = useModal();
  const fileTypes = ["JPG", "PNG"];
  const navArray = ["Profile", "My Projects", "Liked Projects", "Discovery", "Message"];
  const [previewUrls, setPreviewUrls] = useState<any>();

  const handleClick = (name: string) => {
    onMenuItemClick(name);
  };

  const onSubmit = async (formData: any) => {
    const form = new FormData();

    URL.revokeObjectURL(previewUrls);
    setPreviewUrls(null);

    const profilePic = formData?.profilePic;

    form.append("profilePic", profilePic); // Append the actual file object to the form data

    console.log("formentries:");
    for (const [name, value] of form.entries()) {
      console.log(`${name}: ${value}`);
    }

    // handle form submission here
    toggleModal();
    await handleProfilePicUpload(form);

    reset();
  };

  return (
    <div className="flex flex-col items-center shadow-lg rounded-md bg-white md:w-1/4 h-fit px-8 -mt-10 ml-9 z-50 ">
      {/* image */}
      <div className="relative w-max">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <img
              className="w-32 h-32 border-2 border-bgbox object-cover rounded-full my-2 shadow-lg"
              src={userData?.profileImageUrl}
              alt="profile-avatar"
            />
            <button
              onClick={toggleModal}
              className="absolute bottom-0 right-0 rounded-full p-2 shadow-md transition-opacity duration-200 bg-orangedark hover:bg-orangelight cursor-pointer"
            >
              <FiEdit className=" text-white" size={20} />
            </button>
          </>
        )}
      </div>

      {/* navigation menu */}

      <div className=" flex flex-col gap-3 my-4 w-full">
        {navArray.map((option) => {
          return (
            <div
              className="flex bg-primary justify-center items-center text-white text-md w-full rounded-lg shadow-xl px-12 py-1 hover:bg-greensemidark cursor-pointer"
              key={option}
              onClick={() => handleClick(option)}
            >
              {option}
            </div>
          );
        })}
      </div>

      <Modal isOpen={isOpen} onClose={toggleModal} bgColor="bg-box">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col w-full justify-end items-end bg-bgbox  p-2 cursor-pointer">
            <RxCross1 onClick={toggleModal} size={20} />
          </div>
          <div className="flex flex-col bg-bgbox justify-center items-center h-full min-h-max">
            {previewUrls && (
              <div className="flex flex-col justify-center items-center mb-10">
                <img src={previewUrls} alt="no-img" className="object-contain max-w-lg max-h-96  " />
                <button className="flex flex-row items-center justify-center gap-2 bg-orangedark w-fit my-2 px-4 py-3 rounded-2xl md:px-6 md:py-2">
                  <img width={35} src="/icons/img_upload.svg" alt="google-icon" />
                  <p className="text-white font-semibold text-sm">Submit</p>
                </button>
              </div>
            )}
            <Controller
              control={control}
              name="profilePic"
              render={({ field: { onChange } }: any) => (
                <FileUploader
                  types={fileTypes}
                  className="bg-white text-orange-500"
                  fileOrFiles={null}
                  handleChange={(files: any) => {
                    setPreviewUrls(null);
                    const blobUrl = URL.createObjectURL(files);
                    console.log(blobUrl.substring(5));
                    setPreviewUrls(blobUrl);
                    onChange(files);
                  }}
                >
                  <div className={`flex flex-row justify-start items-center gap-8 px-5 ${previewUrls ? `hidden` : `block`} `}>
                    <button className="flex flex-row items-center justify-center gap-2 bg-orangedark w-fit my-4 px-8 py-3 rounded-2xl  md:px-6 md:py-2">
                      <BiImageAdd className=" text-white" size={25} />
                      <p className="text-white font-semibold text-sm">Upload Profile Picture</p>
                    </button>
                    <p className="text-md text-gray-400 font-semibold">Profile Picture</p>
                  </div>
                </FileUploader>
              )}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProfileCard;

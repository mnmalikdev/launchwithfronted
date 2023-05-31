import { AuthContext } from "@/context/authentication.context";
import { useModal } from "@/hooks/useModal";
import { useContext, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Controller, useForm } from "react-hook-form";
import { BiImageAdd } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import Loader from "./loader";
import Modal from "./modal";
import useUpdateProfile from "@/hooks/useUpdateProfile";
interface ProfileCardProps {
  onMenuItemClick: (name: string) => void;
}

const ProfileCard = ({ onMenuItemClick }: ProfileCardProps) => {
  const { handleLogout } = useContext(AuthContext);
  const { handleProfilePicUpload, userData, isLoading } = useUpdateProfile();
  const { handleSubmit, control, reset } = useForm({ mode: "onChange" });
  const { isOpen, toggleModal } = useModal();
  const fileTypes = ["JPG", "PNG"];
  const navArray = [
    "Profile",
    "My Projects",
    "Liked Projects",
    "Discovery",
    "Messages",
  ];
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
    <div className="flex flex-col items-center shadow-lg rounded-md bg-white md:w-1/4 h-fit py-3 px-8 -mt-10 ml-9 z-50 ">
      {/* image */}
      <div className="relative w-max">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="flex flex-col">
              {/* <p className="bg-orangedark text-white text-center rounded-md shadow-md my-2 py-1">{userData?.role}</p> */}
              {userData?.profileImageUrl === "0" ? (
                <img
                  className=" w-40 h-40 border-2 border-bgbox object-cover rounded-full my-2 shadow-xl relative"
                  src={"/images/profile-avatar.png"}
                  alt="profile-avatar"
                />
              ) : (
                <img
                  className=" w-40 h-40 border-2 border-bgbox object-cover rounded-full my-2 shadow-xl relative"
                  src={userData?.profileImageUrl}
                  alt="profile-avatar"
                />
              )}

              <p className=" text-center absolute top-0 right-28 bg-orangedark text-white text-xs font-semibold leading-normal rounded-md py-1 px-1  mt-2 shadow-md">
                {userData?.role}
              </p>
              <button
                onClick={toggleModal}
                className="absolute bottom-0 right-2 rounded-full p-2 shadow-md transition-opacity duration-200 bg-orangedark hover:bg-orangelight cursor-pointer"
              >
                <FiEdit className="text-white" size={20} />
              </button>
            </div>
          </>
        )}
      </div>

      {/* navigation menu */}

      <div className=" flex flex-col gap-3 my-4 w-full">
        {navArray.map((option) => {
          return (
            <button
              className="flex bg-primary justify-center items-center  text-white text-md w-full rounded-lg shadow-xl  py-1 hover:bg-greensemidark cursor-pointer"
              key={option}
              onClick={() => handleClick(option)}
            >
              {option}
            </button>
          );
        })}
        <button
          onClick={handleLogout}
          className="flex bg-primary justify-center items-center  text-white text-md w-full rounded-lg shadow-xl  py-1 hover:bg-greensemidark cursor-pointer"
        >
          Log Out
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={toggleModal} bgColor="bg-box">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col w-full justify-end items-end bg-bgbox  p-2 cursor-pointer">
            <RxCross1 onClick={toggleModal} size={20} />
          </div>
          <div className="flex flex-col bg-bgbox justify-center items-center h-full min-h-max">
            {previewUrls && (
              <div className="flex flex-col justify-center items-center mb-10">
                <img
                  src={previewUrls}
                  alt="no-img"
                  className="object-contain max-w-lg max-h-96  "
                />
                <button className="flex flex-row items-center justify-center gap-2 bg-orangedark w-fit my-2 px-4 py-3 rounded-2xl md:px-6 md:py-2">
                  <img
                    width={35}
                    src="/icons/img_upload.svg"
                    alt="google-icon"
                  />
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
                  <div
                    className={`flex flex-row justify-start items-center gap-8 px-5 ${
                      previewUrls ? `hidden` : `block`
                    } `}
                  >
                    <button className="flex flex-row items-center justify-center gap-2 bg-orangedark w-fit my-4 px-8 py-3 rounded-2xl  md:px-6 md:py-2">
                      <BiImageAdd className=" text-white" size={25} />
                      <p className="text-white font-semibold text-sm">
                        Upload Profile Picture
                      </p>
                    </button>
                    <p className="text-md text-gray-400 font-semibold">
                      Profile Picture
                    </p>
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

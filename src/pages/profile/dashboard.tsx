import Messages from "@/components/Messages";
import Discovery from "@/components/discovery";
import LikedProjects from "@/components/likedProjects";
import Loader from "@/components/loader";
import Logo from "@/components/logo";
import Modal from "@/components/modal";
import MyProjects from "@/components/myProjects";
import ProfileCard from "@/components/profileCard";
import ProfileDetails from "@/components/profileDetails";
import { useModal } from "@/hooks/useModal";
import useUpdateProfile from "@/hooks/useUpdateProfile";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Controller, useForm } from "react-hook-form";
import { BiImageAdd } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";

const Dashboard = () => {
  const { isOpen, toggleModal } = useModal();
  const [selectedMenuItem, setSelectedMenuItem] = useState("Profile");

  const { userData, handleCoverPicUpload, isLoading } = useUpdateProfile();
  const fileTypes = ["JPG", "PNG"];
  const [previewUrls, setPreviewUrls] = useState<any>();

  const { handleSubmit, control, reset } = useForm({ mode: "onChange" });
  const handleMenuItemClick = (name: string) => {
    setSelectedMenuItem(name);
  };

  const onSubmit = async (formData: any) => {
    const form = new FormData();

    const coverPic = formData?.coverPic;

    form.append("coverPic", coverPic); // Append the actual file object to the form data

    console.log("formentries:");
    for (const [name, value] of form.entries()) {
      console.log(`${name}: ${value}`);
    }

    // handle form submission here
    URL.revokeObjectURL(previewUrls);
    setPreviewUrls(null);
    toggleModal();
    await handleCoverPicUpload(form);

    reset();
  };

  return (
    <div className="flex flex-col bg-bgdark w-screen min-h-screen overflow-hidden ">
      <div
        className={`relative flex flex-col w-full  bg-primary px-8 py-2 h-80  ${
          userData?.coverImageUrl !== "0" ? "bg-cover" : "bg-bgbox"
        }`}
        style={{
          backgroundImage: `url(${previewUrls ?? userData?.coverImageUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover ",
          backgroundPosition: "center",
        }}
      >
        <Logo textColor="greendark" />

        {isLoading && <Loader />}

        {userData?.coverImageUrl === "0" ? (
          <button
            onClick={toggleModal}
            className="flex flex-col justify-center items-center "
          >
            <img src="/icons/cover_upload.svg" alt="upload-cover" />
            <p className="text-white font-semibold">Add Image</p>
          </button>
        ) : (
          <button
            onClick={toggleModal}
            className="flex w-full  h-full justify-end items-end flex-row rounded-full  cursor-pointer"
          >
            <FiEdit
              className="text-white bg-orangedark rounded-full p-2 hover:bg-orangelight hover:-translate-y-1 transition-opacity duration-200 "
              size={38}
            />
          </button>
        )}

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
                name="coverPic"
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
                          Upload Cover Picture
                        </p>
                      </button>
                    </div>
                  </FileUploader>
                )}
              />
            </div>
          </form>
        </Modal>
      </div>

      <div className="flex flex-col md:flex-row mt-5  ">
        <ProfileCard onMenuItemClick={handleMenuItemClick} />
        {selectedMenuItem === "Profile" && <ProfileDetails />}
        {selectedMenuItem === "My Projects" && <MyProjects />}
        {selectedMenuItem === "Discovery" && <Discovery />}
        {selectedMenuItem === "Liked Projects" && <LikedProjects />}
        {selectedMenuItem === "Messages" && <Messages />}
      </div>
    </div>
  );
};
export default Dashboard;

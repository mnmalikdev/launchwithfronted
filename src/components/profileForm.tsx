import { useModal } from "@/hooks/useModal";
import useUpdateProfile from "@/pages/profile/hooks/useUpdateProfile";
import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Controller, useForm } from "react-hook-form";
import { BiImageAdd } from "react-icons/bi";
import { MdDeleteForever, MdRemoveCircle } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./loader";
import Modal from "./modal";
import Tooltip from "./tooltip";

const ProfileForm = () => {
  const { handleUpdateProfile, isLoading, userData, deletePortfolioUrl } = useUpdateProfile();
  const { register, handleSubmit, control, reset, formState, watch, setValue } = useForm({ mode: "onChange" });
  const bioValue = watch("bio", "");
  const [previewUrls, setPreviewUrls] = useState<any>();
  const [deleteSampleUrl, setDeleteSampleUrl] = useState<string>("");
  const { isOpen, toggleModal } = useModal();
  // as soon as the page loads, set the usedata
  const isCountExceeded = bioValue.length >= 500;
  useEffect(() => {
    if (userData?.bio) {
      setValue("bio", userData.bio); // Set the fetched bio as the default value
    } else {
      setValue("bio", ""); // Set an empty value if bio is not available
    }
  }, [userData?.bio, setValue]);

  const onSubmit = async (formData: any) => {
    const form = new FormData();
    form.append("firstName", formData?.firstName ?? userData?.firstName);
    form.append("lastName", formData?.lastName ?? userData?.lastName);
    form.append("major", formData?.major ?? userData?.major);
    form.append("position", formData?.position ?? userData?.position);
    form.append("bio", formData?.bio ?? userData?.bio);
    URL.revokeObjectURL(previewUrls);
    setPreviewUrls(null);
    console.log("FORMDATA.PORTFOLIO", formData?.portfolio);

    const portfolio = formData?.portfolio;

    form.append("portfolio", portfolio); // Append the actual file object to the form data

    console.log("formstate dirty fields", formState.dirtyFields);
    console.log("formstate is dirty", formState.isDirty);
    console.log(formState.touchedFields);

    console.log("formentries:");
    for (const [name, value] of form.entries()) {
      console.log(`${name}: ${value}`);
    }

    // handle form submission here
    await handleUpdateProfile(form);

    reset();
  };

  const fileTypes = ["JPG", "PNG"];

  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  const deletePortfolioSample = () => {
    deletePortfolioUrl(deleteSampleUrl);
  };

  return (
    <div className=" flex flex-col mx-9 py-6 ">
      <ToastContainer />
      <div className="flex justify-end mb-2 cursor-pointer w-">
        <Tooltip content="Edit ">
          <TiEdit size={30} color="ff7800" onClick={toggleEditMode} />
        </Tooltip>
      </div>
      {/* first row */}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Modal isOpen={isOpen} onClose={toggleModal} bgColor="bg-bgbox">
            <div className="flex flex-col justify-center items-center h-full ">
              <p className=" text-white text-2xl">Are you sure you want to delete this portfolio sample?</p>
              <div className="flex flex-row gap-3 py-8">
                <button
                  type="submit"
                  className=" flex flex-row justify-center gap-3 bg-primary px-7 py-2 rounded-lg "
                  onClick={() => {
                    setDeleteSampleUrl("");
                    toggleModal();
                  }}
                >
                  {" "}
                  <p className="text-white font-medium">CANCEL</p>
                </button>
                <button
                  type="submit"
                  className=" flex flex-row justify-center  gap-1 bg-orangedark hover:bg-orangelight px-7 py-2 rounded-lg "
                  onClick={() => {
                    deletePortfolioSample();
                    toggleModal();
                  }}
                >
                  {" "}
                  <MdDeleteForever className="  text-white  cursor-pointer hover:bg-orangelight " size={25} onClick={toggleModal} />
                  <p className="text-white font-medium">DELETE</p>
                </button>
              </div>
            </div>
          </Modal>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row gap-28  ">
              <div className="w-full max-w-xs">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="input">
                  First Name
                </label>
                <input
                  className={`appearance-none block w-full ${
                    !editMode ? "  bg-zinc-200 text-gray-700" : "focus:bg-white focus:border-gray-500"
                  } border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none bg-white `}
                  placeholder="Enter text here..."
                  disabled={!editMode}
                  defaultValue={userData?.firstName}
                  id="input"
                  type="text"
                  {...register("firstName")}
                />
              </div>
              <div className="w-full max-w-xs ">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="input">
                  Last Name
                </label>
                <input
                  className={`appearance-none block w-full ${
                    !editMode ? "bg-zinc-200 text-gray-700" : "focus:bg-white focus:border-gray-500"
                  } border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none bg-white `}
                  placeholder="Enter text here..."
                  defaultValue={userData?.lastName}
                  disabled={!editMode}
                  type="text"
                  {...register("lastName")}
                />
              </div>
            </div>
            {/* second row */}
            <div className="flex flex-row gap-28 my-8 ">
              <div className="w-full max-w-xs">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="input">
                  Email
                </label>
                <input
                  className="appearance-none block w-full bg-zinc-200 text-gray-700 focus:bg-white focus:border-gray-500 py-3 px-4"
                  disabled
                  defaultValue={userData?.email}
                  id="input"
                  type="text"
                  placeholder="Enter text here..."
                  {...register("email")}
                />
              </div>
            </div>
            {/* third row */}
            <div className="flex flex-row gap-28  ">
              <div className="w-full max-w-xs">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="input">
                  Position
                </label>
                <input
                  className={`appearance-none block w-full ${
                    !editMode ? "bg-zinc-200 text-gray-700" : "focus:bg-white focus:border-gray-500"
                  } border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none bg-white `}
                  disabled={!editMode}
                  defaultValue={userData?.position}
                  id="input"
                  type="text"
                  {...register("position")}
                />
              </div>
              <div className="w-full max-w-xs  ">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="input">
                  Major
                </label>
                <input
                  className={`appearance-none block w-full ${
                    !editMode ? "bg-zinc-200 text-gray-700" : "focus:bg-white focus:border-gray-500"
                  } border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none bg-white `}
                  placeholder="Enter text here..."
                  defaultValue={userData?.major}
                  disabled={!editMode}
                  id="input"
                  type="text"
                  {...register("major")}
                />
              </div>
            </div>
            {/* fourth row */}
            <div className="flex my-10  ">
              <div className="w-full ">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="input">
                  Briefly Introduce Yourself
                </label>
                <textarea
                  className={`appearance-none block w-full ${
                    !editMode ? "bg-zinc-200 text-gray-700" : "focus:bg-white focus:border-gray-500"
                  } border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none bg-white `}
                  placeholder="Enter text here..."
                  disabled={!editMode}
                  defaultValue={userData?.bio}
                  rows={5}
                  maxLength={500}
                  {...register("bio")}
                />
                <div className={isCountExceeded ? "text-red-500" : ""}>
                  {bioValue.length}/{500}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-end items-end mt-5">
              <button
                type="submit"
                className=" flex flex-row justify-center gap-3 bg-primary px-7 py-2 rounded-lg "
                onClick={() => {
                  toggleEditMode();
                }}
              >
                {" "}
                <img width={25} src="/icons/img_save.svg" alt="save-icon" />
                <p className="text-white font-medium">Save Changes</p>
              </button>
            </div>

            {/* fifth  row */}
            <div className="flex flex-col ">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="input">
                skills
              </label>
              <div className="flex flex-wrap gap-4 w-3/4 my-5">
                {userData?.skills?.map((skill: any, index: any) => (
                  <p key={index} className="text-greendark text-md font-semibold cursor-pointer rounded-full px-4 py-1 bg-primary shadow-sm">
                    {skill?.subcategory}
                  </p>
                ))}
              </div>
            </div>

            {/* sixth  row */}
            <div className="flex flex-col  ">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="input">
                portfolio
              </label>
              <div className="flex flex-col justify-center items-center gap-6 border border-solid border-greendark my-4 pt-2 pb-14  rounded-md overflow-y-auto">
                <div className="flex flex-col justify-start items-start w-full px-2">
                  <p className="text-primary">{`samples added ${userData?.portfolioUrls.length}/3`}</p>
                </div>
                {/* div to show existing work if any */}
                <div className="flex flex-wrap gap-3 justify-center items-center max-h-96">
                  {previewUrls && (
                    <div className="flex flex-col mb-10">
                      <Tooltip content="remove ">
                        <MdRemoveCircle
                          onClick={() => setPreviewUrls(null)}
                          className="text-orangedark my-2 cursor-pointer hover:-translate-y-1 transition-all "
                          size={24}
                        />
                      </Tooltip>

                      <img src={previewUrls} alt="no-img" className="object-contain max-w-lg max-h-96  " />
                      <button className="flex flex-row items-center justify-center gap-2 bg-orangedark w-fit my-2 px-4 py-3 rounded-2xl md:px-6 md:py-2">
                        <img width={35} src="/icons/img_upload.svg" alt="google-icon" />
                        <p className="text-white font-semibold text-sm">Submit</p>
                      </button>
                    </div>
                  )}
                  {userData?.portfolioUrls?.length > 0 &&
                    userData?.portfolioUrls?.map((url: any) => {
                      return (
                        <div key={url} className="flex flex-col justify-center items-center aspect-w-4 aspect-h-3 ">
                          <img src={url} alt="no-img" className="object-contain max-w-lg max-h-96  " />
                          <MdDeleteForever
                            className=" bg-orangedark text-white p-1 border-2 rounded-full cursor-pointer hover:bg-orangelight hover:-translate-y-1 transition-all duration-300"
                            size={35}
                            onClick={() => {
                              setDeleteSampleUrl(url);
                              toggleModal();
                            }}
                          />
                        </div>
                      );
                    })}
                </div>
                {userData?.portfolioUrls?.length < 3 && (
                  <Controller
                    control={control}
                    name="portfolio"
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
                            <p className="text-white font-semibold text-sm">Upload Portfolio Sample</p>
                          </button>
                          <p className="text-md text-gray-400 font-semibold">Portfolio Samples</p>
                        </div>
                      </FileUploader>
                    )}
                  />
                )}
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ProfileForm;

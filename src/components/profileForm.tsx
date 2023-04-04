import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const ProfileForm = () => {
  const skills = ["Logo Design", "UI/UX Design"];
  const [file, setFile] = useState<null | File>(null);
  const handleChange = (file: File) => {
    setFile(file);
  };
  const fileTypes = ["JPG", "PNG"];
  return (
    <div className=" flex flex-col mx-9 py-6 ">
      {/* first row */}
      <div className="flex flex-row gap-28  ">
        <div className="w-full max-w-xs">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="input">
            First Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="input"
            type="text"
            placeholder="Enter text here..."
          />
        </div>
        <div className="w-full max-w-xs ">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="input">
            Last Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="input"
            type="text"
            placeholder="Enter text here..."
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
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="input"
            type="text"
            placeholder="Enter text here..."
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
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="input"
            type="text"
            placeholder="Enter text here..."
          />
        </div>
        <div className="w-full max-w-xs  ">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="input">
            Major
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="input"
            type="text"
            placeholder="Enter text here..."
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
            className=" bg-gray-200 border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
            placeholder="Enter your message here..."
          />
        </div>
      </div>
      {/* fifth  row */}
      <div className="flex flex-col ">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="input">
          skills
        </label>
        <div className="flex flex-wrap gap-4 w-full my-5">
          {skills.map((skill, index) => (
            <p key={index} className="text-greendark text-md font-semibold cursor-pointer rounded-full px-4 py-1 bg-primary shadow-sm">
              {skill}
            </p>
          ))}
        </div>
      </div>

      {/* sixth  row */}
      <div className="flex flex-col  ">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="input">
          portfolio
        </label>
        <div className="border border-solid border-greendark my-4 py-5 rounded-md">
          <FileUploader multiple={true} handleChange={handleChange} name="file" types={fileTypes} className=" bg-white text-orange-500">
            <div className=" flex flex-row justify-start items-center gap-8 px-5 ">
              <button className="flex flex-row items-center justify-center gap-2 bg-orangedark w-fit mb-4 px-8 py-3 rounded-2xl md:px-6 md:py-2  ">
                <img width={35} src="/icons/img_upload.svg" alt="google-icon" />
                <p className=" text-white font-semibold text-sm">Upload</p>
              </button>
              <p className="text-md text-gray-400 font-semibold">Upload your work here</p>
            </div>
          </FileUploader>
        </div>
      </div>

      <div className="flex flex-col justify-end items-end mt-5">
        <button className=" flex flex-row justify-center gap-3 bg-primary px-7 py-2 rounded-lg ">
          {" "}
          <img width={25} src="/icons/img_save.svg" alt="save-icon" />
          <p className="text-white font-medium">Save Changes</p>
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;

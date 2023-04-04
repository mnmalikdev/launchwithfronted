import Logo from "@/components/logo";
import ProfileCard from "@/components/profileCard";
import ProfileDetails from "@/components/profileDetails";

const Dashboard = () => {
  return (
    <div className="flex flex-col bg-bgdark w-screen min-h-screen overflow-hidden ">
      <div className=" flex flex-col w-full h-full justify-center items-center bg-primary px-8 py-4">
        <Logo textColor="greendark" />
        <div className="flex flex-col justify-center items-center ">
          <img src="/icons/cover_upload.svg" alt="upload-cover" />
          <p className="text-white font-semibold">Add Image</p>
        </div>
      </div>
      <div className="flex flex-row mt-5 ">
        <ProfileCard />
        <ProfileDetails />
      </div>
    </div>
  );
};

export default Dashboard;

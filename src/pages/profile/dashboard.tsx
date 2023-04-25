import Discovery from "@/components/discovery";
import LikedProjects from "@/components/likedProjects";
import Logo from "@/components/logo";
import MyProjects from "@/components/myProjects";
import ProfileCard from "@/components/profileCard";
import ProfileDetails from "@/components/profileDetails";
import { useState } from "react";

const Dashboard = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Profile");

  const handleMenuItemClick = (name: string) => {
    setSelectedMenuItem(name);
  };

  return (
    <div className="flex flex-col bg-bgdark w-screen min-h-screen overflow-hidden ">
      <div className=" flex flex-col w-full h-full justify-center items-center bg-primary px-8 py-4">
        <Logo textColor="greendark" />
        <div className="flex flex-col justify-center items-center ">
          <img src="/icons/cover_upload.svg" alt="upload-cover" />
          <p className="text-white font-semibold">Add Image</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row mt-5  ">
        <ProfileCard onMenuItemClick={handleMenuItemClick} />
        {selectedMenuItem === "Profile" && <ProfileDetails />}
        {selectedMenuItem === "My Projects" && <MyProjects />}
        {selectedMenuItem === "Discovery" && <Discovery />}
        {selectedMenuItem === "Liked Projects" && <LikedProjects />}
      </div>
    </div>
  );
};

export default Dashboard;

import useUpdateProfile from "@/pages/profile/hooks/useUpdateProfile";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProfileForm from "./profileForm";

const ProfileDetails = () => {
  const [userName, setUsername] = useState("");
  const [showProfileForm, setShowProfileForm] = useState(false);
  const { fetchCurrentUserProfile } = useUpdateProfile();

  useEffect(() => {
    fetchCurrentUserProfile().then((res) => {
      if (res?.role === "not set") {
        setShowProfileForm(false);
        setUsername(res?.userName);
      } else {
        setShowProfileForm(true);
      }
    });
  }, []);

  return (
    <div className=" flex flex-col w-full mx-14 my-5 overflow-hidden ">
      <div className=" flex flex-row w-full justify-between my-4">
        <p className=" text-2xl text-orangedark font-bold">Profile</p>
        {/* <div className="flex flex-row gap-2 bg-orangedark px-3 py-1 rounded-lg">
          <img width={20} height={20} src="/icons/plus_skill.svg" alt="plus-skills" />
          <p className="text-white"> Add more skills </p>
        </div> */}
      </div>
      <div className="flex flex-col  bg-white w-full rounded-md">
        {showProfileForm === false ? (
          <div className="flex flex-col gap-10 justify-center items-center py-9">
            <p className=" text-greendark text-4xl"> Please Complete Your Profile </p>
            <p className=" text-lg text-greendark font-semibold text-center ">
              {" "}
              hey <span className=" text-orangedark font-semibold">{userName}</span> , you are almost there. <br /> we just need you to choose a role
              and skill-set for yourself.
            </p>

            <img width={350} height={350} src="/icons/addinfo-final.svg" alt="under-construction" />

            <Link className=" flex justify-center items-center w-full" href="profileCompletion">
              <button className="bg-orangelight text-white py-2 px-14 rounded-full mt-2 hover:bg-orangedark focus:outline-none  w-1/2">
                <p className="text-white font-semibold">Lets Go !</p>
              </button>
            </Link>
          </div>
        ) : (
          <ProfileForm />
        )}
      </div>
    </div>
  );
};

export default ProfileDetails;

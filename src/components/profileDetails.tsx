import ProfileForm from "./profileForm";

const ProfileDetails = () => {
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
        <ProfileForm />
      </div>
    </div>
  );
};

export default ProfileDetails;

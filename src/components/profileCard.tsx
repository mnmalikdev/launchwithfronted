const ProfileCard = () => {
  const tempArray = ["Profile", "My Projects", "Message", "Interested Contributers"];
  return (
    <div className="flex flex-col items-center shadow-lg rounded-md bg-white w-fit h-fit px-8 -mt-10 ml-9 ">
      {/* image */}
      <div className=" -mt-12">
        <img width={100} height={100} src="/images/profile-avatar.png" alt="profile-avatar" />
      </div>

      {/* navigation menu */}

      <div className=" flex flex-col gap-3 my-4 w-full">
        {tempArray.map((option) => {
          return (
            <div className="flex bg-primary justify-center items-center text-white text-md w-full rounded-lg shadow-xl px-12 py-1">{option}</div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileCard;

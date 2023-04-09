interface ProfileCardProps {
  onMenuItemClick: (name: string) => void;
}

const ProfileCard = ({ onMenuItemClick }: ProfileCardProps) => {
  const navArray = ["Profile", "My Projects", "Liked Projects", "Discovery", "Message"];

  const handleClick = (name: string) => {
    onMenuItemClick(name);
  };

  return (
    <div className="flex flex-col items-center shadow-lg rounded-md bg-white md:w-1/4 h-fit px-8 -mt-10 ml-9 ">
      {/* image */}
      <div className=" -mt-12">
        <img width={100} height={100} src="/images/profile-avatar.png" alt="profile-avatar" />
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
    </div>
  );
};

export default ProfileCard;

import { FC } from "react";

interface InterestedContributerProps {
  userId: string;
  imgUrl: string;
  userName: string;
  email: string;
}

const InterestedContributer: FC<InterestedContributerProps> = ({ userId, email, imgUrl, userName }) => {
  return (
    <div className="flex flex-row justify-between items-center w-full">
      <div className="flex flex-row gap-3 items-center  ">
        {/*image or profile pic  */}

        <img className=" w-16 h-16 border-2 border-bgbox object-cover rounded-full my-2 shadow-lg" src={imgUrl} alt="image-url" />
        {/* userName */}
        <div className="flex flex-col ">
          <p className=" text-greendark text-base">{userName}</p>
          <p className=" text-greendark text-base">{email}</p>
        </div>
      </div>
      {/* msg button */}
      <button
        className=" bg-orangedark w-fit px-5 py-3 rounded-2xl md:px-3 md:py-2 "
        onClick={() => {
          alert("Messages coming soon");
        }}
      >
        <p className=" text-white font-semibold">Message</p>
      </button>
    </div>
  );
};

export default InterestedContributer;

import { FC } from "react";

interface InterestedContributerProps {
  imgUrl: string;
  userName: string;
}

const InterestedContributer: FC<InterestedContributerProps> = ({ imgUrl, userName }) => {
  return (
    <div className="flex flex-row justify-between items-center w-full">
      <div className="flex flex-row gap-3 items-center  ">
        {/*image or profile pic  */}
        <img src={imgUrl} alt="image-url" height={60} width={60} />
        {/* userName */}
        <p className=" text-greendark text-base">{userName}</p>
      </div>
      {/* msg button */}
      <button className=" bg-orangedark w-fit px-5 py-3 rounded-2xl md:px-3 md:py-2 ">
        <p className=" text-white font-semibold">Message</p>
      </button>
    </div>
  );
};

export default InterestedContributer;

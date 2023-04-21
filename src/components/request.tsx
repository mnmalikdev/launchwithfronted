import { FC } from "react";

interface Request {
  userName: string;
  profilePicUrl: string;
  title: string;
  description: string;
}

const Request: FC<Request> = ({ profilePicUrl, userName, title, description }) => {
  return (
    <div className="flex flex-col bg-white rounded-lg p-4 shadow-lg w-11/12 md:w-full lg:w-3/4">
      <div className="flex flex-row gap-1">
        <img src={profilePicUrl} width={50} height={50} alt="profile-pic-url" />
        <span>
          <p className=" text-base text-greendark">{userName}</p>
          {/* TODO: replace later with duration of request from now. */}
          <p className="text-sm">7d</p>
        </span>
      </div>
      <div className="flex flex-col mt-3">
        <h3 className=" text-2xl text-greendark font-bold">{title}</h3>
        <p className=" text-lg text-greendark border-2 border-greendark p-2 my-3 max-h-96 overflow-auto">{description}</p>
        <div className="flex flex-row justify-evenly items-center ">
          <span className=" flex flex-row justify-center items-center gap-1 cursor-pointer">
            <img src="/icons/like_orange 1.svg" alt="like-icon" />
            <p className="text-orangelight text-sm">like</p>
          </span>
          <span className=" flex flex-row  justify-center items-center gap-1 cursor-pointer">
            <img src="/icons/message_orange 1.svg" alt="message-icon" />
            <p className="text-orangelight text-sm">message</p>
          </span>
          <span className=" flex flex-row  justify-center items-center gap-1 cursor-pointer">
            <img src="/icons/noninterested.svg" alt="noninterested-icon" />
            <p className="text-orangelight text-sm">not interested</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Request;

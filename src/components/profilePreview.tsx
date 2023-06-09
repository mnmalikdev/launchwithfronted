import { FC } from "react";

interface ProfileData {
  name: string;
  major: string;
  jobTitle: string;
  profilePic: string;
  profileBio: string;
}

interface Props {
  profileData: ProfileData;
}

const ProfilePreview: FC<Props> = ({ profileData }) => {
  return (
    <div className="flex flex-col bg-white rounded-lg p-6 shadow-lg w-11/12 md:w-full lg:w-3/4">
      {/* basic profile details section */}
      {/* replace with dynamic data later */}
      <div className=" flex flex-row">
        <div className="flex flex-row gap-1">
          <img src={profileData.profilePic} width={100} height={100} alt="profile-pic-url" />
          <span className=" flex justify-center flex-col">
            <p className=" text-base text-greendark">{profileData.name ?? "Edward Hue"}</p>
            <span className="flex flex-row gap-4">
              <p className="text-sm text-greendark">{profileData.major ?? "NeuroScience"}</p>
              <p className="text-sm  text-greendark">{profileData.jobTitle ?? "Research Associate"} </p>
            </span>
          </span>
        </div>
      </div>
      {/* profile bio */}
      <div className="flex flex-col border-2 border-greendark rounded-md p-2 my-3">
        <p className=" text-base ">
          {profileData.profileBio ??
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It "}
        </p>
      </div>
      {/* skills */}
      <h2 className=" text-greendark text-xl font-bold ">Skills I Have</h2>
      <div className="flex w-full my-2">
        <p className="text-greendark text-md font-semibold cursor-pointer rounded-full px-4 py-1 bg-primary shadow-sm">GRAPHIC DESIGN</p>
      </div>

      <h2 className=" text-greendark text-xl font-bold ">Portfolio</h2>
      <div className="flex w-full flex-row mt-2"></div>
    </div>
  );
};

export default ProfilePreview;

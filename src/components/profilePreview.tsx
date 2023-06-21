import { FC, useEffect } from "react";

interface ProfileData {
  name: string;
  major: string;
  jobTitle: string;
  profilePic: string;
  profileBio: string;
  email: string;
  skills: any[];
  portfolioImages?: any;
}

interface Props {
  profileData: ProfileData;
}

const ProfilePreview: FC<Props> = ({ profileData }) => {
  const uniqueSkills = Array.from(
    new Set(profileData?.skills?.map((skill) => skill.subcategory))
  );

  return (
    <div className="flex flex-col bg-white rounded-lg p-6 shadow-lg w-11/12 md:w-full lg:w-3/4">
      {/* basic profile details section */}
      {/* replace with dynamic data later */}
      <div className=" flex flex-row">
        <div className="flex flex-row gap-1">
          <img
            src={profileData?.profilePic}
            width={70}
            height={70}
            alt="profile-pic-url"
            className=" rounded-full"
          />
          <span className=" flex justify-center flex-col">
            <p className=" text-base text-greendark">
              {profileData.name ?? "Edward Hue"}
            </p>
            <span className="flex flex-row gap-4">
              <p className="text-sm text-greendark">
                {profileData.major ?? "NeuroScience"}
              </p>
              <p className="text-sm  text-greendark">
                {profileData.jobTitle ?? "Research Associate"}{" "}
              </p>
            </span>
          </span>
        </div>
      </div>
      {/* profile bio */}
      <div className="flex  border-2 border-greendark rounded-md p-2 my-3">
        <p className=" text-base ">
          {profileData.profileBio ??
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It "}
        </p>
      </div>
      <h2 className=" text-greendark text-xl font-bold ">Email</h2>
      <p className="text-lg text-greendark font-bold my-1">
        {profileData.email}
      </p>
      {/* skills */}

      <div className="flex flex-wrap gap-2 my-2">
        <div className="flex flex-col bg-white rounded-lg p-6 shadow-lg w-11/12 md:w-full lg:w-3/4">
          {/* ...rest of the component code... */}
          <h2 className="text-greendark text-xl font-bold my-3">
            Skills I Have
          </h2>
          <div className="flex flex-wrap gap-2 my-2">
            {uniqueSkills.map((skill, idx) => {
              return (
                <p
                  key={idx}
                  className="text-greendark text-md font-semibold cursor-pointer rounded-full px-4 py-1 bg-primary shadow-sm"
                >
                  {skill}
                </p>
              );
            })}
          </div>
          <h2 className=" text-greendark text-xl font-bold ">Portfolio</h2>
          <div className="flex w-full flex-wrap gap-4 mt-4">
            {JSON.parse(profileData?.portfolioImages).map(
              (portfolioUrl: any) => {
                return (
                  <div
                    key={portfolioUrl}
                    className="flex flex-wrap  aspect-w-4 aspect-h-3 gap-3 "
                  >
                    <img
                      src={portfolioUrl}
                      alt="no-img"
                      className="object-contain max-w-lg max-h-96  "
                    />
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePreview;

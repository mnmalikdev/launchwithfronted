import { FC } from "react";
import { MdDelete } from "react-icons/md";
import useProjects from "@/hooks/useProjects";

interface InterestedContributerProps {
  userId: string;
  projectId?: any;
  imgUrl: string;
  userName: string;
  email: string;
}

const InterestedContributer: FC<InterestedContributerProps> = ({
  userId,
  projectId,
  email,
  imgUrl,
  userName,
}) => {
  const { removeContributer, fetchUserProjects } = useProjects();

  const handleRemoveContributer = async (projectId: string, userId: string) => {
    console.log("call me daddy,shambhavi", projectId);
    console.log("whos your daddy, shambhavi", userId);
    const formData = {
      projectId: projectId,
      userId: userId,
    };
    console.log("remove contributer form data", formData);
    await removeContributer(formData);
    await fetchUserProjects();
  };

  return (
    <div className="flex flex-row justify-between items-center w-full">
      <div className="flex flex-row gap-3 items-center  ">
        {/*image or profile pic  */}

        <img
          className=" w-16 h-16 border-2 border-bgbox object-cover rounded-full my-2 shadow-lg"
          src={imgUrl}
          alt="image-url"
        />
        {/* userName */}
        <div className="flex flex-col ">
          <p className=" text-greendark text-base">{userName}</p>
          <p className=" text-greendark text-base">{email}</p>
        </div>
      </div>
      {/* remove contributer button */}

      {/* msg button */}
      <button
        className=" bg-orangedark w-fit px-5 py-3 rounded-2xl md:px-3 md:py-2 "
        onClick={() => {
          alert("Messages coming soon");
        }}
      >
        <p className=" text-white font-semibold">Message</p>
      </button>
      <button
        onClick={() => {
          console.log("fuck me shambhavi", userId);
          console.log("ride me shambhavi , ah ah ah", projectId);
          handleRemoveContributer(projectId, userId);
        }}
        className="flex flex-col justify-center items-center cursor-pointer bg-orangedark py-1 px-1 rounded-full "
      >
        <MdDelete size={30} className="text-white" />
      </button>
    </div>
  );
};

export default InterestedContributer;

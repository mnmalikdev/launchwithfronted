import Logo from "@/components/logo";
import RoleChoice from "@/components/roleChoice";
import SkillsChoice from "@/components/skillsChoice";
import useStepper from "./hooks/useStepper";
import useUpdateProfile from "./hooks/useUpdateProfile";
const ProfileCompletion = () => {
  const { step, forward } = useStepper();
  const { role, handleAssignRole, isLoading, error } = useUpdateProfile();

  const handleRoleSubmit = async (selectedRole: any) => {
    await handleAssignRole({ role: selectedRole });
    forward();
  };

  return (
    <div className=" flex flex-col bg-bglight w-screen min-h-screen overflow-hidden  ">
      <div className=" flex flex-col items-center ">
        <Logo textColor="primary" />
      </div>
      <div className="flex flex-col  items-center justify-center mt-12 px-5 w-full ">
        {step === 0 ? (
          <h1 className=" text-3xl  md:text-5xl font-bold text-center">What do you want to be?</h1>
        ) : (
          <h1 className=" text-3xl  md:text-5xl font-bold text-center">What Skills Do You Have?</h1>
        )}

        <div className=" w-full flex flex-col gap-4 md:w-4/5 md:h-96 lg:w-2/5 lg:h-5/6 py-8 my-10 bg-bgbox items-center justify-center rounded-lg shadow-md">
          <div className=" flex flex-row  gap-3 w-3/4 ">
            {step === 0 ? (
              <>
                <hr className=" border-greendark border-2 w-1/2 " />
                <hr className=" border-gray-100 border-2  w-1/2 " />
              </>
            ) : (
              <>
                <hr className=" border-greendark border-2 w-1/2 " />
                <hr className="border-greendark border-2 w-1/2 " />
              </>
            )}
          </div>

          {step === 0 && <RoleChoice onSubmit={handleRoleSubmit} />}
          {step === 1 && <SkillsChoice />}
        </div>
      </div>
    </div>
  );
};
export default ProfileCompletion;

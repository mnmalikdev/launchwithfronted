import useStepper from "@/pages/profile/hooks/useStepper";
import { useForm } from "react-hook-form";

const RoleChoice = ({ onSubmit }: any) => {
  const { register, handleSubmit } = useForm();
  const { forward } = useStepper();
  const handleFormSubmit = (data: any) => {
    onSubmit(data?.role);
    forward();
  };

  return (
    <>
      <form className=" w-4/5 bg-bgbox  lg:w-full py-4 flex flex-col gap-4 justify-center items-center" onSubmit={handleSubmit(handleFormSubmit)}>
        <div className=" w-4/5 bg-primary lg:w-2/3 py-4 rounded-full">
          <label className="flex flex-row cursor-pointer">
            <input type="radio" className="w-1/4 " value="visionary" {...register("role")} />
            <span className="text-white text-4xl text-center ">Visionary</span>
          </label>
        </div>

        <div className="w-4/5 bg-primary lg:w-2/3 py-4 rounded-full">
          <label className="flex flex-row cursor-pointer">
            <input type="radio" className="w-1/4   " value="contributer" {...register("role")} />
            <span className="text-white text-4xl text-center">Contributor</span>
          </label>
        </div>
        <button type="submit" className=" bg-orangedark w-fit shadow-md mb-4 px-8 py-3 rounded-lg md:px-10 md:py-4">
          <p className=" text-white text-center font-semibold text-2xl">Next</p>
        </button>
      </form>
    </>
  );
};
export default RoleChoice;

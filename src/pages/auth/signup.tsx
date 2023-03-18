import Logo from "@/components/logo";
import useSignup from "@/hooks/useSignup";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Inputs = {
  email: string;
  userName: string;
  password: string;
  passwordConfirm: string;
};

function Signup() {
  const { handleSignup } = useSignup();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await handleSignup(data);
  };

  const validatePasswordMatch = () => {
    const { password, passwordConfirm } = watch();
    if (password !== passwordConfirm) {
      return "Passwords do not match ";
    }
    if (passwordConfirm.length < 6) {
      return "Passwords do not match";
    }
  };

  return (
    <div className=" flex flex-col w-screen min-h-screen md:flex-row overflow-hidden  ">
      <ToastContainer />
      {/* left column */}
      {/* logo with image */}
      <div className=" flex flex-col  bg-bglight w-full py-9 px-5 lg:w-1/2 lg:py-14 lg:pl-20">
        <div className=" flex flex-col justify-center items-center ">
          <Logo textColor="greendark" />
          <img className=" mt-16" src="/images/bg-one.png" alt="bg-signup" />
          <h3 className=" text-greensemidark mt-10 text-left md:text-center text-2xl font-semibold">
            Make a <span className="text-orangelight">Project</span> , Join the <span className="text-orangelight">Project</span>
          </h3>
        </div>
      </div>
      <div className="flex flex-col  items-center pt-5  bg-bgdark w-full lg:w-1/2 ">
        {/* heading and subheading */}
        <div className="flex flex-col">
          <h1 className=" text-3xl lg:text-5xl xl:text-6xl font-bold text-greendark py-12  ">Welcome to LaunchWith</h1>
          <h2 className=" text-2xl font-normal text-center text-greendark mt-3 ">Create a new account</h2>
        </div>
        {/* sign up form */}

        <div className="flex flex-col w-2/3 lg:w-1/2 relative mt-5 ">
          <form className=" space-y-7">
            <div className="relative my-3">
              <input
                {...register("userName", { required: true })}
                autoComplete="off"
                id="userName"
                name="userName"
                type="text"
                className="peer bg-transparent border-b-2 border-greendark placeholder-transparent h-10 w-full   text-gray-900 focus:outline-none focus:borer-rose-600"
                placeholder="userName "
              />
              {errors.userName && <span className=" text-red-400">This field is required</span>}
              <label
                htmlFor="userName"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                userName
              </label>
            </div>
            <div className="relative my-3">
              <input
                {...register("email", { required: true })}
                autoComplete="off"
                id="email"
                name="email"
                type="email"
                className="peer bg-transparent border-b-2 border-greendark placeholder-transparent h-10 w-full   text-gray-900 focus:outline-none focus:borer-rose-600"
                placeholder="Password"
              />
              {errors.email && <span className=" text-red-400">This field is required</span>}
              <label
                htmlFor="email"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Email
              </label>
            </div>
            <div className="relative my-3">
              <input
                {...register("password", { required: true, minLength: 6 })}
                autoComplete="off"
                id="password"
                name="password"
                type="password"
                className="peer bg-transparent border-b-2 border-greendark placeholder-transparent h-10 w-full   text-gray-900 focus:outline-none focus:borer-rose-600"
                placeholder="Password"
              />
              {errors.password && <p className=" text-red-400">Password is required and must be at least 6 characters long</p>}
              <label
                htmlFor="password"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Password
              </label>
            </div>
            {/* insert confirm pasword here */}
            <div className="relative my-3">
              <input
                {...register("passwordConfirm", { validate: validatePasswordMatch, minLength: 6 })}
                autoComplete="off"
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                className="peer bg-transparent border-b-2 border-greendark placeholder-transparent h-10 w-full   text-gray-900 focus:outline-none focus:borer-rose-600"
                placeholder="confirm password"
              />
              {/* {errors.passwordConfirm && <span className=" text-red-400">{errors.passwordConfirm.message}</span>} */}
              {errors.passwordConfirm?.type === "validate" && <p className="text-red-400">{errors.passwordConfirm.message}</p>}
              {errors.passwordConfirm?.type === "minLength" && <p className="text-red-400">Password must be at least 6 characters long</p>}
              <label
                htmlFor="passwordConfirm"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Confirm Password
              </label>
            </div>
          </form>
        </div>
        <button className=" bg-greendark w-fit my-4 px-8 py-3 rounded-2xl md:px-6 md:py-2  ">
          <a className=" text-white font-semibold" onClick={handleSubmit(onSubmit)}>
            Sign up
          </a>
        </button>
        <Link href="/auth/signin">
          <p className="font-semibold">
            Already have an account? <span className=" text-orangelight ">sign in</span>{" "}
          </p>
        </Link>

        <div className="flex flex-row items-center justify-center ">
          <span className="text-gray-600 font-bold py-4 ">or</span>
        </div>
        <div className="flex flex-col gap-5 justify-around items-center w-2/3  lg:flex-row lg:w-1/2 ">
          <div className=" flex flex-row gap-3">
            <img src="/icons/free-icon-google-2991148.svg" alt="google-icon" />
            <p className=" text-greendark text-lg font-medium">Sign up with google</p>
          </div>
          <div className=" flex flex-row gap-3">
            <img src="/icons/free-icon-linkedin-174857.svg" alt="google-icon" />
            <p className=" text-greendark text-lg font-medium">Sign up with LinkedIn</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

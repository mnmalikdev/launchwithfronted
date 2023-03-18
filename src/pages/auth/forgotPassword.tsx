import Logo from "@/components/logo";

function ForgotPassword() {
  return (
    <div className=" flex flex-col w-screen min-h-screen md:flex-row overflow-hidden  ">
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
          <h1 className=" text-3xl lg:text-5xl xl:text-6xl font-bold text-greendark py-12  ">Forgot Password</h1>
          <h2 className=" text-2xl font-normal text-center text-greendark mt-3 ">Dont worry . We can help</h2>
        </div>
        {/* sign up form */}
        <div className="flex flex-col w-2/3 lg:w-1/2 relative mt-14 ">
          <div className="relative my-3">
            <input
              autoComplete="off"
              id="email"
              name="email"
              type="email"
              className="peer bg-transparent border-b-2 border-greendark placeholder-transparent h-10 w-full   text-gray-900 focus:outline-none focus:borer-rose-600"
              placeholder="Password"
            />
            <label
              htmlFor="email"
              className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Email
            </label>
          </div>
        </div>
        <button className=" bg-greendark w-fit mb-4 px-8 py-6 rounded-2xl md:px-6 md:py-2  ">
          <a className=" text-white font-semibold" href="#">
            Reset Password
          </a>
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;

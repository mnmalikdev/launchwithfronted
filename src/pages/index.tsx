import Logo from "@/components/logo";
import Link from "next/link";
import { useEffect, useState } from "react";
function Landing() {
  // todo : remove the hyderated state later.
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null; // or a loading spinner, for example
  }

  return (
    <div className=" flex flex-col w-screen min-h-screen md:flex-row overflow-hidden  ">
      {/* left column */}
      {/* logo with text */}
      <div className=" flex flex-col bg-bglight w-full py-9 px-5 lg:w-1/2 lg:py-14 lg:pl-20">
        <Logo textColor="primary" />
        {/* the rest of hero content */}
        <div className=" flex flex-col justify-center px-5 xl:px-0 h-3/4 w-full  xl:w-3/5 ">
          <h3 className=" text-greensemidark uppercase text-2xl font-bold py-11">become a visionary</h3>
          <p className=" text-greendark text-xl font-semibold py-5">
            If you are a passionate, challenging, and creative founder, and need help starting your startup, <br />
            <p className=" mt-2">
              {" "}
              <span className=" text-orangelight ">TRY LaunchWith</span> to make your startup <span className="text-orangelight">REAL!</span>
            </p>
          </p>
          <Link href="/signup">
            <button className=" bg-orangedark w-fit mb-4 px-8 py-3 rounded-2xl md:px-6 md:py-2  ">
              <p className=" text-white font-semibold">Sign up</p>
            </button>
          </Link>
          <h3 className=" text-greensemidark  mt-4 text-left md:text-center text-2xl font-semibold">
            Make a <span className="text-orangelight">Project</span> , Join the <span className="text-orangelight">Project</span>
          </h3>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center  bg-bgdark w-full lg:w-1/2 ">
        <p className=" text-6xl md:text-8xl xl:text-9xl text-center w-2/3 text-primary font-black leading-loose ">
          Do You <br />
          Have <br /> A good <span className=" text-secondary"> IDEA?</span>
        </p>
      </div>
    </div>
  );
}

export default Landing;

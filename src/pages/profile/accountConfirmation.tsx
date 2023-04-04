import Logo from "@/components/logo";
import useVerification from "@/hooks/useVerification";
import Link from "next/link";
import { useRouter } from "next/router";

const AccountConfirmation = () => {
  const router = useRouter();

  const { isVerified, isLoading, error } = useVerification(router.query.token as string); // pass router.query.token as argument

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        {router.query.token}
      </div>
    );
  }

  if (!isVerified) {
    return <p>Verification failed</p>;
  }

  return (
    <div className="flex flex-col bg-primary w-screen min-h-screen overflow-hidden ">
      <div className=" flex flex-col w-full h-full justify-center items-center px-8 py-4">
        <Logo textColor="greendark" />
        <div className="flex flex-col justify-center items-center  ">
          <h1 className=" text-3xl lg:text-5xl xl:text-6xl font-bold text-greendark my-6  ">Welcome Aboard !</h1>
          <p className="text-primary text-3xl">{router.query.token}</p>
          <p className=" text-greendark text-lg font-medium my-6 ">You have successfully verified your account!</p>
          <Link href="/auth/signin">
            <button className=" bg-orangedark w-fit mb-4 px-8 py-3 rounded-2xl md:px-6 md:py-2  ">
              <p className=" text-white font-semibold">Login</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default AccountConfirmation;

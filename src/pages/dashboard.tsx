import { useEffect, useState } from "react";

function Dashboard() {
  const [userDetails, setUserDetails] = useState({
    userName: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const detailsString = window.localStorage.getItem("user");
    if (detailsString) {
      const details = JSON.parse(detailsString);
      setUserDetails({
        userName: details.userName || "",
        email: details.email || "",
        role: details.role || "",
      });
    }
  }, [userDetails]);

  return (
    <div className=" flex flex-col w-screen min-h-screen md:flex-col overflow-hidden  ">
      <div className="flex h-full flex-col justify-center items-center bg-greendark text-orangedark">
        {userDetails.userName !== "" && userDetails.email !== "" && userDetails.role !== "" ? (
          <div>
            <p className=" text-lg"> welcome {userDetails?.userName ?? "null"} </p>
            <p className=" text-lg"> email {userDetails?.email ?? "null"} </p>
            <p className=" text-lg"> role {userDetails?.role ?? "null"} </p>
          </div>
        ) : (
          <p>YOU ARE NOT LOGGED IN</p>
        )}
        <button
          className=" bg-orangedark w-fit mb-4 px-8 py-6 rounded-2xl md:px-6 md:py-2  "
          onClick={() => {
            window.localStorage.removeItem("access-token");
            window.localStorage.removeItem("user");
            window.location.reload();
          }}
        >
          <a className=" text-white font-semibold">Logout</a>
        </button>
      </div>
    </div>
  );
}

export default Dashboard;

import { AuthContext } from "@/context/authentication.context";
import { useContext } from "react";

function Dashboard() {
  const { userName, email, role, handleLogout, isAuthenticated } = useContext(AuthContext);

  return (
    <div className="flex flex-col w-screen min-h-screen md:flex-col overflow-hidden">
      {isAuthenticated ? (
        <div className="flex h-full flex-col justify-center items-center bg-greendark text-orangedark">
          <div>
            {userName && <p className="text-lg">welcome {userName}</p>}
            {email && <p className="text-lg">email {email}</p>}
            {role && <p className="text-lg">role {role}</p>}
          </div>

          <button className="bg-orangedark w-fit mb-4 px-8 py-6 rounded-2xl md:px-6 md:py-2" onClick={handleLogout}>
            <a className="text-white font-semibold">Logout</a>
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;

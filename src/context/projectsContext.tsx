import { AuthContext } from "@/context/authentication.context";
import axios from "axios";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

// Create the context
export const ProjectContext = createContext({
  projects: [] as any[],
  updateProjects: (updatedProjects: any[]) => {},
  fetchUserProjects: () => Promise.resolve<any[]>([]),
});

// Create the context provider component
const ProjectProvider = ({ children }: any) => {
  const { role } = useContext(AuthContext);
  const [projects, setProjects] = useState<Array<any>>([]);

  const updateProjects = (updatedProjects: any) => {
    setProjects(updatedProjects);
  };

  const fetchUserProjects = async () => {
    try {
      const token = window.localStorage.getItem("access_token");

      const userDetails = JSON.parse(window.localStorage.getItem("user") ?? "");

      if (token && userDetails !== "") {
        let apiUrl = "";
        if (role === "not set") {
          return [];
        }
        if (role === "contributer") {
          apiUrl = "project/fetchContributerProjects";
        } else if (role === "visionary") {
          apiUrl = "project/fetchOwnerProjects";
        }
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}${apiUrl}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        // convert each projects start date to readible date format from timeStamp

        setProjects(response?.data);
        return response?.data;
      }
    } catch (error: any) {
      console.log(error);
      toast(error?.response?.data?.message);
    }
  };

  // Context value containing the projects array and relevant functions
  const contextValue = {
    fetchUserProjects,
    projects,
    updateProjects,
  };

  return (
    <ProjectContext.Provider value={contextValue}>
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectProvider;

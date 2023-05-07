import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// this stepper will control rendering of components in the complete profile stage.

// [
//   {
//     "id": 35,
//     "projectId": "19a1cc35-ec16-4928-93aa-b6d6b71d4b8d",
//     "name": "Development of LaunchWith",
//     "basicInfo": "A platform for startup owners. they can come and find talent to contribute to their projects or ideas",
//     "moreInfo": "This is a more detailed description of my project",
//     "industry": "Web Programming, App Design, and Graphic Design",
//     "category": "Full Stack Development",
//     "stage": "Idea/Concept",
//     "companyUrl": "https://launchWith.com",
//     "contributerInProjects": [
//       {
//         "userId": "c50d2a61-73e2-4a32-a4e6-8ba013787e81",
//         "userName": "mnmalikdev",
//         "firstName": "Nabeel",
//         "lastName": "Malik",
//         "position": "software engineer",
//         "major": "Software Engineering",
//         "bio": "I AM NEW HERE",
//         "email": "mnmalikdev@gmail.com",
//         "password": "$2b$10$bgqZC9C50nmU9llbfrT2puUijjpYcHBJ48wTycuHkTYqyqmT5MG1e",
//         "role": "contributer",
//         "hashedRt": "$2b$10$yXKUPKI46INM5uF8t41Rzuk.CiEd8TJZMra2v9BrdIT4e5emtxJqK",
//         "isVerified": true,
//         "portfolioUrls": "[\"https://drive.google.com/uc?id=1oTi2-SosVRZ96iWBiWim7NtzxZ5BK435&export=download\",\"https://drive.google.com/uc?id=1AWnbRER1xeOmqosdMHoN5gzwTChI_YR4&export=download\",\"https://drive.google.com/uc?id=15G3iq7GeZxweP99GnAiEUftnFELZRMyH&export=download\"]"
//       },

function useProjects() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState<any>([
    {
      projectId: "",
      name: "",
      basicInfo: "",
      moreInfo: "",
      industry: "",
      category: "",
      stage: "",
      startDate: "",
      companyUrl: "",
      contributerInProjects: [
        {
          userId: "",
          userName: "",
          firstName: "",
          lastName: "",
          position: "",
          major: "",
          bio: "",
          email: "",
          profileImageUrl: "",
        },
      ],
    },
  ]);
  const BaseUrl = "http://localhost:3000/";

  // a function to assign user a role.
  const fetchUserProjects = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = window.localStorage.getItem("access_token");

      const userDetails = JSON.parse(window.localStorage.getItem("user") ?? "");

      if (token && userDetails !== "") {
        let apiUrl = "";
        if (userDetails.role === "contributer") {
          apiUrl = "project/fetchContributerProjects";
        } else if (userDetails.role === "visionary") {
          apiUrl = "project/fetchOwnerProjects";
        }
        const response = await axios.get(`${BaseUrl}${apiUrl}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log("response right after call", response);
        console.log(".data.data", response?.data);
        setProjects(response?.data);
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log(error);
      setError(error?.response?.data?.message);
      toast(error?.response?.data?.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProjects().then((res) => {
      console.log("res", res);
    });
  }, []);

  return { projects };
}

export default useProjects;

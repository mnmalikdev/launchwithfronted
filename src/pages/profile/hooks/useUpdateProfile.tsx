import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// this stepper will control rendering of components in the complete profile stage.

function useUpdateProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState(null);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    major: "",
    position: "",
    portfolioUrls: [],
    skills: [],
    profileImageUrl: "",
    coverImageUrl: "",
  });
  const BaseUrl = "http://localhost:3000/";

  // a function to assign user a role.
  const handleAssignRole = async (formData: any) => {
    setIsLoading(true);
    console.log("form data", formData);
    setError(null);
    try {
      const token = window.localStorage.getItem("access_token");
      if (token) {
        const response = await axios.post(`${BaseUrl}profile/assignRole`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log(response);
        setRole(response?.data?.role);
        setIsLoading(false);
        toast(`You have Signed Up Succesfully as ${response?.data?.role}`);
      }
    } catch (error: any) {
      console.log(error);
      setError(error?.response?.data?.message);
      toast(error?.response?.data?.message);
      setIsLoading(false);
    }
  };

  // a function to submit user's skilset

  const handleSkillsSubmit = async (formData: any) => {
    setIsLoading(true);
    console.log("form data", formData);
    setError(null);
    try {
      const token = window.localStorage.getItem("access_token");
      if (token) {
        const response = await axios.post(`${BaseUrl}profile/addSkills`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log(response);
        setIsLoading(false);
        toast(`skills added !`);
      }
    } catch (error: any) {
      console.log(error);
      setError(error?.response?.data?.message);
      toast(error?.response?.data?.message);
      setIsLoading(false);
    }
  };

  // a function to update user's profile
  const handleUpdateProfile = async (formData: any) => {
    setIsLoading(true);
    console.log("formentries in APICALL:");
    for (const [name, value] of formData.entries()) {
      console.log(`${name}: ${value}`);
    }

    formData?.portfolio?.length > 3 ? toast.error("only three files allowed") : setError(null);
    try {
      const token = window.localStorage.getItem("access_token");
      if (token) {
        const response = await axios.patch(`${BaseUrl}profile/updateProfile`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response);
        const updatedUser = await fetchCurrentUserProfile();
        setUserData(updatedUser);
        setIsLoading(false);
        toast(`profile updated !`);
      }
    } catch (error: any) {
      console.log(error);
      setError(error?.response?.data?.message);
      toast(error?.response?.data?.message);
      setIsLoading(false);
    }
  };

  const handleProfilePicUpload = async (formData: any) => {
    setIsLoading(true);
    console.log("formentries in APICALL:");
    for (const [name, value] of formData.entries()) {
      console.log(`${name}: ${value}`);
    }

    try {
      const token = window.localStorage.getItem("access_token");
      if (token) {
        const response = await axios.post(`${BaseUrl}profile/uploadProfilePic`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response);
        const updatedUser = await fetchCurrentUserProfile();
        setUserData(updatedUser);
        setIsLoading(false);
        toast(`profile pic updated !`);
      }
    } catch (error: any) {
      console.log(error);
      setError(error?.response?.data?.message);
      toast(error?.response?.data?.message);
      setIsLoading(false);
    }
  };

  const handleCoverPicUpload = async (formData: any) => {
    setIsLoading(true);
    console.log("formentries in APICALL:");
    for (const [name, value] of formData.entries()) {
      console.log(`${name}: ${value}`);
    }

    try {
      const token = window.localStorage.getItem("access_token");
      if (token) {
        const response = await axios.post(`${BaseUrl}profile/uploadCoverPic`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response);
        const updatedUser = await fetchCurrentUserProfile();
        setUserData(updatedUser);
        setIsLoading(false);
        toast(`cover pic updated !`);
      }
    } catch (error: any) {
      console.log(error);
      setError(error?.response?.data?.message);
      toast(error?.response?.data?.message);
      setIsLoading(false);
    }
  };

  const fetchCurrentUserProfile = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = window.localStorage.getItem("access_token");
      const user = window.localStorage.getItem("user") ?? "";
      const parsedUser = JSON.parse(user);

      if (token) {
        const response = await axios.get(`${BaseUrl}profile/fetchProfile/${parsedUser.userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log(response);

        setIsLoading(false);
        return response?.data;
      }
    } catch (error: any) {
      console.log(error);
      setError(error?.response?.data?.message);
      toast(error?.response?.data?.message);
      setIsLoading(false);
    }
  };

  const deletePortfolioUrl = async (url: string) => {
    console.log("URL==>", url);
    setIsLoading(true);
    setError(null);
    try {
      const token = window.localStorage.getItem("access_token");
      if (token) {
        const response = await axios.get(`${BaseUrl}profile/deletePortfolioSample/${encodeURIComponent(url)}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        const updatedUser = await fetchCurrentUserProfile();
        setUserData(updatedUser);
        setIsLoading(false);
        toast(`sample deleted  !`);
      }
    } catch (error: any) {
      console.log(error);
      setError(error?.response?.data?.message);
      toast(error?.response?.data?.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUserProfile().then((res) => {
      setUserData(res);
    });
  }, []);

  return {
    role,
    handleAssignRole,
    isLoading,
    error,
    handleSkillsSubmit,
    handleUpdateProfile,
    userData,
    fetchCurrentUserProfile,
    deletePortfolioUrl,
    handleProfilePicUpload,
    handleCoverPicUpload,
  };
}

export default useUpdateProfile;

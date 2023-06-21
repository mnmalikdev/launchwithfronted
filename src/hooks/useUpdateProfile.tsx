"use client";

import { AuthContext } from "@/context/authentication.context";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

// this stepper will control rendering of components in the complete profile stage.

function useUpdateProfile() {
  const { updateAuthStateInContext, userId } = useContext(AuthContext);
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
    role: "undefined",
  });

  // a function to assign user a role.
  const handleAssignRole = async (formData: any) => {
    setIsLoading(true);
    console.log("form data", formData);
    setError(null);
    try {
      const token = window.localStorage.getItem("access_token");
      if (token) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}profile/assignRole`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("isko dekh k change karo", formData?.role);
        console.log("DSDSDSDW2", formData?.role);
        // Update the role in the context
        updateAuthStateInContext({ role: formData?.role });
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
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}profile/addSkills`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
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

    formData?.portfolio?.length > 3
      ? toast.error("only three files allowed")
      : setError(null);
    try {
      const token = window.localStorage.getItem("access_token");
      if (token) {
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}profile/updateProfile`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
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
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}profile/uploadProfilePic`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
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
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}profile/uploadCoverPic`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
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
      console.log("MAIN ACCES TOKEN HOON", token);
      const user = window.localStorage.getItem("user") ?? "";
      const parsedUser = JSON.parse(user);

      if (token) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}profile/fetchProfile/${parsedUser?.userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
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
        const response = await axios.get(
          `${
            process.env.NEXT_PUBLIC_API_BASE_URL
          }profile/deletePortfolioSample/${encodeURIComponent(url)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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

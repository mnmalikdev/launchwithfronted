"use client";

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ProjectContext } from "../context/projectsContext";

const useProjects = () => {
  const { projects, updateProjects, fetchUserProjects } =
    useContext(ProjectContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const convertTimeStampToDate = (timeStamp: number) => {
    // Replace `unixTimestamp` with your Unix timestamp
    console.log("Input timestamp:", timeStamp);
    const unixTimestamp = timeStamp;

    // Get the user's timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Create a new Date object from the Unix timestamp and convert it to the user's timezone
    const date = new Date(unixTimestamp * 1000).toLocaleString("en-US", {
      timeZone: timezone,
    });

    // Convert the formatted date string to a Date object
    let dateString = "";

    const formattedDate = new Date(date);

    const dateNumber = formattedDate.getDate();
    const month = formattedDate.toLocaleString("default", { month: "long" });
    const year = formattedDate.getFullYear();

    dateString = `${dateNumber}${getOrdinalSuffix(
      dateNumber
    )} ${month}, ${year}`;

    function getOrdinalSuffix(n: number) {
      const suffixes = ["th", "st", "nd", "rd"];
      const v = n % 100;
      return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
    }

    console.log("Converted date:", dateString);

    return dateString;
  };

  const convertTimeStampToDateObj = (timestamp: number) => {
    if (!timestamp) {
      return null; // Return null for an invalid timestamp
    }

    const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds

    return date;
  };

  const handleCreateProjectSubmit = async (formData: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const token = window.localStorage.getItem("access_token");
      if (token) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}project/createProject`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("after creation", response);
        setIsLoading(false);
        toast(`Project created successfully!`);
        return await fetchUserProjects(); // Call the updated fetchUserProjects function
      }
    } catch (error: any) {
      console.log(error);
      setError(error?.response?.data?.message);
      toast(error?.response?.data?.message);
      setIsLoading(false);
    }
  };

  const handleEditProject = async (projectId: any, formData: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const token = window.localStorage.getItem("access_token");
      if (token) {
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}project/editProject/${projectId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("after edit", response);
        setIsLoading(false);
        toast(`Project edit successfully!`);
        await fetchUserProjects(); // Call the updated fetchUserProjects function
      }
    } catch (error: any) {
      console.log(error);
      setError(error?.response?.data?.message);
      toast(error?.response?.data?.message);
      setIsLoading(false);
    }
  };

  const handleDeleteProject = async (projectId: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const token = window.localStorage.getItem("access_token");
      if (token) {
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}project/deleteProject/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        setIsLoading(false);
        toast(`project deleted successfully !`);
        await fetchUserProjects(); // Call the updated fetchUserProjects function
      }
    } catch (error: any) {
      console.log(error);
      setError(error?.response?.data?.message);
      toast(error?.response?.data?.message);
      setIsLoading(false);
    }
  };

  const fetchAllProjects = async () => {
    try {
      setIsLoading(true);
      const token = window.localStorage.getItem("access_token");
      const userDetails = JSON.parse(window.localStorage.getItem("user") ?? "");
      if (token && userDetails) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}project/fetchAllProjects`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("response right after call", response);
        // convert each projects start date to readible date format from timeStamp

        console.log("RESPONSE.DATA", response?.data);
        setIsLoading(false);
        return response?.data;
      }
    } catch (error: any) {
      console.log(error);
      toast(error?.response?.data?.message);
    }
  };

  const likeProject = async (projectId: string) => {
    console.log("project id sds", projectId);
    setIsLoading(true);
    setError(null);
    try {
      const token = window.localStorage.getItem("access_token");
      if (token) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}project/likeProject`,
          { projectId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("after creation", response);
        setIsLoading(false);
        toast(`Project added to liked Projects!`);
        return await fetchUserProjects(); // Call the updated fetchUserProjects function
      }
    } catch (error: any) {
      console.log(error);
      setError(error?.response?.data?.message);
      toast(error?.response?.data?.message);
      setIsLoading(false);
    }
  };

  const unlikeProject = async (projectId: string) => {
    console.log("project id sds", projectId);
    setIsLoading(true);
    setError(null);
    try {
      const token = window.localStorage.getItem("access_token");
      if (token) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}project/unlikeProject`,
          { projectId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("after creation", response);
        setIsLoading(false);
        toast(`Project added to liked Projects!`);
        return await fetchUserProjects(); // Call the updated fetchUserProjects function
      }
    } catch (error: any) {
      console.log(error);
      setError(error?.response?.data?.message);
      toast(error?.response?.data?.message);
      setIsLoading(false);
    }
  };

  const fetchLikedProjects = async () => {
    try {
      setIsLoading(true);
      const token = window.localStorage.getItem("access_token");
      const userDetails = JSON.parse(window.localStorage.getItem("user") ?? "");
      if (token && userDetails) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}project/fetchLikedProjects`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("response right after call", response);
        // convert each projects start date to readible date format from timeStamp

        console.log("RESPONSE.DATA", response?.data);
        setIsLoading(false);
        return response?.data;
      }
    } catch (error: any) {
      console.log(error);
      toast(error?.response?.data?.message);
    }
  };

  const sendCollaborationRequest = async (formData: any) => {
    try {
      setIsLoading(true);
      const token = window.localStorage.getItem("access_token");
      const userDetails = JSON.parse(window.localStorage.getItem("user") ?? "");
      if (token && userDetails) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}project/sendCollabRequest`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("response right after call", response);
        // convert each projects start date to readible date format from timeStamp

        console.log("RESPONSE.DATA", response?.data);
        setIsLoading(false);
        return response?.data;
      }
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
      toast(error?.response?.data?.message);
    }
  };

  const acceptContributerRequest = async (formData: any) => {
    try {
      setIsLoading(true);
      const token = window.localStorage.getItem("access_token");
      const userDetails = JSON.parse(window.localStorage.getItem("user") ?? "");
      if (token && userDetails) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}project/addContributer`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setIsLoading(false);
        toast("Contributer Added Successfully !");
        return response?.data;
      }
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
      toast(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchUserProjects();
        updateProjects(res); // Use the updateProjects function from the context to update the projects array
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    console.log("INCOMING FROM state projects", projects);
  }, []);

  return {
    projects,
    fetchUserProjects,
    fetchLikedProjects,
    fetchAllProjects,
    convertTimeStampToDate,
    convertTimeStampToDateObj,
    likeProject,
    unlikeProject,
    handleCreateProjectSubmit,
    handleDeleteProject,
    handleEditProject,
    acceptContributerRequest,
    sendCollaborationRequest,
    isLoading,
  };
};
export default useProjects;

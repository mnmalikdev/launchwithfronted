import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function useSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const BaseUrl = "http://localhost:3000/";

  const handleSignup = async (formData: any) => {
    setIsLoading(true);
    console.log("form data", formData);
    setError(null);
    try {
      const response = await axios.post(`${BaseUrl}auth/signup`, formData);
      console.log(response);
      setIsLoading(false);
      toast("Registeration successful ! please check your email inbox for a confirmation email");
    } catch (error: any) {
      setError(error?.response?.data?.message);
      toast(error?.response?.data?.message);
      setIsLoading(false);
    }
  };

  return { handleSignup, error, isLoading };
}

export default useSignup;

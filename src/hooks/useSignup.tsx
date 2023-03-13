import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function useSignup() {
  const [error, setError] = useState(null);
  const BaseUrl = "http://localhost:3000/";

  const handleSignup = async (formData: any) => {
    console.log("form data", formData);
    setError(null);
    try {
      const response = await axios.post(`${BaseUrl}auth/signup`, formData);
      console.log(response);
      toast("Registeration successful ! please check your email inbox for a confirmation email");
    } catch (error: any) {
      setError(error?.response?.data?.message);
      toast(error?.response?.data?.message);
    }
  };

  return { handleSignup, error };
}

export default useSignup;

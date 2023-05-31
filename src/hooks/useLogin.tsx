import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function useLogin() {
  const redirect = useRouter();

  const [error, setError] = useState(null);

  const handleSignin = async (formData: any) => {
    console.log("form data", formData);
    setError(null);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}auth/signin`, formData);
      console.log(response);
      if (response?.data?.tokens?.access_token) {
        window.localStorage.setItem("access_token", response?.data?.tokens?.access_token);
        window.localStorage.setItem("refresh_token", response?.data?.tokens?.refresh_token);
        window.localStorage.setItem("user", JSON.stringify(response?.data?.user));
        toast("login successful");
        const userDetails = window.localStorage.getItem("user");
        console.log("USER DETAILS ", userDetails);
        redirect.push("/dashboard");
      }
    } catch (error: any) {
      setError(error?.response?.data?.message);
      toast(error?.response?.data?.message);
    }
  };

  return { handleSignin, error };
}

export default useLogin;

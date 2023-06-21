import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function useResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSendLinkToUserEmail = async (formData: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/sendResetPasswordLink`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsLoading(false);
      toast(`Reset Password Link sent to your email. `);
    } catch (error: any) {
      console.log(error);
      setError(error?.response?.data?.message);
      toast(error?.response?.data?.message);
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (formData: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/resetPassword`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsLoading(false);
      toast(`Reset Password Link sent to your email. `);
    } catch (error: any) {
      console.log(error);
      setError(error?.response?.data?.message);
      toast(error?.response?.data?.message);
      setIsLoading(false);
    }
  };

  return { handleSendLinkToUserEmail, isLoading, error };
}

export default useResetPassword;

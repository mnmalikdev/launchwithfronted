import axios from "axios";
import { useEffect, useState } from "react";

const useVerification = (token: string) => {
  // add token as argument
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyUser = async () => {
      try {
        if (token) {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/verifyUser?token=${token}`
          ); // use the token value passed as argument
          setIsVerified(true);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    verifyUser();
  }, [token]); // add token as dependency of useEffect

  return { isVerified, isLoading, error };
};

export default useVerification;
